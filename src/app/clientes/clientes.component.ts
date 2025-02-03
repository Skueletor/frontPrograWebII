import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface Cliente {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  loading: boolean = true;
  userName: string | null = '';

  constructor(private clienteService: ClienteService, public router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe(
      (response) => {
        console.log('Response:', response);
        // Ajusta según la estructura de la respuesta
        this.clientes = Array.isArray(response) ? response : response.result || [];
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener los clientes', error);
        this.loading = false;
      }
    );
  }

  deleteCliente(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      this.clienteService.deleteCliente(id).subscribe(() => {
        this.getClientes();  // Refresca la lista de clientes
      });
    }
  }

  editCliente(id: number): void {
    this.router.navigate(['/cliente', id]);
  }
}
