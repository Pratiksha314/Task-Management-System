import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-api-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup-page',
  templateUrl: './login-signup-page.html',
  styleUrls: ['./login-signup-page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class LoginSignupPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  signupForm = new FormGroup({
    username: new FormControl<string | undefined>(undefined, { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    hashed_password: new FormControl<string>('', { nonNullable: true }),
  });

  loginForm = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true }),
    hashed_password: new FormControl<string>('', { nonNullable: true }),
  });

  isLogin = true;

  showLogin(): void {
    this.isLogin = true;
  }

  showSignup(): void {
    this.isLogin = false;
  }

  onLogin() {
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/project-list']),
      error: () => ('Login failed'),
    })
  }

  onSignup() {
    this.authService.signup(this.signupForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/project-list']),
      error: () => ('Sign up failed'),
    });
  }

}
