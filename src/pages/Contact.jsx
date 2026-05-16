import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'

const Contact = () => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await axios.post('/api/contact', data)
      toast.success(t('contact.success'))
      reset()
    } catch (error) {
      toast.error(t('contact.error'))
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: '📍',
      titleTr: 'Adres',
      titleEn: 'Address',
      details: ['Saray Mah. 50.Cad. 17/C Kahramankazan', 'Ankara/Türkiye 06980'],
      link: 'https://maps.google.com/?q=40.04281738036737,32.59818695602955'
    },
    {
      icon: '📞',
      titleTr: 'Telefon',
      titleEn: 'Phone',
      details: ['+90 312 394 01 35'],
      link: 'tel:+903123940135'
    },
    {
      icon: '✉️',
      titleTr: 'E-posta',
      titleEn: 'Email',
      details: ['info@tamis.com.tr'],
      link: 'mailto:info@tamis.com.tr'
    },
    {
      icon: '🕒',
      titleTr: 'Çalışma Saatleri',
      titleEn: 'Working Hours',
      details: ['Pazartesi - Cuma: 08:30 - 18:00']
    }
  ]

  const productCategories = [
    { value: 'lever', labelTr: 'Kol Kesici Parçalar', labelEn: 'Lever Cutter Parts', icon: '⚙️' },
    { value: 'diamond', labelTr: 'Elmas Kesici Takımlar', labelEn: 'Diamond Cutting Tools', icon: '💎' },
    { value: 'hydraulic', labelTr: 'Yağlama Sistemleri', labelEn: 'Lubrication Systems', icon: '🛢️' },
    { value: 'special', labelTr: 'Özel Tasarım Bileşenler', labelEn: 'Special Design Components', icon: '🔧' },
    { value: 'other', labelTr: 'Diğer / Genel Talep', labelEn: 'Other / General Request', icon: '📋' }
  ]

  // Schema.org için sabit değerler
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": currentLang === 'tr' ? "TAMİS İletişim Sayfası" : "TAMİS Contact Page",
    "description": currentLang === 'tr' 
      ? "TAMİS ile iletişime geçin. Adres, telefon ve e-posta bilgilerimizle size yardımcı olmaktan mutluluk duyarız."
      : "Contact TAMİS. We are happy to help you with our address, phone and email information.",
    "url": "https://tamismakine.com.tr/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "TAMİS",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Saray Mah. 50.Cad. 17/C",
        "addressLocality": "Kahramankazan",
        "addressRegion": "Ankara",
        "postalCode": "06980",
        "addressCountry": "TR"
      },
      "telephone": "+903123940135",
      "email": "info@tamis.com.tr"
    }
  }

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
        "name": currentLang === 'tr' ? "İletişim" : "Contact",
        "item": "https://tamismakine.com.tr/contact"
      }
    ]
  }

  return (
    <>
      <Helmet>
        <html lang={currentLang === 'tr' ? 'tr' : 'en'} />
        
        <title>{currentLang === 'tr' 
          ? 'TAMİS | İletişim - Ankara Kahramankazan Adres Telefon' 
          : 'TAMİS | Contact - Ankara Kahramankazan Address Phone'}</title>
        
        <meta name="description" content={currentLang === 'tr' 
          ? 'TAMİS ile iletişime geçin. Ankara Kahramankazan adresimiz, telefon: +90 312 394 01 35, e-posta: info@tamis.com.tr. Yedek parça talepleriniz için bize ulaşın.'
          : 'Contact TAMİS. Our address in Kahramankazan, Ankara, phone: +90 312 394 01 35, email: info@tamis.com.tr. Contact us for your spare parts requests.'} 
        />
        
        <meta name="keywords" content="TAMİS iletişim, Ankara yedek parça iletişim, Kahramankazan sanayi, makine yedek parça telefon, tamis makine adres" />
        
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        <link rel="canonical" href={`https://tamismakine.com.tr/contact${currentLang === 'en' ? '?lang=en' : ''}`} />
        
        {/* Dil alternatifleri */}
        <link rel="alternate" href="https://tamismakine.com.tr/contact" hreflang="tr" />
        <link rel="alternate" href="https://tamismakine.com.tr/en/contact" hreflang="en" />
        
        {/* Open Graph */}
        <meta property="og:title" content={currentLang === 'tr' ? 'TAMİS | İletişim' : 'TAMİS | Contact'} />
        <meta property="og:description" content={currentLang === 'tr' 
          ? 'Ankara Kahramankazan adresimizden bize ulaşabilirsiniz.'
          : 'You can reach us at our address in Kahramankazan, Ankara.'} 
        />
        <meta property="og:image" content="https://tamismakine.com.tr/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://tamismakine.com.tr/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TAMİS" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentLang === 'tr' ? 'TAMİS | İletişim' : 'TAMİS | Contact'} />
        <meta name="twitter:description" content={currentLang === 'tr' ? 'Bize ulaşın.' : 'Contact us.'} />
        <meta name="twitter:image" content="https://tamismakine.com.tr/images/og-image.jpg" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Hero Bölümü - GİZLİ H1 */}
      <h1 className="sr-only">TAMİS İletişim - Ankara Kahramankazan Adres ve Telefon Bilgileri</h1>

      <div className="relative pt-20 min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/95 to-navy-900/90 z-10"></div>
          <div className="absolute inset-0 bg-[url('/images/contact-bg.jpg')] bg-cover bg-center opacity-30"></div>
        </div>
        
        <div className="relative container-custom z-20 py-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-navy-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-navy-700 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">{t('nav.contact')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slide-up">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed animate-fade-in">
              {currentLang === 'tr' 
                ? 'Mermer ocak ekipmanları ihtiyaçlarınız için bize ulaşın. Uzman ekibimiz en kısa sürede size dönüş yapacaktır.'
                : 'Contact us for your marble quarry equipment needs. Our expert team will get back to you as soon as possible.'}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-8 pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sol Taraf - İletişim Bilgileri */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="group bg-navy-800/50 rounded-xl p-6 border border-navy-700 hover:border-navy-500 transition-all hover:transform hover:-translate-y-1 duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl group-hover:scale-110 transition-transform">{info.icon}</div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">
                        {currentLang === 'tr' ? info.titleTr : info.titleEn}
                      </h3>
                      {info.details.map((detail, i) => (
                        info.link && i === 0 ? (
                          <a 
                            key={i} 
                            href={info.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-navy-400 text-sm block transition-colors"
                          >
                            {detail}
                          </a>
                        ) : (
                          <p key={i} className="text-gray-400 text-sm">{detail}</p>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Sosyal Medya */}
              <div className="bg-navy-800/50 rounded-xl p-6 border border-navy-700">
                <h3 className="text-white font-semibold mb-4">
                  {currentLang === 'tr' ? 'Sosyal Medya' : 'Social Media'}
                </h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/tamis.makine/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-navy-700 hover:bg-navy-600 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/tamis-makine-54aa64409/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-navy-700 hover:bg-navy-600 rounded-full flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.203 0 22.225 0z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Sağ Taraf - Form */}
            <div className="lg:col-span-2">
              <div className="bg-navy-800/50 rounded-xl border border-navy-700 overflow-hidden">
                <div className="bg-gradient-to-r from-navy-700 to-navy-800 px-6 py-4 border-b border-navy-600">
                  <h2 className="text-xl font-bold text-white">
                    {currentLang === 'tr' ? 'Teklif ve Bilgi Formu' : 'Quote and Information Form'}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {currentLang === 'tr' 
                      ? 'Size en kısa sürede dönüş yapabilmemiz için formu eksiksiz doldurunuz.'
                      : 'Fill out the form completely so we can get back to you as soon as possible.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="form-group">
                      <label className="form-label">
                        {t('contact.company')} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        {...register('company', { required: true })}
                        className="form-input"
                        placeholder={currentLang === 'tr' ? 'Firma adı' : 'Company name'}
                      />
                      {errors.company && <span className="form-error">{t('contact.required')}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        {t('contact.country')} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        {...register('country', { required: true })}
                        className="form-input"
                        placeholder={currentLang === 'tr' ? 'Ülke' : 'Country'}
                      />
                      {errors.country && <span className="form-error">{t('contact.required')}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        {t('contact.name')} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        {...register('name', { required: true })}
                        className="form-input"
                        placeholder={currentLang === 'tr' ? 'Yetkili adı soyadı' : 'Full name'}
                      />
                      {errors.name && <span className="form-error">{t('contact.required')}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        {t('contact.phone')} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        {...register('phone', { required: true })}
                        className="form-input"
                        placeholder="+90 555 123 45 67"
                      />
                      {errors.phone && <span className="form-error">{t('contact.required')}</span>}
                    </div>

                    <div className="form-group md:col-span-2">
                      <label className="form-label">
                        {t('contact.email')} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                        className="form-input"
                        placeholder="info@firma.com"
                      />
                      {errors.email && <span className="form-error">{t('contact.invalidEmail')}</span>}
                    </div>

                    <div className="form-group md:col-span-2">
                      <label className="form-label">
                        {t('contact.productInterest')}
                      </label>
                      <select
                        {...register('productInterest')}
                        className="form-input"
                      >
                        <option value="">{currentLang === 'tr' ? 'Ürün seçiniz' : 'Select product'}</option>
                        {productCategories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.icon} {currentLang === 'tr' ? cat.labelTr : cat.labelEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group md:col-span-2">
                      <label className="form-label">
                        {t('contact.message')} <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        {...register('message', { required: true })}
                        rows="5"
                        className="form-input resize-none"
                        placeholder={currentLang === 'tr' 
                          ? 'Teknik gereksinimleriniz, talep ettiğiniz ürünler hakkında bilgi verebilirsiniz...' 
                          : 'You can provide information about your technical requirements, requested products...'}
                      ></textarea>
                      {errors.message && <span className="form-error">{t('contact.required')}</span>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-navy-600 to-navy-500 hover:from-navy-500 hover:to-navy-400 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{t('contact.sending')}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('contact.send')}</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-4 border-t border-navy-700">
                    <p className="text-xs text-gray-500">
                      🔒 {currentLang === 'tr' 
                        ? 'Gönderdiğiniz bilgiler 256-bit SSL ile şifrelenmektedir. KVKK kapsamında korunmaktadır.'
                        : 'Information you send is encrypted with 256-bit SSL. Protected under KVKK.'}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Harita Bölümü */}
      <div className="relative h-96 overflow-hidden">
        <iframe
          title="TAMİS Ankara Kahramankazan Konum"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12217.831679041243!2d32.59822750508584!3d40.04288076099371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d33fa5d77d715f%3A0xa5434c7219f8c8de!2zVEFNxLBT!5e0!3m2!1str!2str!4v1773189841286!5m2!1str!2str"
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          aria-label="TAMİS konum haritası"
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent pointer-events-none"></div>
      </div>
    </>
  )
}

export default Contact