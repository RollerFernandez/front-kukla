import { Component, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfigService } from '../../../../core/services/config.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../domain/entities/role';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})

export class ListRolComponent implements OnInit {

  modalRef?: BsModalRef;
  statData: any;
  roles:Role[];
  @Input() transactions: Array<{
    id?: string;
    index?: number,
    name?: string,
    date?: string,
    total?: string,
    status?: string,
    payment?: string[],
  }>;

  constructor(private modalService: BsModalService,private configService: ConfigService, private roleService:RoleService) { }

  ngOnInit() {
    this.fetchData();
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

  private fetchData() {
    this.roleService.lisOfRole().subscribe(data=>{
      this.roles=data
    });
  }
}
