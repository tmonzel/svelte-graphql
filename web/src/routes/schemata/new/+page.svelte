<script lang="ts">
	import { goto } from '$app/navigation';
	import SchemaForm from '../SchemaForm.svelte';

  let form: SchemaForm;
  let isSubmittable = true;
</script>

<div class="page-options">
  <a class="btn btn-light mb-3" href="/">
    <div class="d-flex">
      <span class="material-icons me-2">chevron_left</span>
      Schemata
    </div>
  </a>
  <button class="btn btn-primary mb-3" on:click={() => form.submit()} disabled={!isSubmittable}>Create</button>
</div>

<SchemaForm 
  bind:this={form} 
  bind:submittable={isSubmittable}
  on:success={() => goto('/')}
/>