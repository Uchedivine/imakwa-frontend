import { useState } from 'react'
import { Link } from 'react-router-dom'
import eldersGaze from '../../assets/eldersGaze.jpeg'

const stats = [
  { value: '2,400+', label: 'Original Artworks' },
  { value: '380', label: 'Verified Artists' },
  { value: '54', label: 'African Countries' },
];

export default function GalleryHero() {
  const [cartState, setCartState] = useState('idle'); // 'idle' | 'loading' | 'added'
  const [isUiVisible, setIsUiVisible] = useState(true);

  const handleAddToCart = () => {
    if (cartState !== 'idle') return;
    setCartState('loading');
    setTimeout(() => {
      setCartState('added');
      setTimeout(() => setCartState('idle'), 2500);
    }, 800);
  };

  const handleImageInteraction = () => {
    if (!window.matchMedia("(hover: hover)").matches) {
      setIsUiVisible(prev => !prev);
    }
  };

  return (
    <section className="relative bg-[#FCFBF8] overflow-hidden min-h-[calc(100vh-72px)] flex items-center w-full">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row relative">

        {/* --- LEFT COLUMN: Content --- */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-10 pt-12 sm:pt-16 lg:py-20 relative z-20">
          <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 lg:mb-8">
            <div className="w-10 sm:w-12 h-[1px] bg-[#C25E36]"></div>
            <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-[#C25E36]">
              Premier African Art Marketplace
            </p>
          </div>

          <h1 className="mb-5 sm:mb-6 text-[#1A1A1A]">
            <span className="block font-serif text-[2.25rem] sm:text-[3rem] lg:text-[4.5rem] leading-[1.1] tracking-tight">
              Own a Piece of
            </span>
            <span className="block font-serif text-[2.25rem] sm:text-[3rem] lg:text-[4.5rem] leading-[1.1] italic text-[#C25E36]">
              Authentic African
            </span>
            <span className="block font-serif text-[2.25rem] sm:text-[3rem] lg:text-[4.5rem] leading-[1.1] tracking-tight">
              Heritage.
            </span>
          </h1>

          <p className="text-[14px] sm:text-[15px] leading-relaxed text-gray-600 max-w-[500px] mb-7 sm:mb-8 lg:mb-10">
            Connecting global collectors with master artists across the African
            continent — from ancestral sculptors in Benin City to contemporary
            digital visionaries in Nairobi. Every piece is certified,
            provenance-verified, and shipped worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12">
            <Link
              to="/browse"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 sm:py-3.5 bg-[#C25E36] text-white text-[14px] font-medium rounded-full hover:bg-[#a64e2c] transition-colors min-h-[48px] sm:min-h-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>Explore the Gallery</span>
            </Link>

            <Link
              to="/artists"
              className="inline-flex items-center justify-center px-7 py-4 sm:py-3.5 border border-[#1A1A1A] text-[#1A1A1A] text-[14px] font-medium rounded-full hover:bg-gray-50 transition-colors min-h-[48px] sm:min-h-0"
            >
              Meet the Artists
            </Link>
          </div>

          <div className="hidden lg:block">
            <hr className="border-t border-[#1c1a17]/10 w-full max-w-[500px] mb-8" />
            <div className="flex gap-12">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <p className="font-serif text-[28px] leading-none text-[#1A1A1A] mb-2">{value}</p>
                  <p className="text-[12px] text-gray-500 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- CENTER/RIGHT COLUMN: Artwork Showcase Container --- */}
        <div className="relative lg:absolute right-0 top-0 bottom-0 w-full lg:w-[53%] h-[50vh] min-h-[400px] sm:min-h-[450px] lg:h-full z-10 overflow-hidden bg-[#1c1a17]">

          <img
            src={eldersGaze}
            alt="The Elder's Gaze Artwork"
            onClick={handleImageInteraction}
            className="peer w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 cursor-crosshair relative z-0"
          />

          {/* Fixed Transition Blend Mask */}
          <div className={`absolute top-0 left-0 right-0 h-16 lg:h-full lg:w-[160px] lg:right-auto lg:bottom-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#FCFBF8] via-[#FCFBF8]/40 to-transparent z-10 pointer-events-none transition-opacity duration-500 peer-hover:opacity-0 ${isUiVisible ? 'opacity-100' : 'opacity-0'}`}></div>

          {/* Featured Badge */}
          <div className={`absolute top-4 right-4 sm:top-10 sm:right-10 w-20 h-20 sm:w-[100px] sm:h-[100px] rounded-full bg-[#C25E36] flex flex-col items-center justify-center text-center shadow-lg z-20 transition-all duration-500 peer-hover:opacity-0 peer-hover:-translate-y-4 pointer-events-none ${isUiVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <span className="text-[#F4F0EA] text-[7px] sm:text-[9px] font-bold tracking-[0.15em] uppercase leading-[1.3] mb-0.5 sm:mb-1">
              FEATURED<br />COLLECTION<br />2025
            </span>
            <span className="text-[#F4F0EA] text-xs sm:text-sm">✦</span>
          </div>

          {/* Just Listed Interactive Card Overlay - Raised Up for Spacing Below */}
          <div
            onClick={(e) => {
              if (!window.matchMedia("(hover: hover)").matches) {
                e.stopPropagation();
              }
            }}
            className={`absolute bottom-8 sm:bottom-10 left-4 right-4 sm:left-auto sm:bottom-16 sm:right-10 bg-[#F4F0EA] rounded-xl shadow-2xl p-4 sm:p-5 lg:p-6 w-auto sm:w-[320px] z-30 transition-all duration-500 peer-hover:opacity-0 peer-hover:translate-y-4 hover:opacity-100 ${isUiVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5 lg:mb-3">
              <span className="text-[11px] sm:text-[12px]">🔥</span>
              <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-[#C25E36]">
                JUST LISTED
              </p>
            </div>

            <h3 className="font-serif text-[19px] sm:text-[20px] lg:text-[22px] leading-tight text-[#1A1A1A] mb-1">
              The Elder's Gaze
            </h3>

            <p className="text-[11px] sm:text-[12px] text-gray-500 mb-4 sm:mb-5 lg:mb-6">
              Kola Bankole · Oil on Canvas · Nigeria
            </p>

            <div className="flex items-center justify-between gap-3">
              <span className="font-serif text-[21px] sm:text-[22px] lg:text-[24px] text-[#C25E36]">
                $4,200
              </span>

              {/* Optimized button with proper touch target */}
              <button
                onClick={handleAddToCart}
                disabled={cartState !== 'idle'}
                className={`flex items-center justify-center flex-1 max-w-[140px] sm:max-w-[120px] min-h-[44px] sm:h-[40px] px-4 text-[12px] sm:text-[13px] font-medium rounded-full transition-all duration-300 ${cartState === 'added'
                  ? 'bg-green-700 text-white'
                  : 'bg-[#C25E36] text-white hover:bg-[#a64e2c]'
                  } ${cartState === 'loading' ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                {cartState === 'idle' && 'Add to Cart'}

                {cartState === 'loading' && (
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}

                {cartState === 'added' && '✓ Added'}
              </button>
            </div>
          </div>
        </div>

        {/* --- BOTTOM MOBILE PANEL: Independent Stats block --- */}
        <div className="block lg:hidden w-full px-4 sm:px-6 py-10 sm:py-12 bg-[#FCFBF8] border-t border-[#1c1a17]/5 relative z-20">
          <div className="flex gap-6 sm:gap-8 flex-wrap justify-between sm:justify-start sm:gap-x-16">
            {stats.map(({ value, label }) => (
              <div key={label} className="min-w-[100px] sm:min-w-[110px]">
                <p className="font-serif text-[24px] sm:text-[26px] lg:text-[28px] leading-none text-[#1A1A1A] mb-1.5">
                  {value}
                </p>
                <p className="text-[11px] sm:text-[12px] text-gray-500 font-medium">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}