import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getListUser():Observable<any>{
    return this.http.get<any>('http://localhost:8888/api/users');
  }

  onDelete(id: number):Observable<any>{
    return this.http.delete<any>('http://localhost:8888/api/deleteUser/'+id);
  }

  getUserById(id:number):Observable<any>{
    return this.http.get<any>('http://localhost:8888/api/user/'+id);
  }

  getUserByUsername(username:string):Observable<any>{
    return this.http.get<any>('http://localhost:8888/api/user/findByUsername/'+username);
  }

  getRoles():Observable<any>{
    return this.http.get<any>('http://localhost:8888/api/roles/');
  }

  onUpdate(user:User, id:number):Observable<any>{
    return this.http.put<any>('http://localhost:8888/api/user/editAdmin/'+id, user);
  }

  editRole(id:number,data:any):Observable<any>{
    return this.http.put<any>('http://localhost:8888/api/role/addtouser/'+id,data);
  }
}
