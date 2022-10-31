import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  getListComment():Observable<any>{
    return this.http.get<any>('http://localhost:8888/api/comment/');
  }

  insertComment(data:any):Observable<any>{
    return this.http.post<any>('http://localhost:8888/api/comment/saveComment',data);
  }

  getCommentByProId(id:string):Observable<any>{
    return this.http.get<any>('http://localhost:8888/api/comment/getCmtByproId/'+id);
  }

  deleteComment(id:number){
    return this.http.delete<any>('http://localhost:8888/api/comment/deleteComment/'+id);
  }
}
