import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { useAuthStore } from '../../store/authStore'
import { useFavoritesStore } from '../../store/favoritesStore'
import CartDrawer from '../cart/CartDrawer'

const dropdownCategories = [
  { name: 'Paintings & Canvas', icon: '🖼️', to: '/browse?category=paintings' },
  { name: 'Sculptures', icon: '🗿', to: '/browse?category=sculpture' },
  { name: 'Digital Art', icon: '💻', to: '/browse?category=digital' },
  { name: 'Textiles & Crafts', icon: '🧵', to: '/browse?category=textiles' },
  { name: 'Photography', icon: '📷', to: '/browse?category=photography' },
];

export default function GalleryNavbar() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { items } = useCartStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { favorites } = useFavoritesStore();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
      setMenuOpen(false)
    }
  }

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <>
      <nav className="bg-[#FCFBF8] border-b border-[#1c1a17]/5 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">

          {/* --- LEFT SECTION: Logo & Search --- */}
          <div className="flex items-center gap-8 flex-1">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-[38px] h-[38px] rounded-full bg-[#1A1A1A] flex items-center justify-center">
                <div className="w-[18px] h-[18px] rounded-full border-[2px] border-[#C25E36] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#D29B38]"></div>
                </div>
              </div>
              <span className="font-serif text-[22px] tracking-tight text-[#1A1A1A]">
                imakwa<span className="text-[#C25E36]">.</span>
              </span>
            </Link>

            {/* Pill Search Bar (Desktop) */}
            <form onSubmit={handleSearch} className="hidden lg:block relative w-full max-w-[420px]">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-[16px] h-[16px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search artworks, artists, regions..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#F4F0EA] text-[14px] text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-shadow"
              />
            </form>
          </div>

          {/* --- CENTER SECTION: Nav Links --- */}
          <div className="hidden lg:flex items-center gap-6 pr-12">

            {/* Hover Menu Container */}
            <div
              className="relative py-6"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={`text-[14.5px] flex items-center gap-1.5 font-medium px-4 py-2 rounded-full transition-all duration-200 ${dropdownOpen
                  ? 'bg-[#F2E4DE] text-[#1A1A1A]'
                  : 'text-gray-800 hover:text-[#C25E36]'
                  }`}
              >
                Categories <span className="text-[9px] transition-transform duration-200">▼</span>
              </button>

              {/* Dropdown Menu Overlay */}
              <div
                className={`absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-[240px] bg-white rounded-2xl border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.08)] py-2.5 transition-all duration-200 z-50 origin-top ${dropdownOpen
                  ? 'opacity-100 scale-100 pointer-events-auto visible'
                  : 'opacity-0 scale-95 pointer-events-none invisible'
                  }`}
              >
                {dropdownCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={cat.to}
                    className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-[#F4F0EA]/60 transition-colors"
                  >
                    <span className="text-base filter saturate-[0.85]">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/browse?region=all"
              className="text-[14.5px] text-gray-800 hover:text-[#C25E36] transition-colors font-medium whitespace-nowrap"
            >
              By Region
            </Link>
            <Link
              to="/artists"
              className="text-[14.5px] text-gray-800 hover:text-[#C25E36] transition-colors font-medium whitespace-nowrap"
            >
              Artists
            </Link>
            <Link
              to="/collections"
              className="text-[14.5px] text-gray-800 hover:text-[#C25E36] transition-colors font-medium whitespace-nowrap"
            >
              Curated Collections
            </Link>
            {isAuthenticated && (
              <Link
                to="/orders"
                className="text-[14.5px] text-gray-800 hover:text-[#C25E36] transition-colors font-medium whitespace-nowrap"
              >
                My Orders
              </Link>
            )}
            <Link
              to="/worldcup"
              className="text-[14.5px] text-gold hover:text-gold-light transition-colors font-semibold whitespace-nowrap flex items-center gap-1.5"
            >
              <span>⚽</span>
              World Cup 2026
            </Link>
          </div>

          {/* --- RIGHT SECTION: Icons --- */}
          <div className="flex items-center gap-5 sm:gap-6">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden text-gray-800 hover:text-[#C25E36] transition-colors"
            >
              <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            {/* Favorites */}
            <Link
              to="/favorites"
              className="hidden sm:block text-gray-800 hover:text-[#C25E36] transition-colors relative"
            >
              <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-terracotta text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="text-gray-800 hover:text-[#C25E36] transition-colors relative"
            >
              <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-terracotta text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="hidden sm:block relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-8 h-8 rounded-full bg-terracotta text-white flex items-center justify-center text-sm font-bold hover:bg-terra-light transition-colors"
                >
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-charcoal/10 shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-charcoal/10">
                        <p className="text-sm font-medium text-charcoal truncate">{user?.name}</p>
                        <p className="text-xs text-charcoal-soft truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-charcoal hover:bg-charcoal/5 transition-colors"
                      >
                        My Account
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-charcoal hover:bg-charcoal/5 transition-colors"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/favorites"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-charcoal hover:bg-charcoal/5 transition-colors"
                      >
                        Favorites
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:block text-gray-800 hover:text-[#C25E36] transition-colors"
              >
                <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </Link>
            )}

            {/* Hamburger Menu */}
            <button
              className="lg:hidden text-gray-800 ml-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* --- MOBILE DROPDOWN MENU --- */}
        {menuOpen && (
          <div className="lg:hidden border-t border-[#1c1a17]/5 bg-[#FCFBF8] px-6 py-5 flex flex-col gap-4 shadow-lg">

            {/* Navigation Links */}
            <div className="flex flex-col gap-3 border-b border-[#1c1a17]/5 pb-4">
              <Link
                to="/browse?category=all"
                onClick={() => setMenuOpen(false)}
                className="text-[15px] font-medium text-gray-800 py-2"
              >
                Categories
              </Link>
              <Link
                to="/browse?region=all"
                onClick={() => setMenuOpen(false)}
                className="text-[15px] font-medium text-gray-800 py-2"
              >
                By Region
              </Link>
              <Link
                to="/artists"
                onClick={() => setMenuOpen(false)}
                className="text-[15px] font-medium text-gray-800 py-2"
              >
                Artists
              </Link>
              <Link
                to="/collections"
                onClick={() => setMenuOpen(false)}
                className="text-[15px] font-medium text-gray-800 py-2"
              >
                Curated Collections
              </Link>
              {isAuthenticated && (
                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="text-[15px] font-medium text-gray-800 py-2"
                >
                  My Orders
                </Link>
              )}
              <Link
                to="/worldcup"
                onClick={() => setMenuOpen(false)}
                className="text-[15px] font-semibold text-gold py-2 flex items-center gap-1.5"
              >
                <span>⚽</span>
                World Cup 2026
              </Link>
            </div>

            {/* User Links */}
            <div className="flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                    className="text-[15px] font-medium text-gray-800 py-2"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setMenuOpen(false)}
                    className="text-[15px] font-medium text-gray-800 py-2"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/favorites"
                    onClick={() => setMenuOpen(false)}
                    className="text-[15px] font-medium text-gray-800 py-2 flex items-center gap-2"
                  >
                    Favorites
                    {favorites.length > 0 && (
                      <span className="px-2 py-0.5 bg-terracotta text-white text-xs font-bold rounded-full">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-[15px] font-medium text-red-600 py-2 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-[15px] font-medium text-gray-800 py-2"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        )}

        {/* --- MOBILE SEARCH OVERLAY --- */}
        {searchOpen && (
          <div className="lg:hidden border-t border-[#1c1a17]/5 bg-[#FCFBF8] px-6 py-5">
            <form onSubmit={handleSearch} className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-[15px] h-[15px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search artworks, artists, regions..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#F4F0EA] text-[14px] text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300"
                autoFocus
              />
            </form>
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}