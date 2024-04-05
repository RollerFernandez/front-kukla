import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(environment.apiUrl)) return next.handle(req);

    return next.handle(req).pipe(
      map(response => {
        if (response instanceof HttpResponse) {
          if(!response.body.success) {
            throw new Error(response.body?.message);
          }

          return response.clone({
            body: response.body?.data,
          });
        }

        return response;
      }),
    );
  }
}