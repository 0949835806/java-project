import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Orders } from 'src/app/models/orders';
import { NotificationService } from 'src/app/services/notification.service';
import { OrdersService } from 'src/app/services/orders.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  cartIcon,
  eyeIcon,
  fileAddIcon,
  checkIcon,
  thumbnailsUpIcon,
  boxSizingIcon,
} from "@progress/kendo-svg-icons";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  ordersdetails: Array<any> = [];
  orders: Orders = new Orders();
  address !: string;
  phone !: number;
  id : number =0;
  fullName!: string;
  status!: string;
  statusid :number = 0;
  isOrder=false;
  isLinear = false;  
  firstFormGroup!: FormGroup;  
  secondFormGroup!: FormGroup;  
  current: number = 0;
  order:any;
  value: any;
  total: number = 0;
  subtoto: number = 0;
  isCancelOrder = false;
  steps = [
    {id:1, label: "Processing", svgIcon: thumbnailsUpIcon },
    {id:2, label: "Preparing goods", svgIcon: boxSizingIcon },
    {id:3, label: "Delivering", svgIcon: cartIcon},
    {id:4, label: "Successful", svgIcon: checkIcon },
  ];
  constructor(private orderService: OrdersService, private notification: NotificationService, private routex: ActivatedRoute,
    private router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({  
      firstCtrl: ['', Validators.required]  
    });  
    this.secondFormGroup = this._formBuilder.group({  
      secondCtrl: ['', Validators.required]  
    });  
    this.id = this.routex.snapshot.params['id'];
    this.orderById();
    this.orderDetails(this.id);
  }

 

  orderById(){
    this.orderService.getOrderById(this.id).subscribe(data => {
      console.log(data);
      
      this.orders.orderid = data.orderid;
      this.address = data.user.address;
      this.phone = data.user.phone;
      this.fullName = data.user.fullName;
      this.status = data.status.statusname;
      this.statusid = data.status.statusid;
      this.current = data.status.statusid - 1;
      if(this.statusid == 1){
        this.isCancelOrder = true;
      }
    })
  }

  orderDetails(id: number) {
    this.orderService.getOrderDetails(id).subscribe(data => {
      this.ordersdetails= data;
      this.findsum(data);
      this.order = data[0].order;
    })
    
  }

  findsum(data: any) {
    // debugger
    this.value = data;
    console.log(this.value);
    for (let j = 0; j < data.length; j++) {
      this.subtoto = this.value[j].subtotal * this.value[j].product.sale_price;
      // console.log(this.subtoto);
      this.total += this.subtoto;
      console.log(this.total);
    }
  }

  onDelete(){
    if(this.statusid==1 || this.statusid==2){
      this.orderService.getOrderById(this.id).subscribe(data => {
        let dataOrder ={
          orderid: data.orderid,
          paymentMethod: data.paymentMethod,
          totalPrice: data.totalPrice,
          address: data.address
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
