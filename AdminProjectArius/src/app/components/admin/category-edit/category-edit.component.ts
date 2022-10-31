import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CategogoryService } from 'src/app/services/categogory.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {


  id: number = 0;
  constructor(private router: Router, private categoryService: CategogoryService, private route: ActivatedRoute, private notification: NotificationService) { }
  categoryEdit: FormGroup = new FormGroup({
    cateName: new FormControl(),
    status: new FormControl()
  });
  checkedTrue: any = "";
  checkedFalse: any = "";
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.categoryService.getById(this.id).subscribe(data => {
      this.categoryEdit = new FormGroup({
        cateName: new FormControl(data.cateName),
        status: new FormControl(data.status)
      })
      data.status == true ? this.checkedTrue = "" : "";
      data.status == false ? this.checkedFalse = "" : "";
      console.log(data);
    })
  
    
  }

  onUpdate(){
    this.categoryService.update(this.id, this.categoryEdit.value).subscribe(data => {
      console.log(data);
    });
    this.router.navigate(["/admin/category"]);
    this.notification.showSuccess("Edit category successfull","Success");
  }
}
