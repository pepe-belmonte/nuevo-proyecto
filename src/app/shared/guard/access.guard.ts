import { CanActivateFn } from '@angular/router';
import { AuthTokenService } from '../services/auth-token.service';
import { inject } from '@angular/core';

export const AccessGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthTokenService);

  // comprueba si está logado
  if (!auth.isLogged()) {
    auth.goToLogin();
    return false;
  }

  // aquí se comprobarían permisos, etc...

  return true;
};
