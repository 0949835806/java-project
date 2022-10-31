import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CategogoryService } from 'src/app/services/categogory.service';
import { NotificationService } from 'src/app/services/notification.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  category: Array<any> = [];
  wishlist :Array<any> = [];
  constructor(private catergoryService: CategogoryService,private wishListService: WishlistService,
    private cartService: CartService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.catergoryService.getListCategory().subscribe(data => {
      this.category =data;
    })

    this.wishListService.getWishList().subscribe(data => {
      this.wishlist =data;
      console.log(this.wishlist);
    })
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

  deleteWishList(id:number){
    console.log(id);
    
    this.wishListService.deleteItemWish(id).subscribe(data => {

    });
    // window.location.reload();
    this.notification.showSuccess("Delete successfull","Success");
  }
}
