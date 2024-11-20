import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptorFunctional: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('AuthToken');

  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next(clonedReq);
  }

  return next(req);
};

export const authErrorInterceptorFunctional: HttpInterceptorFn = (
  req,
  next
) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Retry Interceptor Functional Error:', error);
      if (error.status === 401) {
        localStorage.removeItem('AuthToken');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
