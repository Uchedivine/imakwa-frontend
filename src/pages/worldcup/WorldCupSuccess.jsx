import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useWorldCupOrder } from '../../hooks/useWorldCupOrder'
import WorldCupNavbar from '../../components/layout/WorldCupNavbar'
import Spinner from '../../components/ui/Spinner'

export default function WorldCupSuccess() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  // Sourced from Stripe state redirect or Paystack query parameter
  const paystackRef = searchParams.get('reference') || searchParams.get('trxref')
  const { orderId, email: stateEmail } = location.state ?? {}

  // Run the polling status query
  const { data: order, isError } = useWorldCupOrder({
    orderId: orderId ?? null,
    reference: paystackRef ?? null,
  })

  const orderRef = order?.reference || paystackRef || 'WC-PENDING'
  const displayEmail = order?.email || stateEmail || 'your email'

  // Polling count & timeout manager
  const [pollCount, setPollCount] = useState(0)
  const timedOut = pollCount >= 12 // 12 polls * 3s = ~36 seconds

  useEffect(() => {
    if (order && order.payment_status !== 'paid') {
      const timer = setTimeout(() => {
        setPollCount((c) => c + 1)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [order, pollCount])

  // Check paid status
  const isPaid = order?.payment_status === 'paid'

  return (
    <div
      className="min-h-screen relative flex flex-col overflow-hidden text-white"
      style={{
        background: 'radial-gradient(circle at center, #124E31 0%, #051A0F 100%)'
      }}
    >
      {/* Mesh Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 L40 0 M0 0 L40 40' fill='none' stroke='rgba(197,166,101,0.07)' stroke-width='0.75'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#03130A_100%)] opacity-70 pointer-events-none z-0" />

      <WorldCupNavbar />

      <div className="flex-1 relative z-10 flex items-center justify-center p-6">
        <div className="bg-[#0A2215]/60 border border-[#1A3C2A] rounded-2xl shadow-2xl max-w-lg w-full p-8 md:p-10 backdrop-blur-md text-center">
          
          {isPaid ? (
            /* ── STATE 1: PAID SUCCESS SCREEN ── */
            <div className="space-y-6">
              {/* Success Badge */}
              <div className="w-16 h-16 bg-[#C5A665]/10 border border-[#C5A665]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="font-serif text-3xl text-white">
                Your collection is on its way.
              </h2>
              <p className="text-[13.5px] text-[#7A9E8A] leading-relaxed">
                A download link has been successfully generated and sent to <br />
                <strong className="text-white font-semibold">{displayEmail}</strong>
              </p>

              {/* What to expect card */}
              <div className="bg-[#0D2A1C] border border-[#1A3C2A] rounded-xl p-5 text-left text-[12.5px] text-[#7A9E8A] space-y-2.5">
                <p className="font-bold text-[#D4AC52] uppercase tracking-wider text-[9px]">
                  What to expect next
                </p>
                <ul className="list-disc pl-4 space-y-1.5 leading-relaxed">
                  <li>Your download email should arrive in under 60 seconds.</li>
                  <li>Please check your spam/junk folder if not received.</li>
                  <li>The link is active for 30 days and valid for a single redemption.</li>
                </ul>
              </div>

              <div className="pt-4 flex flex-col gap-4 items-center">
                <Link
                  to="/worldcup"
                  className="w-full py-4.5 bg-[#C5A665] text-[#0A2215] hover:bg-[#D4B77A] font-bold uppercase tracking-wider text-[11px] rounded-xl transition-all shadow-md inline-block"
                >
                  Return to Collection
                </Link>
                <p className="text-xs text-[#7A9E8A]">
                  Didn't receive the email? Use the{' '}
                  <Link to="/worldcup/lookup" className="text-[#D4AC52] underline hover:text-white transition-colors">
                    Order Lookup Tool
                  </Link>
                  .
                </p>
              </div>
            </div>
          ) : timedOut || isError ? (
            /* ── STATE 2 & 3: TIMEOUT or FETCH ERROR ── */
            <div className="space-y-6">
              {/* Timeout Warning Icon */}
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <h2 className="font-serif text-2xl text-white">
                Payment processing...
              </h2>
              <p className="text-[13.5px] text-[#7A9E8A] leading-relaxed">
                Your payment transaction is currently processing. This is taking a little longer than usual to confirm on our network.
              </p>

              <div className="bg-[#0D2A1C] border border-[#1A3C2A] rounded-xl p-5 text-left text-[12.5px] text-[#7A9E8A] space-y-2.5">
                <p className="font-bold text-amber-500 uppercase tracking-wider text-[9px]">
                  What you should know
                </p>
                <ul className="list-disc pl-4 space-y-1.5 leading-relaxed">
                  <li>Your order reference code is: <strong className="font-mono text-white text-[13px]">{orderRef}</strong></li>
                  <li>Do not initiate a second purchase — your download will be dispatched as soon as the processor updates.</li>
                  <li>Check your inbox shortly for an confirmation from <span className="text-white">noreply@imakwa.com</span>.</li>
                </ul>
              </div>

              <div className="pt-4 flex flex-col gap-4 items-center">
                <Link
                  to="/worldcup"
                  className="w-full py-4.5 bg-[#C5A665] text-[#0A2215] hover:bg-[#D4B77A] font-bold uppercase tracking-wider text-[11px] rounded-xl transition-all shadow-md inline-block"
                >
                  Return to Landing Page
                </Link>
                <Link
                  to="/worldcup/lookup"
                  className="text-xs text-[#D4AC52] underline hover:text-white transition-colors"
                >
                  Track Order Status via Lookup Tool
                </Link>
              </div>
            </div>
          ) : (
            /* ── STATE 4: POLLING VERIFICATION STATE ── */
            <div className="py-10 space-y-6 flex flex-col items-center">
              <Spinner size="lg" className="text-[#C5A665]" />
              <div>
                <h3 className="font-serif text-2xl text-white mb-2">
                  Confirming your payment
                </h3>
                <p className="text-sm text-[#7A9E8A]">
                  Verifying your transaction with the provider, please keep this window open.
                </p>
                {orderRef && (
                  <p className="text-xs font-mono text-[#D4AC52] mt-4 tracking-wider">
                    Reference: {orderRef}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
