import AnimatedSection from '../../components/AnimatedSection'
import lightBlueBackground from '../../assets/images/light-blue-background.svg'
import visionIcon from '../../assets/images/Vision_Icon.png'
import missionIcon from '../../assets/images/Mission_Icon.png'
import { ABOUT_CONTENT } from '../../constants'

const AboutHeroSection = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Light blue background - covers both hero and vision/mission */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src={lightBlueBackground} 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mx-auto relative z-10">
        {/* Hero Title */}
        <AnimatedSection direction="down" className="text-center mb-12 md:mb-20">
          {/* Title Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl py-6 md:py-10 px-6 md:px-16 inline-block border border-gray-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
            <h1 className="text-[28px] md:text-[48px] font-semibold text-[#141219] mb-3 md:mb-4">
              {ABOUT_CONTENT.hero.title}
            </h1>
            <p 
              className="text-[16px] md:text-[20px] font-body bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #CD6028 11%, #3E6EB4 100%)' }}
            >
              {ABOUT_CONTENT.hero.subtitle}
            </p>
          </div>
        </AnimatedSection>

        {/* Vision & Mission Section */}
        <div className="space-y-8 md:space-y-16">
          {/* Vision Card - Left aligned, right side rounded - stack on mobile */}
          <AnimatedSection direction="left" delay={0.1}>
            <div className="flex justify-center lg:justify-start">
              <div className="bg-white/60 lg:max-w-none lg:min-w-[849px] backdrop-blur-sm rounded-2xl lg:rounded-r-full lg:rounded-l-none py-4 md:py-3 px-4 md:pl-8 md:pr-3 border border-gray-200/50 lg:border-l-0 shadow-[0_4px_30px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row justify-center lg:justify-end items-center gap-4 md:gap-6">
                <p className="text-[#1E1C26]/70 text-[13px] md:text-[14px] leading-relaxed max-w-sm text-center lg:text-right font-body order-3 lg:order-1">
                  {ABOUT_CONTENT.vision.description}
                </p>
                <div className="flex items-center gap-3 md:gap-4 order-2">
                  <div className="h-10 md:h-12 w-[3px] bg-[#CD6028]" />
                  <div>
                    <h3 className="text-[18px] md:text-[22px] font-semibold text-[#141219] font-heading italic leading-tight">Our</h3>
                    <h3 className="text-[18px] md:text-[22px] font-semibold text-[#141219] font-heading italic leading-tight">Vision</h3>
                  </div>
                </div>
                {/* Circular icon container */}
                <div className="relative flex-shrink-0 order-1 lg:order-3">
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-[#3E6EB4] rounded-full flex items-center justify-center relative z-10 shadow-lg">
                    <img src={visionIcon} alt="Vision" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Mission Card - Right aligned, left side rounded - stack on mobile */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white/60 lg:max-w-none lg:min-w-[849px] backdrop-blur-sm rounded-2xl lg:rounded-l-full lg:rounded-r-none py-4 md:py-3 px-4 md:pr-8 md:pl-3 border border-gray-200/50 lg:border-r-0 shadow-[0_4px_30px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-4 md:gap-6">
                {/* Rounded square (diamond) icon container */}
                <div className="relative flex-shrink-0 order-1">
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-[#3E6EB4] rounded-full flex items-center justify-center relative z-10 shadow-lg">
                    <img src={missionIcon} alt="Mission" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4 order-2">
                  <div>
                    <h3 className="text-[18px] md:text-[22px] font-semibold text-[#141219] font-heading italic leading-tight">Our</h3>
                    <h3 className="text-[18px] md:text-[22px] font-semibold text-[#141219] font-heading italic leading-tight">Mission</h3>
                  </div>
                  <div className="h-10 md:h-12 w-[3px] bg-[#CD6028]" />
                </div>
                <p className="text-[#1E1C26]/70 text-[13px] md:text-[14px] leading-relaxed max-w-sm text-center lg:text-left font-body order-3">
                  {ABOUT_CONTENT.mission.description}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default AboutHeroSection
