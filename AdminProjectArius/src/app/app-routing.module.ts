import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/admin/home/home.component';
import { AuthGuard } from './guard/auth-guard.service';
import { AdminModuleModule } from 'src/app/components/admin/admin-module.module';

const routes: Routes = [
  { path: '',
    redirectTo: 'admin/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/components/admin/admin-module.module').then(m => m.AdminModuleModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, BrowserModule, ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
