import { Component, OnInit } from '@angular/core';
import { CategogoryService } from 'src/app/services/categogory.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: Array <any> = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  searchedKeyword!: string;
  constructor(private CategoryService: CategogoryService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void{
    this.CategoryService.getListCategory().subscribe(response=>{
       this.category = response;
    })
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.fetchPosts();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchPosts();
  }
  onDelete(cateId: number){
    this.CategoryService.delete(cateId).subscribe({
      next: data => {
        this.notification.showSuccess("Delete successfull","Success");
        this.CategoryService.getListCategory().subscribe(data => {
          this.category = data;
        })
        window.location.reload();
      },
      error: error => {
        this.notification.showError("Delete failed!","Error");
      }
      
    });
    
   
  }

  key: string= 'id'
  reserve: boolean= false;
  sort(key: string){
    this.key = key;
    this.reserve= !this.reserve 
  }

}
