import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class DSInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.loginService.getToken();
    let authreq = request;
    if (token) {
      authreq = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
        },
      });
    }
    return next.handle(authreq);
  }
  
}
