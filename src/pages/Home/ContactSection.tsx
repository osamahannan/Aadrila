import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AnimatedSection from '../../components/AnimatedSection'
import { DotGridV2 } from '../../components/DotGrid'
import locationIcon from '../../assets/icons/location-icon.png'
import { OFFICE_LOCATIONS, FOOTER_INFO, SECTION_HEADERS, CONTACT_FORM_FIELDS } from '../../constants'

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { 
    amount: 0.3,
    once: false,
  })

  return (
    <section ref={sectionRef} className="pt-4 relative overflow-visible bg-white">
      {/* White content area */}
      <div className="pt-16 md:pt-28 pb-0 relative">
        {/* Dot patterns - hidden on mobile */}
        <div className="hidden lg:block absolute left-[-130px] top-4">
          <DotGridV2 animation="diagonal-top-left" delay={0.2} />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Left Content */}
            <AnimatedSection direction="left" delay={0.1} duration={0.9}>
              <div className="space-y-6 md:space-y-8 pb-8 md:pb-48">
                <div className='max-w-[536px] mx-auto lg:mx-0 text-center lg:text-left'>
                  <h2 className="text-[32px] md:text-[48px] font-semibold text-[#141219] font-heading mb-3 md:mb-4">
                    {SECTION_HEADERS.contact.title}
                  </h2>
                  <p 
                    className="text-[16px] md:text-[20px] leading-relaxed font-body bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(90deg, #CD6028 11%, #3E6EB4 100%)' }}
                  >
                    {SECTION_HEADERS.contact.subtitle}
                  </p>
                </div>

                {/* Office Locations */}
                <div className="space-y-4 md:space-y-6 pt-2 md:pt-4">
                  {OFFICE_LOCATIONS.map((office) => (
                    <div key={office.id} className="flex items-start gap-3 text-left">
                      <div className="w-[11px] h-4 mt-1.5 flex-shrink-0">
                        <img src={locationIcon} alt="location-icon" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#141219] text-[14px] md:text-[16px] underline font-heading">{office.title}</h4>
                        <p className="text-[#000000] text-[12px] md:text-[14px] mt-1 leading-relaxed font-body">
                          {office.company}<br />
                          {office.address}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Right Content - Form - positioned to overlap footer */}
            <div className="relative z-30">
              <AnimatedSection direction="up" delay={0.3} duration={0.9}>
                <div className="bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] p-5 md:p-8 mb-[-80px] md:mb-[-120px]">
                  <form className="space-y-4 md:space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                      <input
                        type="text"
                        placeholder={CONTACT_FORM_FIELDS.fullName}
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E6EB4]/20 focus:border-[#3E6EB4] transition-colors text-[15px] placeholder:text-gray-400 font-body"
                      />
                      <input
                        type="email"
                        placeholder={CONTACT_FORM_FIELDS.email}
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E6EB4]/20 focus:border-[#3E6EB4] transition-colors text-[15px] placeholder:text-gray-400 font-body"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                      <input
                        type="tel"
                        placeholder={CONTACT_FORM_FIELDS.phone}
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E6EB4]/20 focus:border-[#3E6EB4] transition-colors text-[15px] placeholder:text-gray-400 font-body"
                      />
                      <input
                        type="text"
                        placeholder={CONTACT_FORM_FIELDS.company}
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E6EB4]/20 focus:border-[#3E6EB4] transition-colors text-[15px] placeholder:text-gray-400 font-body"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder={CONTACT_FORM_FIELDS.inquiryType}
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E6EB4]/20 focus:border-[#3E6EB4] transition-colors text-[15px] placeholder:text-gray-400 bg-white font-body"
                    />

                    <textarea
                      placeholder={CONTACT_FORM_FIELDS.message}
                      rows={10}
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E6EB4]/20 focus:border-[#3E6EB4] transition-colors resize-none text-[15px] placeholder:text-gray-400 font-body"
                    />

                    <button
                      type="submit"
                      className="w-full py-3 md:py-4 bg-[#3E6EB4] text-white text-button rounded-full transition-all duration-300 hover:bg-[#3E6EB4]/90 hover:shadow-lg"
                    >
                      {CONTACT_FORM_FIELDS.submitButton}
                    </button>
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - animates from bottom up behind the form */}
      <motion.footer 
        className="bg-[#3E6EB4] text-white pt-28 md:pt-40 pb-8 md:pb-10 relative z-10 -mt-10 md:-mt-14"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.5,
          ease: [0.25, 0.1, 0.25, 1] 
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-6 md:pt-8">
          {/* Copyright and Company Info */}
          <div className="space-y-3 md:space-y-4 text-center lg:text-left">
            <p className="text-[12px] md:text-[14px] text-white font-body">
              {FOOTER_INFO.copyright}
            </p>
            <div className="text-[12px] md:text-[14px] text-white leading-relaxed font-body">
              <p>{FOOTER_INFO.registeredAddress.line1}</p>
              <p>{FOOTER_INFO.registeredAddress.line2}</p>
            </div>
          </div>
        </div>
      </motion.footer>
    </section>
  )
}

export default ContactSection
