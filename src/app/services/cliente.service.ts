import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'https://localhost:7263/api/Clientes';

  constructor(private http: HttpClient) { }

  // Obtener todos los clientes
  getClientes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obtener un cliente específico por ID
  getCliente(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Agregar un nuevo cliente (POST)
  addCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente);
  }

  // Actualizar un cliente existente (PUT)
  updateCliente(id: number, cliente: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cliente);
  }

  // Eliminar un cliente
  deleteCliente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
