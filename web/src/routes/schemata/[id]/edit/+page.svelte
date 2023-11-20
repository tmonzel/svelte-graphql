<script lang="ts">
	import { goto } from '$app/navigation';
	import { notify } from '$lib/notification';
	import SchemaForm from '../../SchemaForm.svelte';

  export let data;

  let form: SchemaForm;
  let submittable = true;
  let dirty = false;
</script>

<div class="page-options">
  <a class="btn btn-light mb-3" href="/">
    <div class="d-flex">
      <span class="material-icons me-2">chevron_left</span>
      Schemata
    </div>
  </a>
  <button class="btn btn-primary mb-3" on:click={() => form.submit()} disabled={!dirty || !submittable}>Save changes</button>
</div>

<SchemaForm 
  bind:this={form} 
  bind:submittable
  bind:dirty
  input={data.schema}
  on:success={() => {
    notify({ type: 'success', message: 'Schema saved' });
    goto('/')
  }}
/>