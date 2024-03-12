import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/models/category';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private categoriaService: CategoriaService,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      id_categoria: ['', ],
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

  guardarNuevoProducto() {
    if(this.productoForm.valid){
      const nuevoProducto = this.productoForm.value;
      
      // Comprobar si ya existe un producto con el mismo nombre
      this.productService.getProducts().subscribe(
        (productos: Product[]) => {
          const existeProducto = productos.find(producto => producto.nombre === nuevoProducto.nombre);
          if (existeProducto) {
            this.snackBar.open('Ya existe un producto con este nombre.', 'Cerrar', {
              duration: 3000
            });
            return;
          } else {
            // No existe un producto con el mismo nombre, procede a cerrar el diálogo y guardar el nuevo producto
            this.dialogRef.close(nuevoProducto);
          }
        },
        (error) => {
          console.error('Error al obtener los productos', error);
        }
      );
    } else {
      return;
    }
  }

  cerrarDialog() {
    this.dialogRef.close();
  }
}
