import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    if (history.state && history.state.data) {
      this.cliente = history.state.data;
      this.loading = false;
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.clienteService.getCliente(+id).subscribe(
          data => {
            this.cliente = data;
            this.loading = false;
          },
          error => {
            console.error('Error al obtener el cliente:', error);
            this.loading = false;
            this.router.navigate(['/clientes']);
          }
        );
      } else {
        console.error('No se proporcionó data de cliente ni id en la URL');
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
