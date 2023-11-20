<script lang="ts">
	import { getDocumentEntity } from '$lib/entities/document';
	import type { Schema } from '$lib/entities/schema';
	import { FormControl, Validators, createForm } from '$lib/forms';
	import FormInput from '$lib/forms/components/FormInput.svelte';

  export let schema: Schema;

  type DocumentModel = {
    collectionName: FormControl<string>;
    attributes: FormControl[]
  }

  const { form, state, markAllAsTouched } = createForm<DocumentModel>({
    collectionName: new FormControl(schema.collectionName),
    attributes: schema.attributes.map(attr => {
      return new FormControl('', attr.required ? Validators.required() : []);
    })
  });

  const entity = getDocumentEntity(schema.collectionName);

  export const submit = async() => {
    if(!$state.valid) {
      markAllAsTouched();
      return;
    }

    const value: { [prop: string]: any } = {};

    schema.attributes.forEach((attr, i) => {
      value[attr.name] = $state.value.attributes[i];
    });

    await entity.create(value);
  }
</script>

<div>
  {#each $form.attributes as attr, i}
  <div class="mb-3">
    <FormInput bind:control={attr} label={schema.attributes[i]?.name}></FormInput>
  </div>
  {/each}
</div>