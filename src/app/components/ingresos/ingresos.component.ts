import { Component, Renderer2 } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
} from '@angular/material/snack-bar'; /* 
import { EntradaService } from 'src/app/services/entrada.service';
import { ProveedorService } from 'src/app/services/proveedor.service'; */
import { IngresoService } from 'src/app/services/ingreso.service';
import { ProductService } from '../../services/product.service';

export interface PeriodicElement {
  position: number;
  cod_product: string;
  nombre: string;
  cantidad: number;
  reserva: number;
}

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css'],
})
export class IngresosComponent {
  productos: any[] = [];
  proveedores: any[] = [];
  selectedProduct: any;
  selectedProveedor: any;
  isProductoSeleccionado: boolean = false;
  isProveedorSeleccionado: boolean = false;
  isPrecioCompraValido: boolean = false;

  precioCompraInput: number | null = null;
  precioVentaInput: number | null = null;
  cantidadInput: number | null = null;
  reservaInput: number | null = null;
  total: number = 0;

  displayedColumns: string[] = [
    'Nombre',
    'Cantidad',
    'Reserva',
    'Importe',
    'Eliminar',
  ];
  dataSource: PeriodicElement[] = [];

  constructor(
    private productoService: ProductService,
    private ingresosService: IngresoService,
    private renderer: Renderer2,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Inicializa la tabla con 10 filas vacías
    this.dataSource = [];

    // Inicializa los campos con null
    this.cantidadInput = null;
    this.reservaInput = null;
    this.precioCompraInput = null;
    this.precioVentaInput = null;

    // Carga la lista de productos
    this.productoService.getProducts().subscribe(
      (productos) => {
        this.productos = productos;
      },
      (error) => {
        console.error('Error al obtener la lista de productos', error);
      }
    );
  }

  Producto() {
    // Verifica si la opción seleccionada no es la deshabilitada
    if (this.selectedProduct && this.selectedProduct !== '-') {
      this.isProductoSeleccionado = true;
      const selectedProduct = this.productos.find(
        (producto) => producto.id === parseInt(this.selectedProduct, 10)
      );

      // Establece el valor de reserva del producto seleccionado en el input de reserva
      if (selectedProduct) {
        this.reservaInput = selectedProduct.reserva;
      } else {
        // En caso de que no se encuentre el producto seleccionado, establece el input de reserva en null
        this.reservaInput = null;
      }
    } else {
      this.isProductoSeleccionado = false;
    }
  }

  Proveedor() {
    this.isProveedorSeleccionado = true;
  }

  CantidadValidacion() {
    // Verifica si el valor de cantidad es un número válido y mayor o igual a 0
    if (
      this.cantidadInput !== null &&
      typeof this.cantidadInput === 'number' &&
      isFinite(this.cantidadInput) &&
      this.cantidadInput > 0
    ) {
      // Valor válido, remueve la clase is-invalid
      this.renderer.removeClass(
        document.getElementById('cantidad'),
        'is-invalid'
      );
    } else {
      // Valor no válido, agrega la clase is-invalid
      this.renderer.addClass(document.getElementById('cantidad'), 'is-invalid');
      if (this.cantidadInput === null) {
        this.mostrarSnackbar('Debe completar el campo Cantidad', [
          'error-snackbar',
        ]);
      } else if (this.cantidadInput <= 0) {
        this.mostrarSnackbar(
          'El valor en el campo Cantidad debe ser mayor a 0',
          ['error-snackbar']
        );
      } else {
        this.mostrarSnackbar(
          'No se pueden ingresar valores negativos en el campo Cantidad',
          ['error-snackbar']
        );
      }
    }
  }

