// login.component.ts
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
        if (response && response.result && response.result.token) {
          this.router.navigate(['/clientes']);
          this.loginError = false;
        } else {
          console.error('La respuesta no contiene token');
          this.loginError = true;
        }
      },
      error => {
        console.error('Error de autenticación', error);
        this.loginError = true;
      }
    );
  }
}
