import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MyInterceptor } from './my-interceptor';
import { AuthGuard } from './guard/auth-guard.service';
import { AdminModuleModule } from './components/admin/admin-module.module';
import { AdminComponent } from './components/admin/admin.component';
import { ErrorComponent } from './components/error/error.component';
import { RouterModule } from '@angular/router';
import { ErrorInterceptorService } from './error-interceptor.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ErrorComponent
  ],
  imports: [
    Ng2SearchPipeModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule,
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true
  },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  {provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