  ReservaValidacion() {
    // Verifica si el valor de reserva es un número válido y mayor o igual a 0
    if (
      this.reservaInput !== null &&
      !isNaN(this.reservaInput) &&
      this.reservaInput >= 0
    ) {
      // Valor válido, remueve la clase is-invalid
      this.renderer.removeClass(
        document.getElementById('reserva'),
        'is-invalid'
      );
    } else {
      console.log(this.reservaInput);
      // Valor no válido, agrega la clase is-invalid
      this.renderer.addClass(document.getElementById('reserva'), 'is-invalid');
      if (this.reservaInput === null) {
        this.mostrarSnackbar('Debe completar el campo Reserva', [
          'error-snackbar',
        ]);
      } else if (this.reservaInput < 0) {
        this.mostrarSnackbar(
          'El valor en el campo Reserva debe ser mayor o igual a 0',
          ['error-snackbar']
        );
      } else {
        this.mostrarSnackbar(
          'Por favor, ingrese un valor numérico válido en el campo Reserva',
          ['error-snackbar']
        );
      }
    }
  }

  registrarProducto() {
    this.CantidadValidacion();
    this.ReservaValidacion();
    // Validación de campos
    if (
      this.precioCompraInput === null ||
      this.precioVentaInput === null ||
      this.reservaInput === null ||
      this.cantidadInput === null ||
      this.precioCompraInput <= 0 ||
      this.precioVentaInput <= 0 ||
      this.reservaInput < 0 ||
      this.cantidadInput < 0
    ) {
      // Muestra un mensaje de error
      this.mostrarSnackbar(
        'Por favor, complete o ingrese valores validos para los campos marcados.',
        ['error-snackbar']
      );
      return;
    }

    // Convertir this.selectedProduct a un número entero
    const selectedProductId = parseInt(this.selectedProduct, 10);

    // Buscar el producto por ID
    const producto = this.productos.find(
      (producto) => producto.id === selectedProductId
    );

    // Verificar si se encontró el producto
    if (producto) {
      // El producto fue encontrado, puedes usar la variable 'producto' aquí
      console.log(producto);
    } else {
      // El producto no fue encontrado
      console.log('Producto no encontrado');
    }
    const productoExistente = this.dataSource.find(
      (item) => item.cod_product === producto.id
    );

    if (productoExistente) {
      // Muestra una alerta, mensaje o toma la acción que consideres apropiada
      console.log('Este producto ya está en la tabla.');
      return;
    }

    // Manejo de valores nulos
    const cantidad = this.cantidadInput !== null ? this.cantidadInput : 0;
    const reserva = this.reservaInput !== null ? this.reservaInput : 0;

    const newRow: PeriodicElement = {
      position: this.dataSource.length + 1,
      cod_product: producto.id,
      nombre: producto.nombre,
      cantidad: cantidad,
      reserva: reserva,
    };

    // Añade la nueva fila al principio de la tabla
    this.dataSource.unshift(newRow);

    // Elimina la última fila si hay más de 10 filas
    if (this.dataSource.length > 10) {
      this.dataSource.pop();
    }

    // Actualiza las posiciones de las filas restantes
    this.dataSource.forEach((element, index) => {
      element.position = index + 1;
    });
    this.limpiarCampos();
    this.isProductoSeleccionado = false;
  }

  limpiarTabla() {
    // Reinicializa la tabla con 10 filas vacías
    this.dataSource = [];
    // Restaura la bandera
    this.isProductoSeleccionado = false;
    // Restablece los valores de los campos a 0 antes de deshabilitarlos
    this.limpiarCampos();
    this.limpiarProveedor();
  }

  limpiarProveedor() {
    this.selectedProveedor = null;
  }

  limpiarCampos() {
    // Restablece los valores de los campos a 0
    this.cantidadInput = null;
    this.reservaInput = null;
    this.precioCompraInput = null;
    this.precioVentaInput = null;
    this.selectedProduct = null;
  }

  // Método para eliminar un registro
  eliminarRegistro(position: number) {
    // Encuentra el índice del registro a eliminar
    const index = this.dataSource.findIndex(
      (element) => element.position === position
    );

    if (index !== -1) {
      // Elimina el registro de la tabla
      this.dataSource.splice(index, 1);

      // Actualiza las posiciones de las filas restantes
      this.dataSource.forEach((element, i) => {
        element.position = i + 1;
      });
    }
  }

