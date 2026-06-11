import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import GalleryNavbar from '../../components/layout/GalleryNavbar'
import GalleryFooter from '../../components/layout/GalleryFooter'
import ArtworkCard from '../../components/artwork/ArtworkCard'
import { useArtist } from '../../hooks/useArtist'
import Spinner from '../../components/ui/Spinner'
import ErrorMessage from '../../components/ui/ErrorMessage'
import SectionReveal from '../../components/ui/SectionReveal'

export default function ArtistDetail() {
    const { id } = useParams()
    const { data: artist, isLoading, isError, error, refetch } = useArtist(id)
    const [activeTab, setActiveTab] = useState('artworks') // 'artworks' | 'about' | 'exhibitions'

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
                    <ErrorMessage message={error?.message || 'Failed to load artist'} onRetry={refetch} />
                </div>
                <GalleryFooter />
            </div>
        )
    }

    // Mock data
    const artistData = artist || {
        id,
        name: 'Kola Bankole',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
        coverImage: 'https://images.unsplash.com/photo-1578926288207-a90a5366a2b6?w=1200&q=80',
        bio: 'Born in Abeokuta in 1988, Kola Bankole is one of the most compelling voices in contemporary African painting. His work weaves Yoruba cosmology with Afrofuturist imagination — ancient myths rendered in bold, saturated strokes that command attention from across any gallery floor.',
        location: 'Lagos, Nigeria',
        country: 'Nigeria',
        countryCode: 'NG',
        since: 2010,
        specialties: ['Oil Painting', 'Mixed Media', 'Afrofuturism'],
        awards: [
            { year: 2024, title: "Dak'Art Biennale Grand Prize" },
            { year: 2022, title: 'ArtX Prize Winner' },
            { year: 2020, title: 'Lagos Biennale Recognition' }
        ],
        exhibitions: [
            { year: 2024, title: 'Futures Past', location: 'Lagos, Nigeria' },
            { year: 2023, title: 'African Visions', location: 'London, UK' },
            { year: 2022, title: 'Contemporary Masters', location: 'São Paulo, Brazil' }
        ],
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
                artist: 'Kola Bankole',
                country: 'Nigeria',
                countryCode: 'NG'
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
                artist: 'Kola Bankole',
                country: 'Nigeria',
                countryCode: 'NG'
            }
        ]
    }

    return (
        <div className="min-h-screen bg-cream">
            <GalleryNavbar />

            {/* Hero Section */}
            <div className="relative h-[400px] bg-charcoal">
                <img
                    src={artistData.coverImage}
                    alt={artistData.name}
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
            </div>

            {/* Artist Profile */}
            <SectionReveal>
                <div className="max-w-[1200px] mx-auto px-6 md:px-8 -mt-20 relative z-10">
                    <div className="flex flex-col md:flex-row gap-8 mb-12">
                        {/* Avatar */}
                        <div className="shrink-0">
                            <img
                                src={artistData.avatar}
                                alt={artistData.name}
                                className="w-40 h-40 rounded-2xl object-cover border-4 border-cream shadow-lg"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 border border-charcoal/10">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="font-serif text-4xl text-charcoal mb-2">{artistData.name}</h1>
                                    <p className="text-charcoal-soft flex items-center gap-2">
                                        <span className="text-lg">{artistData.countryCode}</span>
                                        {artistData.location}
                                    </p>
                                </div>
                                <button className="px-6 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terra-light transition-colors">
                                    Follow Artist
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-6 text-sm mb-4">
                                <div>
                                    <span className="text-charcoal-soft">Active Since</span>
                                    <p className="font-semibold text-charcoal">{artistData.since}</p>
                                </div>
                                <div>
                                    <span className="text-charcoal-soft">Artworks</span>
                                    <p className="font-semibold text-charcoal">{artistData.artworks.length}</p>
                                </div>
                                <div>
                                    <span className="text-charcoal-soft">Awards</span>
                                    <p className="font-semibold text-charcoal">{artistData.awards.length}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {artistData.specialties.map(specialty => (
                                    <span key={specialty} className="px-3 py-1 rounded-full bg-terra-pale text-terracotta text-xs font-medium">
                                        {specialty}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-charcoal/10 mb-8">
                        <div className="flex gap-8">
                            <button
                                onClick={() => setActiveTab('artworks')}
                                className={`pb-4 text-sm font-medium transition-colors ${activeTab === 'artworks'
                                    ? 'text-terracotta border-b-2 border-terracotta'
                                    : 'text-charcoal-soft hover:text-charcoal'
                                    }`}
                            >
                                Artworks ({artistData.artworks.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('about')}
                                className={`pb-4 text-sm font-medium transition-colors ${activeTab === 'about'
                                    ? 'text-terracotta border-b-2 border-terracotta'
                                    : 'text-charcoal-soft hover:text-charcoal'
                                    }`}
                            >
                                About
                            </button>
                            <button
                                onClick={() => setActiveTab('exhibitions')}
                                className={`pb-4 text-sm font-medium transition-colors ${activeTab === 'exhibitions'
                                    ? 'text-terracotta border-b-2 border-terracotta'
                                    : 'text-charcoal-soft hover:text-charcoal'
                                    }`}
                            >
                                Exhibitions
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'artworks' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {artistData.artworks.map(artwork => (
                                <ArtworkCard key={artwork.id} artwork={artwork} />
                            ))}
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div className="max-w-3xl mb-12">
                            <div className="bg-white rounded-2xl p-8 border border-charcoal/10 mb-8">
                                <h2 className="text-xl font-bold text-charcoal mb-4">Biography</h2>
                                <p className="text-charcoal-soft leading-relaxed mb-6">{artistData.bio}</p>
                                <p className="text-charcoal-soft leading-relaxed">
                                    A graduate of the Yaba College of Technology and a 2024 Dak'Art Grand Prize winner,
                                    Kola has exhibited across Lagos, London, and São Paulo. His practice asks: what does it
                                    mean to carry the past into an unwritten future?
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 border border-charcoal/10">
                                <h2 className="text-xl font-bold text-charcoal mb-4">Awards & Recognition</h2>
                                <div className="space-y-3">
                                    {artistData.awards.map((award, index) => (
                                        <div key={index} className="flex gap-4 pb-3 border-b border-charcoal/10 last:border-0">
                                            <span className="text-sm font-bold text-terracotta">{award.year}</span>
                                            <span className="text-sm text-charcoal">{award.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'exhibitions' && (
                        <div className="max-w-3xl mb-12">
                            <div className="bg-white rounded-2xl p-8 border border-charcoal/10">
                                <h2 className="text-xl font-bold text-charcoal mb-6">Exhibitions</h2>
                                <div className="space-y-4">
                                    {artistData.exhibitions.map((exhibition, index) => (
                                        <div key={index} className="flex gap-4 pb-4 border-b border-charcoal/10 last:border-0">
                                            <span className="text-sm font-bold text-terracotta w-16">{exhibition.year}</span>
                                            <div>
                                                <p className="text-sm font-medium text-charcoal">{exhibition.title}</p>
                                                <p className="text-xs text-charcoal-soft">{exhibition.location}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </SectionReveal>

            <GalleryFooter />
        </div>
    )
}
