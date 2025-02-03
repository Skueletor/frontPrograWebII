import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7263/api/Users';

  constructor(private http: HttpClient) { }

  login(user: { userName: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Login`, user).pipe(
      tap(response => {
        if (response && response.result && response.result.token) {
          localStorage.setItem('authToken', response.result.token);
          localStorage.setItem('userName', response.result.userName);
          console.log('token: ', localStorage.getItem('authToken'));
          console.log('username: ', localStorage.getItem('userName'));
        }
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  getAuthHeaders(): { [header: string]: string } {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
  }
}
