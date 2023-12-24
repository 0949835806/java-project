import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/guard/auth-guard.service';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CategogoryService } from 'src/app/services/categogory.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  category: Array<any> = [];
  product: Array<any> = [];
  threePro :Array<any> =[];
  twoPro :Array<any> =[];
  token: any;
  tokenPayload: any;
  isLoggedIn = false;
  constructor(private catergoryService: CategogoryService, private productService: ProductService, private cartService: CartService,
    private notification: NotificationService,private authService: AuthService, private jwtHelper: JwtHelperService, private auth: AuthGuard,
    private router:Router, private wishListService: WishlistService) { }


  cart : Array<any> = [];
  ngOnInit(): void {
    this.catergoryService.getListCategory().subscribe(data => {
      this.category =data;
    })

    this.productService.getNewProduct().subscribe(data => {
      this.product =data;
    })

    this.productService.getListProduct().subscribe(data=> {
      this.threePro =data;
    })

    this.productService.getProBestSaler().subscribe(data => {
      this.twoPro =data;
    })
    
  }
  
  reLoad(){
    window.location.reload();
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

  GetTokenDecoded() {
    const user = this.jwtHelper.decodeToken(this.token);
    this.authService.getUserByUsername(user.sub).subscribe(data => {
      this.tokenPayload =data;
      console.log(this.tokenPayload)
    })
    
  }

  addToWishList(product:Product){
    this.isLoggedIn= !!this.auth.getToken();
    if(!this.isLoggedIn){
      alert("loggin to continue")
      this.router.navigate(['/signin'])
    }else {
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
}
