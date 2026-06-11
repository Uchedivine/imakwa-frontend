import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOrderStatusByReference } from '../../api/worldcup'
import Spinner from '../../components/ui/Spinner'
import Button from '../../components/ui/Button'

export default function PaystackCallback() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const reference = searchParams.get('reference')
    const [pollingCount, setPollingCount] = useState(0)

    // Poll order status by reference
    const { data: order, isLoading, isError, error } = useQuery({
        queryKey: ['order-status-by-reference', reference],
        queryFn: () => getOrderStatusByReference(reference),
        enabled: !!reference,
        refetchInterval: (data) => {
            // Stop polling if order is completed or after 20 attempts (1 minute)
            if (!data || data.status === 'completed' || pollingCount >= 20) {
                return false
            }
            setPollingCount(prev => prev + 1)
            return 3000 // Poll every 3 seconds
        },
    })

    useEffect(() => {
        if (order?.status === 'completed') {
            // Redirect to success page after a brief delay
            setTimeout(() => {
                navigate('/worldcup/success', {
                    state: {
                        order,
                        message: 'Payment successful! Check your email for download instructions.'
                    }
                })
            }, 2000)
        }
    }, [order, navigate])

    if (!reference) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h2 className="font-serif text-2xl mb-4 text-charcoal">Invalid Payment Reference</h2>
                    <p className="text-charcoal-soft mb-6">
                        No payment reference found. Please try again.
                    </p>
                    <Button onClick={() => navigate('/worldcup')}>
                        Return to World Cup
                    </Button>
                </div>
            </div>
        )
    }

    if (isLoading || (!order && pollingCount < 20)) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center">
                    <Spinner size="lg" className="mx-auto mb-4" />
                    <h2 className="font-serif text-2xl mb-4 text-charcoal">Processing Payment</h2>
                    <p className="text-charcoal-soft mb-2">
                        Please wait while we verify your payment...
                    </p>
                    <p className="text-sm text-charcoal-soft/70">
                        This may take a few moments.
                    </p>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h2 className="font-serif text-2xl mb-4 text-charcoal">Payment Failed</h2>
                    <p className="text-charcoal-soft mb-6">
                        {error?.response?.data?.message || 'Unable to verify payment. Please contact support.'}
                    </p>
                    <div className="space-y-3">
                        <Button onClick={() => navigate('/worldcup/lookup')} className="w-full">
                            Look Up Order
                        </Button>
                        <button
                            onClick={() => navigate('/worldcup')}
                            className="w-full py-3 text-charcoal-soft hover:text-charcoal transition-colors"
                        >
                            Return to World Cup
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (order?.status === 'failed') {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h2 className="font-serif text-2xl mb-4 text-charcoal">Payment Failed</h2>
                    <p className="text-charcoal-soft mb-6">
                        Your payment was not successful. Please try again or contact support.
                    </p>
                    <div className="space-y-3">
                        <Button onClick={() => navigate('/worldcup/products')} className="w-full">
                            Try Again
                        </Button>
                        <button
                            onClick={() => navigate('/worldcup')}
                            className="w-full py-3 text-charcoal-soft hover:text-charcoal transition-colors"
                        >
                            Return to World Cup
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Payment successful - showing success state while redirecting
    return (
        <div className="min-h-screen bg-cream flex items-center justify-center px-6">
            <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="font-serif text-2xl mb-4 text-charcoal">Payment Successful!</h2>
                <p className="text-charcoal-soft mb-2">
                    Your order has been confirmed.
                </p>
                <p className="text-sm text-charcoal-soft/70">
                    Redirecting to download page...
                </p>
            </div>
        </div>
    )
}
