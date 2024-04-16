import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProjectQuestionComponent } from './project-question.component';
import { ProjectQuestionType } from 'src/app/shared/base';
import { NgSelectModule } from '@ng-select/ng-select';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

const questions = [
  {
    id: 1,
    text: 'Pregunta 1',
    type: ProjectQuestionType.Select,
    parentId: null,
    options: [
      { id: 1, text: 'Opcion 1' },
      { id: 2, text: 'Opcion 2' },
    ],
    responses: [
      { id: 1, questionOptionId: 1, text: null },
    ],
  },
  {
    id: 2,
    text: 'Pregunta 2',
    type: ProjectQuestionType.Date,
    parentId: null,
    options: [],
    responses: [
      { id: 2, text: '2021-05-29' },
    ],
  },
  {
    id: 3,
    text: 'Pregunta 3',
    type: ProjectQuestionType.Integer,
    parentId: null,
    options: [],
    responses: [
      { id: 3, text: '25' },
    ],
  },
  {
    id: 4,
    text: 'Pregunta 4',
    type: ProjectQuestionType.Select,
    parentId: 1,
    options: [
      { id: 1, text: 'Opcion 1', parentId: 1 },
      { id: 2, text: 'Opcion 2', parentId: 1 },
      { id: 3, text: 'Opcion 3', parentId: 2 },
    ],
    responses: [
      { id: 1, questionOptionId: 1, text: null },
    ],
  },
];

function createForm(): FormGroup {
  return new FormGroup({
    '1': new FormGroup({
      questionId: new FormControl(1),
      response: new FormControl(1),
    }),
    '2': new FormGroup({
      questionId: new FormControl(2),
      response: new FormControl(new Date('2021-05-29')),
    }),
    '3': new FormGroup({
      questionId: new FormControl(3),
      response: new FormControl('25'),
    }),
    '4': new FormGroup({
      questionId: new FormControl(4),
      response: new FormControl(1),
    }),
  });
}

describe('ProjectQuestionComponent', () => {
  let component: ProjectQuestionComponent;
  let fixture: ComponentFixture<ProjectQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgSelectModule, UIModule, ReactiveFormsModule],
      declarations: [ProjectQuestionComponent],
      providers: [
        { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'dd/MM/yyyy' } },
      ],
    });
    fixture = TestBed.createComponent(ProjectQuestionComponent);
    component = fixture.componentInstance;
  });

  describe('readonly', () => {
    beforeEach(() => {
      component.editable = false;
    });

    it('should show text for type select', () => {
      component.question = questions[0];
      component.responsesForm = createForm();
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector('h6');
      const text = fixture.nativeElement.querySelector('p');
      expect(title.textContent).toEqual(questions[0].text);
      expect(text.textContent).toEqual(questions[0].options[0].text);
    });

    it('should show text for type date', () => {
      component.question = questions[1];
      component.responsesForm = createForm();
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector('h6');
      const text = fixture.nativeElement.querySelector('p');
      expect(title.textContent).toEqual(questions[1].text);
      expect(text.textContent).toEqual('29/05/2021');
    });

    it('should show text for type integer', () => {
      component.question = questions[2];
      component.responsesForm = createForm();
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector('h6');
      const text = fixture.nativeElement.querySelector('p');
      expect(title.textContent).toEqual(questions[2].text);
      expect(text.textContent).toEqual(questions[2].responses[0].text);
    });
  });

  describe('editable', () => {
    beforeEach(() => {
      component.editable = true;
    });

    it('should filter options', fakeAsync(() => {
      const form = createForm();
      component.question = questions[3];
      component.responsesForm = form;
      fixture.detectChanges();
      tick(10);
      expect(component.options.length).toBe(2);
      form.get('1').get('response').setValue(2);
      tick(10);
      expect(component.options.length).toBe(1);
    }));
  });
});
