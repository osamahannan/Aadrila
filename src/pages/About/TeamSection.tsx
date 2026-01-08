import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import DotPattern from '../../components/DotPattern'
import profilePic1 from '../../assets/images/profile_pic1.png'
import profilePic2 from '../../assets/images/profile_pic2.png'
import profilePic3 from '../../assets/images/profile_pic3.png'
import circleLeft from '../../assets/images/circle-left.png'
import leftArrowWhite from '../../assets/icons/arrow-left-white.png'
import leftArrowBlack from '../../assets/icons/arrow-left-black.png'
import rightArrowWhite from '../../assets/icons/arrow-right-white.png'
import rightArrowBlack from '../../assets/icons/arrow-right-black.png'

const teamMembers = [
  {
    id: 1,
    name: 'MANSI SHUKLA',
    role: 'CEO FutureSphere',
    image: profilePic1,
    quote: 'For this time-constrained generation in a NOW economy, we would want to play our parts. We intend to make Banking not feel out of place.',
  },
  {
    id: 2,
    name: 'MANSI SHUKLA',
    role: 'CEO FutureSphere',
    image: profilePic2,
    quote: 'For this time-constrained generation in a NOW economy, we would want to play our parts. We intend to make Banking not feel out of place.',
  },
  {
    id: 3,
    name: 'MANSI SHUKLA',
    role: 'CEO FutureSphere',
    image: profilePic3,
    quote: 'For this time-constrained generation in a NOW economy, we would want to play our parts. We intend to make Banking not feel out of place.',
  },
]

