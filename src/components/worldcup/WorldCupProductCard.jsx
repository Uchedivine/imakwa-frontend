import { Link } from 'react-router-dom'
import { isProductSoldOut, formatPriceRange, getActiveTierCount } from '../../utils/worldcup'

export default function WorldCupProductCard({ product }) {
    const soldOut = isProductSoldOut(product)
    const priceRange = formatPriceRange(product)
    const tierCount = product.tiers?.length || 0
    const activeTierCount = getActiveTierCount(product)

    return (
        <Link
            to={`/worldcup/products/${product.id}`}
            className="group relative rounded-2xl bg-white border border-charcoal/10 hover:border-[#C5A665]/40 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full"
        >
            {/* Product Image */}
            <div className="relative w-full h-56 bg-gradient-to-br from-[#0A2619] to-[#051A0F] overflow-hidden">
                {/* Mesh Pattern Background */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 L20 0 M0 0 L20 20' fill='none' stroke='%23C5A665' stroke-width='0.75'/%3E%3C/svg%3E")`,
                        backgroundSize: '20px 20px',
                    }}
                />

                {/* Country Flag Emoji - Large Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl opacity-90 transform group-hover:scale-110 transition-transform duration-300">
                        {product.flag_emoji || '⚽'}
                    </span>
                </div>

                {/* Sold Out Badge */}
                {soldOut && (
                    <div className="absolute top-3 right-3 px-3 py-1.5 bg-red-500/90 backdrop-blur-sm rounded-full">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                            Sold Out
                        </span>
                    </div>
                )}

                {/* Tier Count Badge */}
                {!soldOut && tierCount > 0 && (
                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-[#C5A665]/90 backdrop-blur-sm rounded-full">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A2215]">
                            {tierCount} {tierCount === 1 ? 'Tier' : 'Tiers'}
                        </span>
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                    {/* Country Name */}
                    <h3 className="font-serif text-2xl text-charcoal font-semibold mb-2 group-hover:text-[#C5A665] transition-colors">
                        {product.name}
                    </h3>

                    {/* Description */}
                    {product.description && (
                        <p className="text-[13px] text-charcoal-soft leading-relaxed mb-4 line-clamp-2">
                            {product.description}
                        </p>
                    )}
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-charcoal/5">
                    {/* Price Range */}
                    <div>
                        <p className="text-[10px] font-bold text-charcoal/50 uppercase tracking-wider mb-1">
                            Price Range
                        </p>
                        <p className="text-lg font-bold font-serif text-charcoal">
                            {priceRange}
                        </p>
                    </div>

                    {/* View Link Arrow */}
                    <div className="w-10 h-10 rounded-full bg-[#C5A665]/10 group-hover:bg-[#C5A665] flex items-center justify-center transition-all">
                        <svg
                            className="w-5 h-5 text-[#C5A665] group-hover:text-white transition-colors"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </div>
                </div>

                {/* Status Badge */}
                {!soldOut && activeTierCount < tierCount && (
                    <div className="mt-3">
                        <span className="inline-block px-2.5 py-1 bg-amber-500/10 text-amber-700 text-[10px] font-semibold uppercase tracking-wider rounded">
                            Limited Availability
                        </span>
                    </div>
                )}
            </div>
        </Link>
    )
}
