import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const produitGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if(!authService.isAdmin()){
    router.navigate(["app-forbidden"])
    return false
  }

  return true;
};
