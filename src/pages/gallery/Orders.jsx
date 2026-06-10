import { Link } from 'react-router-dom'
import GalleryNavbar from '../../components/layout/GalleryNavbar'
import GalleryFooter from '../../components/layout/GalleryFooter'
import Spinner from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'

// Mock orders data - in real app, this would come from useOrders hook
const mockOrders = [
    {
        id: 'ORD-2024-001',
        date: '2024-01-15',
        status: 'delivered',
        total: 4200,
        items: [
            {
                id: '1',
                title: "The Elder's Gaze",
                artist: 'Kola Bankole',
                price: 4200,
                image: 'https://images.unsplash.com/photo-1578926288207-a90a5366a2b6?w=400&q=80',
                quantity: 1
            }
        ]
    },
    {
        id: 'ORD-2024-002',
        date: '2024-01-10',
        status: 'shipped',
        total: 7800,
        items: [
            {
                id: '2',
                title: 'Ancestral Echoes',
                artist: 'Adaeze Okonkwo',
                price: 3800,
                image: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=400&q=80',
                quantity: 1
            },
            {
                id: '3',
                title: 'Desert Whispers',
                artist: 'Musa Ibrahim',
                price: 4000,
                image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
                quantity: 1
            }
        ]
    }
]

const statusConfig = {
    processing: { label: 'Processing', color: 'bg-yellow-100 text-yellow-700', icon: '⏳' },
    shipped: { label: 'Shipped', color: 'bg-blue-100 text-blue-700', icon: '🚚' },
    delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700', icon: '✓' },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: '✕' }
}

export default function Orders() {
    const isLoading = false
    const orders = mockOrders

    return (
        <div className="min-h-screen bg-cream">
            <GalleryNavbar />

            <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="font-serif text-4xl text-charcoal mb-2">Your Orders</h1>
                    <p className="text-charcoal-soft">View and track your artwork purchases</p>
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Spinner size="lg" />
                    </div>
                ) : orders.length === 0 ? (
                    /* Empty State */
                    <EmptyState
                        title="No orders yet"
                        description="Start building your collection by browsing our curated artworks"
                        action={{
                            label: 'Browse Collection',
                            onClick: () => { },
                            to: '/browse'
                        }}
                    />
                ) : (
                    /* Orders List */
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-2xl border border-charcoal/10 overflow-hidden">
                                {/* Order Header */}
                                <div className="px-6 py-4 bg-charcoal/5 border-b border-charcoal/10 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex flex-wrap items-center gap-4 text-sm">
                                        <div>
                                            <span className="text-charcoal-soft">Order #</span>
                                            <span className="font-bold text-charcoal ml-2">{order.id}</span>
                                        </div>
                                        <div>
                                            <span className="text-charcoal-soft">Placed on</span>
                                            <span className="text-charcoal ml-2">
                                                {new Date(order.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-charcoal-soft">Total</span>
                                            <span className="font-bold text-charcoal ml-2">
                                                ${order.total.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${statusConfig[order.status].color}`}>
                                        <span>{statusConfig[order.status].icon}</span>
                                        {statusConfig[order.status].label}
                                    </span>
                                </div>

                                {/* Order Items */}
                                <div className="p-6 space-y-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex gap-4 pb-4 border-b border-charcoal/10 last:border-0">
                                            <Link
                                                to={`/artwork/${item.id}`}
                                                className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0"
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </Link>

                                            <div className="flex-1 min-w-0">
                                                <Link
                                                    to={`/artwork/${item.id}`}
                                                    className="block"
                                                >
                                                    <h3 className="font-serif text-lg text-charcoal mb-1 hover:text-terracotta transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-sm text-charcoal-soft mb-2">
                                                        by {item.artist}
                                                    </p>
                                                </Link>

                                                <div className="flex items-center gap-4">
                                                    <p className="text-sm text-charcoal-soft">
                                                        Quantity: {item.quantity}
                                                    </p>
                                                    <p className="text-sm font-semibold text-charcoal">
                                                        ${item.price.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Item Actions */}
                                            <div className="flex flex-col gap-2">
                                                <Link
                                                    to={`/artwork/${item.id}`}
                                                    className="px-4 py-2 text-xs font-medium text-charcoal border border-charcoal/20 rounded-full hover:bg-charcoal/5 transition-colors text-center"
                                                >
                                                    View Item
                                                </Link>
                                                <button className="px-4 py-2 text-xs font-medium text-charcoal border border-charcoal/20 rounded-full hover:bg-charcoal/5 transition-colors">
                                                    Buy Again
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Footer */}
                                <div className="px-6 py-4 bg-charcoal/5 border-t border-charcoal/10 flex flex-wrap items-center justify-between gap-4">
                                    {order.status === 'shipped' && (
                                        <button className="text-sm font-medium text-terracotta hover:text-terra-light">
                                            Track Shipment →
                                        </button>
                                    )}
                                    {order.status === 'delivered' && (
                                        <button className="text-sm font-medium text-terracotta hover:text-terra-light">
                                            Leave a Review →
                                        </button>
                                    )}
                                    <Link
                                        to={`/orders/${order.id}`}
                                        className="text-sm font-medium text-charcoal-soft hover:text-charcoal ml-auto"
                                    >
                                        View Details →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <GalleryFooter />
        </div>
    )
}
