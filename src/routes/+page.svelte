<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';

	const { data } = $props();

	const ALL = 'All';
	let selectedCategory = $state(ALL);

	const filteredProducts = $derived(
		selectedCategory === ALL
			? data.products
			: data.products.filter((p) => p.category === selectedCategory)
	);
</script>

<div class="flex flex-col gap-12">
	<section class="flex flex-col gap-3">
		<h1 class="text-4xl font-extrabold tracking-tight text-slate-800">
			Discover our <span class="bg-linear-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">collection</span>
		</h1>
		<p class="max-w-lg text-lg text-slate-400">
			Curated products for every style. Find something you love.
		</p>
	</section>

	<section class="flex flex-wrap items-center gap-2">
		<button
			class="rounded-full px-4 py-2 text-sm font-medium transition-all {selectedCategory === ALL
				? 'bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/25'
				: 'border border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:text-blue-600'}"
			onclick={() => (selectedCategory = ALL)}
		>
			All
		</button>
		{#each data.categories as category}
			<button
				class="rounded-full px-4 py-2 text-sm font-medium transition-all {selectedCategory ===
				category
					? 'bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/25'
					: 'border border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:text-blue-600'}"
				onclick={() => (selectedCategory = category)}
			>
				{category}
			</button>
		{/each}
	</section>

	<section class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each filteredProducts as product (product.id)}
			<ProductCard {product} />
		{/each}
	</section>

	{#if filteredProducts.length === 0}
		<p class="py-16 text-center text-slate-400">No products found in this category.</p>
	{/if}
</div>
