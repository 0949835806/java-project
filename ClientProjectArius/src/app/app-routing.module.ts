import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "homePage",
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthComponent ,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/components/auth/auth.module').then(m=>m.AuthModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
