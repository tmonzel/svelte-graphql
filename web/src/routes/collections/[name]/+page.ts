import type { Collection } from '$lib/entities/collection';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }): { collection: Collection } => {
	return {
		collection: {
			name: params.name,
		},
	};
};