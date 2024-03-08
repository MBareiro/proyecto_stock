import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductService } from 'src/app/services/product.service';
import { EditCategoryDialogComponent } from '../dialogs/edit-category-dialog/edit-category-dialog.component';
import { EditProductDialogComponent } from '../dialogs/edit-product-dialog/edit-product-dialog.component';
import { NewFolderComponent } from '../dialogs/new-folder/new-folder.component';
import { NewProductComponent } from '../dialogs/new-product/new-product.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  products: Product[] = [];
  categories: Categoria[] = [];
  selectedCategoryId: number | null = null; // Variable para almacenar el ID de la categoría seleccionada

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private categoryService: CategoriaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    // Carga todos los productos si no hay una categoría seleccionada
    if (this.selectedCategoryId === null) {      
      this.productService.getProducts().subscribe(
        (response: Product[]) => {  
          this.products = response.filter(product => product.id_categoria === 0);             
          /* this.products = response;  */
          this.loadCategories();   
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    } else {
      // Carga los productos de la categoría seleccionada
      this.productService.getProductsByCategory(this.selectedCategoryId).subscribe(
        (response: Product[]) => {
          this.products = response;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    }
  }

  
  loadCategories(): void {
    this.categoryService.getCategorias().subscribe(
      (response: Categoria[]) => {     
        this.categories = response;
      },
      (error) => {
        console.error('Error fetching categ:', error);
      }
    );
  }

  openNewProductDialog(): void {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '260px',
      data: {} // Ajusta los datos si es necesario
    });

    dialogRef.afterClosed().subscribe((nuevoProducto) => {
      if (nuevoProducto) {
        this.productService.createProduct(nuevoProducto).subscribe(
          (resultado) => {
            console.log('Producto agregado correctamente', resultado);
            this.snackBar.open('Producto agregado correctamente', 'Cerrar', {
              duration: 3000
            });
            this.loadProducts();
          },
          (error) => {
            console.error('Error al agregar el producto', error);
          }
        );
      }
    });
  }

  openNewFolderDialog(): void {
    const dialogRef = this.dialog.open(NewFolderComponent, {
      width: '260px',
      data: {} // Ajusta los datos si es necesario
    });

    dialogRef.afterClosed().subscribe((nuevoFolder) => {
      if (nuevoFolder) {
        this.categoryService.crearCategoria(nuevoFolder).subscribe(
          (resultado) => {
            console.log('Categoria agregada correctamente', resultado);
            this.loadCategories();
          },
          (error) => {
            console.error('Error al agregar la categoría', error);
          }
        );
      }
    });
  }

  // Método para cargar los productos de una categoría seleccionada
  loadProductsByCategory(categoryId: number): void {
    this.selectedCategoryId = categoryId; // Actualiza el ID de la categoría seleccionada
    this.loadProducts(); // Vuelve a cargar los productos
  }

  goBack(): void {
    this.selectedCategoryId = null
    this.loadProducts();
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '260px',
      data: {...product} // Ajusta los datos si es necesario
    });

    dialogRef.afterClosed().subscribe((result: Product | undefined) => {
      if (result) {
        this.productService.updateProduct(result.id, result).subscribe(
          (resultado) => {
            console.log('Producto actualizado correctamente', resultado);
            this.snackBar.open('Producto actualizado correctamente', 'Cerrar', {
              duration: 3000
            });
            this.loadProducts();
          },
          (error) => {
            console.error('Error al actualizar el producto', error);
          }
        );
      }
    });
    // Aquí puedes abrir un diálogo de edición de producto o redirigir a una página de edición
    console.log('Editar producto:', product);
  }

  editCategory(event: MouseEvent, categoria: Categoria): void {
    event.stopPropagation(); // Detiene la propagación del evento
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '260px',
      data: {...categoria} // Ajusta los datos si es necesario
    });
  
    dialogRef.afterClosed().subscribe((result: Categoria | undefined) => {
      if (result) {
        this.categoryService.actualizarCategoria(result).subscribe(
          (resultado) => {
            console.log('Categoria actualizada correctamente', resultado);
            this.snackBar.open('Categoria actualizada correctamente', 'Cerrar', {
              duration: 3000
            });
            this.loadCategories();
          },
          (error) => {
            console.error('Error al actualizar la categoría', error);
          }
        );
      }
    });
    console.log('Editar categoría:', categoria);
  }
  
  
}
