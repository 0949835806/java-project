import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  insert(userName: string ,data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8888/api/address/addAddress/'+userName,data);
  }

  list(userName: string): Observable<any> {
    return this.http.get<any>('http://localhost:8888/api/address/'+userName);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>('http://localhost:8888/api/address/getAddressById/'+id);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>('http://localhost:8888/api/address/deleteAddress/'+id);
  }

  update(username: any, data: any): Observable<any> {
    return this.http.put<any>('http://localhost:8888/api/address/editAddress/'+username,data);
  }
}
