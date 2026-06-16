import { useParams } from 'react-router-dom'
import GalleryNavbar from '../../components/layout/GalleryNavbar'
import GalleryFooter from '../../components/layout/GalleryFooter'
import ArtworkCard from '../../components/artwork/ArtworkCard'
import { useCollection } from '../../hooks/useCollection'
import Spinner from '../../components/ui/Spinner'
import ErrorMessage from '../../components/ui/ErrorMessage'
import SectionReveal from '../../components/ui/SectionReveal'

export default function CollectionDetail() {
    const { id } = useParams()
    const { data: collection, isLoading, isError, error, refetch } = useCollection(id)

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
                    <ErrorMessage message={error?.message || 'Failed to load collection'} onRetry={refetch} />
                </div>
                <GalleryFooter />
            </div>
        )
    }

    // Mock data fallback
    const collectionData = collection || {
        id,
        title: 'Afrofuturism Rising',
        description: 'A curated selection exploring the intersection of African heritage and speculative futures. This collection brings together artists who imagine new worlds while honoring ancestral wisdom, creating visual narratives that challenge our perception of time, identity, and possibility.',
        curator: 'Amara Okafor',
        curatorBio: 'Amara Okafor is a Lagos-based curator and art historian specializing in contemporary African art and digital aesthetics.',
        curatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        artworkCount: 24,
        coverImage: 'https://images.unsplash.com/photo-1578926288207-a90a5366a2b6?w=1200&q=80',
        createdAt: '2024-01-15',
        artworks: [
            {
                id: '1',
                title: 'Ancestral Echoes',
                price: 3800,
                image: 'https://images.unsplash.com/photo-1578926288207-a90a5366a2b6?w=400&q=80',
                artist: 'Kola Bankole',
                country: 'Nigeria',
                countryCode: 'NG',
                badge: 'NEW'
            },
            {
                id: '2',
                title: "The Elder's Gaze",
                price: 4200,
                image: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=400&q=80',
                artist: 'Amina Keita',
                country: 'Senegal',
                countryCode: 'SN'
            },
            {
                id: '3',
                title: 'Orún Rising',
                price: 6500,
                image: 'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=400&q=80',
                artist: 'Kola Bankole',
                country: 'Nigeria',
                countryCode: 'NG',
                badge: 'LIMITED'
            },
            {
                id: '4',
                title: 'Lagos at Twilight',
                price: 2900,
                image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80',
                artist: 'Thandiwe Nkosi',
                country: 'South Africa',
                countryCode: 'ZA'
            },
            {
                id: '5',
                title: 'Digital Diaspora',
                price: 5200,
                image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&q=80',
                artist: 'David Mensah',
                country: 'Ghana',
                countryCode: 'GH'
            },
            {
                id: '6',
                title: 'Threads of Time',
                price: 3600,
                image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=400&q=80',
                artist: 'Amina Keita',
                country: 'Senegal',
                countryCode: 'SN',
                badge: 'SOLD'
            },
            {
                id: '7',
                title: 'Urban Mythology',
                price: 4800,
                image: 'https://images.unsplash.com/photo-1520420097861-e4959843b682?w=400&q=80',
                artist: 'Chinedu Okonkwo',
                country: 'Nigeria',
                countryCode: 'NG'
            },
            {
                id: '8',
                title: 'Quantum Heritage',
                price: 7200,
                image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&q=80',
                artist: 'Thandiwe Nkosi',
                country: 'South Africa',
                countryCode: 'ZA',
                badge: 'LIMITED'
            }
        ]
    }

    return (
        <div className="min-h-screen bg-cream">
            <GalleryNavbar />

            {/* Hero Section */}
            <section className="relative h-[350px] sm:h-[420px] md:h-[500px] bg-charcoal overflow-hidden">
                <img
                    src={collectionData.coverImage}
                    alt={collectionData.title}
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-8 pb-8 sm:pb-10 md:pb-12">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-terracotta text-white text-[10px] sm:text-xs font-medium mb-3 sm:mb-4">
                            COLLECTION
                        </div>
                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-3 sm:mb-4">
                            {collectionData.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-white/80 text-xs sm:text-sm">
                            <span>Curated by {collectionData.curator}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{collectionData.artworkCount} artworks</span>
                            <span className="hidden md:inline">•</span>
                            <span className="hidden md:inline">Created {new Date(collectionData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </section>

            <SectionReveal>
                {/* About Section */}
                <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8 bg-white border-b border-charcoal/10">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-8 sm:gap-10 md:gap-12">
                            {/* Description */}
                            <div>
                                <h2 className="font-serif text-xl sm:text-2xl text-charcoal mb-3 sm:mb-4">About This Collection</h2>
                                <p className="text-sm sm:text-base text-charcoal-soft leading-relaxed">
                                    {collectionData.description}
                                </p>
                            </div>

                            {/* Curator Info */}
                            <div className="bg-cream rounded-2xl p-5 sm:p-6 border border-charcoal/10 h-fit">
                                <h3 className="text-xs sm:text-sm font-semibold text-charcoal-soft uppercase tracking-wide mb-3 sm:mb-4">
                                    Curator
                                </h3>
                                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                    <img
                                        src={collectionData.curatorAvatar}
                                        alt={collectionData.curator}
                                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-sm sm:text-base font-semibold text-charcoal">{collectionData.curator}</p>
                                        <p className="text-xs sm:text-sm text-charcoal-soft">Curator & Art Historian</p>
                                    </div>
                                </div>
                                <p className="text-xs sm:text-sm text-charcoal-soft leading-relaxed">
                                    {collectionData.curatorBio}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionReveal>

            <SectionReveal>
                {/* Artworks Grid */}
                <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="flex items-center justify-between mb-6 sm:mb-8">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-1 h-6 sm:h-8 bg-terracotta rounded-full" />
                                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal">Artworks</h2>
                            </div>
                            <p className="text-xs sm:text-sm text-charcoal-soft">
                                {collectionData.artworks?.length || 0} {collectionData.artworks?.length === 1 ? 'piece' : 'pieces'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                            {collectionData.artworks?.map(artwork => (
                                <ArtworkCard key={artwork.id} artwork={artwork} />
                            ))}
                        </div>
                    </div>
                </section>
            </SectionReveal>

            <GalleryFooter />
        </div>
    )
}
