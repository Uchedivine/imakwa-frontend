import GalleryNavbar from '../../components/layout/GalleryNavbar'
import GalleryHero from './GalleryHero'
import FeaturedMasterworks from './FeaturedMasterworks'
import RegionSection from './RegionSection'
import ArtistSpotlight from './ArtistSpotlight'
import TrustSection from './TrustSection'
import InnerCircle from './InnerCircle'
import GalleryFooter from '../../components/layout/GalleryFooter'
import SectionReveal from '../../components/ui/SectionReveal'

export default function GalleryHome() {
  return (
    <div className="min-h-screen bg-cream">
      <GalleryNavbar />
      <GalleryHero />
      <SectionReveal>
        <FeaturedMasterworks />
      </SectionReveal>
      <SectionReveal>
        <RegionSection />
      </SectionReveal>
      <SectionReveal>
        <ArtistSpotlight />
      </SectionReveal>
      <SectionReveal>
        <TrustSection />
      </SectionReveal>
      <SectionReveal>
        <InnerCircle />
      </SectionReveal>
      <GalleryFooter />
    </div>
  )
}