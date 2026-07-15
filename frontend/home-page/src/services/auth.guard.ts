// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-api-service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // 1. If running on the server, allow it to pass.
  // The client browser will re-run this guard immediately upon loading.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // 2. Client-side evaluation (where localStorage actually exists)
  if (authService.isLoggedIn()) {
    return true;
  }

  // 3. Only redirect if explicitly on the browser and unauthenticated
  router.navigate(['/']);
  return false;
};
