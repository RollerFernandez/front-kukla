import { Injectable } from '@angular/core';
import { RoleRepository } from '../domain/repositories/role.repository';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../domain/entities/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private roleRepository: RoleRepository) {
}

  lisOfRole() {
    return this.roleRepository.getList();
  }


}
