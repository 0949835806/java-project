import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  category: any;
  categories: Array<any> = [];
  id: number = 0;
  pro: Array<any> = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 9;
  tableSizes: any = [3, 6, 9, 12];
  isLoggedIn = false;
  cart : Array<any> = [];
  tokenPayload: any;
  token: any;
  productSale: Array<any> = [];
  constructor(private categoryService: CategogoryService, private routex: ActivatedRoute, private productService: ProductService,
   private router: Router, private cartService: CartService, private auth: AuthGuard, private notification: NotificationService,
   private authService: AuthService, private jwtHelper: JwtHelperService, private wishListService: WishlistService) { }

  ngOnInit(): void {
    this.id = this.routex.snapshot.params['id'];
    this.categoryService.getById(this.id).subscribe(data =>{
      this.category =data;
      // console.log(this.category);
     
    })

    this.productService.getProBestSaler().subscribe(data => {
      this.productSale =data;
    })

    this.categoryService.getListCategory().subscribe(data => {
      this.categories=data;
      //  this.reLoad();
    })
    this.fetchPosts();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;  
  }
  reLoad(){
    window.location.reload();
  }
  fetchPosts():void {
    this.productService.getListProByCateId(this.id).subscribe(data => {
      this.pro =data;
    })
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.fetchPosts();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchPosts();
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

  key: string= 'id'
  reserve: boolean= false;
  sort(key: string){
    this.key = key;
    this.reserve= !this.reserve 
  }

}
