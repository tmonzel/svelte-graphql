<script lang="ts">
	import DocumentForm from '$lib/components/DocumentForm.svelte';
  import Modal from '$lib/components/Modal.svelte';
	import { getDocumentEntity } from '$lib/entities/document';

  export let data;

  let form: DocumentForm;
  let formDialog: Modal;
  let isSubmittable = true;
  let documents: any[] = [];

  let entityModel = getDocumentEntity(data.schema.collectionName);

  entityModel.watchAll().subscribe(items => {
    documents = items;
  });

  /*client.watchQuery({ 
    query: queryMap.list, 
    variables: { collectionName: data.schema.collectionName } 
  }).map(result => {
    result.data.documents.list as any[]
  }).subscribe(documents => {
    console.log(documents);
    
  })*/
</script>

<div class="page-options">
  <a class="btn btn-light mb-3" href="/schemata">
    <div class="d-flex">
      <span class="material-icons me-2">chevron_left</span>
      Schemata
    </div>
  </a>
  <button class="btn btn-primary mb-3" on:click={() => formDialog.open()}>+ Add {data.schema.name}</button>
</div>

<div>
  <h1>{data.schema.name}</h1>
  <table class="table">
    <thead>
      <tr>
        {#each data.schema.attributes as attr}
        <th>{attr.name}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each documents as doc}
      <tr>
        {#each data.schema.attributes as attr}
        <td>{doc[attr.name]}</td>
        {/each}
      </tr>
      {/each}
    </tbody>
  </table>
</div>

<Modal bind:this={formDialog} size="lg">
  <svelte:fragment slot="title">
    Add new {data.schema.name}
  </svelte:fragment>

  <DocumentForm bind:this={form} schema={data.schema}></DocumentForm>
  
  <svelte:fragment slot="footer">
    <button type="button" class="btn btn-secondary" on:click={() => formDialog.close()}>Cancel</button>
    <button 
      type="button" 
      class="btn btn-primary" 
      on:click={() => form.submit()}
      disabled={!isSubmittable}
    >
      Create {data.schema.name}
    </button>
  </svelte:fragment>
</Modal>