import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return new Observable<boolean>((observer) => {
      this.authService.isAdmin().subscribe(isAdmin => {
        if (isAdmin) {
          observer.next(true); // Permite el acceso si el usuario es administrador
          observer.complete();
        } else {
          // Si el usuario no es administrador, redirigir a alguna página de acceso denegado o iniciar sesión.
          this.router.navigate(['/access-denied']);
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}
