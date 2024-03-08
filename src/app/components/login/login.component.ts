import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(email, password).subscribe(
      (response: any) => {
        if (response.is_authenticated) {
          // Almacenar la información del usuario en el almacenamiento local
          localStorage.setItem('userId', response.usuario.id);
          localStorage.setItem('userName', response.usuario.nombre);
          localStorage.setItem('userRole', response.usuario.role);

          // Redirigir a la página principal o a la página deseada después del inicio de sesión
          // Puedes personalizar esto según tu aplicación
          this.router.navigate(['/navigation']);
        } else {
          // Manejar el caso en el que las credenciales son incorrectas
          this.snackBar.open('Credenciales incorrectas', 'Cerrar', {
            duration: 4000
          });
        }
      },
      (error) => {
        const errorMessage = error['error'];
        
        this.snackBar.open('Credenciales incorrectas', 'Cerrar', {
          duration: 4000
        });      
        
        console.error('Error en la solicitud:', error);
      }
    );
  }  

}
