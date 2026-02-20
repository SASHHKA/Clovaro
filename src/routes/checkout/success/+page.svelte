<script lang="ts">
	import { cart } from '$lib/stores/cart';

	cart.clear();
</script>

<div class="flex flex-col items-center gap-6 py-16 text-center">
	<h1 class="text-3xl font-bold text-slate-800">Thank you for your order</h1>
	<p class="max-w-md text-slate-500">
		Payment was successful. You will receive a confirmation email shortly.
	</p>
	<a
		href="/"
		class="rounded-xl bg-linear-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25"
	>
		Continue shopping
	</a>
</div>
