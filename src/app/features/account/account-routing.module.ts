import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AlertModule } from 'ngx-bootstrap/alert';

// const routes: Routes = [
//   { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
// ];

const routes: Routes = [
  {
      path: 'login',
      component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    UIModule,
    CarouselModule
  ]
})
export class AccountRoutingModule { }
