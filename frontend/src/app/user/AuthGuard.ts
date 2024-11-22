import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(UserService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  } else {
    return router.createUrlTree(['']);
  }
};

export const userGuard: CanActivateFn = () => {
  const authService = inject(UserService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    return router.createUrlTree(['']);
  }
};
