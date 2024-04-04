import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolRoutingModule } from './rol-routing.module';
import { ListRolComponent } from './components/list/list-role.component';

@NgModule({
  declarations: [ListRolComponent],
  imports: [
    CommonModule,
    RolRoutingModule
  ]
})
export class RoleModule { }
