import { Observable, take } from 'rxjs';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AccountService } from '../_services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accaoutService: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.accaoutService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user.token}`,
            },
          });
        }
      },
    });
    return next.handle(request);
  }
}
