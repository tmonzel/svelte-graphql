<script lang="ts">
  import { FormInput, FormSelect } from '$lib/forms/components'; 
	import { FormControl, Validators, createForm } from '$lib/forms';
	import type { SchemaInput } from '$lib/entities/schema';

  export let submittable = true;
  export let value: Partial<SchemaInput> = {};

  type SchemaFormModel = {
    name: FormControl<string>;
    attributes: { 
      name: FormControl<string>; 
      type: FormControl<string>, 
      required: FormControl<string> 
    }[];
  }

  const { form, state, markAllAsTouched } = createForm<SchemaFormModel>({
    name: new FormControl(value.name ?? '', Validators.required()),
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

	export const submit = async() => {
		if(!$state.valid) {
			// Data is not valid
			markAllAsTouched();
			return;
		}

		//await SchemaEntity.create($form);
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
      <div class="col">
        <FormSelect bind:control={attr.type} options={attributeTypes} />
      </div>
      <div class="col">
        <FormInput bind:control={attr.name} />
      </div>
    </div>
  </div>
  {/each}

  <button class="btn btn-light" on:click={() => addAttribute()}>Add Attribute</button>
</div>