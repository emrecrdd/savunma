import fs from 'fs'

const hostname = 'https://tamismakine.com.tr'

const routes = [
  '/',
  '/about',
  '/products',
  '/news',
  '/gallery',
  '/contact',
  '/en',
  '/en/about',
  '/en/products',
  '/en/news',
  '/en/gallery',
  '/en/contact'
]

const urls = routes.map(route => `
  <url>
    <loc>${hostname}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>
`).join('')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

fs.writeFileSync('./public/sitemap.xml', sitemap)

console.log('✅ Sitemap generated!')