import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import GalleryNavbar from '../../components/layout/GalleryNavbar'
import GalleryFooter from '../../components/layout/GalleryFooter'
import ArtworkCard from '../../components/artwork/ArtworkCard'
import { useArtworks } from '../../hooks/useArtworks'
import { SkeletonGrid } from '../../components/ui/SkeletonCard'
import ErrorMessage from '../../components/ui/ErrorMessage'
import EmptyState from '../../components/ui/EmptyState'
import { useSearchFilters } from '../../hooks/useSearchFilters'
import SectionReveal from '../../components/ui/SectionReveal'

const categories = [
    { value: 'all', label: 'All Works' },
    { value: 'paintings', label: 'Paintings' },
    { value: 'sculpture', label: 'Sculpture' },
    { value: 'digital', label: 'Digital Art' },
    { value: 'textiles', label: 'Textiles' },
    { value: 'photography', label: 'Photography' }
]

const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' }
]

const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-1000', label: 'Under $1,000' },
    { value: '1000-5000', label: '$1,000 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '10000+', label: '$10,000+' }
]

const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'west-africa', label: 'West Africa' },
    { value: 'east-africa', label: 'East Africa' },
    { value: 'southern-africa', label: 'Southern Africa' },
    { value: 'central-africa', label: 'Central Africa' },
    { value: 'north-africa', label: 'North Africa' }
]

export default function GalleryBrowse() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const { data: filtersData } = useSearchFilters()

    const toLabel = (str) => {
        if (!str) return ''
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }

    const displayedCategories = filtersData?.categories && filtersData.categories.length > 0
        ? [
            { value: 'all', label: 'All Works' },
            ...filtersData.categories.map(cat => ({
                value: cat,
                label: toLabel(cat)
            }))
        ]
        : categories

    const displayedRegions = filtersData?.regions && filtersData.regions.length > 0
        ? [
            { value: 'all', label: 'All Regions' },
            ...filtersData.regions.map(reg => ({
                value: reg,
                label: toLabel(reg)
            }))
        ]
        : regions

    // Prevent body scroll when mobile filter drawer is open
    useEffect(() => {
        if (mobileFiltersOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [mobileFiltersOpen])

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Get filters from URL params
    const category = searchParams.get('category') || 'all'
    const sortBy = searchParams.get('sort') || 'featured'
    const priceRange = searchParams.get('price') || 'all'
    const region = searchParams.get('region') || 'all'
    const searchQuery = searchParams.get('q') || ''

    // Build API query params
    const apiParams = {}
    if (category !== 'all') apiParams.category = category
    if (sortBy !== 'featured') apiParams.sort = sortBy
    if (priceRange !== 'all') apiParams.priceRange = priceRange
    if (region !== 'all') apiParams.region = region
    if (searchQuery) apiParams.q = searchQuery

    const { data, isLoading, isError, error, refetch } = useArtworks(apiParams)
    const artworks = data?.data || []
    const totalCount = data?.total || 0

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

    const hasActiveFilters = category !== 'all' || priceRange !== 'all' || region !== 'all' || searchQuery

    return (
        <div className="min-h-screen bg-cream">
            <GalleryNavbar />

            {/* Hero Header */}
            <section className="bg-[#1C1915] text-white py-16 sm:py-20">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8">
                    <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#D4AF37] mb-4">
                        THE GALLERY
                    </p>
                    <h1 className="font-serif text-[3rem] sm:text-[4rem] md:text-[5rem] font-normal leading-tight mb-4">
                        Browse <span className="italic text-[#D4AF37]">Collection</span>
                    </h1>
                    <p className="text-[15px] leading-relaxed text-gray-400 max-w-2xl">
                        Discover {totalCount.toLocaleString()}+ authenticated African artworks from master artists across the continent
                    </p>
                </div>
            </section>

            <SectionReveal>
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Sidebar Filters - Desktop */}
                        <aside className="hidden lg:block w-64 shrink-0">
                            <div className="sticky top-24">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-sm font-bold text-charcoal">FILTERS</h3>
                                    {hasActiveFilters && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-xs text-terracotta hover:text-terra-light"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>

                                {/* Category Filter */}
                                <div className="mb-8">
                                    <h4 className="text-xs font-bold text-charcoal mb-3">CATEGORY</h4>
                                    <div className="space-y-2">
                                        {displayedCategories.map(cat => (
                                            <label key={cat.value} className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    checked={category === cat.value}
                                                    onChange={() => updateFilter('category', cat.value)}
                                                    className="w-4 h-4 text-terracotta focus:ring-terracotta"
                                                />
                                                <span className="ml-2 text-sm text-charcoal-soft">{cat.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range Filter */}
                                <div className="mb-8">
                                    <h4 className="text-xs font-bold text-charcoal mb-3">PRICE RANGE</h4>
                                    <div className="space-y-2">
                                        {priceRanges.map(range => (
                                            <label key={range.value} className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="price"
                                                    checked={priceRange === range.value}
                                                    onChange={() => updateFilter('price', range.value)}
                                                    className="w-4 h-4 text-terracotta focus:ring-terracotta"
                                                />
                                                <span className="ml-2 text-sm text-charcoal-soft">{range.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Region Filter */}
                                <div className="mb-8">
                                    <h4 className="text-xs font-bold text-charcoal mb-3">REGION</h4>
                                    <div className="space-y-2">
                                        {displayedRegions.map(reg => (
                                            <label key={reg.value} className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="region"
                                                    checked={region === reg.value}
                                                    onChange={() => updateFilter('region', reg.value)}
                                                    className="w-4 h-4 text-terracotta focus:ring-terracotta"
                                                />
                                                <span className="ml-2 text-sm text-charcoal-soft">{reg.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Mobile Filter Drawer */}
                        {mobileFiltersOpen && (
                            <div className="fixed inset-0 z-50 lg:hidden">
                                {/* Backdrop */}
                                <div
                                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                                    onClick={() => setMobileFiltersOpen(false)}
                                />

                                {/* Drawer Panel */}
                                <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden flex flex-col">
                                    {/* Header */}
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal/10 shrink-0">
                                        <h3 className="font-bold text-charcoal text-lg">Filters</h3>
                                        <button
                                            onClick={() => setMobileFiltersOpen(false)}
                                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-charcoal/5 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Filter Content */}
                                    <div className="flex-1 overflow-y-auto px-6 py-6">
                                        {/* Clear All Button */}
                                        {hasActiveFilters && (
                                            <button
                                                onClick={() => {
                                                    clearFilters()
                                                    setMobileFiltersOpen(false)
                                                }}
                                                className="w-full mb-6 py-2.5 px-4 bg-terracotta/10 text-terracotta rounded-full text-sm font-medium hover:bg-terracotta/20 transition-colors"
                                            >
                                                Clear All Filters
                                            </button>
                                        )}

                                        {/* Category Filter */}
                                        <div className="mb-8">
                                            <h4 className="text-xs font-bold text-charcoal mb-4 tracking-wider">CATEGORY</h4>
                                            <div className="space-y-3">
                                                {displayedCategories.map(cat => (
                                                    <label key={cat.value} className="flex items-center cursor-pointer group">
                                                        <input
                                                            type="radio"
                                                            name="mobile-category"
                                                            checked={category === cat.value}
                                                            onChange={() => updateFilter('category', cat.value)}
                                                            className="w-5 h-5 text-terracotta focus:ring-terracotta focus:ring-offset-0"
                                                        />
                                                        <span className={`ml-3 text-base transition-colors ${category === cat.value ? 'text-charcoal font-medium' : 'text-charcoal-soft group-hover:text-charcoal'}`}>
                                                            {cat.label}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Price Range Filter */}
                                        <div className="mb-8">
                                            <h4 className="text-xs font-bold text-charcoal mb-4 tracking-wider">PRICE RANGE</h4>
                                            <div className="space-y-3">
                                                {priceRanges.map(range => (
                                                    <label key={range.value} className="flex items-center cursor-pointer group">
                                                        <input
                                                            type="radio"
                                                            name="mobile-price"
                                                            checked={priceRange === range.value}
                                                            onChange={() => updateFilter('price', range.value)}
                                                            className="w-5 h-5 text-terracotta focus:ring-terracotta focus:ring-offset-0"
                                                        />
                                                        <span className={`ml-3 text-base transition-colors ${priceRange === range.value ? 'text-charcoal font-medium' : 'text-charcoal-soft group-hover:text-charcoal'}`}>
                                                            {range.label}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Region Filter */}
                                        <div className="mb-8">
                                            <h4 className="text-xs font-bold text-charcoal mb-4 tracking-wider">REGION</h4>
                                            <div className="space-y-3">
                                                {displayedRegions.map(reg => (
                                                    <label key={reg.value} className="flex items-center cursor-pointer group">
                                                        <input
                                                            type="radio"
                                                            name="mobile-region"
                                                            checked={region === reg.value}
                                                            onChange={() => updateFilter('region', reg.value)}
                                                            className="w-5 h-5 text-terracotta focus:ring-terracotta focus:ring-offset-0"
                                                        />
                                                        <span className={`ml-3 text-base transition-colors ${region === reg.value ? 'text-charcoal font-medium' : 'text-charcoal-soft group-hover:text-charcoal'}`}>
                                                            {reg.label}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer with Apply Button */}
                                    <div className="px-6 py-4 border-t border-charcoal/10 bg-white shrink-0">
                                        <button
                                            onClick={() => setMobileFiltersOpen(false)}
                                            className="w-full py-3.5 bg-terracotta text-white rounded-full font-medium hover:bg-terra-light transition-colors"
                                        >
                                            Show {totalCount.toLocaleString()} Results
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Main Content */}
                        <main className="flex-1 min-w-0">
                            {/* Mobile Filter Button */}
                            <div className="lg:hidden mb-6">
                                <button
                                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                                    className="w-full py-3 px-4 bg-white border border-charcoal/10 rounded-xl text-sm font-medium text-charcoal flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                    Filters {hasActiveFilters && `(${[category !== 'all', priceRange !== 'all', region !== 'all'].filter(Boolean).length})`}
                                </button>
                            </div>

                            {/* Toolbar */}
                            <div className="flex items-center justify-between mb-8">
                                <p className="text-sm text-charcoal-soft">
                                    {isLoading ? 'Loading...' : `${totalCount.toLocaleString()} artworks`}
                                </p>

                                <select
                                    value={sortBy}
                                    onChange={(e) => updateFilter('sort', e.target.value)}
                                    className="px-4 py-2 bg-white border border-charcoal/10 rounded-full text-sm focus:outline-none focus:border-terracotta"
                                >
                                    {sortOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Results */}
                            {isLoading ? (
                                <SkeletonGrid count={12} />
                            ) : isError ? (
                                <ErrorMessage message={error?.message || 'Failed to load artworks'} onRetry={refetch} />
                            ) : artworks.length === 0 ? (
                                <EmptyState
                                    title="No artworks found"
                                    description="Try adjusting your filters or search terms"
                                    action={{ label: 'Clear filters', onClick: clearFilters }}
                                />
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {artworks.map(artwork => (
                                        <ArtworkCard key={artwork.id} artwork={artwork} />
                                    ))}
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </SectionReveal>

            <GalleryFooter />
        </div>
    )
}
