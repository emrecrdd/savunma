import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Hero = ({ title, subtitle, image, buttonText, buttonLink }) => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero bölümü">
  
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          preload="metadata"
          aria-label="Arka plan videosu"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 to-navy-900/70"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative container-custom text-center z-10">
        {/* H1 - SEO için çok önemli */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 animate-slide-up leading-tight">
          {title || (currentLang === 'tr' 
              ? 'Madencilik ve Mermer Ocakları İçin Güçlü Çözümler '
              : 'Powerful Solutions for Mining and Marble Quarries')}
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto animate-fade-in leading-relaxed">
          {subtitle || (currentLang === 'tr' 
            ? '39 yıllık tecrübe ile mermer ocakları için yedek parça, CNC işleme ve endüstriyel ekipman üretimi.'
            : 'Spare parts, CNC machining and industrial equipment production for marble quarries with 39 years of experience.')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Link 
            to={buttonLink || "/products"} 
            className="btn-primary inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2 focus:ring-offset-navy-900"
            aria-label={currentLang === 'tr' ? 'Ürünlerimizi inceleyin' : 'View our products'}
          >
            {buttonText || t('hero.products')}
          </Link>
          <Link 
            to="/contact" 
            className="btn-outline inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2 focus:ring-offset-navy-900"
            aria-label={currentLang === 'tr' ? 'İletişime geçin' : 'Contact us'}
          >
            {t('hero.contact')}
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero