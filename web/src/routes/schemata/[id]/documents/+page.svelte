<script lang="ts">
	import DocumentForm from './DocumentForm.svelte';
  import Modal from '$lib/components/Modal.svelte';
	import { getDocumentEntity } from '$lib/entities/document';

  export let data;

  let form: DocumentForm;
  let formDialog: Modal;
  let submittable = true;
  let documents: any[] = [];
  let selectedDocument: Document | null;

  function openFormDialog(doc: Document | null = null): void {
    selectedDocument = doc;
    formDialog.open();
  }

  let entityModel = getDocumentEntity(data.schema.collectionName);

  entityModel.watchAll().subscribe(items => {
    documents = items;
  });
</script>

<div class="page-options">
  <a class="btn btn-light mb-3" href="/">
    <div class="d-flex">
      <span class="material-icons me-2">chevron_left</span>
      Schemata
    </div>
  </a>
  <button class="btn btn-primary mb-3" on:click={() => openFormDialog()}>+ Add {data.schema.name}</button>
</div>

<h1 class="my-4">{data.schema.name}</h1>
  
<table class="table">
  <thead>
    <tr>
      <th>#</th>
      {#each data.schema.attributes as attr}
      <th>{attr.label}</th>
      {/each}
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each documents as doc}
    <tr>
      <td style="width: 20%;">{doc.id}</td>
      {#each data.schema.attributes as attr}
      <td>{doc[attr.name] ?? '-'}</td>
      {/each}
      <td style="max-width: 20px">
        <button class="btn p-0 d-flex" on:click={() => openFormDialog(doc)}>
          <span class="material-icons">edit</span>
        </button>
      </td>
    </tr>
    {/each}
  </tbody>
</table>

<Modal bind:this={formDialog} size="lg">
  <svelte:fragment slot="title">
    {#if selectedDocument}
      Edit {data.schema.name}
    {:else}
      Add new {data.schema.name}
    {/if}
  </svelte:fragment>

  <DocumentForm 
    bind:this={form}
    bind:submittable
    schema={data.schema} 
    input={selectedDocument}
    on:success={() => formDialog.close()}
  />
  
  <svelte:fragment slot="footer">
    <button type="button" class="btn btn-secondary" on:click={() => formDialog.close()}>Cancel</button>
    <button 
      type="button" 
      class="btn btn-primary" 
      on:click={() => form.submit()}
      disabled={!submittable}
    >
    {#if selectedDocument}
      Save {data.schema.name}
    {:else}
      Create {data.schema.name}
    {/if}
    </button>
  </svelte:fragment>
</Modal>