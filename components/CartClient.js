'use client'

import { useRouter } from 'next/navigation'
import { useCheckout } from '@/context/CheckoutContext'
import StepIndicator from './StepIndicator'

export default function CartClient() {
  const router = useRouter()
  const { cartItems, updateQuantity, removeItem, subtotal, shippingFee, discount, grandTotal } = useCheckout()

  const handleProceed = () => {
    if (cartItems.length > 0) {
      router.push('/checkout')
    }
  }

  return (
    <main className="min-h-screen bg-cream-50 relative z-10">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <StepIndicator currentStep={1} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-baseline justify-between mb-2">
              <h1 className="font-display text-2xl font-bold text-forest-900">
                Your Cart
              </h1>
              <span className="text-sm text-forest-500 font-body">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🌿</div>
                <p className="font-display text-xl text-forest-400">Your cart is empty</p>
                <p className="text-sm text-forest-300 font-body mt-1">Add some eco-friendly products!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item, i) => (
                  <div
                    key={item.product_id}
                    className={`bg-white rounded-2xl p-4 flex items-start gap-4 shadow-sm border border-cream-200 card-lift animate-fade-up stagger-${i + 1}`}
                    style={{ opacity: 0 }}
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 product-img-placeholder">
                      <img
                        src={item.image}
                        alt={item.product_name}
                        className="w-full h-full object-cover"
                        onError={e => {
                          e.target.parentElement.classList.add('flex', 'items-center', 'justify-center')
                          e.target.style.display = 'none'
                          e.target.parentElement.innerHTML = '<span class="text-2xl">🌿</span>'
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-body font-medium text-forest-900 text-sm leading-tight">
                            {item.product_name}
                          </p>
                          {item.description && (
                            <p className="text-xs text-forest-400 font-body mt-0.5">{item.description}</p>
                          )}
                          {item.eco_badge && (
                            <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-forest-50 border border-forest-200 rounded-full text-xs text-forest-600 font-body font-medium">
                              🌿 {item.eco_badge}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.product_id)}
                          className="text-forest-300 hover:text-terra-500 transition-colors shrink-0 p-1 -mt-1 -mr-1 rounded-lg hover:bg-terra-50"
                          aria-label="Remove item"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-cream-100 rounded-xl p-1">
                          <button
                            onClick={() => updateQuantity(item.product_id, -1)}
                            className="w-7 h-7 rounded-lg bg-white text-forest-700 hover:bg-forest-600 hover:text-white transition-all font-body font-medium text-sm shadow-sm flex items-center justify-center"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-medium font-body text-forest-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product_id, 1)}
                            className="w-7 h-7 rounded-lg bg-white text-forest-700 hover:bg-forest-600 hover:text-white transition-all font-body font-medium text-sm shadow-sm flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <p className="font-display font-bold text-forest-800 text-base">
                          ₹{(item.product_price * item.quantity).toLocaleString()}
                          <span className="text-xs text-forest-400 font-body font-normal ml-1">
                            (₹{item.product_price} ea.)
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Eco Impact Note */}
            <div className="mt-4 p-4 bg-forest-50 border border-forest-100 rounded-2xl flex gap-3 items-start animate-fade-up stagger-4" style={{ opacity: 0 }}>
              <span className="text-xl shrink-0">🌍</span>
              <div>
                <p className="text-sm font-body font-medium text-forest-700">You're making a difference!</p>
                <p className="text-xs text-forest-500 font-body mt-0.5">
                  Every purchase plants a tree through our reforestation partners in Karnataka.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2 animate-fade-up stagger-3" style={{ opacity: 0 }}>
            <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm sticky top-24 space-y-4">
              <h2 className="font-display font-bold text-forest-900 text-lg">Order Summary</h2>

              <div className="space-y-2.5">
                <div className="flex justify-between text-sm font-body text-forest-600">
                  <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-medium text-forest-800">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-body text-forest-600">
                  <span>Shipping</span>
                  <span className="font-medium text-forest-800">
                    {shippingFee === 0 ? (
                      <span className="text-forest-500">Free</span>
                    ) : `₹${shippingFee}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-terra-500">Discount Applied</span>
                    <span className="font-medium text-terra-500">−₹{discount}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-cream-200 pt-3 flex justify-between items-baseline">
                <span className="font-display font-bold text-forest-900 text-base">Grand Total</span>
                <span className="font-display font-bold text-forest-800 text-xl">₹{grandTotal.toLocaleString()}</span>
              </div>

              {/* Coupon hint */}
              <div className="flex items-center gap-2 p-3 bg-cream-50 border border-dashed border-cream-300 rounded-xl">
                <svg className="w-4 h-4 text-terra-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-xs text-forest-500 font-body">Use code <strong className="text-forest-700">ECO10</strong> for 10% off</span>
              </div>

              <button
                onClick={handleProceed}
                disabled={cartItems.length === 0}
                className="btn-eco w-full py-3.5 bg-forest-700 hover:bg-forest-600 disabled:bg-forest-300 text-white rounded-xl font-body font-semibold text-sm transition-all duration-200 shadow-md shadow-forest-200 flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { icon: '🔒', label: 'Secure' },
                  { icon: '↩️', label: 'Easy Returns' },
                  { icon: '🌿', label: 'Eco Packed' },
                ].map(signal => (
                  <div key={signal.label} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-cream-50">
                    <span className="text-base">{signal.icon}</span>
                    <span className="text-xs text-forest-500 font-body text-center leading-tight">{signal.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
