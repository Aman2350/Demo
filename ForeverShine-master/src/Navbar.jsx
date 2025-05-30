import React, { useState, useRef, useEffect } from 'react';
import logo from './images/Logo.webp';
import { ShoppingCartIcon, HeartIcon, ShareIcon, UserIcon, BookmarkIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext';
import { useSearch } from './context/SearchContext';

export default function Navbar() {
  const { getCartCount } = useCart();
  const { searchQuery, setSearchQuery, searchResults, handleSearch, recentSearches, clearRecentSearches, removeRecentSearch } = useSearch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const cartCount = getCartCount();

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setIsSearchOpen(false);
  };

  const handleRecentSearch = (search) => {
    setSearchQuery(search);
    handleSearch(search);
    navigate(`/search?q=${encodeURIComponent(search)}`);
    setIsSearchOpen(false);
  };

  return (
    <nav className="w-full shadow-lg bg-gradient-to-b from-teal-900 to-teal-700/80 sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-teal-900 text-white text-center py-2 text-lg font-semibold border-b border-teal-800 tracking-wide shadow-md animate-fadeInDown">
        <a href="https://forevershinein.com/" className="underline underline-offset-4 hover:text-yellow-300 transition-colors duration-200">Buy Any 3 Products @ FLAT ₹899 on Selected Products | Shop Now</a>
      </div>
      {/* Main Navbar */}
      <div className="relative flex items-center justify-between py-3 bg-white shadow-md px-20 rounded-b-2xl">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-16 w-30 drop-shadow-lg hover:scale-105 transition-transform duration-300" />
        </Link>
        {/* Nav Links */}
        <ul className="absolute left-1/2 transform -translate-x-1/2 flex gap-10 items-center text-gray-800 text-lg font-semibold tracking-wide">
          <li className="hover:text-teal-700 hover:underline underline-offset-8 transition-all duration-200 cursor-pointer">
            <Link to="/">Categories</Link>
          </li>
          <li className="hover:text-teal-700 hover:underline underline-offset-8 transition-all duration-200 cursor-pointer">
            <Link to="/car-care">Car care</Link>
          </li>
          <li className="hover:text-teal-700 hover:underline underline-offset-8 transition-all duration-200 cursor-pointer">
            <Link to="/home-care">Home care</Link>
          </li>
          <li className="hover:text-teal-700 hover:underline underline-offset-8 transition-all duration-200 cursor-pointer">
            <Link to="/personal-care" className="flex flex-col items-center">
              <span>Personal care</span>
              <span className="text-xs text-gray-400 mt-1">(Coming Soon)</span>
            </Link>
          </li>
          <li className="hover:text-teal-700 hover:underline underline-offset-8 transition-all duration-200 cursor-pointer">
            <Link to="/about-us">About us</Link>
          </li>
        </ul>
        {/* Right Icons */}
        <div className="flex items-center gap-3 bg-teal-100/80 py-2 rounded-full px-4 shadow-md">
          {/* Search Icon */}
          <div className="relative" ref={searchRef}>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex items-center justify-center hover:text-teal-700 hover:bg-teal-200/60 rounded-full p-2 transition-all duration-200 shadow-sm"
            >
              <MagnifyingGlassIcon className="w-6 h-6 align-middle" />
            </button>
            {isSearchOpen && (
              <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-xl p-4 z-50">
                <form onSubmit={handleSubmit} className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </form>

                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-gray-700">Recent Searches</h3>
                      <button
                        onClick={clearRecentSearches}
                        className="text-sm text-teal-600 hover:text-teal-700"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <div key={index} className="flex items-center justify-between group">
                          <button
                            onClick={() => handleRecentSearch(search)}
                            className="flex-1 text-left text-sm text-gray-600 hover:text-teal-600 py-1"
                          >
                            {search}
                          </button>
                          <button
                            onClick={() => removeRecentSearch(search)}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Results */}
                {searchQuery && searchResults.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Results</h3>
                    <div className="space-y-2">
                      {searchResults.slice(0, 3).map((result) => (
                        <Link
                          key={result.id}
                          to={`/product/${result.id}`}
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          <img
                            src={result.image}
                            alt={result.name}
                            className="w-10 h-10 object-contain"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{result.name}</p>
                            <p className="text-xs text-gray-500">{result.category}</p>
                          </div>
                        </Link>
                      ))}
                      {searchResults.length > 3 && (
                        <Link
                          to={`/search?q=${encodeURIComponent(searchQuery)}`}
                          className="block text-center text-sm text-teal-600 hover:text-teal-700 py-2"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          View all {searchResults.length} results
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Rest of the icons */}
          <Link
            to="/account"
            className="flex items-center justify-center hover:text-teal-700 hover:bg-teal-200/60 rounded-full p-2 transition-all duration-200 shadow-sm"
          >
            <UserIcon className="w-6 h-6 align-middle" />
          </Link>

          <button
            onClick={() => alert('Wishlist feature coming soon!')}
            className="flex items-center justify-center hover:text-teal-700 hover:bg-teal-200/60 rounded-full p-2 transition-all duration-200 shadow-sm"
          >
            <BookmarkIcon className="w-6 h-6 align-middle" />
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Forever Shine',
                  text: 'Check out Forever Shine - Your one-stop shop for car care products!',
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            className="flex items-center justify-center hover:text-teal-700 hover:bg-teal-200/60 rounded-full p-2 transition-all duration-200 shadow-sm"
          >
            <ShareIcon className="w-6 h-6 align-middle" />
          </button>

          <Link to="/cart" className="flex items-center justify-center hover:text-teal-700 hover:bg-teal-200/60 rounded-full p-2 transition-all duration-200 shadow-sm bg-transparent relative">
            <ShoppingCartIcon className="w-6 h-6 align-middle" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
} 