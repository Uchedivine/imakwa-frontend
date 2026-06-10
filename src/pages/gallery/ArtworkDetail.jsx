import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import GalleryNavbar from '../../components/layout/GalleryNavbar'
import GalleryFooter from '../../components/layout/GalleryFooter'
import { useArtwork } from '../../hooks/useArtwork'
import { useCartStore } from '../../store/cartStore'
import Spinner from '../../components/ui/Spinner'
import ErrorMessage from '../../components/ui/ErrorMessage'

export default function ArtworkDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: artwork, isLoading, isError, error, refetch } = useArtwork(id)
    const { addItem } = useCartStore()

    const [selectedImage, setSelectedImage] = useState(0)
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [cartState, setCartState] = useState('idle') // 'idle' | 'loading' | 'added'

    const handleAddToCart = () => {
        if (cartState !== 'idle') return
        setCartState('loading')

        setTimeout(() => {
            setCartState('added')
            setTimeout(() => setCartState('idle'), 2500)
        }, 800)
    }

    // Helper to get art data after it's defined
    const addToCartWithData = (artData) => {
        addItem({
            id: artData.id,
            title: artData.title,
            artist: artData.artist.name,
            price: artData.price,
            image: artData.images[0],
            quantity: 1
        })
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-cream">
                <GalleryNavbar />
                <div className="max-w-4xl mx-auto px-6 py-20">
                    <ErrorMessage message={error?.message || 'Failed to load artwork'} onRetry={refetch} />
                </div>
                <GalleryFooter />
            </div>
        )
    }

    // Mock data if API doesn't return yet
    const art = artwork || {
        id,
        title: "The Elder's Gaze",
        artist: {
            name: 'Kola Bankole',
            bio: 'Master painter from Lagos, Nigeria',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80'
        },
        price: 4200,
        images: [
            'https://images.unsplash.com/photo-1578926288207-a90a5366a2b6?w=800&q=80',
            'https://images.unsplash.com/photo-1561059488-916d69792237?w=800&q=80',
            'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=800&q=80'
        ],
        description: 'A powerful portrait capturing the wisdom and strength of African elderhood. Oil on canvas with rich, layered textures that bring depth and emotion to every brushstroke.',
        medium: 'Oil on Canvas',
        dimensions: '48" × 60" (122cm × 152cm)',
        year: 2024,
        country: 'Nigeria',
        countryCode: 'NG',
        region: 'West Africa',
        category: 'Paintings',
        tags: ['Portrait', 'Contemporary', 'Afrofuturism'],
        certificate: true,
        framed: true,
        signed: true,
        edition: 'Original (1/1)',
        stock: 1
    }

    return (
        <div className="min-h-screen bg-cream">
            <GalleryNavbar />

            <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-8 md:py-12">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-charcoal-soft mb-8">
                    <Link to="/" className="hover:text-terracotta">Home</Link>
                    <span>/</span>
                    <Link to="/browse" className="hover:text-terracotta">Browse</Link>
                    <span>/</span>
                    <span className="text-charcoal">{art.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left: Image Gallery */}
                    <div>
                        {/* Main Image */}
                        <div className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-[4/5] mb-4">
                            <img
                                src={art.images[selectedImage]}
                                alt={art.title}
                                className="w-full h-full object-cover"
                            />
                            {art.badge && (
                                <div className="absolute top-4 left-4">
                                    <span className="inline-block px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase bg-terracotta text-white">
                                        {art.badge}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {art.images.length > 1 && (
                            <div className="flex gap-3">
                                {art.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`rounded-xl overflow-hidden w-20 h-20 border-2 transition-all ${selectedImage === index ? 'border-terracotta' : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Details */}
                    <div>
                        <p className="text-xs font-bold tracking-[0.15em] uppercase text-terracotta mb-3">
                            {art.countryCode} {art.country} • {art.region}
                        </p>

                        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
                            {art.title}
                        </h1>

                        {/* Artist */}
                        <Link to={`/artists/${art.artist.name}`} className="flex items-center gap-3 mb-8 group">
                            <img
                                src={art.artist.avatar}
                                alt={art.artist.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-sm font-medium text-charcoal group-hover:text-terracotta transition-colors">
                                    {art.artist.name}
                                </p>
                                <p className="text-xs text-charcoal-soft">{art.artist.bio}</p>
                            </div>
                        </Link>

                        {/* Price */}
                        <div className="mb-8 pb-8 border-b border-charcoal/10">
                            <p className="text-xs text-charcoal-soft mb-2">Price</p>
                            <p className="font-serif text-4xl text-charcoal">${art.price.toLocaleString()}</p>
                            <p className="text-xs text-charcoal-soft mt-2">Free shipping worldwide • Secure payment</p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-3 mb-8">
                            <button
                                onClick={() => {
                                    addToCartWithData(art)
                                    handleAddToCart()
                                }}
                                disabled={cartState !== 'idle' || art.stock === 0}
                                className={`flex-1 py-4 rounded-full text-sm font-medium transition-all ${cartState === 'added'
                                    ? 'bg-green-700 text-white'
                                    : art.stock === 0
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-terracotta text-white hover:bg-terra-light'
                                    }`}
                            >
                                {art.stock === 0 ? 'Sold Out' : cartState === 'idle' ? 'Add to Cart' : cartState === 'loading' ? 'Adding...' : '✓ Added'}
                            </button>

                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${isWishlisted ? 'border-terracotta bg-terracotta/10' : 'border-charcoal/10 hover:border-terracotta'
                                    }`}
                            >
                                <svg
                                    className={`w-5 h-5 ${isWishlisted ? 'fill-terracotta stroke-terracotta' : 'fill-none stroke-charcoal'}`}
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </button>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-charcoal mb-3">ABOUT THIS WORK</h3>
                            <p className="text-sm leading-relaxed text-charcoal-soft">{art.description}</p>
                        </div>

                        {/* Specifications */}
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-charcoal mb-4">SPECIFICATIONS</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-charcoal-soft mb-1">Medium</p>
                                    <p className="text-sm text-charcoal">{art.medium}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-charcoal-soft mb-1">Dimensions</p>
                                    <p className="text-sm text-charcoal">{art.dimensions}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-charcoal-soft mb-1">Year</p>
                                    <p className="text-sm text-charcoal">{art.year}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-charcoal-soft mb-1">Edition</p>
                                    <p className="text-sm text-charcoal">{art.edition}</p>
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-charcoal mb-4">INCLUDES</h3>
                            <div className="space-y-2">
                                {art.certificate && (
                                    <div className="flex items-center gap-2 text-sm text-charcoal-soft">
                                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Certificate of Authenticity</span>
                                    </div>
                                )}
                                {art.signed && (
                                    <div className="flex items-center gap-2 text-sm text-charcoal-soft">
                                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Signed by Artist</span>
                                    </div>
                                )}
                                {art.framed && (
                                    <div className="flex items-center gap-2 text-sm text-charcoal-soft">
                                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Professional Framing</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tags */}
                        {art.tags && art.tags.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold text-charcoal mb-3">TAGS</h3>
                                <div className="flex flex-wrap gap-2">
                                    {art.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-terra-pale text-terracotta text-xs font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <GalleryFooter />
        </div>
    )
}
