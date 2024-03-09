import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.css']
})
export class DeleteProductDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ){    
  }
  
  guardarCambios(confirmacion: boolean): void {
    this.dialogRef.close(confirmacion);
  }
}
