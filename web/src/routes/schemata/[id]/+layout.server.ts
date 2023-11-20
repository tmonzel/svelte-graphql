import { SchemaEntity } from '$lib/entities/schema';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	const schema = await SchemaEntity.findById(params.id);

	if(schema) {
		return {
			schema
		};
	}

	throw error(404, 'Schema not found');
}