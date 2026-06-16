import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useFavorites } from '../../hooks/useFavorites'
import { parsePrice } from '../../lib/utils'

export default function ArtworkCard({ artwork }) {
    const [cartState, setCartState] = useState('idle') // 'idle' | 'loading' | 'added'
    const { addToCart } = useCart()
    const { isFavorited, toggle: toggleFavorite } = useFavorites()

    // Validate artwork data
    if (!artwork || !artwork.id) {
        console.error('❌ [ARTWORK CARD] Invalid artwork data:', artwork)
        return null
    }

    // ========================================
    // PHASE 1: Status-based availability checks
    // ========================================
    const isAvailable = artwork.status === 'available' && artwork.is_active !== false
    const isSold = artwork.status === 'sold'
    const isReserved = artwork.status === 'reserved'
    const isUnavailable = artwork.is_active === false

    // ========================================
    // PHASE 2: Inventory checks (future enhancement)
    // ========================================
    const hasInventory = artwork.stock_quantity !== undefined && artwork.stock_quantity !== null
    const isOutOfStock = hasInventory && (
        artwork.stock_available === 0 ||
        artwork.status === 'out_of_stock'
    )
    const isLowStock = hasInventory &&
        artwork.stock_available > 0 &&
        artwork.stock_available <= 3

    // ========================================
    // Button Configuration Logic
    // ========================================
    const getButtonConfig = () => {
        // Priority order: unavailable > sold/out of stock > reserved > available
        if (isUnavailable) {
            return {
                text: 'Unavailable',
                className: 'btn-unavailable',
                icon: '🚫',
                disabled: true,
            }
        }

        if (isSold || isOutOfStock) {
            return {
                text: 'Sold',
                className: 'btn-sold',
                icon: '✓',
                disabled: true,
            }
        }

        if (isReserved) {
            return {
                text: 'Reserved',
                className: 'btn-reserved',
                icon: '🔒',
                disabled: true,
            }
        }

        if (isAvailable) {
            return {
                text: 'Add to Cart',
                className: 'btn-add-to-cart',
                icon: '+',
                disabled: false,
            }
        }

        // Fallback
        return {
            text: 'Unavailable',
            className: 'btn-unavailable',
            icon: '🚫',
            disabled: true,
        }
    }

    const buttonConfig = getButtonConfig()

    // Helper function to get the artwork image
    const getArtworkImage = () => {
        // If images array exists, find primary or use first image
        if (artwork.images && Array.isArray(artwork.images) && artwork.images.length > 0) {
            const primaryImage = artwork.images.find(img => img.is_primary === 1 || img.is_primary === true)
            return primaryImage ? primaryImage.url : artwork.images[0].url
        }
        // Fallback to direct image field or placeholder
        return artwork.image || artwork.primary_image?.url || 'https://images.unsplash.com/photo-1578926288207-a90a5366a2b6?w=400&q=80'
    }

    const artworkImage = getArtworkImage()

    const handleAddToCart = (e) => {
        e.preventDefault()

        if (buttonConfig.disabled || cartState !== 'idle') return

        console.log('🛒 [ARTWORK CARD] Add to cart clicked:', {
            artworkId: artwork.id,
            title: artwork.title,
            price: artwork.price,
            parsedPrice: parsePrice(artwork.price),
            status: artwork.status,
            isAvailable
        })

        setCartState('loading')

        // Add to cart via backend
        addToCart({
            id: artwork.id,
            title: artwork.title,
            artist: artwork.artist?.display_name || artwork.artist?.name || artwork.artist,
            price: parsePrice(artwork.price),
            image: artworkImage,
            quantity: 1
        })

        setTimeout(() => {
            setCartState('added')

            setTimeout(() => {
                setCartState('idle')
            }, 2500)
        }, 800)
    }

    return (
        <div className="bg-white rounded-3xl border border-[#EBEBEB] p-3 group transition-all hover:shadow-sm">
            {/* Image container */}
            <Link to={`/artwork/${artwork.id}`} className="block relative rounded-2xl overflow-hidden aspect-[4/5] mb-4 bg-gray-100">
                <img
                    src={artworkImage}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                />

                {/* Status Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                    {/* Out of Stock Badge */}
                    {isOutOfStock && (
                        <span className="inline-block px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.1em] uppercase bg-red-500 text-white">
                            Out of Stock
                        </span>
                    )}

                    {/* Low Stock Badge */}
                    {isLowStock && !isOutOfStock && (
                        <span className="inline-block px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.1em] uppercase bg-yellow-500 text-white">
                            Only {artwork.stock_available} left
                        </span>
                    )}

                    {/* Sold Badge */}
                    {isSold && !hasInventory && (
                        <span className="inline-block px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.1em] uppercase bg-gray-500 text-white">
                            ✓ Sold
                        </span>
                    )}

                    {/* Reserved Badge */}
                    {isReserved && (
                        <span className="inline-block px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.1em] uppercase bg-yellow-500 text-gray-900">
                            🔒 Reserved
                        </span>
                    )}

                    {/* Featured Badge */}
                    {artwork.badge && (
                        <span className="inline-block px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.1em] uppercase bg-[#2C7A74] text-white">
                            {artwork.badge}
                        </span>
                    )}
                </div>

                {/* Wishlist button */}
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        toggleFavorite(artwork.id)
                    }}
                    className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white"
                >
                    <svg
                        className={`w-3.5 h-3.5 ${isFavorited(artwork.id) ? 'fill-[#C25E36] stroke-[#C25E36]' : 'fill-none stroke-gray-900'}`}
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>
            </Link>

            {/* Card info */}
            <Link to={`/artwork/${artwork.id}`} className="block px-1 pb-1">
                <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#C25E36] mb-1.5">
                    {artwork.countryCode || ''} {artwork.country || ''}
                </p>

                <h3 className="font-serif text-[17px] text-gray-900 leading-tight mb-0.5">
                    {artwork.title || 'Untitled'}
                </h3>

                <p className="text-[12px] text-gray-500 mb-4">
                    by {
                        typeof artwork.artist === 'object'
                            ? (artwork.artist?.display_name || artwork.artist?.name || artwork.artist_name || 'Unknown Artist')
                            : (artwork.artist || artwork.artist_name || 'Unknown Artist')
                    }
                </p>

                <div className="flex items-center justify-between gap-3">
                    <div>
                        <span className="font-sans text-[17px] font-semibold text-gray-900 block">
                            ${(artwork.price || 0).toLocaleString()}
                        </span>
                        {/* Stock Info (Phase 2) */}
                        {hasInventory && isAvailable && (
                            <span className="text-[10px] text-gray-500">
                                {artwork.stock_available} available
                            </span>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={buttonConfig.disabled || cartState !== 'idle'}
                        className={`flex items-center justify-center min-w-[105px] h-[34px] px-4 text-[11px] font-medium rounded-full transition-all duration-300 ${buttonConfig.disabled
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                : cartState === 'added'
                                    ? 'bg-green-700 text-white'
                                    : 'bg-[#1A1A1A] text-white hover:bg-gray-800'
                            }`}
                    >
                        {cartState === 'loading' ? (
                            <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : cartState === 'added' ? (
                            <>
                                <span className="mr-1">{buttonConfig.icon}</span>
                                <span>Added</span>
                            </>
                        ) : (
                            <>
                                <span className="mr-1">{buttonConfig.icon}</span>
                                <span>{buttonConfig.text}</span>
                            </>
                        )}
                    </button>
                </div>
            </Link>
        </div>
    )
}