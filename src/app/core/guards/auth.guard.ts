import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';
import { UserService } from 'src/app/features/account/services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private authFackservice: AuthfakeauthenticationService,
        private userservice: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (environment.defaultauth === 'firebase') {
            const currentUser = this.authenticationService.currentUser();
            if (currentUser) {
                // logged in so return true
                return true;
            }
        } else {
            const currentUser = this.userservice.currentUserValue;
            const currentUser2 = this.authFackservice.currentUserValue;
            
            if (currentUser) {
                console.log("entro canActivate", currentUser);
                // logged in so return true
                return true;
            }
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login']);
        return false;
    }
}
