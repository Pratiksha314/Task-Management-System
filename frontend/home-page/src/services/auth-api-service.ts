import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';

interface TokenResponse {
  access_token: string;
  token_type: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8000/user';
  private tokenKey = 'access_token';

  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  signup(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/signup`, user);
  }

  login(user: User): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.baseUrl}/login`, user)
      .pipe(
        tap(res => localStorage.setItem(this.tokenKey, res.access_token))
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

