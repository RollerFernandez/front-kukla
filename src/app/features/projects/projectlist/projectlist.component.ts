import { Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Project, ProjectAssignment, ProjectAssignmentRequest } from 'src/app/shared/models';
import { ProjectfiltersService, ProjectsService } from '../services';
import { FilterType, ProjectStatusCode, defaultPageSize } from 'src/app/shared/base';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { SortableHeaderDirective } from 'src/app/shared/ui';
import { ProjectfiltersRepository, ProjectsRepository } from '../repositories';

import { WithoutAssignedProjectsException } from '../exceptions';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProjectAssignmentService } from '../services/project-assignment.service';
import { User } from 'src/app/core/models/auth.models';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.scss'],
  providers: [
    ProjectsService,
    ProjectfiltersService,
    ProjectsRepository,
    ProjectfiltersRepository,
    ProjectAssignmentService,
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

  @ViewChild('varying', { static: true }) varying: TemplateRef<any>;
  modalRef?: BsModalRef;
  config: any = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  selectedUser: User;
  projectAssignments: ProjectAssignment[];
  markedProjects: Project[] = [];

  constructor(private readonly projectsService: ProjectsService,
    private modalService: BsModalService,
    private readonly projectAssignmentService: ProjectAssignmentService,
    private toastService: ToastrService,
    private authService: AuthenticationService,

  ) { }

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
  getUsersByRegionId(regionId: number) {

    this.projectAssignmentService
      .getUsersByRegionId(regionId)
      .subscribe({
        next: res => {
          this.projectAssignments = res;
          this.projectAssignments.forEach(pa => {
            pa.user.fullName = `${pa.user.name} ${pa.user.firstSurname} ${pa.user.lastSurname}`;
          });

          console.log(res)
          console.log(res[0].user)
        },
        error: error => {
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

  varyingModal(template: TemplateRef<any>, name: any) {
    if (!this.validateSameRegion()) {
      return;
    }
    this.getUsersByRegionId(this.markedProjects[0].office.region.id);
    this.modalRef = this.modalService.show(template, this.config);

  }
  staticModal(StaticDataModal: any) {
    if (!this.selectedUser) {
      this.toastService.warning('Debe seleccionar un ejecutivo para continuar.', 'Información', {
        closeButton: true,
        progressBar: true,
        newestOnTop: true,
        positionClass: 'toast-top-right'
      });
      return;
    }

    this.modalRef?.hide();
    this.modalRef = this.modalService.show(StaticDataModal);
  }
  onCheckboxChange(project: Project) {
    if (project.checked) {
      // Si el proyecto está marcado, añádelo al arreglo
      this.markedProjects.push(project);
    } else {
      // Si el proyecto no está marcado, remuévelo del arreglo
      const index = this.markedProjects.indexOf(project);
      if (index > -1) {
        this.markedProjects.splice(index, 1);
      }
    }
  }
  closeSecondModal() {
    this.modalRef?.hide();
    this.varyingModal(this.varying, 'Modal');
  }

  validateSameRegion(): boolean {
    if (this.markedProjects.length > 0) {
      const regionId = this.markedProjects[0].office.region.id;
      let unassignedCount = 0;
      let inProgressOrAssignedCount = 0;

      for (let project of this.markedProjects) {
        if (project.office.region.id !== regionId) {
          this.toastService.error('Debe seleccionar proyectos de una misma región.', 'Información', {
            closeButton: true,
            progressBar: true,
            newestOnTop: true,
            positionClass: 'toast-top-right'
          });
          return false;
        }

        if ([ProjectStatusCode.Unassigned, ProjectStatusCode.InProgress,
        ProjectStatusCode.Assigned].includes(project.status.code)
          || project.status.code == ProjectStatusCode.Observed && this.isAdmin(this.authService.getRol())) {
          if (project.status.code === ProjectStatusCode.Unassigned) {
            unassignedCount++;
          } else {
            inProgressOrAssignedCount++;
          }
        } else {
          this.toastService.warning('Uno de los estados seleccionados no se puede Asignar/Reasignar.', 'Información', {
            closeButton: true,
            progressBar: true,
            newestOnTop: true,
            positionClass: 'toast-top-right'
          });
          return false;
        }
      }

      if (unassignedCount > 0 && inProgressOrAssignedCount > 0) {
        this.toastService.warning('Uno de los estados seleccionados no se puede Asignar/Reasignar.', 'Información', {
          closeButton: true,
          progressBar: true,
          newestOnTop: true,
          positionClass: 'toast-top-right'
        });
        return false;
      }

      return true;
    } else {
      this.toastService.warning('No hay ningún proyecto seleccionado.', 'Información', {
        closeButton: true,
        progressBar: true,
        newestOnTop: true,
        positionClass: 'toast-top-right'
      });
      return false;
    }
  }



  saveProjectAssignments() {
    let projectAssignments: ProjectAssignmentRequest[] = [];
    this.markedProjects.forEach(project => {
      projectAssignments.push({
        userId: this.selectedUser.id,
        projectId: project.id
      })
    })
    if (this.markedProjects[0].status.code === ProjectStatusCode.Unassigned) {
      this.projectAssignmentService
        .save(projectAssignments)
        .subscribe({
          next: res => {
            this.toastService.success('El proyecto se asignó correctamente.', 'Éxito', {
              closeButton: true,
              //disableTimeOut:true,
              progressBar: true,
              newestOnTop: true,
              positionClass: 'toast-top-right'
            });

            this.modalRef.hide();

          },
          error: error => {
            throw error;
          },
        });
    } else {
      this.projectAssignmentService
        .update(projectAssignments)
        .subscribe({
          next: res => {
            this.toastService.success('El proyecto se reasignó correctamente.', 'Éxito', {
              closeButton: true,
              //disableTimeOut:true,
              progressBar: true,
              newestOnTop: true,
              positionClass: 'toast-top-right'
            });

            this.modalRef.hide();
          },
          error: error => {
            throw error;
          },
        });
    }
    this.markedWithAssigned(this.markedProjects);
    this.markedProjects=[];
  }
  markedWithAssigned(projectAssignments: Project[]) {
    projectAssignments.forEach(project => {
      project.status.code = ProjectStatusCode.Assigned;
      project.status.description = 'Asignado';
      project.checked=false;
    });
    
  }
  isAdmin(roles: any): boolean {
    return roles.some(role => role.role.code === 'administrator');
  }
}
