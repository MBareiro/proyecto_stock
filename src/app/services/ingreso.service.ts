import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // Method to save the main entry
  saveEntrada(entradaData: any): Observable<any> {
    const url = `${this.apiUrl}/entradas`; // Adjust the URL based on your API endpoint
    return this.http.post(url, entradaData);
  }

  // Method to save details for an entry
  saveEntradaDetalle(entradaId: number, detallesData: any[]): Observable<any> {
    const url = `${this.apiUrl}/entradas_detalle/${entradaId}`; // Adjust the URL based on your API endpoint
    return this.http.post(url, detallesData);
  }

  getEntradaPorFecha(rangoInicio: Date, rangoFin: Date): Observable<any[]> {
    // Configurar los parámetros de la consulta HTTP
    const params = new HttpParams()
      .set('rangoInicio', rangoInicio.toISOString())
      .set('rangoFin', rangoFin.toISOString());

    // Hacer la solicitud HTTP con los parámetros de fecha
    return this.http.get<any[]>(`${this.apiUrl}/salidas/porFecha`, { params });
  }

  getEntradas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/entradas`);
  }

  // Método para obtener detalles de salida por ID
  getEntradaDetalle(id: number): Observable<any> {
    const url = `${this.apiUrl}/entradas_detalle/${id}`; // Ajusta la URL según tu API
    return this.http.get(url);
  }
}
