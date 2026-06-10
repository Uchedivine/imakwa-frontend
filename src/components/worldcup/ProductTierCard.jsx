import { useState } from 'react'

function TierPreview({ type }) {
  if (type === 'smart-device') {
    return (
      <div className="relative w-full h-[180px] bg-[#0A2619] flex items-center justify-center overflow-hidden">
        {/* Background Mesh Pattern */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 16 L16 0 M0 0 L16 16' fill='none' stroke='%23C5A665' stroke-width='0.75'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Phone Mockup */}
        <div className="relative w-14 h-24 bg-[#0D3822] border-2 border-white/20 rounded-[10px] shadow-2xl flex items-center justify-center z-10 transition-transform duration-300 hover:scale-105">
          <div className="absolute top-1 w-6 h-1 bg-black/40 rounded-full" />
          <div className="w-8 h-8 rounded-full border border-[#C5A665]/40 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#C5A665]/55 to-transparent animate-pulse" />
          </div>
        </div>
        {/* Watch Mockup */}
        <div className="relative w-9 h-12 bg-[#0D3822] border border-white/20 rounded-[6px] shadow-2xl flex items-center justify-center ml-2 mt-8 z-20 transition-transform duration-300 hover:scale-110">
          <div className="w-5 h-5 rounded-full border border-[#C5A665]/40 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#C5A665]/55" />
          </div>
        </div>
      </div>
    )
  }

  if (type === 'hosting-kit') {
    return (
      <div className="relative w-full h-[180px] bg-[#221A15] flex items-center justify-center overflow-hidden">
        {/* Warm spot glow */}
        <div className="absolute w-36 h-36 bg-orange-700/10 rounded-full blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        {/* Mockup Card 1 (Vertical) */}
        <div className="relative w-15 h-20 bg-white rounded-md shadow-md flex flex-col p-1.5 border border-charcoal/5 -rotate-6 transition-transform duration-300 hover:rotate-0 z-10">
          <div className="w-full h-3 bg-[#C1623F] rounded-sm mb-1" />
          <div className="w-3/4 h-1.5 bg-charcoal/10 rounded-sm mb-1" />
          <div className="w-1/2 h-1 bg-charcoal/5 rounded-sm" />
        </div>

        {/* Mockup Card 2 (Horizontal) */}
        <div className="relative w-20 h-15 bg-[#FDFBF7] rounded-md shadow-lg flex items-center justify-center p-1.5 border border-[#C5A665]/20 translate-x-2 translate-y-3 rotate-3 transition-transform duration-300 hover:rotate-0 z-20">
          <div className="w-9 h-9 rounded-full border border-dashed border-[#C5A665]/40 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-[#C5A665]/20 flex items-center justify-center text-[7px] font-bold text-[#C5A665]">WC</div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'ambient-vault') {
    return (
      <div className="relative w-full h-[180px] bg-[#122219] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 L20 0 M0 0 L20 20' fill='none' stroke='%23C5A665' stroke-width='0.75'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Samsung Frame TV Mockup */}
        <div className="relative w-36 h-22 bg-[#05140C] border-[3px] border-[#C5A665] rounded shadow-2xl flex items-center justify-center z-10 transition-transform duration-300 hover:scale-105">
          <div 
            className="w-full h-full flex flex-col items-center justify-center p-2"
            style={{ background: 'radial-gradient(circle at center, #857045 0%, #124E31 100%)' }}
          >
            <span className="text-[8px] font-bold tracking-widest text-white/95 uppercase font-serif">8K Display</span>
            <span className="text-[6px] text-[#C5A665] tracking-[0.2em] font-semibold mt-1">THE BEAUTIFUL GAME</span>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'b2b-license') {
    return (
      <div className="relative w-full h-[180px] bg-[#0A0909] flex items-center justify-center overflow-hidden">
        <div className="absolute w-44 h-28 bg-[#122E21]/20 rounded-full blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        {/* Commercial Venue screen */}
        <div className="relative w-40 h-24 bg-[#081811] border-2 border-white/10 rounded shadow-2xl flex flex-col items-center justify-center overflow-hidden z-10 transition-transform duration-300 hover:scale-105">
          <div 
            className="w-full h-full flex flex-col items-center justify-center p-3"
            style={{ background: 'radial-gradient(circle at center, #1E3027 0%, #06100B 100%)' }}
          >
            <div className="border border-[#C5A665]/60 px-2.5 py-1.5 rounded text-center">
              <p className="text-[5px] text-white/40 tracking-widest uppercase font-mono mb-0.5">LUXURY VENUE</p>
              <p className="text-[8px] font-bold text-[#C5A665] tracking-widest uppercase font-serif">Imakwa Licensed</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default function ProductTierCard({ tier, onPurchase }) {
  const {
    id,
    name,
    description,
    price,
    pricePeriod = 'one-time',
    tierBadge,
    statusBadge,
    features = [],
    btnText,
    btnStyle = 'bg-[#111111] text-white hover:bg-black',
    highlight = false,
    previewType
  } = tier

  return (
    <div
      className={`relative rounded-2xl bg-white flex flex-col justify-between transition-all duration-300 overflow-hidden text-left h-full ${
        highlight
          ? 'border-2 border-[#C5A665] shadow-2xl scale-[1.02] md:scale-[1.03]'
          : 'border border-charcoal/10 hover:shadow-xl hover:border-charcoal/20'
      }`}
    >
      <div>
        {/* Preview Illustration Banner */}
        <TierPreview type={previewType} />

        {/* Card Body */}
        <div className="p-6 md:p-8">
          {/* Tier Badge */}
          {tierBadge && (
            <p className="text-[9px] font-bold tracking-[0.2em] text-[#C5A665] uppercase mb-3.5">
              {tierBadge}
            </p>
          )}

          {/* Tier Name */}
          <h3 className="font-serif text-2xl text-charcoal font-semibold mb-3">
            {name}
          </h3>

          {/* Description */}
          <p className="text-[13px] text-charcoal-soft leading-relaxed mb-6">
            {description}
          </p>

          {/* Pricing area */}
          <div className="flex items-baseline gap-1 mb-5">
            <span className="text-[10px] font-bold text-charcoal/50 uppercase mr-1">USD</span>
            <span className="text-3xl font-bold font-serif text-charcoal">${price.toLocaleString()}</span>
            <span className="text-[11px] text-charcoal-soft/80 ml-1.5 font-medium">{pricePeriod}</span>
          </div>

          {/* Status Badge Pill */}
          {statusBadge && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-[#EAF5EF] text-[#2D8A5B] tracking-wide mb-6">
              {statusBadge}
            </span>
          )}

          {/* Features Checklist */}
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <span className="text-[#2D8A5B] font-bold text-[13px] leading-none mt-0.5">✓</span>
                <span className="text-[12.5px] leading-normal text-charcoal-mid">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Button Section */}
      <div className="p-6 md:p-8 pt-0 mt-6">
        <button
          onClick={() => !tier.isSoldOut && onPurchase(tier)}
          disabled={tier.isSoldOut}
          className={`w-full py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-[11px] transition-all duration-300 shadow-md hover:shadow-lg ${btnStyle} ${
            tier.isSoldOut ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {btnText || `DOWNLOAD NOW — $${price}`}
        </button>
      </div>
    </div>
  )
}
