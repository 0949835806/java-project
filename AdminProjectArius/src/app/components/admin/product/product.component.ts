import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Array<any> = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  searchedKeyword!: string;
  constructor(private productService: ProductService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }
  fetchPosts(): void{
    this.productService.getListProduct().subscribe(response => {
      this.product = response;
    }
    )
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
  onDelete(id: number){
    this.productService.delete(id).subscribe(data =>{
      this.productService.getListProduct().subscribe(data => {
        this.product = data;
      })
    })
    this.notification.showSuccess("Delete product successfull","Success");
  }

  key: string= 'id'
  reserve: boolean= false;
  sort(key: string){
    this.key = key;
    this.reserve= !this.reserve 
  }

}
