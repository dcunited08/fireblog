import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const loggedIn = await authService.isLoggedIn();
  if (loggedIn) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
