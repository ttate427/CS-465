import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly authService =
    inject(AuthenticationService);

  private readonly router = inject(Router);

  email = '';
  password = '';
  message = '';

  login(): void {
    this.authService
      .login(this.email, this.password)
      .subscribe({
        next: () => {
          this.message = 'Login successful';
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login error:', err);
          this.message = 'Invalid email or password';
        }
      });
  }
}