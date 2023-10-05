<script lang="ts">
	import { onMount } from 'svelte';
	import { collectionModel, type Collection } from '$lib/entities/collection';

	let collections: Collection[] = [];
	let newCollectionName: string;

	async function createCollection() {
		await collectionModel.create({ name: newCollectionName });
	}

	async function dropCollection(name: string) {
		await collectionModel.drop(name);
	}

	onMount(() => {
		collectionModel.all$.subscribe(list => collections = list.sort((a, b) => {
			if(a.name < b.name) {
				return -1;
			}

			if(a.name > b.name) {
				return 1;
			}

			return 0;
		}))
	})

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container mt-5">
	<h1>Collections</h1>

	<p class="lead">Manage all of your collections</p>

	<ul class="list-group mb-3">
		{#each collections as collection}
		<li class="list-group-item d-flex align-items-center justify-content-between">{collection.name} 
			<button class="btn p-0" on:click={() => dropCollection(collection.name)}>
				<span class="material-icons">delete</span>
			</button>
		</li>
		{/each}
	</ul>

	<div class="input-group input-group-lg mb-3">
		<input 
			type="text" 
			class="form-control" 
			placeholder="New collection name" 
			aria-label="New collection name" 
			aria-describedby="button-create-collection"
			bind:value={newCollectionName}
		>

		<button class="btn btn-primary" type="button" id="button-create-collection" on:click={createCollection}>Create</button>
	</div>
</div>
