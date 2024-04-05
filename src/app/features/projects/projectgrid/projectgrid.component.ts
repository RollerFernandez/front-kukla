import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';
import { ProjectgridService } from './projectgrid.service';
import { NgbdProjectGridSortableHeader, SortEvent } from './projectgrid-sortable.directive';

@Component({
  selector: 'app-projectgrid',
  templateUrl: './projectgrid.component.html',
  styleUrls: ['./projectgrid.component.scss'],
  providers: [ProjectgridService, DecimalPipe]
})

/**
 * Projects-grid component
 */
export class ProjectgridComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  projectData: any[];

   // Table data
   content?: any;
   orderes?: any;
   ordersList!: Observable<any[]>;
   total: Observable<number>;
   @ViewChildren(NgbdProjectGridSortableHeader) headers!: QueryList<NgbdProjectGridSortableHeader>;

  
   constructor(private modalService: BsModalService,public service: ProjectgridService, private formBuilder: UntypedFormBuilder) {
    this.ordersList = service.countries$;
    this.total = service.total$;
   }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Projects' }, { label: 'Projects Grid', active: true }];

    this.projectData = [];
  }

}
