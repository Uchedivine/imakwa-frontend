import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { useAuthStore } from '../../store/authStore'
import GalleryNavbar from '../../components/layout/GalleryNavbar'
import GalleryFooter from '../../components/layout/GalleryFooter'
import Spinner from '../../components/ui/Spinner'

export default function Checkout() {
    const navigate = useNavigate()
    const { items, total, clearCart } = useCartStore()
    const { user } = useAuthStore()
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        // Shipping
        fullName: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',

        // Payment (simplified - real implementation would use Stripe/PayPal)
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    })

    const shippingCost = total > 5000 ? 0 : 50 // Free shipping over $5000
    const tax = total * 0.08 // 8% tax
    const finalTotal = total + shippingCost + tax

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsProcessing(true)

        try {
            // Simulate API call to process payment
            await new Promise(resolve => setTimeout(resolve, 2000))

            // In real implementation, this would call payment API
            // const response = await createOrder({ items, total: finalTotal, ...formData })

            // Clear cart and redirect to success
            clearCart()
            navigate('/checkout/success')
        } catch (err) {
            setError('Payment failed. Please check your card details and try again.')
        } finally {
            setIsProcessing(false)
        }
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-cream">
                <GalleryNavbar />
                <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                    <svg className="w-20 h-20 mx-auto mb-6 text-charcoal/20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <h1 className="font-serif text-3xl text-charcoal mb-4">Your cart is empty</h1>
                    <p className="text-charcoal-soft mb-8">Add some artworks to get started</p>
                    <Link
                        to="/browse"
                        className="inline-block px-8 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terra-light transition-colors"
                    >
                        Browse Collection
                    </Link>
                </div>
                <GalleryFooter />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-cream">
            <GalleryNavbar />

            <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-charcoal-soft mb-8">
                    <Link to="/" className="hover:text-terracotta">Home</Link>
                    <span>/</span>
                    <Link to="/browse" className="hover:text-terracotta">Browse</Link>
                    <span>/</span>
                    <span className="text-charcoal">Checkout</span>
                </nav>

                <h1 className="font-serif text-4xl text-charcoal mb-12">Checkout</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left: Checkout Form */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Shipping Information */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 border border-charcoal/10">
                            <h2 className="text-xl font-bold text-charcoal mb-6">Shipping Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-charcoal mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 focus:outline-none focus:border-terracotta transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 focus:outline-none focus:border-terracotta transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Phone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 focus:outline-none focus:border-terracotta transition-colors"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-charcoal mb-2">Street Address *</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 focus:outline-none focus:border-terracotta transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 focus:outline-none focus:border-terracotta transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">State/Province *</label>
                                    <input
                                        type="text"
                                        name="state"
                                        required
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 focus:outline-none focus:border-terracotta transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">ZIP/Postal Code *</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        required
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 focus:outline-none focus:border-terracotta transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Country *</label>
                                    <input
                                        type="text"
                                        name="country"
                                        required
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 focus:outline-none focus:border-terracotta transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 border border-charcoal/10">
                            <h2 className="text-xl font-bold text-charcoal mb-6">Payment Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-charcoal mb-2">Card Number *</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        required
                                        placeholder="1234 5678 9012 3456"
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 focus:outline-none focus:border-terracotta transition-colors"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-charcoal mb-2">Cardholder Name *</label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        required
                                        value={formData.cardName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 focus:outline-none focus:border-terracotta transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Expiry Date *</label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        required
                                        placeholder="MM/YY"
                                        value={formData.expiryDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 focus:outline-none focus:border-terracotta transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">CVV *</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        required
                                        placeholder="123"
                                        maxLength="4"
                                        value={formData.cvv}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 focus:outline-none focus:border-terracotta transition-colors"
                                    />
                                </div>
                            </div>

                            <p className="text-xs text-charcoal-soft mt-4">
                                🔒 Your payment information is secure and encrypted
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 border border-charcoal/10 sticky top-24">
                            <h2 className="text-lg font-bold text-charcoal mb-6">Order Summary</h2>

                            {/* Cart Items */}
                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                                {items.map(item => (
                                    <div key={item.id} className="flex gap-3">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-serif text-sm text-charcoal truncate">{item.title}</p>
                                            <p className="text-xs text-charcoal-soft">{item.artist}</p>
                                            <p className="text-xs text-charcoal-soft">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-charcoal">
                                            ${(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Pricing Breakdown */}
                            <div className="border-t border-charcoal/10 pt-4 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-charcoal-soft">Subtotal</span>
                                    <span className="text-charcoal">${total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-charcoal-soft">Shipping</span>
                                    <span className="text-charcoal">
                                        {shippingCost === 0 ? 'FREE' : `$${shippingCost}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-charcoal-soft">Tax (8%)</span>
                                    <span className="text-charcoal">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-3 border-t border-charcoal/10">
                                    <span className="text-charcoal">Total</span>
                                    <span className="font-serif text-charcoal">${finalTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full mt-6 py-4 bg-terracotta text-white font-medium rounded-full hover:bg-terra-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isProcessing ? (
                                    <>
                                        <Spinner size="sm" className="mr-2" />
                                        Processing...
                                    </>
                                ) : (
                                    `Place Order • $${finalTotal.toFixed(2)}`
                                )}
                            </button>

                            <p className="text-xs text-center text-charcoal-soft mt-4">
                                By placing your order, you agree to our Terms & Conditions
                            </p>
                        </div>
                    </div>
                </form>
            </div>

            <GalleryFooter />
        </div>
    )
}
