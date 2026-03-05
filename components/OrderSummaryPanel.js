'use client'

import { useCheckout } from '@/context/CheckoutContext'

export default function OrderSummaryPanel({ compact = false }) {
  const { cartItems, subtotal, shippingFee, discount, grandTotal } = useCheckout()

  return (
    <div className="bg-forest-950 text-cream-100 rounded-2xl p-5 space-y-4">
      <h3 className="font-display text-sm font-semibold text-cream-300 uppercase tracking-widest">
        Order Summary
      </h3>

      {/* Items list */}
      <div className="space-y-3">
        {cartItems.map(item => (
          <div key={item.product_id} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-forest-800 flex items-center justify-center text-lg shrink-0 overflow-hidden">
              <img
                src={item.image}
                alt={item.product_name}
                className="w-full h-full object-cover"
                onError={e => { e.target.style.display='none' }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-cream-200 leading-tight truncate font-body">
                {item.product_name}
              </p>
              <p className="text-xs text-forest-400 font-body mt-0.5">
                Qty: {item.quantity}
              </p>
            </div>
            <span className="text-sm font-medium text-cream-100 font-body shrink-0">
              ₹{(item.product_price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-forest-800 pt-3 space-y-2">
        <div className="flex justify-between text-xs font-body text-forest-400">
          <span>Subtotal</span>
          <span className="text-cream-300">₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs font-body text-forest-400">
          <span>Shipping</span>
          <span className="text-cream-300">
            {shippingFee === 0 ? 'Free' : `₹${shippingFee}`}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-xs font-body">
            <span className="text-terra-400">Discount</span>
            <span className="text-terra-400">−₹{discount}</span>
          </div>
        )}
        <div className="flex justify-between font-body font-semibold text-sm pt-1 border-t border-forest-800 mt-1">
          <span className="text-cream-200">Total</span>
          <span className="text-cream-50 text-base">₹{grandTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Eco badge */}
      <div className="flex items-center gap-2 pt-1">
        <div className="w-5 h-5 rounded-full bg-forest-600 flex items-center justify-center text-xs">🌿</div>
        <p className="text-xs text-forest-400 font-body leading-tight">
          This order saves ~2.3kg of plastic waste
        </p>
      </div>
    </div>
  )
}
