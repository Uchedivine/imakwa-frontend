import { Link } from 'react-router-dom'
import GalleryNavbar from '../../components/layout/GalleryNavbar'
import GalleryFooter from '../../components/layout/GalleryFooter'
import { useCollections } from '../../hooks/useCollections'
import Spinner from '../../components/ui/Spinner'
import ErrorMessage from '../../components/ui/ErrorMessage'

export default function Collections() {
    const { data: collections, isLoading, isError, error, refetch } = useCollections()

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
                    <ErrorMessage message={error?.message || 'Failed to load collections'} onRetry={refetch} />
                </div>
                <GalleryFooter />
            </div>
        )
    }

    // Mock data fallback
    const collectionsData = collections?.data || [
        {
            id: '1',
            title: 'Afrofuturism Rising',
            description: 'A curated selection exploring the intersection of African heritage and speculative futures',
            curator: 'Amara Okafor',
            artworkCount: 24,
            coverImage: 'https://images.unsplash.com/photo-1578926288207-a90a5366a2b6?w=800&q=80',
            featured: true
        },
        {
            id: '2',
            title: 'Contemporary Masters',
            description: 'Established artists redefining African contemporary art on the global stage',
            curator: 'David Mensah',
            artworkCount: 18,
            coverImage: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=800&q=80',
            featured: true
        },
        {
            id: '3',
            title: 'Emerging Voices',
            description: 'Fresh perspectives from the next generation of African artists',
            curator: 'Grace Ndlovu',
            artworkCount: 32,
            coverImage: 'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=800&q=80'
        },
        {
            id: '4',
            title: 'Heritage & Identity',
            description: 'Works celebrating cultural traditions and personal narratives',
            curator: 'Kwame Asante',
            artworkCount: 21,
            coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80'
        },
        {
            id: '5',
            title: 'Urban Landscapes',
            description: 'Artistic interpretations of African cities and metropolitan life',
            curator: 'Fatima Hassan',
            artworkCount: 16,
            coverImage: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80'
        },
        {
            id: '6',
            title: 'Abstract Expressions',
            description: 'Bold explorations in color, form, and texture',
            curator: 'Samuel Adeyemi',
            artworkCount: 27,
            coverImage: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80'
        }
    ]

    const featuredCollections = collectionsData.filter(c => c.featured)
    const otherCollections = collectionsData.filter(c => !c.featured)

    return (
        <div className="min-h-screen bg-cream">
            <GalleryNavbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 md:px-8">
                <div className="max-w-[1200px] mx-auto">
                    <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">
                        Curated Collections
                    </h1>
                    <p className="text-charcoal-soft text-lg max-w-2xl">
                        Thoughtfully assembled selections that tell stories, spark dialogue, and celebrate the diversity of African art
                    </p>
                </div>
            </section>

            {/* Featured Collections */}
            {featuredCollections.length > 0 && (
                <section className="pb-16 px-6 md:px-8">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1 h-8 bg-terracotta rounded-full" />
                            <h2 className="font-serif text-3xl text-charcoal">Featured</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {featuredCollections.map(collection => (
                                <Link
                                    key={collection.id}
                                    to={`/collections/${collection.id}`}
                                    className="group relative overflow-hidden rounded-2xl bg-white border border-charcoal/10 hover:shadow-xl transition-shadow"
                                >
                                    <div className="relative h-80 overflow-hidden">
                                        <img
                                            src={collection.coverImage}
                                            alt={collection.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-80" />

                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                            <div className="inline-block px-3 py-1 rounded-full bg-terracotta text-xs font-medium mb-3">
                                                FEATURED
                                            </div>
                                            <h3 className="font-serif text-2xl mb-2">{collection.title}</h3>
                                            <p className="text-white/80 text-sm mb-4 line-clamp-2">{collection.description}</p>
                                            <div className="flex items-center gap-4 text-xs text-white/70">
                                                <span>Curated by {collection.curator}</span>
                                                <span>•</span>
                                                <span>{collection.artworkCount} artworks</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* All Collections */}
            <section className="pb-24 px-6 md:px-8">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1 h-8 bg-terracotta rounded-full" />
                        <h2 className="font-serif text-3xl text-charcoal">All Collections</h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherCollections.map(collection => (
                            <Link
                                key={collection.id}
                                to={`/collections/${collection.id}`}
                                className="group relative overflow-hidden rounded-2xl bg-white border border-charcoal/10 hover:shadow-lg transition-shadow"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={collection.coverImage}
                                        alt={collection.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />

                                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                        <h3 className="font-serif text-xl mb-2">{collection.title}</h3>
                                        <p className="text-white/70 text-sm mb-3 line-clamp-2">{collection.description}</p>
                                        <div className="flex items-center gap-3 text-xs text-white/60">
                                            <span>{collection.curator}</span>
                                            <span>•</span>
                                            <span>{collection.artworkCount} works</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <GalleryFooter />
        </div>
    )
}
