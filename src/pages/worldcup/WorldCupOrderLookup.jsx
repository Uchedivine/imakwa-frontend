import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { lookupOrdersByEmail } from '../../api/worldcup'
import WorldCupNavbar from '../../components/layout/WorldCupNavbar'
import Spinner from '../../components/ui/Spinner'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

export default function WorldCupOrderLookup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setOrders(null)

    try {
      const results = await lookupOrdersByEmail(email)
      setOrders(results)
    } catch (err) {
      setError(err.message || 'Lookup failed. Please check your email and try again.')
    } finally {
      setLoading(false)
    }
  }

  const checkTokenStatus = (order) => {
    if (order.token_used) {
      return {
        label: 'Link already redeemed — Contact Support',
        style: 'bg-red-500/10 border-red-500/20 text-red-400',
      }
    }
    
    if (order.token_expires_at && new Date(order.token_expires_at) < new Date()) {
      return {
        label: 'Link expired — Contact Support',
        style: 'bg-amber-500/10 border-amber-500/20 text-amber-500',
      }
    }

    return {
      label: 'Link valid — Check your inbox',
      style: 'bg-green-500/10 border-green-500/20 text-green-400',
    }
  }

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
        <div className="bg-[#0A2215]/60 border border-[#1A3C2A] rounded-2xl shadow-2xl max-w-xl w-full p-8 md:p-10 backdrop-blur-md">
          {/* Back button */}
          <Link
            to="/worldcup"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A9E8A] hover:text-white mb-6 transition-colors"
          >
            <span>←</span> Back to Landing Page
          </Link>

          {/* Heading */}
          <h2 className="font-serif text-3xl text-white mb-2 leading-tight">
            Order Lookup
          </h2>
          <p className="text-sm text-[#7A9E8A] mb-8 leading-relaxed">
            Enter the email address you used at checkout to track your order details and link statuses.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-bold tracking-[0.1em] text-[#D4AC52] uppercase">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
                className="bg-[#0D2A1C] border-[#1A3C2A] text-white placeholder-[#7A9E8A] focus:border-[#D4AC52]"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/15 border border-red-500/20 rounded-lg text-sm text-red-400">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-4.5 bg-[#C5A665] text-[#0A2215] hover:bg-[#D4B77A] font-bold uppercase tracking-wider text-[11px] rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  Searching Records...
                </>
              ) : (
                'Find My Orders'
              )}
            </Button>
          </form>

          {/* Search Results */}
          {orders !== null && (
            <div className="mt-10 pt-8 border-t border-[#1A3C2A] space-y-6">
              <h3 className="font-serif text-lg text-white">
                Search Results ({orders.length})
              </h3>

              {orders.length === 0 ? (
                <div className="p-4 bg-[#0D2A1C] border border-[#1A3C2A] rounded-xl text-center text-sm text-[#7A9E8A]">
                  No completed orders found for this email address.
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => {
                    const status = checkTokenStatus(order)
                    return (
                      <div
                        key={order.id}
                        className="bg-[#0D2A1C] border border-[#1A3C2A] rounded-xl p-5 space-y-3 text-left"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-[13.5px] font-bold text-white leading-snug">
                              {order.product}
                            </h4>
                            <p className="text-xs text-[#7A9E8A] mt-0.5">
                              {order.tier}
                            </p>
                          </div>
                          <span className="font-mono text-xs text-[#D4AC52] font-semibold bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                            {order.reference}
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-xs pt-2 border-t border-white/5">
                          <span className="text-[#7A9E8A]">
                            Paid: ${order.amount.toLocaleString()} USD
                          </span>
                          <span className={`px-2.5 py-1 text-[9px] font-bold rounded border uppercase ${status.style}`}>
                            {status.label}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
