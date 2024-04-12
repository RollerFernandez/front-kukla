import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Project } from 'src/app/shared/models';
import { ProjectfiltersService, ProjectsService } from '../services';
import { FilterType, ProjectStatusCode, defaultPageSize } from 'src/app/shared/base';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { SortableHeaderDirective } from 'src/app/shared/ui';
import { ProjectfiltersRepository, ProjectsRepository } from '../repositories';

import { WithoutAssignedProjectsException } from '../exceptions';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.scss'],
  providers: [
    ProjectsService,
    ProjectfiltersService,
    ProjectsRepository,
    ProjectfiltersRepository,
  ]
})
export class ProjectlistComponent implements OnInit {
  projects: Project[];
  page = 1;
  pageSize = defaultPageSize;
  totalItems = 0;
  totalPages = 0;
  projectStatusCode = ProjectStatusCode;
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;
  orderColumn = 'project.name';
  orderDirection: 'ASC' | 'DESC' = 'ASC';
  empty = false;
  messageTitle = '';
  messageBody = '';

  constructor(private readonly projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  changePage(event: PageChangedEvent): void {
    this.page = event.page;
    this.pageSize = event.itemsPerPage;
    this.loadProjects();
  }

  loadProjects(filterType?: FilterType): void {
    this.projectsService.getProjects({
      pageSize: this.pageSize,
      pageIndex: this.page - 1,
      orderColumn: this.orderColumn,
      orderDirection: this.orderDirection,
    }, filterType).subscribe({
      next: (page) => {
        this.empty = false;
        this.projects = page.items;
        this.totalItems = page.total;
        this.totalPages = page.totalPages;
      },
      error: (error) => {
        if (error instanceof WithoutAssignedProjectsException) {
          this.empty = true;
          const [title, body] = error.message.split('\n');
          this.messageTitle = title;
          this.messageBody = body;
          return;
        }
        throw error;
      },
    });
  }

  onSort(event: { column: string; direction: 'ASC' | 'DESC'; }): void {
    this.headers.forEach(header => {
      if (header.sortable !== event.column) {
        header.direction = '';
      }
    });
    this.orderColumn = event.column;
    this.orderDirection = event.direction;
    this.loadProjects();
  }

  filterProjects(filterType?: FilterType): void {
    this.page = 1;
    this.loadProjects(filterType);
  }
}
