import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthRoutes } from './auth.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { PurcharseComponent } from './purcharse/purcharse.component';
import { PreHeaderComponent } from './pre-header/pre-header.component';
import { PreFooterComponent } from './pre-footer/pre-footer.component';
import { ProductComponent } from './product/product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsComponent } from './products/products.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { Ng2OrderModule } from 'ng2-order-pipe';


@NgModule({
  declarations: [
    HomePageComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    CartComponent,
    SigninComponent,
    SignupComponent,
    PurcharseComponent,
    PreHeaderComponent,
    PreFooterComponent,
    ProductComponent,
    ProductsComponent,
    MyAccountComponent,
    UserEditComponent,
    OrderDetailsComponent,
    NavbarComponent,
    AboutComponent,
    ContactsComponent,
    WishListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule, 
    Ng2OrderModule
  ]
})
export class AuthModule { }
