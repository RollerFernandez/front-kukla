import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private countdownSubject = new BehaviorSubject<number>(30);
  countdown$ = this.countdownSubject.asObservable();

  constructor() {}

  updateCountdown(countdown: number) {
    this.countdownSubject.next(countdown);
  }
}
