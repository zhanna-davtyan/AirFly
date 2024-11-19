import { HttpInterceptorFn } from '@angular/common/http';

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
