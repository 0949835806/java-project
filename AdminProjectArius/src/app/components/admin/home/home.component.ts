import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/guard/auth-guard.service';
import { CategogoryService } from 'src/app/services/categogory.service';
import { CommentService } from 'src/app/services/comment.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  roles: Array<any> = [];
  username !: string;
  token: any;
  tokenPayload: any;
  expirationDate: any;
  isLoggedIn = false;
  users: any;
  categories: any;
  products: any;
  orders: any;
  comments: any;
  constructor(private authGuard: AuthGuard, private jwtHelper :JwtHelperService,private categoryService: CategogoryService,
  private productService: ProductService, private orderService: OrdersService, private commentService: CommentService,
  private userService: UserService) { }

  ngOnInit(): void {
    this.token = this.authGuard.getToken();

    this.isLoggedIn =!!this.authGuard.getToken();
    if(this.isLoggedIn){
      const user = this.jwtHelper.decodeToken(this.token);
      this.roles  = user.roles;

      this.username = user.sub;
    }
    
    this.category();
    this.product();
    this.order();
    this.user();
    this.comment()
  }

  category(){
    this.categoryService.getListCategory().subscribe(data => {
      this.categories =data.length;
    })
  }
  product(){
    this.productService.getListProduct().subscribe(data => {
      this.products =data.length;
    })
  }
  user(){
    this.userService.getListUser().subscribe(data => {
      this.users =data.length;
    })
  }
  order(){
    this.orderService.getOrder().subscribe(data => {
      this.orders =data.length;
    })
  }
  comment(){
    this.commentService.getListComment().subscribe(data => {
      this.comments =data.length;
    })
  }


}
