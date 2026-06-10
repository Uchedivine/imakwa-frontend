import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'

export default function WorldCupNavbar() {
    const { items } = useCartStore()
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <nav className="w-full flex flex-col z-50 sticky top-0 select-none">
            {/* 1. Main Navigation Bar (Top) */}
            <div className="bg-[#12110F] border-b border-white/5 h-[64px] flex items-center justify-between px-6 lg:px-10 w-full">
                
                {/* Logo */}
                <Link to="/worldcup" className="font-serif text-[24px] font-bold tracking-tight text-white flex items-baseline">
                    imakwa<span className="text-[#C25E36]">.</span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-[13px] font-medium text-white/70 hover:text-white transition-colors flex items-center gap-2">
                        <span>←</span> Back to Gallery
                    </Link>
                    <a href="#products" className="text-[13px] font-medium text-white/70 hover:text-white transition-colors">
                        Shop Collection
                    </a>
                    <a href="#digital-access" className="text-[13px] font-medium text-white/70 hover:text-white transition-colors">
                        Digital Access
                    </a>
                    <a href="#licensing" className="text-[13px] font-medium text-white/70 hover:text-white transition-colors">
                        Artist Licensing
                    </a>
                </div>

                {/* Cart Button */}
                <button className="h-[40px] px-6 bg-[#C25E36] hover:bg-[#a64e2c] transition-colors text-white rounded-full text-[13px] font-semibold flex items-center gap-2">
                    {/* Shopping Bag Icon */}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                    </svg>
                    Cart ( {cartCount} )
                </button>
            </div>

            {/* 2. Live Match Ticker (Bottom) */}
            <div className="bg-[#0B2217] relative overflow-hidden h-[38px] flex items-center border-b border-[#0B2217]">

                <div className="animate-scroll flex items-center whitespace-nowrap relative z-10 hover:[animation-play-state:paused]">
                    <div className="flex items-center gap-10 text-[11px] font-mono tracking-widest text-[#B89B5E] font-semibold py-1">
                        
                        {/* Seamless Loop container */}
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-10">
                                
                                <div className="flex items-center gap-3">
                                    <span className="opacity-80">FIFA WORLD CUP 2026</span>
                                    {/* Hexagon outline icon from the screenshot */}
                                    <svg className="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8.66 5v10L12 22l-8.66-5V7z"/></svg>
                                </div>

                                <span className="text-[#B89B5E]/40 text-[10px]">•</span>

                                <div className="flex items-center gap-3">
                                    <span>IVORY COAST</span>
                                    <span className="text-white text-[13px] font-bold px-1 tracking-normal">1 — 0</span>
                                    <span>GERMANY</span>
                                </div>

                                <span className="text-[#B89B5E]/40 text-[10px]">•</span>

                                <div className="flex items-center gap-3">
                                    <span>CAMEROON</span>
                                    <span className="text-white text-[13px] font-bold px-1 tracking-normal">0 — 2</span>
                                    <span>JAPAN</span>
                                </div>

                                <span className="text-[#B89B5E]/40 text-[10px]">•</span>

                                <div className="flex items-center gap-3">
                                    <span>SOUTH AFRICA</span>
                                    <span className="text-white text-[13px] font-bold px-1 tracking-normal">1 — 3</span>
                                    <span>ENGLAND</span>
                                </div>

                                <span className="text-[#B89B5E]/40 text-[10px]">•</span>

                                <div className="flex items-center gap-3">
                                    <span className="bg-[#C25E36] text-white px-2 py-[3px] rounded-sm text-[10px] tracking-wider flex items-center gap-1.5 font-sans font-bold">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                        LIVE
                                    </span>
                                    <span>BRAZIL</span>
                                    <span className="text-white text-[13px] font-bold px-1 tracking-normal">2 — 1</span>
                                    <span>NIGERIA</span>
                                </div>

                                <span className="text-[#B89B5E]/40 text-[10px]">•</span>

                                <div className="flex items-center gap-3">
                                    <span>FRANCE</span>
                                    <span className="text-white text-[13px] font-bold px-1 tracking-normal">0 — 0</span>
                                    <span>SENEGAL</span>
                                </div>

                                {/* Trailing dot to connect seamlessly to the next loop block */}
                                <span className="text-[#B89B5E]/40 text-[10px] mr-10">•</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Seamless scrolling keyframes */}
            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.333333%); }
                }
                .animate-scroll {
                    animation: scroll 45s linear infinite;
                    width: max-content;
                }
            `}</style>
        </nav>
    )
}