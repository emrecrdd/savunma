import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next'

const WhatsappButton = () => {
  const { t, i18n } = useTranslation()
  const [show, setShow] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const phone = "905412985334"
  const companyName = "Tamis"
  
  // Dile göre mesaj
  const getMessage = () => {
    if (i18n.language === 'tr') {
      return `Merhaba, ${companyName} hakkında kurumsal bilgi almak istiyorum.`
    }
    return `Hello, I would like to get corporate information about ${companyName}.`
  }

  const link = `https://wa.me/${phone}?text=${encodeURIComponent(getMessage())}`

  useEffect(() => {
    localStorage.removeItem('whatsapp-message-closed')
    setShow(true)
    
    setTimeout(() => {
      setShowMessage(true)
      console.log("Balon gösteriliyor...")
    }, 1000)
    
  }, [])

  const handleCloseMessage = () => {
    setShowMessage(false)
    localStorage.setItem('whatsapp-message-closed', 'true')
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end space-y-3">
      
      {/* Mesaj Balonu - Kapatılabilir */}
      {showMessage && (
        <div className="relative bg-navy-800 rounded-xl shadow-2xl border border-navy-700 w-72 animate-slide-up">
          {/* Kapatma butonu */}
          <button
            onClick={handleCloseMessage}
            className="absolute -top-2 -right-2 w-6 h-6 bg-navy-700 hover:bg-navy-600 rounded-full flex items-center justify-center border border-navy-600 transition-colors"
          >
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Balon içeriği */}
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.52 3.48A11.9 11.9 0 0012.05 0C5.42 0 .03 5.39.03 12.03c0 2.12.56 4.19 1.63 6.02L0 24l6.13-1.6a11.98 11.98 0 005.92 1.51h.01c6.63 0 12.02-5.39 12.02-12.02 0-3.21-1.25-6.23-3.56-8.41z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold">
                  {i18n.language === 'tr' ? 'WhatsApp İletişim' : 'WhatsApp Contact'}
                </h4>
                <p className="text-xs text-gray-400">
                  {i18n.language === 'tr' ? '7/24 Hizmetinizdeyiz' : '24/7 At Your Service'}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-4">
              {i18n.language === 'tr' 
                ? 'Kurumsal talepleriniz, teknik bilgi ve fiyat teklifi için bize WhatsApp üzerinden ulaşabilirsiniz.'
                : 'You can reach us via WhatsApp for corporate inquiries, technical information and price quotes.'}
            </p>

            <div className="bg-navy-900/50 rounded-lg p-3 mb-4 border border-navy-700">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  {i18n.language === 'tr' ? 'Yanıt süresi:' : 'Response time:'}
                </span>
                <span className="text-green-400 font-medium">
                  ⏱️ {i18n.language === 'tr' ? '~5 dakika' : '~5 minutes'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs mt-2">
                <span className="text-gray-500">
                  {i18n.language === 'tr' ? 'Çevrimiçi:' : 'Online:'}
                </span>
                <span className="text-green-400">
                  🟢 {i18n.language === 'tr' ? '7/24 Aktif' : '24/7 Active'}
                </span>
              </div>
            </div>

            <div className="flex space-x-2">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.52 3.48A11.9 11.9 0 0012.05 0C5.42 0 .03 5.39.03 12.03c0 2.12.56 4.19 1.63 6.02L0 24l6.13-1.6a11.98 11.98 0 005.92 1.51h.01c6.63 0 12.02-5.39 12.02-12.02 0-3.21-1.25-6.23-3.56-8.41z"/>
                </svg>
                <span>{i18n.language === 'tr' ? 'Hemen Yaz' : 'Write Now'}</span>
              </a>
              <button
                onClick={handleCloseMessage}
                className="bg-navy-700 hover:bg-navy-600 text-gray-300 text-sm font-medium py-2.5 px-4 rounded-lg transition-colors"
              >
                {i18n.language === 'tr' ? 'Daha Sonra' : 'Later'}
              </button>
            </div>

            <p className="text-xs text-gray-600 mt-3 text-center">
              🔒 {i18n.language === 'tr' ? 'Kurumsal iletişim için özel hat' : 'Special line for corporate communication'}
            </p>
          </div>
        </div>
      )}

      {/* Ana WhatsApp Butonu */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hover Tooltip */}
       

        {/* Buton */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.52 3.48A11.9 11.9 0 0012.05 0C5.42 0 .03 5.39.03 12.03c0 2.12.56 4.19 1.63 6.02L0 24l6.13-1.6a11.98 11.98 0 005.92 1.51h.01c6.63 0 12.02-5.39 12.02-12.02 0-3.21-1.25-6.23-3.56-8.41zM12.06 21.7a9.7 9.7 0 01-4.95-1.35l-.35-.21-3.64.95.97-3.55-.23-.37a9.69 9.69 0 01-1.48-5.14c0-5.35 4.35-9.7 9.71-9.7 2.59 0 5.02 1.01 6.85 2.84a9.64 9.64 0 012.84 6.86c-.01 5.35-4.36 9.67-9.72 9.67zm5.32-7.27c-.29-.15-1.72-.85-1.99-.95-.27-.1-.47-.15-.66.15-.19.29-.76.95-.93 1.15-.17.19-.34.22-.63.07-.29-.15-1.21-.44-2.3-1.4-.85-.75-1.42-1.67-1.59-1.96-.17-.29-.02-.44.13-.58.13-.13.29-.34.44-.51.15-.17.2-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.66-1.6-.9-2.2-.24-.58-.48-.5-.66-.51l-.56-.01c-.19 0-.51.07-.77.36-.27.29-1.01.98-1.01 2.39s1.03 2.77 1.18 2.96c.15.19 2.03 3.11 4.92 4.36.69.3 1.23.48 1.65.61.69.22 1.31.19 1.81.12.55-.08 1.72-.7 1.97-1.37.24-.66.24-1.23.17-1.36-.07-.12-.27-.19-.56-.34z"/>
          </svg>

          {/* Online göstergesi */}
          <span className="absolute -top-1 -right-1 w-4 h-4">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-navy-900"></span>
          </span>
        </a>
      </div>
    </div>
  )
}

export default WhatsappButton