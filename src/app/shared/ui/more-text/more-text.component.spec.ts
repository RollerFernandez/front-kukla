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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
