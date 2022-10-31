import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  login(username: string, password: string): Observable<any> {
    return this.http.post(environment.baseUrl + 'login?username=' + username + '&password='+password, this.options);
  }

  getUser():Observable<any>{
    return this.http.get(environment.baseUrl+"users");
  }
  

  getUserByUsername(username: string):Observable<any>{
    return this.http.get<any>(environment.baseUrl+"user/"+"findByUsername/"+username);
  }
}
