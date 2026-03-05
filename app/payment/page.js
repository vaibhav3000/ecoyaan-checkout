'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCheckout } from '@/context/CheckoutContext'
import StepIndicator from '@/components/StepIndicator'
import OrderSummaryPanel from '@/components/OrderSummaryPanel'

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: '📱', desc: 'Pay via UPI apps like GPay, PhonePe' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', icon: '🏦', desc: 'All major banks supported' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when your order arrives' },
]

export default function PaymentPage() {
  const router = useRouter()
  const { address, cartItems, paymentMethod, setPaymentMethod, placeOrder, grandTotal } = useCheckout()
  const [isProcessing, setIsProcessing] = useState(false)

  // Redirect if cart/address not filled
  if (cartItems.length === 0) {
    router.push('/')
    return null
  }

  const hasAddress = address.fullName && address.email && address.city

  const handlePay = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 2000))
    const orderId = placeOrder()
    router.push(`/success?orderId=${orderId}`)
  }

  return (
    <main className="min-h-screen bg-cream-50 relative z-10">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <StepIndicator currentStep={3} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-5">
            {/* Shipping address review */}
            <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm animate-fade-up" style={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-forest-900 text-lg">Delivering to</h2>
                <button
                  onClick={() => router.push('/checkout')}
                  className="text-xs text-forest-500 hover:text-forest-700 font-body font-medium underline underline-offset-2 transition-colors"
                >
                  Edit
                </button>
              </div>

              {hasAddress ? (
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-forest-100 flex items-center justify-center shrink-0">
                    <span className="text-base">📍</span>
                  </div>
                  <div className="text-sm font-body text-forest-700 space-y-0.5">
                    <p className="font-semibold text-forest-900">{address.fullName}</p>
                    <p>{address.email} · {address.phone}</p>
                    <p className="text-forest-500">
                      {address.city}{address.state && `, ${address.state}`} – {address.pinCode}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 bg-terra-50 border border-terra-200 rounded-xl">
                  <span className="text-terra-500 text-sm">⚠️</span>
                  <p className="text-xs font-body text-terra-600">
                    No shipping address found.{' '}
                    <button onClick={() => router.push('/checkout')} className="underline font-semibold">
                      Add address
                    </button>
                  </p>
                </div>
              )}
            </div>

            {/* Order items review */}
            <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm animate-fade-up stagger-2" style={{ opacity: 0 }}>
              <h2 className="font-display font-bold text-forest-900 text-lg mb-4">Order Review</h2>
              <div className="space-y-3">
                {cartItems.map(item => (
                  <div key={item.product_id} className="flex items-center gap-3 py-2 border-b border-cream-100 last:border-0">
                    <div className="w-12 h-12 rounded-xl overflow-hidden product-img-placeholder shrink-0">
                      <img src={item.image} alt={item.product_name} className="w-full h-full object-cover"
                        onError={e => { e.target.style.display='none' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body font-medium text-forest-900 truncate">{item.product_name}</p>
                      <p className="text-xs font-body text-forest-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-display font-bold text-forest-800 shrink-0">
                      ₹{(item.product_price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment method selection */}
            <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm animate-fade-up stagger-3" style={{ opacity: 0 }}>
              <h2 className="font-display font-bold text-forest-900 text-lg mb-4">Payment Method</h2>
              <div className="space-y-2.5">
                {PAYMENT_METHODS.map(method => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left
                      ${paymentMethod === method.id
                        ? 'border-forest-500 bg-forest-50'
                        : 'border-cream-200 hover:border-forest-200 bg-cream-50'
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0
                      ${paymentMethod === method.id ? 'bg-forest-100' : 'bg-cream-100'}`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-body font-semibold ${paymentMethod === method.id ? 'text-forest-800' : 'text-forest-700'}`}>
                        {method.label}
                      </p>
                      <p className="text-xs text-forest-400 font-body mt-0.5">{method.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                      ${paymentMethod === method.id ? 'border-forest-500 bg-forest-500' : 'border-cream-300'}`}>
                      {paymentMethod === method.id && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Security note */}
              <div className="mt-4 flex items-center gap-2 text-xs text-forest-400 font-body">
                <svg className="w-4 h-4 text-forest-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>All payments are 256-bit SSL encrypted and PCI-DSS compliant</span>
              </div>

              {/* Pay button */}
              <button
                onClick={handlePay}
                disabled={isProcessing || !hasAddress}
                className="btn-eco w-full mt-5 py-4 bg-terra-500 hover:bg-terra-600 disabled:bg-terra-300 text-white rounded-xl font-body font-bold text-base transition-all shadow-lg shadow-terra-200 flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Pay Securely · ₹{grandTotal.toLocaleString()}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-2 animate-fade-up stagger-2" style={{ opacity: 0 }}>
            <div className="sticky top-24 space-y-4">
              <OrderSummaryPanel />

              {/* Back button */}
              <button
                onClick={() => router.push('/checkout')}
                className="w-full py-3 rounded-xl border border-cream-300 text-forest-600 hover:border-forest-300 font-body text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Back to Shipping
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
