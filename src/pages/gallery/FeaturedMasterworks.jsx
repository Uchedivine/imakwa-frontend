import { useState } from 'react'
import { Link } from 'react-router-dom'
import ArtworkCard from '../../components/artwork/ArtworkCard'
import { useArtworks } from '../../hooks/useArtworks'
import { SkeletonGrid } from '../../components/ui/SkeletonCard'
import ErrorMessage from '../../components/ui/ErrorMessage'

const categories = [
  'All Works', 'Paintings', 'Sculpture', 'Digital Art', 'Textiles', 'Photography'
]

// Static fallback — used while backend is not yet connected
const FALLBACK_ARTWORKS = [
  { id: 1, title: 'Ancestral Echoes', artist: 'Adaeze Okonkwo', country: 'Nigeria', countryCode: 'NG', price: 3800, badge: 'NEW', image: 'https://images.unsplash.com/photo-1578926288207-a90a5366a2b6?w=600&q=80&fit=crop' },
  { id: 2, title: 'The Keeper of Drums', artist: 'Kwame Asante', country: 'Ghana', countryCode: 'GH', price: 7500, badge: 'LIMITED', image: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=600&q=80&fit=crop' },
  { id: 3, title: 'Neon Griot', artist: 'Amara Osei', country: 'Kenya', countryCode: 'KE', price: 1200, badge: 'DIGITAL', image: 'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=600&q=80&fit=crop' },
  { id: 4, title: 'Morning Ritual', artist: 'Zanele Dlamini', country: 'South Africa', countryCode: 'ZA', price: 5100, badge: null, image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80&fit=crop' },
  { id: 5, title: 'Desert Whispers', artist: 'Musa Ibrahim', country: 'Mali', countryCode: 'ML', price: 2900, badge: 'NEW', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80&fit=crop' },
  { id: 6, title: 'Urban Rhythm', artist: 'Chioma Adeyemi', country: 'Nigeria', countryCode: 'NG', price: 4500, badge: null, image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80&fit=crop' },
  { id: 7, title: 'Oceanic Souls', artist: 'Kofi Mensah', country: 'Ghana', countryCode: 'GH', price: 3200, badge: 'LIMITED', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&fit=crop' },
  { id: 8, title: 'Nomad Dreams', artist: 'Layla Zahra', country: 'Morocco', countryCode: 'MA', price: 1800, badge: 'DIGITAL', image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=600&q=80&fit=crop' },
]

export default function FeaturedMasterworks() {
  const [activeCategory, setActiveCategory] = useState('All Works')

  const categoryParam = activeCategory === 'All Works' ? {} : { category: activeCategory }
  const { data, isLoading, isError, refetch } = useArtworks(categoryParam)

  // Use live data if available, fall back to static placeholder data
  const artworks = data?.data ?? FALLBACK_ARTWORKS

  return (
    <section className="py-20 bg-[#FCFBF8]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C25E36] mb-3">THE GALLERY</p>
            <h2 className="font-serif text-[3.5rem] font-normal text-[#1A1A1A] leading-[1]">
              Featured <span className="italic text-[#C25E36]">Masterworks</span>
            </h2>
          </div>
          <Link to="/browse" className="inline-flex items-center justify-center px-6 py-2.5 bg-[#C25E36] text-white text-[14px] font-medium rounded-full hover:bg-[#a64e2c] transition-colors">
            View All Works &rarr;
          </Link>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-12 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 whitespace-nowrap px-5 sm:px-6 py-2.5 rounded-full text-[12px] sm:text-[13px] font-medium transition-all ${activeCategory === cat ? 'bg-[#1A1A1A] text-white' : 'bg-transparent text-[#1A1A1A] border border-[#1A1A1A]/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <SkeletonGrid count={8} />
        ) : isError ? (
          <ErrorMessage
            message="We couldn't load the artworks. Please try again."
            onRetry={refetch}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {artworks.map(artwork => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}