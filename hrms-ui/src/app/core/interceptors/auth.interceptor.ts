import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const storedUser = localStorage.getItem('hrms_user');
  let authReq = req;

  if (storedUser) {
    const user = JSON.parse(storedUser);
    if (user && user.token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }
  }

  return next(authReq);
};
