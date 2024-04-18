import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { LoaderService } from "../services/loader.service";
import { TestBed } from "@angular/core/testing";
import { LoaderInterceptor } from "./loader.interceptor";
import { environment } from "src/environments/environment";

describe('LoaderInterceptor', () => {
  let httpController: HttpTestingController;
  let http: HttpClient;
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
      ],
    });
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    loaderService = TestBed.inject(LoaderService);
  });

  it('should set true/false loading', () => {
    http.get<any>(environment.apiUrl + '/projects/3').subscribe();
    expect(loaderService.isLoading.value).toBeTruthy();
    httpController.expectOne({
      method: 'GET',
      url: environment.apiUrl + '/projects/3',
    }).flush({});
    expect(loaderService.isLoading.value).toBeFalsy();
  });
});
