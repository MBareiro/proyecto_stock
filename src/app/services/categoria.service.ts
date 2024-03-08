import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias`);
  }

  eliminarCategoria(idCategoria: number): Observable<any> {
    const url = `${this.apiUrl}/categorias/${idCategoria}`;
    return this.http.delete(url);
  }

  getCategoriaById(id: string): Observable<Categoria> {
    const url = `${this.apiUrl}/categorias/${id}`; // Ajusta la URL según tu estructura
    return this.http.get<Categoria>(url);
  }
  actualizarCategoria(categoria: Categoria): Observable<any> {
    const url = `${this.apiUrl}/categorias/${categoria.id}`; // Ajusta la URL según tu estructura
    // Utiliza el método HTTP PUT para actualizar el categoria
    return this.http.put(url, categoria);
  }

  crearCategoria(categoria: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categorias`, categoria);
  }

  
}
