import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { PagetitleComponent } from './pagetitle.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

const breadcrumbItems = [
  { label: 'Lista de proyectos', link: '/projects' },
  { label: 'Proyecto 1', active: true },
];

describe('PagetitleComponent', () => {
  let component: PagetitleComponent;
  let fixture: ComponentFixture<PagetitleComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        { path: 'projects', component: {} as any },
      ])],
      declarations: [PagetitleComponent],
    })
    .compileComponents();
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagetitleComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.title = 'Titulo';
  });

  it('should redirect to parent route', fakeAsync(() => {
    jest.spyOn(router, 'navigate');
    component.breadcrumbItems = breadcrumbItems;
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a');
    expect(link.textContent).toEqual(breadcrumbItems[0].label);
    expect(router.url).toBe('/');
    link.click();
    tick(10);
    expect(router.url).toBe('/projects');
  }));
});
