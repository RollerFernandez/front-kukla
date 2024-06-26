import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";

export class CustomValidators {
  static min(min: number, message):  ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (control.value === undefined || control.value === null) {
        return null;
      }

      if (Number(min) > Number(control.value)) {
        return { min: message };
      }

      return null;
    }
  }

  static max(max: number, message):  ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (control.value === undefined || control.value === null) {
        return null;
      }

      if (Number(max) < Number(control.value)) {
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

  static required(message: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      const result = Validators.required(control);

      if (result) {
        return { required: message };
      }


      return null;
    }
  }
}
