import GalleryNavbar from '../../components/layout/GalleryNavbar'
import GalleryHero from './GalleryHero'
import FeaturedMasterworks from './FeaturedMasterworks'
import RegionSection from './RegionSection'
import ArtistSpotlight from './ArtistSpotlight'
import TrustSection from './TrustSection'
import InnerCircle from './InnerCircle'
import GalleryFooter from '../../components/layout/GalleryFooter'

export default function GalleryHome() {
  return (
    <div className="min-h-screen bg-cream">
      <GalleryNavbar />
      <GalleryHero />
      <FeaturedMasterworks />
      <RegionSection />
      <ArtistSpotlight />
      <TrustSection />
      <InnerCircle />
      <GalleryFooter />
    </div>
  )
}