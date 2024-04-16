import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreTextComponent } from './more-text.component';

describe('MoreTextComponent', () => {
  let component: MoreTextComponent;
  let fixture: ComponentFixture<MoreTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoreTextComponent]
    });
    fixture = TestBed.createComponent(MoreTextComponent);
    component = fixture.componentInstance;
  });

  it('should create', (done) => {
    component.text = 'Descripcion de proyecto';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
      done();
    });
  });
});
