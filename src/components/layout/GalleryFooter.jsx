import { Link } from 'react-router-dom'

const footerLinks = {
  discover: [
    { label: 'New Arrivals', href: '/new' },
    { label: 'Curated Collections', href: '/collections' },
    { label: 'Artist Editions', href: '/editions' },
    { label: 'Sculptures', href: '/sculptures' },
    { label: 'Digital Art', href: '/digital' },
    { label: 'Textiles & Crafts', href: '/textiles' }
  ],
  artistsAndSellers: [
    { label: 'Apply as an Artist', href: '/apply' },
    { label: 'Artist Dashboard', href: '/dashboard' },
    { label: 'Commission Policy', href: '/commission' },
    { label: 'Artist Guidelines', href: '/guidelines' },
    { label: 'Shipping Partners', href: '/shipping' }
  ],
  support: [
    { label: 'About Imakwa', href: '/about' },
    { label: 'Authentication Process', href: '/authentication' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Press & Media', href: '/press' }
  ]
}

const socialLinks = [
  { icon: 'instagram', href: 'https://instagram.com', ariaLabel: 'Instagram' },
  { icon: 'twitter', href: 'https://twitter.com', ariaLabel: 'Twitter' },
  { icon: 'facebook', href: 'https://facebook.com', ariaLabel: 'Facebook' },
  { icon: 'pinterest', href: 'https://pinterest.com', ariaLabel: 'Pinterest' }
]

export default function GalleryFooter() {
  return (
    <footer className="bg-[#1C1915] text-white font-sans antialiased">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-10 sm:py-12 md:py-16">

        {/* Responsive Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-12 mb-12 sm:mb-14 md:mb-16">

          {/* Brand Column */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4 sm:mb-5">
              <span className="font-display text-[20px] sm:text-[22px] font-normal tracking-tight text-white">
                imakwa<span className="text-[#C05C3D]">.</span>
              </span>
            </Link>
            <p className="text-xs sm:text-[13px] leading-[1.65] text-[#A39E93] mb-5 sm:mb-6 max-w-[260px]">
              Where authentic African artistry meets the global collector. Every piece tells a story older than any gallery wall.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2.5">
              {socialLinks.map(({ icon, href, ariaLabel }) => (
                <a
                  key={icon}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#A39E93] hover:border-white/30 hover:text-white transition-colors"
                >
                  {icon === 'instagram' && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  )}
                  {icon === 'twitter' && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  )}
                  {icon === 'facebook' && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  {icon === 'pinterest' && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Discover Column */}
          <div>
            <h3 className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase text-white mb-3.5 sm:mb-4.5">
              DISCOVER
            </h3>
            <ul className="space-y-2.5 sm:space-y-3.5">
              {footerLinks.discover.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-xs sm:text-[13px] text-[#A39E93] hover:text-white transition-colors duration-150 ease-out"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Artists & Sellers Column */}
          <div>
            <h3 className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase text-white mb-3.5 sm:mb-4.5">
              ARTISTS & SELLERS
            </h3>
            <ul className="space-y-2.5 sm:space-y-3.5">
              {footerLinks.artistsAndSellers.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-xs sm:text-[13px] text-[#A39E93] hover:text-white transition-colors duration-150 ease-out"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase text-white mb-3.5 sm:mb-4.5">
              SUPPORT
            </h3>
            <ul className="space-y-2.5 sm:space-y-3.5">
              {footerLinks.support.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-xs sm:text-[13px] text-[#A39E93] hover:text-white transition-colors duration-150 ease-out"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar Container */}
        <div className="pt-5 sm:pt-6 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4 text-[11px] sm:text-[12px] text-[#A39E93]/60">
          <p>
            © 2025 Imakwa.co — All rights reserved. Honoring African creativity worldwide.
          </p>
          <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2">
            <Link to="/privacy" className="hover:text-white transition-colors duration-150">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-150">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-white transition-colors duration-150">
              Cookie Settings
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}