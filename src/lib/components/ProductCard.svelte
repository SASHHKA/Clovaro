<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import type { Product } from '$lib/types/product';

	const { product }: { product: Product } = $props();
</script>

<div
	class="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
>
	<div class="aspect-square overflow-hidden bg-slate-50">
		<img
			src={product.image}
			alt={product.name}
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
		/>
	</div>
	<div class="flex flex-1 flex-col gap-3 p-5">
		<div class="flex items-center justify-between">
			<span
				class="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-blue-600"
			>
				{product.category}
			</span>
		</div>
		<h3 class="text-base font-semibold text-slate-800">{product.name}</h3>
		<p class="flex-1 text-sm leading-relaxed text-slate-400">{product.description}</p>
		<div class="mt-1 flex items-center justify-between border-t border-slate-100 pt-4">
			<span class="text-xl font-bold text-slate-800">${product.price.toFixed(2)}</span>
			<button
				class="rounded-xl bg-linear-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/30"
				onclick={() => cart.add(product.id)}
			>
				Add to Cart
			</button>
		</div>
	</div>
</div>
