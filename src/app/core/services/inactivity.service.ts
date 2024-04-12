import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, fromEvent, interval, timer } from 'rxjs';
import { debounceTime, filter, map, take } from 'rxjs/operators';
import { UserService } from 'src/app/features/account/services/user.service';
import Swal from 'sweetalert2';
import { CounterService } from './counterService';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private inactivityTimeMs: number = 60000; // 1 hora en milisegundos
  private timer: any;
  private confirmationModalShown: boolean = false;

  constructor(private router: Router, private userService:UserService, private counterService: CounterService) {
       // Observar los cambios de ruta
    // this.router.events
    // .pipe(filter((event) => event instanceof NavigationEnd))
    // .subscribe((event: NavigationEnd) => {
    //   // Verificar si la ruta actual es la página de inicio de sesión
    //   if (event.url !== '/account/login') {
    //     // Si no es la página de inicio de sesión, iniciar el temporizador de inactividad
    //     this.init();
    //   } else {
    //     // Si es la página de inicio de sesión, detener el temporizador de inactividad
    //     this.stopTimer();
    //   }
    // });
  }

  init() {
    // Reinicia el temporizador cuando haya actividad del usuario
    fromEvent(document, 'mousemove').pipe(debounceTime(1000)).subscribe(() => this.resetTimer());
    fromEvent(document, 'keydown').pipe(debounceTime(1000)).subscribe(() => this.resetTimer());

    // Inicia el temporizador de inactividad
    this.startTimer();
  }

  resetTimer() {
    clearTimeout(this.timer);
    this.startTimer();
  }

  startTimer() {
    if (!this.confirmationModalShown) {
      this.timer = setTimeout(() => {
        let countdown = 30;
        this.confirmationModalShown = true; // Marcar el modal como mostrado
        Swal.fire({
          title: `<h5>Su sesión está a punto de terminar. ¿Desea más tiempo para mantener su sesión activa? (${countdown}s)</h5>`,
          text: '',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#34c38f',
          cancelButtonColor: '#f46a6a',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          timerProgressBar: true,
          timer: countdown * 1000,
        }).then(result => {
          if (result.value) {
            this.userService.logout();
          }
        });
      }, this.inactivityTimeMs);
    }
  }
  
  


  stopTimer() {
    clearTimeout(this.timer);
  }
  private sessionTimeoutSubscription: Subscription;
  private timerSubscription: Subscription;
  private showedAlert = false;

  startMonitoring() {
    this.sessionTimeoutSubscription = interval(60000) //3600000 = 1 hora en milisegundos
      .subscribe(() => {
        if (!this.showedAlert) {
          this.showAlert3();
        }
      });
  }
  
  stopMonitoring() {
    this.sessionTimeoutSubscription.unsubscribe();
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  showAlert3() {
    this.showedAlert = true;
    const confirmationTimer = 30; // Tiempo en segundos
  
    Swal.fire({
      title: `¿Desea continuar con la sesión? <span id="countdown">${confirmationTimer}</span>`,
      html: `<p>Su tiempo de sesión está por expirar.</p>`,
      timer: confirmationTimer * 1000, // Tiempo en milisegundos
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: true,
      confirmButtonText: 'Continuar',
      showCancelButton: true,
      cancelButtonText: 'Cerrar sesión',
      didOpen: () => {
        const countdownInterval = interval(1000)
          .pipe(
            take(confirmationTimer),
            map(count => confirmationTimer - count)
          );
  
        this.timerSubscription = countdownInterval.subscribe(remaining => {
          const countdown = Swal.getHtmlContainer().querySelector('#countdown');
          if (countdown) {
            countdown.textContent = remaining.toString();
          }
        });
      },
      willClose: () => {
        this.timerSubscription.unsubscribe();
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirmó continuar con la sesión
        console.log('Sesión continuada');
      } else {
        // El usuario no confirmó o se agotó el tiempo
        console.log('Sesión cerrada');
        // Realiza las acciones necesarias para cerrar la sesión
      }
    });
  }

  showAlert2() {
    this.showedAlert = true;
    let confirmationTimer = 30; // Tiempo en segundos
  
    Swal.fire({
      title: `¿Desea continuar con la sesión? <span id="countdown">${confirmationTimer}</span>`,
      html: `<p>Su tiempo de sesión está por expirar.</p>`,
      timer: confirmationTimer * 1000, // Tiempo en milisegundos
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: true,
      confirmButtonText: 'Continuar',
      showCancelButton: true,
      cancelButtonText: 'Cerrar sesión',
      didOpen: () => {
        this.timerSubscription = interval(1000)
          .pipe(take(confirmationTimer))
          .subscribe(() => {
            confirmationTimer--;
            const countdown = Swal.getHtmlContainer().querySelector('#countdown');
            if (countdown) {
              countdown.textContent = confirmationTimer.toString();
            }
          });
      },
      willClose: () => {
        this.timerSubscription.unsubscribe();
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirmó continuar con la sesión
        console.log('Sesión continuada');
      } else {
        // El usuario no confirmó o se agotó el tiempo
        console.log('Sesión cerrada');
        // Realiza las acciones necesarias para cerrar la sesión
      }
    });
  }

  showAlert1() {
    this.showedAlert = true;
    let confirmationTimer = 30; // Tiempo en segundos
  
    Swal.fire({
      title: `¿Desea continuar con la sesión? <span id="countdown">${confirmationTimer}</span>`,
      html: `<p>Su tiempo de sesión está por expirar.</p>`,
      timer: confirmationTimer * 1000, // Tiempo en milisegundos
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: true,
      confirmButtonText: 'Continuar',
      showCancelButton: true,
      cancelButtonText: 'Cerrar sesión',
      didOpen: () => {
        this.timerSubscription = interval(1000)
          .pipe(take(confirmationTimer))
          .subscribe((_) => {
            const countdown = Swal.getHtmlContainer().querySelector('#countdown');
            if (countdown) {
              countdown.textContent = `${confirmationTimer - 1}`;
              confirmationTimer--;
            }
          });
      },
      willClose: () => {
        this.timerSubscription.unsubscribe();
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirmó continuar con la sesión
        this.userService.logout();
        console.log('Sesión continuada');
      } else {
        // El usuario no confirmó o se agotó el tiempo
        console.log('Sesión cerrada');
        // Realiza las acciones necesarias para cerrar la sesión
      }
    });
  }

  showAlert() {
    this.showedAlert = true;
    let confirmationTimer = 30; // Tiempo en segundos
    
    Swal.fire({
      title: `¿Desea continuar con la sesión? <span id="countdown">${confirmationTimer}</span>`,
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',     didOpen: () => {
        this.timerSubscription = interval(1000)
          .pipe(take(confirmationTimer))
          .subscribe((_) => {
            const countdown = Swal.getHtmlContainer().querySelector('#countdown');
            if (countdown) {
              countdown.textContent = `${confirmationTimer - 1}`;
              confirmationTimer--;
            }
          });
      },
      willClose: () => {
        this.timerSubscription.unsubscribe();
      }
    }).then(result => {
      
      if (result.isConfirmed) {
        this.userService.logout();
      }
    });
  
    // Swal.fire({
    //   // Configuración de SweetAlert2
    //   // ...
    //   didOpen: () => {
    //     this.timerSubscription = interval(1000)
    //       .pipe(take(confirmationTimer))
    //       .subscribe((_) => {
    //         const countdown = Swal.getHtmlContainer().querySelector('#countdown');
    //         if (countdown) {
    //           countdown.textContent = `${confirmationTimer - 1}`;
    //           confirmationTimer--;
    //         }
    //       });
    //   },
    //   willClose: () => {
    //     this.timerSubscription.unsubscribe();
    //   }
    // }).then((result) => {
    //   if (result.isConfirmed) {        
    //     // El usuario confirmó continuar con la sesión
    //     console.log('Sesión continuada');
    //   } else {
    //     this.userService.logout();
    //     // El usuario no confirmó o se agotó el tiempo
    //     console.log('Sesión cerrada');
    //     // Realiza las acciones necesarias para cerrar la sesión
    //   }
    // });
  }
}
