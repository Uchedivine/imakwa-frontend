import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDownloadInfo } from '../../hooks/useDownloadInfo'
import { redeemDownload } from '../../api/worldcup'
import WorldCupNavbar from '../../components/layout/WorldCupNavbar'
import Spinner from '../../components/ui/Spinner'
import Button from '../../components/ui/Button'

export default function WorldCupDownload() {
  const { token } = useParams()
  const { data: info, isLoading, isError, error } = useDownloadInfo(token)

  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState(null)

  const handleDownload = async () => {
    setDownloading(true)
    setDownloadError(null)
    try {
      const response = await redeemDownload(token)
      if (response.download_url) {
        // Redirect browser to download the file directly
        window.location.href = response.download_url
      } else {
        throw new Error('Download URL not found in response.')
      }
    } catch (err) {
      setDownloadError(err.message || 'Failed to trigger download. Please try again or contact support.')
      setDownloading(false)
    }
  }

  // Format expiry date
  const formatExpiry = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Determine state mapping
  const isValid = info?.is_valid
  const isUsed = info?.is_used
  const isExpired = !isValid && !isUsed && info?.expires_at && new Date(info.expires_at) < new Date()
  const isNotFound = isError || (info === null)

  return (
    <div
      className="min-h-screen relative flex flex-col overflow-hidden text-white"
      style={{
        background: 'radial-gradient(circle at center, #124E31 0%, #051A0F 100%)'
      }}
    >
      {/* Mesh Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 L40 0 M0 0 L40 40' fill='none' stroke='rgba(197,166,101,0.07)' stroke-width='0.75'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
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
              <p className="text-sm text-[#7A9E8A]">
                Verifying your download link...
              </p>
            </div>
          ) : isNotFound ? (
            /* ── STATE 2: NOT FOUND (404) ── */
            <div className="space-y-6">
              <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl text-white">
                Invalid Download Link
              </h2>
              <p className="text-sm text-[#7A9E8A] leading-relaxed">
                This link is not valid. Please check the email you received, ensure it was not copied incorrectly, and try again.
              </p>
              <div className="pt-4">
                <Link
                  to="/worldcup"
                  className="px-8 py-3.5 bg-[#C5A665] text-[#0A2215] hover:bg-[#D4B77A] font-bold uppercase tracking-wider text-[11px] rounded-xl transition-all shadow-md inline-block"
                >
                  Return to Collection
                </Link>
              </div>
            </div>
          ) : isUsed ? (
            /* ── STATE 3: ALREADY USED ── */
            <div className="space-y-6">
              <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl text-white">
                Link Already Redeemed
              </h2>
              <p className="text-sm text-[#7A9E8A] leading-relaxed">
                This digital download token has already been consumed and deactivated.
              </p>
              <div className="bg-[#0D2A1C] border border-[#1A3C2A] rounded-xl p-5 text-left text-[12.5px] text-[#7A9E8A] space-y-2.5">
                <p className="font-bold text-[#D4AC52] uppercase tracking-wider text-[9px]">
                  Need assistance?
                </p>
                <p className="leading-relaxed">
                  If you experienced network drops or did not receive the file, please contact our support team at <strong className="text-white">support@imakwa.com</strong> with your payment confirmation reference.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  to="/worldcup"
                  className="px-8 py-3.5 bg-[#C5A665] text-[#0A2215] hover:bg-[#D4B77A] font-bold uppercase tracking-wider text-[11px] rounded-xl transition-all shadow-md inline-block"
                >
                  Back to Collection
                </Link>
              </div>
            </div>
          ) : isExpired ? (
            /* ── STATE 4: EXPIRED ── */
            <div className="space-y-6">
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl text-white">
                Download Link Expired
              </h2>
              <p className="text-sm text-[#7A9E8A] leading-relaxed">
                This download link expired on <strong className="text-white">{formatExpiry(info.expires_at)}</strong>.
              </p>
              <div className="bg-[#0D2A1C] border border-[#1A3C2A] rounded-xl p-5 text-left text-[12.5px] text-[#7A9E8A] space-y-2.5">
                <p className="font-bold text-[#D4AC52] uppercase tracking-wider text-[9px]">
                  Policy details
                </p>
                <p className="leading-relaxed">
                  World Cup digital tokens are active for exactly 30 days post-purchase. If you need to renew your download window, contact <strong className="text-white">support@imakwa.com</strong>.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  to="/worldcup"
                  className="px-8 py-3.5 bg-[#C5A665] text-[#0A2215] hover:bg-[#D4B77A] font-bold uppercase tracking-wider text-[11px] rounded-xl transition-all shadow-md inline-block"
                >
                  Back to Collection
                </Link>
              </div>
            </div>
          ) : (
            /* ── STATE 5: VALID UNUSED REDEMPTION SCREEN ── */
            <div className="space-y-6">
              {/* Ready Icon */}
              <div className="w-16 h-16 bg-[#C5A665]/10 border border-[#C5A665]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-[#C5A665]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold text-[#D4AC52] uppercase tracking-wider">
                  Download Ready
                </p>
                <h2 className="font-serif text-3xl text-white">
                  {info.product}
                </h2>
                <p className="text-sm text-[#7A9E8A] font-medium">
                  {info.tier}
                </p>
              </div>

              {/* Expired warning */}
              <p className="text-xs text-[#7A9E8A]">
                Link expires: <span className="text-white font-semibold">{formatExpiry(info.expires_at)}</span>
              </p>

              {/* Important warning banner */}
              <div className="bg-amber-500/10 border-l-[3px] border-amber-500 p-5 rounded-r-xl text-left text-[12.5px] text-[#7A9E8A] space-y-2">
                <p className="font-bold text-amber-500 uppercase tracking-wider text-[9px]">
                  One-time use warning
                </p>
                <p className="leading-relaxed">
                  This download link can only be resolved **once**. Clicking the download button below will permanently consume the token and invalidate this page. Please ensure you are on a stable connection and save the file immediately.
                </p>
              </div>

              {downloadError && (
                <div className="p-3 bg-red-500/15 border border-red-500/20 rounded-lg text-xs text-red-400">
                  {downloadError}
                </div>
              )}

              <div className="pt-4 flex flex-col gap-4">
                <Button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full py-4.5 bg-[#C5A665] text-[#0A2215] hover:bg-[#D4B77A] font-bold uppercase tracking-wider text-[11px] rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {downloading ? (
                    <>
                      <Spinner size="sm" />
                      Downloading File...
                    </>
                  ) : (
                    'Download Collection Archive'
                  )}
                </Button>
                <Link
                  to="/worldcup"
                  className="text-xs text-[#7A9E8A] hover:text-white transition-colors"
                >
                  Cancel and go back
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
