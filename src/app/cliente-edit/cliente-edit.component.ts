import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Navigation } from '@angular/router';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.scss']
})
export class ClienteEditComponent implements OnInit {
  cliente: any = {};
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Intenta obtener el objeto cliente desde el estado de navegación
    const nav: Navigation | null = this.router.getCurrentNavigation();
    if (nav && nav.extras && nav.extras.state && nav.extras.state['data']) {
      this.cliente = nav.extras.state['data'];
      this.loading = false;
    } else {
      // Si no se pasa la data, se puede intentar obtenerla vía API (si estuviera implementado) o redirigir
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        // Opcional: Realizar GET por id, en caso de que la API soporte la operación
        this.clienteService.getCliente(+id).subscribe(
          data => {
            this.cliente = data;
            this.loading = false;
          },
          error => {
            console.error('Error al obtener el cliente:', error);
            this.loading = false;
          }
        );
      } else {
        console.error('No se proporcionó data de cliente y no hay id en la URL');
        this.router.navigate(['/clientes']);
      }
    }
  }

  updateCliente(): void {
    this.clienteService.updateCliente(this.cliente.id, this.cliente).subscribe(
      () => {
        this.router.navigate(['/clientes']);
      },
      error => {
        console.error('Error al actualizar el cliente:', error);
      }
    );
  }
}
