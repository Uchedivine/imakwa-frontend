import { useState } from 'react'
import WorldCupNavbar from '../../components/layout/WorldCupNavbar'
import WorldCupHero from '../../components/worldcup/WorldCupHero'
import CountdownBanner from '../../components/worldcup/CountdownBanner'
import WorldCupFooter from '../../components/layout/WorldCupFooter'
import DigitalAdvantage from '../../components/worldcup/DigitalAdvantage'
import EarlyCollectors from '../../components/worldcup/EarlyCollectors'
import ProductTierCard from '../../components/worldcup/ProductTierCard'
import CheckoutModal from '../../components/worldcup/CheckoutModal'
import SectionReveal from '../../components/ui/SectionReveal'
import { useWorldCupProducts } from '../../hooks/useWorldCupProducts'

// Display-only properties keyed by tier Roman numerals (I–IV)
const TIER_DISPLAY = {
  'I': {
    tierBadge: 'TIER I',
    btnStyle: 'bg-[#111111] text-white hover:bg-black',
    highlight: false,
    previewType: 'smart-device',
    pricePeriod: 'one-time',
    features: [
      '32 x 4K Wallpapers (3840×2180px)',
      '240 custom app icons (iOS & Android)',
      '12 Samsung Galaxy Watch faces',
      '12 Apple Watch complications',
      'Personal use license, lifetime access'
    ],
  },
  'II': {
    tierBadge: 'TIER II',
    btnStyle: 'bg-[#111111] text-white hover:bg-black',
    highlight: false,
    previewType: 'hosting-kit',
    pricePeriod: 'one-time',
    features: [
      '18 viewing party invitation templates',
      '8 luxury digital menu designs (Canva)',
      '40 social media post & story templates',
      'Fully customizable in free Canva account',
      'Personal + small event commercial use'
    ],
  },
  'III': {
    tierBadge: 'TIER III · MOST POPULAR',
    btnStyle: 'bg-[#C5A665] text-[#0A2215] hover:bg-[#D4B77A]',
    highlight: true,
    previewType: 'ambient-vault',
    pricePeriod: 'one-time',
    features: [
      '24 × 8K files (7680×4320px, 16:9)',
      'Samsung Frame TV optimized (.MATTE format)',
      '12 × 4K portrait files (residential display)',
      'TIFF + JPEG source files included',
      'Residential unlimited display license',
      'All 32 World Cup match artworks'
    ],
  },
  'IV': {
    tierBadge: 'TIER IV · B2B',
    btnStyle: 'bg-[#0B2217] text-white hover:bg-black',
    highlight: false,
    previewType: 'b2b-license',
    pricePeriod: 'per venue / season',
    features: [
      'Commercial display license (1 venue)',
      'Full 8K resolution commercial files',
      'Streaming rights for public projection',
      'Custom co-branding option available',
      'Dedicated licensing certificate + PDF',
      'Priority account contact (48h response)'
    ],
  },
}

// Map real API shape → ProductTierCard props
const mapApiTiers = (products) =>
  products.flatMap((product) =>
    product.tiers?.map((tier) => ({
      tierId: tier.id,                  // integer — passed to checkout
      id: tier.id,
      name: tier.label,
      description: tier.description,
      price: tier.price,
      currency: tier.currency,
      statusBadge: tier.is_sold_out
        ? '✦ Sold Out'
        : '✦ Instant Download on Checkout',
      btnText: tier.is_sold_out
        ? 'SOLD OUT'
        : `DOWNLOAD NOW — $${tier.price.toLocaleString()}`,
      isSoldOut: tier.is_sold_out,
      ...TIER_DISPLAY[tier.tier],
    }))
  )

