import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Section from '../components/Section'

// Direkt NewsDetail'daki mockNewsDetails'ı buraya import et veya tanımla
// Aynı veriyi kullanıyoruz - TEK KAYNAK
const newsDetails = {
  1: {
    id: 1,
    titleTr: '31.Marble İzmir Uluslararası Fuarı',
    titleEn: '31st Marble Izmir International Fair',
    summaryTr: '31.Marble İzmir Uluslararası Doğal Taş ve Teknolojileri Fuarı\'nda yeni ürünlerimiz büyük ilgi gördü.',
    summaryEn: 'Our new products attracted great attention at the 31st Marble Izmir International Natural Stone and Technologies Fair.',
    category: 'press',
    imageUrl: '/images/detay3.jpeg',
    publishDate: '2026-04-14'
  },
  2: {
    id: 2,
    titleTr: 'Blok Mermer Fuarı B-Holl 13',
    titleEn: 'Block Marble Fair Hall B Stand 13',
    summaryTr: '2. Afyonkarahisar Blok Mermer Fuarı\'nda B-Holl 13 numaralı standımızda sizleri bekliyoruz.',
    summaryEn: 'We are waiting for you at our stand Hall B Number 13 at the 2nd Afyonkarahisar Block Marble Fair.',
    category: 'event',
    imageUrl: '/images/2.jpeg',
    publishDate: '2026-06-17'
  },
  3: {
    id: 3,
    titleTr: 'Markalaşıyoruz: "İsmail Usta"',
    titleEn: 'We Are Branding: "İsmail Usta"',
    summaryTr: 'Geleneksel işçiliğin sembolü "İsmail Usta" ismini markamız olarak belirledik.',
    summaryEn: 'We have chosen "İsmail Usta", the symbol of traditional craftsmanship, as our brand.',
    category: 'announcement',
    imageUrl: '/images/3.haber.jpeg',
    publishDate: '2026-04-05'
  }
}

// Kategori etiketlerini çeviren fonksiyon
const getCategoryLabel = (cat, lang) => {
  const categories = {
    press: { tr: 'Basın Açıklaması', en: 'Press Release' },
    event: { tr: 'Etkinlik', en: 'Event' },
    announcement: { tr: 'Duyuru', en: 'Announcement' },
    news: { tr: 'Haber', en: 'News' }
  }
  const category = categories[cat] || categories.news
  return lang === 'tr' ? category.tr : category.en
}

