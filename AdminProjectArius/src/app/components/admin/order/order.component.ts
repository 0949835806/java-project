import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order : Array<any> = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  searchedKeyword !: string;
  constructor(private orderService: OrdersService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.getOrder();
    
  }

  getOrder(){
    this.orderService.getOrder().subscribe(data => {
      this.order =data;
      console.log(this.order);
    })
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getOrder();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getOrder();
  }

  onDelete(id: number){
    this.orderService.deleteOrder(id).subscribe({
      next: (response) => {
        this.notification.showSuccess("Delete successfull","Success");
      },
      error: (err) => {
        this.notification.showError("Delete failed!","Error");
      }
    })
  }

  key: string= 'id'
  reserve: boolean= false;
  sort(key: string){
    this.key = key;
    this.reserve= !this.reserve 
  }
}
