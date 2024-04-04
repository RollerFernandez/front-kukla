import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../entities/role';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RoleRepository {

    private currentUserSubject: BehaviorSubject<Role>;
    public currentUser: Observable<Role>;
    public roles:Role[];
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Role>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Role {
        return this.currentUserSubject.value;
    }

    getList() {
        return this.http.get<any>(`${environment.apiUrl}/role`)
            .pipe(
                map(role => {
                    if (role.success) {
                        return role.data;
                    }
                }),
                catchError(error => {
                    console.error("Error al iniciar sesión:", error);
                    throw error;
                })
            );
    }
}
