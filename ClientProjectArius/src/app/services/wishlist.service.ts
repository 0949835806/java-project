import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http:HttpClient) { }

  getWishList():Observable<any>{
    return this.http.get<any>('http://localhost:8888/api/wishlist/');
  }

  saveWishList(data:any):Observable<any>{
    return this.http.post<any>('http://localhost:8888/api/wishlist/saveWishList', data);
  }

  deleteItemWish(id:number):Observable<any>{
    return this.http.delete<any>('http://localhost:8888/api/wishlist/deleteWishlist/' + id);
  }
}
