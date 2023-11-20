<script lang="ts">
	import { getDocumentEntity, type DocumentInput } from '$lib/entities/document';
	import type { Schema } from '$lib/entities/schema';
	import { FormControl, Validators, createForm } from '$lib/forms';
	import FormInput from '$lib/forms/components/FormInput.svelte';
	import { createEventDispatcher } from 'svelte';

  export let schema: Schema;
  export let submittable = true;
  export let input: DocumentInput | null = null;

  type DocumentModel = {
    collectionName: FormControl<string>;
    attributes: FormControl[]
  }

  const { form, state, markAllAsTouched } = createForm<DocumentModel>({
    collectionName: new FormControl(schema.collectionName),
    attributes: schema.attributes.map(attr => {
      return new FormControl(input ? input[attr.name] : '', attr.required ? Validators.required() : []);
    })
  });

  const dispatch = createEventDispatcher();
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

    if(input && input.id) {
      await entity.update(input.id, value);
    } else {
      await entity.create(value);
    }

    dispatch('success', $state.value);
  }

  $: submittable = $state.submittable;
</script>

<div>
  {#each $form.attributes as attr, i}
  <div class="mb-3">
    <FormInput bind:control={attr} label={schema.attributes[i]?.label}></FormInput>
  </div>
  {/each}
</div>