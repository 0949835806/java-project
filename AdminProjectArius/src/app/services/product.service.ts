import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getListProduct(): Observable<any>{
    return this.http.get<any>('http://localhost:8888/api/product/');
  }

  create(product: Product, id: number):Observable<any>{
    return this.http.post<any>('http://localhost:8888/api/product/createProduct/' + id,product);
  }
  getProductById(id: number): Observable<any>{
    return this.http.get<any>('http://localhost:8888/api/product/getProById/'+id);
  }

  update(product: Product,id: number):Observable<any>{
    return this.http.put<any>('http://localhost:8888/api/product/editProduct/'+id, product);
  }

  delete(id:number){
    return this.http.delete<any>('http://localhost:8888/api/product/deleteProduct/'+id);
  }

  uploadFile(data: any):Observable<any>{
    return this.http.post<any>('http://localhost:8888/api/uploads', data);
  }
}
