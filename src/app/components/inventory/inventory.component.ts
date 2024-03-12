import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, of } from 'rxjs';
import { Categoria } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductService } from 'src/app/services/product.service';
import { DeleteCategoryDialogComponent } from '../dialogs/delete-category-dialog/delete-category-dialog.component';
import { DeleteProductDialogComponent } from '../dialogs/delete-product-dialog/delete-product-dialog.component';
import { EditCategoryDialogComponent } from '../dialogs/edit-category-dialog/edit-category-dialog.component';
import { EditProductDialogComponent } from '../dialogs/edit-product-dialog/edit-product-dialog.component';
import { NewFolderComponent } from '../dialogs/new-folder/new-folder.component';
import { NewProductComponent } from '../dialogs/new-product/new-product.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Categoria[] = [];
  selectedCategoryId: number | null = null;
  searchText: string = ''; // Variable para almacenar el texto de búsqueda

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private categoryService: CategoriaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.checkProductsInReserve();
  }

  checkProductsInReserve(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        const productsInReserve = response.filter(
          (product) =>
            +product.cantidad <= +product.reserva && +product.reserva !== 0
        );
        if (productsInReserve.length > 0) {
          this.snackBar.open('¡Hay productos en reserva!', 'Cerrar', {
            duration: 5000,
          });
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  loadProducts(): void {
    if (this.selectedCategoryId === null) {
      this.productService.getProducts().subscribe(
        (response: Product[]) => {
          console.log(response);

          this.products = response.filter(
            (product) => product.id_categoria === 0
          );
          this.filteredProducts = this.products; // Inicializa la lista de productos filtrados
          console.log(this.products);

          this.loadCategories();
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    } else {
      this.productService
        .getProductsByCategory(this.selectedCategoryId)
        .subscribe(
          (response: Product[]) => {
            this.products = response;
            this.filteredProducts = this.products; // Inicializa la lista de productos filtrados
          },
          (error) => {
            console.error('Error fetching products:', error);
          }
        );
    }
  }

// Método para verificar si algún producto en reserva pertenece a una categoría específica
categoryHasProductsInReserve(categoryId: number): Observable<boolean> {
  return this.productService.getProducts().pipe(
    map((response: Product[]) => {
      const productsInCategory = response.filter(product => product.id_categoria === categoryId);
      return productsInCategory.some(product => +product.reserva >= +product.cantidad && +product.reserva !== 0);
    }),
    catchError((error) => {
      console.error('Error fetching products:', error);
      return of(false); // Manejo de errores, devuelve falso si hay un error
    })
  );
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
      data: {},
    });

    dialogRef.afterClosed().subscribe((nuevoProducto) => {
      if (nuevoProducto) {
        this.productService.createProduct(nuevoProducto).subscribe(
          (resultado) => {
            console.log('Producto agregado correctamente', resultado);
            this.snackBar.open('Producto agregado correctamente', 'Cerrar', {
              duration: 3000,
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
      data: {},
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

  loadProductsByCategory(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.loadProducts();
  }

  goBack(): void {
    this.selectedCategoryId = null;
    this.loadProducts();
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '260px',
      data: { ...product },
    });

    dialogRef.afterClosed().subscribe((result: Product | undefined) => {
      if (result) {
        this.productService.updateProduct(result.id, result).subscribe(
          (resultado) => {
            console.log('Producto actualizado correctamente', resultado);
            this.snackBar.open('Producto actualizado correctamente', 'Cerrar', {
              duration: 3000,
            });
            this.loadProducts();
          },
          (error) => {
            console.error('Error al actualizar el producto', error);
          }
        );
      }
    });
  }

  editCategory(event: MouseEvent, categoria: Categoria): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '260px',
      data: { ...categoria },
    });

    dialogRef.afterClosed().subscribe((result: Categoria | undefined) => {
      if (result) {
        this.categoryService.actualizarCategoria(result).subscribe(
          (resultado) => {
            console.log('Categoria actualizada correctamente', resultado);
            this.snackBar.open(
              'Categoria actualizada correctamente',
              'Cerrar',
              {
                duration: 3000,
              }
            );
            this.loadCategories();
          },
          (error) => {
            console.error('Error al actualizar la categoría', error);
          }
        );
      }
    });
  }

  deleteCategory(event: MouseEvent, categoria: Categoria): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent, {
      width: '260px',
      data: { ...categoria },
    });

    dialogRef.afterClosed().subscribe((confirmacion: boolean) => {
      console.log(confirmacion);

      if (confirmacion) {
        this.categoryService.eliminarCategoria(categoria.id).subscribe(
          (resultado) => {
            console.log('Categoria eliminada.', resultado);
            this.snackBar.open('Categoria eliminada correctamente', 'Cerrar', {
              duration: 3000,
            });
            this.loadCategories();
          },
          (error) => {
            console.error('Error al eliminar la categoría', error);
          }
        );
      }
    });
  }

  deleteProduct(event: MouseEvent, product: Product): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      width: '260px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((confirmacion: boolean) => {
      if (confirmacion) {
        this.productService.deleteProduct(product.id).subscribe(
          (resultado) => {
            console.log('Producto eliminada.', resultado);
            this.snackBar.open('Producto eliminado correctamente', 'Cerrar', {
              duration: 3000,
            });
            this.loadProducts();
          },
          (error) => {
            console.error('Error al eliminar la producto', error);
          }
        );
      }
    });
  }

  // Método para filtrar productos por nombre
  filterProducts(): void {
    if (this.searchText.trim() === '') {
      // Si el campo de búsqueda está vacío, mostrar todos los productos
      this.filteredProducts = this.products;
    } else {
      // Filtrar productos por nombre
      this.filteredProducts = this.products.filter((product) =>
        product.nombre.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
}
