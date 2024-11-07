import { HttpEvent, HttpHandlerFn, HttpHeaders,  HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';


export function TokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const auth = inject(AuthService);
  const token = auth.getToken();
  var exclude_array : string[] = ['/login','/register','/verifyEmail'];
  var taille = exclude_array.length
  var laisser_passer = 0

  for (let index = 0; index < taille; index++) {
    if(req.url.search(exclude_array[index]) !== -1){
      laisser_passer = laisser_passer + 1
    }
  }

  if(laisser_passer > 0)
    return next(req)

  const headers = new HttpHeaders({
    Authorization: "Bearer " + token
  })

  const newReq = req.clone({
    headers
  })

  return next(newReq)
}