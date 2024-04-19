import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  constructor(public readonly modalRef: BsModalRef) {}

  confirm(): void {
    this.modalRef.content.accepted = true;
    this.modalRef.hide();
  }
}
