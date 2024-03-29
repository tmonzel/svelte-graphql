<script lang="ts">
  import { FormInput, FormSelect } from '$lib/forms/components'; 
	import { FormControl, Validators, createForm } from '$lib/forms';
	import { SchemaEntity, type Attribute, type SchemaInput } from '$lib/entities/schema';
	import { createEventDispatcher } from 'svelte';
	import FormCheckbox from '$lib/forms/components/FormCheckbox.svelte';

  export let submittable = true;
  export let dirty = false;
  export let input: SchemaInput | null = null;

  let editMode = false;

  type SchemaFormModel = {
    name: FormControl<string>;
    collectionName: FormControl<string>;
    description: FormControl<string>;
    attributes: { 
      name: FormControl<string>;
      label: FormControl<string>;
      type: FormControl<string>;
      required: FormControl<boolean>; 
    }[];
  }

  const { form, state, markAllAsTouched } = createForm<SchemaFormModel, SchemaInput>({
    name: new FormControl(input ? input.name : '', Validators.required()),
    collectionName: new FormControl(input ? input.collectionName : '', Validators.required()),
    description: new FormControl(input ? input.description : ''),
    attributes: []
  });
  

  function addAttribute(attr: Attribute) {
    $form.attributes = [
      ...$form.attributes, 
      { 
        name: new FormControl(attr.name, Validators.required()),
        label: new FormControl(attr.label, Validators.required()),
        type: new FormControl(attr.type, Validators.required()), 
        required: new FormControl(attr.required, Validators.required()) 
      }
    ];
  }

  function removeAttribute(index: number): void {
    $form.attributes = $form.attributes.filter((attr, i) => i !== index);
  }

  if(input && input.id) {
    editMode = true;
    
    // Add attributes
    for(const attr of input.attributes) {
      addAttribute(attr);
    }
  }

  $: submittable = $state.submittable;
  $: dirty = $state.dirty;

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
    <FormInput bind:control={$form.name} placeholder="Schema name" label="Name" />
  </div>

  <div class="mb-3">
    <FormInput 
      bind:control={$form.collectionName} 
      placeholder="Schema collection name" 
      label="Collection name" 
      disabled={editMode} 
      hint={editMode ? 'Collection names are fix after creation' : null}
    />
  </div>

  <div class="mb-3">
    <FormInput bind:control={$form.description} placeholder="Schema description" label="Description" />
  </div>

  <hr class="my-4">

  {#each $form.attributes as attr, i}
  <div class="mb-3">
    <h6>Attribut {i + 1}</h6>
    <div class="row">
      <div class="col" style="max-width: 200px;">
        <FormSelect bind:control={attr.type} options={attributeTypes} />
      </div>
      <div class="col">
        <FormInput bind:control={attr.name} class="mb-3" placeholder="Name" />
        <FormInput bind:control={attr.label} class="mb-3" placeholder="Label" />
        <FormCheckbox bind:control={attr.required} label="Required" />
      </div>
      <div class="col col-auto">
        <button class="btn p-0" on:click={() => removeAttribute(i)}>
					<span class="material-icons">delete</span>
				</button>
      </div>
    </div>
  </div>
  {/each}

  <button class="btn btn-light" on:click={() => addAttribute({ type: 'text', name: '', label: '', required: true })}>Add Attribute</button>
</div>