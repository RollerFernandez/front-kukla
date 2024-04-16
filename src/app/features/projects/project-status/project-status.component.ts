import { Component, Input } from '@angular/core';
import { ProjectStatusCode } from 'src/app/shared/base';
import { ProjectStatus } from 'src/app/shared/models';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.scss']
})
export class ProjectStatusComponent {
  @Input() status: ProjectStatus;
  projectStatusCode = ProjectStatusCode;
}
