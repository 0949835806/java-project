import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageProductService {

  constructor(private http:HttpClient) { }

  addImageProduct(data: any):Observable<any>{
    return this.http.post<any>('http://localhost:8888/api/imageProdcut/addImageProduct', data);
  }

  updateImageProduct(data:any, id: number):Observable<any>{
    return this.http.put<any>('http://localhost:8888/api/imageProdcut/editImageProduct/'+id, data);
  }

  getImageByProduct(proId: any):Observable<any>{
    return this.http.get('http://localhost:8888/api/imageProdcut/getImageByProId/'+proId);
  }
}
