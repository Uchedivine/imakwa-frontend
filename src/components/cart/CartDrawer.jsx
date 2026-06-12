import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { parsePrice } from '../../lib/utils'

export default function CartDrawer({ isOpen, onClose }) {
    const { items, removeItem, updateQuantity, totalAmount } = useCartStore()

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={handleBackdropClick}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-cream shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal/10">
                    <h2 className="text-lg font-bold text-charcoal">
                        Cart ({items.length})
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-charcoal/5 flex items-center justify-center transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                        <div className="text-center py-16">
                            <svg className="w-16 h-16 mx-auto mb-4 text-charcoal/20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <p className="text-sm text-charcoal-soft mb-4">Your cart is empty</p>
                            <Link
                                to="/browse"
                                onClick={onClose}
                                className="inline-block px-6 py-2 bg-terracotta text-white text-sm font-medium rounded-full hover:bg-terra-light transition-colors"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 pb-4 border-b border-charcoal/10 last:border-0">
                                    {/* Image */}
                                    <Link
                                        to={`/artwork/${item.id}`}
                                        onClick={onClose}
                                        className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </Link>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <Link
                                            to={`/artwork/${item.id}`}
                                            onClick={onClose}
                                            className="block"
                                        >
                                            <h3 className="font-serif text-sm text-charcoal mb-1 truncate hover:text-terracotta transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-charcoal-soft mb-2">
                                                by {item.artist}
                                            </p>
                                        </Link>

                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-charcoal">
                                                ${parsePrice(item.price).toLocaleString()}
                                            </p>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="w-6 h-6 rounded-full border border-charcoal/20 flex items-center justify-center hover:bg-charcoal/5 transition-colors"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                                    </svg>
                                                </button>

                                                <span className="text-sm font-medium text-charcoal w-6 text-center">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-6 h-6 rounded-full border border-charcoal/20 flex items-center justify-center hover:bg-charcoal/5 transition-colors"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </button>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="ml-2 text-charcoal-soft hover:text-red-600 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-charcoal/10 px-6 py-5">
                        {/* Subtotal */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-charcoal-soft">Subtotal</span>
                            <span className="font-serif text-xl text-charcoal">${totalAmount.toLocaleString()}</span>
                        </div>

                        <p className="text-xs text-charcoal-soft mb-4">
                            Shipping and taxes calculated at checkout
                        </p>

                        {/* Checkout Button */}
                        <Link
                            to="/checkout"
                            onClick={onClose}
                            className="block w-full py-3.5 bg-terracotta text-white text-sm font-medium rounded-full text-center hover:bg-terra-light transition-colors mb-3"
                        >
                            Proceed to Checkout
                        </Link>

                        {/* Continue Shopping */}
                        <button
                            onClick={onClose}
                            className="block w-full py-3 border border-charcoal/20 text-charcoal text-sm font-medium rounded-full hover:bg-charcoal/5 transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
