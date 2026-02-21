import type { Product } from '$lib/types/product';

export const products: Product[] = [
	{
		id: '1',
		name: 'Classic Cotton T-Shirt',
		description: 'Soft 100% cotton crew neck, relaxed fit. Unisex.',
		price: 24.99,
		image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
		category: 'Tops'
	},
	{
		id: '2',
		name: 'Oversized Hoodie',
		description: 'Heavyweight fleece hoodie with drawstring and kangaroo pocket.',
		price: 59.99,
		image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
		category: 'Tops'
	},
	{
		id: '3',
		name: 'Linen Button-Down Shirt',
		description: 'Breathable linen shirt, short sleeve, ideal for summer.',
		price: 49.99,
		image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
		category: 'Tops'
	},
	{
		id: '4',
		name: 'High-Waist Chino Trousers',
		description: 'Stretch chino pants, slim fit, versatile for casual or smart casual.',
		price: 69.99,
		image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop',
		category: 'Bottoms'
	},
	{
		id: '5',
		name: 'Denim Jacket',
		description: 'Mid-wash denim jacket with classic fit and metal buttons.',
		price: 79.99,
		image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
		category: 'Outerwear'
	},
	{
		id: '6',
		name: 'Wool Blend Coat',
		description: 'Warm wool blend overcoat, notch lapel, inner lining.',
		price: 189.99,
		image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop',
		category: 'Outerwear'
	},
	{
		id: '7',
		name: 'Midi A-Line Dress',
		description: 'Flowy A-line dress, midi length, perfect for day or evening.',
		price: 74.99,
		image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
		category: 'Dresses'
	},
	{
		id: '8',
		name: 'Ribbed Knit Sweater',
		description: 'Cozy ribbed knit sweater, crew neck, available in multiple colours.',
		price: 54.99,
		image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
		category: 'Tops'
	},
	{
		id: '9',
		name: 'Jogger Pants',
		description: 'Soft joggers with elastic waist and cuffed ankles.',
		price: 44.99,
		image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=400&fit=crop',
		category: 'Bottoms'
	},
	{
		id: '10',
		name: 'Leather Belt',
		description: 'Genuine leather belt with brushed metal buckle.',
		price: 34.99,
		image: 'https://images.unsplash.com/photo-1553704571-c32d20e6c74f?w=400&h=400&fit=crop',
		category: 'Accessories'
	},
	{
		id: '11',
		name: 'Canvas Sneakers',
		description: 'Low-top canvas sneakers, rubber sole, everyday comfort.',
		price: 64.99,
		image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
		category: 'Footwear'
	},
	{
		id: '12',
		name: 'Beanie',
		description: 'Acrylic knit beanie, one size, multiple colours.',
		price: 19.99,
		image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=400&fit=crop',
		category: 'Accessories'
	},
	{
		id: '13',
		name: 'Slim Fit Jeans',
		description: 'Classic mid-rise slim fit denim with a slight stretch.',
		price: 59.99,
		image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
		category: 'Bottoms'
	},
	{
		id: '14',
		name: 'Puffer Jacket',
		description: 'Lightweight quilted puffer jacket, ideal for chilly days.',
		price: 129.99,
		image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop',
		category: 'Outerwear'
	},
	{
		id: '15',
		name: 'Graphic T-Shirt',
		description: 'Soft cotton tee with a minimalist graphic print.',
		price: 29.99,
		image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop',
		category: 'Tops'
	},
	{
		id: '16',
		name: 'Basic Cotton Socks',
		description: 'Everyday ankle socks in soft cotton. Great value pack.',
		price: 5.0,
		image: 'https://images.unsplash.com/photo-1580894732930-99ac1a8f90f8?w=400&h=400&fit=crop',
		category: 'Accessories'
	}
];

export const categories = [...new Set(products.map((p) => p.category))];
