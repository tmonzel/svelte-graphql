<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import { SchemaEntity, type Schema } from '$lib/entities/schema';
	import { onMount } from 'svelte';

  let schemata: Schema[] = [];
	let deleteConfirmDialog: Modal;
	let selectedSchema: Schema;

	async function confirmDelete(id: string) {
		await SchemaEntity.destroy(id);
		deleteConfirmDialog.close();
	}

	function openDeleteDialog(schema: Schema) {
		selectedSchema = schema;
		deleteConfirmDialog.open();
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
	<a class="btn btn-primary mb-3" href="/schemata/new">+ Add Schema</a>

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
					<a href="/schemata/{schema.id}/documents" class="btn btn-secondary btn-sm">Documents</a>
					<a class="btn btn-light btn-sm" href="/schemata/{schema.id}/edit">
						Edit
					</a>
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
</div>