import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/guard/auth-guard.service';
import { Cart } from 'src/app/models/cart';
import { OrderDetails } from 'src/app/models/orderDetails';
import { Orders } from 'src/app/models/orders';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';
declare const $:any;

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
  total: number =0;
  subtoto: number =0;
  value :any;
  products: any;
  id !:string;
  orders: any;
  isCart=false;
  isLoggin=false;
  constructor(private authGuard: AuthGuard, private authService: AuthService, private jwtHelper: JwtHelperService, 
  private orderService: OrdersService, private cartService: CartService, private checkoutService: OrdersService,
  private notification: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.authGuard.getToken();
    this.isLoggin= !!this.authGuard.getToken();
    this.isCart = !!sessionStorage.getItem('cart');
    this.getTokenDecoded();
    this.getCartItems();
  }


  getCartItems(){
    this.cart = this.cartService.getCart();
    this.findsum(this.cart);
    // console.log(this.cart);
  }

  findsum(data:any){
    // debugger
    this.value =data;
    console.log(this.value);
    for(let j=0; j<data.length;j++){
      this.subtoto =this.value[j].subtotal*this.value[j].products.sale_price;
      // console.log(this.subtoto);
      this.total += this.subtoto;
      // console.log(this.total);
    }
  }

  insertOrder(){
    
    let dataPayload={ 
      dateofset : this.today,
      note : this.myCateElem.nativeElement.value,
      delivery: this.myCateElen.nativeElement.value,
      user : this.tokenPayload,
      
    }
    if(!this.myCateElen.nativeElement.validity.valid){
      this.notification.showWarning("You must be click your delivery to continue", "Warning");
      $("#tab-content").click();
      return;
    }
    else{
      this.orderService.insertOrder(dataPayload).subscribe(data => {
        console.log("order ",data)
        let order: any = data;
        // this.orders=data;
        // this.checkoutCart()
        for (let index = 0; index < this.cart.length; index++) {
          let dataOrder = {
            price : this.total+600,
            product: this.cart[index].products,
            quantity: this.cart[index].subtotal,
            order
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
              this.notification.showError("Order failed","Error");
            }
          })
        }
      })
    }
    
  }


  // get user by username
  getTokenDecoded(){
    const user = this.jwtHelper.decodeToken(this.token);
    this.authService.getUserByUsername(user.sub).subscribe(data => {
      this.tokenPayload =data;
      this.user.userid =data.userid;
      this.user.fullName =data.fullName;
      this.user.username = data.username;
      this.user.email = data.email;
      this.user.address = data.address;
      this.user.phone = data.phone;
      console.log(this.tokenPayload)
    })
  }

}
