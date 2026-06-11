import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import GalleryNavbar from '../../components/layout/GalleryNavbar'
import GalleryFooter from '../../components/layout/GalleryFooter'
import ArtworkCard from '../../components/artwork/ArtworkCard'
import { useFavoritesStore } from '../../store/favoritesStore'
import { useAuthStore } from '../../store/authStore'
import { getFavorites } from '../../api/favorites'
import { SkeletonGrid } from '../../components/ui/SkeletonCard'
import ErrorMessage from '../../components/ui/ErrorMessage'
import EmptyState from '../../components/ui/EmptyState'
import SectionReveal from '../../components/ui/SectionReveal'

export default function Favorites() {
    const { isAuthenticated } = useAuthStore()
    const { favorites: favoriteIds, setFavorites } = useFavoritesStore()

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Fetch favorite artworks from server
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['favorites'],
        queryFn: getFavorites,
        enabled: isAuthenticated,
    })

    // Update local store when data changes
    useEffect(() => {
        if (data && Array.isArray(data)) {
            setFavorites(data.map((f) => f.favoriteable_id || f.id))
        }
    }, [data, setFavorites])

    const favoriteArtworks = data || []

    return (
        <div className="min-h-screen bg-cream">
            <GalleryNavbar />

            {/* Hero Header */}
            <section className="bg-[#1C1915] text-white py-16 sm:py-20">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8">
                    <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#D4AF37] mb-4">
                        MY COLLECTION
                    </p>
                    <h1 className="font-serif text-[3rem] sm:text-[4rem] md:text-[5rem] font-normal leading-tight mb-4">
                        Your <span className="italic text-[#D4AF37]">Favorites</span>
                    </h1>
                    <p className="text-[15px] leading-relaxed text-gray-400 max-w-2xl">
                        Artworks you've saved for later — ready to add to your collection
                    </p>
                </div>
            </section>

            <SectionReveal>
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 sm:py-16">

                    {!isAuthenticated ? (
                        <EmptyState
                            title="Sign in to view favorites"
                            description="Create an account to save artworks and build your collection"
                            action={{
                                label: 'Sign In',
                                to: '/login'
                            }}
                        />
                    ) : isLoading ? (
                        <SkeletonGrid count={8} />
                    ) : isError ? (
                        <ErrorMessage
                            message={error?.message || 'Failed to load favorites'}
                            onRetry={refetch}
                        />
                    ) : favoriteArtworks.length === 0 ? (
                        <EmptyState
                            title="No favorites yet"
                            description="Start exploring the gallery and save artworks you love"
                            action={{
                                label: 'Browse Gallery',
                                to: '/browse'
                            }}
                        />
                    ) : (
                        <>
                            <div className="mb-8">
                                <p className="text-sm text-charcoal-soft">
                                    {favoriteArtworks.length} {favoriteArtworks.length === 1 ? 'artwork' : 'artworks'} saved
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {favoriteArtworks.map((favorite) => (
                                    <ArtworkCard
                                        key={favorite.favoriteable_id}
                                        artwork={favorite.artwork || favorite}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </SectionReveal>

            <GalleryFooter />
        </div>
    )
}
