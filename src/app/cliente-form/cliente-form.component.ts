import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {
  cliente: any = {};
  isEdit: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.clienteService.getCliente(+id).subscribe((data) => {
        this.cliente = data;
      });
    }
  }

  saveCliente(): void {
    if (this.isEdit) {
      this.clienteService.updateCliente(this.cliente.id, this.cliente).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    } else {
      this.clienteService.addCliente(this.cliente).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    }
  }
}
