import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './components/list/list.component';
import { ModalUpdateComponent } from './components/widget/modalUpdate/update.component';
import { ModalRegisterComponent } from './components/widget/modalRegister/register.component';

@NgModule({
  declarations: [ListComponent, ModalUpdateComponent,ModalRegisterComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
