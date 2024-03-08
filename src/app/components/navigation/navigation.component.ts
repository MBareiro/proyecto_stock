import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);
  userName: string | null;
  userRole: string | null;

  constructor(private authService: AuthService, private router: Router){
    this.userName = localStorage.getItem('userName');
    this.userRole = localStorage.getItem('userRole');
    authService.authorized();
  }
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    logout() {
      // Eliminar el ID del usuario del almacenamiento local al cerrar sesión
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirigir a la página de inicio de sesión
  }


}
