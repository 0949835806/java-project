import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategogoryService } from 'src/app/services/categogory.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  constructor(private categoryService: CategogoryService, private router: Router, private notification: NotificationService) { }
  categoryCreate: FormGroup = new FormGroup({
    cateName: new FormControl('',Validators.required),
    status: new FormControl('',Validators.required)
  });

  ngOnInit(): void {
  }
  
  get validator() {
    return this.categoryCreate.get('cateName');
  }
  onCreate(){
    this.categoryService.create(this.categoryCreate.value).subscribe(data => {
      console.log(data);
      
    })
  this.router.navigate(["/admin/category"]);  
  this.notification.showSuccess("Insert category successfull","Success");
  }
}
