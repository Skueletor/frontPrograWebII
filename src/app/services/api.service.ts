import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7263/api'; // URL base de tu API

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Obtener lista de clientes
  getClientes(): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/Clientes`, { headers });
  }

  // Crear un nuevo cliente
  addCliente(cliente: any): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/Clientes`, cliente, { headers });
  }

  // Obtener un cliente por ID
  getCliente(id: number): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/Clientes/${id}`, { headers });
  }
}
