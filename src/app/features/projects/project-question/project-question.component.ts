import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { startWith } from 'rxjs';
import { ProjectQuestionType } from 'src/app/shared/base';
import { ProjectQuestion, QuestionOption } from 'src/app/shared/models';

@Component({
  selector: 'app-project-question',
  templateUrl: './project-question.component.html',
  styleUrls: ['./project-question.component.scss']
})
export class ProjectQuestionComponent {
  @Input() question!: ProjectQuestion;
  @Input() editable!: boolean;
  @Input() responsesForm!: FormGroup;
  type = ProjectQuestionType;
  get response(): string {
    if (this.question.type === ProjectQuestionType.Select) {
      return this.question.options?.find((o) => o.id === this.question.responses?.[0].questionOptionId)?.text;
    }

    return this.question.responses?.[0].text;
  }
  options: QuestionOption[] = [];

  ngAfterViewInit(): void {
    if (this.question.parentId) {
      const parentControl = this.responsesForm.get(String(this.question.parentId)).get('response');
      parentControl.valueChanges.pipe(
        startWith(parentControl.value),
      ).subscribe((value) => {
        setTimeout(() => {
          this.options = this.question.options?.filter((o) => o.parentId === value);
        });
      });
    } else {
      setTimeout(() => {
        this.options = this.question.options;
      });
    }
  }
}
