import { Component, Input } from '@angular/core';
import { ProjectQuestionType } from 'src/app/shared/base';
import { ProjectQuestion } from 'src/app/shared/models';

@Component({
  selector: 'app-project-question',
  templateUrl: './project-question.component.html',
  styleUrls: ['./project-question.component.scss']
})
export class ProjectQuestionComponent {
  @Input() question!: ProjectQuestion;
  @Input() editable!: boolean;
  type = ProjectQuestionType;
  get response(): string {
    if (this.question.type === ProjectQuestionType.Select) {
      return this.question.options?.find((o) => o.id === this.question.responses?.[0].questionOptionId)?.text;
    }

    return this.question.responses?.[0].text;
  }
}
