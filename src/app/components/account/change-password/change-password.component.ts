import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  hide1 = true;
  hide2 = true;
  hide3 = true;

  passwordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(10)]),
    confirmPassword:  new FormControl('', [Validators.required, Validators.minLength(10)]),
  });  

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private formBuilder: FormBuilder, private userService: UserService, private snackBar: MatSnackBar) {}
  
  changePassword(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const user = {
        old_password: this.passwordForm.value.oldPassword,
        new_password: this.passwordForm.value.newPassword,
        confirm_password: this.passwordForm.value.confirmPassword,
      };
      // Agregar validaciones de contraseña si es necesario
      this.userService
        .changePassword(
          parseInt(userId),
          user.old_password,
          user.new_password,
          user.confirm_password
        )
        .subscribe(
          (data) => {
            //console.log('Password changed successfully:', data);            
            this.snackBar.open('Contraseña actualizada correctamente.', 'Cerrar', {
              duration: 4000
            });
            this.passwordForm.reset()
          },
          (error) => {
            console.error('Error changing password:', error);            
            // Mostrar un mensaje de error al usuario
            this.snackBar.open('Contraseña antigua incorrecta.', 'Cerrar', {
              duration: 4000
            });
          }
        );
    } else {
      console.error('No user ID found in localStorage.');
    }
  }  
  
  onSubmit() {
    if (this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) {      
      // Mostrar un mensaje de error al usuario
      this.snackBar.open('La contraseña nueva y su confirmacion no coinciden.', 'Cerrar', {
        duration: 4000
      });
    } else {
      // Llama a la función para cambiar la contraseña
      this.changePassword();
    }
  }
}
