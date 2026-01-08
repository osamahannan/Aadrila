import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/images/logo.png'

const navLinks = [
  { name: 'Home', path: '/', sectionId: 'home' },
  { name: 'Industries', path: '/', sectionId: 'industries' },
  { name: 'Products', path: '/', sectionId: 'products' },
  { name: 'Blog', path: '/', sectionId: 'blog' },
  { name: 'Contact Us', path: '/', sectionId: 'contact' },
  { name: 'About Us', path: '/about', sectionId: null },
]

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      
      // Update active section based on scroll position (only on home page)
      if (location.pathname === '/') {
        const sections = ['home', 'industries', 'products', 'blog', 'contact']
        for (const sectionId of sections.reverse()) {
          const element = document.getElementById(sectionId)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 150) {
              setActiveSection(sectionId)
              break
            }
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const handleNavClick = (link: typeof navLinks[0], e: React.MouseEvent) => {
    if (link.sectionId) {
      e.preventDefault()
      
      if (location.pathname !== '/') {
        // Navigate to home page first, then scroll
        navigate('/')
        setTimeout(() => {
          const element = document.getElementById(link.sectionId!)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      } else {
        // Already on home page, just scroll
        const element = document.getElementById(link.sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
      setIsMobileMenuOpen(false)
    }
  }

  const isActive = (link: typeof navLinks[0]) => {
    if (link.sectionId === null) {
      return location.pathname === link.path
    }
    return location.pathname === '/' && activeSection === link.sectionId
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md py-4"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Aadrila Technologies" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavClick(link, e)}
                className={`text-[16px] font-normal transition-colors leading-[18px] duration-200 hover:text-[#3E6EB4] font-body ${
                  isActive(link)
                    ? 'text-[#3E6EB4]' 
                    : 'text-[#1E1C26]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button className="px-9 py-4 bg-[#3E6EB4] text-white text-button rounded-full transition-all duration-300 hover:bg-[#3E6EB4]/90 hover:shadow-lg">
              Get a Demo
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 bg-white rounded-xl shadow-xl overflow-hidden"
            >
              <div className="py-4 px-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={(e) => handleNavClick(link, e)}
                    className={`block text-sm font-medium transition-colors duration-200 hover:text-[#CD6028] font-body ${
                      isActive(link)
                        ? 'text-[#CD6028]' 
                        : 'text-[#141219]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <button className="w-full mt-4 px-6 py-2.5 bg-[#3E6EB4] text-white text-button rounded-full transition-all duration-300 hover:bg-[#3E6EB4]/90">
                  Get a Demo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar
