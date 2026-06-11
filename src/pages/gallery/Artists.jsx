import { Link } from 'react-router-dom'
import GalleryNavbar from '../../components/layout/GalleryNavbar'
import GalleryFooter from '../../components/layout/GalleryFooter'
import { useArtists } from '../../hooks/useArtists'
import Spinner from '../../components/ui/Spinner'
import ErrorMessage from '../../components/ui/ErrorMessage'
import SectionReveal from '../../components/ui/SectionReveal'

export default function Artists() {
    const { data: artists, isLoading, isError, error, refetch } = useArtists()

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
                    <ErrorMessage message={error?.message || 'Failed to load artists'} onRetry={refetch} />
                </div>
                <GalleryFooter />
            </div>
        )
    }

    // Mock data fallback
    const artistsData = artists?.data || [
        {
            id: '1',
            name: 'Kola Bankole',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
            coverImage: 'https://images.unsplash.com/photo-1578926288207-a90a5366a2b6?w=800&q=80',
            location: 'Lagos, Nigeria',
            country: 'Nigeria',
            countryCode: 'NG',
            specialties: ['Oil Painting', 'Afrofuturism'],
            artworkCount: 24,
            featured: true
        },
        {
            id: '2',
            name: 'Amina Keita',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
            coverImage: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=800&q=80',
            location: 'Dakar, Senegal',
            country: 'Senegal',
            countryCode: 'SN',
            specialties: ['Textile Art', 'Mixed Media'],
            artworkCount: 18,
            featured: true
        },
        {
            id: '3',
            name: 'Thandiwe Nkosi',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
            coverImage: 'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=800&q=80',
            location: 'Cape Town, South Africa',
            country: 'South Africa',
            countryCode: 'ZA',
            specialties: ['Photography', 'Digital Art'],
            artworkCount: 32,
            featured: true
        },
        {
            id: '4',
            name: 'David Mensah',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
            coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80',
            location: 'Accra, Ghana',
            country: 'Ghana',
            countryCode: 'GH',
            specialties: ['Sculpture', 'Installation'],
            artworkCount: 15
        },
        {
            id: '5',
            name: 'Fatima Hassan',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
            coverImage: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80',
            location: 'Cairo, Egypt',
            country: 'Egypt',
            countryCode: 'EG',
            specialties: ['Calligraphy', 'Abstract'],
            artworkCount: 21
        },
        {
            id: '6',
            name: 'Chinedu Okonkwo',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
            coverImage: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80',
            location: 'Enugu, Nigeria',
            country: 'Nigeria',
            countryCode: 'NG',
            specialties: ['Contemporary', 'Portraiture'],
            artworkCount: 27
        },
        {
            id: '7',
            name: 'Aisha Diallo',
            avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80',
            coverImage: 'https://images.unsplash.com/photo-1520420097861-e4959843b682?w=800&q=80',
            location: 'Bamako, Mali',
            country: 'Mali',
            countryCode: 'ML',
            specialties: ['Traditional', 'Textiles'],
            artworkCount: 19
        },
        {
            id: '8',
            name: 'Samuel Adeyemi',
            avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80',
            coverImage: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80',
            location: 'Ibadan, Nigeria',
            country: 'Nigeria',
            countryCode: 'NG',
            specialties: ['Abstract', 'Expressionism'],
            artworkCount: 30
        }
    ]

    const featuredArtists = artistsData.filter(a => a.featured)
    const otherArtists = artistsData.filter(a => !a.featured)

    return (
        <div className="min-h-screen bg-cream">
            <GalleryNavbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 md:px-8">
                <div className="max-w-[1200px] mx-auto">
                    <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">
                        Meet Our Artists
                    </h1>
                    <p className="text-charcoal-soft text-lg max-w-2xl">
                        Discover the creative minds behind the masterworks. Each artist brings their unique vision,
                        cultural heritage, and contemporary perspective to the canvas.
                    </p>
                </div>
            </section>

            {/* Featured Artists */}
            {featuredArtists.length > 0 && (
                <SectionReveal>
                    <section className="pb-16 px-6 md:px-8">
                        <div className="max-w-[1200px] mx-auto">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1 h-8 bg-terracotta rounded-full" />
                                <h2 className="font-serif text-3xl text-charcoal">Featured Artists</h2>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                {featuredArtists.map(artist => (
                                    <Link
                                        key={artist.id}
                                        to={`/artists/${artist.id}`}
                                        className="group"
                                    >
                                        <div className="relative overflow-hidden rounded-2xl bg-white border border-charcoal/10 hover:shadow-xl transition-shadow">
                                            {/* Cover Image */}
                                            <div className="relative h-64 overflow-hidden">
                                                <img
                                                    src={artist.coverImage || artist.cover_image || artist.banner || 'https://images.unsplash.com/photo-1578926288207-a90a5366a2b6?w=800&q=80'}
                                                    alt={artist.name || artist.display_name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                                            </div>

                                            {/* Avatar - Overlapping */}
                                            <div className="relative px-6 pb-6">
                                                <div className="absolute -top-12 left-6">
                                                    <img
                                                        src={artist.avatar || artist.profile_image || artist.image || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80'}
                                                        alt={artist.name || artist.display_name}
                                                        className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className="pt-14">
                                                    <h3 className="font-serif text-2xl text-charcoal mb-2">
                                                        {artist.name || artist.display_name || 'Artist'}
                                                    </h3>
                                                    <p className="text-sm text-charcoal-soft mb-3 flex items-center gap-2">
                                                        <span className="text-base">{artist.countryCode || artist.country_code || ''}</span>
                                                        {artist.location || artist.country || ''}
                                                    </p>

                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {artist.specialties?.map(specialty => (
                                                            <span
                                                                key={specialty}
                                                                className="px-2.5 py-1 rounded-full bg-terra-pale text-terracotta text-xs font-medium"
                                                            >
                                                                {specialty}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <p className="text-xs text-charcoal-soft">
                                                        {artist.artworkCount || artist.artwork_count || artist.artworks_count || 0} {(artist.artworkCount || artist.artwork_count || 0) === 1 ? 'artwork' : 'artworks'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                </SectionReveal>
            )}

            <SectionReveal>
                {/* All Artists */}
                <section className="pb-24 px-6 md:px-8">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1 h-8 bg-terracotta rounded-full" />
                            <h2 className="font-serif text-3xl text-charcoal">All Artists</h2>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {otherArtists.map(artist => (
                                <Link
                                    key={artist.id}
                                    to={`/artists/${artist.id}`}
                                    className="group bg-white rounded-2xl border border-charcoal/10 overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    {/* Avatar */}
                                    <div className="relative h-48 overflow-hidden bg-cream">
                                        <img
                                            src={artist.avatar || artist.profile_image || artist.image || 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80'}
                                            alt={artist.name || artist.display_name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="font-serif text-xl text-charcoal mb-1">
                                            {artist.name || artist.display_name || 'Artist'}
                                        </h3>
                                        <p className="text-xs text-charcoal-soft mb-3 flex items-center gap-1.5">
                                            <span className="text-sm">{artist.countryCode || artist.country_code || ''}</span>
                                            {artist.location || artist.country || ''}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {artist.specialties?.slice(0, 2).map(specialty => (
                                                <span
                                                    key={specialty}
                                                    className="px-2 py-0.5 rounded-full bg-terra-pale text-terracotta text-[10px] font-medium"
                                                >
                                                    {specialty}
                                                </span>
                                            ))}
                                        </div>

                                        <p className="text-xs text-charcoal-soft">
                                            {artist.artworkCount || artist.artwork_count || artist.artworks_count || 0} works
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </SectionReveal>

            <GalleryFooter />
        </div>
    )
}
