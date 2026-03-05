'use client'

import dynamic from 'next/dynamic'

const SuccessContent = dynamic(() => import('./SuccessContent'), { ssr: false })

export default function SuccessPage() {
  return <SuccessContent />
}
