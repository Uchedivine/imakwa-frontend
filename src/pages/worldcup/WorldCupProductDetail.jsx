import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import WorldCupNavbar from '../../components/layout/WorldCupNavbar'
import WorldCupFooter from '../../components/layout/WorldCupFooter'
import CountdownBanner from '../../components/worldcup/CountdownBanner'
import ProductTierCard from '../../components/worldcup/ProductTierCard'
import CheckoutModal from '../../components/worldcup/CheckoutModal'
import Spinner from '../../components/ui/Spinner'
import ErrorMessage from '../../components/ui/ErrorMessage'
import SectionReveal from '../../components/ui/SectionReveal'
import { useWorldCupProduct } from '../../hooks/useWorldCupProduct'
import { isProductSoldOut } from '../../utils/worldcup'

// TIER_DISPLAY matching the home page (Roman numeral keys)
const TIER_DISPLAY = {
    'I': {
        tierBadge: 'TIER I',
        btnStyle: 'bg-[#111111] text-white hover:bg-black',
        highlight: false,
        previewType: 'smart-device',
        pricePeriod: 'one-time',
        features: [
            '32 x 4K Wallpapers (3840×2180px)',
            '240 custom app icons (iOS & Android)',
            '12 Samsung Galaxy Watch faces',
            '12 Apple Watch complications',
            'Personal use license, lifetime access',
        ],
    },
    'II': {
        tierBadge: 'TIER II',
        btnStyle: 'bg-[#111111] text-white hover:bg-black',
        highlight: false,
        previewType: 'hosting-kit',
        pricePeriod: 'one-time',
        features: [
            '18 viewing party invitation templates',
            '8 luxury digital menu designs (Canva)',
            '40 social media post & story templates',
            'Fully customizable in free Canva account',
            'Personal + small event commercial use',
        ],
    },
    'III': {
        tierBadge: 'TIER III · MOST POPULAR',
        btnStyle: 'bg-[#C5A665] text-[#0A2215] hover:bg-[#D4B77A]',
        highlight: true,
        previewType: 'ambient-vault',
        pricePeriod: 'one-time',
        features: [
            '24 × 8K files (7680×4320px, 16:9)',
            'Samsung Frame TV optimized (.MATTE format)',
            '12 × 4K portrait files (residential display)',
            'TIFF + JPEG source files included',
            'Residential unlimited display license',
            'All 32 World Cup match artworks',
        ],
    },
    'IV': {
        tierBadge: 'TIER IV · B2B',
        btnStyle: 'bg-[#0B2217] text-white hover:bg-black',
        highlight: false,
        previewType: 'b2b-license',
        pricePeriod: 'per venue / season',
        features: [
            'Commercial display license (1 venue)',
            'Full 8K resolution commercial files',
            'Streaming rights for public projection',
            'Custom co-branding option available',
            'Dedicated licensing certificate + PDF',
            'Priority account contact (48h response)',
        ],
    },
}

