<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import SchemaForm from '$lib/components/SchemaForm.svelte';
	import { SchemaEntity, type Schema } from '$lib/entities/schema';
	import { onMount } from 'svelte';

  let schemata: Schema[] = [];
	let modalOpened = false;
	let schemaForm: SchemaForm;
	let isFormValid = true;

  onMount(() => {
		SchemaEntity.watchAll().subscribe(list => schemata = list.sort((a, b) => {
			if(a.id < b.id) {
				return -1;
			}

			if(a.id > b.id) {
				return 1;
			}

			return 0;
		}))
	})
</script>

<div>
	<button class="btn btn-primary mb-3" on:click={() => modalOpened = true}>+ Add Schema</button>

  <ul class="list-group mb-3">
		{#each schemata as schema}
		<li class="list-group-item d-flex align-items-center justify-content-between">
			{schema.id} / 
			{schema.name} 
			<button class="btn p-0">
				<span class="material-icons">delete</span>
			</button>
		</li>
		{/each}
	</ul>

	<Modal open={modalOpened} size="lg">
		<div class="modal-header">
			<h5 class="modal-title">Add new schemata</h5>
			<button type="button" class="btn-close" aria-label="Close" on:click={() => modalOpened = false}></button>
		</div>
		<div class="modal-body">
			<SchemaForm 
				bind:valid={isFormValid}
				bind:this={schemaForm} 
				on:success={() => modalOpened = false} 
			/>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-secondary" on:click={() => modalOpened = false}>Close</button>
			<button type="button" class="btn btn-primary" on:click={() => schemaForm.submit()} disabled={!isFormValid}>Save changes</button>
		</div>
	</Modal>
</div>