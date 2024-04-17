import { AbstractControl, ValidatorFn } from "@angular/forms";

export class CustomValidators {
  static min(min: number, message):  ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (control.value && min > control.value) {
        return { min: message };
      }

      return null;
    }
  }

  static max(max: number, message):  ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (control.value && max < control.value) {
        return { max: message };
      }

      return null;
    }
  }

  static minDate(minDate: Date, message: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (control.value && minDate > control.value) {
        return { minDate: message };
      }

      return null;
    }
  }
}
