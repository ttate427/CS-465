import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);

  private readonly apiBaseUrl =
    'http://localhost:3000/api';

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.apiBaseUrl}/login`,
        {
          email,
          password
        }
      )
      .pipe(
        tap((response) => {
          this.saveToken(response.token);
        })
      );
  }

  saveToken(token: string): void {
    localStorage.setItem('travlr-token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('travlr-token');
  }

  logout(): void {
    localStorage.removeItem('travlr-token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
