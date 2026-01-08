import HeroSection from './HeroSection'
import IndustriesSection from './IndustriesSection'
import ProductsSection from './ProductsSection'
import BlogSection from './BlogSection'
import ContactSection from './ContactSection'

const Home = () => {
  return (
    <div className="overflow-hidden">
      <section id="home">
        <HeroSection />
      </section>
      <section id="industries">
        <IndustriesSection />
      </section>
      <section id="products">
        <ProductsSection />
      </section>
      <section id="blog">
        <BlogSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
    </div>
  )
}

export default Home
