import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 403) {
          // auto login if 403 response returned from api
          this.router.navigate(['/signin'])
          // alert("login is continue");
          // location.reload();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
  }))
  }
}
