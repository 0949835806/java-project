import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/models/orders';
import { NotificationService } from 'src/app/services/notification.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-purcharse',
  templateUrl: './purcharse.component.html',
  styleUrls: ['./purcharse.component.css']
})
export class PurcharseComponent implements OnInit {

  order: Array<any> = [];
  orders: Orders = new Orders();
  address !: string;
  phone !: number;
  showAdminBroad = false;
  showAuthBroad= false;
  showDone = false;
  statusOrder : any;
  isOrder=false;
  constructor(private orderService: OrdersService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.orderService.getOrder().subscribe(data => {
      this.order =data;
      this.isOrder =!!this.order.length;
    })
  }
  onDelete(){
    this.isOrder=false;
  }


}
