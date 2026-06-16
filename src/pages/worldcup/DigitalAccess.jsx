import { Link } from 'react-router-dom'
import WorldCupNavbar from '../../components/layout/WorldCupNavbar'
import WorldCupFooter from '../../components/layout/WorldCupFooter'
import CountdownBanner from '../../components/worldcup/CountdownBanner'
import SectionReveal from '../../components/ui/SectionReveal'

export default function DigitalAccess() {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <WorldCupNavbar />
            <CountdownBanner />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-charcoal/5 py-3 sm:py-4 px-4 sm:px-6 md:px-8">
                <div className="max-w-[1400px] mx-auto">
                    <nav className="flex items-center gap-2 text-xs sm:text-sm text-charcoal-soft">
                        <Link to="/worldcup" className="hover:text-[#C5A665] transition-colors">
                            World Cup
                        </Link>
                        <span>→</span>
                        <span className="text-charcoal font-medium">Digital Access</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <section
                className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden"
                style={{
                    background: 'radial-gradient(circle at center, #124E31 0%, #051A0F 100%)',
                }}
            >
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 L40 0 M0 0 L40 40' fill='none' stroke='rgba(197,166,101,0.07)' stroke-width='0.75'/%3E%3C/svg%3E")`,
                        backgroundSize: '40px 40px',
                    }}
                />

                <div className="relative z-10 max-w-[900px] mx-auto text-center">
                    <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A665] mb-3 sm:mb-4">
                        UNDERSTANDING THE MODEL
                    </p>
                    <h1 className="font-serif text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] font-normal leading-tight mb-4 sm:mb-6 text-white">
                        Digital <span className="italic text-[#C5A665]">Access</span>
                    </h1>
                    <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#8DA094] max-w-2xl mx-auto px-4">
                        Everything you need to know about owning digital art from the World Cup 2026 collection
                    </p>
                </div>
            </section>

            {/* What You Get Section */}
            <SectionReveal>
                <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="text-center mb-10 sm:mb-14 md:mb-16">
                            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal mb-3 sm:mb-4">
                                What You <span className="italic text-[#C1623F]">Receive</span>
                            </h2>
                            <p className="text-charcoal-soft text-xs sm:text-sm max-w-2xl mx-auto">
                                Every purchase includes instant access to high-resolution files with lifetime ownership
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                            {/* Feature 1 */}
                            <div className="bg-[#FDFBF7] border border-charcoal/5 rounded-xl p-6 text-center">
                                <div className="w-12 h-12 bg-[#C5A665]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-charcoal mb-2">Instant Download</h3>
                                <p className="text-xs text-charcoal-soft leading-relaxed">
                                    Files delivered to your inbox within seconds of payment confirmation
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-[#FDFBF7] border border-charcoal/5 rounded-xl p-6 text-center">
                                <div className="w-12 h-12 bg-[#C5A665]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-charcoal mb-2">Lifetime Access</h3>
                                <p className="text-xs text-charcoal-soft leading-relaxed">
                                    No subscriptions, no recurring fees. Purchase once, own forever
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-[#FDFBF7] border border-charcoal/5 rounded-xl p-6 text-center">
                                <div className="w-12 h-12 bg-[#C5A665]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-charcoal mb-2">Multiple Formats</h3>
                                <p className="text-xs text-charcoal-soft leading-relaxed">
                                    JPEG, TIFF, and .MATTE files for Samsung Frame TV compatibility
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-[#FDFBF7] border border-charcoal/5 rounded-xl p-6 text-center">
                                <div className="w-12 h-12 bg-[#C5A665]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-charcoal mb-2">Cloud Ready</h3>
                                <p className="text-xs text-charcoal-soft leading-relaxed">
                                    Store in Google Drive, Dropbox, or iCloud for access across all devices
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionReveal>

            {/* How It Works Section */}
            <SectionReveal>
                <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#FDFBF7]">
                    <div className="max-w-[1000px] mx-auto">
                        <div className="text-center mb-10 sm:mb-14 md:mb-16">
                            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal mb-3 sm:mb-4">
                                How It <span className="italic text-[#C1623F]">Works</span>
                            </h2>
                            <p className="text-charcoal-soft text-xs sm:text-sm max-w-2xl mx-auto">
                                From selection to download in four simple steps
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                            {/* Step 1 */}
                            <div className="text-center">
                                <div className="w-16 h-16 bg-[#C5A665] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold font-serif">
                                    1
                                </div>
                                <h3 className="font-semibold text-charcoal mb-2 text-sm">Select Your Tier</h3>
                                <p className="text-xs text-charcoal-soft leading-relaxed">
                                    Choose the license that fits your needs
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="text-center">
                                <div className="w-16 h-16 bg-[#C5A665] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold font-serif">
                                    2
                                </div>
                                <h3 className="font-semibold text-charcoal mb-2 text-sm">Complete Payment</h3>
                                <p className="text-xs text-charcoal-soft leading-relaxed">
                                    Secure checkout via Stripe or Paystack
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="text-center">
                                <div className="w-16 h-16 bg-[#C5A665] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold font-serif">
                                    3
                                </div>
                                <h3 className="font-semibold text-charcoal mb-2 text-sm">Check Your Email</h3>
                                <p className="text-xs text-charcoal-soft leading-relaxed">
                                    Download link arrives within seconds
                                </p>
                            </div>

                            {/* Step 4 */}
                            <div className="text-center">
                                <div className="w-16 h-16 bg-[#C5A665] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold font-serif">
                                    4
                                </div>
                                <h3 className="font-semibold text-charcoal mb-2 text-sm">Download & Enjoy</h3>
                                <p className="text-xs text-charcoal-soft leading-relaxed">
                                    Use on all your devices, forever
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionReveal>

            {/* License Types Section */}
            <SectionReveal>
                <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="text-center mb-10 sm:mb-14 md:mb-16">
                            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal mb-3 sm:mb-4">
                                License <span className="italic text-[#C1623F]">Types</span>
                            </h2>
                            <p className="text-charcoal-soft text-xs sm:text-sm max-w-2xl mx-auto">
                                Understanding what you can do with your digital files
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            {/* Personal License */}
                            <div className="bg-[#FDFBF7] border border-charcoal/10 rounded-2xl p-6 sm:p-8">
                                <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#C5A665]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl sm:text-2xl text-charcoal mb-1.5 sm:mb-2">Personal Use</h3>
                                        <p className="text-[10px] sm:text-xs text-[#C5A665] font-semibold uppercase tracking-wider">Tiers I, II, III</p>
                                    </div>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold text-sm mt-0.5">✓</span>
                                        <p className="text-sm text-charcoal-soft">Use as phone/desktop wallpapers</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold text-sm mt-0.5">✓</span>
                                        <p className="text-sm text-charcoal-soft">Display on personal TV screens</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold text-sm mt-0.5">✓</span>
                                        <p className="text-sm text-charcoal-soft">Share with immediate family</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold text-sm mt-0.5">✓</span>
                                        <p className="text-sm text-charcoal-soft">Print for home decoration</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-red-500 font-bold text-sm mt-0.5">✗</span>
                                        <p className="text-sm text-charcoal-soft">Resell or redistribute files</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-red-500 font-bold text-sm mt-0.5">✗</span>
                                        <p className="text-sm text-charcoal-soft">Use in commercial projects</p>
                                    </div>
                                </div>
                            </div>

                            {/* Commercial License */}
                            <div className="bg-[#0A2215] border border-[#1A3C2A] rounded-2xl p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 bg-[#C5A665]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-2xl text-white mb-2">Commercial Use</h3>
                                        <p className="text-xs text-[#C5A665] font-semibold uppercase tracking-wider">Tier IV</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-400 font-bold text-sm mt-0.5">✓</span>
                                        <p className="text-sm text-[#8DA094]">Display in hotels and lounges</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-400 font-bold text-sm mt-0.5">✓</span>
                                        <p className="text-sm text-[#8DA094]">Public venue projection rights</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-400 font-bold text-sm mt-0.5">✓</span>
                                        <p className="text-sm text-[#8DA094]">Custom co-branding available</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-400 font-bold text-sm mt-0.5">✓</span>
                                        <p className="text-sm text-[#8DA094]">Dedicated licensing certificate</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-red-400 font-bold text-sm mt-0.5">✗</span>
                                        <p className="text-sm text-[#8DA094]">Multi-venue use (requires additional licenses)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionReveal>

            {/* FAQ Section */}
            <SectionReveal>
                <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#FDFBF7]">
                    <div className="max-w-[900px] mx-auto">
                        <div className="text-center mb-10 sm:mb-14 md:mb-16">
                            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal mb-3 sm:mb-4">
                                Frequently <span className="italic text-[#C1623F]">Asked</span>
                            </h2>
                        </div>

                        <div className="space-y-5 sm:space-y-6">
                            {/* FAQ 1 */}
                            <div className="bg-white border border-charcoal/10 rounded-xl p-6">
                                <h3 className="font-semibold text-charcoal mb-2">Can I print these files?</h3>
                                <p className="text-sm text-charcoal-soft leading-relaxed">
                                    Yes, all tiers include personal print rights for home decoration. For commercial printing or resale, you'll need a Tier IV commercial license.
                                </p>
                            </div>

                            {/* FAQ 2 */}
                            <div className="bg-white border border-charcoal/10 rounded-xl p-6">
                                <h3 className="font-semibold text-charcoal mb-2">What if I lose my download link?</h3>
                                <p className="text-sm text-charcoal-soft leading-relaxed">
                                    Use our order lookup tool at <Link to="/worldcup/lookup" className="text-[#C5A665] hover:underline">worldcup/lookup</Link> to recover your download by entering your email address.
                                </p>
                            </div>

                            {/* FAQ 3 */}
                            <div className="bg-white border border-charcoal/10 rounded-xl p-6">
                                <h3 className="font-semibold text-charcoal mb-2">Do the files expire?</h3>
                                <p className="text-sm text-charcoal-soft leading-relaxed">
                                    Download tokens expire after 30 days, but once you've downloaded the files, you own them forever. We recommend backing up to cloud storage immediately.
                                </p>
                            </div>

                            {/* FAQ 4 */}
                            <div className="bg-white border border-charcoal/10 rounded-xl p-6">
                                <h3 className="font-semibold text-charcoal mb-2">Can I share with family?</h3>
                                <p className="text-sm text-charcoal-soft leading-relaxed">
                                    Yes, personal use licenses allow sharing with immediate family members for non-commercial use. Public distribution or resale is not permitted.
                                </p>
                            </div>

                            {/* FAQ 5 */}
                            <div className="bg-white border border-charcoal/10 rounded-xl p-6">
                                <h3 className="font-semibold text-charcoal mb-2">What devices are supported?</h3>
                                <p className="text-sm text-charcoal-soft leading-relaxed">
                                    Files work on any device that supports JPEG or TIFF formats — iOS, Android, Windows, Mac, Samsung Frame TV, and most smart displays.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionReveal>

            {/* CTA Section */}
            <SectionReveal>
                <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white">
                    <div className="max-w-[800px] mx-auto text-center">
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal mb-4 sm:mb-6">
                            Ready to Start Your <span className="italic text-[#C1623F]">Collection?</span>
                        </h2>
                        <p className="text-charcoal-soft text-xs sm:text-sm mb-6 sm:mb-8 max-w-2xl mx-auto">
                            Browse the complete World Cup 2026 digital collection and find the perfect tier for your needs
                        </p>
                        <Link
                            to="/worldcup/products"
                            className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-6 sm:px-8 py-3 sm:py-4 bg-[#C5A665] text-[#092215] rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#D4B77A] transition-all shadow-lg hover:shadow-xl min-h-[48px] sm:min-h-0"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            Browse the Collection
                        </Link>
                    </div>
                </section>
            </SectionReveal>

            <WorldCupFooter />
        </div>
    )
}
