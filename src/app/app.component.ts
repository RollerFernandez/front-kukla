import { Component , OnInit} from '@angular/core';
import { InactivityService } from './core/services/inactivity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  constructor(private inactivityService: InactivityService) {}
  ngOnInit() {
    this.inactivityService.startInactivityTimer();
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  }

  ngOnDestroy() {
    // Detiene el monitoreo de inactividad
    // this.inactivityService.stopMonitoring();
  }
}
