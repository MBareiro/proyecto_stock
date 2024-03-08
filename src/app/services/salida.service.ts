import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalidaService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // Method to save the main entry
  saveSalida(salidaData: any): Observable<any> {
    const url = `${this.apiUrl}/salidas`; // Adjust the URL based on your API endpoint
    return this.http.post(url, salidaData);
  }

  // Method to save details for an entry
  saveSalidaDetalle(salidaId: number, detallesData: any[]): Observable<any> {
    const url = `${this.apiUrl}/salidas_detalle/${salidaId}`; // Adjust the URL based on your API endpoint
    return this.http.post(url, detallesData);
  }

  getSalidas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/salidas`);
  }

  getSalidasPorFecha(rangoInicio: Date, rangoFin: Date): Observable<any[]> {
    // Configurar los parámetros de la consulta HTTP
    const params = new HttpParams()
      .set('rangoInicio', rangoInicio.toISOString())
      .set('rangoFin', rangoFin.toISOString());

    // Hacer la solicitud HTTP con los parámetros de fecha
    return this.http.get<any[]>(`${this.apiUrl}/salidas/porFecha`, { params });
  }

  // Método para obtener detalles de salida por ID
  getSalidaDetalle(id: number): Observable<any> {
    const url = `${this.apiUrl}/salidas_detalle/${id}`; // Ajusta la URL según tu API
    return this.http.get(url);
  }
}
