import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import NewsDetail from './pages/NewsDetail'
import ProductsDetail from './pages/ProductsDetail'
import About from './pages/About'
import Products from './pages/Products'
import News from './pages/News'
import Contact from './pages/Contact'
import WhatsappButton from "./components/WhatsappButton"
import Galeri from './pages/Galeri'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductsDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Galeri />} />

          </Routes>
        </main>
        <Footer />
        <WhatsappButton />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#fff',
              border: '1px solid #334155',
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App