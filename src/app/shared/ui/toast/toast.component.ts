import { Component } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent extends Toast {
  constructor(
    toastrService: ToastrService,
    toastPackage: ToastPackage,
  ) {
    super(toastrService, toastPackage);
  }
}
