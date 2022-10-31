import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './category/category.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { ProductComponent } from './product/product.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { OrderComponent } from './order/order.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { CommentComponent } from './comment/comment.component';
import {Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { EditRoleComponent } from './edit-role/edit-role.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    InfoComponent,
    LoginComponent,
    NavMenuComponent,
    RegisterComponent,
    CategoryComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    ProductComponent,
    ProductCreateComponent,
    ProductEditComponent,
    UserComponent,
    UserEditComponent,
    OrderComponent,
    OrderEditComponent,
    CommentComponent,
    EditRoleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    FormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2OrderModule,
  ]
})
export class AdminModuleModule {}
