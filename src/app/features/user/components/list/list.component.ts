import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { UserService } from '../../services/user.service';
import { User } from '../../domain/entities/user.entities';
import { RoleService } from 'src/app/features/role/services/role.service';
import { Role } from 'src/app/features/role/domain/entities/role';
import { ToastrService } from 'ngx-toastr';
import { ModalUpdateComponent } from '../widget/modalUpdate/update.component';
import { ModalRegisterComponent } from '../widget/modalRegister/register.component';
import Swal from 'sweetalert2';
import { RegistroService } from 'src/app/core/helpers/event.register';

@Component({
  selector: 'app-list-user',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  myForm: FormGroup;
  users: User[];
  roles: Role[];
  submitted: any = false;

  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private modalRef: BsModalRef,
    private registroService: RegistroService
  ) { }

  ngOnInit() {
    this.fetchData();
    this.fetchRoles();
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.min(9)]],
      password: ['', [Validators.required, Validators.min(6)]],
      role: ['', Validators.required],
    });
    this.registroService.onRegistroCreado().subscribe(() => {
      this.fetchData();
    });
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

  selectRow(id: number) {
    this.modalService.show(ModalUpdateComponent, {
      initialState: {
        datos: id
      }
    });
  }

  openModalRegister() {
    this.modalService.show(ModalRegisterComponent, {
      initialState: {

      }
    });
  }

  private fetchData() {
    this.userService.lisOfUser().subscribe(data => {
      this.users = data;
    });
  }

  private fetchRoles() {
    this.roleService.lisOfRole().subscribe(data => {
      this.roles = data;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      this.userService.register(formData).subscribe(
        response => {
          this.modalRef.hide();
          this.toastr.success('Se registro el usuario', 'Aviso');
          console.log('Registro exitoso:', response);
        },
        error => {
          this.toastr.error('Error al procesar el registro', 'Aviso');
          console.error('Error al registrar usuario:', error);
        }
      );
    } else {
      return;

    }
  }

  get f() { return this.myForm.controls; }


  updateStatus(data: any) {
    console.log(" row ", data);
    this.confirm(data);
  }

  confirm(data: any) {
    Swal.fire({
      title: `<h5>Esta seguro de ${data.status === 'A' ? 'desactivar' : 'activar'} el usuario:  ${data.name}?</h5>`,
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Aceptar'
    }).then(result => {
      if (result.value) {
        this.userService.updateStatus(data.id, { status: data.status === 'A' ? 'I' : 'A' }).subscribe(
          response => {
            this.modalRef.hide();
            Swal.fire('Aviso!', `El registro se ${data.status === 'A' ? 'Inactivo' : 'Activo'} correctamente`, 'success');
            this.fetchData();
            console.log('Registro exitoso:', response);
          },
          error => {
            this.toastr.error('Error al procesar el registro', 'Aviso');
            console.error('Error al registrar usuario:', error);
          }
        );

      }
    });
  }

}
