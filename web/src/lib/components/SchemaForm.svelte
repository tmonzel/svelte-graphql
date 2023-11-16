<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import { FormInput, FormSelect } from '$lib/forms/components'; 
	import { FormControl, Validators, createForm } from '$lib/forms';
	import { SchemaEntity } from '$lib/entities/schema';

  const dispatch = createEventDispatcher();

  export let valid = true;
  export let submitted = false;

  type Schema = {
    name: string;
    attributes: { name: string; type: string, required: boolean }[];
  }

  const { form, value, isValid } = createForm<Schema>({
    name: new FormControl(Validators.required()),
    attributes: () => {
      return {
        name: new FormControl(Validators.required()),
        type: new FormControl(Validators.required()),
        required: new FormControl(),
      }
    }
  }, {
    name: '',
    attributes: []
  });

  $: valid = $isValid;

  function addAttribute() {
    $value.attributes = [...$value.attributes, { name: '', type: 'text', required: true }];
  }

  const attributeTypes = [
    {
      name: 'Text',
      value: 'text'
    },
    {
      name: 'Number',
      value: 'number'
    }
  ]
  
  
  export const submit = async() => {
    submitted = true;

    if(!valid) {
      // Data is not valid
      return;
    }

    await SchemaEntity.create($form);
    dispatch('success', $form);
  }
</script>

<div>
  <div class="mb-3">
    <FormInput 
      bind:value={$value.name} 
      bind:control={$form.name}  
      placeholder="Schema name" 
    />
  </div>

  {#each $value.attributes as attr, i}
  <div class="mb-3">
    <h6>Attribut {i + 1}</h6>
    <div class="row">
      <div class="col">
        <FormSelect 
          bind:value={attr.type} 
          bind:control={$form.attributes[i].type}
          options={attributeTypes} 
        />
      </div>
      <div class="col">
        <FormInput 
          bind:value={attr.name} 
          bind:control={$form.attributes[i].name}
        />
      </div>
    </div>
  </div>
  {/each}

  <button class="btn btn-light" on:click={addAttribute}>Add field</button>
</div>