import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortCurrency'
})
export class ShortCurrencyPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: number, ...args: [string]): string {
    if (value >= 1000 && value < 1000000) {
      return this.format(Math.round(value / 1000), ...args) + 'k';
    } else if (value >= 1000000) {
      return this.format(Math.round(value / 1000000), ...args) + 'M';
    } else {
      return this.format(value, ...args);
    }
  }

  private format(value: number, ...args: [string]): string {
    return this.currencyPipe.transform(value, args[0] ?? 'USD', 'symbol', '1.0-0');
  }
}
