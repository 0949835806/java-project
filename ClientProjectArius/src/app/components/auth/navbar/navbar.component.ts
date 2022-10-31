import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CategogoryService } from 'src/app/services/categogory.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cart : any;
  totalNumber:number =0;
  value :any;
  total: number =0;
  subtoto: number =0;
  isCart= false;
  category: Array<any> = [];
  constructor(private categoryService:CategogoryService, private cartService: CartService) { }

  ngOnInit(): void {
    this.categoryService.getListCategory().subscribe(data => {
      this.category =data;
      // console.log(this.category)
    })
    this.cart = this.cartService.getCart();
    this.totalNumber = this.cart.length;
    
    this.findsum(this.cart);
    this.isCart = !!sessionStorage.getItem('cart');
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
  onDelete(product:any){
    this.cartService.deleteItem(product);
    window.location.reload();
  }
}
