import type { Validator } from './types';

export class FormControl {
  validators: Validator[];
  touched: boolean = false;
  dirty: boolean = false;
  errorMessage?: string;
  valid = true;

  constructor(validators: Validator | Validator[] = []) {
    this.validators = Array.isArray(validators) ? validators : [validators];
  }

  validate(value: any): void {
    this.valid = true;

    for(const validator of this.validators) {
      const result = validator(value);

      if(!result.valid) {
        this.errorMessage = result.errorMessage;
        this.valid = false;
        break;
      }
    }

    if(this.valid) {
      delete this.errorMessage;
    }
  }
}