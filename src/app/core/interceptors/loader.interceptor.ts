import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { LoaderService } from "../services/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  countRequest = 0;

  constructor(private readonly loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.countRequest === 0) {
      this.loaderService.isLoading.next(true);
    }

    this.countRequest++;

    return next.handle(req).pipe(
      finalize(() => {
        this.countRequest--;

        if (this.countRequest === 0) {
          this.loaderService.isLoading.next(false);
        }
      }),
    );
  }
}
