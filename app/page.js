// app/page.js — Server Component
// Uses Next.js App Router Server Component for SSR data fetching

import { CheckoutProvider } from '@/context/CheckoutContext'
import CartClient from '@/components/CartClient'
import Header from '@/components/Header'

// SSR: This runs on the server for every request (equivalent to getServerSideProps)
async function getCartData() {
  // In production this would be an external API
  // We fetch from our own mock API route
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  try {
    const res = await fetch(`${baseUrl}/api/cart`, {
      cache: 'no-store', // Ensures SSR (no caching) — like getServerSideProps
    })
    if (!res.ok) throw new Error('Failed to fetch cart')
    return await res.json()
  } catch {
    // Fallback data if fetch fails (e.g., during build)
    return {
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
  }
}

export default async function CartPage() {
  // Data is fetched on the server — no loading state needed on initial render
  const cartData = await getCartData()

  return (
    <CheckoutProvider initialCartData={cartData}>
      <Header />
      <CartClient />
    </CheckoutProvider>
  )
}
