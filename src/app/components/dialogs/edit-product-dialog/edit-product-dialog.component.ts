import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaService } from '../../../services/categoria.service'; // Ajusta la ruta según tu estructura
import { Categoria } from '../../../models/category';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent implements OnInit {
  productoForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService // Ajusta el servicio según tu estructura
  ) {
    console.log(data);
    
    this.productoForm = this.formBuilder.group({
      nombre: [data.nombre, Validators.required],
      cantidad: [data.cantidad, Validators.required],
      reserva: [data.reserva, Validators.required],/* 
      medida: [data.medida, Validators.required], */
      id_categoria: [data.id_categoria, Validators.required],/* 
      precio_venta: [data.precio_venta, Validators.required], */
    });
  }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Error al obtener las categorías', error);
      }
    );
  }

  // En EditarProductoDialogComponent
  guardarCambios() {
    const productoEditado = { ...this.productoForm.value, id: this.data.id };
    this.dialogRef.close(productoEditado);
  }

  cerrarDialog() {
    this.dialogRef.close();
  }
}