// Tarihi formatla
const formatDate = (dateStr, lang) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const Home = () => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language
  
  const [counterValues, setCounterValues] = useState({
    years: 39,
    parts: 1200,
    customers: 300,
    local: 95
  })
  
  const statsRef = useRef(null)
  const [isStatsVisible, setIsStatsVisible] = useState(false)

  // Ürünler
  const products = [
    {
      id: 1,
      title: t('products.leverCutterParts'),
      description: t('products.leverCutterPartsDesc'),
      longDescription: t('products.leverCutterPartsLong'),
      image: '/images/lever-cutter.jpg',
      video: '/videos/video1.mp4',
      icon: '',
      features: [
        t('products.features.iso'),
        t('products.features.precision'),
        t('products.features.durable')
      ],
      pdf: '/brochures/lever-cutter.pdf'
    },
    {
      id: 2,
      title: t('products.diamondTools'),
      description: t('products.diamondToolsDesc'),
      longDescription: t('products.diamondToolsLong'),
      image: '/images/diamond-tools.jpg',
      video: '/videos/viddeo2.mp4',
      icon: '💎',
      features: [
        t('products.features.diamond'),
        t('products.features.heat'),
        t('products.features.longlife')
      ],
      pdf: '/brochures/diamond-tools.pdf'
    },
    {
      id: 3,
      title: t('products.hydraulicSystems'),
      description: t('products.hydraulicSystemsDesc'),
      longDescription: t('products.hydraulicSystemsLong'),
      image: '/images/foto1.jpeg',
      video: '/videos/video3.mp4',
      icon: '🔩',
      features: [
        t('products.features.pressure'),
        t('products.features.seal'),
        t('products.features.compact')
      ],
      pdf: '/brochures/hydraulic.pdf'
    }
  ]

  // Haberler - DOĞRUDAN newsDetails'dan oluştur (TEKRAR YOK)
  const news = Object.values(newsDetails).map(item => ({
    id: item.id,
    title: currentLang === 'tr' ? item.titleTr : item.titleEn,
    date: formatDate(item.publishDate, currentLang),
    category: getCategoryLabel(item.category, currentLang),
    image: item.imageUrl,
    summary: currentLang === 'tr' ? item.summaryTr : item.summaryEn
  }))

  // Referanslar
  const references = [
    { logo: '/images/hbb.jpeg', name: 'HBB' },
    { logo: '/images/karamehmet.jpeg', name: 'Karamehmet' },
    { logo: '/images/sirmersan.jpeg', name: 'Sirmersan' },
    { logo: '/images/batu.jpeg', name: 'Batu' },
    { logo: '/images/canel.jpeg', name: 'Canel' },
    { logo: '/images/fimar.jpeg', name: 'Fimar' },
    { logo: '/images/naturelmar.jpeg', name: 'Naturelmar' },
  ]

  // Sayaç animasyonu
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsStatsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isStatsVisible) return

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setCounterValues({
        years: Math.min(39, Math.floor(39 * progress)),
        parts: Math.min(1500, Math.floor(1500 * progress)),
        customers: Math.min(120, Math.floor(120 * progress)),
        local: Math.min(100, Math.floor(100 * progress))
      })

      if (step >= steps) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isStatsVisible])

  // Dil değiştiğinde haberleri güncelle
  useEffect(() => {
    // Bu effect sayesinde dil değişince haberler otomatik güncellenir
  }, [currentLang])

  return (
    <>
      <Helmet>
        <title>TAMİS | {t('nav.home')}</title>
        <meta name="description" content={t('meta.home.description')} />
        <meta name="keywords" content="madencilik, mermer, yedek parça, cnc işleme" />
      </Helmet>

      <Hero />

      {/* Featured Products */}
      <Section title={t('home.featuredProducts')} subtitle={t('home.featuredProductsDesc')}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-gradient-to-b from-navy-800 to-navy-900 rounded-xl overflow-hidden border border-navy-700 hover:border-navy-500 transition-all duration-500 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="h-48 relative overflow-hidden">
                {product.video ? (
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={product.video} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="p-6 relative z-10">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-navy-300 transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {product.longDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature, i) => (
                    <span key={i} className="text-xs bg-navy-900 text-navy-300 px-2 py-1 rounded-full border border-navy-700">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-navy-700">
                  <Link to={`/products/${product.id}`} className="text-navy-400 hover:text-white text-sm font-medium transition-colors inline-flex items-center group">
                    {t('hero.products')}
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <a href={product.pdf} className="text-gray-500 hover:text-gray-300 text-sm transition-colors" target="_blank" rel="noopener noreferrer">
                    {t('home.technicalPdf')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section ref={statsRef} className="bg-navy-800/30">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-xl bg-navy-800/50 border border-navy-700">
            <div className="text-5xl font-bold text-white mb-2">{counterValues.years}<span className="text-navy-500 text-3xl">+</span></div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">{t('home.stats.years')}</div>
          </div>
          <div className="p-6 rounded-xl bg-navy-800/50 border border-navy-700">
            <div className="text-5xl font-bold text-white mb-2">{counterValues.parts}<span className="text-navy-500 text-3xl">+</span></div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">{t('home.stats.producedParts')}</div>
          </div>
          <div className="p-6 rounded-xl bg-navy-800/50 border border-navy-700">
            <div className="text-5xl font-bold text-white mb-2">{counterValues.customers}<span className="text-navy-500 text-3xl">+</span></div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">{t('home.stats.activeCustomers')}</div>
          </div>
          <div className="p-6 rounded-xl bg-navy-800/50 border border-navy-700">
            <div className="text-5xl font-bold text-white mb-2">{counterValues.local}<span className="text-navy-500 text-3xl">%</span></div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">{t('home.stats.localProduction')}</div>
          </div>
        </div>
      </Section>

      {/* References */}
      <Section title={t('home.references')} subtitle={t('home.referencesDesc')}>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-navy-900 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-navy-900 to-transparent z-10"></div>
          <div className="overflow-hidden py-8">
            <div className="flex space-x-16 animate-scroll">
              {[...references, ...references].map((ref, index) => (
                <div key={index} className="flex-shrink-0 group cursor-pointer">
                  <div className="relative h-24 w-32 md:h-32 md:w-40 lg:h-40 lg:w-48 transition-all duration-300 grayscale hover:grayscale-0 opacity-70 hover:opacity-100">
                    <img 
                      src={ref.logo} 
                      alt={ref.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/160x120?text=${ref.name}`;
                      }}
                    />
                  </div>
                  <div className="text-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-gray-400">{ref.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Latest News - DİREKT newsDetails'dan geliyor */}
      <Section title={t('home.latestNews')} className="bg-navy-800/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <div key={item.id} className="group bg-navy-800/50 rounded-xl overflow-hidden border border-navy-700 hover:border-navy-500 transition-all hover:transform hover:-translate-y-1 duration-300">
              <div className="h-48 bg-navy-700 relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Tamis+Haber';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-navy-900/90 text-navy-300 text-xs px-3 py-1 rounded-full border border-navy-700">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs text-gray-500 mb-2">{item.date}</div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-navy-300 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {item.summary}
                </p>
                <Link to={`/news/${item.id}`} className="text-navy-400 hover:text-white text-sm font-medium inline-flex items-center">
                  {t('home.readMore')}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-navy-900 to-navy-800">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('home.ctaTitle')}</h2>
          <p className="text-gray-300 text-lg mb-8">{t('home.ctaDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-lg px-8 py-4">{t('home.ctaButton')}</Link>
            <a href="/catalogs/mermer katalog 2024-4.pdf" className="btn-outline text-lg px-8 py-4" download>{t('home.catalog')}</a>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <span>{t('home.certificates.iso')}</span>
            <span>{t('home.certificates.national')}</span>
          </div>
        </div>
      </Section>
    </>
  )
}

export default Home