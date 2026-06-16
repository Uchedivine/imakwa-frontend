import { useParams, Link } from 'react-router-dom'
import GalleryNavbar from '../../components/layout/GalleryNavbar'
import GalleryFooter from '../../components/layout/GalleryFooter'
import Spinner from '../../components/ui/Spinner'
import SectionReveal from '../../components/ui/SectionReveal'
import { useOrder } from '../../hooks/useOrders'

const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: '⏳' },
    processing: { label: 'Processing', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: '⏳' },
    paid: { label: 'Paid', color: 'bg-green-100 text-green-700 border-green-200', icon: '✓' },
    shipped: { label: 'Shipped', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: '🚚' },
    delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700 border-green-200', icon: '✓' },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700 border-red-200', icon: '✕' }
}

export default function OrderDetail() {
    const { id } = useParams()
    const { data: order, isLoading, isError } = useOrder(id)

    if (isLoading) {
        return (
            <div className="min-h-screen bg-cream">
                <GalleryNavbar />
                <div className="flex justify-center items-center py-40">
                    <Spinner size="lg" />
                </div>
                <GalleryFooter />
            </div>
        )
    }

    if (isError || !order) {
        return (
            <div className="min-h-screen bg-cream">
                <GalleryNavbar />
                <div className="max-w-2xl mx-auto px-6 py-20 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                    </div>
                    <h2 className="font-serif text-3xl text-charcoal mb-4">Order Not Found</h2>
                    <p className="text-charcoal-soft mb-8">We couldn't retrieve the details for order #{id}. It may not exist or you might not have permission to view it.</p>
                    <Link to="/orders" className="px-8 py-3 bg-terracotta text-white rounded-full">Back to My Orders</Link>
                </div>
                <GalleryFooter />
            </div>
        )
    }

    const orderStatus = order.status || 'pending'
    const statusInfo = statusConfig[orderStatus] || { label: orderStatus.toUpperCase(), color: 'bg-gray-100 text-gray-700 border-gray-200', icon: '•' }
    const createdDate = new Date(order.created_at || order.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    // Subtotal calculation fallback
    const subtotal = order.subtotal || order.items?.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0) || 0
    const shippingFee = order.shipping_fee || order.shipping || 0
    const tax = order.tax || 0
    const total = order.total || (parseFloat(subtotal) + parseFloat(shippingFee) + parseFloat(tax))

    // Visual Timeline steps
    const steps = ['pending', 'processing', 'shipped', 'delivered']
    const currentStepIndex = steps.indexOf(orderStatus.toLowerCase())

    return (
        <div className="min-h-screen bg-cream">
            <GalleryNavbar />

            <SectionReveal>
                <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
                    {/* Breadcrumb & Navigation */}
                    <div className="mb-8">
                        <Link to="/orders" className="text-sm text-charcoal-soft hover:text-charcoal inline-flex items-center gap-2 font-medium transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Back to My Orders
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-charcoal/10 pb-8 mb-8">
                        <div>
                            <h1 className="font-serif text-4xl text-charcoal mb-2">Order #{order.id}</h1>
                            <p className="text-charcoal-soft">Placed on {createdDate}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`px-4 py-2 border rounded-full text-sm font-bold flex items-center gap-2 ${statusInfo.color}`}>
                                <span>{statusInfo.icon}</span>
                                {statusInfo.label}
                            </span>
                        </div>
                    </div>

                    {/* Order Status Timeline (Premium feature) */}
                    {orderStatus !== 'cancelled' && (
                        <div className="bg-white rounded-2xl border border-charcoal/10 p-6 md:p-8 mb-8">
                            <h2 className="font-serif text-lg text-charcoal mb-6">Delivery Timeline</h2>
                            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
                                {/* Line connector for Desktop */}
                                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-charcoal/10 hidden md:block z-0" />
                                
                                {steps.map((step, idx) => {
                                    const stepLabel = step.charAt(0).toUpperCase() + step.slice(1)
                                    const isCompleted = currentStepIndex >= idx
                                    const isActive = currentStepIndex === idx

                                    return (
                                        <div key={step} className="flex md:flex-col items-center gap-4 md:gap-2 z-10 w-full md:w-auto relative">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border font-bold text-xs ${
                                                isCompleted 
                                                    ? 'bg-terracotta text-white border-terracotta' 
                                                    : 'bg-white text-charcoal-soft border-charcoal/20'
                                            } ${isActive ? 'ring-4 ring-terracotta/20' : ''}`}>
                                                {isCompleted ? '✓' : idx + 1}
                                            </div>
                                            <div className="text-left md:text-center">
                                                <p className={`text-sm font-semibold ${isCompleted ? 'text-charcoal' : 'text-charcoal-soft'}`}>
                                                    {stepLabel}
                                                </p>
                                                {isActive && (
                                                    <span className="text-[11px] text-terracotta font-medium bg-terracotta/10 px-2 py-0.5 rounded-full mt-1 inline-block">
                                                        Current Status
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Side: Order Items */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl border border-charcoal/10 overflow-hidden">
                                <div className="px-6 py-4 bg-charcoal/5 border-b border-charcoal/10">
                                    <h2 className="font-serif text-xl text-charcoal">Artworks List</h2>
                                </div>
                                <div className="p-6 divide-y divide-charcoal/10">
                                    {order.items?.map((item) => {
                                        const artworkId = item.itemable_id || item.id;
                                        const image = item.itemable?.primary_image?.url || item.itemable?.primaryImage?.url || item.image || 'https://images.unsplash.com/photo-1578926288207-a90a5366a2b6?w=400&q=80';
                                        const artist = item.itemable?.artist?.name || item.artist || 'Unknown Artist';
                                        const title = item.title || item.itemable?.title || 'Artwork';

                                        return (
                                            <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                                                <Link
                                                    to={`/artwork/${artworkId}`}
                                                    className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0"
                                                >
                                                    <img
                                                        src={image}
                                                        alt={title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </Link>

                                                <div className="flex-1 min-w-0">
                                                    <Link to={`/artwork/${artworkId}`} className="block">
                                                        <h3 className="font-serif text-lg text-charcoal hover:text-terracotta transition-colors truncate">
                                                            {title}
                                                        </h3>
                                                        <p className="text-sm text-charcoal-soft">
                                                            by {artist}
                                                        </p>
                                                    </Link>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <p className="text-xs text-charcoal-soft">
                                                            Quantity: <span className="font-semibold text-charcoal">{item.quantity}</span>
                                                        </p>
                                                        <p className="text-xs text-charcoal-soft">
                                                            Unit Price: <span className="font-semibold text-charcoal">${parseFloat(item.price).toLocaleString()}</span>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="text-right shrink-0">
                                                    <p className="font-bold text-charcoal">
                                                        ${(parseFloat(item.price) * item.quantity).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Order Summary & Info */}
                        <div className="space-y-6">
                            {/* Summary Card */}
                            <div className="bg-white rounded-2xl border border-charcoal/10 overflow-hidden">
                                <div className="px-6 py-4 bg-charcoal/5 border-b border-charcoal/10">
                                    <h2 className="font-serif text-xl text-charcoal">Summary</h2>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-charcoal-soft">Subtotal</span>
                                        <span className="font-medium text-charcoal">${parseFloat(subtotal).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-charcoal-soft">Shipping</span>
                                        <span className="font-medium text-charcoal">
                                            {shippingFee > 0 ? `$${parseFloat(shippingFee).toLocaleString()}` : 'Free'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-charcoal-soft">Tax</span>
                                        <span className="font-medium text-charcoal">${parseFloat(tax).toLocaleString()}</span>
                                    </div>
                                    <div className="border-t border-charcoal/10 pt-4 flex justify-between">
                                        <span className="font-serif text-lg text-charcoal">Total</span>
                                        <span className="font-bold text-lg text-charcoal">${parseFloat(total).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping & Payment Details */}
                            <div className="bg-white rounded-2xl border border-charcoal/10 p-6 space-y-6">
                                <div>
                                    <h3 className="font-serif text-lg text-charcoal mb-3">Shipping Info</h3>
                                    {order.shipping_address || order.shippingAddress ? (
                                        <div className="text-sm text-charcoal-soft space-y-1">
                                            <p className="font-bold text-charcoal">
                                                {order.shipping_address?.name || order.shippingAddress?.name || 'Receiver'}
                                            </p>
                                            <p>{order.shipping_address?.address || order.shippingAddress?.address}</p>
                                            <p>
                                                {order.shipping_address?.city || order.shippingAddress?.city},{' '}
                                                {order.shipping_address?.state || order.shippingAddress?.state}{' '}
                                                {order.shipping_address?.postal_code || order.shippingAddress?.postal_code || order.shipping_address?.zip || order.shippingAddress?.zip}
                                            </p>
                                            <p>{order.shipping_address?.country || order.shippingAddress?.country || 'NGA'}</p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-charcoal-soft italic">No shipping address recorded</p>
                                    )}
                                </div>

                                <div className="border-t border-charcoal/10 pt-6">
                                    <h3 className="font-serif text-lg text-charcoal mb-3">Payment Details</h3>
                                    <div className="text-sm text-charcoal-soft space-y-2">
                                        <div>
                                            <span className="block text-xs font-semibold text-charcoal-soft">Method</span>
                                            <span className="text-charcoal font-medium">
                                                {order.payment_method?.toUpperCase() || 'PAYSTACK'}
                                            </span>
                                        </div>
                                        {order.payment_status && (
                                            <div>
                                                <span className="block text-xs font-semibold text-charcoal-soft">Payment Status</span>
                                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold border mt-0.5 ${
                                                    order.payment_status === 'paid' 
                                                        ? 'bg-green-50 text-green-700 border-green-200' 
                                                        : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                                }`}>
                                                    {order.payment_status.toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                        {order.reference && (
                                            <div>
                                                <span className="block text-xs font-semibold text-charcoal-soft">Reference</span>
                                                <span className="font-mono text-xs truncate block max-w-full" title={order.reference}>
                                                    {order.reference}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionReveal>

            <GalleryFooter />
        </div>
    )
}
