import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { User } from '../entities/user.entities';

@Injectable({
    providedIn: 'root'
})
export class UserRepository {

    constructor(private http: HttpClient) {
        
    }

    getList() {
        return this.http.get<any>(`${environment.apiUrl}/users`)
            .pipe(
                map(user => {
                    if (user.success) {
                        return user.data;
                    }
                }),
                catchError(error => {
                    console.error("Error al iniciar sesión:", error);
                    throw error;
                })
            );
    }

    

    get(id: number) {
        return this.http.get<any>(`${environment.apiUrl}/users/${id}`)
            .pipe(
                map(user => {
                    if (user.success) {
                        return user.data;
                    }
                }),
                catchError(error => {
                    console.error("Error al iniciar sesión:", error);
                    throw error;
                })
            );
    }

    registrar(data:any) {
        console.log(" ver modelo ",data);
        return this.http.post<any>(`${environment.apiUrl}/users`,data)
            .pipe(
                map(user => {
                    if (user.success) {
                        return user.data;
                    }
                }),
                catchError(error => {
                    console.error("Error al iniciar sesión:", error);
                    throw error;
                })
            );
    }

    update(id:number, data:any) {
        console.log(" ver modelo ",data);
        return this.http.put<any>(`${environment.apiUrl}/users/${id}`,data)
            .pipe(
                map(user => {
                    if (user.success) {
                        return user.data;
                    }
                }),
                catchError(error => {
                    console.error("Error al iniciar sesión:", error);
                    throw error;
                })
            );
    }

    statusUpdate(id:number, data:any) {
        return this.http.post<any>(`${environment.apiUrl}/users/${id}`,data)
            .pipe(
                map(user => {
                    if (user.success) {
                        return user.data;
                    }
                }),
                catchError(error => {
                    console.error("Error al iniciar sesión:", error);
                    throw error;
                })
            );
    }
}
