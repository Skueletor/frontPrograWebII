import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'https://localhost:7263/api/Clientes';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Obtener todos los clientes
  getClientes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obtener un cliente por ID
  getCliente(id: number): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  // Crear un nuevo cliente
  addCliente(cliente: any): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post(this.apiUrl, cliente, { headers });
  }

  // Actualizar un cliente existente
  updateCliente(id: number, cliente: any): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, cliente, { headers });
  }

  // Eliminar un cliente
  deleteCliente(id: number): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}