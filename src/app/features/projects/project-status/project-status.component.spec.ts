import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectStatusComponent } from './project-status.component';
import { ProjectStatusCode } from 'src/app/shared/base';

const status = [
  { id: 1, description: 'Sin asignar', code: ProjectStatusCode.Unassigned },
  { id: 2, description: 'Asignado', code: ProjectStatusCode.Assigned },
  { id: 3, description: 'En progreso', code: ProjectStatusCode.InProgress },
  { id: 4, description: 'Enviado', code: ProjectStatusCode.Completed },
  { id: 5, description: 'Validado', code: ProjectStatusCode.Approved },
  { id: 6, description: 'Observado', code: ProjectStatusCode.Observed },
  { id: 7, description: 'Enviado ISICOM', code: ProjectStatusCode.Sended },
];

describe('ProjectStatusComponent', () => {
  let component: ProjectStatusComponent;
  let fixture: ComponentFixture<ProjectStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectStatusComponent],
    });
    fixture = TestBed.createComponent(ProjectStatusComponent);
    component = fixture.componentInstance;
  });

  it('should show badge for unassigned status', () => {
    component.status = status[0];
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.badge');
    expect(badge.classList.contains('badge-dark')).toBeTruthy();
    expect(badge.textContent).toEqual(status[0].description);
  });

  it('should show badge for assigned status', () => {
    component.status = status[1];
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.badge');
    expect(badge.classList.contains('badge-soft-dark')).toBeTruthy();
    expect(badge.textContent).toEqual(status[1].description);
  });

  it('should show badge for in progress status', () => {
    component.status = status[2];
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.badge');
    expect(badge.classList.contains('badge-soft-warning')).toBeTruthy();
    expect(badge.textContent).toEqual(status[2].description);
  });

  it('should show badge for completed status', () => {
    component.status = status[3];
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.badge');
    expect(badge.classList.contains('badge-soft-info')).toBeTruthy();
    expect(badge.textContent).toEqual(status[3].description);
  });

  it('should show badge for approved status', () => {
    component.status = status[4];
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.badge');
    expect(badge.classList.contains('badge-soft-success')).toBeTruthy();
    expect(badge.textContent).toEqual(status[4].description);
  });

  it('should show badge for observed status', () => {
    component.status = status[5];
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.badge');
    expect(badge.classList.contains('badge-soft-danger')).toBeTruthy();
    expect(badge.textContent).toEqual(status[5].description);
  });

  it('should show badge for sended status', () => {
    component.status = status[6];
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.badge');
    expect(badge.classList.contains('badge-soft-info')).toBeTruthy();
    expect(badge.textContent).toEqual(status[6].description);
  });
});
