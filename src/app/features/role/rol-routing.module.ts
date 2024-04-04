import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ListRolComponent } from './components/list/list-role.component';
// const routes: Routes = [
//   { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
// ];

const routes: Routes = [
  {
      path: 'list-role',
      component: ListRolComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),ModalModule.forRoot()],
  exports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    UIModule,
    CarouselModule,
    ModalModule
  ]
})
export class RolRoutingModule { }
