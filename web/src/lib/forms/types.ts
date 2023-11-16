import type { Readable, Writable } from 'svelte/store';

export type FieldValidation = { 
  valid: boolean; 
  name: string;
  errorMessage: string;
};

export type Validator = (value: unknown) => FieldValidation;

export interface Form<T> {
  form: Writable<any>;
  value: Writable<T>;
  isValid: Readable<boolean>;
}