import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import client from '../../api/client'
import { useCart } from '../../hooks/useCart'
import Spinner from '../../components/ui/Spinner'
export default function CheckoutSuccess() {
    const [searchParams] = useSearchParams()
    const [status, setStatus] = useState('verifying') // 'verifying', 'success', 'failed'
    const { clearCart } = useCart()
    const reference = searchParams.get('reference') // Paystack reference
    useEffect(() => {
        if (!reference) {
            setStatus('failed')
            return
        }
        // Verify the payment status on mount
        client.get(`/payments/paystack/verify?reference=${reference}`)
            .then(res => {
                if (res.data.status === 'success') {
                    clearCart() // Empty cart locally
                    setStatus('success')
                } else {
                    setStatus('failed')
                }
            })
            .catch(() => setStatus('failed'))
    }, [reference])
    if (status === 'verifying') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-cream">
                <Spinner size="lg" className="mb-4" />
                <p className="text-charcoal font-medium">Verifying your payment, please wait...</p>
            </div>
        )
    }
    if (status === 'failed') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-6 text-center">
                <h1 className="text-3xl font-serif text-red-600 mb-4">Payment Verification Failed</h1>
                <p className="text-charcoal-soft mb-8">We couldn't confirm your transaction. If you were debited, please contact support.</p>
                <Link to="/browse" className="px-8 py-3 bg-terracotta text-white rounded-full">Return to Browse</Link>
            </div>
        )
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </div>
            <h1 className="text-4xl font-serif text-charcoal mb-4">Thank you for your order!</h1>
            <p className="text-charcoal-soft mb-8">Your payment was processed successfully. We've sent a receipt to your email.</p>
            <Link to="/orders" className="px-8 py-3 bg-terracotta text-white rounded-full">View My Orders</Link>
        </div>
    )
}
