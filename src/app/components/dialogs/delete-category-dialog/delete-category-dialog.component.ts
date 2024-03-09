import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html',
  styleUrls: ['./delete-category-dialog.component.css']
})
export class DeleteCategoryDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ){
    
  }
  
  guardarCambios(confirmacion: boolean): void {
    this.dialogRef.close(confirmacion);
  }
}
