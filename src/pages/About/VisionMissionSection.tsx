import AnimatedSection from '../../components/AnimatedSection'
import visionIcon from '../../assets/images/Vision_Icon.png'
import missionIcon from '../../assets/images/Mission_Icon.png'

const VisionMissionSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background curved arc on left */}
      <div className="absolute left-[-200px] top-0 w-[500px] h-[600px] pointer-events-none">
        <svg viewBox="0 0 500 600" fill="none" className="w-full h-full">
          <path
            d="M400,0 Q-100,300 400,600"
            stroke="#1E3A8A"
            strokeWidth="80"
            fill="none"
            opacity="0.08"
          />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="space-y-20">
          {/* Vision */}
          <AnimatedSection direction="left" delay={0.1}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
              <div className="flex-1 max-w-md text-right">
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  To redefine document management with cutting-edge technology that
                  ensures accuracy, efficiency, and trust.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-14 w-[3px] bg-[#F97316]" />
                <div>
                  <h3 className="text-[26px] font-bold text-gray-900 font-heading italic">Our</h3>
                  <h3 className="text-[26px] font-bold text-gray-900 font-heading italic">Vision</h3>
                </div>
              </div>
              <div className="w-20 h-20 bg-[#1E3A8A] rounded-full flex items-center justify-center">
                <img src={visionIcon} alt="Vision" className="w-10 h-10 object-contain" />
              </div>
            </div>
          </AnimatedSection>

          {/* Mission */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
              <div className="w-20 h-20 bg-[#1E3A8A] rounded-full flex items-center justify-center order-3 md:order-1">
                <img src={missionIcon} alt="Mission" className="w-10 h-10 object-contain" />
              </div>
              <div className="flex items-center gap-4 order-1 md:order-2">
                <div>
                  <h3 className="text-[26px] font-bold text-gray-900 font-heading italic">Our</h3>
                  <h3 className="text-[26px] font-bold text-gray-900 font-heading italic">Mission</h3>
                </div>
                <div className="h-14 w-[3px] bg-[#F97316]" />
              </div>
              <div className="flex-1 max-w-md text-left order-2 md:order-3">
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  To redefine document management with cutting-edge technology that
                  ensures accuracy, efficiency, and trust.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default VisionMissionSection
