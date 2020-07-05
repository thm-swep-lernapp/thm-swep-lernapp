import {FormControl, ValidationErrors} from '@angular/forms';
import {Module} from '../../class/module';

export class ModulePickerValidators {
  public static isModule(control: FormControl): ValidationErrors {
    return control.value instanceof Module ? null : { isModule: false };
  }

  public static isModuleOrNull(control: FormControl): ValidationErrors {
    return control.value === null || control.value instanceof Module ? null : { isModule: false };
  }
}
