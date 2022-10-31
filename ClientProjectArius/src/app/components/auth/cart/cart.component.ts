import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { Storage } from '@ionic/storage';
import { Product } from 'src/app/models/product';
import { throwIfEmpty } from 'rxjs';
import { AuthGuard } from 'src/app/guard/auth-guard.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any;
  cartItem = false;
  total: number =0;
  value :any;
  isCart =false;
  token: any;
  tokenPayload: any;
  expirationDate: any;
  isLoggedIn = false;
  productSale: Array<any> = [];
  subtoto : number = 0;
  constructor(private cartService: CartService, private notification: NotificationService,private authGuard: AuthGuard,
    private router:Router, private productService: ProductService,private authService: AuthService, 
    private jwtHelper: JwtHelperService, private wishListService: WishlistService) { }

  ngOnInit(): void {  
    this.getCartItems();
    this.checkSession();
    this.productService.getProBestSaler().subscribe(data => {
      this.productSale =data;
    })
  }

  getCartItems(){
    this.cart = this.cartService.getCart();
    this.findsum(this.cart);
    console.log(this.cart);
  }

  checkSession(){
    this.isCart = !!sessionStorage.getItem('cart');
  }

  addToCart(product:Product){
    let dataCart = {
      // image: product.image,
      // proName: product.proName,
      // proId: product.proId,
      subtotal: 1,
      // sale_price: product.sale_price,
      products : product
    }
    this.cartService.addCart(dataCart);
    // alert("Add to cart successfull");
    window.location.reload();
    this.notification.showSuccess("Add to cart successfull","Success");
    
  }
  
  
  findsum(data:any){
    // debugger
    this.value =data;
    // console.log(this.value);
    for(let j=0; j<data.length;j++){
      this.subtoto =this.value[j].subtotal*this.value[j].products.sale_price;
      // console.log(this.subtoto);
      this.total += this.subtoto;
      // console.log(this.total);
    }
  }

  incQty(product:any){
    this.cartService.incQty(product);
  }

  desQty(product:any){
    this.cartService.desQty(product);
  }

  onDelete(product:any){
    this.cartService.deleteItem(product);
    window.location.reload();
  }

  clearCart(){
    this.cartService.removeAllCart();
    window.location.reload();
  }

  checkoutCart(){
    this.isLoggedIn= !!this.authGuard.getToken();
    if(!this.isLoggedIn){
      alert("loggin to continue")
      this.router.navigate(['/signin'])
    }else {
      this.router.navigate(['/checkout'])
    }
  }

  GetTokenDecoded() {
    const user = this.jwtHelper.decodeToken(this.token);
    this.authService.getUserByUsername(user.sub).subscribe(data => {
      this.tokenPayload =data;
      console.log(this.tokenPayload)
    })
    
  }

  addToWishList(product:Product){
    let wishlist={
      products: product,
      users: this.tokenPayload
    }
    this.wishListService.saveWishList(wishlist).subscribe(data => {
      console.log(data);
      
    });
    this.notification.showSuccess("Add to wishlist successfull","Success");
  }
}
