import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const storedUser = localStorage.getItem('hrms_user');
  let authReq = req;

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      if (user && user.token) {
        console.log(`[AuthInterceptor] Adding Bearer token to request: ${req.method} ${req.url}`);
        authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`
          }
        });
      } else {
        console.warn(`[AuthInterceptor] User found in storage but NO TOKEN: ${req.url}`);
      }
    } catch (e) {
      console.error('[AuthInterceptor] Error parsing user from storage', e);
    }
  } else {
    // Some requests like login/signup don't need a token
    if (!req.url.includes('/api/auth/')) {
        console.warn(`[AuthInterceptor] No user found in storage for protected request: ${req.url}`);
    }
  }

  return next(authReq);
};
