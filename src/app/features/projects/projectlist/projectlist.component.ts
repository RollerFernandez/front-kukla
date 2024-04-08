import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/models';
import { ProjectsService } from '../services';
import { ProjectStatusCode, defaultPageSize } from 'src/app/shared/base';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.scss']
})
export class ProjectlistComponent implements OnInit {
  projects: Project[];
  page = 1;
  pageSize = defaultPageSize;
  totalItems = 0;
  totalPages = 0;
  projectStatusCode = ProjectStatusCode;

  constructor(private readonly projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  changePage(event: PageChangedEvent): void {
    this.page = event.page;
    this.pageSize = event.itemsPerPage;
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectsService.getProjects({
      pageSize: this.pageSize,
      pageIndex: this.page - 1,
    }).subscribe({
      next: (page) => {
        this.projects = page.items;
        this.totalItems = page.total;
        this.totalPages = page.totalPages;
      }
    });
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadProjects();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadProjects();
    }
  }
}
