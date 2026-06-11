import { Link } from 'react-router-dom'

export default function WorldCupHero() {
  return (
    <section
      className="relative py-20 md:py-24 px-6 md:px-8 overflow-hidden min-h-[92vh] flex flex-col justify-between"
      style={{
        background: 'radial-gradient(circle at center, #124E31 0%, #051A0F 100%)'
      }}
    >
      {/* FIXED: Continuous Diagonal Mesh Pattern with subtle gold stroke */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 L40 0 M0 0 L40 40' fill='none' stroke='rgba(197,166,101,0.07)' stroke-width='0.75'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Vignette Radial Gradient to darken corners while keeping center bright */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#03130A_100%)] opacity-70" />

      {/* Top spacer for vertical balance */}
      <div className="h-4" />

      <div className="relative z-10 max-w-[800px] mx-auto text-center my-auto">

        {/* Eyebrow - Lines slightly lengthened to match design */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-14 bg-[#C5A665]/30" />
          <p className="text-[9px] uppercase tracking-[0.25em] font-semibold text-[#C5A665]">
            IMAKWA DIGITAL COLLECTION · WORLD CUP 2026
          </p>
          <div className="h-[1px] w-14 bg-[#C5A665]/30" />
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-[4rem] md:text-[5.5rem] lg:text-[6rem] leading-[1.05] mb-5">
          <span className="text-white block tracking-tight">The Beautiful</span>
          <span className="italic text-[#C5A665] block tracking-tight">Game.</span>
        </h1>

        {/* Subtitle */}
        <p className="font-serif italic text-[17px] md:text-[19px] text-[#5B7566] mb-8">
          An Artistic Celebration of Global Football Culture
        </p>

        {/* Description */}
        <p className="text-[13px] md:text-[14px] leading-[1.8] text-[#8DA094] max-w-[640px] mx-auto mb-12">
          Forty-six African artists. Thirty-two nations. One tournament. We have translated the poetry of the beautiful game into limited-edition digital art — luxury wallpapers, ambient displays, and venue licenses forged from the geometry of African heritage.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5">
          <Link
            to="/worldcup/products"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#C5A665] text-[#092215] rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-[#D4B77A] transition-all shadow-lg hover:shadow-xl"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            ACQUIRE THE COLLECTION
          </Link>

          <a
            href="#digital-access"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#5B7566]/40 text-[#A2B5AA] rounded-full text-[13px] font-medium hover:bg-white/5 hover:border-[#5B7566]/70 transition-all"
          >
            What is Digital Access? <span className="font-sans ml-1 text-[15px]">→</span>
          </a>
        </div>
      </div>

      {/* Stats Block (Bottom) */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto pt-8 border-t border-[#C5A665]/10 mt-12 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:gap-x-0 md:divide-x md:divide-[#C5A665]/15 text-center">

          <div className="flex flex-col items-center">
            <span className="font-serif italic text-3xl md:text-4xl text-[#C5A665] leading-none">46</span>
            <span className="text-[9px] font-semibold tracking-[0.2em] text-[#8DA094] uppercase mt-2.5">
              African Artists
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-serif italic text-3xl md:text-4xl text-[#C5A665] leading-none">8K</span>
            <span className="text-[9px] font-semibold tracking-[0.2em] text-[#8DA094] uppercase mt-2.5">
              Max Resolution
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-serif text-3xl md:text-4xl text-[#C5A665] leading-none">∞</span>
            <span className="text-[9px] font-semibold tracking-[0.2em] text-[#8DA094] uppercase mt-2.5">
              Download Lifetime
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-serif italic text-3xl md:text-4xl text-[#C5A665] leading-none">0kg</span>
            <span className="text-[9px] font-semibold tracking-[0.2em] text-[#8DA094] uppercase mt-2.5">
              Shipping Weight
            </span>
          </div>

        </div>
      </div>
    </section>
  )
}