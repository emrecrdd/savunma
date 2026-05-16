import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const savedLang = localStorage.getItem('lang') || 'tr'

const resources = {
  tr: {
    translation: {
      nav: {
        home: 'Ana Sayfa',
        about: 'Hakkımızda',
        products: 'Ürünler',
        projects: 'Projeler',
        news: 'Haberler',
        certifications: 'Sertifikalar',
        careers: 'Kariyer',
        gallery: 'Galeri',
        contact: 'İletişim'
      },

      hero: {
        title: 'Madencilik ve Mermer Ocakları İçin Güçlü Çözümler',
        subtitle: '39 Yıllık Tecrübe ile Dayanıklı Yedek Parça Üretimi',
        products: 'Ürünleri İncele',
        contact: 'İletişime Geç'
      },

      home: {
        featuredProducts: 'Öne Çıkan Ürünler',
        featuredProductsDesc: 'Doğal taş ve mermer sektörüne özel üretim çözümlerimiz',
        latestNews: 'Son Haberler',
        references: 'Referanslarımız',
        referencesDesc: 'Gururla çalıştığımız kurumlar',
        ctaTitle: 'Madencilik ve Mermer Sektöründe Güvenilir Çözüm Ortağınız',
        ctaDesc: '39 yıllık deneyimimizle, sektörün ihtiyaç duyduğu kritik parçaları en yüksek kalite standartlarında üretiyoruz.',
        ctaButton: 'Hemen Teklif Al',
        catalog: '📥 Kurumsal Katalog',
        technicalPdf: '📄 Teknik PDF',
        readMore: 'Devamını Oku',
        stats: {
          years: 'Yıllık Tecrübe',
         projects:'Tamamlanan Proje',
          employees: 'Çalışan Sayısı',
          countries: 'İhracat Yapılan Ülke',
          producedParts: 'Üretilen Parça',
          activeCustomers: 'Aktif Müşteri',
          localProduction: 'Yerli Üretim'
        },
        certificates: {
          iso: '📜 ISO 9001:2024',
          national: '🇹🇷 Milli Teknoloji'
        }
      },

      gallery: {
        title: 'Üretimden Kareler',
        subtitle: '4K Görsel Arşivi',
        mediaCount: '15+ Medya',
        stats: {
          area: 'm² Üretim Alanı',
          personnel: 'Uzman Personel',
          cnc: 'CNC Tezgah',
          resolution: 'Yüksek Çözünürlük'
        },
        detail: 'Detay'
      },

      projects: {
        title: 'Projeler',
        ongoing: 'Devam Eden',
        completed: 'Tamamlanan',
        details: 'Proje Detayları'
      },

      certifications: {
        title: 'Sertifikalar',
        quality: 'Kalite Sertifikaları',
        view: 'Sertifikayı İncele'
      },

      products: {
        title: 'Ürünler',
        details: 'Detaylı İncele',
        quote: 'Teklif Al',
        technicalPdf: '📄 Teknik PDF',
        natoApproved: 'NATO Onaylı',
        leverCutterParts: 'Kollu Kesici Parçaları',
        leverCutterPartsDesc: 'Zincir, dişli, bakla ve kesici sistem yedek parçaları',
        leverCutterPartsLong: 'CNC makinelerinde ürünlerimiz, madencilik sektörüne uygun üretilmektedir.',
        diamondTools: 'Elmas Kesici Ekipmanları',
        diamondToolsDesc: 'Kare, yıldız ve PCD elmas kesici çözümleri',
        diamondToolsLong: 'Endüstriyel elmas teknolojisi ile üretilen uzun ömürlü kesici uçlar.',
        hydraulicSystems: 'Yağlama Sistemleri',
        hydraulicSystemsDesc: 'Yağlama cihazları, enjektörler ve filtre sistemleri',
        hydraulicSystemsLong: 'Makine performansını artırıcı ve aşınma önleyici yağlama ekipmanları.',
        reducers: 'Redüktör & Güç Aktarım',
        reducersDesc: 'Planet redüktör ve güç aktarım sistemleri',
        spareParts: 'Makine Yedek Parçaları',
        sparePartsDesc: 'Mermer ocak makineleri için dayanıklı yedek parçalar',
        features: {
          iso: 'ISO Standartları',
          durable: '',
          precision: 'Yüksek Hassasiyet',
         
          diamond: 'Yüksek Performanslı',
          heat: '',
          longlife: 'Uzun Ömürlü',
          pressure: 'Yüksek Basınç',
          seal: 'Sızdırmazlık',
          compact: 'Kompakt Tasarım'
        }
      },

      news: {
        readMore: 'Devamını Oku',
        categories: {
          rnd: 'Ar-Ge',
          event: 'Etkinlik',
          certificate: 'Sertifika'
        },
        items: {
          title1: 'Yeni Nesil Zırh Delici Mühimmatlarda Önemli Aşama',
          title2: 'IDEF 2026 Savunma Sanayi Fuarı\'na Katılıyoruz',
          title3: 'AS9100D Havacılık Kalite Sertifikası Yenilendi',
          summary1: 'Milli muharip araçlar için geliştirilen yeni nesil zırh delici mühimmatlarda seri üretim aşamasına geçildi.',
          summary2: 'Türkiye\'nin en büyük savunma sanayi fuarı IDEF 2026\'da en yeni ürünlerimizi sergileyeceğiz.',
          summary3: 'Havacılık ve savunma sanayinin en önemli kalite sertifikası AS9100D başarıyla yenilendi.'
        }
      },

      footer: {
        description: 'Madencilik ve doğal taş sektörü için yerli üretim çözümleri',
        quickLinks: 'Hızlı Bağlantılar',
        contact: 'İletişim',
        certifications: 'Sertifikalar',
        rights: 'Tüm hakları saklıdır'
      },

      contact: {
        title: 'İletişim',
        company: 'Firma Adı',
        country: 'Ülke',
        name: 'Yetkili Adı',
        email: 'E-posta',
        phone: 'Telefon',
        message: 'Mesajınız',
        send: 'Gönder',
        sending: 'Gönderiliyor...',
        success: 'Mesajınız gönderildi',
        error: 'Bir hata oluştu',
        office: 'Üretim Tesisi',
        productInterest: 'İlgilendiğiniz Ürün',
        selectProduct: 'Ürün seçiniz',
        required: 'Bu alan zorunludur',
        invalidEmail: 'Geçerli bir e-posta giriniz'
      },

      meta: {
        home: {
          title: 'TAMİS Makina Mermer | Ana Sayfa',
          description: 'Madencilik ve mermer ocakları için dayanıklı yedek parça ve ekipman üretimi.'
        }
      }
    }
  },

  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        products: 'Products',
        projects: 'Projects',
        news: 'News',
        certifications: 'Certifications',
        careers: 'Careers',
        gallery: 'Gallery',
        contact: 'Contact'
      },

      hero: {
        title: 'Powerful Solutions for Mining and Marble Quarries',
        subtitle: '39 Years of Experience in Durable Spare Parts Manufacturing',
        products: 'Explore Products',
        contact: 'Contact Us'
      },

      home: {
        featuredProducts: 'Featured Products',
        featuredProductsDesc: 'Production solutions tailored for the natural stone and marble industry',
        latestNews: 'Latest News',
        references: 'Our References',
        referencesDesc: 'Institutions we proudly work with',
        ctaTitle: 'Your Reliable Solution Partner in Mining and Marble Sector',
        ctaDesc: 'With our 39 years of experience, we produce critical parts needed by the sector at the highest quality standards.',
        ctaButton: 'Request Quote',
        catalog: '📥 Corporate Catalog',
        technicalPdf: '📄 Technical PDF',
        readMore: 'Read More',
        stats: {
          years: 'Years Experience',
          projects: 'Completed Projects',
          employees: 'Number of Employees',
          countries: 'Export Countries',
          producedParts: 'Produced Parts',
          activeCustomers: 'Active Customers',
          localProduction: 'Domestic Production'
        },
        certificates: {
          nato: '🔒 NATO Approved',
          iso: '📜 ISO 9001:2024',
          national: '🇹🇷 National Technology'
        }
      },

      gallery: {
        title: 'Moments from Production',
        subtitle: '4K Visual Archive',
        mediaCount: '15+ Media',
        stats: {
          area: 'm² Production Area',
          personnel: 'Expert Personnel',
          cnc: 'CNC Machines',
          resolution: 'High Resolution'
        },
        detail: 'Detail'
      },

      projects: {
        title: 'Projects',
        ongoing: 'Ongoing',
        completed: 'Completed',
        details: 'Project Details'
      },

      certifications: {
        title: 'Certifications',
        quality: 'Quality Certifications',
        view: 'View Certificate'
      },

      products: {
        title: 'Products',
        details: 'View Details',
        quote: 'Request Quote',
        technicalPdf: '📄 Technical PDF',
        natoApproved: 'NATO Approved',
        leverCutterParts: 'Lever Cutter Parts',
        leverCutterPartsDesc: 'Chains, sprockets and cutting system spare parts',
        leverCutterPartsLong: 'Lever cutter parts manufactured to mining industry standards, machined on high precision CNC machines. Material and workmanship compliant with ISO criteria.',
        diamondTools: 'Diamond Cutting Tools',
        diamondToolsDesc: 'Square, star and PCD diamond solutions',
        diamondToolsLong: 'Cutting tools produced with industrial diamond technology. High performance diamond tools used in mining and natural stone sector.',
        hydraulicSystems: 'Hydraulic & Lubrication Systems',
        hydraulicSystemsDesc: 'Lubrication devices, injectors and filter systems',
        hydraulicSystemsLong: 'Hydraulic systems specially designed for construction machinery and marble quarries. High pressure resistance and perfect sealing technology.',
        reducers: 'Reducers & Power Transmission',
        reducersDesc: 'Planetary gearboxes and power transmission systems',
        spareParts: 'Machine Spare Parts',
        sparePartsDesc: 'Durable spare parts for marble quarry machines',
        features: {
          iso: 'ISO Standards',
          precision: 'High Precision',
          durable: 'Durable Material',
          diamond: 'Diamond Coated',
          
          longlife: 'Long Life',
          pressure: 'High Pressure',
          seal: 'Leak Proof',
          compact: 'Compact Design'
        }
      },

      news: {
        readMore: 'Read More',
        categories: {
          rnd: 'R&D',
          event: 'Event',
          certificate: 'Certificate'
        },
        items: {
          title1: 'Significant Progress in Next-Gen Armor-Piercing Ammunition',
          title2: 'We Are Participating in IDEF 2026 Defense Industry Fair',
          title3: 'AS9100D Aviation Quality Certificate Renewed',
          summary1: 'Serial production phase has been reached in next-gen armor-piercing ammunition developed for national combat vehicles.',
          summary2: 'We will exhibit our latest products at IDEF 2026, Turkey\'s largest defense industry fair.',
          summary3: 'AS9100D, the most important quality certificate in aviation and defense industry, has been successfully renewed.'
        }
      },

      footer: {
        description: 'Domestic manufacturing solutions for mining and natural stone industry',
        quickLinks: 'Quick Links',
        contact: 'Contact',
        certifications: 'Certifications',
        rights: 'All rights reserved'
      },

      contact: {
        title: 'Contact',
        company: 'Company',
        country: 'Country',
        name: 'Contact Person',
        email: 'Email',
        phone: 'Phone',
        message: 'Message',
        send: 'Send',
        sending: 'Sending...',
        success: 'Message sent successfully',
        error: 'An error occurred',
        office: 'Production Facility',
        productInterest: 'Product of Interest',
        selectProduct: 'Select product',
        required: 'This field is required',
        invalidEmail: 'Please enter a valid email'
      },

      meta: {
        home: {
          title: 'TAMIS Machinery Marble | Home',
          description: 'Durable spare parts manufacturing for mining and marble quarries.'
        }
      }
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang,
  fallbackLng: 'tr',
  interpolation: { escapeValue: false }
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('lang', lng)
})

export default i18n