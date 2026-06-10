import React from 'react'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L4.09 12.28a1 1 0 00.77 1.63H11v6.09a1 1 0 001.82.57L21.91 10.29a1 1 0 00-.77-1.63H13V2.91a1 1 0 00-1.82-.57z" fill="#D4AC52" />
      </svg>
    ),
    label: 'Instant Download'
  },
  {
    icon: (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="#D4AC52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="11" width="14" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    label: 'Secure Checkout'
  },
  {
    icon: (
      <div className="bg-[#6B5A8E] rounded-[3px] w-[18px] h-[18px] flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 8a4 4 0 1 0 0 8h.5l7-8h.5a4 4 0 1 1 0 8h-.5l-7-8h-.5z" />
        </svg>
      </div>
    ),
    label: 'Lifetime Access'
  },
  {
    icon: (
      <div className="w-[18px] h-[18px] rounded-full bg-[#1E3A8A] flex items-center justify-center overflow-hidden border border-[#34D399] flex-shrink-0">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#34D399" strokeWidth="1.5">
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </div>
    ),
    label: '190+ Countries'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#D4AC52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
        <path d="M12 22C17.52 22 22 17.52 22 12S17.52 2 12 2 2 6.48 2 12c0 2.76 1.12 5.25 2.93 7.07.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0A9.969 9.969 0 0 1 1 12C1 5.93 5.93 1 12 1s11 4.93 11 11-4.93 11-11 11h-1" />
        <circle cx="7.5" cy="10.5" r="1.5" fill="#EF4444" stroke="#EF4444" />
        <circle cx="11.5" cy="7.5" r="1.5" fill="#3B82F6" stroke="#3B82F6" />
        <circle cx="16.5" cy="9.5" r="1.5" fill="#10B981" stroke="#10B981" />
        <circle cx="15.5" cy="14.5" r="1.5" fill="#F59E0B" stroke="#F59E0B" />
      </svg>
    ),
    label: 'Artist Certified'
  }
]

export default function WorldCupFooter() {
  return (
    <footer className="bg-[#13110E] text-white font-sans antialiased py-16 md:py-20 px-6 md:px-12 lg:px-16 border-t border-white/[0.03]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Features Columns Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 items-center max-w-[1200px] mx-auto mb-16">
          {features.map((feat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center px-4 relative h-full">
              <div className="mb-4 flex h-8 items-center justify-center">
                {feat.icon}
              </div>
              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.14em] text-[#EAE6DF]/90 uppercase">
                {feat.label}
              </span>
              
              {/* Vertical Divider for larger screens */}
              {idx < features.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-8 w-px bg-white/10" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright and Links */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-[#A39E93]/60">
          <p className="text-center md:text-left">
            © 2026 Imakwa.co — The Beautiful Game Collection · All digital rights reserved
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center">
            <Link to="/" className="hover:text-white transition-colors duration-150 flex items-center gap-1.5 font-semibold">
              ← Main Gallery
            </Link>
            <Link to="/faq" className="hover:text-white transition-colors duration-150">
              Download FAQ
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-150">
              Licensing Terms
            </Link>
            <Link to="/refund" className="hover:text-white transition-colors duration-150">
              Refund Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