export default function WorldCupProductDetail() {
    const { id } = useParams()
    const { data: product, isLoading, isError, error, refetch } = useWorldCupProduct(id)
    const [selectedTier, setSelectedTier] = useState(null)
    const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)

    const handlePurchase = (tier) => {
        setSelectedTier(tier)
        setCheckoutModalOpen(true)
    }

    const handleCloseCheckout = () => {
        setCheckoutModalOpen(false)
        setSelectedTier(null)
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
                <Spinner size="lg" className="text-[#C5A665]" />
            </div>
        )
    }

    // Error state
    if (isError) {
        return (
            <div className="min-h-screen bg-[#FDFBF7]">
                <WorldCupNavbar />
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-20">
                    <ErrorMessage
                        message={error?.message || 'Failed to load product'}
                        onRetry={refetch}
                    />
                </div>
                <WorldCupFooter />
            </div>
        )
    }

    // 404 - Product not found
    if (!product) {
        return <Navigate to="/worldcup/products" replace />
    }

    const soldOut = isProductSoldOut(product)
    const isClosed = product.is_open === false

    // Map API tiers to ProductTierCard format
    const mappedTiers = product.tiers?.map((tier) => ({
        tierId: tier.id,
        id: tier.id,
        name: tier.label,
        description: tier.description,
        price: tier.price,
        currency: tier.currency,
        statusBadge: tier.is_sold_out
            ? '✦ Sold Out'
            : `✦ ${tier.available_licenses} licenses remaining`,
        btnText: tier.is_sold_out
            ? 'SOLD OUT'
            : `DOWNLOAD NOW — $${tier.price.toLocaleString()}`,
        isSoldOut: tier.is_sold_out,
        ...TIER_DISPLAY[tier.tier],
    })) || []

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <WorldCupNavbar />

            {/* Countdown Banner */}
            <CountdownBanner />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-charcoal/5 py-4 px-6 md:px-8">
                <div className="max-w-[1400px] mx-auto">
                    <nav className="flex items-center gap-2 text-sm text-charcoal-soft">
                        <Link
                            to="/worldcup"
                            className="hover:text-[#C5A665] transition-colors"
                        >
                            World Cup
                        </Link>
                        <span>→</span>
                        <Link
                            to="/worldcup/products"
                            className="hover:text-[#C5A665] transition-colors"
                        >
                            Products
                        </Link>
                        <span>→</span>
                        <span className="text-charcoal font-medium">{product.name}</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <section
                className="relative py-16 px-6 md:px-8 overflow-hidden"
                style={{
                    background: 'radial-gradient(circle at center, #124E31 0%, #051A0F 100%)',
                }}
            >
                {/* Mesh Pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 L40 0 M0 0 L40 40' fill='none' stroke='rgba(197,166,101,0.07)' stroke-width='0.75'/%3E%3C/svg%3E")`,
                        backgroundSize: '40px 40px',
                    }}
                />

                <div className="relative z-10 max-w-[1400px] mx-auto text-center">
                    {/* Large Flag Emoji */}
                    <div className="mb-6">
                        <span className="text-8xl">{product.flag_emoji || '⚽'}</span>
                    </div>

                    {/* Product Name */}
                    <h1 className="font-serif text-[3rem] sm:text-[4rem] md:text-[5rem] font-normal leading-tight mb-4 text-white">
                        {product.name}
                    </h1>

                    {/* Description */}
                    {product.description && (
                        <p className="text-[15px] leading-relaxed text-[#8DA094] max-w-2xl mx-auto">
                            {product.description}
                        </p>
                    )}
                </div>
            </section>

            {/* Tiers Section */}
            <SectionReveal>
                <section className="py-16 px-6 md:px-8">
                    <div className="max-w-[1400px] mx-auto">
                        {/* Closed Collection Banner */}
                        {isClosed && (
                            <div className="mb-12 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                                <div className="flex items-start gap-3">
                                    <svg
                                        className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                    <div>
                                        <h3 className="font-bold text-red-800 mb-1">
                                            Collection No Longer Available
                                        </h3>
                                        <p className="text-sm text-red-700">
                                            This product collection has been closed and is no longer available for purchase.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Section Header */}
                        {!isClosed && (
                            <div className="text-center mb-12">
                                <span className="text-[10px] font-bold tracking-[0.2em] text-[#C1623F] uppercase mb-4 block">
                                    AVAILABLE TIERS
                                </span>
                                <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
                                    Choose Your <span className="italic text-[#C1623F]">License</span>
                                </h2>
                                <p className="text-charcoal-soft text-sm max-w-2xl mx-auto">
                                    Select the tier that best fits your needs. All purchases include instant download and lifetime access.
                                </p>
                            </div>
                        )}

                        {/* Tiers Grid */}
                        {!isClosed && mappedTiers.length > 0 && (
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                                {mappedTiers.map((tier) => (
                                    <ProductTierCard
                                        key={tier.id}
                                        tier={tier}
                                        onPurchase={handlePurchase}
                                    />
                                ))}
                            </div>
                        )}

                        {/* No Tiers Available */}
                        {!isClosed && mappedTiers.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-charcoal-soft text-sm">
                                    No tiers are currently available for this product.
                                </p>
                            </div>
                        )}

                        {/* Back to Products Link */}
                        <div className="text-center mt-12">
                            <Link
                                to="/worldcup/products"
                                className="inline-flex items-center gap-2 text-sm text-[#C5A665] hover:text-[#D4B77A] font-medium transition-colors"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                                Back to All Products
                            </Link>
                        </div>
                    </div>
                </section>
            </SectionReveal>

            <WorldCupFooter />

            {/* Checkout Modal */}
            <CheckoutModal
                isOpen={checkoutModalOpen}
                onClose={handleCloseCheckout}
                selectedTier={selectedTier}
            />
        </div>
    )
}
