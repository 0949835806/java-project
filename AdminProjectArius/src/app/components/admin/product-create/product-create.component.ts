import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CategogoryService } from 'src/app/services/categogory.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'] 
})
export class ProductCreateComponent implements OnInit {

  category: Array <any> = [];
  @ViewChild("myCateElem") myCateElem!: ElementRef;
  constructor(private router: Router, private productService: ProductService, private categoryService: CategogoryService, private notification: NotificationService) { }
  ngOnInit(): void {
    this.categoryService.getListCategory().subscribe(data => {
      this.category = data;
    })
  }

  onCreate(product:Product, fileImg:any){
    // console.log(product);
    // console.log(this.myCateElem.nativeElement.value);
    product.image= fileImg[0].name;
    this.productService.create(product, this.myCateElem.nativeElement.value).subscribe(result =>{
      console.log(result);
      if(typeof result == 'object'){
        var formData = new FormData();
        formData.append("Files",fileImg[0])
        formData.append("proName",product.proName);
        this.productService.uploadFile(formData).subscribe(data => {
          console.log(data);
          if(data == true){
            this.notification.showSuccess("Insert product successfull","Success");
          }
        })
      }
    })
    this.router.navigate(["/admin/product"]);
  }

}
