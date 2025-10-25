import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

const TOKEN_HEADER_KEY = 'Authorization';

export class AuthInterceptor implements HttpInterceptor {
  
  constructor(){}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req);
  }
  
}