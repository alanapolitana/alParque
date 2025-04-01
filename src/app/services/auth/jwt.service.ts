/* import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.loginService.userToken as string;
    console.log('Intercepting request:', req); // Verificación

    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log('Cloned request with token:', clonedReq); // Verificación
      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}
 */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class JwtService implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.loginService.userToken as string;
    const apiUrl = environment.API_URL; // Usar la URL del entorno
    console.log('Intercepting request:', req.url);

    // Solo agregar el token si la solicitud es a la API
    if (token && req.url.startsWith(apiUrl)) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log('Cloned request with token:', clonedReq.url);
      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}
