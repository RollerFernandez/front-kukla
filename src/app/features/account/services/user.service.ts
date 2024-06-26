import { Injectable } from '@angular/core';
import { UserRepository } from '../domain/repositories/user.repository';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../domain/entities/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private router: Router,private userRepository: UserRepository) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
}

   login(email: string, password: string) {
       return this.userRepository.login(email, password);
  }

  logout() {
    this.userRepository.logout();
    this.router.navigate(['/account/login']); 
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  isOnLoginPage(): boolean {
    // Verifica si la ruta actual es la página de inicio de sesión
    return this.router.url.includes('/login');
  }
}
