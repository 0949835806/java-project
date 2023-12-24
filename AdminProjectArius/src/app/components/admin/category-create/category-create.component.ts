import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategogoryService } from 'src/app/services/categogory.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  imageCategory: string = "";
  public invalidCategory = false;
  constructor(private categoryService: CategogoryService, private router: Router, private notification: NotificationService) { }

  ngOnInit(): void {
  }

  getBase64($event: Event) {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBae64(file);
  }

  convertToBae64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
    })

    observable.subscribe((d) => {
      console.log(d);
      this.imageCategory = d;
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
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

  // get validator() {
  //   return this.categoryCreate.get('cateName');
  // }
  onCreate(category: Category) {
    category.image = this.imageCategory;
    this.categoryService.create(category).subscribe({
      next: (value) => {
        console.log("Insert successfull: ", value);
        this.notification.showSuccess("Insert category successfull", "Success");
        this.router.navigate(["/admin/category"]);
      },
      error: (err) => {
        console.log("Error: ", err);
        this.invalidCategory = true;
        this.notification.showError("Insert category failed!", "Error");
      },
    })
  }
}