export default function WorldCupHome() {
  const [selectedTier, setSelectedTier] = useState(null)
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)
  const { data: products } = useWorldCupProducts()

  const handlePurchase = (tier) => {
    setSelectedTier(tier)
    setCheckoutModalOpen(true)
  }

  const handleCloseCheckout = () => {
    setCheckoutModalOpen(false)
    setSelectedTier(null)
  }

  // Mock product data (will be replaced when API is ready)
  const mockTiers = [
    {
      id: 'smart-device',
      tierId: 1,
      name: 'Smart Device Theme Collection',
      price: 45,
      pricePeriod: 'one-time',
      description: '4K wallpapers, app icon sets & luxury smartwatch faces in African geometric patterns.',
      features: [
        '32 x 4K Wallpapers (3840×2180px)',
        '240 custom app icons (iOS & Android)',
        '12 Samsung Galaxy Watch faces',
        '12 Apple Watch complications',
        'Personal use license, lifetime access'
      ],
      tierBadge: 'TIER I',
      statusBadge: '✦ Instant Download on Checkout',
      btnText: 'DOWNLOAD NOW — $45',
      btnStyle: 'bg-[#111111] text-white hover:bg-black',
      highlight: false,
      previewType: 'smart-device'
    },
    {
      id: 'match-day-kit',
      tierId: 2,
      name: 'Premium Match-Day Hosting Kit',
      price: 125,
      pricePeriod: 'one-time',
      description: 'Canva templates for upscale viewing party invitations, digital menus & social graphics.',
      features: [
        '18 viewing party invitation templates',
        '8 luxury digital menu designs (Canva)',
        '40 social media post & story templates',
        'Fully customizable in free Canva account',
        'Personal + small event commercial use'
      ],
      tierBadge: 'TIER II',
      statusBadge: '✦ Instant Download on Checkout',
      btnText: 'DOWNLOAD NOW — $125',
      btnStyle: 'bg-[#111111] text-white hover:bg-black',
      highlight: false,
      previewType: 'hosting-kit'
    },
    {
      id: '8k-vault',
      tierId: 3,
      name: '8K Ambient Display Vault',
      price: 295,
      pricePeriod: 'one-time',
      description: 'Ultra-high-resolution fine art files formatted for Samsung Frame TVs and luxury media rooms.',
      features: [
        '24 × 8K files (7680×4320px, 16:9)',
        'Samsung Frame TV optimized (.MATTE format)',
        '12 × 4K portrait files (residential display)',
        'TIFF + JPEG source files included',
        'Residential unlimited display license',
        'All 32 World Cup match artworks'
      ],
      tierBadge: 'TIER III · MOST POPULAR',
      statusBadge: '✦ Instant Download on Checkout',
      btnText: 'DOWNLOAD NOW — $295',
      btnStyle: 'bg-[#C5A665] text-[#0A2215] hover:bg-[#D4B77A]',
      highlight: true,
      previewType: 'ambient-vault'
    },
    {
      id: 'b2b-license',
      tierId: 4,
      name: 'B2B Venue Digital License',
      price: 1950,
      pricePeriod: 'per venue / season',
      description: 'Commercial display rights for luxury hotels, premium sports lounges & corporate pavilions.',
      features: [
        'Commercial display license (1 venue)',
        'Full 8K resolution commercial files',
        'Streaming rights for public projection',
        'Custom co-branding option available',
        'Dedicated licensing certificate + PDF',
        'Priority account contact (48h response)'
      ],
      tierBadge: 'TIER IV · B2B',
      statusBadge: '✦ License Delivered Instantly',
      btnText: 'ACQUIRE LICENSE — $1,950',
      btnStyle: 'bg-[#0B2217] text-white hover:bg-black',
      highlight: false,
      previewType: 'b2b-license'
    }
  ]

  const productTiers = Array.isArray(products) && products.length > 0
    ? mapApiTiers(products)
    : mockTiers

  return (
    <div className="min-h-screen bg-pitch">
      <WorldCupNavbar />

      {/* Hero Section */}
      <WorldCupHero />

      {/* Countdown Announcement Banner */}
      <CountdownBanner />

      {/* Products Grid Section */}
      <SectionReveal>
        <section id="products" className="py-24 px-6 md:px-8 bg-[#FDFBF7]">
          <div className="max-w-[1400px] mx-auto">

            {/* Header Area */}
            <div className="max-w-xl mb-16 text-left">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#C1623F] uppercase mb-4 block">
                THE DIGITAL COLLECTION
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-5">
                Four Tiers. <br />
                <span className="italic text-[#C1623F]">One Heritage.</span>
              </h2>
              <p className="text-charcoal-soft text-[13.5px] leading-relaxed">
                Every purchase is a pure digital download — delivered to your inbox within seconds of payment, accessible from every device, in perpetuity.
              </p>
            </div>

            {/* Product Tiers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
              {productTiers.map((tier) => (
                <ProductTierCard
                  key={tier.id}
                  tier={tier}
                  onPurchase={handlePurchase}
                />
              ))}
            </div>

            {/* Bottom Callout Bundle Banner */}
            <div className="mt-16">
              <div className="bg-[#F5EFE6] border border-[#C5A665]/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
                <div>
                  <h4 className="font-serif text-lg md:text-xl text-charcoal font-semibold mb-2">
                    Building a premium venue experience?
                  </h4>
                  <p className="text-[13px] text-charcoal-soft leading-relaxed">
                    Bundle the B2B Venue License with the 8K Vault for a complete turnkey solution at <span className="font-semibold text-charcoal">$2,100</span> — a saving of <span className="font-semibold text-charcoal">$145</span>.
                  </p>
                </div>
                <a
                  href="mailto:hello@imakwa.com?subject=Bundle Inquiry — Venue License + 8K Vault"
                  className="whitespace-nowrap px-8 py-3.5 bg-[#111111] text-white hover:bg-black rounded-xl font-bold uppercase tracking-wider text-[11px] transition-all shadow-md hover:shadow-lg"
                >
                  ENQUIRE ABOUT BUNDLE
                </a>
              </div>
            </div>

          </div>
        </section>
      </SectionReveal>

      {/* Digital Advantage Section */}
      <DigitalAdvantage />

      {/* Early Collectors Testimonials Section */}
      <EarlyCollectors />

      <WorldCupFooter />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={handleCloseCheckout}
        selectedTier={selectedTier}
      />
    </div>
  )
}
