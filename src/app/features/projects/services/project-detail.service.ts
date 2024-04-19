import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, finalize } from 'rxjs';
import { ProjectQuestionType, QuestionValidationType } from 'src/app/shared/base';
import { Project, ProjectQuestion, QuestionValidation } from 'src/app/shared/models';
import { ProjectsRepository } from '../repositories';
import { CustomValidators } from 'src/app/shared/base/validators';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailService {
  projectForm = new UntypedFormGroup({
    responses: new FormGroup({}),
  });
  get responsesForm(): FormGroup {
    return this.projectForm.get('responses') as FormGroup;
  }
  isLoading = false;
  project: Project;

  constructor(private readonly projectsRepository: ProjectsRepository) {}

  addQuestions(questions: ProjectQuestion[]): void {
    questions.forEach((q) => {
      const form = new FormGroup({
        questionId: new FormControl(q.id),
        response: new FormControl(this.getResponse(q), this.getValidations(q.validations)),
      });

      if (q.parentId) {
        this.subscribeParentChanges(this.responsesForm.get(String(q.parentId)), form);
      }

      this.responsesForm.addControl(String(q.id), form);
    });
  }

  getResponse(question: ProjectQuestion): number | string | Date {
    switch (question.type) {
      case ProjectQuestionType.Select:
        return question.responses[0]?.questionOptionId;

      case ProjectQuestionType.Date:
        return question.responses[0]?.text ? new Date(question.responses[0].text) : '';

      case ProjectQuestionType.Integer:
      default:
        return question.responses[0]?.text;
    }
  }

  subscribeParentChanges(parentControl: AbstractControl, form: AbstractControl): void {
    const parentResponseControl = parentControl.get('response');
    parentResponseControl.valueChanges.subscribe(() => {
      form.get('response').reset();
    });
  }

  saveResponses(projectId: number): Observable<string> {
    this.isLoading = true;
    return this.projectsRepository.saveResponses(projectId, this.projectForm.value).pipe(
      finalize(() => {
        this.isLoading = false;
      }),
    );
  }

  sendProject(projectId: number): Observable<string> {
    this.isLoading = true;
    return this.projectsRepository.sendProject(projectId).pipe(
      finalize(() => {
        this.isLoading = false;
      }),
    );
  }

  getValidations(validations: QuestionValidation[]): ValidatorFn[] {
    return validations.map((v) => {
      switch (v.type) {
        case QuestionValidationType.Min:
          return CustomValidators.min(Number(v.parameter), v.message);

        case QuestionValidationType.Max:
          return CustomValidators.max(Number(v.parameter), v.message);

        case QuestionValidationType.MinDate:
          return CustomValidators.minDate(new Date(this.project[v.parameter]), v.message);
      }
    });
  }
}
