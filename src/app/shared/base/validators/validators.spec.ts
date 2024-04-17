import { FormControl } from "@angular/forms";
import { CustomValidators } from "./validators";

describe('CustomValidators', () => {
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl();
  });

  describe('min', () => {
    it('should return error', () => {
      control.addValidators(CustomValidators.min(7, 'Debe ser mayor de 6'));
      control.setValue(6);
      expect(control.errors.min).toBeTruthy();
    });

    it('should return null', () => {
      control.addValidators(CustomValidators.min(7, 'Debe ser mayor de 6'));
      control.setValue(9);
      expect(control.errors).toBeNull();
    });
  });

  describe('max', () => {
    it('should return error', () => {
      control.addValidators(CustomValidators.max(5, 'Debe ser menor de 6'));
      control.setValue(14);
      expect(control.errors.max).toBeTruthy();
    });

    it('should return null', () => {
      control.addValidators(CustomValidators.max(7, 'Debe ser menor de 6'));
      control.setValue(4);
      expect(control.errors).toBeNull();
    });
  });

  describe('minDate', () => {
    it('should return error', () => {
      control.addValidators(CustomValidators.minDate(new Date('2023-12-29'), 'Fecha invalida'));
      control.setValue(new Date('2023-11-25'));
      expect(control.errors.minDate).toBeTruthy();
    });

    it('should return null', () => {
      control.addValidators(CustomValidators.minDate(new Date('2023-12-29'), 'Fecha invalida'));
      control.setValue(new Date('2023-12-30'));
      expect(control.errors).toBeNull();
    });
  });
});
