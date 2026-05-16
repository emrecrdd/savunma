const express = require('express')
const cors = require('cors')
const multer = require('multer')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const { Resend } = require('resend')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const resend = new Resend(process.env.RESEND_API_KEY)

// Multer yapılandırması
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'image/jpeg', 'image/png']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Geçersiz dosya tipi'), false)
  }
}

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: fileFilter
})

// Ürün kategorileri için çeviri
const getProductLabel = (value, lang) => {
  const products = {
    'lever': { tr: 'Kol Kesici Parçalar', en: 'Lever Cutter Parts' },
    'diamond': { tr: 'Elmas Kesici Takımlar', en: 'Diamond Cutting Tools' },
    'hydraulic': { tr: 'Yağlama Sistemleri', en: 'Hydraulic Systems' },
    'special': { tr: 'Özel Tasarım Bileşenler', en: 'Special Design Components' },
    'other': { tr: 'Diğer / Genel Talep', en: 'Other / General Request' }
  }
  return products[value]?.[lang] || value || 'Belirtilmemiş'
}

// İletişim formu endpoint'i
app.post('/api/contact', upload.single('attachment'), async (req, res) => {
  try {
    const { 
      company, 
      country, 
      name, 
      phone, 
      email, 
      productInterest, 
      message 
    } = req.body
    
    const file = req.file
    const lang = req.headers['accept-language']?.startsWith('tr') ? 'tr' : 'en'

    // Validasyon
    if (!company || !country || !name || !phone || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Lütfen tüm zorunlu alanları doldurun' 
      })
    }

    let attachments = []

    if (file) {
      const fileContent = fs.readFileSync(file.path)
      attachments.push({
        filename: file.originalname,
        content: fileContent
      })
    }

    // E-posta gönderimi
    const productLabel = getProductLabel(productInterest, lang)

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'mahmut9296@gmail.com',
      replyTo: email,
      subject: `Yeni İleti - ${company}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a2a4f; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f5f5f5; padding: 20px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1a2a4f; margin-bottom: 5px; }
            .value { background: white; padding: 10px; border-radius: 5px; margin-top: 5px; }
            .product-badge { display: inline-block; background: #e74c3c; color: white; padding: 5px 10px; border-radius: 5px; font-size: 12px; }
            hr { border: none; border-top: 1px solid #ddd; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📋 Yeni Mesaj </h2>
              <p>${new Date().toLocaleString('tr-TR')}</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">🏢 Firma Adı</div>
                <div class="value">${company}</div>
              </div>
              
              <div class="field">
                <div class="label">🌍 Ülke</div>
                <div class="value">${country}</div>
              </div>
              
              <div class="field">
                <div class="label">👤 Yetkili Kişi</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">📞 Telefon</div>
                <div class="value">${phone}</div>
              </div>
              
              <div class="field">
                <div class="label">✉️ E-posta</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">🔧 İlgili Ürün</div>
                <div class="value"><span class="product-badge">${productLabel}</span></div>
              </div>
              
              <div class="field">
                <div class="label">💬 Talep / Mesaj</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
              
              ${file ? `
              <hr>
              <div class="field">
                <div class="label">📎 Ek Dosya</div>
                <div class="value">
                  <strong>${file.originalname}</strong><br>
                  <small>Boyut: ${(file.size / 1024).toFixed(2)} KB</small>
                </div>
              </div>
              ` : ''}
              
              <hr>
              <p style="font-size: 12px; color: #666; text-align: center;">
                Bu e-posta ${process.env.FORM_WEBSITE || 'TAMİS'} web sitesi üzerinden gönderilmiştir.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: attachments
    })

    // Geçici dosyayı temizle
    if (file && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path)
    }

    res.status(200).json({ 
      success: true, 
      message: 'Mail başarıyla gönderildi' 
    })

  } catch (error) {
    console.error('Hata:', error)
    
    // Hata durumunda dosyayı temizle
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }

    res.status(500).json({ 
      success: false, 
      message: 'Sunucu hatası, lütfen daha sonra tekrar deneyin' 
    })
  }
})

// Sağlık kontrolü
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Hata yönetimi middleware'i
app.use((err, req, res, next) => {
  console.error('Global hata:', err)
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'FILE_TOO_LARGE') {
      return res.status(400).json({ success: false, message: 'Dosya boyutu 10MB\'dan büyük olamaz' })
    }
    return res.status(400).json({ success: false, message: 'Dosya yükleme hatası' })
  }
  
  res.status(500).json({ success: false, message: 'Sunucu hatası' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📧 API endpoint: http://localhost:${PORT}/api/contact`)
})