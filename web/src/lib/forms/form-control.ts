import type { Validator } from './types';

export class FormControl<T = any> {
  validators: Validator[];
  touched: boolean = false;
  dirty: boolean = false;
  errorMessage?: string;
  valid = true;
  value: any;

  constructor(initialValue: any = null, validators: Validator | Validator[] = []) {
    this.value = initialValue;
    this.validators = Array.isArray(validators) ? validators : [validators];

    this.handleChange(initialValue);
  }

  handleChange(value: any): FormControl<T> {
    this.value = value;
    this.valid = true;

    delete this.errorMessage;

    for(const validator of this.validators) {
      const result = validator(value);

      if(!result.valid) {
        this.errorMessage = result.errorMessage;
        
        this.valid = false;
        break;
      }
    }

    return this;
  }
}