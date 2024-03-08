import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5000'; // Cambia esto por la URL de tu backend Flask

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/productos`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/productos/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/productos`, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/productos/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/productos/${id}`);
  }

  getProductosMasVendidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/productos_mas_vendidos`);
  }

  // Método para obtener productos por categoría
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/productos_por_categoria/${categoryId}`);
  }
}
