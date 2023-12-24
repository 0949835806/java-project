import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscriber, async } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CategogoryService } from 'src/app/services/categogory.service';
import { ImageProductService } from 'src/app/services/image-product.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  category: Array <any> = [];
  @ViewChild("myCateElem") myCateElem!: ElementRef;
  formEdit !: FormGroup;
  id: number=0;
  produc: Product = new Product();
  checkedTrue: any = "";
  checkedFalse: any = "";
  catId !: string;
  imageProduct:string ="";
  listImage: any;
  listCarouselImages:Array<any> = [];
  constructor(private productService: ProductService, private routex: ActivatedRoute ,private categoryService: CategogoryService, 
  private router: Router, private notification: NotificationService, private imageProductService: ImageProductService) { }

  ngOnInit(): void {
    this.categoryService.getListCategory().subscribe(data => {
      this.category = data;
    })
    this.id = this.routex.snapshot.params['id'];
    this.productById();
  }
  productById(){
    this.productService.getProductById(this.id).subscribe(data =>{
      this.produc.proId =data.proId;
      this.produc.proName= data.proName;
      this.produc.price =data.price;
      this.produc.sale_price=data.sale_price;
      this.produc.color = data.color;
      this.produc.size = data.size;
      this.produc.offer = data.offer;
      this.produc.image= data.image;
      this.imageProduct= data.image;
      this.produc.description=data.description;
      this.produc.status=data.status;
      this.catId =data.cateId.cateId;
      this.produc.carouselImages= data.carouselImages;
      data.status == true ? this.checkedTrue = "" : "";
      data.status == false ? this.checkedFalse = "" : "";
    })
    
  }

  getBase64($event :Event) {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBae64(file);
  }

  convertToBae64(file: File){
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file,subscriber)
    })

    observable.subscribe((d) => {
      console.log(d);
      this.imageProduct = d;
    })
  }

  readFile(file:File, subscriber: Subscriber<any>){
    const filereader = new FileReader();
    filereader.readAsDataURL(file)

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    }
    filereader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    }
  }

  getFile($event: Event){
    const target = $event.target as HTMLInputElement;
    const list = target.files as FileList;
    this.listImage= list;
  }


  async onUpdate(product: Product){
    product.image =this.imageProduct;
    
    if(this.listImage != undefined){
      for (let i = 0; i < this.listImage.length; i++) {
        const file = this.listImage[i];
        const observable = new Observable((subscriber: Subscriber<any>) => {
          this.readFile(file,subscriber)
        })
    
        const name = await observable.toPromise();
        this.listCarouselImages.push({name: name})
      }
      product.carouselImages = this.listCarouselImages
    }else {
      product.carouselImages = this.produc.carouselImages;
    }
    
    product.image =this.imageProduct;
    console.log(product.carouselImages);
    
    this.productService.update(product, this.myCateElem.nativeElement.value).subscribe({
      next: (value) => {
        console.log("Update successfull: ", value);
        this.notification.showSuccess("Update product successfull", "Success");
        this.router.navigate(['/admin/product'])
      },
      error: (err) => {
        console.log("Error: ", err);
        this.notification.showError("Update product failed!", "Error");
      },
    })
    
    
  }

}
