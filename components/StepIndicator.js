'use client'

const STEPS = [
  { id: 1, label: 'Cart', icon: '🛒' },
  { id: 2, label: 'Shipping', icon: '📦' },
  { id: 3, label: 'Payment', icon: '💳' },
]

export default function StepIndicator({ currentStep }) {
  return (
    <div className="w-full max-w-sm mx-auto mb-8 px-4">
      <div className="flex items-start justify-between">
        {STEPS.map((step, index) => {
          const isCompleted = currentStep > step.id
          const isActive = currentStep === step.id
          const isLast = index === STEPS.length - 1

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step circle + label */}
              <div className="flex flex-col items-center gap-1.5 min-w-[56px]">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-body font-medium transition-all duration-300
                    ${isCompleted
                      ? 'bg-forest-600 text-white shadow-md shadow-forest-200'
                      : isActive
                      ? 'bg-forest-700 text-white ring-4 ring-forest-100 shadow-lg shadow-forest-200'
                      : 'bg-cream-200 text-forest-400 border border-cream-300'
                    }`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <span
                  className={`text-xs font-body font-medium whitespace-nowrap transition-colors
                    ${isActive ? 'text-forest-700' : isCompleted ? 'text-forest-500' : 'text-forest-300'}`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div className="flex-1 h-0.5 mx-1 mb-5 transition-colors duration-500"
                  style={{
                    background: isCompleted
                      ? 'linear-gradient(to right, #2e7d52, #54a374)'
                      : '#e8cfaa'
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
