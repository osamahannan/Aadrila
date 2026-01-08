import AnimatedSection from '../../components/AnimatedSection'
import DotPattern from '../../components/DotPattern'

const AboutContactSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gray-50">
      {/* Background decorative elements */}
      <div className="absolute left-0 top-20">
        <DotPattern className="opacity-30" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <AnimatedSection direction="left" delay={0.1}>
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-heading mb-4">
                  Contact Us
                </h2>
                <p className="text-secondary">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>
              </div>

              {/* Office Locations */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 mt-1">
                    <svg className="w-full h-full text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">U.S. Office</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Aadrila Technologies INC.<br />
                      8 The Green, Ste R, in the City of Dover County of Kent Zip Code 19901
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 mt-1">
                    <svg className="w-full h-full text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">India Office</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Aadrila Technologies Private Limited,<br />
                      Unit 707, Lotus Trade Centre, Sanakar Nagar, New Link Road, Near D.N.Nagar, Andheri<br />
                      West, Mumbai, Maharashtra 400053
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Content - Form */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-gray-500">
                  <option value="">Inquiry Type</option>
                  <option value="demo">Request Demo</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="support">Support</option>
                  <option value="partnership">Partnership</option>
                </select>

                <textarea
                  placeholder="Message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                />

                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-white font-semibold rounded-lg transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30"
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default AboutContactSection
