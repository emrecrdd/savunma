/* import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Section from '../components/Section'

const Careers = () => {
  const { t, i18n } = useTranslation()
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [applicationSent, setApplicationSent] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
    linkedin: ''
  })

  
  const positions = [
    {
      id: 1,
      titleTr: 'Kıdemli CNC Operatörü',
      titleEn: 'Senior CNC Operator',
      department: 'production',
      location: 'Ankara',
      type: 'fulltime',
      experienceLevel: 'senior',
      deadline: '2024-12-31',
      descriptionTr: '5 eksen CNC tezgahlarında savunma sanayi parçalarının işlenmesi için deneyimli operatör aranmaktadır.',
      descriptionEn: 'Experienced operator sought for processing defense industry parts on 5-axis CNC machines.',
      requirementsTr: [
        'En az 5 yıl CNC tezgah operatörlüğü deneyimi',
        'Mazak veya DMG Mori tezgahlarında deneyim',
        'Teknik resim okuma bilgisi',
        'Kalite kontrol süreçlerine hakimiyet',
        'Tercihen savunma sanayi tecrübesi'
      ],
      requirementsEn: [
        'Minimum 5 years of CNC machine operation experience',
        'Experience with Mazak or DMG Mori machines',
        'Technical drawing reading skills',
        'Knowledge of quality control processes',
        'Preferably defense industry experience'
      ],
      benefits: [
        'Rekabetçi maaş ve prim sistemi',
        'Özel sağlık sigortası',
        'Yemekhane ve servis imkanı',
        'Kariyer gelişim fırsatları'
      ]
    },
    {
      id: 2,
      titleTr: 'Makine Mühendisi',
      titleEn: 'Mechanical Engineer',
      department: 'engineering',
      location: 'Ankara',
      type: 'fulltime',
      experienceLevel: 'mid',
      deadline: '2024-12-15',
      descriptionTr: 'Savunma sanayi projelerinde görev alacak, ürün geliştirme ve iyileştirme çalışmalarında yer alacak mühendis aranmaktadır.',
      descriptionEn: 'Engineer sought to work on defense industry projects, product development and improvement studies.',
      requirementsTr: [
        'Makine Mühendisliği mezunu',
        'En az 3 yıl deneyim',
        'SolidWorks, CATIA veya benzeri CAD programlarına hakimiyet',
        'Savunma sanayi deneyimi tercih sebebi',
        'İyi derecede İngilizce'
      ],
      requirementsEn: [
        'Mechanical Engineering graduate',
        'Minimum 3 years of experience',
        'Proficiency in SolidWorks, CATIA or similar CAD programs',
        'Defense industry experience is a plus',
        'Good command of English'
      ],
      benefits: [
        'Rekabetçi maaş ve prim sistemi',
        'Özel sağlık sigortası',
        'Yemekhane ve servis imkanı',
        'Kariyer gelişim fırsatları',
        'Yurt dışı eğitim ve seminer imkanları'
      ]
    },
    {
      id: 3,
      titleTr: 'Kalite Kontrol Uzmanı',
      titleEn: 'Quality Control Specialist',
      department: 'quality',
      location: 'Ankara',
      type: 'fulltime',
      experienceLevel: 'mid',
      deadline: '2024-12-20',
      descriptionTr: 'Üretim süreçlerinde kalite kontrol faaliyetlerini yürütecek, AS9100 ve ISO standartlarına hakim uzman aranmaktadır.',
      descriptionEn: 'Specialist sought to carry out quality control activities in production processes, knowledgeable in AS9100 and ISO standards.',
      requirementsTr: [
        'Makine veya Endüstri Mühendisliği mezunu',
        'En az 3 yıl kalite kontrol deneyimi',
        'AS9100 ve ISO 9001 bilgisi',
        'CMM ve ölçüm cihazları kullanımı',
        'İstatistiksel süreç kontrolü bilgisi'
      ],
      requirementsEn: [
        'Mechanical or Industrial Engineering graduate',
        'Minimum 3 years of quality control experience',
        'Knowledge of AS9100 and ISO 9001',
        'Use of CMM and measuring devices',
        'Knowledge of statistical process control'
      ],
      benefits: [
        'Rekabetçi maaş ve prim sistemi',
        'Özel sağlık sigortası',
        'Yemekhane ve servis imkanı',
        'Kariyer gelişim fırsatları'
      ]
    },
    {
      id: 4,
      titleTr: 'Ar-Ge Uzmanı',
      titleEn: 'R&D Specialist',
      department: 'rnd',
      location: 'Ankara',
      type: 'fulltime',
      experienceLevel: 'senior',
      deadline: '2024-12-25',
      descriptionTr: 'Yeni ürün geliştirme projelerinde görev alacak, yenilikçi çözümler üretecek Ar-Ge uzmanı aranmaktadır.',
      descriptionEn: 'R&D specialist sought to take part in new product development projects and produce innovative solutions.',
      requirementsTr: [
        'Makine veya Malzeme Mühendisliği mezunu',
        'En az 5 yıl Ar-Ge deneyimi',
        'Savunma sanayi projelerinde deneyim',
        'Proje yönetim becerileri',
        'İleri düzey İngilizce'
      ],
      requirementsEn: [
        'Mechanical or Materials Engineering graduate',
        'Minimum 5 years of R&D experience',
        'Experience in defense industry projects',
        'Project management skills',
        'Advanced English'
      ],
      benefits: [
        'Rekabetçi maaş ve prim sistemi',
        'Özel sağlık sigortası',
        'Yemekhane ve servis imkanı',
        'Kariyer gelişim fırsatları',
        'Yurt dışı eğitim ve seminer imkanları',
        'Ar-Ge teşvik primleri'
      ]
    },
    {
      id: 5,
      titleTr: 'Satış ve Pazarlama Uzmanı',
      titleEn: 'Sales and Marketing Specialist',
      department: 'sales',
      location: 'Ankara',
      type: 'fulltime',
      experienceLevel: 'mid',
      deadline: '2024-12-30',
      descriptionTr: 'Yurt içi ve yurt dışı müşterilerle ilişkileri yürütecek, ihracat süreçlerinde görev alacak uzman aranmaktadır.',
      descriptionEn: 'Specialist sought to manage relationships with domestic and international customers, take part in export processes.',
      requirementsTr: [
        'İşletme, İktisat veya Mühendislik mezunu',
        'En az 3 yıl B2B satış deneyimi',
        'Savunma sanayi deneyimi tercih sebebi',
        'İleri düzey İngilizce, ikinci dil tercih sebebi',
        'Seyahat engeli olmamalı'
      ],
      requirementsEn: [
        'Business, Economics or Engineering graduate',
        'Minimum 3 years of B2B sales experience',
        'Defense industry experience is a plus',
        'Advanced English, second language is a plus',
        'No travel restrictions'
      ],
      benefits: [
        'Rekabetçi maaş ve prim sistemi',
        'Özel sağlık sigortası',
        'Yemekhane ve servis imkanı',
        'Kariyer gelişim fırsatları',
        'Prim ve teşvik sistemi'
      ]
    },
    {
      id: 6,
      titleTr: 'Stajyer Mühendis',
      titleEn: 'Intern Engineer',
      department: 'internship',
      location: 'Ankara',
      type: 'internship',
      experienceLevel: 'entry',
      deadline: '2024-12-15',
      descriptionTr: 'Makine, Endüstri veya Malzeme Mühendisliği öğrencilerine staj imkanı.',
      descriptionEn: 'Internship opportunity for Mechanical, Industrial or Materials Engineering students.',
      requirementsTr: [
        'Makine, Endüstri veya Malzeme Mühendisliği 3. veya 4. sınıf öğrencisi',
        'Ortalama 2.5/4.0 üzeri',
        'Takım çalışmasına yatkın',
        'Öğrenmeye açık ve istekli'
      ],
      requirementsEn: [
        '3rd or 4th year Mechanical, Industrial or Materials Engineering student',
        'GPA above 2.5/4.0',
        'Team player',
        'Eager to learn'
      ],
      benefits: [
        'Ücretli staj imkanı',
        'Mentorluk desteği',
        'Savunma sanayi deneyimi',
        'Mezuniyet sonrası istihdam fırsatı'
      ]
    }
  ]

  // Departmanlar
  const departments = [
    { value: 'all', labelTr: 'Tüm Pozisyonlar', labelEn: 'All Positions', icon: '📋' },
    { value: 'engineering', labelTr: 'Mühendislik', labelEn: 'Engineering', icon: '🔧' },
    { value: 'production', labelTr: 'Üretim', labelEn: 'Production', icon: '🏭' },
    { value: 'quality', labelTr: 'Kalite Kontrol', labelEn: 'Quality Control', icon: '📊' },
    { value: 'rnd', labelTr: 'Ar-Ge', labelEn: 'R&D', icon: '🔬' },
    { value: 'sales', labelTr: 'Satış ve Pazarlama', labelEn: 'Sales & Marketing', icon: '📈' },
    { value: 'internship', labelTr: 'Staj', labelEn: 'Internship', icon: '🎓' }
  ]

  const getTypeLabel = (type) => {
    const types = {
      fulltime: { tr: 'Tam Zamanlı', en: 'Full Time', class: 'bg-green-900/50 text-green-300 border-green-800' },
      parttime: { tr: 'Yarı Zamanlı', en: 'Part Time', class: 'bg-blue-900/50 text-blue-300 border-blue-800' },
      contract: { tr: 'Sözleşmeli', en: 'Contract', class: 'bg-purple-900/50 text-purple-300 border-purple-800' },
      internship: { tr: 'Staj', en: 'Internship', class: 'bg-yellow-900/50 text-yellow-300 border-yellow-800' }
    }
    return types[type] || types.fulltime
  }

  const getLevelLabel = (level) => {
    const levels = {
      entry: { tr: 'Giriş Seviye', en: 'Entry Level', class: 'bg-navy-700 text-gray-300' },
      mid: { tr: 'Orta Seviye', en: 'Mid Level', class: 'bg-navy-600 text-white' },
      senior: { tr: 'Kıdemli', en: 'Senior', class: 'bg-navy-500 text-white' },
      lead: { tr: 'Lider', en: 'Lead', class: 'bg-navy-400 text-navy-900' }
    }
    return levels[level] || levels.entry
  }

  const filteredPositions = selectedDepartment === 'all' 
    ? positions 
    : positions.filter(p => p.department === selectedDepartment)

  const handleApplicationSubmit = (e) => {
    e.preventDefault()
    setApplicationSent(true)
    setTimeout(() => setApplicationSent(false), 5000)
    setFormData({
      name: '', email: '', phone: '', position: '', experience: '', message: '', linkedin: ''
    })
    setSelectedPosition(null)
  }

  return (
    <>
      <Helmet>
        <title>Defense Corp | {t('nav.careers')} - Kariyer Fırsatları</title>
        <meta name="description" content="Savunma sanayinde kariyer fırsatları, açık pozisyonlar ve iş başvuruları." />
        <meta name="keywords" content="savunma sanayi kariyer, iş ilanları, mühendislik iş ilanları, cnc operatörü" />
      </Helmet>

      
      <div className="relative pt-20 min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/95 to-navy-900/90 z-10"></div>
          <div className="absolute inset-0 bg-[url('/images/careers-bg.jpg')] bg-cover bg-center opacity-30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-800/50 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative container-custom z-20 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-navy-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-navy-700 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">{t('nav.careers')}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
              {i18n.language === 'tr' ? 'Kariyer Fırsatları' : 'Career Opportunities'}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed animate-fade-in">
              {i18n.language === 'tr' 
                ? 'Savunma sanayinin geleceğini birlikte şekillendirelim. Yenilikçi, dinamik ve gelişime açık ekibimize katılın.'
                : 'Let\'s shape the future of the defense industry together. Join our innovative, dynamic and development-oriented team.'}
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-navy-800/30">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            {i18n.language === 'tr' ? 'Neden Bizi Seçmelisin?' : 'Why Choose Us?'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🚀', titleTr: 'Yenilikçi Projeler', titleEn: 'Innovative Projects', descTr: 'Milli savunma projelerinde yer alın', descEn: 'Be part of national defense projects' },
              { icon: '📈', titleTr: 'Kariyer Gelişimi', titleEn: 'Career Growth', descTr: 'Sürekli öğrenme ve gelişim fırsatları', descEn: 'Continuous learning and development opportunities' },
              { icon: '🏆', titleTr: 'Rekabetçi Maaş', titleEn: 'Competitive Salary', descTr: 'Piyasanın üzerinde maaş ve prim sistemi', descEn: 'Above market salary and bonus system' },
              { icon: '🌍', titleTr: 'Uluslararası İmkanlar', titleEn: 'International Opportunities', descTr: 'Yurt dışı eğitim ve görevlendirme', descEn: 'Overseas training and assignments' }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 bg-navy-800/50 rounded-xl border border-navy-700 hover:border-navy-500 transition-all group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-white font-semibold mb-2">{i18n.language === 'tr' ? item.titleTr : item.titleEn}</h3>
                <p className="text-gray-400 text-sm">{i18n.language === 'tr' ? item.descTr : item.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Section title={i18n.language === 'tr' ? 'Açık Pozisyonlar' : 'Open Positions'}>
        <div className="flex flex-wrap gap-3 mb-8">
          {departments.map((dept) => (
            <button
              key={dept.value}
              onClick={() => setSelectedDepartment(dept.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedDepartment === dept.value
                  ? 'bg-navy-600 text-white'
                  : 'bg-navy-800 text-gray-400 hover:bg-navy-700 hover:text-white'
              }`}
            >
              <span>{dept.icon}</span>
              <span>{i18n.language === 'tr' ? dept.labelTr : dept.labelEn}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredPositions.map((position) => {
            const typeBadge = getTypeLabel(position.type)
            const levelBadge = getLevelLabel(position.experienceLevel)
            const isDeadlineSoon = new Date(position.deadline) - new Date() < 7 * 24 * 60 * 60 * 1000

            return (
              <div 
                key={position.id} 
                className="group bg-navy-800/50 rounded-xl border border-navy-700 hover:border-navy-500 transition-all hover:transform hover:-translate-y-1 duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-navy-300 transition-colors">
                        {i18n.language === 'tr' ? position.titleTr : position.titleEn}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <span className="text-sm text-gray-400 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {position.location}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full border ${typeBadge.class}`}>
                          {i18n.language === 'tr' ? typeBadge.tr : typeBadge.en}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${levelBadge.class}`}>
                          {i18n.language === 'tr' ? levelBadge.tr : levelBadge.en}
                        </span>
                        {isDeadlineSoon && (
                          <span className="text-xs px-2 py-1 rounded-full bg-red-900/50 text-red-300 border border-red-800 animate-pulse">
                            ⏰ {i18n.language === 'tr' ? 'Son Başvuru' : 'Deadline'} {new Date(position.deadline).toLocaleDateString('tr-TR')}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedPosition(selectedPosition?.id === position.id ? null : position)}
                      className={`px-6 py-2 rounded-lg transition-all ${
                        selectedPosition?.id === position.id
                          ? 'bg-navy-600 text-white'
                          : 'bg-navy-700 hover:bg-navy-600 text-white'
                      }`}
                    >
                      {selectedPosition?.id === position.id 
                        ? (i18n.language === 'tr' ? 'Kapat' : 'Close')
                        : (i18n.language === 'tr' ? 'Başvur' : 'Apply')}
                    </button>
                  </div>

                  <p className="text-gray-400 mb-4">
                    {i18n.language === 'tr' ? position.descriptionTr : position.descriptionEn}
                  </p>

                  {selectedPosition?.id === position.id && (
                    <div className="mt-6 pt-6 border-t border-navy-700 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-white font-semibold mb-3 flex items-center">
                            <span className="text-navy-400 mr-2">✓</span>
                            {i18n.language === 'tr' ? 'Gereklilikler' : 'Requirements'}
                          </h4>
                          <ul className="space-y-2">
                            {(i18n.language === 'tr' ? position.requirementsTr : position.requirementsEn).map((req, idx) => (
                              <li key={idx} className="text-gray-400 text-sm flex items-start">
                                <span className="text-navy-400 mr-2">•</span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                    
                        <div>
                          <h4 className="text-white font-semibold mb-3 flex items-center">
                            <span className="text-green-400 mr-2">🎁</span>
                            {i18n.language === 'tr' ? 'Yan Haklar' : 'Benefits'}
                          </h4>
                          <ul className="space-y-2">
                            {position.benefits.map((benefit, idx) => (
                              <li key={idx} className="text-gray-400 text-sm flex items-start">
                                <span className="text-green-400 mr-2">+</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    
                      <div className="mt-6 p-4 bg-navy-900/50 rounded-lg border border-navy-700">
                        <h4 className="text-white font-semibold mb-4">
                          {i18n.language === 'tr' ? 'Hemen Başvur' : 'Apply Now'}
                        </h4>
                        <form onSubmit={handleApplicationSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder={i18n.language === 'tr' ? 'Ad Soyad *' : 'Full Name *'}
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="form-input"
                            />
                            <input
                              type="email"
                              placeholder="E-posta *"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="form-input"
                            />
                            <input
                              type="tel"
                              placeholder={i18n.language === 'tr' ? 'Telefon *' : 'Phone *'}
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className="form-input"
                            />
                            <input
                              type="text"
                              placeholder={i18n.language === 'tr' ? 'LinkedIn Profili' : 'LinkedIn Profile'}
                              value={formData.linkedin}
                              onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                              className="form-input"
                            />
                          </div>
                          <textarea
                            rows="4"
                            placeholder={i18n.language === 'tr' ? 'Kendinizi tanıtın ve neden bu pozisyonu istediğinizi belirtin *' : 'Introduce yourself and why you want this position *'}
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            className="form-input"
                          ></textarea>
                          <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
                          >
                            {i18n.language === 'tr' ? 'Başvuruyu Gönder' : 'Submit Application'}
                          </button>
                        </form>
                        {applicationSent && (
                          <div className="mt-4 p-3 bg-green-900/50 border border-green-800 rounded-lg text-green-300 text-sm text-center animate-fade-in">
                            ✅ {i18n.language === 'tr' ? 'Başvurunuz başarıyla gönderildi. En kısa sürede dönüş yapılacaktır.' : 'Your application has been sent successfully. We will get back to you as soon as possible.'}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Section>

     
      <div className="py-16 bg-gradient-to-r from-navy-800 to-navy-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-5xl mb-4">🎓</div>
              <h2 className="text-3xl font-bold text-white mb-4">
                {i18n.language === 'tr' ? 'Staj Programımız' : 'Internship Program'}
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {i18n.language === 'tr'
                  ? 'Üniversite öğrencilerine savunma sanayinde deneyim kazanma fırsatı sunuyoruz. Staj programımız ile teorik bilginizi pratikle buluşturun, sektörün önde gelen mühendisleriyle çalışma imkanı yakalayın.'
                  : 'We offer university students the opportunity to gain experience in the defense industry. Combine your theoretical knowledge with practice through our internship program and work with leading engineers in the sector.'}
              </p>
              <Link to="/contact" className="btn-primary inline-block">
                {i18n.language === 'tr' ? 'Staj Başvurusu Yap' : 'Apply for Internship'}
              </Link>
            </div>
            <div className="bg-navy-800/50 rounded-xl p-6 border border-navy-700">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4">
                  <div className="text-2xl font-bold text-white mb-1">100+</div>
                  <div className="text-xs text-gray-400">{i18n.language === 'tr' ? 'Stajyer Öğrenci' : 'Intern Students'}</div>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-white mb-1">15+</div>
                  <div className="text-xs text-gray-400">{i18n.language === 'tr' ? 'Üniversite' : 'University'}</div>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-white mb-1">%85</div>
                  <div className="text-xs text-gray-400">{i18n.language === 'tr' ? 'İstihdam Oranı' : 'Employment Rate'}</div>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-white mb-1">12</div>
                  <div className="text-xs text-gray-400">{i18n.language === 'tr' ? 'Hafta Program' : 'Week Program'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
     
        

export default Careers */