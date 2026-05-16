import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Hero = ({ title, subtitle, image, buttonText, buttonLink }) => {
  const { t } = useTranslation()

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
  
  {/* Background Video */}
  <div className="absolute inset-0">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    >
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 to-navy-900/70"></div>
  </div>



      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative container-custom text-center z-10">
        <h1 className="animate-slide-up mb-6">
          {title || t('hero.title')}
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto animate-fade-in">
          {subtitle || t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Link to={buttonLink || "/products"} className="btn-primary">
            {buttonText || t('hero.products')}
          </Link>
          <Link to="/contact" className="btn-outline">
            {t('hero.contact')}
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero