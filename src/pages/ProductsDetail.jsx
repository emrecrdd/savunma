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
  Settings,
  Shield,
  Battery,
  Zap,
  Droplet,
  Gauge,
  Target,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const ProductsDetail = () => {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const galleryRef = useRef(null)

  // Ürün detayları - 20'ye kadar fotoğraflı
  const mockProductsDetails = {
    1: {
      id: 1,
      titleTr: 'Kollu Kesici Parçaları',
      titleEn: 'Lever Cutter Parts',
      shortDescTr: 'Mermer doğal taş ocaklarında kullanılan kollu kesici makine ekipmanları.',
      shortDescEn: 'Lever cutter machine equipment used in marble natural stone quarries.',
      descriptionTr: `
        <div class="bg-gradient-to-r from-blue-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-blue-500">
          <p class="text-lg font-semibold text-blue-400 mb-2"> Yüksek Dayanımlı Kesici Parçalar</p>
          <p class="text-gray-300">Kollu kesici parçalarımız, mermer ocaklarının zorlu koşullarında üstün performans göstermek üzere özel olarak tasarlanmıştır. Yüksek kaliteli malzemelerden üretilen bu parçalar, uzun ömürlü kullanım ve düşük bakım maliyeti sunar.</p>
        </div>

        <h2> Teknik Özellikler</h2>
        <ul>
          <li><strong> Malzeme:</strong> Yüksek karbonlu çelik / Sert metal alaşım</li>
          <li><strong> Hassasiyet:</strong> ±0.01 mm tolerans</li>
          <li><strong> Isıl İşlem:</strong> 58-62 HRC sertlik</li>
          <li><strong> Dayanıklılık:</strong> 10.000+ saat kullanım ömrü</li>
        </ul>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">58-62</div>
            <div class="text-sm text-gray-400">HRC Sertlik</div>
          </div>
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">10.000+</div>
            <div class="text-sm text-gray-400">Saat Kullanım</div>
          </div>
        </div>

        <h2> Kullanım Alanları</h2>
        <ul>
          <li>Mermer ve doğal taş ocakları</li>
          <li>Blok kesme makineleri</li>
          <li>Kollu kesici sistemler</li>
          <li>Endüstriyel taş işleme tesisleri</li>
        </ul>

        <h2> Avantajlarımız</h2>
        <ul>
          <li>Yüksek aşınma direnci</li>
          <li>Düşük sürtünme katsayısı</li>
          <li>Kolay montaj ve demontaj</li>
          <li>Özel sipariş imkanı</li>
        </ul>

        <div class="bg-gradient-to-r from-blue-500/10 to-transparent p-6 rounded-xl my-6 border-l-4 border-blue-500">
          <p class="text-lg font-semibold text-blue-400 mb-2"> Kalite Garantisi</p>
          <p class="text-gray-300">Tüm ürünlerimiz ISO 9001:2024 kalite standartlarına uygun olarak üretilmekte ve %100 kalite kontrol testlerinden geçmektedir.</p>
        </div>
      `,
      descriptionEn: `
        <div class="bg-gradient-to-r from-blue-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-blue-500">
          <p class="text-lg font-semibold text-blue-400 mb-2"> High Durability Cutter Parts</p>
          <p class="text-gray-300">Our lever cutter parts are specially designed to perform excellently in the challenging conditions of marble quarries. Manufactured from high quality materials, these parts offer long-lasting use and low maintenance cost.</p>
        </div>

        <h2> Technical Specifications</h2>
        <ul>
          <li><strong> Material:</strong> High carbon steel / Hard metal alloy</li>
          <li><strong> Precision:</strong> ±0.01 mm tolerance</li>
          <li><strong> Heat Treatment:</strong> 58-62 HRC hardness</li>
          <li><strong> Durability:</strong> 10,000+ hours operating life</li>
        </ul>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">58-62</div>
            <div class="text-sm text-gray-400">HRC Hardness</div>
          </div>
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">10.000+</div>
            <div class="text-sm text-gray-400">Hours Use</div>
          </div>
        </div>

        <h2> Application Areas</h2>
        <ul>
          <li>Marble and natural stone quarries</li>
          <li>Block cutting machines</li>
          <li>Lever cutter systems</li>
          <li>Industrial stone processing facilities</li>
        </ul>

        <h2> Our Advantages</h2>
        <ul>
          <li>High wear resistance</li>
          <li>Low friction coefficient</li>
          <li>Easy assembly and disassembly</li>
          <li>Custom order option</li>
        </ul>

        <div class="bg-gradient-to-r from-blue-500/10 to-transparent p-6 rounded-xl my-6 border-l-4 border-blue-500">
          <p class="text-lg font-semibold text-blue-400 mb-2"> Quality Guarantee</p>
          <p class="text-gray-300">All our products are manufactured in accordance with ISO 9001:2024 quality standards and undergo 100% quality control tests.</p>
        </div>
      `,
      category: 'lever',
      imageUrl:  '/Kollukesiciürünler/17.jpeg',
      images: [
        '/Kollukesiciürünler/1.jpeg',
        '/Kollukesiciürünler/2.jpeg',
        '/Kollukesiciürünler/3.jpeg',
        '/Kollukesiciürünler/4.jpeg',
        '/Kollukesiciürünler/5.jpeg',
        '/Kollukesiciürünler/6.jpeg',
        '/Kollukesiciürünler/7.jpeg',
        '/Kollukesiciürünler/8.jpeg',
        '/Kollukesiciürünler/9.jpeg',
        '/Kollukesiciürünler/10.jpeg',
        '/Kollukesiciürünler/11.jpeg',
        '/Kollukesiciürünler/12.jpeg',
        '/Kollukesiciürünler/13.jpeg',
        '/Kollukesiciürünler/14.jpeg',
        '/Kollukesiciürünler/15.jpeg',
        '/Kollukesiciürünler/16.jpeg',
        '/Kollukesiciürünler/17.jpeg',
        '/Kollukesiciürünler/18.jpeg',
        '/Kollukesiciürünler/19.jpeg',
        '/Kollukesiciürünler/20.jpeg',
        '/Kollukesiciürünler/21.jpeg',
        '/Kollukesiciürünler/22.jpeg',
        '/Kollukesiciürünler/23.jpeg',
        '/Kollukesiciürünler/24.jpeg',
        '/Kollukesiciürünler/25.jpeg',
        '/Kollukesiciürünler/26.jpeg',
        '/Kollukesiciürünler/27.jpeg',
        '/Kollukesiciürünler/28.jpeg',
        '/Kollukesiciürünler/29.jpeg',
        '/Kollukesiciürünler/30.jpeg',
        '/Kollukesiciürünler/31.jpeg',
        '/Kollukesiciürünler/32.jpeg',
        '/Kollukesiciürünler/33.jpeg',
        '/Kollukesiciürünler/34.jpeg',
        '/Kollukesiciürünler/35.jpeg',
        '/Kollukesiciürünler/36.jpeg',

        '/Kollukesiciürünler/37.jpeg',
        '/Kollukesiciürünler/38.jpeg',
        '/Kollukesiciürünler/39.jpeg',
        '/Kollukesiciürünler/40.jpeg',

        '/Kollukesiciürünler/41.jpeg',
        '/Kollukesiciürünler/42.jpeg',
        '/Kollukesiciürünler/43.jpeg',
      ],
      pdf: '/catalogs/hhh.pdf',
      
      stats: [
        { value: '58-62', labelTr: 'HRC Sertlik', labelEn: 'HRC Hardness' },
        { value: '10.000+', labelTr: 'Saat Ömür', labelEn: 'Hours Life' },
        { value: '7/24', labelTr: 'Teknik Destek', labelEn: 'Support' },
        { value: '100%', labelTr: 'Kalite Kontrol', labelEn: 'Quality Control' }
      ]
    },
    2: {
      id: 2,
      titleTr: 'Elmas Kesici Takımlar',
      titleEn: 'Diamond Cutting Tools',
      shortDescTr: 'Endüstriyel elmas teknolojisi ile üretilen yüksek dayanımlı kesici takımlar.',
      shortDescEn: 'High durability cutting tools produced with industrial diamond technology.',
      descriptionTr: `
        <div class="bg-gradient-to-r from-blue-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-blue-500">
          <p class="text-lg font-semibold text-blue-400 mb-2"> Endüstriyel Elmas Teknolojisi</p>
          <p class="text-gray-300">Elmas kesici takımlarımız, en zorlu taş işleme uygulamalarında üstün performans sağlamak üzere geliştirilmiştir. Yüksek kaliteli endüstriyel elmaslar ve özel bağlama teknolojisi ile üretilmektedir.</p>
        </div>

        <h2> Teknik Özellikler</h2>
        <ul>
          <li><strong> Elmas Kalitesi:</strong> Endüstriyel sınıf MBS 950</li>         
          <li><strong> Bağlama:</strong> Metal bağlama teknolojisi</li>
          <li><strong> Kesim Hızı:</strong> 80 cm - 120 cm/sa'ye kadar</li>
        </ul>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">120 cm/sa</div>
            <div class="text-sm text-gray-400"> Kesim Hızı</div>
          </div>
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">2x</div>
            <div class="text-sm text-gray-400">Daha Uzun Ömür</div>
          </div>
        </div>

        <h2> Kullanım Alanları</h2>
        <ul>
          <li>Mermer ocakları </li>
          <li>Traverten ocakları </li>
          <li>Doğal taş ocakları</li>
          <li>Beton kesme uygulamaları</li>
        </ul>

        <h2> Avantajlarımız</h2>
        <ul>
          <li>Yüksek kesim hassasiyeti</li>
          <li>Düşük titreşim ve gürültü</li>
          <li>Uzun ömürlü elmas segmentler</li>
          <li>Enerji tasarrufu sağlayan tasarım</li>
        </ul>
      `,
      descriptionEn: `
        <div class="bg-gradient-to-r from-blue-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-blue-500">
          <p class="text-lg font-semibold text-blue-400 mb-2"> Industrial Diamond Technology</p>
          <p class="text-gray-300">Our diamond cutting tools have been developed to provide superior performance in the most demanding stone processing applications. They are manufactured with high quality industrial diamonds and special bonding technology.</p>
        </div>

        <h2> Technical Specifications</h2>
        <ul>
          <li><strong> Diamond Quality:</strong> Industrial grade MBS 950</li>
          <li><strong> Grain Size:</strong> 30/40 - 40/50 mesh</li>
          <li><strong> Bonding:</strong> Metal bonding technology</li>
          <li><strong> Cutting Speed:</strong> Up to 80 m/s</li>
        </ul>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">80</div>
            <div class="text-sm text-gray-400">m/s Cutting Speed</div>
          </div>
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">5x</div>
            <div class="text-sm text-gray-400">Longer Life</div>
          </div>
        </div>

        <h2> Application Areas</h2>
        <ul>
          <li>Marble cutting and shaping</li>
          <li>Granite processing</li>
          <li>Natural stone quarries</li>
          <li>Concrete cutting applications</li>
        </ul>

        <h2> Our Advantages</h2>
        <ul>
          <li>High cutting precision</li>
          <li>Low vibration and noise</li>
          <li>Long-life diamond segments</li>
          <li>Energy saving design</li>
        </ul>
      `,
      category: 'diamond',
      imageUrl:  '/Elmaskesiciler/4.jpeg',
      images: [
        '/Elmaskesiciler/1.jpeg',
        '/Elmaskesiciler/2.jpeg',
        '/Elmaskesiciler/3.jpeg',
        '/Elmaskesiciler/4.jpeg',
        '/Elmaskesiciler/5.jpeg',
        '/Elmaskesiciler/6.jpeg',
       
      ],
      pdf: '/catalogs/q.pdf',
     
      stats: [
        { value: '120 ', labelTr: 'cm/sa Hız', labelEn: 'm/s Speed' },
        { value: '2x', labelTr: 'Uzun Ömür', labelEn: 'Longer Life' },
        { value: '7/24', labelTr: 'Teknik Destek', labelEn: 'Support' },
        { value: '100%', labelTr: 'Elmas Kalite', labelEn: 'Diamond Quality' }
      ]
    },
    3: {
      id: 3,
      titleTr: 'Yağlama Sistemleri',
      titleEn: 'Hydraulic Systems',
      shortDescTr: 'Makine performansını artırıcı ve aşınma önleyici yağlama ekipmanları.',
      shortDescEn: 'Lubrication equipment that increases machine performance and prevents wear.',
      descriptionTr: `
        <div class="bg-gradient-to-r from-blue-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-blue-500">
          <p class="text-lg font-semibold text-blue-400 mb-2"> Uzun Ömürlü Yağlama Sistemleri</p>
          <p class="text-gray-300">Yağlama sistemlerimiz, makinelerinizin ömrünü uzatmak ve verimliliğini artırmak için tasarlanmıştır. Otomatik yağlama özelliği ile bakım maliyetlerini düşürür.</p>
        </div>

        <h2> Teknik Özellikler</h2>
        <ul>
          <li><strong> Yağlama Tipi:</strong> Otomatik / Merkezi Sistem</li>
          <li><strong> Pompa Debisi:</strong> 0.5-50 L/dk</li>
          <li><strong> Çalışma Sıcaklığı:</strong> -20°C ile +80°C</li>
        </ul>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">500</div>
            <div class="text-sm text-gray-400">Bar Basınç</div>
          </div>
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">%40</div>
            <div class="text-sm text-gray-400">Daha Az Bakım</div>
          </div>
        </div>

        <h2> Kullanım Alanları</h2>
        <ul>
          <li>Mermer kesme makineleri</li>
          <li>Blok kesme sistemleri</li>
       
         
        </ul>

        <h2> Avantajlarımız</h2>
        <ul>
          <li>Otomatik yağlama kontrolü</li>
          <li>Düşük yağ tüketimi</li>
          <li>Kolay kurulum ve bakım</li>
          <li>Uzun sistem ömrü</li>
        </ul>
      `,
      descriptionEn: `
        <div class="bg-gradient-to-r from-blue-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-blue-500">
          <p class="text-lg font-semibold text-blue-400 mb-2"> High Pressure Hydraulic Systems</p>
          <p class="text-gray-300">Our lubrication systems are designed to extend the life of your machines and increase their efficiency. The automatic lubrication feature reduces maintenance costs.</p>
        </div>

        <h2> Technical Specifications</h2>
        <ul>
          <li><strong> Pressure Range:</strong> 50-500 Bar</li>
          <li><strong> Lubrication Type:</strong> Automatic / Central System</li>
          <li><strong> Pump Flow:</strong> 0.5-50 L/min</li>
          <li><strong> Operating Temperature:</strong> -20°C to +80°C</li>
        </ul>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">500</div>
            <div class="text-sm text-gray-400">Bar Pressure</div>
          </div>
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">%40</div>
            <div class="text-sm text-gray-400">Less Maintenance</div>
          </div>
        </div>

        <h2> Application Areas</h2>
        <ul>
          <li>Marble cutting machines</li>
          <li>Block cutting systems</li>
          <li>CNC machining centers</li>
          <li>Heavy industrial machines</li>
        </ul>

        <h2> Our Advantages</h2>
        <ul>
          <li>Automatic lubrication control</li>
          <li>Low oil consumption</li>
          <li>Easy installation and maintenance</li>
          <li>Long system life</li>
        </ul>
      `,
      category: 'hydraulic',
      imageUrl: '/Yaglamasistemleri/1.jpeg',
           
      images: [
       '/Yaglamasistemleri/1.jpeg',
        '/Yaglamasistemleri/2.jpeg',
           '/Yaglamasistemleri/3.jpeg',
           '/Yaglamasistemleri/4.jpeg',
            '/Yaglamasistemleri/5.jpeg',
        
      ],
      pdf: '/catalogs/u.pdf',
     
      stats: [
        { value: '500', labelTr: 'Bar Basınç', labelEn: 'Bar Pressure' },
        { value: '%40', labelTr: 'Az Bakım', labelEn: 'Less Maintenance' },
        { value: '7/24', labelTr: 'Otomasyon', labelEn: 'Automation' },
      ]
    },
    4: {
      id: 4,
      titleTr: 'Diğer Ürünler',
      titleEn: 'Special Components',
      shortDescTr: 'Mermer ocaklarında çözüm odaklı özel tasarım ürünler.',
      shortDescEn: 'Special design products focused on solutions in marble quarries.',
      descriptionTr: `
        <div class="bg-gradient-to-r from-blue-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-blue-500">
          <p class="text-lg font-semibold text-blue-400 mb-2"> Özel Tasarım Çözümler</p>
          <p class="text-gray-300">Müşterilerimizin özel ihtiyaçlarına yönelik tasarladığımız özel ürünler, en zorlu koşullarda bile üstün performans sağlar.</p>
        </div>

        <h2> Ürün Yelpazemiz</h2>
        <ul>
          <li><strong> Yedek parçalar:</strong> Tüm marka modeller</li>
          <li><strong> Özel aparatlar:</strong> Siparişe özel tasarım</li>
          <li><strong> Modifikasyon kitleri:</strong> Makine performans artırıcı</li>
          <li><strong> Onarım setleri:</strong> Acil müdahale kitleri</li>
        </ul>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">7/24</div>
            <div class="text-sm text-gray-400">Teknik Destek</div>
          </div>
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">100%</div>
            <div class="text-sm text-gray-400">Müşteri Memnuniyeti</div>
          </div>
        </div>

        <h2> Özelleştirme Seçenekleri</h2>
        <ul>
          <li>Müşteri çizimlerine göre üretim</li>
          <li>Reverse engineering ile kopyalama</li>
          <li>CAD tasarım desteği</li>
          <li>Prototip üretimi</li>
        </ul>

        <h2> Neden Bizi Tercih Etmelisiniz?</h2>
        <ul>
          <li>Hızlı teslimat</li>
          <li>Uygun fiyat politikası</li>
          <li>Kaliteli malzeme kullanımı</li>
          <li>Uzman mühendis kadrosu</li>
        </ul>

        <div class="bg-gradient-to-r from-blue-500/10 to-transparent p-6 rounded-xl my-6 border-l-4 border-blue-500">
          <p class="text-lg font-semibold text-blue-400 mb-2">📞 İhtiyacınıza Özel Çözümler</p>
          <p class="text-gray-300">Standart ürünlerimizin dışında ihtiyacınız olan her türlü özel parça için bizimle iletişime geçebilirsiniz.</p>
        </div>
      `,
      descriptionEn: `
        <div class="bg-gradient-to-r from-blue-500/10 to-transparent p-6 rounded-xl mb-8 border-l-4 border-blue-500">
          <p class="text-lg font-semibold text-blue-400 mb-2"> Custom Design Solutions</p>
          <p class="text-gray-300">Our special products designed for the specific needs of our customers provide superior performance even in the most challenging conditions.</p>
        </div>

        <h2> Our Product Range</h2>
        <ul>
          <li><strong> Spare parts:</strong> All brands and models</li>
          <li><strong> Special apparatus:</strong> Custom design on request</li>
          <li><strong> Modification kits:</strong> Machine performance enhancers</li>
          <li><strong> Repair kits:</strong> Emergency response kits</li>
        </ul>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">7/24</div>
            <div class="text-sm text-gray-400">Technical Support</div>
          </div>
          <div class="text-center p-4 bg-blue-500/10 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">100%</div>
            <div class="text-sm text-gray-400">Satisfaction</div>
          </div>
        </div>

        <h2> Customization Options</h2>
        <ul>
          <li>Production according to customer drawings</li>
          <li>Copying with reverse engineering</li>
          <li>CAD design support</li>
          <li>Prototype production</li>
        </ul>

        <h2> Why Choose Us?</h2>
        <ul>
          <li>Fast delivery</li>
          <li>Competitive pricing</li>
          <li>Quality material use</li>
          <li>Expert engineering team</li>
        </ul>

        <div class="bg-gradient-to-r from-blue-500/10 to-transparent p-6 rounded-xl my-6 border-l-4 border-blue-500">
          <p class="text-lg font-semibold text-blue-400 mb-2">📞 Custom Solutions for Your Needs</p>
          <p class="text-gray-300">For any special parts you need outside of our standard products, please contact us.</p>
        </div>
      `,
      category: 'special',
      imageUrl:         '/Diger/1.jpeg',

      images: [
        '/Diger/1.jpeg',
        '/Diger/2.jpeg',
        '/Diger/3.jpeg',
        '/Diger/4.jpeg',
        '/Diger/5.jpeg',
        '/Diger/6.jpeg',
      ],
      pdf: '/catalogs/o.pdf',
     
      stats: [
        { value: '7/24', labelTr: 'Teknik Destek', labelEn: 'Support' },
        { value: '100%', labelTr: 'Memnuniyet', labelEn: 'Satisfaction' },
        { value: '50+', labelTr: 'Referans', labelEn: 'References' },
      ]
    }
  }

  useEffect(() => {
    setTimeout(() => {
      const productDetail = mockProductsDetails[id]
      if (productDetail) {
        setProduct(productDetail)
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
    if (product && product.images) {
      const newIndex = (currentImageIndex + 1) % product.images.length
      setCurrentImageIndex(newIndex)
      setSelectedImage(product.images[newIndex])
    }
  }

  const prevImage = () => {
    if (product && product.images) {
      const newIndex = (currentImageIndex - 1 + product.images.length) % product.images.length
      setCurrentImageIndex(newIndex)
      setSelectedImage(product.images[newIndex])
    }
  }

  const shareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: i18n.language === 'tr' ? product.titleTr : product.titleEn,
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

  const downloadPDF = () => {
    const link = document.createElement('a')
    link.href = product.pdf
    link.download = `${product.titleTr}_katalog.pdf`
    link.target = '_blank'
    link.click()
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
  }, [showModal, currentImageIndex, product])

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
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {i18n.language === 'tr' ? 'Ürün bulunamadı' : 'Product not found'}
          </h2>
          <Link to="/products" className="text-blue-500 hover:text-blue-400">
            {i18n.language === 'tr' ? 'Ürünler sayfasına dön' : 'Back to products page'}
          </Link>
        </div>
      </div>
    )
  }

  const getCategoryColor = () => {
    switch(product.category) {
      case 'lever': return 'blue'
      case 'diamond': return 'blue'
      case 'hydraulic': return 'blue'
      case 'special': return 'blue'
      default: return 'gray'
    }
  }

  const colorClass = getCategoryColor()

  return (
    <>
      <Helmet>
        <title>{i18n.language === 'tr' ? product.titleTr : product.titleEn} | Tamis</title>
        <meta name="description" content={i18n.language === 'tr' ? product.shortDescTr : product.shortDescEn} />
      </Helmet>

      {/* Hero Bölümü */}
      <div className="relative pt-20 bg-gradient-to-r from-navy-900 to-navy-800">
        <div className="container-custom py-12">
          <Link 
            to="/products" 
            className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {i18n.language === 'tr' ? 'Tüm Ürünler' : 'All Products'}
          </Link>
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className={`bg-${colorClass}-600 text-white text-sm px-3 py-1 rounded-full`}>
                {i18n.language === 'tr' 
                  ? categories.find(c => c.value === product.category)?.labelTr 
                  : categories.find(c => c.value === product.category)?.labelEn}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {i18n.language === 'tr' ? product.titleTr : product.titleEn}
            </h1>
            <p className="text-gray-300 text-lg">
              {i18n.language === 'tr' ? product.shortDescTr : product.shortDescEn}
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
                  src={product.imageUrl} 
                  alt={i18n.language === 'tr' ? product.titleTr : product.titleEn}
                  className="w-full h-auto object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                  onClick={() => openModal(product.imageUrl, 0)}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/800x500?text=Gorsel+Yok'
                  }}
                />
              </div>

              {/* Galeri - Yatay Kaydırmalı */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-bold text-${colorClass}-400`}>
                    {i18n.language === 'tr' ? 'Ürün Galerisi' : 'Product Gallery'}
                  </h3>
                  {product.images.length > 3 && (
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
                  {product.images.map((img, index) => (
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

              {/* Ürün Açıklaması */}
              <div 
                className={`prose prose-invert prose-lg max-w-none
                  [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
                  [&_h2]:text-${colorClass}-400
                  [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3
                  [&_h3]:text-white
                  [&_p]:text-gray-300 [&_p]:mb-4 [&_p]:leading-relaxed
                  [&_ul]:text-gray-300 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6
                  [&_li]:mb-2
                  [&_strong]:text-${colorClass}-400
                `}
                dangerouslySetInnerHTML={{ __html: i18n.language === 'tr' ? product.descriptionTr : product.descriptionEn }}
              />

              {/* Özellikler Tablosu */}
              {product.features && (
                <div className={`mt-8 p-6 bg-${colorClass}-500/10 rounded-xl border border-${colorClass}-500/30`}>
                  <h3 className={`text-xl font-bold mb-4 text-${colorClass}-400`}>
                    {i18n.language === 'tr' ? 'Teknik Özellikler' : 'Technical Features'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => {
                      const Icon = feature.icon
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 text-${colorClass}-500`} />
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
              {product.stats && (
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {product.stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-navy-800/30 rounded-lg border border-navy-700/50">
                      <div className={`text-3xl font-bold text-${colorClass}-500`}>{stat.value}</div>
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
              {/* Bilgi Kartı */}
              <div className={`bg-${colorClass}-500/10 rounded-xl border border-${colorClass}-500/30 p-6 mb-6`}>
                <h3 className={`text-lg font-bold mb-4 text-${colorClass}-400`}>
                  {i18n.language === 'tr' ? 'Ürün Bilgileri' : 'Product Info'}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Tag className={`w-4 h-4 text-${colorClass}-500 mt-1`} />
                    <div>
                      <div className="text-xs text-gray-500">
                        {i18n.language === 'tr' ? 'Kategori' : 'Category'}
                      </div>
                      <div className="text-white text-sm">
                        {i18n.language === 'tr' 
                          ? categories.find(c => c.value === product.category)?.labelTr 
                          : categories.find(c => c.value === product.category)?.labelEn}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className={`w-4 h-4 text-${colorClass}-500 mt-1`} />
                    <div>
                      <div className="text-xs text-gray-500">
                        {i18n.language === 'tr' ? 'Kalite Standardı' : 'Quality Standard'}
                      </div>
                      <div className="text-white text-sm">ISO 9001:2024</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PDF İndir */}
              <div className={`bg-${colorClass}-500/10 rounded-xl border border-${colorClass}-500/30 p-6 mb-6`}>
                <h3 className={`text-lg font-bold mb-4 text-${colorClass}-400`}>
                  {i18n.language === 'tr' ? 'Dökümanlar' : 'Documents'}
                </h3>
                <button
                  onClick={downloadPDF}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-navy-700 hover:bg-navy-600 rounded-lg transition-colors text-white"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm">{t('products.technicalPdf')}</span>
                </button>
              </div>

              {/* Paylaş Butonları */}
              <div className={`bg-${colorClass}-500/10 rounded-xl border border-${colorClass}-500/30 p-6`}>
                <h3 className={`text-lg font-bold mb-4 text-${colorClass}-400`}>
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
            {currentImageIndex + 1} / {product.images.length}
          </div>

          {/* Sol ok butonu */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-400 transition-colors bg-black/50 hover:bg-black/70 p-3 rounded-full z-10"
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
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-400 transition-colors bg-black/50 hover:bg-black/70 p-3 rounded-full z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </>
  )
}

const categories = [
  { value: 'lever', labelTr: 'Kollu Kesici Parçaları', labelEn: 'Lever Cutter Parts' },
  { value: 'diamond', labelTr: 'Elmas Kesici Takımlar', labelEn: 'Diamond Cutting Tools' },
  { value: 'hydraulic', labelTr: 'Yağlama Sistemleri', labelEn: 'Hydraulic Systems' },
  { value: 'special', labelTr: 'Diğer Ürünler', labelEn: 'Special Components' }
]

export default ProductsDetail