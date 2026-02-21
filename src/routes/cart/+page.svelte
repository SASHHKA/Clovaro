<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import type { Product } from '$lib/types/product';

	const { data } = $props();

	type CartLine = { product: Product; quantity: number };

	const lines = $derived.by(() => {
		const items = $cart;
		return items
			.map((item) => {
				const product = data.products.find((p: Product) => p.id === item.id);
				return product ? { product, quantity: item.quantity } : null;
			})
			.filter((l): l is CartLine => l !== null);
	});

	const total = $derived(
		lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0)
	);

	let checkingOut = $state(false);
	let error = $state<string | null>(null);

	let delivery = $state({
		name: '',
		surname: '',
		address: '',
		country: '',
		phone: ''
	});

	const deliveryValid = $derived(
		delivery.name.trim() !== '' &&
			delivery.surname.trim() !== '' &&
			delivery.address.trim() !== '' &&
			delivery.country.trim() !== '' &&
			delivery.phone.trim() !== ''
	);

	const handleCheckout = async () => {
		if (lines.length === 0 || !deliveryValid) return;
		checkingOut = true;
		error = null;
		try {
			const res = await fetch('/api/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					items: lines.map((l) => ({ id: l.product.id, quantity: l.quantity })),
					delivery: {
						name: delivery.name.trim(),
						surname: delivery.surname.trim(),
						address: delivery.address.trim(),
						country: delivery.country.trim(),
						phone: delivery.phone.trim()
					}
				})
			});
			const json = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(json.message ?? 'Checkout failed');
			if (json.url) window.location.href = json.url;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Checkout failed';
		} finally {
			checkingOut = false;
		}
	};
</script>

<div class="flex flex-col gap-8">
	<h1 class="text-3xl font-bold text-slate-800">Your cart</h1>

	{#if lines.length === 0}
		<p class="text-slate-500">Your cart is empty.</p>
		<a
			href="/"
			class="text-blue-600 underline hover:no-underline"
		>
			Continue shopping
		</a>
	{:else}
		<ul class="flex flex-col gap-4">
			{#each lines as line (line.product.id)}
				<li
					class="flex items-center gap-6 rounded-2xl border border-slate-200/60 bg-white p-4 shadow-sm"
				>
					<img
						src={line.product.image}
						alt={line.product.name}
						class="h-24 w-24 rounded-xl object-cover"
					/>
					<div class="min-w-0 flex-1">
						<h2 class="font-semibold text-slate-800">{line.product.name}</h2>
						<p class="text-sm text-slate-500">
							${line.product.price.toFixed(2)} × {line.quantity}
						</p>
					</div>
					<div class="flex items-center gap-2">
						<button
							class="rounded-lg border border-slate-200 px-2 py-1 text-sm hover:bg-slate-50"
							onclick={() =>
								cart.setQuantity(
									line.product.id,
									Math.max(0, line.quantity - 1)
								)}
						>
							−
						</button>
						<span class="w-8 text-center text-sm">{line.quantity}</span>
						<button
							class="rounded-lg border border-slate-200 px-2 py-1 text-sm hover:bg-slate-50"
							onclick={() => cart.setQuantity(line.product.id, line.quantity + 1)}
						>
							+
						</button>
					</div>
					<p class="text-right font-semibold text-slate-800">
						${(line.product.price * line.quantity).toFixed(2)}
					</p>
					<button
						class="rounded-lg px-2 py-1 text-sm text-red-600 hover:bg-red-50"
						onclick={() => cart.remove(line.product.id)}
					>
						Remove
					</button>
				</li>
			{/each}
		</ul>

		<section class="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
			<h2 class="mb-4 text-lg font-semibold text-slate-800">Delivery details</h2>
			<p class="mb-4 text-sm text-slate-500">
				Fill in your shipping information before payment.
			</p>
			<form class="grid gap-4 sm:grid-cols-2" onsubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
				<div>
					<label for="delivery-name" class="mb-1 block text-sm font-medium text-slate-700">Name</label>
					<input
						id="delivery-name"
						type="text"
						bind:value={delivery.name}
						required
						autocomplete="given-name"
						class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
						placeholder="First name"
					/>
				</div>
				<div>
					<label for="delivery-surname" class="mb-1 block text-sm font-medium text-slate-700">Surname</label>
					<input
						id="delivery-surname"
						type="text"
						bind:value={delivery.surname}
						required
						autocomplete="family-name"
						class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
						placeholder="Last name"
					/>
				</div>
				<div class="sm:col-span-2">
					<label for="delivery-address" class="mb-1 block text-sm font-medium text-slate-700">Address</label>
					<input
						id="delivery-address"
						type="text"
						bind:value={delivery.address}
						required
						autocomplete="street-address"
						class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
						placeholder="Street address, city, postcode"
					/>
				</div>
				<div>
					<label for="delivery-country" class="mb-1 block text-sm font-medium text-slate-700">Country</label>
					<input
						id="delivery-country"
						type="text"
						bind:value={delivery.country}
						required
						autocomplete="country-name"
						class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
						placeholder="Country"
					/>
				</div>
				<div>
					<label for="delivery-phone" class="mb-1 block text-sm font-medium text-slate-700">Phone number</label>
					<input
						id="delivery-phone"
						type="tel"
						bind:value={delivery.phone}
						required
						autocomplete="tel"
						class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
						placeholder="+1 234 567 8900"
					/>
				</div>
			</form>
		</section>

		{#if error}
			<p class="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
		{/if}

		<div class="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
			<p class="text-xl font-bold text-slate-800">
				Total: ${total.toFixed(2)}
			</p>
			<button
				type="button"
				class="rounded-xl bg-linear-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 disabled:opacity-60"
				disabled={checkingOut || !deliveryValid}
				onclick={handleCheckout}
			>
				{checkingOut ? 'Redirecting…' : 'Proceed to payment'}
			</button>
		</div>
		{#if !deliveryValid && lines.length > 0}
			<p class="text-sm text-slate-500">Please fill in all delivery fields to proceed to payment.</p>
		{/if}
	{/if}
</div>
