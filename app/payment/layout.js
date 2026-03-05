import { CheckoutProvider } from '@/context/CheckoutContext'
import Header from '@/components/Header'

async function getCartData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  try {
    const res = await fetch(`${baseUrl}/api/cart`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed')
    return await res.json()
  } catch {
    return {
      cartItems: [
        { product_id: 101, product_name: 'Bamboo Toothbrush (Pack of 4)', product_price: 299, quantity: 2, image: 'https://placehold.co/150x150/dceee1/1a4f34?text=🪥', eco_badge: 'Plastic-Free' },
        { product_id: 102, product_name: 'Reusable Cotton Produce Bags', product_price: 450, quantity: 1, image: 'https://placehold.co/150x150/f2e4c8/8a4a22?text=🛍', eco_badge: 'Zero Waste' },
      ],
      shipping_fee: 50,
      discount_applied: 0,
    }
  }
}

export default async function PaymentLayout({ children }) {
  const cartData = await getCartData()
  return (
    <CheckoutProvider initialCartData={cartData}>
      <Header />
      {children}
    </CheckoutProvider>
  )
}
