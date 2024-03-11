import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.css'],
})
export class NewFolderComponent {
  categoriaForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<NewFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.categoriaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }

  guardarNuevoCategoria() {
    if (this.categoriaForm.valid) {
      // Puedes realizar acciones adicionales antes de cerrar el diálogo si es necesario
      this.dialogRef.close(this.categoriaForm.value);
    }
  }

  cerrarDialog() {
    this.dialogRef.close();
  }
}
