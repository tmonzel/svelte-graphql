<script lang="ts">
	import type { FormControl } from '../form-control';

  export let label: string | null = null;
  export let value: any = null;
  export let control: FormControl;
  export let options: { value: any; name: string; }[] = [];
  export let touched = false;

  const id = crypto.randomUUID();

  function handleChange(e: Event) {
    value = (e.target as any).value;
  }

  function handleTouched(e: Event) {
    touched = true;
  }
</script>

{#if label}
<label for="formField_{id}" class="form-label">{label}</label>
{/if}
<select 
  id="formField_{id}"  
  class="form-select"
  class:is-invalid={touched && !control.valid}
  class:is-valid={touched && control.valid}
  on:change={handleChange} 
  on:blur={handleTouched}
>
  {#each options as opt}
    <option value={opt.value} selected={opt.value === value}>{opt.name}</option>
  {/each}
</select>
<div class="invalid-feedback">
  {control.errorMessage} 
</div>