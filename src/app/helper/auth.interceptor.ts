import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { TokenStorageService } from
  '../service/token-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenStorage: TokenStorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.tokenStorage.getToken();

    const authReq = req.clone({
      headers: req.headers.set('Authorization',
        authToken || "")
    });
    return next.handle(authReq);
  }
}