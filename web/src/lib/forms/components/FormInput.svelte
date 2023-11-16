<script lang="ts">
	import type { FormControl } from '../form-control';

  export let label: string | null = null;
  export let placeholder: string | null = null;
  export let type = 'text';
  export let value: any = null;
  export let control: FormControl;
  export let touched = false;

  const id = crypto.randomUUID();

  function handleChange(e: Event) {
    value = (e.target as HTMLInputElement).value;
  }

  function handleTouched(e: Event) {
    touched = true;
  }
</script>

{#if label}
<label for="formField_{id}" class="form-label">{label}</label>
{/if}
<input 
  id="formField_{id}" 
  {type} 
  class="form-control"
  class:is-invalid={touched && !control.valid}
  class:is-valid={touched && control.valid}
  on:input={handleChange}
  on:change={handleChange}
  on:blur={handleTouched}
  {value} 
  placeholder={placeholder}
>
<div class="invalid-feedback">
  {control.errorMessage} 
</div>