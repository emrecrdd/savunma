import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Section from '../components/Section'

const Products = () => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock Data
  const mockProducts = [
    {
      id: 1,
      titleTr: 'Kollu Kesici Parçaları',
      titleEn: 'Lever Cutter Parts',
      descriptionTr: 'Yüksek hassasiyetli CNC makinelerinde işlenen, kaliteli standartlarında üretilen kol kesici parçalar.',
      descriptionEn: 'High precision CNC machined lever cutter parts manufactured to quality standards.',
      longDescriptionTr: 'Mermer doğal taş ocaklarında kullanılan kollu kesici makine ekipmanları.',
      longDescriptionEn: 'Lever cutter parts manufactured with high quality material and workmanship.',
      category: 'lever',
      imageUrl: '/images/ürün4.jpeg',
      features: [
        'products.features.iso',
        'products.features.precision',
        'products.features.durable',
        'products.features.heat'
      ],
      pdf: '/catalogs/tamis-katalog-2024.pdf'
    },
    {
      id: 2,
      titleTr: 'Elmas Kesici Takımlar',
      titleEn: 'Diamond Cutting Tools',
      descriptionTr: 'Endüstriyel elmas teknolojisi ile üretilen kesici takımlar.',
      descriptionEn: 'Cutting tools produced with industrial diamond technology.',
      longDescriptionTr: 'Mermer doğal taş kesiminde yüksek dayanımlı elmas uçları.',
      longDescriptionEn: 'High performance diamond tools for cutting applications.',
      category: 'diamond',
      imageUrl: '/images/ürün2.jpeg',
      features: [
        'products.features.diamond',
        'products.features.heat',
        'products.features.longlife',
        'products.features.precision'
      ],
      pdf: '/catalogs/tamis-katalog-2024.pdf'
    },
    {
      id: 3,
      titleTr: 'Yağlama Sistemleri',
      titleEn: 'Lubrication Systems',
      descriptionTr: 'Makine performansını artırıcı ve aşınma önleyici yağlama sistemleri.',
      descriptionEn: 'Lubrication systems that increase machine performance and prevent wear.',
      longDescriptionTr: 'Makine performansını artırıcı ve aşınma önleyici ekipmanlar.',
      longDescriptionEn: 'Lubrication systems manufactured with high quality components.',
      category: 'lubrication',
      imageUrl: '/images/ürün.jpeg',
      features: [
        'products.features.pressure',
        'products.features.seal',
        'products.features.compact',
        'products.features.durable'
      ],
      pdf: '/catalogs/tamis-katalog-2024.pdf'
    },
    {
      id: 4,
      titleTr: 'Özel Tasarım Bileşenler',
      titleEn: 'Special Design Components',
      descriptionTr: 'Müşteri taleplerine göre özel tasarım bileşenler.',
      descriptionEn: 'Custom designed components according to customer requirements.',
      longDescriptionTr: 'Mermer ocaklarında çözüm odaklı özel ürünler.',
      longDescriptionEn: 'Special components designed and manufactured according to customer requirements.',
      category: 'special',
      imageUrl: '/images/extra.jpeg',
      features: [
        'products.features.precision',
        'products.features.durable',
        'products.features.iso',
        'products.features.compact'
      ],
      pdf: '/catalogs/tamis-katalog-2024.pdf'
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts)
      setLoading(false)
    }, 500)
  }, [])

  const categories = [
    { value: 'all', labelTr: 'Tüm Ürünler', labelEn: 'All Products' },
    { value: 'lever', labelTr: 'Kollu Kesici Parçaları', labelEn: 'Lever Cutter Parts' },
    { value: 'diamond', labelTr: 'Elmas Kesici Takımlar', labelEn: 'Diamond Cutting Tools' },
    { value: 'lubrication', labelTr: 'Yağlama Sistemleri', labelEn: 'Lubrication Systems' },
    { value: 'special', labelTr: 'Özel Tasarım Bileşenler', labelEn: 'Special Design Components' }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

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
        "name": currentLang === 'tr' ? "Ürünler" : "Products",
        "item": "https://tamismakine.com.tr/products"
      }
    ]
  }

  // Product Schema için
  const productSchemas = filteredProducts.map(product => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": currentLang === 'tr' ? product.titleTr : product.titleEn,
    "description": currentLang === 'tr' ? product.descriptionTr : product.descriptionEn,
    "image": `https://tamismakine.com.tr${product.imageUrl}`,
    "brand": {
      "@type": "Brand",
      "name": "TAMİS"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "TRY"
    }
  }))

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
          ? 'TAMİS | Ürünler - Kollu Kesici, Elmas Takımlar, Yağlama Sistemleri' 
          : 'TAMİS | Products - Lever Cutter, Diamond Tools, Lubrication Systems'}</title>
        
        <meta name="description" content={currentLang === 'tr' 
          ? 'TAMİS kalitesi ile mermer ocakları için kollu kesici parçalar, elmas kesici takımlar, yağlama sistemleri ve özel tasarım bileşenler.'
          : 'TAMİS quality lever cutter parts, diamond cutting tools, lubrication systems and special design components for marble quarries.'} 
        />
        
        <meta name="keywords" content="TAMİS ürünler, kollu kesici, elmas takımlar, yağlama sistemleri, mermer ocak ekipmanları, yedek parça, CNC işleme" />
        
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        <link rel="canonical" href="https://tamismakine.com.tr/products" />
        
        <link rel="alternate" href="https://tamismakine.com.tr/products" hreflang="tr" />
        <link rel="alternate" href="https://tamismakine.com.tr/en/products" hreflang="en" />
        
        {/* Open Graph */}
        <meta property="og:title" content={currentLang === 'tr' ? 'TAMİS | Ürünler' : 'TAMİS | Products'} />
        <meta property="og:description" content={currentLang === 'tr' ? 'Mermer ocak ekipmanları' : 'Marble quarry equipment'} />
        <meta property="og:image" content="https://tamismakine.com.tr/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://tamismakine.com.tr/products" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TAMİS" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentLang === 'tr' ? 'TAMİS | Ürünler' : 'TAMİS | Products'} />
        <meta name="twitter:description" content={currentLang === 'tr' ? 'Mermer ocak ekipmanları' : 'Marble quarry equipment'} />
        <meta name="twitter:image" content="https://tamismakine.com.tr/images/og-image.jpg" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(productSchemas)}
        </script>
      </Helmet>

      {/* Gizli H1 */}
      <h1 className="sr-only">TAMİS Ürünler - Mermer Ocak Ekipmanları, Kollu Kesici, Elmas Takımlar, Yağlama Sistemleri</h1>

      <div className="relative pt-20 bg-gradient-to-r from-navy-900 to-navy-800">
        <div className="container-custom py-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            {t('nav.products')}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            {currentLang === 'tr' 
              ? 'Mermer ocak ekipmanları için ihtiyaç duyulan yüksek teknoloji ve dayanıklı ürünler.'
              : 'High technology and durable products needed for marble quarry equipment.'}
          </p>
        </div>
      </div>

      <Section>
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedCategory === cat.value
                  ? 'bg-navy-600 text-white'
                  : 'bg-navy-800 text-gray-400 hover:bg-navy-700 hover:text-white'
              }`}
            >
              {currentLang === 'tr' ? cat.labelTr : cat.labelEn}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-gradient-to-b from-navy-800 to-navy-900 rounded-xl overflow-hidden border border-navy-700 hover:border-navy-500 transition-all duration-500 hover:shadow-2xl hover:shadow-navy-900/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="bg-navy-800 border-r border-navy-700 relative overflow-hidden">
                  <div className="h-[280px] md:h-[320px] w-full">
                    <img
                      src={product.imageUrl}
                      alt={currentLang === 'tr' ? product.titleTr : product.titleEn}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/fallback.png';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                </div>

                <div className="md:col-span-2 p-6 flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-navy-300 transition-colors">
                    {currentLang === 'tr' ? product.titleTr : product.titleEn}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {currentLang === 'tr' ? product.longDescriptionTr : product.longDescriptionEn}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.map((featureKey, i) => (
                      <span key={i} className="text-xs bg-navy-900 text-navy-300 px-2 py-1 rounded-full border border-navy-700">
                        {t(featureKey)}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-auto">
                    <Link
                      to={`/products/${product.id}`}
                      className="btn-primary text-sm py-2 px-4"
                    >
                      {currentLang === 'tr' ? 'Detaylı İncele' : 'View Details'}
                    </Link>
                    <a
                      href={product.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline text-sm py-2 px-4"
                    >
                      {t('products.technicalPdf')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}

export default Products