import { NumberSymbol } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Orders } from 'src/app/models/orders';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  order: Orders = new Orders();
  id :number =0;
  status : Array<any> = [];
  email!: string;
  phone!: number;
  address !: string;
  statusOrder :any;
  @ViewChild("myCateElem") myCateElem!: ElementRef;
  getStatus : Array<any> = [];
  constructor( private orderServie: OrdersService, private routex: ActivatedRoute, private router: Router, private notification: NotificationService) { }

  ngOnInit(): void {
    this.orderServie.getStatusOrder().subscribe(data => {
      this.status =data;
    })
    this.id = this.routex.snapshot.params['id'];
    this.getOrderById();
  }
  getOrderById(){
    this.orderServie.getOrderById(this.id).subscribe(data => {
      this.order.orderid = data.orderid;
      this.order.fullName =data.user.fullName;
      this.email = data.user.email;
      this.phone = data.user.phone;
      this.address =data.user.address;
      this.order.delivery =data.delivery;
      this.order.note=data.note;
      this.statusOrder =data.status.statusid;
    })
    
  }


  onUpdate(){
    this.orderServie.getOrderById(this.id).subscribe(data => {
      let dataOrder ={
        orderid: data.orderid,
        dateofset : data.dateofset,
        delivery : data.delivery,
        user: data.user,
        note: data.note
      }
      console.log(dataOrder);
      this.orderServie.updateOrder(dataOrder, this.myCateElem.nativeElement.value).subscribe(data =>{
        console.log(data);
      })
    })
    this.router.navigate(['/admin/order']);
    this.notification.showSuccess("Edit order successfull","Success");
    // window.location.reload();
  }
}
