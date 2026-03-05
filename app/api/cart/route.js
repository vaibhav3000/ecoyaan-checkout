export async function GET() {
  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 80))

  const cartData = {
    cartItems: [
      {
        product_id: 101,
        product_name: 'Bamboo Toothbrush (Pack of 4)',
        product_price: 299,
        quantity: 2,
        image: 'https://placehold.co/150x150/dceee1/1a4f34?text=🪥',
        description: 'Biodegradable handles, BPA-free bristles',
        eco_badge: 'Plastic-Free',
      },
      {
        product_id: 102,
        product_name: 'Reusable Cotton Produce Bags',
        product_price: 450,
        quantity: 1,
        image: 'https://placehold.co/150x150/f2e4c8/8a4a22?text=🛍',
        description: 'Set of 5 organic cotton mesh bags',
        eco_badge: 'Zero Waste',
      },
    ],
    shipping_fee: 50,
    discount_applied: 0,
  }

  return Response.json(cartData)
}
