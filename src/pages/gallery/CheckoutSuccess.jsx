import { Link } from 'react-router-dom'
import GalleryNavbar from '../../components/layout/GalleryNavbar'
import GalleryFooter from '../../components/layout/GalleryFooter'
import SectionReveal from '../../components/ui/SectionReveal'

export default function CheckoutSuccess() {
    return (
        <div className="min-h-screen bg-cream">
            <GalleryNavbar />

            <SectionReveal>
                <div className="max-w-2xl mx-auto px-6 py-20 text-center">
                    {/* Success Icon */}
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="font-serif text-4xl text-charcoal mb-4">
                        Order Placed Successfully!
                    </h1>

                    <p className="text-charcoal-soft text-lg mb-8">
                        Thank you for your purchase. We've sent a confirmation email with your order details.
                    </p>

                    <div className="bg-white rounded-2xl p-8 border border-charcoal/10 mb-8">
                        <p className="text-sm text-charcoal-soft mb-4">What happens next?</p>
                        <div className="space-y-4 text-left max-w-md mx-auto">
                            <div className="flex gap-3">
                                <span className="w-6 h-6 bg-terracotta text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                                <div>
                                    <p className="text-sm font-medium text-charcoal">Order Confirmation</p>
                                    <p className="text-xs text-charcoal-soft">You'll receive an email with your order details</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <span className="w-6 h-6 bg-terracotta text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                                <div>
                                    <p className="text-sm font-medium text-charcoal">Artwork Preparation</p>
                                    <p className="text-xs text-charcoal-soft">We carefully prepare your artwork for shipping</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <span className="w-6 h-6 bg-terracotta text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                                <div>
                                    <p className="text-sm font-medium text-charcoal">Shipping & Tracking</p>
                                    <p className="text-xs text-charcoal-soft">You'll receive tracking information within 2-3 business days</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <Link
                            to="/orders"
                            className="px-8 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terra-light transition-colors"
                        >
                            View Orders
                        </Link>
                        <Link
                            to="/browse"
                            className="px-8 py-3 border border-charcoal/20 text-charcoal rounded-full font-medium hover:bg-charcoal/5 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </SectionReveal>

            <GalleryFooter />
        </div>
    )
}
