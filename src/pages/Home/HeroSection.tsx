import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '../../components/AnimatedSection'
import blueBackground from '../../assets/images/blue-background.png'
import licenseImg from '../../assets/images/License.png'
import docImg from '../../assets/images/doc.png'
import invoiceImg from '../../assets/images/Invocie.png'

const documents = [
  { id: 0, src: invoiceImg, alt: 'Invoice' },
  { id: 1, src: licenseImg, alt: 'Driver License' },
  { id: 2, src: docImg, alt: 'Document with chart' },
]

// Position configurations for the carousel (desktop)
const desktopPositions = {
  left: { x: -245, scale: 0.55, zIndex: 10, opacity: 1 },
  center: { x: 0, scale: 1.1, zIndex: 30, opacity: 1 },
  right: { x: 245, scale: 0.55, zIndex: 10, opacity: 1 },
}

// Position configurations for mobile
const mobilePositions = {
  left: { x: -120, scale: 0.5, zIndex: 10, opacity: 0.8 },
  center: { x: 0, scale: 1, zIndex: 30, opacity: 1 },
  right: { x: 120, scale: 0.5, zIndex: 10, opacity: 0.8 },
}

type DocPosition = 'left' | 'center' | 'right'

const DocumentCarousel = () => {
  // Track which document is at which position
  const [docPositions, setDocPositions] = useState<DocPosition[]>(['left', 'center', 'right'])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(true)
  const [scanDirection, setScanDirection] = useState<'down' | 'up'>('down')
  const [scanOpacity, setScanOpacity] = useState(0) // Start at 0 for fade in
  const [scanPhase, setScanPhase] = useState<'fadeIn' | 'scanning' | 'fadeOut'>('fadeIn')
  // Track which doc is moving from left to right (behind)
  const [movingBehindIndex, setMovingBehindIndex] = useState<number | null>(null)
  // Responsive positions
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const positions = isMobile ? mobilePositions : desktopPositions

  useEffect(() => {
    if (isScanning && !isTransitioning) {
      const fadeDuration = 300 // Fade in/out duration
      const scanDuration = 2000 // 2 seconds per direction
      const startTime = Date.now()
      
      const animateScan = () => {
        const elapsed = Date.now() - startTime
        
        if (scanPhase === 'fadeIn') {
          // Fade in at the start
          const opacity = Math.min(elapsed / fadeDuration, 1)
          setScanOpacity(opacity)
          
          if (opacity < 1) {
            requestAnimationFrame(animateScan)
          } else {
            // Fade in complete, start scanning
            setScanPhase('scanning')
          }
        } else if (scanPhase === 'scanning') {
          if (scanDirection === 'down') {
            const progress = Math.min((elapsed / scanDuration) * 100, 100)
            setScanProgress(progress)
            
            if (progress < 100) {
              requestAnimationFrame(animateScan)
            } else {
              // First scan complete, reverse direction
              setScanDirection('up')
            }
          } else {
            // Scanning up
            const progress = Math.max(100 - (elapsed / scanDuration) * 100, 0)
            setScanProgress(progress)
            
            if (progress > 0) {
              requestAnimationFrame(animateScan)
            } else {
              // Scan complete, start fade out
              setScanPhase('fadeOut')
            }
          }
        } else if (scanPhase === 'fadeOut') {
          // Fade out at the end
          const opacity = Math.max(1 - (elapsed / fadeDuration), 0)
          setScanOpacity(opacity)
          
          if (opacity > 0) {
            requestAnimationFrame(animateScan)
          } else {
            // Fade out complete, transition to next doc
            setTimeout(() => {
              setIsScanning(false)
              setScanDirection('down')
              setScanPhase('fadeIn')
              setScanOpacity(0) // Reset for next fade in
              // Find which doc is on left (will move behind)
              const leftDocIdx = docPositions.findIndex(pos => pos === 'left')
              setMovingBehindIndex(leftDocIdx)
              setIsTransitioning(true)
            }, 200)
          }
        }
      }
      
      requestAnimationFrame(animateScan)
    }
  }, [isScanning, isTransitioning, docPositions, scanDirection, scanPhase])

  useEffect(() => {
    if (isTransitioning) {
      // After transition animation completes, update positions
      setTimeout(() => {
        setDocPositions(prev => {
          // Rotate positions: center -> left, right -> center, left -> right
          const newPositions: DocPosition[] = [...prev]
          prev.forEach((pos, idx) => {
            if (pos === 'center') newPositions[idx] = 'left'
            else if (pos === 'right') newPositions[idx] = 'center'
            else if (pos === 'left') newPositions[idx] = 'right'
          })
          return newPositions
        })
        setScanProgress(0)
        setMovingBehindIndex(null)
        setIsTransitioning(false)
        // Add delay before starting next scan
        setTimeout(() => {
          setIsScanning(true)
        }, 500)
      }, 1200) // Match the transition duration
    }
  }, [isTransitioning])

  const getPositionStyles = (docIndex: number) => {
    const pos = docPositions[docIndex]
    
    if (isTransitioning) {
      // During transition: move to next position
      if (pos === 'center') {
        // Center scales down and moves to left
        return { ...positions.left }
      } else if (pos === 'right') {
        // Right scales up and moves to center
        return { ...positions.center }
      } else if (pos === 'left') {
        // Left moves smoothly to right position (goes behind - lower z-index)
        return { x: 245, scale: 0.55, zIndex: 5, opacity: 1 }
      }
    }
    
    return positions[pos]
  }

  return (
    <div className="relative w-full h-[350px] md:h-[550px] flex items-center justify-center">
      <div className="relative w-[300px] md:w-[600px] h-[280px] md:h-[450px] flex items-center justify-center">
        {documents.map((doc, index) => {
          const posStyles = getPositionStyles(index)
          const currentPos = docPositions[index]
          const isCenter = currentPos === 'center' && !isTransitioning
          const isMovingBehind = movingBehindIndex === index && isTransitioning
          
          // Determine blur based on current and transitioning state
          // Center doc leaving → add blur, Right doc coming to center → remove blur
          const isMovingToCenter = currentPos === 'right' && isTransitioning
          const shouldBeBlurred = !isCenter && !isMovingToCenter
          
          return (
            <motion.div
              key={doc.id}
              className="absolute"
              animate={{
                x: posStyles.x,
                scale: posStyles.scale,
                opacity: posStyles.opacity,
                filter: shouldBeBlurred ? 'blur(2px)' : 'blur(0px)',
              }}
              transition={{ 
                duration: 1.2, 
                ease: [0.4, 0, 0.2, 1],
                scale: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
                filter: { duration: 1.0, ease: [0.4, 0, 0.2, 1] },
              }}
              style={{
                zIndex: isMovingBehind ? 5 : posStyles.zIndex,
              }}
            >
              <div className={`relative w-[150px] md:w-[250px] rounded-2xl ${doc.id === 0 ? 'bg-white' : 'bg-transparent'}`}>
                <img
                  src={doc.src}
                  alt={doc.alt}
                  className={`w-full object-cover ${doc.id === 1 ? 'h-[375px]': 'h-auto'}`}
                />
                {isCenter && isScanning && (
                  <div
                    className="absolute left-[-10px] right-[-10px] h-[3px] z-20 pointer-events-none transition-opacity"
                    style={{
                      top: `${scanProgress}%`,
                      opacity: scanOpacity,
                      background: 'linear-gradient(90deg, transparent 0%, #06b6d4 20%, #a855f7 50%, #06b6d4 80%, transparent 100%)',
                      boxShadow: `0 0 15px 4px rgba(168, 85, 247, ${0.7 * scanOpacity}), 0 0 30px 8px rgba(6, 182, 212, ${0.5 * scanOpacity})`,
                    }}
                  />
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-24 md:pt-28 pb-12 md:pb-20 overflow-hidden bg-white">
      {/* Blue Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src={blueBackground} 
          alt="" 
          className="w-full h-full object-cover"
        />
        {/* Fade gradient at bottom to blend with white background */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.9) 70%, white 100%)',
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center min-h-[calc(100vh-140px)]">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6 text-center lg:text-left">
            <AnimatedSection direction="left" delay={0.1}>
              <h1 className="font-heading leading-[1.15]">
                <span 
                  className="text-[28px] sm:text-[36px] md:text-[48px] font-bold block bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #CD6028 11%, #3E6EB4 100%)' }}
                >
                  AI-Powered
                </span>
                <span className="text-[#141219] text-[26px] sm:text-[32px] md:text-[48px] font-bold block mt-1">Document Automation</span>
                <span className="text-[#141219] text-[26px] sm:text-[32px] md:text-[48px] font-bold block">& Fraud Detection</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.2}>
              <p className="text-[16px] md:text-[20px] text-[#1E1C26] max-w-[536px] mx-auto lg:mx-0 leading-relaxed font-body">
                Enhance security, accuracy, and efficiency with our
                cutting-edge AI solutions for seamless document
                processing and fraud prevention.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.3}>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-[10px] justify-center lg:justify-start">
                <button className="w-full sm:w-auto min-w-[200px] md:min-w-[250px] py-3 md:py-4 bg-[#3E6EB4] text-white text-button rounded-full transition-all duration-300 hover:bg-[#3E6EB4]/90 hover:shadow-lg">
                  Get a Demo
                </button>
                <button className="w-full sm:w-auto min-w-[200px] md:min-w-[250px] py-3 md:py-4 bg-[#3E6EB4] text-white text-button rounded-full transition-all duration-300 hover:bg-[#3E6EB4]/90 hover:shadow-lg">
                  Explore Solutions
                </button>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Content - Document Scanning Carousel */}
          <AnimatedSection direction="right" delay={0.4} className="relative">
            <DocumentCarousel />
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
