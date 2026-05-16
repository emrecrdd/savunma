import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Section from '../components/Section'

const News = () => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Mock Data - Sonra backend'den gelecek
  const mockNews = [
    {
      id: 1,
      titleTr: '31.Marble İzmir Uluslararası Fuarı',
      titleEn: '31st Marble Izmir International Fair',
      summaryTr: '31.Marble İzmir Uluslararası Doğal Taş ve Teknolojileri Fuarı\'nda yeni ürünlerimiz büyük ilgi gördü.',
      summaryEn: 'Our new products attracted great attention at the 31st Marble Izmir International Natural Stone and Technologies Fair.',
      contentTr: 'Detaylı haber içeriği...',
      contentEn: 'Detailed news content...',
      category: 'press',
      imageUrl: '/images/detay3.jpeg',
      publishDate: '2026-04-14',
      isFeatured: true
    },
    {
      id: 2,
      titleTr: 'Blok Mermer Fuarı B-Holl 13',
      titleEn: 'Block Marble Fair Hall B Stand 13',
      summaryTr: '2. Afyonkarahisar Blok Mermer Fuarı\'nda B-Holl 13 numaralı standımızda sizleri bekliyoruz.',
      summaryEn: 'We are waiting for you at our stand Hall B Number 13 at the 2nd Afyonkarahisar Block Marble Fair.',
      contentTr: 'Detaylı haber içeriği...',
      contentEn: 'Detailed news content...',
      category: 'event',
      imageUrl: '/images/2.jpeg',
      publishDate: '2026-06-17',
      isFeatured: true
    },
    {
      id: 3,
      titleTr: 'Markalaşıyoruz: "TAMİS"',
      titleEn: 'We Are Branding: "TAMİS"',
      summaryTr: 'Yenilenen vizyonumuzla hizmet vermeye devam ediyoruz.',
      summaryEn: 'We continue to serve with our renewed vision.',
      contentTr: 'Detaylı haber içeriği...',
      contentEn: 'Detailed news content...',
      category: 'announcement',
      imageUrl: '/images/3.haber.jpeg',
      publishDate: '2026-04-05',
      isFeatured: false
    },
    {
      id: 4,
      titleTr: 'Doğru Malzeme Dayanıklı Ürün',
      titleEn: 'Right Material, Durable Product',
      summaryTr: 'Yeni geliştirdiğimiz ürünlerimiz satışa hazır.',
      summaryEn: 'Our newly developed products are ready for sale.',
      contentTr: 'Detaylı haber içeriği...',
      contentEn: 'Detailed news content...',
      category: 'press',
      imageUrl: '/images/4.haber.jpeg',
      publishDate: '2024-02-28',
      isFeatured: false
    },
    {
      id: 5,
      titleTr: '100% Yerli Üretim',
      titleEn: '100% Domestic Production',
      summaryTr: 'Yerli üretimde kaliteyi en üst seviyeye çıkardık.',
      summaryEn: 'We have maximized quality in domestic production.',
      contentTr: 'Detaylı haber içeriği...',
      contentEn: 'Detailed news content...',
      category: 'news',
      imageUrl: '/images/5.jpeg',
      publishDate: '2024-02-20',
      isFeatured: false
    },
    {
      id: 6,
      titleTr: 'Yeni İş Ortaklıkları',
      titleEn: 'New Business Partnerships',
      summaryTr: 'Ürünlerimizi dünyanın birçok noktasına pazarlıyoruz.',
      summaryEn: 'We are marketing our products to many points around the world.',
      contentTr: 'Detaylı haber içeriği...',
      contentEn: 'Detailed news content...',
      category: 'announcement',
      imageUrl: '/images/isortagı.jpeg',
      publishDate: '2024-02-15',
      isFeatured: false
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setNews(mockNews)
      setLoading(false)
    }, 800)
  }, [])

  const categories = [
    { value: 'all', labelTr: 'Tümü', labelEn: 'All' },
    { value: 'press', labelTr: 'Basın Açıklamaları', labelEn: 'Press Releases' },
    { value: 'news', labelTr: 'Haberler', labelEn: 'News' },
    { value: 'announcement', labelTr: 'Duyurular', labelEn: 'Announcements' },
    { value: 'event', labelTr: 'Etkinlikler', labelEn: 'Events' }
  ]

  const getCategoryLabel = (cat) => {
    const category = categories.find(c => c.value === cat)
    return category ? (currentLang === 'tr' ? category.labelTr : category.labelEn) : cat
  }

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory)

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)
  const paginatedNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const featuredNews = news.filter(item => item.isFeatured).slice(0, 2)

  const handleImageError = (e) => {
    e.target.src = '/images/fallback.png'
    e.target.onerror = null
  }

  // Schema.org için
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
        "name": currentLang === 'tr' ? "Haberler" : "News",
        "item": "https://tamismakine.com.tr/news"
      }
    ]
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <html lang={currentLang === 'tr' ? 'tr' : 'en'} />
        
        <title>{currentLang === 'tr' 
          ? 'TAMİS | Haberler - Fuarlar ve Duyurular' 
          : 'TAMİS | News - Fairs and Announcements'}</title>
        
        <meta name="description" content={currentLang === 'tr' 
          ? 'TAMİS ile ilgili son gelişmeler, fuar katılımları, basın açıklamaları ve duyurular. Mermer ve doğal taş sektöründeki yenilikler.'
          : 'Latest developments, fair participations, press releases and announcements about TAMİS. Innovations in the marble and natural stone sector.'} 
        />
        
        <meta name="keywords" content="TAMİS haberler, mermer fuarı, İzmir fuarı, blok mermer, doğal taş haberleri, sektör duyuruları" />
        
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        <link rel="canonical" href="https://tamismakine.com.tr/news" />
        
        <link rel="alternate" href="https://tamismakine.com.tr/news" hreflang="tr" />
        <link rel="alternate" href="https://tamismakine.com.tr/en/news" hreflang="en" />
        
        {/* Open Graph */}
        <meta property="og:title" content={currentLang === 'tr' ? 'TAMİS | Haberler' : 'TAMİS | News'} />
        <meta property="og:description" content={currentLang === 'tr' ? 'Son gelişmeler ve duyurular' : 'Latest developments and announcements'} />
        <meta property="og:image" content="https://tamismakine.com.tr/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://tamismakine.com.tr/news" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TAMİS" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentLang === 'tr' ? 'TAMİS | Haberler' : 'TAMİS | News'} />
        <meta name="twitter:description" content={currentLang === 'tr' ? 'Son gelişmeler' : 'Latest developments'} />
        <meta name="twitter:image" content="https://tamismakine.com.tr/images/og-image.jpg" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Gizli H1 */}
      <h1 className="sr-only">TAMİS Haberler - Mermer ve Doğal Taş Sektöründe Son Gelişmeler</h1>

      {/* Hero Bölümü */}
      <div className="relative pt-20 bg-gradient-to-r from-navy-900 to-navy-800">
        <div className="container-custom py-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            {t('nav.news')}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            {currentLang === 'tr' 
              ? 'Son gelişmeler, fuar katılımları, basın açıklamaları ve duyurularımız.'
              : 'Latest developments, fair participations, press releases and announcements.'}
          </p>
        </div>
      </div>

      {/* Öne Çıkan Haberler */}
      {featuredNews.length > 0 && (
        <div className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-white mb-8">
              {currentLang === 'tr' ? 'Öne Çıkan Haberler' : 'Featured News'}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map((item) => (
                <Link 
                  key={item.id} 
                  to={`/news/${item.id}`}
                  className="group block rounded-xl overflow-hidden border border-navy-700 hover:border-navy-500 transition-all hover:shadow-2xl duration-300"
                >
                  <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={currentLang === 'tr' ? item.titleTr : item.titleEn}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      onError={handleImageError}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    
                    <div className="absolute top-6 left-6 z-10">
                      <span className="bg-green-600 text-white text-sm px-4 py-1.5 rounded-full font-medium shadow-lg">
                        {getCategoryLabel(item.category)}
                      </span>
                    </div>
                    
                    <div className="absolute top-6 right-6 z-10">
                      <span className="bg-black/60 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full font-medium">
                        {new Date(item.publishDate).toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US')}
                      </span>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                        {currentLang === 'tr' ? item.titleTr : item.titleEn}
                      </h3>
                      <p className="text-gray-200 line-clamp-2 text-base md:text-lg mb-4">
                        {currentLang === 'tr' ? item.summaryTr : item.summaryEn}
                      </p>
                      <div className="inline-flex items-center text-green-400 group-hover:text-white transition-colors text-base font-semibold">
                        {currentLang === 'tr' ? 'Devamını Oku' : 'Read More'}
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tüm Haberler */}
      <Section>
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategory(cat.value)
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedCategory === cat.value
                  ? 'bg-green-600 text-white'
                  : 'bg-navy-800 text-gray-400 hover:bg-navy-700 hover:text-white'
              }`}
            >
              {currentLang === 'tr' ? cat.labelTr : cat.labelEn}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedNews.map((item) => (
            <Link
              key={item.id}
              to={`/news/${item.id}`}
              className="group bg-navy-800/50 rounded-xl overflow-hidden border border-navy-700 hover:border-navy-500 transition-all hover:-translate-y-1 duration-300"
            >
              <div className="h-64 bg-navy-700 relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={currentLang === 'tr' ? item.titleTr : item.titleEn}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-navy-900/90 text-green-400 text-xs px-3 py-1.5 rounded-full border border-navy-700 font-medium">
                    {getCategoryLabel(item.category)}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="text-xs text-gray-500 mb-2">
                  {new Date(item.publishDate).toLocaleDateString(
                    currentLang === 'tr' ? 'tr-TR' : 'en-US'
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
                  {currentLang === 'tr' ? item.titleTr : item.titleEn}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {currentLang === 'tr' ? item.summaryTr : item.summaryEn}
                </p>
                <div className="mt-4 text-green-500 group-hover:text-white text-sm font-medium inline-flex items-center">
                  {currentLang === 'tr' ? 'Devamını Oku' : 'Read More'}
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-navy-800 text-white hover:bg-navy-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              &laquo;
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === i + 1 
                    ? 'bg-green-600 text-white' 
                    : 'bg-navy-800 text-gray-400 hover:bg-navy-700 hover:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-navy-800 text-white hover:bg-navy-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              &raquo;
            </button>
          </div>
        )}
      </Section>
    </>
  )
}

export default News