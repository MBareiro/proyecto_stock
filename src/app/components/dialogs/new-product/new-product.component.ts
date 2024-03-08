import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/models/category';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {

  productoForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private dialogRef: MatDialogRef<NewProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService // Ajusta el servicio según tu estructura
  ) {
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      reserva: ['', Validators.required],
      precio_compra: ['', Validators.required],/* 
      precio_venta: ['', Validators.required], */
      medida: ['', Validators.required],
      id_categoria: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias;
        console.log(this.categorias);
        
      },
      (error) => {
        console.error('Error al obtener las categorías', error);
      }
    );
  }

  guardarNuevoProducto() {
    const nuevoProducto = this.productoForm.value;
    nuevoProducto.cantidad = parseInt(nuevoProducto.cantidad);

    // Puedes realizar acciones adicionales antes de cerrar el diálogo si es necesario
    this.dialogRef.close(nuevoProducto);
  }

  cerrarDialog() {
    this.dialogRef.close();
  }
}

