import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { 
  ArrowLeft, 
  Calendar, 
  Tag, 
  Share2, 
  Printer, 
  X,
  ZoomIn,
  CheckCircle,
  Award,
  Users,
  TrendingUp,
  Globe,
  Handshake,
  Shield,
  Rocket,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const NewsDetail = () => {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const galleryRef = useRef(null)

  const getCategoryLabel = (cat) => {
    const categories = {
      press: { tr: 'Basın Açıklaması', en: 'Press Release' },
      news: { tr: 'Haber', en: 'News' },
      announcement: { tr: 'Duyuru', en: 'Announcement' },
      event: { tr: 'Etkinlik', en: 'Event' }
    }
    const category = categories[cat] || categories.news
    return i18n.language === 'tr' ? category.tr : category.en
  }

  // TÜM haberlerin detayları - STANDART FORMAT
  const mockNewsDetails = {
    1: {
      id: 1,
      titleTr: '31.Marble İzmir Uluslararası Fuarı',
      titleEn: '31st Marble Izmir International Fair',
      summaryTr: '31.Marble İzmir Uluslararası Doğal Taş ve Teknolojileri Fuarı\'nda yeni ürünlerimiz büyük ilgi gördü.',
      summaryEn: 'Our new products attracted great attention at the 31st Marble Izmir International Natural Stone and Technologies Fair.',
      contentTr: `
        <div class="bg-gradient-to-r from-green-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-green-500">
          <p class="text-lg font-semibold text-green-400 mb-2">📢 Önemli Duyuru</p>
          <p class="text-gray-300">31.Marble İzmir Uluslararası Doğal Taş ve Teknolojileri Fuarı, sektörün en önemli buluşma noktalarından biridir. Bu yıl düzenlenen fuarda firmamız, yeni geliştirdiği ürünleriyle büyük ilgi gördü.</p>
        </div>

        <h2> Fuardan Öne Çıkanlar</h2>
        <p>Üç gün süren fuar boyunca, 20'den fazla ülkeden gelen ziyaretçilerimize ürünlerimizi tanıtma fırsatı bulduk. Özellikle yüzey işleme teknolojilerimiz büyük beğeni topladı.</p>
        <ul>
          <li><strong> 20+ ülkeden</strong> profesyonel ziyaretçi</li>
          <li><strong> 50+ iş görüşmesi</strong> gerçekleştirildi</li>
          <li><strong> En Yenilikçi Ürün</strong> ödülüne layık görüldük</li>
          <li><strong> %45 artan</strong> ihracat potansiyeli</li>
        </ul>

        <h2> Yeni Ürünlerimiz</h2>
        <p>Fuarda sergilediğimiz yeni ürün serimiz, doğal taş işlemede devrim niteliği taşıyan özellikler sunuyor:</p>
        <ul>
          <li><strong> Yüksek hassasiyet</strong> - Mikron seviyesinde işçilik</li>
          <li><strong> Düşük enerji tüketimi</strong> - %40'a varan tasarruf</li>
          <li><strong> Uzun ömürlü kullanım</strong> - 10 yıl garanti</li>
        </ul>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-green-500/10 rounded-lg">
            <div class="text-2xl font-bold text-green-400">20+</div>
            <div class="text-sm text-gray-400">Ülke</div>
          </div>
          <div class="text-center p-4 bg-green-500/10 rounded-lg">
            <div class="text-2xl font-bold text-green-400">50+</div>
            <div class="text-sm text-gray-400">İş Görüşmesi</div>
          </div>
        </div>

        <h2>💬 Ziyaretçi Geri Bildirimleri</h2>
        <p>Fuara katılan sektör profesyonelleri, ürünlerimizin kalitesi ve yenilikçi yaklaşımımız hakkında olumlu geri bildirimlerde bulundu. Birçok firma ile potansiyel iş birliği görüşmeleri gerçekleştirdik. 2025 yılı için hedefimiz, bu başarıyı daha da ileriye taşımaktır.</p>
      `,
      contentEn: `
        <div class="bg-gradient-to-r from-green-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-green-500">
          <p class="text-lg font-semibold text-green-400 mb-2">📢 Important Announcement</p>
          <p class="text-gray-300">The 31st Marble Izmir International Natural Stone and Technologies Fair is one of the most important meeting points of the sector. Our company attracted great attention with its newly developed products at this year's fair.</p>
        </div>

        <h2> Highlights from the Fair</h2>
        <p>During the three-day fair, we had the opportunity to introduce our products to visitors from more than 20 countries. Our surface processing technologies were especially appreciated.</p>
        <ul>
          <li><strong> Professional visitors from</strong> 20+ countries</li>
          <li><strong> 50+ business meetings</strong> conducted</li>
          <li><strong> Awarded</strong> Most Innovative Product</li>
          <li><strong> 45% increased</strong> export potential</li>
        </ul>

        <h2> Our New Products</h2>
        <p>Our new product series exhibited at the fair offers revolutionary features in natural stone processing:</p>
        <ul>
          <li><strong> High precision</strong> - Micron-level craftsmanship</li>
          <li><strong> Low energy consumption</strong> - Up to 40% savings</li>
          <li><strong> Long-lasting use</strong> - 10 year warranty</li>
        </ul>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-green-500/10 rounded-lg">
            <div class="text-2xl font-bold text-green-400">20+</div>
            <div class="text-sm text-gray-400">Countries</div>
          </div>
          <div class="text-center p-4 bg-green-500/10 rounded-lg">
            <div class="text-2xl font-bold text-green-400">50+</div>
            <div class="text-sm text-gray-400">Meetings</div>
          </div>
        </div>

        <h2>💬 Visitor Feedback</h2>
        <p>Industry professionals who attended the fair gave positive feedback about the quality of our products and our innovative approach. We held potential collaboration meetings with many companies. Our goal for 2025 is to take this success even further.</p>
      `,
      category: 'press',
      imageUrl: '/images/detay3.jpeg',
      images: ['/images/detay1.jpeg', '/images/detay2.jpeg', '/images/detay3.jpeg'],
      publishDate: '2026-04-14',
      location: 'İzmir, Türkiye',
      author: 'Tamis Basın Birimi',
      features: [
        { icon: Globe, labelTr: '20+ Ülkeden Ziyaretçi', labelEn: 'Visitors from 20+ Countries' },
        { icon: Award, labelTr: 'En Yenilikçi Ürün Ödülü', labelEn: 'Most Innovative Product Award' },
        { icon: Users, labelTr: '500+ Profesyonel Katılım', labelEn: '500+ Professional Participants' },
        { icon: TrendingUp, labelTr: '%45 Artan İhracat', labelEn: '45% Increased Export' }
      ],
      stats: [
        { value: '20+', labelTr: 'Ülke', labelEn: 'Countries' },
        { value: '500+', labelTr: 'Ziyaretçi', labelEn: 'Visitors' },
        { value: '50+', labelTr: 'İş Görüşmesi', labelEn: 'Meetings' },
        { value: '%45', labelTr: 'Büyüme', labelEn: 'Growth' }
      ]
    },
    2: {
      id: 2,
      titleTr: 'Blok Mermer Fuarı B-Holl R 13',
      titleEn: 'Block Marble Fair Hall B Stand 13',
      summaryTr: '2. Afyonkarahisar Blok Mermer Fuarı\'nda B-Holl 13 numaralı standımızda sizleri bekliyoruz.',
      summaryEn: 'We are waiting for you at our stand Hall B Number 13 at the 2nd Afyonkarahisar Block Marble Fair.',
      contentTr: `
        <div class="bg-gradient-to-r from-orange-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-orange-500">
          <p class="text-lg font-semibold text-orange-400 mb-2">📅 Etkinlik Duyurusu</p>
          <p class="text-gray-300">2. Afyonkarahisar Blok Mermer Fuarı, doğal taş sektörünün önemli buluşmalarından biridir. Tamis olarak B-Holl 13 numaralı standımızda sizleri ağırlamaktan mutluluk duyacağız.</p>
        </div>

        <h2>🏢 Fuarda Neler Göreceksiniz?</h2>
        <p>Standımızda en yeni mermer işleme teknolojilerimiz, blok kesme makinelerimiz ve yüzey finisaj ürünlerimiz sergilenecektir.</p>
        <ul>
          <li><strong> Blok kesme makineleri</strong> - Canlı demo gösterimi</li>
          <li><strong> Yüzey finisaj teknolojileri</strong> - Yeni nesil kaplamalar</li>
          <li><strong> Özel tasarım ekipmanlar</strong> - Siparişe özel çözümler</li>
        </ul>

        <h2>📅 Ziyaret Saatleri</h2>
        <p>Fuar, 17-20 Haziran 2026 tarihleri arasında 10:00 - 18:00 saatleri arasında ziyarete açık olacaktır. Sektör profesyonellerini standımızda ağırlamaktan mutluluk duyarız.</p>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-orange-500/10 rounded-lg">
            <div class="text-2xl font-bold text-orange-400">4</div>
            <div class="text-sm text-gray-400">Gün</div>
          </div>
          <div class="text-center p-4 bg-orange-500/10 rounded-lg">
            <div class="text-2xl font-bold text-orange-400">1000+</div>
            <div class="text-sm text-gray-400">Beklenen Ziyaretçi</div>
          </div>
        </div>

        <h2> Fuar Hedeflerimiz</h2>
        <p>Bu fuardaki hedefimiz, yeni iş bağlantıları kurmak, mevcut müşterilerimizle bir araya gelmek ve sektördeki son yenilikleri takip etmektir.</p>
      `,
      contentEn: `
        <div class="bg-gradient-to-r from-orange-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-orange-500">
          <p class="text-lg font-semibold text-orange-400 mb-2">📅 Event Announcement</p>
          <p class="text-gray-300">The 2nd Afyonkarahisar Block Marble Fair is one of the important meetings of the natural stone sector. As Tamis, we will be happy to host you at our stand Hall B Number 13.</p>
        </div>

        <h2>🏢 What Will You See at the Fair?</h2>
        <p>Our latest marble processing technologies, block cutting machines and surface finishing products will be exhibited at our stand.</p>
        <ul>
          <li><strong> Block cutting machines</strong> - Live demo</li>
          <li><strong> Surface finishing technologies</strong> - Next generation coatings</li>
          <li><strong> Custom equipment</strong> - Tailored solutions</li>
        </ul>

        <h2>📅 Visiting Hours</h2>
        <p>The fair will be open to visitors between 10:00 - 18:00 on June 17-20, 2026. We will be happy to host sector professionals at our stand.</p>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-orange-500/10 rounded-lg">
            <div class="text-2xl font-bold text-orange-400">4</div>
            <div class="text-sm text-gray-400">Days</div>
          </div>
          <div class="text-center p-4 bg-orange-500/10 rounded-lg">
            <div class="text-2xl font-bold text-orange-400">1000+</div>
            <div class="text-sm text-gray-400">Expected Visitors</div>
          </div>
        </div>

        <h2> Our Fair Goals</h2>
        <p>Our goal at this fair is to establish new business connections, meet with our existing customers and follow the latest innovations in the sector.</p>
      `,
      category: 'event',
      imageUrl: '/images/2.jpeg',
      images: ['/images/2.jpeg', '/images/5.jpeg', '/images/isortagı.jpeg'],
      publishDate: '2026-06-17',
      location: 'Afyonkarahisar, Türkiye',
      author: 'Tamis Fuarlar Ekibi',
      features: [
        { icon: CheckCircle, labelTr: 'Canlı Demo', labelEn: 'Live Demo' },
        { icon: Users, labelTr: 'Uzman Ekip', labelEn: 'Expert Team' },
        { icon: Handshake, labelTr: 'Ücretsiz Danışmanlık', labelEn: 'Free Consultation' },
        { icon: TrendingUp, labelTr: 'Özel Fırsatlar', labelEn: 'Special Opportunities' }
      ],
      stats: [
        { value: '4', labelTr: 'Gün', labelEn: 'Days' },
        { value: '1000+', labelTr: 'Ziyaretçi', labelEn: 'Visitors' },
        { value: '150+', labelTr: 'Firma', labelEn: 'Companies' },
        { value: '7/24', labelTr: 'Destek', labelEn: 'Support' }
      ]
    },
    3: {
      id: 3,
      titleTr: 'Markalaşıyoruz: "İsmail Usta"',
      titleEn: 'We Are Branding: "İsmail Usta"',
      summaryTr: 'Geleneksel işçiliğin sembolü "İsmail Usta" ismini markamız olarak belirledik.',
      summaryEn: 'We have chosen "İsmail Usta", the symbol of traditional craftsmanship, as our brand.',
      contentTr: `
        <div class="bg-gradient-to-r from-purple-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-purple-500">
          <p class="text-lg font-semibold text-purple-400 mb-2">🏷️ Marka Duyurusu</p>
          <p class="text-gray-300">Tamis olarak uzun süredir üzerinde çalıştığımız markalaşma sürecimizde önemli bir karar aldık. Geleneksel işçiliğin ve kalitenin sembolü olan "İsmail Usta" ismini markamız olarak belirledik.</p>
        </div>

        <h2>❓ Neden "İsmail Usta"?</h2>
        <p>İsmail Usta, sektörümüzde 35 yıllık tecrübesiyle tanınan, kalitesinden ödün vermeyen, ustalık ve dürüstlüğü simgeleyen bir değerdir.</p>
        <ul>
          <li><strong> 35 yıl tecrübe</strong> - Sektörde güvenilir isim</li>
          <li><strong> Kalite odaklı</strong> - Her üründe mükemmeliyet</li>
          <li><strong> Güvenilirlik</strong> - Müşteri memnuniyeti ön planda</li>
        </ul>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-purple-500/10 rounded-lg">
            <div class="text-2xl font-bold text-purple-400">35</div>
            <div class="text-sm text-gray-400">Yıl Tecrübe</div>
          </div>
          <div class="text-center p-4 bg-purple-500/10 rounded-lg">
            <div class="text-2xl font-bold text-purple-400">1000+</div>
            <div class="text-sm text-gray-400">Mutlu Müşteri</div>
          </div>
        </div>

        <h2> Yeni Marka Vizyonumuz</h2>
        <p>"İsmail Usta" markasıyla birlikte, geleneksel değerleri modern teknolojiyle buluşturmayı, müşteri memnuniyetini her şeyin önünde tutmayı ve sektörde güvenilir bir referans olmayı amaçlıyoruz.</p>

        <h2>🔄 Yenilikler</h2>
        <p>Yeni markamızla birlikte, ürün ambalajlarımız, reklam materyallerimiz ve dijital platformlarımız yenilenecektir. Bu süreçte bize destek olan tüm çalışanlarımıza ve iş ortaklarımıza teşekkür ederiz.</p>
      `,
      contentEn: `
        <div class="bg-gradient-to-r from-purple-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-purple-500">
          <p class="text-lg font-semibold text-purple-400 mb-2">🏷️ Brand Announcement</p>
          <p class="text-gray-300">As Tamis, we have made an important decision in our branding process that we have been working on for a long time. We have chosen the name "İsmail Usta", which is a symbol of traditional craftsmanship and quality, as our brand.</p>
        </div>

        <h2>❓ Why "İsmail Usta"?</h2>
        <p>İsmail Usta is a value known for his 35 years of experience in our sector, uncompromising quality, representing mastery and honesty.</p>
        <ul>
          <li><strong> 35 years experience</strong> - Trusted name in the industry</li>
          <li><strong> Quality focused</strong> - Excellence in every product</li>
          <li><strong> Reliability</strong> - Customer satisfaction priority</li>
        </ul>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-purple-500/10 rounded-lg">
            <div class="text-2xl font-bold text-purple-400">35</div>
            <div class="text-sm text-gray-400">Years Experience</div>
          </div>
          <div class="text-center p-4 bg-purple-500/10 rounded-lg">
            <div class="text-2xl font-bold text-purple-400">1000+</div>
            <div class="text-sm text-gray-400">Happy Customers</div>
          </div>
        </div>

        <h2> Our New Brand Vision</h2>
        <p>With the "İsmail Usta" brand, we aim to combine traditional values with modern technology, prioritize customer satisfaction above everything, and become a reliable reference in the sector.</p>

        <h2>🔄 Innovations</h2>
        <p>With our new brand, our product packaging, advertising materials and digital platforms will be renewed. We would like to thank all our employees and business partners who have supported us in this process.</p>
      `,
      category: 'announcement',
      imageUrl: '/images/3.haber.jpeg',
      images: ['/images/3.haber.jpeg', '/images/h.jpeg', '/images/5.jpeg'],
      publishDate: '2026-04-05',
      location: 'Türkiye',
      author: 'Tamis Yönetim Kurulu',
      features: [
        { icon: Award, labelTr: '35 Yıl Tecrübe', labelEn: '35 Years Experience' },
        { icon: Users, labelTr: 'Güvenilir Marka', labelEn: 'Trusted Brand' },
        { icon: Rocket, labelTr: 'Modern Vizyon', labelEn: 'Modern Vision' },
        { icon: Shield, labelTr: 'Kalite Garantisi', labelEn: 'Quality Guarantee' }
      ],
      stats: [
        { value: '35', labelTr: 'Yıl Tecrübe', labelEn: 'Years' },
        { value: '1000+', labelTr: 'Mutlu Müşteri', labelEn: 'Customers' },
        { value: '50+', labelTr: 'Referans', labelEn: 'References' },
        { value: '7/24', labelTr: 'Destek', labelEn: 'Support' }
      ]
    },
    4: {
      id: 4,
      titleTr: 'Doğru Malzeme, Dayanıklı Ürün',
      titleEn: 'Right Material, Durable Product',
      summaryTr: 'Yeni geliştirdiğimiz ürün serimiz satışa hazır. Yüksek kalite, uzun ömür ve garantili performans.',
      summaryEn: 'Our newly developed product series is ready for sale. High quality, long life and guaranteed performance.',
      contentTr: `
        <div class="bg-gradient-to-r from-blue-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-blue-500">
          <p class="text-lg font-semibold text-blue-400 mb-2">🆕 Ürün Lansmanı</p>
          <p class="text-gray-300">Ar-Ge ekibimizin uzun süredir üzerinde çalıştığı yeni ürün serimiz satışa hazır hale geldi. "Doğru Malzeme, Dayanıklı Ürün" felsefesiyle geliştirilen bu ürünler, sektörde yeni bir standart belirleyecek.</p>
        </div>

        <h2> Ürün Özellikleri</h2>
        <p>Yeni ürünlerimiz, yüksek kaliteli hammaddeler kullanılarak üretilmiştir.</p>
        <ul>
          <li><strong> Uzun ömürlü kullanım</strong> - 10 yıl dayanıklılık</li>
          <li><strong> Düşük bakım maliyeti</strong> - %30 daha az bakım</li>
          <li><strong> Yüksek performans</strong> - Verimlilikte zirve</li>
        </ul>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">10</div>
            <div class="text-sm text-gray-400">Yıl Garanti</div>
          </div>
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">100%</div>
            <div class="text-sm text-gray-400">Yerli Üretim</div>
          </div>
        </div>

        <h2> Teknik Detaylar</h2>
        <p>Ürünlerimiz, uluslararası kalite standartlarına uygun olarak tasarlanmış ve test edilmiştir. Tüm ürünlerimiz 5 yıl garantilidir.</p>

        <h2>📍 Satış Noktaları</h2>
        <p>Yeni ürünlerimiz, tüm bayilerimizde ve online mağazamızda satışa sunulmuştur. Detaylı bilgi için müşteri hizmetlerimizi arayabilirsiniz.</p>
      `,
      contentEn: `
        <div class="bg-gradient-to-r from-blue-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-blue-500">
          <p class="text-lg font-semibold text-blue-400 mb-2">🆕 Product Launch</p>
          <p class="text-gray-300">Our new product series, which our R&D team has been working on for a long time, is now ready for sale. Developed with the philosophy of "Right Material, Durable Product", these products will set a new standard in the sector.</p>
        </div>

        <h2> Product Features</h2>
        <p>Our new products are manufactured using high quality raw materials.</p>
        <ul>
          <li><strong> Long-lasting use</strong> - 10 years durability</li>
          <li><strong> Low maintenance cost</strong> - 30% less maintenance</li>
          <li><strong> High performance</strong> - Peak efficiency</li>
        </ul>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">10</div>
            <div class="text-sm text-gray-400">Years Warranty</div>
          </div>
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">100%</div>
            <div class="text-sm text-gray-400">Domestic</div>
          </div>
        </div>

        <h2> Technical Details</h2>
        <p>Our products are designed and tested in accordance with international quality standards. All our products come with a 5-year warranty.</p>

        <h2>📍 Sales Points</h2>
        <p>Our new products are available at all our dealers and our online store. You can call our customer service for detailed information.</p>
      `,
      category: 'press',
      imageUrl: '/images/4.haber.jpeg',
      images: ['/images/4.haber.jpeg', '/images/h.jpeg', '/images/2.jpeg'],
      publishDate: '2024-02-28',
      location: 'Türkiye',
      author: 'Tamis Ar-Ge Ekibi',
      features: [
        { icon: Shield, labelTr: '5 Yıl Garanti', labelEn: '5 Year Warranty' },
        { icon: Award, labelTr: 'ISO Sertifikalı', labelEn: 'ISO Certified' },
        { icon: TrendingUp, labelTr: 'Yüksek Performans', labelEn: 'High Performance' },
        { icon: Users, labelTr: '7/24 Destek', labelEn: '7/24 Support' }
      ],
      stats: [
        { value: '10', labelTr: 'Yıl Garanti', labelEn: 'Years' },
        { value: '100%', labelTr: 'Yerli', labelEn: 'Domestic' },
        { value: '24/7', labelTr: 'Destek', labelEn: 'Support' },
        { value: '50+', labelTr: 'Bayi', labelEn: 'Dealers' }
      ]
    },
    5: {
      id: 5,
      titleTr: '%100 Yerli Üretim Başarısı',
      titleEn: '100% Domestic Production Success',
      summaryTr: 'Tamamen yerli üretimle kalite standartlarını en üst seviyeye çıkardık.',
      summaryEn: 'We have maximized quality standards with completely domestic production.',
      contentTr: `
        <div class="bg-gradient-to-r from-green-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-green-500">
          <p class="text-lg font-semibold text-green-400 mb-2"> Yerli Üretim Başarısı</p>
          <p class="text-gray-300">Tamamen yerli üretim hedefimiz doğrultusunda önemli bir başarıya imza attık. Ürünlerimizin tamamını Türkiye'de üreterek, kalite standartlarını en üst seviyeye çıkardık.</p>
        </div>

        <h2>🇹🇷 Yerli Üretimin Avantajları</h2>
        <ul>
          <li><strong> Daha hızlı teslimat</strong> - Stoktan hemen sevkiyat</li>
          <li><strong> Daha uygun fiyat</strong> - Aracısız, doğrudan satış</li>
          <li><strong> Daha iyi satış sonrası destek</strong> - Yerinde teknik servis</li>
        </ul>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-green-500/10 rounded-lg">
            <div class="text-2xl font-bold text-green-400">2500</div>
            <div class="text-sm text-gray-400">m² Üretim</div>
          </div>
          <div class="text-center p-4 bg-green-500/10 rounded-lg">
            <div class="text-2xl font-bold text-green-400">5</div>
            <div class="text-sm text-gray-400">İhracat Ülkesi</div>
          </div>
        </div>

        <h2> Üretim Tesisi</h2>
        <p>2.500 m² kapalı alanda, son teknoloji makinelerle üretim yapmaktayız. Tüm üretim süreçlerimiz, kalite kontrol ekibimiz tarafından titizlikle denetlenmektedir.</p>

        <h2>🌍 İhracat Hedefleri</h2>
        <p>Yerli ürünlerimizi uluslararası pazarlara taşımayı hedefliyoruz. Şu anda 5 farklı ülkeye ihracat yapmaktayız ve bu sayıyı 2025 sonuna kadar 15'e çıkarmayı planlıyoruz.</p>
      `,
      contentEn: `
        <div class="bg-gradient-to-r from-green-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-green-500">
          <p class="text-lg font-semibold text-green-400 mb-2"> Domestic Production Success</p>
          <p class="text-gray-300">We have achieved an important success in line with our goal of full domestic production. By manufacturing all of our products in Turkey, we have maximized quality standards.</p>
        </div>

        <h2>🇹🇷 Advantages of Domestic Production</h2>
        <ul>
          <li><strong> Faster delivery</strong> - Immediate shipment</li>
          <li><strong> More affordable price</strong> - Direct sales</li>
          <li><strong> Better after-sales support</strong> - On-site service</li>
        </ul>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-green-500/10 rounded-lg">
            <div class="text-2xl font-bold text-green-400">2500</div>
            <div class="text-sm text-gray-400">m² Production</div>
          </div>
          <div class="text-center p-4 bg-green-500/10 rounded-lg">
            <div class="text-2xl font-bold text-green-400">5</div>
            <div class="text-sm text-gray-400">Export Countries</div>
          </div>
        </div>

        <h2> Production Facility</h2>
        <p>We manufacture with state-of-the-art machinery in a 2,500 m² closed area. All our production processes are meticulously inspected by our quality control team.</p>

        <h2>🌍 Export Targets</h2>
        <p>We aim to carry our domestic products to international markets. We are currently exporting to 5 different countries and plan to increase this number to 15 by the end of 2025.</p>
      `,
      category: 'news',
      imageUrl: '/images/5.jpeg',
      images: ['/images/5.jpeg', '/images/h.jpeg', '/images/4.haber.jpeg'],
      publishDate: '2024-02-20',
      location: 'Türkiye',
      author: 'Tamis Üretim Müdürlüğü',
      features: [
        { icon: Award, labelTr: 'Yerli Üretim', labelEn: 'Domestic Production' },
        { icon: Shield, labelTr: 'Kalite Belgesi', labelEn: 'Quality Certificate' },
        { icon: Globe, labelTr: 'İhracat Başarısı', labelEn: 'Export Success' },
        { icon: Users, labelTr: 'Uzman Kadro', labelEn: 'Expert Staff' }
      ],
      stats: [
        { value: '100%', labelTr: 'Yerli', labelEn: 'Domestic' },
        { value: '5', labelTr: 'Ülke', labelEn: 'Countries' },
        { value: '2500', labelTr: 'm²', labelEn: 'm²' },
        { value: '7/24', labelTr: 'Üretim', labelEn: 'Production' }
      ]
    },
    6: {
      id: 6,
      titleTr: 'Yeni İş Ortaklıkları ile Küresel Büyüme',
      titleEn: 'Global Growth with New Business Partnerships',
      summaryTr: 'Uluslararası pazarlarda büyüme hedefimiz doğrultusunda önemli iş ortaklıklarına imza attık.',
      summaryEn: 'We have signed important business partnerships in line with our goal of growth in international markets.',
      contentTr: `
        <div class="bg-gradient-to-r from-purple-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-purple-500">
          <p class="text-lg font-semibold text-purple-400 mb-2">🌍 Küresel Genişleme</p>
          <p class="text-gray-300"><strong>Tamis</strong> olarak, uluslararası pazarlarda büyüme hedefimiz doğrultusunda önemli iş ortaklıklarına imza attık. Artık ürünlerimiz dünyanın birçok noktasında müşterilerle buluşmanın gururunu yaşıyor.</p>
        </div>

        <h2>🤝 Yeni Ortaklıklar</h2>
        <p>Avrupa, Ortadoğu ve Afrika bölgelerinde stratejik distribütörlerle anlaşmalar imzaladık. Bu ortaklıklar sayesinde:</p>
        <ul>
          <li><strong>🇩🇪 Almanya, Fransa ve İtalya</strong>'da yeni satış ofisleri açıldı</li>
          <li><strong>🇦🇪 BAE ve Suudi Arabistan</strong>'da yetkili distribütörlük anlaşmaları yapıldı</li>
          <li><strong>🇿🇦 Güney Afrika ve Mısır</strong>'da lojistik merkezleri kuruldu</li>
        </ul>
        <p>Bu gelişmelerle birlikte, ürünlerimiz artık <strong>25'ten fazla ülkede</strong> müşterilerle buluşuyor.</p>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-purple-500/10 rounded-lg">
            <div class="text-2xl font-bold text-purple-400">25+</div>
            <div class="text-sm text-gray-400">Ülke</div>
          </div>
          <div class="text-center p-4 bg-purple-500/10 rounded-lg">
            <div class="text-2xl font-bold text-purple-400">3</div>
            <div class="text-sm text-gray-400">Kıta</div>
          </div>
        </div>

        <h2>✅ Uluslararası Standartlar</h2>
        <p>Ürünlerimiz, tüm uluslararası kalite ve güvenlik standartlarına uygun olarak üretilmektedir. Sahip olduğumuz belgeler:</p>
        <ul>
          <li> <strong>ISO 9001:2024</strong> Kalite Yönetim Sistemi</li>
          <li> <strong>CE Belgesi</strong> - Avrupa standardizasyonu</li>
          <li> <strong>ISO 14001</strong> Çevre Yönetim Sistemi</li>
          <li> <strong>ISO 45001</strong> İş Sağlığı ve Güvenliği</li>
        </ul>

        <div class="bg-gradient-to-r from-green-500/10 to-transparent p-6 rounded-xl my-6 border-l-4 border-green-500">
          <p class="text-lg font-semibold text-green-400 mb-2"> Hedefimiz</p>
          <p class="text-gray-300">Küresel ölçekte tanınan bir marka olmak ve Türk mühendisliğini dünyaya tanıtmak.</p>
        </div>

        <h2> Gelecek Planları</h2>
        <p>Önümüzdeki dönemde, Asya ve Amerika pazarlarına açılmayı hedefliyoruz. Bu hedef doğrultusunda gerekli hazırlıklar devam etmektedir. 2025 yılı sonuna kadar ihracat yaptığımız ülke sayısını 40'a çıkarmayı planlıyoruz.</p>
      `,
      contentEn: `
        <div class="bg-gradient-to-r from-purple-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-purple-500">
          <p class="text-lg font-semibold text-purple-400 mb-2">🌍 Global Expansion</p>
          <p class="text-gray-300">As <strong>Tamis</strong>, we have signed important business partnerships in line with our goal of growth in international markets. Now our products meet customers in many parts of the world.</p>
        </div>

        <h2>🤝 New Partnerships</h2>
        <p>We have signed agreements with strategic distributors in Europe, the Middle East and Africa. Thanks to these partnerships:</p>
        <ul>
          <li>New sales offices opened in <strong>🇩🇪 Germany, France and Italy</strong></li>
          <li>Authorized distributor agreements made in <strong>🇦🇪 UAE and Saudi Arabia</strong></li>
          <li>Logistics centers established in <strong>🇿🇦 South Africa and Egypt</strong></li>
        </ul>
        <p>With these developments, our products now meet customers in <strong>more than 25 countries</strong>.</p>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-purple-500/10 rounded-lg">
            <div class="text-2xl font-bold text-purple-400">25+</div>
            <div class="text-sm text-gray-400">Countries</div>
          </div>
          <div class="text-center p-4 bg-purple-500/10 rounded-lg">
            <div class="text-2xl font-bold text-purple-400">3</div>
            <div class="text-sm text-gray-400">Continents</div>
          </div>
        </div>

        <h2>✅ International Standards</h2>
        <p>Our products are manufactured in compliance with all international quality and safety standards. Our certificates:</p>
        <ul>
          <li> <strong>ISO 9001:2024</strong> Quality Management System</li>
          <li> <strong>CE Certificate</strong> - European standardization</li>
          <li> <strong>ISO 14001</strong> Environmental Management System</li>
          <li> <strong>ISO 45001</strong> Occupational Health and Safety</li>
        </ul>

        <div class="bg-gradient-to-r from-green-500/10 to-transparent p-6 rounded-xl my-6 border-l-4 border-green-500">
          <p class="text-lg font-semibold text-green-400 mb-2"> Our Goal</p>
          <p class="text-gray-300">To become a globally recognized brand and introduce Turkish engineering to the world.</p>
        </div>

        <h2> Future Plans</h2>
        <p>In the coming period, we aim to expand into Asian and American markets. Necessary preparations are continuing in line with this goal. We plan to increase the number of countries we export to 40 by the end of 2025.</p>
      `,
      category: 'announcement',
      imageUrl: '/images/ortak3.jpeg',
      images: ['/images/ortak1.jpeg', '/images/ortak2.jpeg', '/images/ortak3.jpeg'],
      publishDate: '2024-02-15',
      location: 'Uluslararası',
      author: 'Tamis Dış Ticaret Müdürlüğü',
      features: [
        { icon: Globe, labelTr: 'Küresel Pazarlar', labelEn: 'Global Markets' },
        { icon: Handshake, labelTr: 'Stratejik Ortaklıklar', labelEn: 'Strategic Partnerships' },
        { icon: Award, labelTr: 'Uluslararası Sertifikalar', labelEn: 'International Certificates' },
        { icon: Rocket, labelTr: 'Büyüme Hedefi', labelEn: 'Growth Target' }
      ],
      stats: [
        { value: '25+', labelTr: 'Ülke', labelEn: 'Countries' },
        { value: '3', labelTr: 'Kıta', labelEn: 'Continents' },
        { value: '15+', labelTr: 'Distribütör', labelEn: 'Distributors' },
        { value: '7/24', labelTr: 'Küresel Destek', labelEn: 'Global Support' }
      ]
    }
  }

  useEffect(() => {
    setTimeout(() => {
      const newsDetail = mockNewsDetails[id]
      if (newsDetail) {
        setNews(newsDetail)
        setCurrentImageIndex(0)
      }
      setLoading(false)
    }, 300)
  }, [id])

  const openModal = (image, index) => {
    setSelectedImage(image)
    setCurrentImageIndex(index !== undefined ? index : 0)
    setShowModal(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setShowModal(false)
    document.body.style.overflow = 'auto'
  }

  const nextImage = () => {
    if (news && news.images) {
      const newIndex = (currentImageIndex + 1) % news.images.length
      setCurrentImageIndex(newIndex)
      setSelectedImage(news.images[newIndex])
    }
  }

  const prevImage = () => {
    if (news && news.images) {
      const newIndex = (currentImageIndex - 1 + news.images.length) % news.images.length
      setCurrentImageIndex(newIndex)
      setSelectedImage(news.images[newIndex])
    }
  }

  const shareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: i18n.language === 'tr' ? news.titleTr : news.titleEn,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert(i18n.language === 'tr' ? 'Link kopyalandı!' : 'Link copied!')
    }
  }

  const printContent = () => {
    window.print()
  }

  // Klavye ile fotoğraf değiştirme
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showModal) {
        if (e.key === 'ArrowLeft') {
          prevImage()
        } else if (e.key === 'ArrowRight') {
          nextImage()
        } else if (e.key === 'Escape') {
          closeModal()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showModal, currentImageIndex, news])

  // Galeri kaydırma fonksiyonu
  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {i18n.language === 'tr' ? 'Haber bulunamadı' : 'News not found'}
          </h2>
          <Link to="/news" className="text-green-500 hover:text-green-400">
            {i18n.language === 'tr' ? 'Haberler sayfasına dön' : 'Back to news page'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{i18n.language === 'tr' ? news.titleTr : news.titleEn} | Tamis</title>
        <meta name="description" content={i18n.language === 'tr' ? news.summaryTr : news.summaryEn} />
      </Helmet>

      {/* Hero Bölümü */}
      <div className="relative pt-20 bg-gradient-to-r from-navy-900 to-navy-800">
        <div className="container-custom py-12">
          <Link 
            to="/news" 
            className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {i18n.language === 'tr' ? 'Tüm Haberler' : 'All News'}
          </Link>
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full">
                {getCategoryLabel(news.category)}
              </span>
              <div className="flex items-center text-gray-400 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(news.publishDate).toLocaleDateString(i18n.language === 'tr' ? 'tr-TR' : 'en-US')}
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {i18n.language === 'tr' ? news.titleTr : news.titleEn}
            </h1>
            <p className="text-gray-300 text-lg">
              {i18n.language === 'tr' ? news.summaryTr : news.summaryEn}
            </p>
          </div>
        </div>
      </div>

      {/* İçerik Bölümü */}
      <div className="bg-navy-950 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Ana İçerik */}
            <div className="lg:col-span-2">
              {/* Ana Görsel */}
              <div className="mb-8 rounded-xl overflow-hidden bg-navy-800">
                <img 
                  src={news.imageUrl} 
                  alt={i18n.language === 'tr' ? news.titleTr : news.titleEn}
                  className="w-full h-auto object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                  onClick={() => openModal(news.imageUrl, 0)}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/800x500?text=Gorsel+Yok'
                  }}
                />
              </div>

              {/* Galeri - Yatay Kaydırmalı */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">
                    {i18n.language === 'tr' ? 'Galeri' : 'Gallery'}
                  </h3>
                  {news.images.length > 3 && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => scrollGallery('left')}
                        className="p-2 bg-navy-800 hover:bg-navy-700 rounded-lg transition-colors text-white"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => scrollGallery('right')}
                        className="p-2 bg-navy-800 hover:bg-navy-700 rounded-lg transition-colors text-white"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
                
                <div 
                  ref={galleryRef}
                  className="flex gap-3 overflow-x-auto scroll-smooth pb-2"
                  style={{ scrollbarWidth: 'thin', msOverflowStyle: 'auto' }}
                >
                  {news.images.map((img, index) => (
                    <div 
                      key={index}
                      className="relative flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden cursor-pointer group bg-navy-800"
                      onClick={() => openModal(img, index)}
                    >
                      <img 
                        src={img} 
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = 'https://via.placeholder.com/160x160?text=Foto'
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Haber İçeriği */}
              <div 
                className="prose prose-invert prose-lg max-w-none
                  [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
                  [&_h2]:text-green-400
                  [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3
                  [&_h3]:text-white
                  [&_p]:text-gray-300 [&_p]:mb-4 [&_p]:leading-relaxed
                  [&_ul]:text-gray-300 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6
                  [&_li]:mb-2
                  [&_strong]:text-green-400
                "
                dangerouslySetInnerHTML={{ __html: i18n.language === 'tr' ? news.contentTr : news.contentEn }}
              />

              {/* Özellikler Tablosu */}
              {news.features && (
                <div className="mt-8 p-6 bg-navy-800/50 rounded-xl border border-navy-700">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {i18n.language === 'tr' ? 'Öne Çıkan Özellikler' : 'Key Features'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {news.features.map((feature, index) => {
                      const Icon = feature.icon
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-green-500" />
                          <span className="text-gray-300">
                            {i18n.language === 'tr' ? feature.labelTr : feature.labelEn}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* İstatistikler */}
              {news.stats && (
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {news.stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-navy-800/30 rounded-lg border border-navy-700/50">
                      <div className="text-3xl font-bold text-green-500">{stat.value}</div>
                      <div className="text-sm text-gray-400 mt-1">
                        {i18n.language === 'tr' ? stat.labelTr : stat.labelEn}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-navy-800/50 rounded-xl border border-navy-700 p-6 mb-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  {i18n.language === 'tr' ? 'Haber Bilgileri' : 'News Info'}
                </h3>
                <div className="space-y-3">
                  {news.location && (
                    <div className="flex items-start gap-3">
                      <Tag className="w-4 h-4 text-green-500 mt-1" />
                      <div>
                        <div className="text-xs text-gray-500">
                          {i18n.language === 'tr' ? 'Konum' : 'Location'}
                        </div>
                        <div className="text-white text-sm">{news.location}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-green-500 mt-1" />
                    <div>
                      <div className="text-xs text-gray-500">
                        {i18n.language === 'tr' ? 'Yayın Tarihi' : 'Publish Date'}
                      </div>
                      <div className="text-white text-sm">
                        {new Date(news.publishDate).toLocaleDateString(i18n.language === 'tr' ? 'tr-TR' : 'en-US')}
                      </div>
                    </div>
                  </div>
                  {news.author && (
                    <div className="flex items-start gap-3">
                      <Users className="w-4 h-4 text-green-500 mt-1" />
                      <div>
                        <div className="text-xs text-gray-500">
                          {i18n.language === 'tr' ? 'Yazar' : 'Author'}
                        </div>
                        <div className="text-white text-sm">{news.author}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-navy-800/50 rounded-xl border border-navy-700 p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  {i18n.language === 'tr' ? 'Paylaş' : 'Share'}
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={shareContent}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-navy-700 hover:bg-navy-600 rounded-lg transition-colors text-white"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Paylaş</span>
                  </button>
                  <button
                    onClick={printContent}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-navy-700 hover:bg-navy-600 rounded-lg transition-colors text-white"
                  >
                    <Printer className="w-4 h-4" />
                    <span className="text-sm">Yazdır</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center text-gray-500 text-xs">
                {i18n.language === 'tr' 
                  ? '© 2026 Tamis. Tüm hakları saklıdır.' 
                  : '© 2026 Tamis. All rights reserved.'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Büyük Görsel Gösterimi */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Kapatma butonu */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Toplam fotoğraf sayısı göstergesi */}
          <div className="absolute top-4 left-4 text-white bg-black/50 px-3 py-1 rounded-full text-sm z-10">
            {currentImageIndex + 1} / {news.images.length}
          </div>

          {/* Sol ok butonu */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-green-400 transition-colors bg-black/50 hover:bg-black/70 p-3 rounded-full z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Fotoğraf */}
          <img 
            src={selectedImage} 
            alt="Large view"
            className="max-w-full max-h-[90vh] object-contain cursor-pointer"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = 'https://via.placeholder.com/800x600?text=Gorsel+Yuklenemedi'
            }}
          />

          {/* Sağ ok butonu */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-green-400 transition-colors bg-black/50 hover:bg-black/70 p-3 rounded-full z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </>
  )
}

export default NewsDetail