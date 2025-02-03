import { Component } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent {
  // Inicializamos el objeto cliente vacío.
  cliente: any = {};

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  saveCliente(): void {
    // Se invoca el método para crear un nuevo cliente.
    this.clienteService.addCliente(this.cliente).subscribe(
      () => {
        this.router.navigate(['/clientes']);
      },
      error => {
        console.error('Error al crear el cliente', error);
      }
    );
  }
}
