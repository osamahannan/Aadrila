import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { DotGridV1, DotGridV2 } from '../../components/DotGrid'
import circleShape from '../../assets/images/circle-left.png'
import insuranceIcon from '../../assets/images/Insurance_Icon.png'
import lendingIcon from '../../assets/images/Lending_Icon.png'
import healthcareIcon from '../../assets/images/Healthcare_Icon.png'
import { INDUSTRIES } from '../../constants'

// Map industry IDs to icons
const industryIcons: Record<string, string> = {
  insurance: insuranceIcon,
  lending: lendingIcon,
  healthcare: healthcareIcon,
}

// Animation states: 'idle' -> 'circle-in' -> 'content-in' -> 'visible' -> 'content-out' -> 'circle-out' -> 'idle'
type AnimationState = 'idle' | 'circle-in' | 'content-in' | 'visible' | 'content-out' | 'circle-out'

const IndustriesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { 
    amount: 0.2,
    once: false,
  })
  
  const [animationState, setAnimationState] = useState<AnimationState>('idle')
  const [wasInView, setWasInView] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(true)

  // Check for large screen
  useEffect(() => {
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024)
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  // Handle view changes
  useEffect(() => {
    if (isInView && !wasInView) {
      // Entering view - start circle animation
      setAnimationState('circle-in')
    } else if (!isInView && wasInView) {
      // Leaving view - start content out animation
      setAnimationState('content-out')
    }
    setWasInView(isInView)
  }, [isInView, wasInView])

  // Circle animation variants
  const circleVariants = {
    hidden: { 
      x: -500,
      opacity: 0 
    },
    visible: { 
      x: 100,
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: 'easeOut' 
      }
    },
    settled: {
      x: -80,
      opacity: 1,
      transition: { 
        duration: 1, 
        ease: 'easeOut' 
      }
    },
    exit: {
      x: -500,
      opacity: 0,
      transition: { 
        duration: 0.6, 
        ease: 'easeIn' 
      }
    }
  }

  // Title animation variants - responsive x position
  const titleVariants = {
    hidden: { 
      x: isLargeScreen ? -200 : 0,
      opacity: 0 
    },
    visible: { 
      x: isLargeScreen ? -100 : 0,
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: 'easeOut' 
      }
    },
    exit: {
      x: isLargeScreen ? -200 : 0,
      opacity: 0,
      transition: { 
        duration: 0.5, 
        ease: 'easeIn' 
      }
    }
  }

  // Determine what to show based on animation state
  const showContent = ['content-in', 'visible', 'content-out'].includes(animationState)
  
  // Get the current animate state for circle
  const getCircleAnimate = () => {
    if (animationState === 'circle-out') return 'exit'
    if (animationState === 'circle-in') return 'visible'
    if (['content-in', 'visible', 'content-out'].includes(animationState)) return 'settled'
    return 'hidden'
  }

  // Get the current animate state for content
  const getContentAnimate = () => {
    if (animationState === 'content-out') return 'exit'
    if (showContent) return 'visible'
    return 'hidden'
  }

  // Handle animation completions
  const handleCircleAnimationComplete = () => {
    if (animationState === 'circle-in') {
      setAnimationState('content-in')
    } else if (animationState === 'circle-out') {
      setAnimationState('idle')
    }
  }

  const handleContentAnimationComplete = () => {
    if (animationState === 'content-in') {
      setAnimationState('visible')
    } else if (animationState === 'content-out') {
      setAnimationState('circle-out')
    }
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-28 relative bg-white min-h-[600px] md:min-h-[800px]">
      {/* Background Circle Shape - Animates first - hidden on mobile */}
      <motion.div 
        className="absolute w-[400px] h-[400px] md:w-[800px] md:h-[800px] pointer-events-none hidden md:block"
        variants={circleVariants}
        initial="hidden"
        animate={getCircleAnimate()}
        onAnimationComplete={handleCircleAnimationComplete}
        style={{ 
          left: '-50px',
          top: '-50px',
        }}
      >
        <img src={circleShape} alt="" className="w-full h-full object-contain" />
      </motion.div>

      {/* Dot patterns - Animate with content - hidden on mobile */}
      <div className="hidden lg:block absolute right-[26.5%] top-[20%]">
        <DotGridV1 animation="up" delay={0.2} show={showContent} />
      </div>
      <div className="hidden lg:block absolute right-0 bottom-[10%]">
        <DotGridV2 animation="right" delay={0.3} show={showContent} />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header - Animates after circle */}
        <motion.div 
          className="mb-10 md:mb-16 text-center lg:text-left px-4 md:px-0"
          variants={titleVariants}
          initial="hidden"
          animate={getContentAnimate()}
          onAnimationComplete={handleContentAnimationComplete}
        >
          <p 
            className="text-[18px] md:text-[24px] font-bold mb-3 md:mb-4 tracking-wide font-body bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(90deg, #CD6028 11%, #3E6EB4 100%)' }}
          >
            AI-driven innovation for growth.
          </p>
          <h2 className="text-[32px] md:text-[48px] text-[#141219] font-heading font-semibold leading-tight">
            Industries We Empower
          </h2>
        </motion.div>

        {/* Industries Cards - Animate after circle */}
        <div className="relative flex flex-col md:flex-row flex-wrap justify-center lg:justify-between items-center md:items-start gap-6 md:gap-8 lg:gap-4 pt-6 md:pt-10">
          {INDUSTRIES.map((industry) => (
            <motion.div
              key={industry.id}
              className="relative"
              initial={industry.initialPosition}
              animate={showContent ? {
                opacity: 1, 
                x: 0,
                y: isLargeScreen ? industry.finalPosition.y : 0,
              } : industry.initialPosition}
              transition={{ 
                duration: 1, 
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <div className="w-[260px] h-[260px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] p-6 md:p-8 flex flex-col gap-3 md:gap-4 items-center justify-center text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16">
                  <img src={industryIcons[industry.id]} alt={industry.title} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-[20px] md:text-[24px] font-semibold text-[#141219] font-heading">
                  {industry.title}
                </h3>
                <p className="text-[#696969] text-[14px] md:text-[16px] font-body font-medium">
                  {industry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IndustriesSection
