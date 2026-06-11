import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import WorldCupNavbar from '../../components/layout/WorldCupNavbar'
import WorldCupFooter from '../../components/layout/WorldCupFooter'
import CountdownBanner from '../../components/worldcup/CountdownBanner'
import WorldCupProductCard from '../../components/worldcup/WorldCupProductCard'
import { useWorldCupProducts } from '../../hooks/useWorldCupProducts'
import { SkeletonGrid } from '../../components/ui/SkeletonCard'
import ErrorMessage from '../../components/ui/ErrorMessage'
import EmptyState from '../../components/ui/EmptyState'
import { isProductSoldOut, getActiveTierCount } from '../../utils/worldcup'

const tierFilters = [
    { value: 'all', label: 'All Tiers' },
    { value: 'I', label: 'Tier I' },
    { value: 'II', label: 'Tier II' },
    { value: 'III', label: 'Tier III' },
    { value: 'IV', label: 'Tier IV' },
]

const sortOptions = [
    { value: 'name-asc', label: 'Name: A-Z' },
    { value: 'name-desc', label: 'Name: Z-A' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
]

export default function WorldCupProducts() {
    const [searchParams, setSearchParams] = useSearchParams()
    const { data: products, isLoading, isError, error, refetch } = useWorldCupProducts()

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Get filters from URL
    const tierFilter = searchParams.get('tier') || 'all'
    const sortBy = searchParams.get('sort') || 'name-asc'

    const updateFilter = (key, value) => {
        const newParams = new URLSearchParams(searchParams)
        if (value === 'all' || !value) {
            newParams.delete(key)
        } else {
            newParams.set(key, value)
        }
        setSearchParams(newParams)
    }

    const clearFilters = () => {
        setSearchParams({})
    }

    // Filter products by tier
    const filteredProducts = products?.filter((product) => {
        if (tierFilter === 'all') return true
        // Check if product has at least one active tier of the selected type
        return product.tiers?.some(
            (tier) => tier.tier === tierFilter && tier.available_licenses > 0
        )
    }) || []

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'name-asc':
                return a.name.localeCompare(b.name)
            case 'name-desc':
                return b.name.localeCompare(a.name)
            case 'price-asc': {
                const aMin = Math.min(...a.tiers.map(t => t.price))
                const bMin = Math.min(...b.tiers.map(t => t.price))
                return aMin - bMin
            }
            case 'price-desc': {
                const aMax = Math.max(...a.tiers.map(t => t.price))
                const bMax = Math.max(...b.tiers.map(t => t.price))
                return bMax - aMax
            }
            default:
                return 0
        }
    })

    const hasActiveFilters = tierFilter !== 'all'
    const totalCount = sortedProducts.length

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <WorldCupNavbar />

            {/* Countdown Banner */}
            <CountdownBanner />

            {/* Hero Header */}
            <section
                className="relative py-16 sm:py-20 px-6 md:px-8 overflow-hidden"
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

                <div className="relative z-10 max-w-[1400px] mx-auto">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A665] mb-4">
                        THE DIGITAL COLLECTION
                    </p>
                    <h1 className="font-serif text-[3rem] sm:text-[4rem] md:text-[5rem] font-normal leading-tight mb-4 text-white">
                        Browse <span className="italic text-[#C5A665]">Products</span>
                    </h1>
                    <p className="text-[15px] leading-relaxed text-[#8DA094] max-w-2xl">
                        Explore our complete catalogue of World Cup 2026 digital products — luxury wallpapers, hosting kits, ambient displays, and commercial licenses.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    {/* Left: Count + Filters */}
                    <div className="flex items-center gap-4 flex-wrap">
                        <p className="text-sm text-charcoal-soft">
                            {isLoading ? 'Loading...' : `${totalCount} ${totalCount === 1 ? 'product' : 'products'}`}
                        </p>

                        {/* Tier Filter Pills */}
                        <div className="flex items-center gap-2 flex-wrap">
                            {tierFilters.map((filter) => (
                                <button
                                    key={filter.value}
                                    onClick={() => updateFilter('tier', filter.value)}
                                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${tierFilter === filter.value
                                            ? 'bg-[#C5A665] text-white shadow-md'
                                            : 'bg-white border border-charcoal/10 text-charcoal-soft hover:border-[#C5A665]/40'
                                        }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>

                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-xs text-terracotta hover:text-terra-light font-medium"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>

                    {/* Right: Sort Dropdown */}
                    <select
                        value={sortBy}
                        onChange={(e) => updateFilter('sort', e.target.value)}
                        className="px-4 py-2 bg-white border border-charcoal/10 rounded-full text-sm focus:outline-none focus:border-[#C5A665]"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Products Grid */}
                {isLoading ? (
                    <SkeletonGrid count={8} />
                ) : isError ? (
                    <ErrorMessage
                        message={error?.message || 'Failed to load products'}
                        onRetry={refetch}
                    />
                ) : sortedProducts.length === 0 ? (
                    <EmptyState
                        title="No products found"
                        description="Try adjusting your tier filter"
                        action={hasActiveFilters ? { label: 'Clear filters', onClick: clearFilters } : null}
                    />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {sortedProducts.map((product) => (
                            <WorldCupProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>

            <WorldCupFooter />
        </div>
    )
}
