import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessageService } from './msgs';
import { ErrorInfo } from '../domain/responses';


@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type') && !req.headers.has('enctype')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });
    }
    req = req.clone({
      headers: req.headers
                    .set('Cache-Control', 'no-cache')
                    .set('Pragma', 'no-cache')
    });
    return next.handle(req);
  }
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private msgs: MessageService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => event,
        (response: HttpErrorResponse) => {
          let msg = 'Server cannot be accessed';
          if (response.error && response.error.error_msg) {
            let err_data: ErrorInfo = response.error;
            if (err_data.errorMsg) {
              msg = err_data.errorMsg;
            }
          } else if (response.status === 401 /*Unauthenticated*/) {
            msg = 'Access denied';
          } else {
            if (response.status == 200 || (response.status >= 400 && response.status <= 500)) {
              msg = `Unexpecting error accessing server [HTTP: ${response.status}]`;
              console.error(response.error);
            }
          }
          this.msgs.showErrorMsg(msg);
          console.error(`${msg}. HTTP STATUS: ${response.status}`);
        }));
  }
}