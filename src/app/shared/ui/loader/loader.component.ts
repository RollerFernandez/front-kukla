import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from "../../../core/services/loader.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  isLoadingSub?: Subscription;
  loading: boolean = false;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.isLoadingSub = this.loaderService.isLoading.subscribe((v) => {
      setTimeout(() => {
        this.loading = v;
      });
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSub?.unsubscribe();
  }
}
