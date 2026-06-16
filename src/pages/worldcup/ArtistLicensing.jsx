import { Link } from 'react-router-dom'
import WorldCupNavbar from '../../components/layout/WorldCupNavbar'
import WorldCupFooter from '../../components/layout/WorldCupFooter'
import CountdownBanner from '../../components/worldcup/CountdownBanner'
import SectionReveal from '../../components/ui/SectionReveal'

export default function ArtistLicensing() {
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
                        <span className="text-charcoal font-medium">Artist Licensing</span>
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
                        SUPPORTING AFRICAN ARTISTS
                    </p>
                    <h1 className="font-serif text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] font-normal leading-tight mb-4 sm:mb-6 text-white">
                        Artist <span className="italic text-[#C5A665]">Licensing</span>
                    </h1>
                    <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#8DA094] max-w-2xl mx-auto px-4">
                        How we compensate artists and structure licensing for the World Cup 2026 collection
                    </p>
                </div>
            </section>

            {/* How Artists Are Paid Section */}
            <SectionReveal>
                <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="text-center mb-10 sm:mb-14 md:mb-16">
                            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal mb-3 sm:mb-4">
                                How Artists Are <span className="italic text-[#C1623F]">Compensated</span>
                            </h2>
                            <p className="text-charcoal-soft text-xs sm:text-sm max-w-2xl mx-auto">
                                Transparent, ethical revenue sharing with every digital sale
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
                            {/* Revenue Share */}
                            <div className="bg-[#FDFBF7] border border-charcoal/5 rounded-xl p-6 sm:p-8 text-center">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#C5A665]/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-serif text-xl sm:text-2xl text-charcoal mb-2">Fair Split</h3>
                                <p className="text-xs sm:text-sm text-charcoal-soft leading-relaxed mb-3">
                                    Artists receive a significant percentage of every sale, ensuring sustainable creative work
                                </p>
                                <div className="text-2xl sm:text-3xl font-bold font-serif text-[#C5A665]">60%</div>
                                <p className="text-xs text-charcoal-soft mt-1">to artists</p>
                            </div>

                            {/* Direct Payment */}
                            <div className="bg-[#FDFBF7] border border-charcoal/5 rounded-xl p-8 text-center">
                                <div className="w-16 h-16 bg-[#C5A665]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="font-serif text-2xl text-charcoal mb-2">Direct Payments</h3>
                                <p className="text-sm text-charcoal-soft leading-relaxed mb-3">
                                    No middlemen or delayed royalties. Artists are paid directly and promptly
                                </p>
                                <div className="text-3xl font-bold font-serif text-[#C5A665]">Monthly</div>
                                <p className="text-xs text-charcoal-soft mt-1">payment cycle</p>
                            </div>

                            {/* Passive Income */}
                            <div className="bg-[#FDFBF7] border border-charcoal/5 rounded-xl p-8 text-center">
                                <div className="w-16 h-16 bg-[#C5A665]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </div>
                                <h3 className="font-serif text-2xl text-charcoal mb-2">Recurring Revenue</h3>
                                <p className="text-sm text-charcoal-soft leading-relaxed mb-3">
                                    Your work continues earning long after creation, building lasting value
                                </p>
                                <div className="text-3xl font-bold font-serif text-[#C5A665]">∞</div>
                                <p className="text-xs text-charcoal-soft mt-1">lifetime earning potential</p>
                            </div>
                        </div>

                        {/* Revenue Breakdown */}
                        <div className="bg-[#0A2215] border border-[#1A3C2A] rounded-2xl p-6 sm:p-8 md:p-10">
                            <h3 className="font-serif text-xl sm:text-2xl text-white mb-5 sm:mb-6 text-center">Revenue Distribution Model</h3>
                            <div className="max-w-[600px] mx-auto space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-[#8DA094]">Artist Royalties</span>
                                            <span className="text-sm font-bold text-white">60%</span>
                                        </div>
                                        <div className="w-full bg-[#1A3C2A] rounded-full h-3">
                                            <div className="bg-[#C5A665] h-3 rounded-full" style={{ width: '60%' }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-[#8DA094]">Platform & Distribution</span>
                                            <span className="text-sm font-bold text-white">25%</span>
                                        </div>
                                        <div className="w-full bg-[#1A3C2A] rounded-full h-3">
                                            <div className="bg-[#8DA094] h-3 rounded-full" style={{ width: '25%' }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-[#8DA094]">Payment Processing</span>
                                            <span className="text-sm font-bold text-white">15%</span>
                                        </div>
                                        <div className="w-full bg-[#1A3C2A] rounded-full h-3">
                                            <div className="bg-[#5B7566] h-3 rounded-full" style={{ width: '15%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-[#7A9E8A] text-center mt-8">
                                Artists receive the majority of revenue from every sale, ensuring sustainable creative practice
                            </p>
                        </div>
                    </div>
                </section>
            </SectionReveal>

            {/* Licensing Structure Section */}
            <SectionReveal>
                <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#FDFBF7]">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="text-center mb-10 sm:mb-14 md:mb-16">
                            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal mb-3 sm:mb-4">
                                Licensing <span className="italic text-[#C1623F]">Structure</span>
                            </h2>
                            <p className="text-charcoal-soft text-xs sm:text-sm max-w-2xl mx-auto">
                                How rights are managed between artists and Imakwa
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            {/* What Artists Retain */}
                            <div className="bg-white border border-charcoal/10 rounded-2xl p-6 sm:p-8">
                                <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-serif text-xl sm:text-2xl text-charcoal">Artists Retain</h3>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 font-bold mt-0.5">✓</span>
                                        <div>
                                            <p className="text-sm font-semibold text-charcoal">Full Copyright Ownership</p>
                                            <p className="text-xs text-charcoal-soft">You own your work completely</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 font-bold mt-0.5">✓</span>
                                        <div>
                                            <p className="text-sm font-semibold text-charcoal">Original Files & Masters</p>
                                            <p className="text-xs text-charcoal-soft">All source materials remain yours</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 font-bold mt-0.5">✓</span>
                                        <div>
                                            <p className="text-sm font-semibold text-charcoal">Future Use Rights</p>
                                            <p className="text-xs text-charcoal-soft">Sell elsewhere, create derivatives</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 font-bold mt-0.5">✓</span>
                                        <div>
                                            <p className="text-sm font-semibold text-charcoal">Attribution Rights</p>
                                            <p className="text-xs text-charcoal-soft">Your name on every sale</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 font-bold mt-0.5">✓</span>
                                        <div>
                                            <p className="text-sm font-semibold text-charcoal">Portfolio Showcase</p>
                                            <p className="text-xs text-charcoal-soft">Use in your promotional materials</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* What Imakwa Handles */}
                            <div className="bg-white border border-charcoal/10 rounded-2xl p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-[#C5A665]/10 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-serif text-2xl text-charcoal">Imakwa Manages</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#C5A665] font-bold mt-0.5">◆</span>
                                        <div>
                                            <p className="text-sm font-semibold text-charcoal">Distribution & Fulfillment</p>
                                            <p className="text-xs text-charcoal-soft">Hosting, delivery, customer support</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-[#C5A665] font-bold mt-0.5">◆</span>
                                        <div>
                                            <p className="text-sm font-semibold text-charcoal">Payment Processing</p>
                                            <p className="text-xs text-charcoal-soft">Secure checkout, fraud prevention</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-[#C5A665] font-bold mt-0.5">◆</span>
                                        <div>
                                            <p className="text-sm font-semibold text-charcoal">Marketing & Promotion</p>
                                            <p className="text-xs text-charcoal-soft">Audience reach, campaigns, SEO</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-[#C5A665] font-bold mt-0.5">◆</span>
                                        <div>
                                            <p className="text-sm font-semibold text-charcoal">License Management</p>
                                            <p className="text-xs text-charcoal-soft">Commercial licensing, compliance</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-[#C5A665] font-bold mt-0.5">◆</span>
                                        <div>
                                            <p className="text-sm font-semibold text-charcoal">Royalty Tracking & Reporting</p>
                                            <p className="text-xs text-charcoal-soft">Transparent sales data</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionReveal>

            {/* Artist Benefits Section */}
            <SectionReveal>
                <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white">
                    <div className="max-w-[1000px] mx-auto">
                        <div className="text-center mb-10 sm:mb-14 md:mb-16">
                            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal mb-3 sm:mb-4">
                                Why Partner With <span className="italic text-[#C1623F]">Imakwa?</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-[#C5A665]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-charcoal mb-1">Global Reach</h3>
                                    <p className="text-sm text-charcoal-soft">Access international collectors without leaving home</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-[#C5A665]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-charcoal mb-1">Zero Production Costs</h3>
                                    <p className="text-sm text-charcoal-soft">No printing, shipping, or inventory expenses</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-[#C5A665]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-charcoal mb-1">Transparent Analytics</h3>
                                    <p className="text-sm text-charcoal-soft">Real-time sales data and performance tracking</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-[#C5A665]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-charcoal mb-1">Community Building</h3>
                                    <p className="text-sm text-charcoal-soft">Join a collective of African artists gaining global recognition</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-[#C5A665]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-charcoal mb-1">Rights Protection</h3>
                                    <p className="text-sm text-charcoal-soft">We enforce licensing terms and prevent unauthorized use</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-[#C5A665]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-charcoal mb-1">Fast Payments</h3>
                                    <p className="text-sm text-charcoal-soft">Monthly payouts with no minimum threshold</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionReveal>

            {/* CTA Section for Artists */}
            <SectionReveal>
                <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#FDFBF7]">
                    <div className="max-w-[800px] mx-auto">
                        <div className="bg-gradient-to-br from-[#0A2215] to-[#051A0F] rounded-2xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden">
                            <div
                                className="absolute inset-0 opacity-5"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 L40 0 M0 0 L40 40' fill='none' stroke='rgba(197,166,101,0.5)' stroke-width='0.75'/%3E%3C/svg%3E")`,
                                    backgroundSize: '40px 40px',
                                }}
                            />

                            <div className="relative z-10">
                                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white mb-3 sm:mb-4">
                                    Interested in <span className="italic text-[#C5A665]">Licensing?</span>
                                </h2>
                                <p className="text-[#8DA094] text-xs sm:text-sm mb-6 sm:mb-8 max-w-xl mx-auto">
                                    We're always looking for talented African artists to join our roster. Get in touch to discuss licensing opportunities.
                                </p>
                                <a
                                    href="mailto:licensing@imakwa.com?subject=Artist Licensing Inquiry"
                                    className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-6 sm:px-8 py-3 sm:py-4 bg-[#C5A665] text-[#092215] rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#D4B77A] transition-all shadow-lg hover:shadow-xl min-h-[48px] sm:min-h-0"
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Contact Licensing Team
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionReveal>

            {/* Browse Collection CTA */}
            <SectionReveal>
                <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white">
                    <div className="max-w-[800px] mx-auto text-center">
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal mb-4 sm:mb-6">
                            View The <span className="italic text-[#C1623F]">Collection</span>
                        </h2>
                        <p className="text-charcoal-soft text-xs sm:text-sm mb-6 sm:mb-8 max-w-2xl mx-auto">
                            Discover works from 46 African artists celebrating the beautiful game
                        </p>
                        <Link
                            to="/worldcup/products"
                            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-4 bg-[#111111] text-white rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-black transition-all shadow-lg hover:shadow-xl min-h-[48px] sm:min-h-0"
                        >
                            Browse the Collection
                        </Link>
                    </div>
                </section>
            </SectionReveal>

            <WorldCupFooter />
        </div>
    )
}
