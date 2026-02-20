<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import favicon from '$lib/assets/favicon.svg';
	import './layout.css';

	const { children } = $props();
</script>

<svelte:head>
	<title>Clovaro</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<header class="fixed top-0 right-0 left-0 z-50 px-4 pt-4">
		<nav
			class="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-6 py-3 shadow-lg shadow-blue-500/5 backdrop-blur-xl"
		>
			<a href="/" class="flex items-center gap-2.5">
				<div
					class="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-blue-600 text-sm font-bold text-white shadow-md shadow-blue-500/30"
				>
					C
				</div>
				<span class="text-lg font-bold tracking-tight text-slate-800">Clovaro</span>
			</a>

			<div class="flex items-center gap-6">
				<a
					href="/"
					class="text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
				>
					Catalogue
				</a>
				<a
					href="/cart"
					class="rounded-xl bg-linear-to-r from-blue-500 to-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/30"
				>
					Cart ({$cart.reduce((sum, i) => sum + i.quantity, 0)})
				</a>
			</div>
		</nav>
	</header>

	<main class="mx-auto w-full max-w-6xl flex-1 px-4 pt-28 pb-16">
		{@render children()}
	</main>

	<footer class="border-t border-slate-200/60 py-8">
		<div class="mx-auto max-w-6xl px-4">
			<div class="flex flex-col items-center justify-center gap-4 text-center text-sm text-slate-400">
				<p>&copy; 2026 Clovaro. Built with care.</p>
				<nav class="flex flex-wrap items-center justify-center gap-4">
					<a
						href="/privacy-policy"
						class="transition-colors hover:text-blue-600"
					>
						Privacy Policy
					</a>
					<span class="text-slate-300">•</span>
					<a
						href="/terms"
						class="transition-colors hover:text-blue-600"
					>
						Terms & Conditions
					</a>
					<span class="text-slate-300">•</span>
					<a
						href="/refund-policy"
						class="transition-colors hover:text-blue-600"
					>
						Refund Policy
					</a>
				</nav>
			</div>
		</div>
	</footer>
</div>
