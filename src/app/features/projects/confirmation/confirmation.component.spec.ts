import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationComponent } from './confirmation.component';
import { BsModalRef } from 'ngx-bootstrap/modal';

const modalRefMock = {
  hide: jest.fn(),
  content: {},
};

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationComponent],
      providers: [
        { provide: BsModalRef, useValue: modalRefMock },
      ],
    });
    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should close modal', () => {
    jest.spyOn(component.modalRef, 'hide');
    const button = fixture.nativeElement.querySelector('#confirmation-cancel-button');
    button.click();
    expect(component.modalRef.content.accepted).toBeFalsy();
    expect(component.modalRef.hide).toHaveBeenCalled();
  });

  it('should set accept to true', () => {
    jest.spyOn(component.modalRef, 'hide');
    const button = fixture.nativeElement.querySelector('#confirmation-ok-button');
    button.click();
    expect(component.modalRef.content.accepted).toBeTruthy();
    expect(component.modalRef.hide).toHaveBeenCalled();
  });
});
