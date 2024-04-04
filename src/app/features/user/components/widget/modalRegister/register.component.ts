import { Component, Input, OnInit, ViewChild, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalService , BsModalRef,ModalDirective } from 'ngx-bootstrap/modal';
import { UserService } from '../../../services/user.service';
import { User } from '../../../domain/entities/user.entities';
import { RoleService } from 'src/app/features/role/services/role.service';
import { Role } from 'src/app/features/role/domain/entities/role';
import { ToastrService } from 'ngx-toastr';
import { RegistroService } from 'src/app/core/helpers/event.register';


@Component({
  selector: 'app-modal-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class ModalRegisterComponent implements OnInit {
  myForm: FormGroup;
  users: User[];
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
    this.fetchData();
    this.fetchRoles();
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.min(9)]],
      password: ['', [Validators.required, Validators.min(6)]],
      role:['', Validators.required],
    });
  }

  
  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

  private fetchData() {
    this.userService.lisOfUser().subscribe(data=>{
      this.users=data;
    });
  }

  private fetchRoles() {
    this.roleService.lisOfRole().subscribe(data=>{
      this.roles=data;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.myForm.valid) {
    const formData = this.myForm.value;
    console.log(" ver data ",formData)
    this.userService.register(formData).subscribe(
      response => {
        this.modalRef.hide();
        this.toastr.success('Se registro exitoso', 'Aviso');
        this.registroService.notifyRegistroCreado();
        // Manejar la respuesta del servicio aquí
        console.log('Registro exitoso:', response);
      },
      error => {
        this.toastr.error('Error al procesar el registro', 'Aviso');
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
