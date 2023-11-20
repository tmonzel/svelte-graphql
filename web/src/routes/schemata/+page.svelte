<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import SchemaForm from '$lib/components/SchemaForm.svelte';
	import { SchemaEntity, type Schema, type SchemaInput } from '$lib/entities/schema';
	import { onMount } from 'svelte';

  let schemata: Schema[] = [];
	let schemaDialog: Modal;
	let deleteConfirmDialog: Modal;
	let form: SchemaForm;
	let isSubmittable = true;
	let input: SchemaInput | undefined;
	let selectedSchema: Schema;

	async function confirmDelete(id: string) {
		await SchemaEntity.destroy(id);
		deleteConfirmDialog.close();
	}

	function openDeleteDialog(schema: Schema) {
		selectedSchema = schema;
		deleteConfirmDialog.open();
	}

	function openDialog(schema?: SchemaInput) {
		if(schema) {
			input = schema;
		} else {
			input = undefined;
		}

		schemaDialog.open();
	}

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
	<button class="btn btn-primary mb-3" on:click={() => openDialog()}>+ Add Schema</button>

	<div class="row">
		{#each schemata as schema}
		<div class="col-md-4">

			<div class="card">
				<div class="card-body">
					<h5 class="card-title">{schema.name}</h5>
					<h6 class="card-subtitle mb-2 text-body-secondary">{schema.id}</h6>
					{#if schema.description}
						<p class="card-text">{schema.description}</p>
					{/if}
					<a href="/schemata/{schema.id}" class="btn btn-secondary btn-sm">Documents</a>
					<button class="btn btn-light btn-sm" on:click={() => openDialog(schema)}>
						Edit
					</button>
					<button class="btn btn-light btn-sm" on:click={() => openDeleteDialog(schema)}>
						Delete
					</button>
				</div>
			</div>
		</div>
		{/each}
	</div>
	
	<Modal bind:this={deleteConfirmDialog} size="sm">
		<svelte:fragment slot="title">
			Confirm delete
		</svelte:fragment>
		Are you really want to delete <strong>{selectedSchema.name}</strong> schema?
		<svelte:fragment slot="footer">
			<button type="button" class="btn btn-secondary" on:click={() => deleteConfirmDialog.close()}>No</button>
			<button 
				type="button" 
				class="btn btn-danger" 
				on:click={() => confirmDelete(selectedSchema.id)} 
			>
			Yes, delete!
			</button>
		</svelte:fragment>
	</Modal>

	<Modal bind:this={schemaDialog} size="lg">
		<svelte:fragment slot="title">
			{#if input}
				Edit schema
			{:else}
				Add new schema
			{/if}
		</svelte:fragment>
		
		<SchemaForm 
			bind:this={form} 
			bind:submittable={isSubmittable}
			{input}
			on:success={() => schemaDialog.close()}
		/>
		
		<svelte:fragment slot="footer">
			<button type="button" class="btn btn-secondary" on:click={() => schemaDialog.close()}>Cancel</button>
			<button 
				type="button" 
				class="btn btn-primary" 
				on:click={() => form.submit()} 
				disabled={!isSubmittable}
			>
			{#if input}
				Save changes
			{:else}
				Create schema
			{/if}
			</button>
		</svelte:fragment>
	</Modal>
</div>