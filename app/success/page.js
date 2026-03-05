'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SuccessPage() {
  const [orderId, setOrderId] = useState('')
  const [showContent, setShowContent] = useState(false)
  const [confettiItems, setConfettiItems] = useState([])

  useEffect(() => {
    // Read orderId from URL on client only - avoids useSearchParams SSR issue
    const params = new URLSearchParams(window.location.search)
    const id = params.get('orderId') || 'ECO' + Math.floor(100000 + Math.random() * 900000)
    setOrderId(id)
    setConfettiItems(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
        color: ['#2e7d52','#c4622d','#8aab8e','#cc9558','#54a374'][Math.floor(Math.random() * 5)],
        size: 6 + Math.random() * 8,
      }))
    )
    setTimeout(() => setShowContent(true), 100)
  }, [])

  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 4)
  const formattedDate = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long'
  })

  return (
    <div className="min-h-screen bg-cream-50 relative overflow-hidden flex flex-col">
      {confettiItems.map(item => (
        <div key={item.id} className="fixed pointer-events-none"
          style={{
            left: `${item.left}%`, top: '-20px',
            width: item.size, height: item.size,
            backgroundColor: item.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animation: `confettiFall ${item.duration}s ${item.delay}s ease-in forwards`,
          }}
        />
      ))}

      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes circleGrow {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes checkDraw {
          0% { stroke-dashoffset: 50; }
          100% { stroke-dashoffset: 0; }
        }
        .success-circle { animation: circleGrow 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .check-draw { stroke-dasharray: 50; stroke-dashoffset: 50; animation: checkDraw 0.5s 0.5s ease forwards; }
      `}</style>

      <header className="border-b border-cream-200 bg-cream-50/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-forest-700 flex items-center justify-center text-cream-100 text-sm font-display font-bold">E</div>
          <span className="font-display font-semibold text-forest-800 text-lg">ecoyaan</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className={`max-w-md w-full text-center transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-forest-100 success-circle flex items-center justify-center">
                <svg className="w-12 h-12 text-forest-600" viewBox="0 0 24 24" fill="none">
                  <polyline className="check-draw" points="5,12 10,17 19,7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-forest-200 animate-ping opacity-30" />
            </div>
          </div>

          <h1 className="font-display text-3xl font-bold text-forest-900 mb-2">Order Confirmed! 🌿</h1>
          <p className="text-forest-500 font-body text-base mb-6">Thank you for choosing a greener planet.</p>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-200 text-left space-y-4 mb-6">
            <div className="flex items-center justify-between pb-3 border-b border-cream-100">
              <div>
                <p className="text-xs text-forest-400 font-body uppercase tracking-widest">Order ID</p>
                <p className="font-display font-bold text-forest-800 text-lg mt-0.5">#{orderId}</p>
              </div>
              <div className="px-3 py-1.5 bg-forest-100 rounded-full">
                <span className="text-xs font-body font-semibold text-forest-700">Confirmed ✓</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm font-body">
              <div>
                <p className="text-xs text-forest-400 uppercase tracking-wide mb-1">Estimated Delivery</p>
                <p className="text-forest-800 font-medium">{formattedDate}</p>
              </div>
              <div>
                <p className="text-xs text-forest-400 uppercase tracking-wide mb-1">Shipping</p>
                <p className="text-forest-800 font-medium">Standard (3–5 days)</p>
              </div>
            </div>
            <div className="p-3 bg-forest-50 rounded-xl border border-forest-100">
              <p className="text-xs text-forest-600 font-body">📧 A confirmation email will be sent with your tracking details.</p>
            </div>
          </div>

          <div className="bg-forest-950 rounded-2xl p-5 text-left mb-6">
            <h3 className="font-display text-cream-100 font-semibold mb-3">Your Impact</h3>
            <div className="grid grid-cols-3 gap-3">
              {[{ icon:'🌳', value:'1', label:'Tree Planted' }, { icon:'♻️', value:'2.3kg', label:'Plastic Saved' }, { icon:'💨', value:'0.4kg', label:'CO₂ Offset' }].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <p className="font-display font-bold text-cream-100 text-sm">{stat.value}</p>
                  <p className="text-xs text-forest-400 font-body leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="btn-eco flex-1 py-3.5 bg-forest-700 hover:bg-forest-600 text-white rounded-xl font-body font-semibold text-sm transition-all shadow-md flex items-center justify-center">
              Continue Shopping
            </Link>
            <button onClick={() => window.print()} className="flex-1 py-3.5 border border-cream-300 hover:border-forest-300 text-forest-700 rounded-xl font-body font-semibold text-sm transition-colors flex items-center justify-center gap-2">
              Print Receipt
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
