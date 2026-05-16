import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, Globe } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mobil menü açıkken scroll'u engelle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/products', label: t('nav.products') },
    { path: '/news', label: t('nav.news') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/contact', label: t('nav.contact') },
  ]

  const toggleLanguage = () => {
    const newLang = currentLang === 'tr' ? 'en' : 'tr'
    i18n.changeLanguage(newLang)
    // Dil değişince URL'i güncelle (isteğe bağlı)
    // window.location.href = `/${newLang}${location.pathname}`
  }

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled 
            ? 'bg-navy-900/98 backdrop-blur-xl shadow-2xl border-b border-white/10' 
            : 'bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm'
        }`}
        aria-label="Ana navigasyon"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center group focus:outline-none focus:ring-2 focus:ring-navy-500 rounded-lg"
              aria-label="Ana sayfaya dön"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-navy-500 to-blue-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src="/images/logo5.png" 
                    alt="TAMİS - Ankara Makine Yedek Parça Logo" 
                    className="w-full h-full object-contain"
                    width="192"
                    height="192"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/fallback.png';
                    }}
                  />
                </div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-navy-500 ${
                    location.pathname === link.path
                      ? 'text-white bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-navy-400 to-blue-500 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side - Language & Mobile Menu */}
            <div className="flex items-center space-x-3">
              {/* Language Button - Desktop */}
              <button
                onClick={toggleLanguage}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-navy-500"
                aria-label={currentLang === 'tr' ? 'Switch to English' : 'Türkçeye geç'}
              >
                <Globe className="w-4 h-4 text-gray-400" aria-hidden="true" />
                <span className="text-sm font-medium text-white">
                  {currentLang === 'tr' ? 'EN' : 'TR'}
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-navy-500"
                aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-white" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6 text-white" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu - Drawer */}
          <div 
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isOpen ? 'max-h-[600px] opacity-100 pb-6' : 'max-h-0 opacity-0'
            }`}
            role="navigation"
            aria-label="Mobil navigasyon"
          >
            <div className="border-t border-white/10 pt-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-navy-500 ${
                    location.pathname === link.path
                      ? 'bg-gradient-to-r from-navy-600/50 to-navy-700/50 text-white border-l-4 border-navy-500'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="pt-4 mt-2 border-t border-white/10">
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-navy-600/30 to-navy-700/30 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-navy-500"
                  aria-label={currentLang === 'tr' ? 'Switch to English' : 'Türkçeye geç'}
                >
                  <Globe className="w-5 h-5" aria-hidden="true" />
                  <span>{currentLang === 'tr' ? '🇬🇧 English' : '🇹🇷 Türkçe'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Navbar placeholder - içerik altta kalmasın diye */}
      <div className="h-36 md:h-44 lg:h-52" aria-hidden="true"></div>
    </>
  )
}

export default Navbar