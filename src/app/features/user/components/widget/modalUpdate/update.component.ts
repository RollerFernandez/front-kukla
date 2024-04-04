import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalService , BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../../../services/user.service';
import { User } from '../../../domain/entities/user.entities';
import { RoleService } from 'src/app/features/role/services/role.service';
import { Role } from 'src/app/features/role/domain/entities/role';
import { ToastrService } from 'ngx-toastr';
import { RegistroService } from 'src/app/core/helpers/event.register';

@Component({
  selector: 'app-modal-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})

export class ModalUpdateComponent implements OnInit {
  datos:any;
  myForm: FormGroup;
  user: User;
  roles:Role[];
  submitted: any = false;

  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    public toastr:ToastrService,
    private modalRef?: BsModalRef,
    private registroService?: RegistroService
    ) { }

  ngOnInit() {
    this.fetchRoles();
    this.userService.getUser(this.datos).subscribe(data=>{
      this.myForm = this.formBuilder.group({
        name: [data.name, Validators.required],
        firstSurname: [data.firstSurname, Validators.required],
        lastSurname: [data.lastSurname, Validators.required],
        email: [data.email, [Validators.required, Validators.email]],
        phone: [data.phone, [Validators.required, Validators.min(9)]],
        role:[data.userRoles[0]?.roleId, Validators.required],
      });
    });


  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

  private fetchRoles() {
    this.roleService.lisOfRole().subscribe(data=>{
      this.roles=data;
    });
  }

  onSubmit() {
    console.log("entro fromulario")
    this.submitted = true;
    if (this.myForm.valid) {
    const formData = this.myForm.value;
    this.userService.update(this.datos,formData).subscribe(
      response => {
        this.modalRef.hide();
        this.toastr.success('Se actualizo el registro', 'Aviso');
        this.registroService.notifyRegistroCreado();
        // Manejar la respuesta del servicio aquí
        console.log('Registro exitoso:', response);
      },
      error => {
        this.toastr.error('Error al procesar', 'Aviso');
        console.error('Error al registrar usuario:', error);
      }
    );
    } else {
      return;
      // El formulario no es válido, manejar el error o mostrar mensajes de validación
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.myForm.controls; }

  closeModal(){
    this.modalService.hide();
  }
}
