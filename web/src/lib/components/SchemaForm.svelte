<script lang="ts">
  import { FormInput, FormSelect } from '$lib/forms/components'; 
	import { FormControl, Validators, createForm } from '$lib/forms';
	import { SchemaEntity, type SchemaInput } from '$lib/entities/schema';
	import { createEventDispatcher } from 'svelte';

  export let submittable = true;
  export let input: SchemaInput | null = null;

  type SchemaFormModel = {
    name: FormControl<string>;
    attributes: { 
      name: FormControl<string>; 
      type: FormControl<string>, 
      required: FormControl<string> 
    }[];
  }

  const { form, state, markAllAsTouched } = createForm<SchemaFormModel, SchemaInput>({
    name: new FormControl(input ? input.name : '', Validators.required()),
    attributes: []
  });
  

  function addAttribute(defaults = { type: 'text', name: '', required: true }) {
    $form.attributes = [
      ...$form.attributes, 
      { 
        name: new FormControl(defaults.name, Validators.required()), 
        type: new FormControl(defaults.type, Validators.required()), 
        required: new FormControl(defaults.required, Validators.required()) 
      }
    ];
  }

  function removeAttribute(index: number): void {
    $form.attributes = $form.attributes.filter((attr, i) => i !== index);
  }

  if(input) {
    // Add attributes
    for(const attr of input.attributes) {
      addAttribute(attr);
    }
  }

  $: submittable = $state.submittable;

  const attributeTypes = [
    {
      name: 'Text',
      value: 'text'
    },
    {
      name: 'Number',
      value: 'number'
    }
  ];

  const dispatch = createEventDispatcher();

	export const submit = async() => {
		if(!$state.valid) {
			// Data is not valid
			markAllAsTouched();
			return;
		}

    if(input && input.id) {
      // Update existing schema
      await SchemaEntity.update(input.id, $state.value);
    } else {
      // Create new schema
      await SchemaEntity.create($state.value);
    }

    dispatch('success', $state.value);
	};
</script>

<div>
  <div class="mb-3">
    <FormInput bind:control={$form.name} placeholder="Schema name" />
  </div>

  {#each $form.attributes as attr, i}
  <div class="mb-3">
    <h6>Attribut {i + 1}</h6>
    <div class="row">
      <div class="col-md-3">
        <FormSelect bind:control={attr.type} options={attributeTypes} />
      </div>
      <div class="col">
        <FormInput bind:control={attr.name} />
      </div>
      <div class="col col-auto">
        <button class="btn p-0" on:click={() => removeAttribute(i)}>
					<span class="material-icons">delete</span>
				</button>
      </div>
    </div>
  </div>
  {/each}

  <button class="btn btn-light" on:click={() => addAttribute()}>Add Attribute</button>
</div>