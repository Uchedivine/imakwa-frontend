import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import client from '../../api/client'
import { getOrderStatusByReference } from '../../api/worldcup'
import Spinner from '../../components/ui/Spinner'
import Button from '../../components/ui/Button'

export default function PaystackCallback() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const reference = searchParams.get('reference')
    const orderType = searchParams.get('order_type') ?? 'gallery' // 'gallery' or 'worldcup'

    const [status, setStatus] = useState('verifying') // 'verifying' | 'success' | 'failed'
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        if (!reference) {
            setErrorMsg('No payment reference found.')
            setStatus('failed')
            return
        }

        const verify = async () => {
            try {
                let paymentStatus

                if (orderType === 'worldcup') {
                    const data = await getOrderStatusByReference(reference)
                    paymentStatus = data.payment_status
                } else {
                    // Gallery order — poll the gallery endpoint
                    const res = await client.get(`/orders/by-reference/${reference}`)
                    paymentStatus = res.data.payment_status
                }

                if (paymentStatus === 'paid') {
                    setStatus('success')
                    setTimeout(() => {
                        if (orderType === 'worldcup') {
                            navigate('/worldcup/success')
                        } else {
                            navigate('/checkout/success')
                        }
                    }, 2000)
                } else {
                    // Payment pending — webhook may not have fired yet, poll briefly
                    let attempts = 0
                    const poll = setInterval(async () => {
                        attempts++
                        try {
                            let ps
                            if (orderType === 'worldcup') {
                                const d = await getOrderStatusByReference(reference)
                                ps = d.payment_status
                            } else {
                                const r = await client.get(`/orders/by-reference/${reference}`)
                                ps = r.data.payment_status
                            }
                            if (ps === 'paid') {
                                clearInterval(poll)
                                setStatus('success')
                                setTimeout(() => {
                                    navigate(orderType === 'worldcup' ? '/worldcup/success' : '/checkout/success')
                                }, 2000)
                            } else if (attempts >= 10) {
                                clearInterval(poll)
                                setErrorMsg('Payment is taking longer than expected. Check your email for confirmation.')
                                setStatus('failed')
                            }
                        } catch {
                            clearInterval(poll)
                            setErrorMsg('Could not verify payment. Contact support if you were charged.')
                            setStatus('failed')
                        }
                    }, 3000)
                }
            } catch (err) {
                setErrorMsg(err?.response?.data?.message || 'Unable to verify payment. Contact support if you were charged.')
                setStatus('failed')
            }
        }

        verify()
    }, [reference, orderType, navigate])

    if (status === 'verifying') {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center">
                    <Spinner size="lg" className="mx-auto mb-4" />
                    <h2 className="font-serif text-2xl mb-4 text-charcoal">Verifying Payment</h2>
                    <p className="text-charcoal-soft">Please wait while we confirm your transaction...</p>
                </div>
            </div>
        )
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="font-serif text-2xl mb-2 text-charcoal">Payment Confirmed!</h2>
                    <p className="text-charcoal-soft text-sm">Redirecting you now...</p>
                </div>
            </div>
        )
    }

    // Failed state
    return (
        <div className="min-h-screen bg-cream flex items-center justify-center px-6">
            <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h2 className="font-serif text-2xl mb-3 text-charcoal">Payment Failed</h2>
                <p className="text-charcoal-soft mb-6 text-sm">{errorMsg}</p>
                <div className="space-y-3">
                    {orderType === 'worldcup' ? (
                        <>
                            <Button onClick={() => navigate('/worldcup/lookup')} className="w-full">Look Up Order</Button>
                            <button onClick={() => navigate('/worldcup')} className="w-full py-3 text-charcoal-soft hover:text-charcoal transition-colors text-sm">
                                Return to World Cup
                            </button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => navigate('/orders')} className="w-full">View My Orders</Button>
                            <button onClick={() => navigate('/browse')} className="w-full py-3 text-charcoal-soft hover:text-charcoal transition-colors text-sm">
                                Continue Shopping
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
