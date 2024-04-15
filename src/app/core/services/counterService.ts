import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private countdownValue: number = 30; // Tiempo de espera inicial en segundos
  private countdownSubscription: Subscription;
  
  private countdownSubject = new BehaviorSubject<number>(30);
  countdown$ = this.countdownSubject.asObservable();

  constructor() {}

  updateCountdown(countdown: number) {
    this.countdownSubject.next(countdown);
  }

  startCountdown(): Observable<number> {
    // Crea un observable que emite el valor actual del contador cada segundo
    return new Observable<number>((observer) => {
      const timer = setInterval(() => {
        observer.next(this.countdownValue);
        this.countdownValue--;

        // Detener el temporizador cuando el valor llega a cero
        if (this.countdownValue < 0) {
          clearInterval(timer);
          observer.complete();
        }
      }, 1000);
    });
  }
}
