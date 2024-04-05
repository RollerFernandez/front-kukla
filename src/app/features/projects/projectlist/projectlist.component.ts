import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/models';
import { ProjectsService } from '../services';
import { defaultPageSize } from 'src/app/shared/base';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.scss']
})
export class ProjectlistComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  projects: Project[];
  page = 1;
  pageSize = defaultPageSize;
  totalItems = 0;
  constructor(private readonly projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Projects' }, { label: 'Projects List', active: true }];
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
      }
    });
  }
}
