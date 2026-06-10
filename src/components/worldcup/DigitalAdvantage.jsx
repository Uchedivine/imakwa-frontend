import React from 'react';

const advantages = [
  {
    icon: (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L4.09 12.28a1 1 0 00.77 1.63H11v6.09a1 1 0 001.82.57L21.91 10.29a1 1 0 00-.77-1.63H13V2.91a1 1 0 00-1.82-.57z" fill="#D4AC52" />
      </svg>
    ),
    iconBg: 'bg-[#162E21]',
    title: 'Instant Delivery',
    description:
      'The moment your payment clears, a download link is dispatched to your inbox. No production time. No queue. Files ready in under 60 seconds — regardless of your timezone, carrier, or country.',
    badge: '← AVERAGE 8 SECONDS',
    badgeColor: 'text-[#C5A665]',
  },
  {
    icon: (
      <div className="bg-[#6B5A8E] rounded-[3px] w-[18px] h-[18px] flex items-center justify-center">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 8a4 4 0 1 0 0 8h.5l7-8h.5a4 4 0 1 1 0 8h-.5l-7-8h-.5z" />
        </svg>
      </div>
    ),
    iconBg: 'bg-[#162E21]',
    title: 'Lifetime 8K Access',
    description:
      'Your download link never expires. As display technology improves, the files remain available at full resolution. Purchase once and re-download whenever you need — for life.',
    badge: 'NO EXPIRY · NO RE-PURCHASE',
    badgeColor: 'text-[#C5A665]',
  },
  {
    icon: (
      <div className="w-[18px] h-[18px] rounded-full bg-[#1E3A8A] flex items-center justify-center overflow-hidden border border-[#34D399]">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#34D399" strokeWidth="1.5">
           <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </div>
    ),
    iconBg: 'bg-[#162E21]',
    title: 'Zero Global Friction',
    description:
      'Physical art requires export permits, freight insurance, and weeks of logistics. Digital has none of that. A collector in Lagos, Lisbon, or Los Angeles receives the same file in the same 60 seconds.',
    badge: '180+ COUNTRIES · 0 SHIPPING COST',
    badgeColor: 'text-[#C5A665]',
  },
  {
    icon: (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="#D4AC52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="11" width="14" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    iconBg: 'bg-[#162E21]',
    title: 'Certified Provenance',
    description:
      'Every download includes a digital certificate of authenticity naming the artist, edition number, and acquisition date — the same rigour we apply to our physical collection.',
    badge: 'ARTIST-SIGNED CERTIFICATE PDF',
    badgeColor: 'text-[#C5A665]',
  },
]

function AdvantageCard({ icon, iconBg, title, description, badge, badgeColor }) {
  return (
    <div className="flex items-start gap-5 bg-[#0D2A1C] border border-[#1A3C2A] rounded-xl px-6 py-6 shadow-sm hover:border-[#2A4D3A] transition-colors duration-300">
      {/* Icon */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full ${iconBg} flex items-center justify-center`}>
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-serif text-[16px] text-[#D4AC52] font-semibold mb-2 leading-snug">
          {title}
        </h4>
        <p className="text-[12.5px] text-[#7A9E8A] leading-relaxed mb-3.5">
          {description}
        </p>
        <span className={`text-[9px] font-bold tracking-[0.18em] uppercase ${badgeColor}`}>
          {badge}
        </span>
      </div>
    </div>
  )
}

export default function DigitalAdvantage() {
  return (
    <section 
      className="relative py-24 md:py-28 px-6 md:px-8 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #124E31 0%, #051A0F 100%)'
      }}
    >
      {/* Continuous Diagonal Mesh Pattern with subtle gold stroke */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 L40 0 M0 0 L40 40' fill='none' stroke='rgba(197,166,101,0.07)' stroke-width='0.75'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Vignette Radial Gradient to darken corners while keeping center bright */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#03130A_100%)] opacity-70" />

      {/* Main Content Container (z-10 to stay above background layers) */}
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left Column ── */}
          <div className="max-w-[460px]">
            {/* Eyebrow */}
            <span className="text-[10px] font-bold tracking-[0.22em] text-[#D4AC52] uppercase mb-5 block">
              THE DIGITAL ADVANTAGE
            </span>

            {/* Headline */}
            <h2 className="font-serif text-[40px] md:text-[48px] text-white leading-[1.1] mb-7">
              Art Without<br />
              <span className="italic text-[#D4AC52]">Borders.</span>
            </h2>

            {/* Body Copy */}
            <p className="text-[13.5px] text-[#7A9E8A] leading-[1.75] mb-12">
              We removed every friction point between you and authentic African
              artistry. No freight forwarders. No customs. No waiting. The world's
              finest digital art collection, delivered to any device, anywhere on
              earth, in under 60 seconds.
            </p>

            {/* Quote Block */}
            <div className="bg-[#0D2A1C] border-l-[3px] border-[#D4AC52] p-6 rounded-r-xl shadow-md">
              <p className="font-serif italic text-[14.5px] text-[#9AB5A5] leading-[1.75] mb-5">
                "The digital canvas is not a compromise. It is the natural evolution of
                art that was always meant to travel — from the walls of Benin City
                to the screens of a São Paulo penthouse."
              </p>
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#C5A665]/80 uppercase">
                IMAKWA CREATIVE DIRECTOR · BASEL, SWITZERLAND
              </span>
            </div>
          </div>

          {/* ── Right Column: Advantage Cards ── */}
          <div className="flex flex-col gap-5">
            {advantages.map((adv) => (
              <AdvantageCard key={adv.title} {...adv} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}