import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private registroCreado = new Subject<void>();

  // Método para notificar a los suscriptores que se ha creado un nuevo registro
  notifyRegistroCreado() {
    this.registroCreado.next();
  }

  // Método para suscribirse al evento de nuevo registro
  onRegistroCreado() {
    return this.registroCreado.asObservable();
  }
}
