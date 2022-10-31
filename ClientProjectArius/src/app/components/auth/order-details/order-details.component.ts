import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Orders } from 'src/app/models/orders';
import { NotificationService } from 'src/app/services/notification.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  ordersdetails: any;
  orders: Orders = new Orders();
  address !: string;
  phone !: number;
  id : number =0;
  fullName!: string;
  status:any;
  statusid :number = 0;
  isOrder=false;
  constructor(private orderService: OrdersService, private notification: NotificationService, private routex: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
   
    this.id = this.routex.snapshot.params['id'];
    this.orderById();
    this.orderDetails();
  }

  orderById(){
    this.orderService.getOrderById(this.id).subscribe(data => {
      this.orders.dateofset = data.dateofset;
      this.address = data.user.address;
      this.phone = data.user.phone;
      this.fullName = data.user.fullName;
      this.status = data.status;
      this.statusid = data.status.statusid;
    })
  }

  orderDetails(){
    this.orderService.getOrderDetails(this.id).subscribe(data => {
      this.ordersdetails=data;
    })
  }

  onDelete(){
    if(this.statusid==1 || this.statusid==2){
      this.orderService.getOrderById(this.id).subscribe(data => {
        let dataOrder ={
          orderid: data.orderid,
          dateofset : data.dateofset,
          delivery : data.delivery,
          user: data.user,
          note: data.note
        }
        console.log(dataOrder);
        this.orderService.updateOrder(dataOrder,4).subscribe(datas =>{
          console.log(datas);
        })
      })
      this.router.navigate(['/purcharse'])
    }
  }

  back(){
    this.router.navigate(['/purcharse']);
  }

}
