import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/guard/auth-guard.service';
import { Address } from 'src/app/models/address';
import { Cart } from 'src/app/models/cart';
import { OrderDetails } from 'src/app/models/orderDetails';
import { Orders } from 'src/app/models/orders';
import { User } from 'src/app/models/user';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';
declare const $: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  token: any;
  tokenPayload: any;
  today = new Date();
  user: User = new User();
  @ViewChild("myCateElem") myCateElem!: ElementRef;
  @ViewChild("myCateElen") myCateElen!: ElementRef;
  @ViewChild("myTotalElem") myTotalElem!: ElementRef;
  cart: any;
  total: number = 0;
  subtoto: number = 0;
  value: any;
  products: any;
  id !: string;
  orders: any;
  isCart = false;
  isLoggin = false;
  address: Array<any> = [];
  addressById: any;
  orderId: number = 1;
  isEmptyAddress = false;
  constructor(private authGuard: AuthGuard, private authService: AuthService, private jwtHelper: JwtHelperService,
    private orderService: OrdersService, private cartService: CartService, private checkoutService: OrdersService,
    private addressService: AddressService, private notification: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.authGuard.getToken();
    this.isLoggin = !!this.authGuard.getToken();
    this.isCart = !!sessionStorage.getItem('cart');
    this.getTokenDecoded();
    this.getCartItems();
    this.getAddress();
    this.getOrderId();
  }


  getCartItems() {
    this.cart = this.cartService.getCart();
    this.findsum(this.cart);
    // console.log(this.cart);
  }

  getAddress() {
    this.token = this.authGuard.getToken();
    const user = this.jwtHelper.decodeToken(this.token);
    this.addressService.list(user.sub).subscribe(data => {
      if(data.length == 0){
        this.isEmptyAddress = true
      }
      
      this.address = data
    })
  }

  selectedAddress(addressId: any) {
    this.addressService.getById(addressId.id).subscribe(data => {
      this.addressById = data
    })
  }
  addAddress(address: Address) {
    this.token = this.authGuard.getToken();
    const user = this.jwtHelper.decodeToken(this.token);
    this.addressService.insert(user.sub, address).subscribe(data => {
      console.log(data);
      this.notification.showSuccess("Register successfull", "Success");
    })
    window.location.reload();
  }

  deleteAddress(id: number) {
    this.addressService.delete(id).subscribe({
      next: (value) => {
        console.log("Delete successfull: ", value);
        this.notification.showSuccess("Delete address successfull", "Success");
        window.location.reload();
      },
      error: (err) => {
        console.log("Error: ", err);
        this.notification.showError("Delete address failed!", "Error");
      },
    })
  }
  findsum(data: any) {
    // debugger
    this.value = data;
    console.log(this.value);
    for (let j = 0; j < data.length; j++) {
      this.subtoto = this.value[j].subtotal * this.value[j].products.sale_price;
      // console.log(this.subtoto);
      this.total += this.subtoto;
      // console.log(this.total);
    }
  }

  getOrderId(){
    this.orderService.getOrderIdLastest().subscribe(data => {
      this.orderId = data
    })
  }

  insertOrder() {
    const user = this.jwtHelper.decodeToken(this.token);
    let dataPayload = {
      paymentMethod: "Cash On Delivery",
      totalPrice: this.total + 600,
      address: this.addressById
    }
    this.orderService.insertOrder(user.sub, dataPayload).subscribe(data => {
        for (let index = 0; index < this.cart.length; index++) {
          let dataOrder = {
            product: this.cart[index].products,
            order: {
              orderid: this.orderId + 1,
              paymentMethod: data.paymentMethod,
              totalPrice: data.totalPrice,
              address: data.address,
              status: data.status,
              user: data.user
            },
            subtotal: this.cart[index].subtotal
          } 
          console.log(dataOrder);
          
          this.checkoutService.checkoutCart(dataOrder).subscribe({
            next: (resposne)=> {
              console.log(resposne)
              this.cartService.removeAllCart();
              this.notification.showSuccess("Order successfull","Success");
              this.router.navigate(['/purcharse'])
            },
            error: (err)=> {
              console.log("Error: ",err);
              this.notification.showError("Order failed","Error");
            }
          })
        }
    })
  }

  navigateEdit(id:number){
    this.router.navigate(['/addressEdit/'+id])
  }

  // get user by username
  getTokenDecoded() {
    const user = this.jwtHelper.decodeToken(this.token);
    this.authService.getUserByUsername(user.sub).subscribe(data => {
      this.tokenPayload = data;
      this.user.userid = data.userid;
      this.user.username = data.username;
      this.user.email = data.email;
      console.log(this.tokenPayload)
    })
  }

}
