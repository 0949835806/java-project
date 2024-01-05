import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { ImageProduct } from 'src/app/models/imageProduct';
import { Product } from 'src/app/models/product';
import { CategogoryService } from 'src/app/services/categogory.service';
import { ImageProductService } from 'src/app/services/image-product.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'] 
})
export class ProductCreateComponent implements OnInit {

  category: Array <any> = [];
  imageProduct:string ="";
  listImage: any;
  listCarouselImages:Array<any> = [];
  @ViewChild("myCateElem") myCateElem!: ElementRef;
  constructor(private router: Router, private productService: ProductService, private categoryService: CategogoryService, 
  private notification: NotificationService, private imageProductService: ImageProductService) { }
  ngOnInit(): void {
    this.categoryService.getListCategory().subscribe(data => {
      this.category = data;
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

  async onCreate(product:Product){
    // console.log(product);
    // console.log(this.myCateElem.nativeElement.value);
 
    for (let i = 0; i < this.listImage.length; i++) {
      const file = this.listImage[i];
      const observable = new Observable((subscriber: Subscriber<any>) => {
        this.readFile(file,subscriber)
      })
  
      const name = await observable.toPromise();
      this.listCarouselImages.push({name: name})
    }
    product.carouselImages = this.listCarouselImages
    product.image =this.imageProduct;
    
    this.productService.create(product, this.myCateElem.nativeElement.value).subscribe({
      next: (value) => {
        console.log("Insert successfull: ", value);
        this.notification.showSuccess("Insert product successfull", "Success");
        this.router.navigate(['/admin/product'])
      },
      error: (err) => {
        console.log("Error: ", err);
        this.notification.showError("Insert product failed!", "Error");
      },
      
    })
    
  }

  

}
