import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { initStripePayment, initPaystackPayment } from '../../api/worldcup'
import WorldCupNavbar from '../../components/layout/WorldCupNavbar'
import Spinner from '../../components/ui/Spinner'
import Button from '../../components/ui/Button'

// Initialize Stripe outside component
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

function StripePaymentForm({ orderId, orderState }) {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)
    setErrorMessage(null)

    try {
      // Initialize payment intent from backend
      const { client_secret } = await initStripePayment({ orderId })

      // Confirm Stripe card payment
      const cardElement = elements.getElement(CardElement)
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: orderState.email,
          },
        },
      })

      if (result.error) {
        setErrorMessage(result.error.message)
        setIsProcessing(false)
      } else if (result.paymentIntent.status === 'succeeded') {
        navigate('/worldcup/success', {
          state: {
            orderId,
            email: orderState.email,
            gateway: 'stripe',
          },
        })
      }
    } catch (err) {
      setErrorMessage(err.message || 'Payment failed. Please try again.')
      setIsProcessing(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '14.5px',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#7A9E8A',
        },
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-xs font-bold tracking-[0.1em] text-[#D4AC52] uppercase">
          Card Details
        </label>
        <div className="p-4 bg-[#0D2A1C] border border-[#1A3C2A] rounded-xl hover:border-[#2A4D3A] transition-all duration-300">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-500/15 border border-red-500/20 rounded-lg text-sm text-red-400">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        disabled={isProcessing || !stripe}
        className="w-full py-4.5 bg-[#C5A665] text-[#0A2215] hover:bg-[#D4B77A] font-bold uppercase tracking-wider text-[11px] rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Spinner size="sm" />
            Processing Secure Payment...
          </>
        ) : (
          `Pay $${orderState.amount.toLocaleString()} USD`
        )}
      </Button>
    </form>
  )
}

export default function WorldCupPayment() {
  const { orderId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const orderState = location.state
  const gateway = orderState?.gateway || 'stripe'

  const [paystackLoading, setPaystackLoading] = useState(false)
  const [initError, setInitError] = useState(null)

  // Direct access route guard
  useEffect(() => {
    if (!orderState || !orderId) {
      navigate('/worldcup', { replace: true })
    }
  }, [orderState, orderId, navigate])

  // Trigger Paystack redirect on mount
  useEffect(() => {
    if (orderState && orderId && gateway === 'paystack') {
      const startPaystack = async () => {
        setPaystackLoading(true)
        setInitError(null)
        try {
          const { authorization_url } = await initPaystackPayment({
            orderId: parseInt(orderId, 10),
            email: orderState.email,
          })
          window.location.href = authorization_url
        } catch (err) {
          setInitError(err.message || 'Failed to initialize Paystack redirect.')
          setPaystackLoading(false)
        }
      }
      startPaystack()
    }
  }, [orderState, orderId, gateway])

  if (!orderState) return null

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

      <div className="flex-1 relative z-10 flex items-center justify-center p-6 md:p-12">
        <div className="bg-[#0A2215]/60 border border-[#1A3C2A] rounded-2xl shadow-2xl max-w-xl w-full p-8 md:p-10 backdrop-blur-md">
          {/* Back button */}
          <Link
            to="/worldcup"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A9E8A] hover:text-white mb-6 transition-colors"
          >
            <span>←</span> Back to Collection
          </Link>

          {/* Heading */}
          <h2 className="font-serif text-3xl text-white mb-6 leading-tight">
            Checkout payment
          </h2>

          {/* Order Summary Card */}
          <div className="bg-[#0D2A1C] border border-[#1A3C2A] rounded-xl p-5 mb-8 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-[#D4AC52] uppercase tracking-wider mb-1">
                  Product Tier
                </p>
                <p className="text-[14px] font-semibold text-white">
                  {orderState.product} — {orderState.tier}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-[#D4AC52] uppercase tracking-wider mb-1">
                  Amount
                </p>
                <p className="text-[18px] font-bold text-[#D4AC52]">
                  ${orderState.amount.toLocaleString()} USD
                </p>
              </div>
            </div>

            <div className="border-t border-[#1A3C2A] pt-4 grid grid-cols-2 gap-4 text-xs text-[#7A9E8A]">
              <div>
                <p className="font-bold text-[#D4AC52]/80 uppercase tracking-wider text-[9px] mb-0.5">
                  Email Address
                </p>
                <p className="truncate text-white">{orderState.email}</p>
              </div>
              <div>
                <p className="font-bold text-[#D4AC52]/80 uppercase tracking-wider text-[9px] mb-0.5">
                  Reference
                </p>
                <p className="font-mono text-white">{orderState.reference}</p>
              </div>
            </div>
          </div>

          {/* Payment Gateway Form */}
          {gateway === 'stripe' ? (
            <Elements stripe={stripePromise}>
              <StripePaymentForm orderId={orderId} orderState={orderState} />
            </Elements>
          ) : (
            <div className="text-center py-10 space-y-4 flex flex-col items-center">
              {paystackLoading ? (
                <>
                  <Spinner size="md" className="text-[#C5A665]" />
                  <p className="text-sm font-medium text-[#7A9E8A]">
                    Redirecting to Paystack checkout...
                  </p>
                </>
              ) : initError ? (
                <div className="space-y-4">
                  <p className="text-red-400 text-sm">{initError}</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-[#C5A665] text-[#0A2215] font-bold uppercase tracking-wider text-[11px] px-6 py-3 rounded-lg"
                  >
                    Retry Redirection
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-[#7A9E8A]">Redirecting...</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
