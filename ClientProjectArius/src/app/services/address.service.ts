import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  insert(userId: number ,data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8888/api/address/addAddress/'+userId,data);
  }

  
}
