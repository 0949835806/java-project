import { Component, Directive, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/guard/auth-guard.service';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CategogoryService } from 'src/app/services/categogory.service';
import { CommentService } from 'src/app/services/comment.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id!: string;
  product: any;
  value = 1;
  category : Array<any> = [];
  cart : Array<any> = [];
  today = new Date();
  token: any;
  tokenPayload: any;
  comment: Array<any>= [];
  cmtNumber: number =0;
  productSale : Array<any> = [];
  productSaler : Array<any> = [];
  productByCateId: any;
  isLoggedIn =false;
  imgId!: number;
  @ViewChild("myCateElem") myCateElem!: ElementRef;
  @ViewChild("imageCarousel") imageCarousel!: ElementRef;
  constructor(private productService: ProductService, private routex: ActivatedRoute,private categoryService: CategogoryService,
    private cartService: CartService,private notification:NotificationService, private authGuard:AuthGuard,private router:Router, 
    private authService:AuthService, private jwtHelper: JwtHelperService, private commentService:CommentService,private wishListService: WishlistService) {
   }


  ngOnInit(): void {
    this.id = this.routex.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe(data => {
      this.product =data;    
      this.productByCateId =data.cateId.cateId;
      this.getProByCateId(this.productByCateId);
    })

    this.categoryService.getListCategory().subscribe(data => {
      this.category =data;
     
    })

    this.token = this.authGuard.getToken();
    this.GetTokenDecoded();

    this.commentService.getCommentByProId(this.id).subscribe(data => {
      this.comment =data;
      this.cmtNumber =data.length;
    })
    this.productService.getProBestSaler().subscribe(data => {
      this.productSaler =data;
      console.log(data);
      
    })
  }

  getProByCateId(cateid:number){
    // console.log(cateid);
    this.productService.getListProByCateId(cateid).subscribe(data =>{
      this.productSale =data;
      // console.log(this.productSale)
    })
  }
  handleMinus() {
    this.value--;  
  }
  handlePlus() {
    this.value++;    
  }

  addToCart(product:any){
    let dataCart = {
      // image: product.image,
      // proName: product.proName,
      // proId: product.proId,
      subtotal: this.myCateElem.nativeElement.value,
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



  insertCmt(data:any,pro: any){
    this.isLoggedIn= !!this.authGuard.getToken();
    if(!this.isLoggedIn){
      alert("loggin to continue")
      this.router.navigate(['/signin'])
    }else {
      let dataCmt = {
      text: data.text,
      createDate: this.today,
      product: pro,
      users: this.tokenPayload
    }
    console.log(dataCmt);
    this.commentService.insertComment(dataCmt).subscribe(res => {
      console.log(res);
    })
    window.location.reload();
    this.notification.showSuccess("Comment successfull", "Success");
    }
    
   
  }

  addToWishList(product:Product){
    this.isLoggedIn= !!this.authGuard.getToken();
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
  imageChange(src:any, id: number){
    var prev:any = document.getElementById("preview");
    prev.src =src;
    prev.alt = id;
    this.imgId = id;
  }

}
