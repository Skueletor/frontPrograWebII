import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login({ userName: this.userName, password: this.password }).subscribe(
      response => {
        console.log('Respuesta de login:', response);
        this.authService.saveToken(response.token); // Guarda el token si el login es exitoso
        
        // this.router.navigate(['/clientes']); // Redirige a la página de clientes
        this.loginError = false; // Reinicia el error si el login es exitoso
      },
      error => {
        console.error('Error de autenticación', error);
        this.loginError = true;
      }
    );
  }
}