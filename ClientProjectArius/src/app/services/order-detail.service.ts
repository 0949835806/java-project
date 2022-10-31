import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private http: HttpClient) { }

  insertOrderDetail(data: any):Observable<any>{
    return this.http.post<any>('http://localhost:8888/api/lineItems/saveLineItems',data);
  }
}
