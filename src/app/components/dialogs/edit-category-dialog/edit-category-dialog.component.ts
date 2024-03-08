import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent {

  categoriaForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.categoriaForm = this.formBuilder.group({
      // Define tus campos de formulario aquí
      nombre: [data.nombre, Validators.required],
    });
  }

  // En EditarProveedorDialogComponent
  guardarCambios() {
    // Agrega el ID del categoria antes de cerrar el diálogo
    const categoriaEditado = { ...this.categoriaForm.value, id: this.data.id };
    this.dialogRef.close(categoriaEditado);
  }
  cerrarDialog() {
    this.dialogRef.close();
  }
}
