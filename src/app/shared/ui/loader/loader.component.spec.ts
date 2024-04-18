import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { LoaderService } from 'src/app/core/services/loader.service';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loaderService: LoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
    })
    .compileComponents();
    loaderService = TestBed.inject(LoaderService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show/hide loader', fakeAsync(() => {
    let loader = fixture.nativeElement.querySelector('#preloader');
    expect(loader).toBeFalsy();
    loaderService.isLoading.next(true);
    tick(10);
    fixture.detectChanges();
    loader = fixture.nativeElement.querySelector('#preloader');
    expect(loader).toBeTruthy();
    loaderService.isLoading.next(false);
    tick(10);
    fixture.detectChanges();
    loader = fixture.nativeElement.querySelector('#preloader');
    expect(loader).toBeFalsy();
  }));
});
