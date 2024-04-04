import { Injectable } from '@angular/core';
import { UserRepository } from '../domain/repositories/user.repository';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../domain/entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private userRepository: UserRepository) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
}

  login(email: string, password: string) {
    console.log(" ver login ",email);
    return this.userRepository.login(email, password);
  }

  logout() {
    this.userRepository.logout();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
}
