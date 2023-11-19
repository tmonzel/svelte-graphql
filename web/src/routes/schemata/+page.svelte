<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import SchemaForm from '$lib/components/SchemaForm.svelte';
	import { SchemaEntity, type Schema } from '$lib/entities/schema';
	import { onMount } from 'svelte';

  let schemata: Schema[] = [];
	let createModal: Modal;
	let form: SchemaForm;
	let isSubmittable = true;

  onMount(() => {
		SchemaEntity.watchAll().subscribe(list => schemata = list.sort((a, b) => {
			if(a.id < b.id) {
				return -1;
			}

			if(a.id > b.id) {
				return 1;
			}

			return 0;
		}));
	})
</script>

<div>
	<button class="btn btn-primary mb-3" on:click={() => createModal.open()}>+ Add Schema</button>

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

	<Modal bind:this={createModal} size="lg">
		<svelte:fragment slot="title">
			Add new schema
		</svelte:fragment>
		
		<SchemaForm 
			bind:this={form} 
			bind:submittable={isSubmittable} 
		/>
		
		<svelte:fragment slot="footer">
			<button type="button" class="btn btn-secondary" on:click={() => createModal.close()}>Close</button>
			<button type="button" class="btn btn-primary" on:click={() => form.submit()} disabled={!isSubmittable}>Save changes</button>
		</svelte:fragment>
	</Modal>
</div>