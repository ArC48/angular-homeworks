import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class IntercaptorService implements HttpInterceptor{

  constructor(private loading: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      tap(e =>{
        setTimeout(() => {
          this.loading.loading = true
        }, 0);
      }),
      finalize(() =>{
        setTimeout(() => {
          this.loading.loading = false
        }, 2500);
      })
    )
  }
}
