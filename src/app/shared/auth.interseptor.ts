import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './../admin/shared/services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterseptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('INTERSEPTOR WORK')
    if (this.auth.isAuthenticated()) {
      console.log('add token')
      req = req.clone({
        setParams: {
          auth: this.auth.token,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((error) => {
        console.log('[interseptor error]:', error)
        if(error.status === 401) {
            this.auth.logout();
            this.router.navigate(['/admin', 'login'], {
                queryParams: {
                    authFailed: true,
                }
            })
        }
        return throwError(error);
      })
    );
  }
}
