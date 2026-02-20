import { writable } from 'svelte/store';

export type CartItem = { id: string; quantity: number };

const initialState: CartItem[] = [];

function createCartStore() {
	const { subscribe, set, update } = writable<CartItem[]>(initialState);

	return {
		subscribe,
		add: (id: string, quantity = 1) => {
			update((items) => {
				const existing = items.find((i) => i.id === id);
				if (existing) {
					return items.map((i) =>
						i.id === id ? { ...i, quantity: i.quantity + quantity } : i
					);
				}
				return [...items, { id, quantity }];
			});
		},
		remove: (id: string) => {
			update((items) => items.filter((i) => i.id !== id));
		},
		setQuantity: (id: string, quantity: number) => {
			if (quantity <= 0) {
				update((items) => items.filter((i) => i.id !== id));
				return;
			}
			update((items) =>
				items.map((i) => (i.id === id ? { ...i, quantity } : i))
			);
		},
		clear: () => set([])
	};
}

export const cart = createCartStore();
