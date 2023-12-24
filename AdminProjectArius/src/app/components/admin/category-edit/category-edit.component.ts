import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CategogoryService } from 'src/app/services/categogory.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Category } from 'src/app/models/category';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  cate: Category = new Category();
  id: number = 0;
  imageCategory= "";
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
      this.cate.cateId = data.id;
      this.cate.cateName = data.cateName;
      this.cate.image = data.image;
      this.imageCategory = data.image;
      this.cate.status = data.status;
      data.status == true ? this.checkedTrue = "" : "";
      data.status == false ? this.checkedFalse = "" : "";
      console.log(data);
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
      this.imageCategory = d;
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

  onUpdate(category: Category){
    category.image = this.imageCategory;
    this.categoryService.update(this.id, category).subscribe(data => {
      console.log(data);
    });
    this.router.navigate(["/admin/category"]);
    this.notification.showSuccess("Edit category successfull","Success");
  }
}
