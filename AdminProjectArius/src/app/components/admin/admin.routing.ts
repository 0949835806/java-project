import { Router, Routes } from "@angular/router";
import { CategoryCreateComponent } from "./category-create/category-create.component";
import { CategoryEditComponent } from "./category-edit/category-edit.component";
import { CategoryComponent } from "./category/category.component";
import { CommentComponent } from "./comment/comment.component";
import { EditRoleComponent } from "./edit-role/edit-role.component";
import { HomeComponent } from "./home/home.component";
import { InfoComponent } from "./info/info.component";
import { LoginComponent } from "./login/login.component";
import { OrderEditComponent } from "./order-edit/order-edit.component";
import { OrderComponent } from "./order/order.component";
import { ProductCreateComponent } from "./product-create/product-create.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductComponent } from "./product/product.component";
import { RegisterComponent } from "./register/register.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserComponent } from "./user/user.component";

export const AdminRoutes: Routes = [
    {path: 'admin/home', component: HomeComponent},
    { path: 'info', component: InfoComponent },
    { path: 'admin/login', component: LoginComponent},
    {path: 'admin/register', component: RegisterComponent},
    {path: 'admin/category', component: CategoryComponent},
    {path: 'admin/categoryCreate', component:CategoryCreateComponent},
    {path: 'admin/categoryEdit/:id', component:CategoryEditComponent},
    {path: 'admin/product', component: ProductComponent},
    {path: 'admin/productCreate', component: ProductCreateComponent},
    { path: 'admin/productEdit/:id', component: ProductEditComponent},
    {path: 'admin/user', component:UserComponent},
    {path: 'admin/userEdit/:id', component:UserEditComponent},
    {path: 'admin/order', component:OrderComponent},
    {path: 'admin/orderEdit/:id', component:OrderEditComponent},
    {path: 'admin/comment',component:CommentComponent},
    {path: 'admin/editRole/:id',component:EditRoleComponent}
];