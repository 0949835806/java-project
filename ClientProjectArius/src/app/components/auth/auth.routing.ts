import { Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { MyAccountComponent } from "./my-account/my-account.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductComponent } from "./product/product.component";
import { ProductsComponent } from "./products/products.component";
import { PurcharseComponent } from "./purcharse/purcharse.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { WishListComponent } from "./wish-list/wish-list.component";
import { AddressComponent } from "./address/address.component";
import { AddressEditComponent } from "./address-edit/address-edit.component";

export const AuthRoutes: Routes =  [
    {path: 'homePage', component: HomePageComponent},
    {path: 'productDetails/:id', component: ProductDetailsComponent},
    {path: 'cart', component: CartComponent},
    {path: 'signin', component:SigninComponent},
    {path: 'signup',component:SignupComponent},
    {path: 'purcharse', component:PurcharseComponent},
    {path: 'product/:id',component:ProductComponent},
    {path: 'products', component:ProductsComponent},
    {path: 'checkout', component:CheckoutComponent},
    {path: 'myAccount', component:MyAccountComponent},
    {path: 'userEdit/:id', component:UserEditComponent},
    {path: 'orderDetails/:id', component:OrderDetailsComponent},
    {path: 'about', component:AboutComponent},
    {path: 'contacts', component:ContactsComponent},
    {path: 'wishList',component:WishListComponent},
    {path: 'address',component:AddressComponent},
    {path: 'addressEdit/:id',component:AddressEditComponent}
]