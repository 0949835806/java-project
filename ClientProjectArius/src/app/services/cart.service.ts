import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from '../models/orderDetails';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart : Array<any> = [];
  // product:Product;
  constructor() {
    this.cart = JSON.parse(sessionStorage.getItem('cart') ||'[]');
   }

   addCart(product:any){
    let data:any = sessionStorage.getItem('cart') ;
    let storage = JSON.parse(data);
    let itemsInCart = []
    if(sessionStorage.getItem('cart') == null){
      itemsInCart.push(product);
      sessionStorage.setItem('cart',JSON.stringify(itemsInCart))
    }else {
      
      for(var i in storage)
      {
        // console.log(storage[i].subtotal);
        if(product.products.proId == storage[i].products.proId)
        {
          storage[i].subtotal++;
          console.log("Quantity for "+i+" : "+ storage[i].subtotal);
          console.log('same product! index is ', i); 
          product=null;
          
          break;  
        }
    }
    if(product){
      itemsInCart.push(product);
    }
    storage.forEach(function (product: any){
      itemsInCart.push(product);
    })
    sessionStorage.setItem('cart',JSON.stringify(itemsInCart))
   }
   
  }

   getCart(): any{
    let data:any = sessionStorage.getItem('cart') ;
    // console.log(data)
    return JSON.parse(data);
   }

   syncItems(){
    sessionStorage.setItem('cart',JSON.stringify(this.cart)); // sync the data

  }
  deleteItem(item:any){
    item = item;
    console.log("Deleting : ",item);
    let shopping_cart;
    let index;
    let data:any = sessionStorage.getItem('cart') ;
    shopping_cart = JSON.parse(data);
    for(let i in shopping_cart){
      if (item.products.proName == shopping_cart[i].products.proName)
      {
        index = i;
        console.log(index);
      }
    }
    shopping_cart.splice(index, 1);
    console.log("shopping_cart ", shopping_cart);
    sessionStorage.setItem('cart', JSON.stringify(shopping_cart));

  }

  removeAllCart(){
    return sessionStorage.clear();
  }

  incQty(item: any)
  {
    item = item;
    let shopping_cart;
    let data:any = sessionStorage.getItem('cart') ;
    shopping_cart = JSON.parse(data);
    for(let i in shopping_cart){
      if(item.products.proName == shopping_cart[i].products.proName){
        shopping_cart[i].subtotal ++;
        item = null;
        break;
      }
    }
    sessionStorage.setItem('cart', JSON.stringify(shopping_cart));
    window.location.reload();

  }

  desQty(item: any)
  {
    item = item;
    let shopping_cart;
    let data:any = sessionStorage.getItem('cart') ;
    shopping_cart = JSON.parse(data);
    for(let i in shopping_cart){
      if(item.products.proName == shopping_cart[i].products.proName){
        shopping_cart[i].subtotal --;
        item = null;
        break;
      }
    }
    sessionStorage.setItem('cart', JSON.stringify(shopping_cart));
    window.location.reload();
  }

}  

