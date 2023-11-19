<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import SchemaForm from '$lib/components/SchemaForm.svelte';
	import { SchemaEntity, type Schema, type SchemaInput } from '$lib/entities/schema';
	import { onMount } from 'svelte';

  let schemata: Schema[] = [];
	let dialog: Modal;
	let form: SchemaForm;
	let isSubmittable = true;
	let input: SchemaInput | undefined;

	async function deleteSchema(id: string) {
		await SchemaEntity.destroy(id);
	}

	function openDialog(schema?: SchemaInput) {
		if(schema) {
			input = schema;
		} else {
			input = undefined;
		}

		dialog.open();
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
					<a href="/schemata/{schema.id}" class="btn btn-secondary btn-sm">View</a>
					<button class="btn btn-light btn-sm" on:click={() => openDialog(schema)}>
						Edit
					</button>
					<button class="btn btn-light btn-sm" on:click={() => deleteSchema(schema.id)}>
						Delete
					</button>
				</div>
			</div>
		</div>
		{/each}
	</div>

  <!--<ul class="list-group mb-3">
		{#each schemata as schema}
		<li class="list-group-item d-flex align-items-center justify-content-between">
			{schema.id} / 
			{schema.name} 
			<div>
				<a class="btn p-0" href="/schemata/{schema.id}">
					<span class="material-icons">article</span>
				</a>
				<button class="btn p-0" on:click={() => openDialog(schema)}>
					<span class="material-icons">edit</span>
				</button>
				<button class="btn p-0" on:click={() => deleteSchema(schema.id)}>
					<span class="material-icons">delete</span>
				</button>
			</div>
		</li>
		{/each}
	</ul>-->

	<Modal bind:this={dialog} size="lg">
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
			on:success={() => dialog.close()}
		/>
		
		<svelte:fragment slot="footer">
			<button type="button" class="btn btn-secondary" on:click={() => dialog.close()}>Cancel</button>
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