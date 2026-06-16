import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLiveScores } from '../../hooks/useLiveScores'
import { useCountdown } from '../../hooks/useCountdown'

export default function WorldCupNavbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { data: countdown } = useCountdown()
    const { data: liveScoresData } = useLiveScores()
    const worldCupStarted = countdown?.worldCupStarted || false

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [mobileMenuOpen])

    // Extract matches from response
    const matches = liveScoresData?.data?.matches || []

    // Fallback mock data for pre-tournament display
    const mockMatches = [
        { home: 'IVORY COAST', away: 'GERMANY', homeScore: 1, awayScore: 0 },
        { home: 'CAMEROON', away: 'JAPAN', homeScore: 0, awayScore: 2 },
        { home: 'SOUTH AFRICA', away: 'ENGLAND', homeScore: 1, awayScore: 3 },
        { home: 'BRAZIL', away: 'NIGERIA', homeScore: 2, awayScore: 1, isLive: true },
        { home: 'FRANCE', away: 'SENEGAL', homeScore: 0, awayScore: 0 },
    ]

    // Use real data if tournament started, otherwise show mock
    const displayMatches = worldCupStarted && matches.length > 0 ? matches : mockMatches

    return (
        <nav className="w-full flex flex-col z-50 sticky top-0 select-none">
            {/* 1. Main Navigation Bar (Top) */}
            <div className="bg-[#12110F] border-b border-white/5 h-[64px] flex items-center justify-between px-4 sm:px-6 lg:px-10 w-full relative z-50">

                {/* Logo */}
                <Link to="/worldcup" className="font-serif text-[20px] sm:text-[24px] font-bold tracking-tight text-white flex items-baseline">
                    imakwa<span className="text-[#C25E36]">.</span>
                </Link>

                {/* Navigation Links - Desktop */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-[13px] font-medium text-white/70 hover:text-white transition-colors flex items-center gap-2">
                        <span>←</span> Back to Gallery
                    </Link>
                    <Link to="/worldcup/products" className="text-[13px] font-medium text-white/70 hover:text-white transition-colors">
                        Browse Collection
                    </Link>
                    <Link to="/worldcup/digital-access" className="text-[13px] font-medium text-white/70 hover:text-white transition-colors">
                        Digital Access
                    </Link>
                    <Link to="/worldcup/licensing" className="text-[13px] font-medium text-white/70 hover:text-white transition-colors">
                        Artist Licensing
                    </Link>
                </div>

                {/* Browse Collection Button - Desktop */}
                <Link
                    to="/worldcup/products"
                    className="hidden md:flex h-[40px] px-6 bg-[#C25E36] hover:bg-[#a64e2c] transition-colors text-white rounded-full text-[13px] font-semibold items-center gap-2"
                >
                    Browse Collection
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Drawer */}
            {mobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Menu Panel */}
                    <div className="md:hidden fixed top-[64px] left-0 right-0 bg-[#12110F] border-b border-white/5 z-40 animate-slide-down">
                        <div className="px-4 py-6 space-y-1">
                            <Link
                                to="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <span>←</span> Back to Gallery
                            </Link>
                            <Link
                                to="/worldcup/products"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            >
                                Browse Collection
                            </Link>
                            <Link
                                to="/worldcup/digital-access"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            >
                                Digital Access
                            </Link>
                            <Link
                                to="/worldcup/licensing"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            >
                                Artist Licensing
                            </Link>
                        </div>
                    </div>
                </>
            )}

            {/* 2. Live Match Ticker (Bottom) */}
            <div className="bg-[#0B2217] relative overflow-hidden h-[38px] flex items-center border-b border-[#0B2217]">
                <div className="animate-scroll flex items-center whitespace-nowrap relative z-10 hover:[animation-play-state:paused]">
                    <div className="flex items-center gap-10 text-[11px] font-mono tracking-widest text-[#B89B5E] font-semibold py-1">

                        {/* Seamless Loop container */}
                        {[...Array(3)].map((_, loopIndex) => (
                            <div key={loopIndex} className="flex items-center gap-10">

                                {/* FIFA World Cup Badge */}
                                <div className="flex items-center gap-3">
                                    <span className="opacity-80">FIFA WORLD CUP 2026</span>
                                    <svg className="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" />
                                    </svg>
                                </div>

                                <span className="text-[#B89B5E]/40 text-[10px]">•</span>

                                {/* Dynamic Matches */}
                                {displayMatches.map((match, idx) => {
                                    // Handle real API data structure vs mock data
                                    const isRealData = match.home_team && match.away_team
                                    const homeName = isRealData ? match.home_team.name.toUpperCase() : match.home
                                    const awayName = isRealData ? match.away_team.name.toUpperCase() : match.away
                                    const homeScore = isRealData ? match.home_team.score : match.homeScore
                                    const awayScore = isRealData ? match.away_team.score : match.awayScore
                                    const isLive = isRealData ? match.status === 'live' : match.isLive
                                    const minute = match.minute

                                    return (
                                        <React.Fragment key={`${loopIndex}-${idx}`}>
                                            <div className="flex items-center gap-3">
                                                {isLive && (
                                                    <span className="bg-[#C25E36] text-white px-2 py-[3px] rounded-sm text-[10px] tracking-wider flex items-center gap-1.5 font-sans font-bold">
                                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                                        LIVE
                                                    </span>
                                                )}
                                                <span>{homeName}</span>
                                                <span className="text-white text-[13px] font-bold px-1 tracking-normal">
                                                    {homeScore ?? 0} — {awayScore ?? 0}
                                                </span>
                                                <span>{awayName}</span>
                                                {minute && isLive && (
                                                    <span className="text-[#C25E36] text-[10px] font-bold">
                                                        {minute}'
                                                    </span>
                                                )}
                                            </div>

                                            {idx < displayMatches.length - 1 && (
                                                <span className="text-[#B89B5E]/40 text-[10px]">•</span>
                                            )}
                                        </React.Fragment>
                                    )
                                })}

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
                @keyframes slide-down {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-scroll {
                    animation: scroll 45s linear infinite;
                    width: max-content;
                }
                .animate-slide-down {
                    animation: slide-down 0.2s ease-out;
                }
            `}</style>
        </nav>
    )
}
