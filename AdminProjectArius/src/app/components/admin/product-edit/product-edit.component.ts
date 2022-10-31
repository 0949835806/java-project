import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CategogoryService } from 'src/app/services/categogory.service';
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
  constructor(private productService: ProductService, private routex: ActivatedRoute ,private categoryService: CategogoryService, 
  private router: Router, private notification: NotificationService) { }

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
      this.produc.description=data.description;
      this.produc.status=data.status;
      this.catId =data.cateId.cateId;
      console.log(this.catId);
      
      data.status == true ? this.checkedTrue = "" : "";
      data.status == false ? this.checkedFalse = "" : "";
    })
    
  }


  onUpdate(product: Product, fileUpload:any){
    console.log(product);
    console.log(fileUpload);
    product.image=fileUpload[0].name;
    this.productService.update(product,this.myCateElem.nativeElement.value).subscribe(result => {
      console.log(result);
      if(typeof result == 'object'){
        var formData = new FormData();
        formData.append("Files",fileUpload[0]);
        formData.append("proName",product.proName);
        this.productService.uploadFile(formData).subscribe(data => {
          console.log(data);
          if(data == true){
            this.notification.showSuccess("Edit product successfull","Success");
          }
        })
      }
    })
    this.router.navigate(['/admin/product'])
  }

}
