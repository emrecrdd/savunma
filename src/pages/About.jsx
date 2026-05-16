import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const About = () => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language
  
  const [counters, setCounters] = useState({
    years: 0,
    projects: 0,
    employees: 0,
    exports: 0
  })

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      const progress = step / steps
      setCounters({
        years: Math.min(39, Math.floor(39 * progress)),
        projects: Math.min(20, Math.floor(20 * progress)),
        employees: Math.min(50, Math.floor(50 * progress)),
        exports: Math.min(9, Math.floor(9 * progress))
      })
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const values = [
    {
      icon: '🎯',
      titleTr: 'Misyonumuz',
      titleEn: 'Our Mission',
      descTr: 'Tarım, inşaat ve madencilik sektörlerinde ihtiyaç duyulan kritik teknolojileri yerli imkanlarla geliştirerek, sektörün gelişimine katkıda bulunmak.',
      descEn: 'To contribute to the development of agriculture, construction and mining sectors by developing critical technologies with domestic means.'
    },
    {
      icon: '👁️',
      titleTr: 'Vizyonumuz',
      titleEn: 'Our Vision',
      descTr: 'Tarım ve makine sektöründe güvenilir bir marka olarak, kaliteli ürünlerimizle Türkiye\'de ve dünyada tercih edilen bir firma olmak.',
      descEn: 'To be a reliable brand in agriculture and machinery sector, to be a preferred company in Turkey and the world with our quality products.'
    },
    {
      icon: '💎',
      titleTr: 'Değerlerimiz',
      titleEn: 'Our Values',
      descTr: 'Kalite, güvenilirlik, yenilikçilik, yerellik ve sürdürülebilirlik ilkelerimizle hareket ediyoruz.',
      descEn: 'We act with our principles of quality, reliability, innovation, locality and sustainability.'
    }
  ]

  const capabilities = [
    { nameTr: 'CNC İşleme', nameEn: 'CNC Machining', percentage: 98, icon: '🔧' },
    { nameTr: 'Kalite Kontrol', nameEn: 'Quality Control', percentage: 100, icon: '📊' },
    { nameTr: 'Ar-Ge Kapasitesi', nameEn: 'R&D Capacity', percentage: 95, icon: '🔬' },
    { nameTr: 'Tedarik Zinciri', nameEn: 'Supply Chain', percentage: 97, icon: '🚚' }
  ]

  const timeline = [
    { year: '1987', titleTr: 'Kuruluş', titleEn: 'Foundation', descTr: 'Ankara Kahramankazan\'da faaliyete başlandı.', descEn: 'Started operations in Kahramankazan, Ankara.' },
    { year: '2004', titleTr: 'İlk İhracat', titleEn: 'First Export', descTr: 'Yurt dışına ilk ihracat gerçekleştirildi.', descEn: 'First export abroad was realized.' },
    { year: '2006', titleTr: 'ISO 9001 Belgesi', titleEn: 'ISO 9001 Certificate', descTr: 'Uluslararası kalite belgesi alındı.', descEn: 'International quality certificate received.' },
    { year: '2010', titleTr: 'Ar-Ge Çalışmaları', titleEn: 'R&D Activities', descTr: 'Kendi Ar-Ge tasarımlarımızı oluşturmaya başladık.', descEn: 'We started creating our own R&D designs.' },
    { year: '2021', titleTr: 'Yeni Ürün Patentleri', titleEn: 'New Product Patents', descTr: 'Faydalı model ürünlerimizi patent güvencesi altına aldık.', descEn: 'We secured our utility model products with patent protection.' },
    { year: '2023', titleTr: 'Yeni Fabrika', titleEn: 'New Factory', descTr: 'Kahramankazan OSB\'de yeni tesisimizde üretime başladık.', descEn: 'We started production in our new facility in Kahramankazan OIZ.' }
  ]

  // Schema.org için sabit değerler
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": currentLang === 'tr' ? "TAMİS Hakkımızda" : "About TAMİS",
    "description": currentLang === 'tr' 
      ? "TAMİS, 1987 yılında Ankara Kahramankazan'da kurulmuş, tarım, inşaat ve madencilik sektörlerine yedek parça üreten firmadır."
      : "TAMİS, established in 1987 in Kahramankazan, Ankara, produces spare parts for agriculture, construction and mining sectors.",
    "url": "https://tamismakine.com.tr/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "TAMİS",
      "foundingDate": "1987",
      "foundingLocation": "Ankara, Turkey",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Saray Mah. 50.Cad. 17/C",
        "addressLocality": "Kahramankazan",
        "addressRegion": "Ankara",
        "postalCode": "06980",
        "addressCountry": "TR"
      }
    }
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Sayfa",
        "item": "https://tamismakine.com.tr"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": currentLang === 'tr' ? "Hakkımızda" : "About Us",
        "item": "https://tamismakine.com.tr/about"
      }
    ]
  }

  return (
    <>
      <Helmet>
        <html lang={currentLang === 'tr' ? 'tr' : 'en'} />
        
        <title>{currentLang === 'tr' ? 'TAMİS | Hakkımızda - 39 Yıllık Tecrübe Ankara' : 'TAMİS | About Us - 39 Years of Experience Ankara'}</title>
        
        <meta name="description" content={currentLang === 'tr' 
          ? 'TAMİS, 1987 yılında Ankara Kahramankazan\'da kurulmuş, tarım, inşaat ve madencilik sektörlerine yedek parça üreten lider firmadır. 39 yıllık tecrübe ile hizmetinizde.'
          : 'TAMİS, established in 1987 in Kahramankazan, Ankara, is a leading company producing spare parts for agriculture, construction and mining sectors. At your service with 39 years of experience.'} 
        />
        
        <meta name="keywords" content="TAMİS, hakkımızda, Ankara, Kahramankazan, yedek parça, tarım makineleri, inşaat ekipmanları, madencilik, 39 yıl, kuruluş 1987" />
        
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        <link rel="canonical" href={`https://tamismakine.com.tr/about${currentLang === 'en' ? '?lang=en' : ''}`} />
        
        {/* Dil alternatifleri */}
        <link rel="alternate" href="https://tamismakine.com.tr/about" hreflang="tr" />
        <link rel="alternate" href="https://tamismakine.com.tr/en/about" hreflang="en" />
        
        {/* Open Graph */}
        <meta property="og:title" content={currentLang === 'tr' ? 'TAMİS | Hakkımızda - 39 Yıllık Tecrübe' : 'TAMİS | About Us - 39 Years of Experience'} />
        <meta property="og:description" content={currentLang === 'tr' 
          ? '1987 yılında Ankara Kahramankazan\'da kurulan TAMİS, tarım, inşaat ve madencilik sektörlerine yedek parça üretmektedir.'
          : 'Founded in 1987 in Kahramankazan, Ankara, TAMİS produces spare parts for agriculture, construction and mining sectors.'} 
        />
        <meta property="og:image" content="https://tamismakine.com.tr/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://tamismakine.com.tr/about" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TAMİS" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentLang === 'tr' ? 'TAMİS | Hakkımızda' : 'TAMİS | About Us'} />
        <meta name="twitter:description" content={currentLang === 'tr' ? '39 yıllık tecrübe ile yedek parça üretimi.' : 'Spare parts manufacturing with 39 years of experience.'} />
        <meta name="twitter:image" content="https://tamismakine.com.tr/images/og-image.jpg" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Hero Bölümü */}
      <div className="relative pt-20 min-h-[40vh] md:min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/95 to-navy-900/90 z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-800/50 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative container-custom z-20 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-navy-800/50 backdrop-blur-sm rounded-full px-3 md:px-4 py-1 md:py-2 border border-navy-700 mb-4 md:mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs md:text-sm text-gray-300">{currentLang === 'tr' ? '39 Yıllık Tecrübe' : '39 Years of Experience'}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 animate-slide-up">
              {currentLang === 'tr' ? 'Hakkımızda' : 'About Us'}
            </h1>
            <p className="text-base md:text-xl text-gray-300 leading-relaxed animate-fade-in">
              {currentLang === 'tr' 
                ? 'Tamis Tarımsal Mühendislik İnşaat Sanayi Ticaret Ltd. Şti., 1987 yılında kurulmuştur. 39 yıllık tecrübe ile tarım, inşaat ve madencilik sektörlerine yüksek kaliteli yedek parça ve ekipman tedarik etmekteyiz. Ankara Kahramankazan\'daki modern tesisimizde üretimimize devam etmekteyiz.'
                : 'Tamis Agricultural Engineering Construction Industry Trade Ltd. Co. was established in 1987. With 39 years of experience, we supply high quality spare parts and equipment to agriculture, construction and mining sectors. We continue our production in our modern facility in Kahramankazan, Ankara.'}
            </p>
          </div>
        </div>
        
        <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-navy-500 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-navy-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="bg-navy-800/50 border-y border-navy-700 py-8 md:py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: counters.years, label: t('home.stats.years'), suffix: '+', icon: '📅' },
              { value: counters.projects, label: t('home.stats.projects'), suffix: '+', icon: '🏭' },
              { value: counters.employees, label: t('home.stats.employees'), suffix: '+', icon: '👥' },
              { value: counters.exports, label: t('home.stats.countries'), suffix: '+', icon: '🌍' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-4 md:p-6 rounded-xl bg-navy-800/30 border border-navy-700 group hover:border-navy-500 transition-all">
                <div className="text-2xl md:text-3xl mb-2 md:mb-3 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
                  {stat.value}<span className="text-navy-500 text-xl md:text-3xl">{stat.suffix}</span>
                </div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Misyon, Vizyon, Değerler */}
      <div className="py-12 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, idx) => (
              <div 
                key={idx} 
                className="group relative bg-gradient-to-b from-navy-800 to-navy-900 rounded-xl md:rounded-2xl p-6 md:p-8 border border-navy-700 hover:border-navy-500 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-navy-900/50"
              >
                <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-navy-700/20 to-transparent rounded-full blur-2xl"></div>
                <div className="text-4xl md:text-5xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                  {currentLang === 'tr' ? value.titleTr : value.titleEn}
                </h2>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  {currentLang === 'tr' ? value.descTr : value.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zaman Çizelgesi */}
      <div className="py-12 md:py-20 bg-navy-800/30">
        <div className="container-custom">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
              {currentLang === 'tr' ? 'Zaman Çizelgemiz' : 'Our Timeline'}
            </h2>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto px-4">
              {currentLang === 'tr' 
                ? '39 yıllık başarı hikayemizin önemli kilometre taşları'
                : 'Important milestones of our 39-year success story'}
            </p>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-6">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-navy-500">
                <div className="absolute left-[-9px] top-0 w-4 h-4 bg-navy-500 rounded-full border-2 border-navy-900"></div>
                <div className="bg-navy-800/50 rounded-xl p-5 border border-navy-700">
                  <div className="text-2xl font-bold text-navy-400 mb-2">{item.year}</div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {currentLang === 'tr' ? item.titleTr : item.titleEn}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {currentLang === 'tr' ? item.descTr : item.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-navy-600 via-navy-500 to-navy-600"></div>
            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <div key={idx} className={`relative flex ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-navy-500 rounded-full border-4 border-navy-900 z-10"></div>
                  <div className={`w-1/2 ${idx % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="group bg-navy-800/50 rounded-xl p-6 border border-navy-700 hover:border-navy-500 transition-all">
                      <div className="text-3xl font-bold text-navy-400 mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {currentLang === 'tr' ? item.titleTr : item.titleEn}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {currentLang === 'tr' ? item.descTr : item.descEn}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Yeteneklerimiz */}
      <div className="py-12 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                {currentLang === 'tr' ? 'Yeteneklerimiz' : 'Our Capabilities'}
              </h2>
              <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8 leading-relaxed">
                {currentLang === 'tr'
                  ? 'Son teknoloji üretim tesislerimiz ve deneyimli mühendis kadromuz ile sektörün en zorlu gereksinimlerini karşılıyoruz.'
                  : 'With our state-of-the-art production facilities and experienced engineering team, we meet the most demanding requirements of the sector.'}
              </p>
              
              <div className="space-y-5">
                {capabilities.map((cap, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg md:text-xl">{cap.icon}</span>
                        <span className="text-sm md:text-base text-white font-medium">
                          {currentLang === 'tr' ? cap.nameTr : cap.nameEn}
                        </span>
                      </div>
                      <span className="text-navy-400 font-bold text-sm md:text-base">{cap.percentage}%</span>
                    </div>
                    <div className="w-full bg-navy-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-navy-500 to-navy-400 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${cap.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-800 to-navy-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(45,90,140,0.2)_0%,_transparent_50%)]"></div>
        
        <div className="relative container-custom text-center px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
            {currentLang === 'tr' ? 'Projeleriniz İçin Bize Ulaşın' : 'Contact Us For Your Projects'}
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-6 md:mb-8">
            {currentLang === 'tr'
              ? 'Size en uygun çözümleri sunmak için buradayız.'
              : 'We are here to provide you with the best solutions.'}
          </p>
          <div className="flex justify-center">
            <Link to="/contact" className="btn-primary text-sm md:text-base px-8 md:px-10 py-3 md:py-4">
              {currentLang === 'tr' ? 'Bize Ulaşın' : 'Request Quote'}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default About