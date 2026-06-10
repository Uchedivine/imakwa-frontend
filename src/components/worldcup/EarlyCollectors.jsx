import React from 'react'
import StarRating from '../ui/StarRating'

const testimonials = [
  {
    quote: '"I put the 8K file on my Samsung Frame the night it arrived. My dining room became an entirely different space. The geometric patterns are extraordinary — nothing like it anywhere."',
    name: 'Diallo Traoré',
    title: 'Art Collector • Abidjan, Côte d\'Ivoire',
    badge: '8K VAULT',
    badgeBg: 'bg-[#FDF3EE]',
    badgeText: 'text-[#C1623F]',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#C1623F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    iconBg: 'bg-[#FDF3EE]'
  },
  {
    quote: '"We licensed the collection for our Lagos hotel\'s football viewing pavilion. Guests consistently remark on the artwork during matches. It elevated the entire venue concept."',
    name: 'Victoria Adeyemi',
    title: 'GM, Rosewood Lagos • Nigeria',
    badge: 'B2B LICENSE',
    badgeBg: 'bg-[#FAF0D8]',
    badgeText: 'text-[#B8943B]',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#B8943B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <line x1="9" y1="22" x2="9" y2="16" />
        <line x1="15" y1="22" x2="15" y2="16" />
        <line x1="9" y1="16" x2="15" y2="16" />
        <path d="M8 6h2v2H8V6zm0 4h2v2H8v-2zm8-4h2v2h-2V6zm0 4h2v2h-2v-2z" />
      </svg>
    ),
    iconBg: 'bg-[#FAF0D8]'
  },
  {
    quote: '"The Match-Day Kit made our World Cup viewing party look genuinely editorial. Guests thought we\'d hired a designer. The Canva templates are intuitive and stunning."',
    name: 'Amara Sesay',
    title: 'Brand Strategist • London, UK',
    badge: 'HOSTING KIT',
    badgeBg: 'bg-[#FDF3EE]',
    badgeText: 'text-[#C1623F]',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#C1623F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    ),
    iconBg: 'bg-[#FDF3EE]'
  }
]

export default function EarlyCollectors() {
  return (
    <section className="bg-cream py-24 px-6 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.22em] text-[#C1623F] uppercase mb-4 block">
            EARLY COLLECTORS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-charcoal leading-tight">
            The <span className="italic text-[#C1623F]">Collection</span> Speaks.
          </h2>
        </div>

        {/* Grid of Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#EDE6D8] rounded-2xl p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300"
            >
              {/* Top part: Stars + Quote */}
              <div>
                <StarRating rating={5} className="mb-6" />
                <p className="font-display italic text-[14.5px] leading-relaxed text-[#3A3530]">
                  {item.quote}
                </p>
              </div>

              {/* Bottom part: Author Info */}
              <div className="mt-8 border-t border-[#EDE6D8] pt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Icon Profile Wrapper */}
                  <div className={`w-9 h-9 rounded-full ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-charcoal">
                      {item.name}
                    </h4>
                    <p className="text-[10.5px] text-[#6B6058]">
                      {item.title}
                    </p>
                  </div>
                </div>

                {/* License Badge */}
                <span className={`px-2.5 py-1 text-[8.5px] font-extrabold tracking-[0.08em] rounded-md ${item.badgeBg} ${item.badgeText} uppercase whitespace-nowrap`}>
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
