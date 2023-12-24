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
  statusOrder !: string;
  fullName !:string;
  phone!: string;
  street!: string;
  name !: string;
  @ViewChild("myCateElem") myCateElem!: ElementRef;
  getStatus : Array<any> = [];
  constructor( private orderServie: OrdersService, private routex: ActivatedRoute, private router: Router, private notification: NotificationService) { }

  ngOnInit(): void {
    
    this.id = this.routex.snapshot.params['id'];
    this.orderServie.getOrderById(this.id).subscribe(data => {
      this.order.orderid = data.orderid;
      this.order.paymentMethod =data.paymentMethod;
      this.order.totalPrice = data.totalPrice;
      this.order.address = data.address;
      this.name = data.address.name;
      this.fullName = data.address.fullName;
      this.phone = data.address.mobileNo;
      this.street = data.address.street;
      this.order.user =data.user;
      this.order.lineItems=data.lineItems;
      this.statusOrder =data.status.statusid;

      this.orderServie.getStatusOrder(data.status.statusid).subscribe(statusid => {
        this.status =statusid;
      })
    })
  }


  onUpdate(){
    const statusedit = this.statusOrder + 1;
    if(statusedit == this.myCateElem.nativeElement.value || this.myCateElem.nativeElement.value == 5){
      let dataHistory = {
        orderId: this.order,
        updateDate: new Date()
      }
      this.orderServie.addStatusHistory(dataHistory, this.myCateElem.nativeElement.value).subscribe(data => {
        console.log("History inserted: ",data);
        
      })
      this.orderServie.updateOrder(this.order, this.myCateElem.nativeElement.value).subscribe({
        next: (value) => {
          console.log("Insert successfull: ", value);
          this.notification.showSuccess("Edit order successfull","Success");
          this.router.navigate(['/admin/order']);
        },
        error: (err) => {
          console.log("Error: ", err);
          this.notification.showError("Edit order failed!","Error");
        },
      })
    }else{
      this.notification.showWarning("You should be choose status before!","Warning")
    }
    
  }
}
