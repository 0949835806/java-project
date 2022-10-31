import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoComponent } from './components/info/info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MyInterceptor } from './my-interceptor';
import { AuthGuard } from './guard/auth-guard.service';
import { AuthComponent } from './components/auth/auth.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ErrorInterceptorService } from './error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent ,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true
  },
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true
  },
  {provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
