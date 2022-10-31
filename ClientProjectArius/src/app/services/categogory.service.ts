import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategogoryService {

  constructor(private http: HttpClient) { }

  //hiển thị tất cả danh mục có phân trang
  getListCategory(): Observable<any>{
    return this.http.get<any>('http://localhost:8888/api/category');
  }

  create(data: any):Observable<any>{
    return this.http.post<any>('http://localhost:8888/api/category/createCategory/getCateById/', data);
  }

  delete(cateId: number):Observable<any>{
    return this.http.delete<any>('http://localhost:8888/api/category/delete/'+cateId);
  }

  getById(id: number): Observable<any>{
    return this.http.get<any>('http://localhost:8888/api/category/getCateById/'+id);
  }
  update(id:number, data: any):Observable<any>{
    return this.http.put<any>('http://localhost:8888/api/category/editCategory/'+id, data);
  }



}
