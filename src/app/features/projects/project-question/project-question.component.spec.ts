import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectQuestionComponent } from './project-question.component';
import { ProjectQuestionType } from 'src/app/shared/base';
import { NgSelectModule } from '@ng-select/ng-select';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';

const questions = [
  {
    id: 1,
    text: 'Pregunta 1',
    type: ProjectQuestionType.Select,
    parentId: null,
    options: [
      { id: 1, text: 'Opcion 1' },
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
];

describe('ProjectQuestionComponent', () => {
  let component: ProjectQuestionComponent;
  let fixture: ComponentFixture<ProjectQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgSelectModule, UIModule],
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
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector('h6');
      const text = fixture.nativeElement.querySelector('p');
      expect(title.textContent).toEqual(questions[0].text);
      expect(text.textContent).toEqual(questions[0].options[0].text);
    });

    it('should show text for type date', () => {
      component.question = questions[1];
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector('h6');
      const text = fixture.nativeElement.querySelector('p');
      expect(title.textContent).toEqual(questions[1].text);
      expect(text.textContent).toEqual('29/05/2021');
    });

    it('should show text for type integer', () => {
      component.question = questions[2];
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector('h6');
      const text = fixture.nativeElement.querySelector('p');
      expect(title.textContent).toEqual(questions[2].text);
      expect(text.textContent).toEqual(questions[2].responses[0].text);
    });
  });

});
