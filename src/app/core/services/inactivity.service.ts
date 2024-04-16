import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/features/account/services/user.service';
import Swal from 'sweetalert2';
import { CounterService } from './counterService';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InactivityService implements OnInit, OnDestroy{
  private timeoutId: number;
  countdownValue: number=30;
  private countdownSubscription: Subscription;

  constructor(private userService: UserService, private counterService: CounterService) {
    this.bindEvents();
  }

  ngOnInit(): void {
    this.countdownSubscription = this.counterService.startCountdown()
      .subscribe(value => {
        this.countdownValue = value;
        console.log(" ver contador ",value)
        if (value === 0) {
          // Realizar alguna acción cuando el tiempo de espera llegue a cero
          //this.handleCountdownEnd();
        }
      });
  }

  ngOnDestroy(): void {
    // Cancela la suscripción cuando el componente se destruye para evitar fugas de memoria
    this.countdownSubscription.unsubscribe();
  }

  bindEvents() {
    window.addEventListener('mousemove', this.resetInactivityTimer.bind(this));
    window.addEventListener('keypress', this.resetInactivityTimer.bind(this));
  }

  startInactivityTimer() {
    // Configura el temporizador para una hora (3600000 milisegundos)
    this.timeoutId = window.setTimeout(() => {
      if (!this.userService.isOnLoginPage()) {
        this.showInactivityAlert();
      }
    }, 60000);
  }

  resetInactivityTimer() {
    window.clearTimeout(this.timeoutId);
    this.startInactivityTimer();
  }

  showInactivityAlert() {
    Swal.fire({
      title: '¡Advertencia!',
      text: `Su sesión está a punto de terminar. ¿Deseas más tiempo para realizar la operación actual ? ${this.counterService.updateCountdown(30)}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      reverseButtons: true,
      timer: 30000,
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.value) {
        this.resetInactivityTimer();
      } else {
        this.userService.logout();
      }
    });
  }


}
