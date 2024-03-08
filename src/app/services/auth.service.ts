import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const body = { email: username, password: password };
    return this.http.post(`${this.baseUrl}/login`, body);
  }

  authorized() {
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    
    if (!userName || !userId || !userRole) {      
      this.router.navigate(['/']);
    }
  }

  isAdmin(): Observable<boolean> {
    const userRole = localStorage.getItem('userRole');    
    // Supongamos que 'admin' es el rol que identifica a un usuario administrador
    return of(userRole === 'admin');
  }

  logout(): Observable<any> {
    // Realizar una solicitud POST al backend para cerrar la sesión
    return this.http.post(`${this.baseUrl}/logout`, {});
  }
}
