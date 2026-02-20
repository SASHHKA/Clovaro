import { products } from '$lib/data/products';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return { products };
};
