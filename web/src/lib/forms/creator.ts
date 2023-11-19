import { derived, writable, type Readable } from 'svelte/store';
import type { Form, FormSchema, FormState, FormValidationError } from './types';
import { FormControl } from './form-control';

export class FormHandler {
  constructor(readonly state: Readable<FormState>) {

  }

  submit(): void {
    console.log("submit");
  }
}

export function createForm<T extends FormSchema>(schema: T): Form<T> {
  const form = writable<T>(schema);
  const state = derived(form, (schema) => {
    let errors: FormValidationError[] = [];
    let touched = false;
    let submittable = true;

    const value = walkControls(schema, (control, path) => {
      if(control.errorMessage) {
        errors = [...errors, { name: path, message: control.errorMessage! }]
      }

      if(control.touched) {
        touched = true;

        if(!control.valid) {
          submittable = false;
        }
      }

      return control.value;
    });

    return {
      valid: errors.length === 0,
      touched,
      value,
      submittable
    } satisfies FormState as FormState;
  });

  function walkControls(schema: FormSchema, writer: (control: FormControl, path: string) => FormControl): any {
    const result: any = {};

    for(const [name, entry] of Object.entries(schema)) {
      if(Array.isArray(entry)) {
        result[name] = entry.map((v) => walkControls(v as FormSchema, writer));
      } else if(entry instanceof FormControl) {
        // Is concrete FormControl
        result[name] = writer(entry, name);
      } else if(typeof entry === 'object') {
        result[name] = walkControls(entry as FormSchema, writer);
      } else {
        // Do nothing atm
      }
    }

    return result;
  }

  function walkForm(walker: (control: FormControl) => FormControl): void {
    form.update(schema => walkControls(schema, walker))
  }

  function markAllAsTouched(): void {
    walkForm((control) => {
      control.touched = true;
      return control;
    });
  }

  return {
    form,
    state,
    markAllAsTouched,
  };
}
