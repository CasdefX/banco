import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { IProduct } from '../interfaces/product';

export function checkDuplicate(duplicateError: Boolean): ValidatorFn {
  return (control: AbstractControl) => {
    const error: ValidationErrors = { idDuplicate: true };
    try {
      if (!control.value && duplicateError) throw new Error()
    } catch (e) {
      control.setErrors(error);
      return error;
    }
    control.setErrors(null);
    return null;
  }
}