  guardar() {
    // Check if there are entries in the table
    if (this.dataSource.length === 0) {
      this.mostrarSnackbar('La tabla está vacía. No hay datos para guardar.', [
        'error-snackbar',
      ]);
      return;
    }

    // Create an array to hold the data to be saved for the main entry
    const entradaData = {
      fecha: new Date(), // Adjust based on your requirements
      id_proveedor: this.selectedProveedor,
      importe_total: this.total,
    };

    // Call the saveEntrada method from the IngresosService to save the main entry
    this.ingresosService.saveEntrada(entradaData).subscribe(
      (entradaResponse) => {
        console.log('Entrada saved successfully:', entradaResponse);

        // Create an array to hold the data to be saved for details
        const detallesData: any[] = this.dataSource.map((element) => ({
          id_producto: element.cod_product,
          cantidad: element.cantidad,
        }));

        // Call the saveEntradaDetalle method from the IngresosService to save the details
        this.ingresosService.saveEntradaDetalle(entradaResponse.id, detallesData).subscribe(
          (detallesResponse) => {
            console.log('Entrada Detalle saved successfully:', detallesResponse);
            this.snackBar.open('Operación completada con éxito.', 'Cerrar', {
              duration: 3000
            });
            // Reset the form or perform any other necessary actions after saving
            this.limpiarTabla();
          },
          (error) => {
            console.error('Error saving Entrada Detalle:', error);
          }
        );
        this.limpiarProveedor();
      },
      (error) => {
        console.error('Error saving Entrada:', error);
      }
    );
  }

  mostrarSnackbar(
    mensaje: string,
    panelClass: string[] = [],
    duration: number = 5000
  ): void {
    const config: MatSnackBarConfig = {
      duration: duration,
      panelClass: panelClass,
    };
    this.snackBar.open(mensaje, 'Cerrar', config);
  }

  agregarProducto() {
    // Verifica si hay un producto seleccionado y una cantidad ingresada
    if (this.selectedProduct && this.cantidadInput !== null) {
      const productoExistente = this.dataSource.find(
        (item) => item.cod_product === this.selectedProduct
      );
  
      // Verifica si el producto ya está en la lista
      if (productoExistente) {
        // Muestra un mensaje de error indicando que el producto ya está en la lista
        this.mostrarSnackbar('Este producto ya está en la lista.', [
          'error-snackbar'
        ]);
        return; // Sale del método sin agregar el producto a la lista
      }
      
      // Busca el producto seleccionado en la lista de productos
      const productoSeleccionado = this.productos.find(
        (producto) => producto.id === parseInt(this.selectedProduct, 10)
      );

      // Verifica si se encontró el producto seleccionado
      if (productoSeleccionado) {
        // Crea un nuevo elemento para la lista con el nombre del producto y la cantidad ingresada
        const nuevoElemento: PeriodicElement = {
          position: this.dataSource.length + 1,
          cod_product: productoSeleccionado.id,
          nombre: productoSeleccionado.nombre,
          cantidad: this.cantidadInput,
          reserva: productoSeleccionado.reserva,
        };

        // Agrega el nuevo elemento a la lista
        this.dataSource.push(nuevoElemento);

        // Limpia los campos después de agregar el producto a la lista
        this.limpiarCampos();

        // Muestra un mensaje de éxito
        this.mostrarSnackbar('Producto agregado a la lista.', [
          'success-snackbar',
        ]);
      }
    } else {
      // Muestra un mensaje de error si no se ha seleccionado un producto o no se ha ingresado una cantidad
      this.mostrarSnackbar(
        'Por favor, seleccione un producto y especifique la cantidad.',
        ['error-snackbar']
      );
    }
  }
}
