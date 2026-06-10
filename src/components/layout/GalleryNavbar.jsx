import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const dropdownCategories = [
  { name: 'Paintings & Canvas', icon: '🖼️', to: '/categories/paintings' },
  { name: 'Sculptures', icon: '🗿', to: '/categories/sculptures' },
  { name: 'Digital Art', icon: '💻', to: '/categories/digital-art' },
  { name: 'Textiles & Crafts', icon: '🧵', to: '/categories/textiles' },
  { name: 'Photography', icon: '📷', to: '/categories/photography' },
];

export default function GalleryNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
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
          <div className="hidden lg:block relative w-full max-w-[420px]">
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
              placeholder="Search artworks, artists, regions..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#F4F0EA] text-[14px] text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-shadow"
            />
          </div>
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
              className={`text-[14.5px] flex items-center gap-1.5 font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                dropdownOpen 
                  ? 'bg-[#F2E4DE] text-[#1A1A1A]' 
                  : 'text-gray-800 hover:text-[#C25E36]'
              }`}
            >
              Categories <span className="text-[9px] transition-transform duration-200">▼</span>
            </button>

            {/* Dropdown Menu Overlay */}
            <div 
              className={`absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-[240px] bg-white rounded-2xl border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.08)] py-2.5 transition-all duration-200 z-50 origin-top ${
                dropdownOpen 
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

          {['By Region', 'Artists', 'Curated Collections'].map((link) => (
            <Link 
              key={link} 
              to="#" 
              className="text-[14.5px] text-gray-800 hover:text-[#C25E36] transition-colors font-medium whitespace-nowrap"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* --- RIGHT SECTION: Icons --- */}
        <div className="flex items-center gap-5 sm:gap-6">
          <button className="text-gray-800 hover:text-[#C25E36] transition-colors">
            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>

          <button className="hidden sm:block text-gray-800 hover:text-[#C25E36] transition-colors">
            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>

          <button className="text-gray-800 hover:text-[#C25E36] transition-colors">
            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </button>

          <button className="hidden sm:block text-gray-800 hover:text-[#C25E36] transition-colors">
            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </button>

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
          <div className="relative mb-2">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search artworks..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#F4F0EA] text-[14px] text-gray-800 focus:outline-none"
            />
          </div>
          {['Categories', 'By Region', 'Artists', 'Curated Collections'].map(item => (
            <Link
              key={item}
              to="#"
              className="text-[15px] font-medium text-gray-800 py-2 border-b border-[#1c1a17]/5 last:border-0"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}