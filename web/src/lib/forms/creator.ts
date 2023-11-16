import { writable } from 'svelte/store';
import type { Form } from './types';
import type { FormControl } from './form-control';

export interface FormSchema {
  [name: string]: FormControl | (() => FormSchema) | FormSchema;
}

export function createForm<T extends object>(schema: FormSchema, initialValue: T): Form<T> {
  const form = writable<any>({});
  const value = writable(initialValue);
  const isValid = writable<boolean>(true);
  const { subscribe, update, set: _set } = value;

  function validate(value: any, validationSchema: FormSchema): { [key: string]: any }  {
    const resultValue: { [key: string]: any } = {};

    for(const key in value) {
      const val = value[key] as any;
      const validators = validationSchema[key];
        
      if(Array.isArray(val)) {
        resultValue[key] = val.map((v) => validate(v, typeof validators === 'function' ? validators() : {}));
      } else if(typeof val === 'object') {
        resultValue[key] = validate(val, validationSchema);
      } else {
        const control = validationSchema[key] as FormControl;
        control.validate(val);
        
        resultValue[key] = control;
      }
    }

    return resultValue; 
  }
 
  function set(value: T) {
    isValid.set(true);
    form.set(validate(value, schema));

    _set(value);
  }

  set(initialValue);

  return {
    value: { subscribe, update, set },
    form,
    isValid,
  };
}
