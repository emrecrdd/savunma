import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Section from '../components/Section'

const Products = () => {
  const { t, i18n } = useTranslation()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock Data
  const mockProducts = [
    {
      id: 1,
      titleTr: 'Kollu Kesici Parçaları',
      titleEn: 'Lever Cutter Parts',
      descriptionTr: 'Yüksek hassasiyetli CNC makinelerinde işlenen, savunma sanayi standartlarında üretilen kol kesici parçalar.',
      descriptionEn: 'High precision CNC machined lever cutter parts manufactured to defense industry standards.',
      longDescriptionTr: 'Mermer doğal taş ocaklarında kullanılan kollu kesici makine ekipmanları.',
      longDescriptionEn: 'Lever cutter parts manufactured with NATO criteria compliant material and workmanship, used in ammunition and defense systems.',
      category: 'lever',
      imageUrl: '/images/ürün4.jpeg',
      features: [
        'products.features.iso',
        'products.features.precision',
        'products.features.durable',
        'products.features.heat'
      ],
      pdf: '/catalogs/hhh.pdf'
    },
    {
      id: 2,
      titleTr: 'Elmas Kesici Takımlar',
      titleEn: 'Diamond Cutting Tools',
      descriptionTr: 'Endüstriyel elmas teknolojisi ile üretilen kesici takımlar.',
      descriptionEn: 'Cutting tools produced with industrial diamond technology.',
      longDescriptionTr: 'Mermer doğal taş kesiminde yüksek dayanımlı elmas uçları.',
      longDescriptionEn: 'High performance diamond tools used in armor-piercing ammunition and special defense equipment.',
      category: 'diamond',
      imageUrl: '/images/ürün2.jpeg',
      features: [
        'products.features.diamond',
        'products.features.heat',
        'products.features.longlife',
        'products.features.precision'
      ],
      pdf: '/catalogs/q.pdf'
    },
    {
      id: 3,
      titleTr: 'Yağlama Sistemleri',
      titleEn: 'Hydraulic Systems',
      descriptionTr: 'Milli muharip araçlar için özel hidrolik sistemler.',
      descriptionEn: 'Special hydraulic systems for national combat vehicles.',
      longDescriptionTr: 'Makine performansını artırıcı ve aşınma önleyici ekipmanlar.',
      longDescriptionEn: 'Hydraulic systems manufactured with high pressure resistance and perfect sealing technology.',
      category: 'hydraulic',
      imageUrl: '/images/ürün.jpeg',
      features: [
        'products.features.pressure',
        'products.features.seal',
        'products.features.compact',
        'products.features.durable'
      ],
      pdf: '/catalogs/u.pdf'
    },
    {
      id: 4,
      titleTr: 'Diğer Ürünler',
      titleEn: 'Special Defense Components',
      descriptionTr: 'Kritik savunma sistemleri için özel tasarım bileşenler.',
      descriptionEn: 'Custom designed components for critical defense systems.',
      longDescriptionTr: 'Mermer ocaklarında çözüm odaklı ürünler.',
      longDescriptionEn: 'Critical defense components designed and manufactured according to customer requirements.',
      category: 'special',
      imageUrl: '/images/extra.jpeg',
      features: [
        'products.features.precision',
        'products.features.durable',
        'products.features.iso',
        'products.features.compact'
      ],
      pdf: '/catalogs/o.pdf'
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
    { value: 'hydraulic', labelTr: 'Yağlama Sistemleri', labelEn: 'Hydraulic Systems' },
    { value: 'special', labelTr: 'Diğer Ürünler', labelEn: 'Special Components' }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

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
        <title>TAMİS | {t('nav.products')}</title>
        <meta name="description" content="Savunma sanayi ürünleri: kol kesici parçalar, elmas takımlar, hidrolik sistemler" />
      </Helmet>

      <div className="relative pt-20 bg-gradient-to-r from-navy-900 to-navy-800">
        <div className="container-custom py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            {t('nav.products')}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            {i18n.language === 'tr' 
              ? 'Mermer ocak ekipmanları için ihtiyaç duyulan yüksek teknoloji ve dayanıklı ürünler.'
              : 'High technology products needed by the defense industry.'}
          </p>
        </div>
      </div>

      <Section>
        {/* Kategori Filtreleri */}
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
              {i18n.language === 'tr' ? cat.labelTr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Ürünler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-gradient-to-b from-navy-800 to-navy-900 rounded-xl overflow-hidden border border-navy-700 hover:border-navy-500 transition-all duration-500 hover:shadow-2xl hover:shadow-navy-900/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {/* Sol: Görsel - SABİT YÜKSEKLİK */}
                <div className="bg-navy-800 border-r border-navy-700 relative overflow-hidden">
                  {/* Tüm görseller için SABİT yükseklik */}
                  <div className="h-[280px] md:h-[320px] w-full">
                    <img
                      src={product.imageUrl}
                      alt={i18n.language === 'tr' ? product.titleTr : product.titleEn}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x400?text=Gorsel+Yok';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                 
                </div>

                {/* Sağ: İçerik */}
                <div className="md:col-span-2 p-6 flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-navy-300 transition-colors">
                    {i18n.language === 'tr' ? product.titleTr : product.titleEn}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {i18n.language === 'tr' ? product.longDescriptionTr : product.longDescriptionEn}
                  </p>

                  {/* Özellikler - DİNAMİK */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.map((featureKey, i) => (
                      <span key={i} className="text-xs bg-navy-900 text-navy-300 px-2 py-1 rounded-full border border-navy-700">
                        {t(featureKey)}
                      </span>
                    ))}
                  </div>

                  {/* Butonlar */}
                  <div className="flex flex-wrap gap-3 mt-auto">
                    <Link
                      to={`/products/${product.id}`}
                      className="btn-primary text-sm py-2 px-4"
                    >
                      {i18n.language === 'tr' ? 'Detaylı İncele' : 'View Details'}
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