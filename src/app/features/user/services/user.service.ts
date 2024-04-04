import { Injectable } from '@angular/core';
import { UserRepository } from '../domain/repositories/user.repository';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private userRepository: UserRepository) {
}

  lisOfUser() {
    return this.userRepository.getList();
  }

  getUser(id:number) {
    return this.userRepository.get(id);
  }

  register(data:any){
    const newUser = {
      name: data.name,
      firstSurname: data.firstSurname,
      lastSurname: data.lastSurname,
      email: data.email,
      phone:data.phone,
      password:data.password,
      roles:[parseInt(data.role)]
  };


    return this.userRepository.registrar(newUser);
  }

  update(id:number, data:any){
    const newUpdate = {
      name: data.name,
      firstSurname: data.firstSurname,
      lastSurname: data.lastSurname,
      email: data.email,
      phone:data.phone,
      roles:[parseInt(data.role)]
  };

  console.log();

    return this.userRepository.update(id,newUpdate);
  }

  updateStatus(id:number, data:any){
    const newUpdate = {
        status: data.status
    };

    return this.userRepository.statusUpdate(id,newUpdate);
  }

}
