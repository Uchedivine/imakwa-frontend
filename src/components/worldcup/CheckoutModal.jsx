import { useState } from 'react'
import { createWorldCupCheckout } from '../../api/worldcup'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Spinner from '../ui/Spinner'

export default function CheckoutModal({ isOpen, onClose, selectedTier }) {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    if (!isOpen || !selectedTier) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        try {
            const response = await createWorldCupCheckout({
                email,
                productId: selectedTier.id
            })

            // Redirect to payment URL (Gumroad, Shopify, etc.)
            if (response.checkoutUrl) {
                window.location.href = response.checkoutUrl
            }
        } catch (err) {
            setError(err.message || 'Failed to create checkout. Please try again.')
            setIsLoading(false)
        }
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-pitch/80 backdrop-blur-sm z-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-charcoal-soft hover:text-charcoal transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="font-serif text-3xl text-charcoal mb-2">
                            Complete Purchase
                        </h2>
                        <div className="flex items-center justify-between py-4 px-4 bg-pitch/5 rounded-xl border border-pitch/10">
                            <div>
                                <p className="text-sm text-charcoal-soft">Selected Product</p>
                                <p className="font-semibold text-charcoal">{selectedTier.name}</p>
                            </div>
                            <p className="text-2xl font-bold text-gold">
                                ${selectedTier.price.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                                Email Address
                            </label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                disabled={isLoading}
                            />
                            <p className="text-xs text-charcoal-soft mt-1">
                                Download link will be sent to this email
                            </p>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-pitch hover:bg-pitch-accent text-gold-light"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Spinner size="sm" />
                                    Processing...
                                </span>
                            ) : (
                                `Proceed to Payment — $${selectedTier.price.toLocaleString()}`
                            )}
                        </Button>

                        <p className="text-xs text-center text-charcoal-soft">
                            Secure checkout powered by Stripe
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}
