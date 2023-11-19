import type { Readable, Writable } from 'svelte/store';
import type { FormControl } from './form-control';

export type FieldValidation = { 
  valid: boolean; 
  name: string;
  errorMessage: string;
};

export type Validator = (value: unknown) => FieldValidation;

export interface FormSchema {
  [name: string]: FormControl | FormSchema | FormControl[] | FormSchema[];
}

export interface FormValidationError {
  name: string;
  message: string;
}

export interface FormState {
  valid: boolean;
  touched: boolean;
  submittable: boolean;
  value: any;
}

export interface Form<T> {
  form: Writable<T>;
  state: Readable<FormState>;
  markAllAsTouched: () => void;
}