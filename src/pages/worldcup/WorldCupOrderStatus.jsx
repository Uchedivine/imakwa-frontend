import { Link, useParams } from 'react-router-dom'
import WorldCupNavbar from '../../components/layout/WorldCupNavbar'
import WorldCupFooter from '../../components/layout/WorldCupFooter'
import Spinner from '../../components/ui/Spinner'
import { useWorldCupOrder } from '../../hooks/useWorldCupOrder'

export default function WorldCupOrderStatus() {
    const { id } = useParams()
    const { data: order, isLoading, isError } = useWorldCupOrder({ orderId: id })

    return (
        <div
            className="min-h-screen relative flex flex-col overflow-hidden"
            style={{
                background: 'radial-gradient(circle at center, #124E31 0%, #051A0F 100%)',
            }}
        >
            {/* Mesh Pattern */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 L40 0 M0 0 L40 40' fill='none' stroke='rgba(197,166,101,0.07)' stroke-width='0.75'/%3E%3C/svg%3E")`,
                    backgroundSize: '40px 40px',
                }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#03130A_100%)] opacity-70 pointer-events-none z-0" />

            <WorldCupNavbar />

            <div className="flex-1 relative z-10 flex items-center justify-center p-6">
                <div className="bg-[#0A2215]/60 border border-[#1A3C2A] rounded-2xl shadow-2xl max-w-lg w-full p-8 md:p-10 backdrop-blur-md text-center">
                    {isLoading ? (
                        /* ── STATE 1: LOADING ── */
                        <div className="py-10 space-y-4 flex flex-col items-center">
                            <Spinner size="lg" className="text-[#C5A665]" />
                            <p className="text-sm text-[#7A9E8A]">Loading order status...</p>
                        </div>
                    ) : isError || !order ? (
                        /* ── STATE 2: NOT FOUND (404) ── */
                        <div className="space-y-6">
                            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                <svg
                                    className="w-8 h-8 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h2 className="font-serif text-2xl text-white">Order Not Found</h2>
                            <p className="text-sm text-[#7A9E8A] leading-relaxed">
                                We couldn't find an order with ID <strong className="text-white">{id}</strong>. Please check the order ID and try again.
                            </p>
                            <div className="pt-4 flex flex-col gap-3">
                                <Link
                                    to="/worldcup/lookup"
                                    className="px-8 py-3.5 bg-[#C5A665] text-[#0A2215] hover:bg-[#D4B77A] font-bold uppercase tracking-wider text-[11px] rounded-xl transition-all shadow-md inline-block"
                                >
                                    Look Up By Email
                                </Link>
                                <Link
                                    to="/worldcup"
                                    className="text-xs text-[#7A9E8A] hover:text-white transition-colors"
                                >
                                    Back to Collection
                                </Link>
                            </div>
                        </div>
                    ) : order.payment_status === 'pending' ? (
                        /* ── STATE 3: PAYMENT PENDING ── */
                        <div className="space-y-6">
                            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                <svg
                                    className="w-8 h-8 text-amber-500 animate-spin"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                            </div>
                            <h2 className="font-serif text-2xl text-white">Payment Processing</h2>
                            <div className="text-left bg-[#0D2A1C] border border-[#1A3C2A] rounded-xl p-5 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#7A9E8A]">Order ID:</span>
                                    <span className="text-white font-mono">{order.id}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#7A9E8A]">Product:</span>
                                    <span className="text-white">{order.product_name}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#7A9E8A]">Tier:</span>
                                    <span className="text-white">{order.tier_label}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#7A9E8A]">Amount:</span>
                                    <span className="text-white font-bold">${order.amount?.toLocaleString()}</span>
                                </div>
                            </div>
                            <p className="text-sm text-[#7A9E8A] leading-relaxed">
                                Your payment is still processing. This usually takes a few moments. Check your email shortly for confirmation and download instructions.
                            </p>
                            <div className="pt-4">
                                <Link
                                    to="/worldcup"
                                    className="text-xs text-[#7A9E8A] hover:text-white transition-colors"
                                >
                                    Back to Collection
                                </Link>
                            </div>
                        </div>
                    ) : order.payment_status === 'paid' && !order.token_used ? (
                        /* ── STATE 4: PAID, TOKEN UNUSED ── */
                        <div className="space-y-6">
                            <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                <svg
                                    className="w-8 h-8 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="font-serif text-2xl text-white">Payment Confirmed</h2>
                            <div className="text-left bg-[#0D2A1C] border border-[#1A3C2A] rounded-xl p-5 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#7A9E8A]">Order ID:</span>
                                    <span className="text-white font-mono">{order.id}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#7A9E8A]">Product:</span>
                                    <span className="text-white">{order.product_name}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#7A9E8A]">Tier:</span>
                                    <span className="text-white">{order.tier_label}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#7A9E8A]">Status:</span>
                                    <span className="inline-flex items-center px-2.5 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider rounded">
                                        ✓ Paid
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-[#7A9E8A] leading-relaxed">
                                Your download link has been sent to your email. If you didn't receive it, you can look it up below.
                            </p>
                            <div className="pt-4 flex flex-col gap-3">
                                <Link
                                    to="/worldcup/lookup"
                                    className="px-8 py-3.5 bg-[#C5A665] text-[#0A2215] hover:bg-[#D4B77A] font-bold uppercase tracking-wider text-[11px] rounded-xl transition-all shadow-md inline-block"
                                >
                                    Recover Download Link
                                </Link>
                                <Link
                                    to="/worldcup"
                                    className="text-xs text-[#7A9E8A] hover:text-white transition-colors"
                                >
                                    Back to Collection
                                </Link>
                            </div>
                        </div>
                    ) : order.payment_status === 'paid' && order.token_used ? (
                        /* ── STATE 5: PAID, TOKEN USED ── */
                        <div className="space-y-6">
                            <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                <svg
                                    className="w-8 h-8 text-blue-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h2 className="font-serif text-2xl text-white">Download Redeemed</h2>
                            <div className="text-left bg-[#0D2A1C] border border-[#1A3C2A] rounded-xl p-5 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#7A9E8A]">Order ID:</span>
                                    <span className="text-white font-mono">{order.id}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#7A9E8A]">Product:</span>
                                    <span className="text-white">{order.product_name}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#7A9E8A]">Status:</span>
                                    <span className="inline-flex items-center px-2.5 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded">
                                        ✓ Downloaded
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-[#7A9E8A] leading-relaxed">
                                Your download has already been redeemed. If you need assistance, please contact support at{' '}
                                <a href="mailto:support@imakwa.com" className="text-[#C5A665] hover:text-[#D4B77A] font-medium">
                                    support@imakwa.com
                                </a>
                            </p>
                            <div className="pt-4">
                                <Link
                                    to="/worldcup"
                                    className="text-xs text-[#7A9E8A] hover:text-white transition-colors"
                                >
                                    Back to Collection
                                </Link>
                            </div>
                        </div>
                    ) : (
                        /* ── STATE 6: PAYMENT FAILED ── */
                        <div className="space-y-6">
                            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                <svg
                                    className="w-8 h-8 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h2 className="font-serif text-2xl text-white">Payment Unsuccessful</h2>
                            <p className="text-sm text-[#7A9E8A] leading-relaxed">
                                Your payment could not be processed. Please try purchasing again or contact support if the issue persists.
                            </p>
                            <div className="pt-4 flex flex-col gap-3">
                                <Link
                                    to="/worldcup/products"
                                    className="px-8 py-3.5 bg-[#C5A665] text-[#0A2215] hover:bg-[#D4B77A] font-bold uppercase tracking-wider text-[11px] rounded-xl transition-all shadow-md inline-block"
                                >
                                    Browse Products
                                </Link>
                                <a
                                    href="mailto:support@imakwa.com"
                                    className="text-xs text-[#7A9E8A] hover:text-white transition-colors"
                                >
                                    Contact Support
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Secondary Link - Email Lookup Disambiguation */}
                    {order && (
                        <div className="mt-8 pt-6 border-t border-[#1A3C2A]">
                            <p className="text-xs text-[#7A9E8A]">
                                Don't have your order ID?{' '}
                                <Link to="/worldcup/lookup" className="text-[#C5A665] hover:text-[#D4B77A] font-medium">
                                    Look up by email instead
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <WorldCupFooter />
        </div>
    )
}
