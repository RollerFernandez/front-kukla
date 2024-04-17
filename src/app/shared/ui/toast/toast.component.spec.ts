import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-toast',
  template: '',
})
class TestComponent {
  constructor(private toastrService: ToastrService) {}

  open(): void {
    this.toastrService.success('prueba', 'titulo');
  }
}

describe('ToastComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastComponent, TestComponent],
      imports: [
        ToastrModule.forRoot({
          toastComponent: ToastComponent,
        }),
        NoopAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should open toast', () => {
    jest.spyOn(toastrService, 'success');
    component.open();
    expect(toastrService.success).toHaveBeenCalled();
  });
});
