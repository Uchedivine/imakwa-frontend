import { useCart } from '../../hooks/useCart'
import { useFavorites } from '../../hooks/useFavorites'

export default function ArtworkCard({ artwork }) {
    const { addToCart, isAddingToCart } = useCart()
    const { isFavorited, toggle: toggleFavorite } = useFavorites()

    const favorited = isFavorited(artwork.id)

    const handleAddToCart = () => {
        addToCart(artwork)
    }

    return (
        <div className="bg-white rounded-3xl border border-[#EBEBEB] p-3 group transition-all hover:shadow-sm">
            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] mb-4 bg-gray-100">
                <img
                    src={artwork.image}
                    alt={artwork.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                />

                {/* Badge */}
                {artwork.badge && (
                    <div className="absolute top-3 left-3">
                        <span className="inline-block px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.1em] uppercase bg-[#2C7A74] text-white">
                            {artwork.badge}
                        </span>
                    </div>
                )}

                {/* Wishlist button */}
                <button
                    onClick={() => toggleFavorite(artwork.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white"
                >
                    <svg
                        className={`w-3.5 h-3.5 ${favorited ? 'fill-[#C25E36] stroke-[#C25E36]' : 'fill-none stroke-gray-900'}`}
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>
            </div>

            {/* Card info */}
            <div className="px-1 pb-1">
                <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#C25E36] mb-1.5">
                    {artwork.countryCode} {artwork.country}
                </p>

                <h3 className="font-serif text-[17px] text-gray-900 leading-tight mb-0.5">
                    {artwork.title}
                </h3>

                <p className="text-[12px] text-gray-500 mb-4">
                    by {artwork.artist}
                </p>

                <div className="flex items-center justify-between">
                    <span className="font-sans text-[17px] font-semibold text-gray-900">
                        ${artwork.price.toLocaleString()}
                    </span>

                    <button
                        onClick={handleAddToCart}
                        disabled={isAddingToCart}
                        className={`flex items-center justify-center min-w-[105px] h-[34px] px-4 text-[11px] font-medium rounded-full transition-all duration-300 bg-[#1A1A1A] text-white hover:bg-gray-800 ${isAddingToCart ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isAddingToCart ? (
                            <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : '+ Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    )
}