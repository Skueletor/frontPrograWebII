import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard'; // Importar el guard
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Ruta para login modificar
  { path: 'login', component: LoginComponent }, // Ruta de login
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
  { path: 'cliente/nuevo', component: ClienteFormComponent, canActivate: [AuthGuard] },
  { path: 'cliente/:id', component: ClienteFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }