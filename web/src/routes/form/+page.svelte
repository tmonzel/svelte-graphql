<script lang="ts">
	import { writable } from 'svelte/store';

    interface FormField {
        label: string;
        name: string;
        value: unknown;
        valid: boolean;
        validator?: (v: any) => boolean
    }

    function createField(name: string, label: string, value: unknown, validator?: (v: any) => boolean): FormField {
        return {
            label,
            name,
            value,
            valid: true,
            validator
        }
    }

    const { set: _set, update, subscribe } = writable({
        name: 'Person',
        fields: [
            createField('test', 'TestLabel', 'ada', (v) => {
                return !(v === undefined || v === '')
            })
        ]
    });

    async function set(form: { name: string, fields: FormField[] }) {
        for(const f of form.fields) {
            if(f.validator) {
                f.valid = f.validator(f.value)
            }
        }
        
        _set(form);
    }

    const form = { set, update, subscribe };

    function addField() {
        $form.fields = [...$form.fields, createField('teaaaast', 'NewLabel', 'ada')];
    }

</script>

<div class="container">
    {#each $form.fields as field }
        <div class="mb-3">
            <label for="">{field.label}</label>
            <input 
                type="text" 
                class="form-control" 
                class:is-invalid={!field.valid}
                class:is-valid={field.valid}
                bind:value={field.value}
            >
        </div>
    {/each}

    <button class="btn btn-primary" on:click={addField}>Add Field</button>
</div>