import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const Galeri = () => {
  const { t, i18n } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState('factory')
  const [selectedItem, setSelectedItem] = useState(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1)

  // Kategoriler - AYNI KALDI
  const categories = [
    { id: 'factory', labelTr: 'Fabrika & Üretim', labelEn: 'Factory & Production', icon: '🏭', descTr: 'Son teknoloji üretim tesislerimiz', descEn: 'State-of-the-art production facilities', bg: 'from-blue-500 to-cyan-600' },
    { id: 'products', labelTr: 'Ge', labelEn: 'Products', icon: '⚙️', descTr: 'Savunma sanayi özel ürünlerimiz', descEn: 'Defense industry special products', bg: 'from-purple-500 to-pink-600' },
    { id: 'team', labelTr: '', labelEn: 'Team & Quality', icon: '👥', descTr: 'Uzman kadromuz ve kalite süreçlerimiz', descEn: 'Our expert team and quality processes', bg: 'from-emerald-500 to-teal-600' },
  ]

  // Galeri verileri - AYNI KALDI
  const galleryItems = [
    { id: 1, type: 'image', category: 'factory', titleTr: '5 Eksen CNC İşleme Merkezi', titleEn: '5-Axis CNC Machining Center', descriptionTr: 'DMG Mori 5 eksen CNC tezgahında savunma sanayi parçaları üretimi', descriptionEn: 'Defense industry parts production on DMG Mori 5-axis CNC machine', src: '/galeri/1.jpeg', date: '2024-03-15', location: 'Ankara Fabrika', resolution: '4K' },
    { id: 2, type: 'image', category: 'factory', titleTr: 'Kalite Kontrol Laboratuvarı', titleEn: 'Quality Control Laboratory', descriptionTr: 'CMM ile hassas ölçüm ve kalite kontrol süreçleri', descriptionEn: 'Precision measurement and quality control processes with CMM', src: '/galeri/2.jpeg', date: '2024-03-10', location: 'Kalite Lab', resolution: '4K' },
    { id: 3, type: 'image', category: 'factory', titleTr: 'Otomatik Üretim Hattı', titleEn: 'Automated Production Line', descriptionTr: 'Günlük 5000+ parça kapasiteli seri üretim hattımız', descriptionEn: 'Mass production line with 5000+ parts daily capacity', src: '/galeri/3.jpeg', date: '2024-03-05', location: 'Üretim Hattı', resolution: '4K' },
    { id: 4, type: 'image', category: 'factory', titleTr: 'Hammadde Stok Alanı', titleEn: 'Raw Material Storage', descriptionTr: 'NATO standartlarında hammadde stok yönetimi', descriptionEn: 'Raw material stock management according to NATO standards', src: '/galeri/4.jpeg', date: '2024-02-28', location: 'Depo', resolution: 'HD' },
    { id: 5, type: 'image', category: 'factory', titleTr: 'Isıl İşlem Ünitesi', titleEn: 'Heat Treatment Unit', descriptionTr: 'Yüksek sıcaklık ısıl işlem süreçleri', descriptionEn: 'High temperature heat treatment processes', src: '/galeri/5.jpeg', date: '2024-02-20', location: 'Isıl İşlem', resolution: 'HD' },
    { id: 6, type: 'video', category: 'factory', titleTr: 'Fabrika Tanıtım Filmi', titleEn: 'Factory Promotional Video', descriptionTr: 'Modern üretim tesisimizde teknoloji ve kalite', descriptionEn: 'Technology and quality in our modern production facility', src: '/galeri/6.mp4', poster: '/galeri/WhatsApp Image 2026-03-02 at 19.59.16.jpeg', date: '2024-03-01', duration: '2:45', resolution: '4K' },
    { id: 7, type: 'image', category: 'products', titleTr: 'Kritik Kol Kesici Parçalar', titleEn: 'Critical Lever Cutter Parts', descriptionTr: 'Hassas işlenmiş savunma sanayi kol kesici parçalar', descriptionEn: 'Precision machined defense industry lever cutter parts', src: '/galeri/7.jpeg', date: '2024-03-12', location: 'Ürün', resolution: '4K' },
    { id: 8, type: 'image', category: 'products', titleTr: 'Elmas Kaplama Takımlar', titleEn: 'Diamond Coated Tools', descriptionTr: 'Endüstriyel elmas teknolojisi ile üretilen takımlar', descriptionEn: 'Tools produced with industrial diamond technology', src: '/galeri/8.jpeg', date: '2024-03-08', location: 'Ürün', resolution: '4K' },
    { id: 9, type: 'image', category: 'products', titleTr: 'Hidrolik Sistem Parçaları', titleEn: 'Hydraulic System Parts', descriptionTr: 'Milli muharip araçlar için hidrolik sistem bileşenleri', descriptionEn: 'Hydraulic system components for national combat vehicles', src: '/galeri/9.jpeg', date: '2024-03-03', location: 'Ürün', resolution: 'HD' },
    { id: 10, type: 'video', category: 'products', titleTr: 'Üretim Süreci Belgeseli', titleEn: 'Production Process Documentary', descriptionTr: 'Hammaddeden son ürüne kadar tüm üretim aşamaları', descriptionEn: 'All production stages from raw material to final product', src: '/galeri/WhatsApp Video 2026-04-03 at 01.33.10.mp4', poster: '/galeri/WhatsApp Image 2026-04-03 at 02.05.17 (2).jpeg', date: '2024-02-25', duration: '5:30', resolution: '4K' },
    { id: 11, type: 'image', category: 'team', titleTr: 'Ar-Ge Mühendislik Ekibi', titleEn: 'R&D Engineering Team', descriptionTr: '100+ mühendis ile milli teknoloji geliştirme', descriptionEn: 'National technology development with 100+ engineers', src: '/galeri/WhatsApp Image 2026-03-02 at 19.58.24.jpeg', date: '2024-03-14', location: 'Ar-Ge Merkezi', resolution: '4K' },
    { id: 12, type: 'image', category: 'team', titleTr: 'Kalite Kontrol Uzmanları', titleEn: 'Quality Control Specialists', descriptionTr: 'ISO ve AS9100 standartlarında kalite kontrol', descriptionEn: 'Quality control according to ISO and AS9100 standards', src: '/galeri/WhatsApp Image 2026-04-03 at 02.05.13 (2).jpeg', date: '2024-03-07', location: 'Kalite Lab', resolution: 'HD' },
    { id: 13, type: 'image', category: 'team', titleTr: 'Proje Değerlendirme Toplantısı', titleEn: 'Project Evaluation Meeting', descriptionTr: 'Savunma sanayi projelerinde stratejik planlama', descriptionEn: 'Strategic planning in defense industry projects', src: '/galeri/WhatsApp Image 2026-04-03 at 02.05.18.jpeg', date: '2024-02-22', location: 'Toplantı Salonu', resolution: 'HD' },
    { id: 14, type: 'image', category: 'events', titleTr: 'IDEF Savunma Sanayi Fuarı', titleEn: 'IDEF Defense Industry Fair', descriptionTr: 'IDEF 2024 fuarında yenilikçi ürünlerimiz', descriptionEn: 'Our innovative products at IDEF 2024 fair', src: '/galeri/WhatsApp Image 2026-04-03 at 02.05.06.jpeg', date: '2024-02-18', location: 'IDEF İstanbul', resolution: '4K' },
    { id: 15, type: 'image', category: 'events', titleTr: 'ASELSAN Teknik Ziyareti', titleEn: 'ASELSAN Technical Visit', descriptionTr: 'ASELSAN heyetinin tesislerimizi ziyareti', descriptionEn: 'ASELSAN delegation visit to our facilities', src: '/galeri/WhatsApp Image 2026-04-03 at 02.05.17 (4).jpeg', date: '2024-02-10', location: 'Tesis', resolution: 'HD' }
  ]

  const filteredItems = selectedCategory === 'all' ? galleryItems : galleryItems.filter(item => item.category === selectedCategory)
  
  const currentCategory = categories.find(c => c.id === selectedCategory)

  const openLightbox = (item) => {
    setSelectedItem(item)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setSelectedItem(null)
    document.body.style.overflow = 'auto'
    setZoomLevel(1)
  }

  const navigateLightbox = (direction) => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id)
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1
    if (newIndex >= 0 && newIndex < filteredItems.length) {
      setSelectedItem(filteredItems[newIndex])
      setZoomLevel(1)
    }
  }

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3))
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5))

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') navigateLightbox('prev')
      if (e.key === 'ArrowRight') navigateLightbox('next')
      if (e.key === '+' || e.key === '=') handleZoomIn()
      if (e.key === '-' || e.key === '_') handleZoomOut()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, selectedItem])

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  }, [])

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-950 to-navy-900">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-navy-700 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-navy-500 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 border-2 border-navy-400 rounded-full border-t-transparent animate-spin animation-delay-300"></div>
          </div>
          <p className="text-gray-400 text-sm tracking-wider animate-pulse uppercase">Görsel Arşivi Yükleniyor</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>TAMİS | Kurumsal Görsel Arşiv | 4K Fabrika ve Ürün Galerisi</title>
        <meta name="description" content="TAMİS savunma sanayi 4K üretim tesisleri, CNC işleme merkezleri, kalite kontrol laboratuvarı, mühendislik ekibi ve ürün galerisi." />
      </Helmet>

      {/* PREMIUM HERO BÖLÜMÜ */}
      <div className="relative pt-20 min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(45,90,140,0.2)_0%,_transparent_70%)] z-10"></div>
          <div className="absolute inset-0 bg-[url('/galeri/WhatsApp Image 2026-04-03 at 02.05.17 (3).jpeg')] bg-cover bg-center opacity-10 animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-navy-900 to-transparent z-10"></div>
        </div>
        
        <div className="relative container-custom z-20 py-20 md:py-24">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center space-x-3 bg-navy-800/30 backdrop-blur-md rounded-full px-6 py-2.5 border border-navy-600/50 mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-gray-300 tracking-wide uppercase">{t('gallery.subtitle')}</span>
              <span className="text-xs text-navy-400">| {t('gallery.mediaCount')}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight animate-slide-up">
              {i18n.language === 'tr' ? 'Üretimden' : 'From'} 
              <span className="bg-gradient-to-r from-navy-400 via-white to-navy-400 bg-clip-text text-transparent animate-pulse-slow"> {i18n.language === 'tr' ? 'Kareler' : 'Production'}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto animate-fade-in">
              {i18n.language === 'tr' 
                ? 'Son teknoloji üretim tesisimiz, uzman ekibimiz ve kalite kontrol süreçlerimizle madencilik sanayinde fark yaratıyoruz.'
                : 'We make a difference in the defense industry with our state-of-the-art production facilities, expert team and quality control processes.'}
            </p>

            {/* Premium İstatistikler */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-12">
              
              <div className="text-center group cursor-pointer">
                <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">10+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t('gallery.stats.personnel')}</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">10+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t('gallery.stats.cnc')}</div>
              </div>
             
            </div>
          </div>
        </div>
      </div>

      {/* PREMIUM KATEGORİ FİLTRELERİ - AYNI */}
      <div className="sticky top-16 md:top-20 z-30 bg-navy-900/95 backdrop-blur-xl border-b border-navy-700/50 py-5 shadow-2xl">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-6 md:px-8 py-3 rounded-full transition-all duration-500 overflow-hidden group ${
                  selectedCategory === cat.id
                    ? 'text-white shadow-2xl scale-105'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className={`absolute inset-0 transition-all duration-500 rounded-full ${
                  selectedCategory === cat.id 
                    ? `bg-gradient-to-r ${cat.bg} opacity-100 shadow-lg` 
                    : 'bg-navy-800/50 group-hover:bg-navy-700/70'
                }`}></div>
                <div className="relative flex items-center space-x-3 z-10">
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-sm md:text-base font-semibold tracking-wide">
                    {i18n.language === 'tr' ? cat.labelTr : cat.labelEn}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                    selectedCategory === cat.id ? 'bg-white/20' : 'bg-navy-700'
                  }`}>
                    {galleryItems.filter(i => i.category === cat.id).length}
                  </span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="text-center mt-5">
            <p className="text-sm text-gray-500 italic">
              {i18n.language === 'tr' ? currentCategory?.descTr : currentCategory?.descEn}
            </p>
          </div>
        </div>
      </div>

      {/* PREMIUM GALERİ GRID - AYNI */}
      <div className="py-20 md:py-28 bg-gradient-to-b from-navy-900 to-navy-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="group bg-gradient-to-br from-navy-800/60 to-navy-900/60 rounded-2xl overflow-hidden border border-navy-700/50 hover:border-navy-500 transition-all duration-500 cursor-pointer hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-navy-500/20 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => openLightbox(item)}
              >
                {/* Görsel Alanı */}
                <div className="relative overflow-hidden bg-navy-800 h-72">
                  {item.type === 'video' ? (
                    <>
                      <img
                        src={item.poster}
                        alt={i18n.language === 'tr' ? item.titleTr : item.titleEn}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-red-600/90 flex items-center justify-center transform scale-90 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.src}
                      alt={i18n.language === 'tr' ? item.titleTr : item.titleEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  
                  {/* Premium Badge */}
                  <div className="absolute top-4 left-4 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{categories.find(c => c.id === item.category)?.icon}</span>
                        <span className="text-xs text-white font-medium">
                          {item.resolution === '4K' && '4K ULTRA HD'}
                          {item.resolution === 'HD' && 'FULL HD'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Premium Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white font-bold text-base md:text-lg mb-1">
                        {i18n.language === 'tr' ? item.titleTr : item.titleEn}
                      </h3>
                      <p className="text-gray-300 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {i18n.language === 'tr' ? item.descriptionTr : item.descriptionEn}
                      </p>
                    </div>
                  </div>

                  {/* Video Badge */}
                  {item.type === 'video' && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-red-600/90 backdrop-blur-sm rounded-full px-2 py-1">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-white">🎬 {item.duration}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Premium Alt Bilgi */}
                <div className="p-5 bg-gradient-to-t from-navy-800/80 to-transparent">
                  <h3 className="text-white font-bold text-base md:text-lg line-clamp-1">
                    {i18n.language === 'tr' ? item.titleTr : item.titleEn}
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <span>📅</span>
                        <span>{new Date(item.date).toLocaleDateString('tr-TR')}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>📍</span>
                        <span>{item.location}</span>
                      </span>
                    </div>
                    <div className="text-navy-400 group-hover:translate-x-1 transition-transform">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-32">
              <div className="text-8xl mb-6 opacity-30 animate-pulse-slow">📷</div>
              <h3 className="text-2xl text-white mb-3">{i18n.language === 'tr' ? 'Görsel Bulunamadı' : 'No Media Found'}</h3>
              <p className="text-gray-500">{i18n.language === 'tr' ? 'Bu kategoride henüz içerik eklenmemiş.' : 'No content has been added in this category yet.'}</p>
            </div>
          )}
        </div>
      </div>

      {/* PREMIUM LIGHTBOX - AYNI */}
      {lightboxOpen && selectedItem && (
        <div className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-2xl flex items-center justify-center animate-fade-in">
          
          <div className="absolute top-6 right-6 flex items-center space-x-3 z-30">
            <button onClick={handleZoomOut} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            </button>
            <button onClick={handleZoomIn} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </button>
            <button onClick={closeLightbox} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <button onClick={() => navigateLightbox('prev')} className="absolute left-6 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
            <svg className="w-6 h-6 text-white group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button onClick={() => navigateLightbox('next')} className="absolute right-6 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
            <svg className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="relative w-full h-full flex flex-col items-center justify-center p-8 md:p-12">
            <div className="max-w-7xl w-full max-h-[85vh] flex items-center justify-center overflow-hidden">
              {selectedItem.type === 'video' ? (
                <video src={selectedItem.src} controls autoPlay className="max-w-full max-h-[85vh] w-auto h-auto rounded-2xl shadow-2xl" poster={selectedItem.poster} />
              ) : (
                <img src={selectedItem.src} alt={i18n.language === 'tr' ? selectedItem.titleTr : selectedItem.titleEn} className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-2xl shadow-2xl transition-transform duration-300 cursor-zoom-in" style={{ transform: `scale(${zoomLevel})`, cursor: zoomLevel > 1 ? 'zoom-out' : 'zoom-in' }} onClick={() => zoomLevel > 1 ? handleZoomOut() : handleZoomIn()} />
              )}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-24 pb-8">
              <div className="container-custom text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {i18n.language === 'tr' ? selectedItem.titleTr : selectedItem.titleEn}
                </h3>
                <p className="text-gray-300 text-base max-w-3xl mx-auto">
                  {i18n.language === 'tr' ? selectedItem.descriptionTr : selectedItem.descriptionEn}
                </p>
                <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-400">
                  <span className="flex items-center space-x-2"><span>📅</span><span>{new Date(selectedItem.date).toLocaleDateString('tr-TR')}</span></span>
                  <span className="flex items-center space-x-2"><span>📍</span><span>{selectedItem.location}</span></span>
                  <span className="flex items-center space-x-2"><span>🎯</span><span>{categories.find(c => c.id === selectedItem.category)?.labelTr}</span></span>
                  <span className="flex items-center space-x-2"><span>📷</span><span>{selectedItem.resolution}</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-xs text-gray-400 font-mono">
            {String(filteredItems.findIndex(i => i.id === selectedItem.id) + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
          </div>
        </div>
      )}
    </>
  )
}

export default Galeri