import { TestBed } from '@angular/core/testing';
import { ShortCurrencyPipe } from './short-currency.pipe';
import { CurrencyPipe } from '@angular/common';

describe('ShortCurrencyPipe', () => {
  let shortCurrencyPipe: ShortCurrencyPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyPipe, ShortCurrencyPipe],
    });
    shortCurrencyPipe = TestBed.inject(ShortCurrencyPipe);
  });

  it('should format amount with thousand', () => {
    const result = shortCurrencyPipe.transform(954000, 'USD');
    expect(result).toBe('$954k');
  });

  it('should format amount with millions', () => {
    const result = shortCurrencyPipe.transform(954152001, 'USD');
    expect(result).toBe('$954M');
  });
});