// Animation states
type AnimationState = 'idle' | 'circle-in' | 'content-in' | 'visible' | 'content-out' | 'circle-out'

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0) // Start at first member
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { 
    amount: 0.2,
    once: false,
  })
  
  const [animationState, setAnimationState] = useState<AnimationState>('idle')
  const [wasInView, setWasInView] = useState(false)

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle view changes
  useEffect(() => {
    if (isInView && !wasInView) {
      setAnimationState('circle-in')
    } else if (!isInView && wasInView) {
      setAnimationState('content-out')
    }
    setWasInView(isInView)
  }, [isInView, wasInView])

  // Timer-based state transitions
  useEffect(() => {
    if (animationState === 'circle-in') {
      const timer = setTimeout(() => setAnimationState('content-in'), 800)
      return () => clearTimeout(timer)
    }
  }, [animationState])

  useEffect(() => {
    if (animationState === 'content-in') {
      const timer = setTimeout(() => setAnimationState('visible'), 800)
      return () => clearTimeout(timer)
    }
  }, [animationState])

  useEffect(() => {
    if (animationState === 'content-out') {
      const timer = setTimeout(() => setAnimationState('circle-out'), 500)
      return () => clearTimeout(timer)
    }
  }, [animationState])

  useEffect(() => {
    if (animationState === 'circle-out') {
      const timer = setTimeout(() => setAnimationState('idle'), 600)
      return () => clearTimeout(timer)
    }
  }, [animationState])

  const isAtStart = activeIndex === 0
  const isAtEnd = activeIndex === teamMembers.length - 1

  const handlePrev = () => {
    if (isAnimating || isAtStart) return
    setIsAnimating(true)
    setActiveIndex((prev) => prev - 1)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const handleNext = () => {
    if (isAnimating || isAtEnd) return
    setIsAnimating(true)
    setActiveIndex((prev) => prev + 1)
    setTimeout(() => setIsAnimating(false), 600)
  }

  // All members are always visible - calculate position relative to active index
  const getRelativePosition = (index: number) => {
    return index - activeIndex // negative = left of center, 0 = center, positive = right of center
  }

  // Circle animation variants
  const circleVariants = {
    hidden: { x: -500, opacity: 0 },
    visible: { 
      x: 100,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
    settled: {
      x: -80,
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut' }
    },
    exit: {
      x: -500,
      opacity: 0,
      transition: { duration: 0.6, ease: 'easeIn' }
    }
  }

  // Title animation variants (top to bottom)
  const titleVariants = {
    hidden: { y: -60, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    exit: {
      y: -60,
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeIn' }
    }
  }

  // Content animation variants (bottom to top)
  const contentVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    exit: {
      y: 60,
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeIn' }
    }
  }

  // Dot pattern animation variants
  const dotVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  }

  // Get animation states
  const showContent = ['content-in', 'visible', 'content-out'].includes(animationState)
  
  const getCircleAnimate = () => {
    if (animationState === 'circle-out') return 'exit'
    if (animationState === 'circle-in') return 'visible'
    if (['content-in', 'visible', 'content-out'].includes(animationState)) return 'settled'
    return 'hidden'
  }

  const getContentAnimate = () => {
    if (animationState === 'content-out') return 'exit'
    if (showContent) return 'visible'
    return 'hidden'
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-12 md:py-0">
      {/* Circle animation from left - like IndustriesSection - hidden on mobile */}
      <motion.div
        className="absolute left-[-193px] top-0 max-w-[761px] max-h-[761px] pointer-events-none z-0 hidden md:block"
        variants={circleVariants}
        initial="hidden"
        animate={getCircleAnimate()}
      >
        <img 
          src={circleLeft} 
          alt="" 
          className="w-full h-full object-contain opacity-80"
        />
      </motion.div>

      {/* Background decorative elements - Dot pattern - hidden on mobile */}
      <motion.div 
        className="hidden lg:block absolute right-[5%] top-[20%]"
        variants={dotVariants}
        initial="hidden"
        animate={getContentAnimate()}
      >
        <DotPattern className="opacity-40" />
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header - animates from top to bottom */}
        <motion.div 
          className="text-center mb-6 md:mb-8"
          variants={titleVariants}
          initial="hidden"
          animate={getContentAnimate()}
        >
          <h2 className="text-[28px] md:text-[42px] lg:text-[48px] font-semibold text-[#141219] font-heading">
            Meet our team
          </h2>
          <p 
            className="max-w-[841px] mx-auto text-[16px] md:text-[24px] font-body bg-clip-text text-transparent px-4"
            style={{ backgroundImage: 'linear-gradient(90deg, #CD6028 11%, #3E6EB4 100%)' }}
          >
            Meet our passionate and talented team, committed to delivering exceptional
            results, driving innovation, and transforming your vision into reality.
          </p>
        </motion.div>

        {/* Navigation Arrows and Team Carousel - animates from bottom to top */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={getContentAnimate()}
        >
          {/* Navigation Arrows */}
          <div className="flex justify-center gap-2 md:gap-3 mb-8 md:mb-12">
            <button
              onClick={handlePrev}
              disabled={isAtStart}
              className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all duration-300 bg-[#3E6EB4] ${
                isAtStart
                  ? 'cursor-not-allowed'
                  : 'hover:bg-[#3E6EB4]/90'
              }`}
            >
              <img 
                src={isAtStart ? leftArrowBlack : leftArrowWhite} 
                alt="Previous" 
                className="w-4 h-4 md:w-5 md:h-5 transition-opacity duration-300"
              />
            </button>
            <button
              onClick={handleNext}
              disabled={isAtEnd}
              className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all duration-300 bg-[#3E6EB4] ${
                isAtEnd
                  ? 'cursor-not-allowed'
                  : 'hover:bg-[#3E6EB4]/90'
              }`}
            >
              <img 
                src={isAtEnd ? rightArrowBlack : rightArrowWhite} 
                alt="Next" 
                className="w-4 h-4 md:w-5 md:h-5 transition-opacity duration-300"
              />
            </button>
          </div>

          {/* Team Members Carousel - All profiles visible, positioned horizontally */}
          <div className="relative min-h-[450px] md:min-h-[550px] lg:min-h-[600px]">
            <div className="flex justify-center items-start pt-4 md:pt-8">
              {teamMembers.map((member, index) => {
                const relativePos = getRelativePosition(index)
                const isCenter = relativePos === 0
                
                // Responsive values based on screen size
                // Mobile: smaller sizes and gaps
                // Desktop: original sizes
                
                // Calculate horizontal position based on relative position
                // Desktop: Center item is 250px wide, side items are 140px wide
                // Mobile: Center item is 150px wide, side items are 80px wide
                const centerHalf = isMobileView ? 75 : 130
                const sideHalf = isMobileView ? 40 : 70
                const gap = isMobileView ? 30 : 80
                
                // Calculate x offset based on position
                let xOffset = 0
                if (relativePos !== 0) {
                  // Distance from center to first side item = centerHalf + gap + sideHalf
                  const firstOffset = centerHalf + gap + sideHalf
                  // Additional items are spaced by sideItem + gap
                  const additionalOffset = (sideHalf * 2) + gap
                  
                  if (relativePos > 0) {
                    xOffset = firstOffset + (relativePos - 1) * additionalOffset
                  } else {
                    xOffset = -firstOffset + (relativePos + 1) * additionalOffset
                  }
                }
                
                // Calculate vertical offset to align items at the same visual center
                const yOffset = isCenter ? 0 : (isMobileView ? 35 : 60)
                
                // Responsive sizes for center and side items
                const centerSize = isMobileView ? 150 : 250
                const sideSize = isMobileView ? 80 : 140
                
                return (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{
                      x: xOffset,
                      y: yOffset,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                      mass: 1,
                    }}
                    className="flex flex-col items-center absolute"
                    style={{ 
                      zIndex: isCenter ? 10 : 5 - Math.abs(relativePos),
                    }}
                  >
                    {/* Profile Image */}
                    <motion.div
                      animate={{
                        width: isCenter ? centerSize : sideSize,
                        height: isCenter ? centerSize : sideSize,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                        mass: 1,
                      }}
                      className={`rounded-full overflow-hidden ${
                        isCenter
                          ? 'border-[1px] border-[#CD6028]'
                          : ''
                      }`}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    {/* Info Card - Only visible for center item */}
                    <AnimatePresence mode="wait">
                      {isCenter && (
                        <motion.div
                          key={`info-${index}`}
                          initial={{ 
                            opacity: 0, 
                            scale: 0.8,
                            y: -20 
                          }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1,
                            y: 0 
                          }}
                          exit={{ 
                            opacity: 0, 
                            scale: 0.8,
                            y: -20 
                          }}
                          transition={{
                            duration: 0.3,
                            ease: 'easeOut',
                          }}
                          className="mt-3 md:mt-4 w-[280px] sm:w-[320px] md:w-[600px] lg:w-[900px]"
                        >
                          {/* Arrow pointer */}
                          <div className="flex justify-center">
                            <div className="w-0 h-0 border-l-[15px] md:border-l-[20px] border-l-transparent border-r-[15px] md:border-r-[20px] border-r-transparent border-b-[15px] md:border-b-[20px] border-b-[#3E6EB4]" />
                          </div>
                          <div className="bg-[#3E6EB4] rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-10 text-center text-white shadow-2xl">
                            <h3 className="text-lg md:text-xl lg:text-3xl font-semibold mb-1 md:mb-2 font-heading tracking-wide">
                              {member.name}
                            </h3>
                            <p className="text-[#CD6028] text-sm md:text-base lg:text-lg mb-2 md:mb-4 lg:mb-6 italic font-body">
                              {member.role}
                            </p>
                            <p className="text-white/90 leading-relaxed text-xs md:text-sm lg:text-[15px] max-w-2xl mx-auto font-body">
                              {member.quote}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TeamSection
