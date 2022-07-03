import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { tokenKey } from './auth.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  count = 0;
  constructor(
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem(tokenKey) !== null) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
        },
      });
    }
    this.spinnerService.show();
    this.count++;
    return next.handle(req).pipe(
      finalize(() => {
        this.count--;
        if (this.count == 0) this.spinnerService.hide();
      }),
      catchError((x) => this.handleAuthError(x))
    );
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      //navigate /delete cookies or whatever
      this.router.navigateByUrl(`/login`);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }
}
