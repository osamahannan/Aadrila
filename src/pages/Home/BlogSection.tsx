import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { DotGridV1, DotGridV2 } from '../../components/DotGrid'
import gradientShape from '../../assets/images/grdient-shape.png'
import leftArrow from '../../assets/icons/arrow-left-white.png'
import rightArrow from '../../assets/icons/arrow-right-white.png'

const blogPosts = [
  {
    id: 1,
    title: 'How AI is Revolutionizing Document Management for Enterprises',
    date: '24 July, 2023',
    excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and...',
  },
  {
    id: 2,
    title: 'Top 5 Fraud Prevention Strategies for Financial Institutions',
    date: '24 July, 2023',
    excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and...',
  },
  {
    id: 3,
    title: 'The Future of OCR: From Basic Extraction to AI-Driven Intelligence',
    date: '24 July, 2023',
    excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and...',
  },
]

// Animation states
type AnimationState = 'idle' | 'title-in' | 'content-in' | 'visible' | 'content-out' | 'title-out'

const BlogSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, {
    amount: 0.2,
    once: false,
  })

  const [animationState, setAnimationState] = useState<AnimationState>('idle')
  const [wasInView, setWasInView] = useState(false)

  // Handle view changes
  useEffect(() => {
    if (isInView && !wasInView) {
      // Reset to idle first, then start title-in
      setAnimationState('title-in')
    } else if (!isInView && wasInView) {
      setAnimationState('content-out')
    }
    setWasInView(isInView)
  }, [isInView, wasInView])

  // Auto-transition from title-in to content-in after a delay
  useEffect(() => {
    if (animationState === 'title-in') {
      const timer = setTimeout(() => {
        setAnimationState('content-in')
      }, 700) // Match the gradient animation duration + delays
      return () => clearTimeout(timer)
    }
  }, [animationState])

  // Auto-transition from content-in to visible after a delay
  useEffect(() => {
    if (animationState === 'content-in') {
      const timer = setTimeout(() => {
        setAnimationState('visible')
      }, 800) // Match the card animation duration + delays
      return () => clearTimeout(timer)
    }
  }, [animationState])

  // Auto-transition from content-out to title-out after a delay
  useEffect(() => {
    if (animationState === 'content-out') {
      const timer = setTimeout(() => {
        setAnimationState('title-out')
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [animationState])

  // Auto-transition from title-out to idle after a delay
  useEffect(() => {
    if (animationState === 'title-out') {
      const timer = setTimeout(() => {
        setAnimationState('idle')
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [animationState])

  // Determine what to show based on animation state
  const showTitle = ['title-in', 'content-in', 'visible', 'content-out', 'title-out'].includes(animationState)
  const showContent = ['content-in', 'visible', 'content-out'].includes(animationState)

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-16 md:py-0">
      {/* Dot patterns - Animate with content - hidden on mobile */}
      <div className="hidden lg:block absolute left-[50px] top-0">
        <DotGridV1 animation="left" delay={0.1} />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header - Animates first (top to bottom) */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ y: -60, opacity: 0 }}
          animate={showTitle ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-[#141219] font-heading mb-3 md:mb-4">
            Blogs
          </h2>
          <p
            className="text-[16px] md:text-[24px] max-w-[821px] mx-auto font-body bg-clip-text text-transparent px-4"
            style={{ backgroundImage: 'linear-gradient(90deg, #CD6028 11%, #3E6EB4 100%)' }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            <br className="hidden md:block" />
            Lorem Ipsum has been the industry's standard.
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          <div className="hidden lg:block absolute right-[-85px] top-0">
            <DotGridV2 animation="right" delay={0.2} />
          </div>
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              className="relative pb-12 md:pb-16"
            >
              {/* Gradient shape behind card at bottom - animates with title (first phase) */}
              <motion.div
                className="absolute bottom-0 left-[-15px] md:left-[-25px] right-[-15px] md:right-[-25px] h-[100px] md:h-[123px] z-0 pointer-events-none"
                initial={{ y: 40, opacity: 0 }}
                animate={showTitle ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                  delay: index * 0.1
                }}
              >
                <img
                  src={gradientShape}
                  alt=""
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>

              {/* Card content - position animates with gradient, opacity fades in after 700ms */}
              <motion.div
                className="relative max-w-full md:max-w-[387px] z-10 bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                initial={{ y: 50, opacity: 0 }}
                animate={showTitle ? { y: 25, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{
                  y: {
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: index * 0.1
                  },
                  opacity: {
                    duration: 0.4,
                    ease: 'easeOut',
                    delay: 0.7 + index * 0.1
                  }
                }}
              >
                {/* Content */}
                <div className="p-5 md:p-6">
                  <h3 className="text-[15px] md:text-[16px] font-bold text-[#141219] mb-2 font-heading leading-snug group-hover:text-[#3E6EB4] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#719AD0] text-[11px] md:text-[12px] mb-2 md:mb-3 font-body">{post.date}</p>
                  <p className="text-[#696969] text-[13px] md:text-[14px] line-clamp-4 md:line-clamp-5 font-body">
                    {post.excerpt}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Animate with content */}
        <motion.div
          className="flex justify-center gap-3 mt-8 md:mt-12"
          initial={{ y: 30, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        >
          <button className="w-10 h-10 rounded-lg bg-[#3E6EB4] text-white flex items-center justify-center hover:bg-[#3E6EB4]/90 transition-colors">
            <img src={leftArrow} alt="" />
          </button>
          <button className="w-10 h-10 rounded-lg bg-[#3E6EB4] text-white flex items-center justify-center hover:bg-[#3E6EB4]/90 transition-colors">
            <img src={rightArrow} alt="" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default BlogSection
