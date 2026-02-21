import { env } from '$env/dynamic/private';
import { products } from '$lib/data/products';
import Stripe from 'stripe';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, url }) => {
	const secretKey = env.STRIPE_SECRET_KEY;
	if (!secretKey) {
		return new Response(
			JSON.stringify({
				message: 'Stripe is not configured. Add STRIPE_SECRET_KEY to .env'
			}),
			{ status: 503, headers: { 'Content-Type': 'application/json' } }
		);
	}

	const stripe = new Stripe(secretKey);

	const body = await request.json();
	const items = Array.isArray(body.items) ? body.items : (body as { id: string; quantity: number }[]);
	const delivery = body.delivery as
		| { name: string; surname: string; address: string; country: string; phone: string }
		| undefined;

	if (!Array.isArray(items) || items.length === 0) {
		return new Response(
			JSON.stringify({ message: 'Cart is empty' }),
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		);
	}

	const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

	for (const item of items) {
		const product = products.find((p) => p.id === item.id);
		if (!product) {
			return new Response(
				JSON.stringify({ message: 'Product not found' }),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}
		line_items.push({
			price_data: {
				currency: 'usd',
				product_data: {
					name: product.name,
					description: product.description,
					images: [product.image]
				},
				unit_amount: Math.round(product.price * 100)
			},
			quantity: item.quantity
		});
	}

	const origin = url.origin;

	const metadata: Record<string, string> = {};
	if (delivery?.name) metadata.delivery_name = delivery.name;
	if (delivery?.surname) metadata.delivery_surname = delivery.surname;
	if (delivery?.address) metadata.delivery_address = delivery.address;
	if (delivery?.country) metadata.delivery_country = delivery.country;
	if (delivery?.phone) metadata.delivery_phone = delivery.phone;

	const session = await stripe.checkout.sessions.create({
		mode: 'payment',
		line_items,
		success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${origin}/checkout/cancel`,
		metadata
	});

	return new Response(
		JSON.stringify({ url: session.url }),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	);
};
