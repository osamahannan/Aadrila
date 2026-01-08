import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { DotGridV1, DotGridV2 } from '../../components/DotGrid'
import circleRight from '../../assets/images/circle-right.png'
import circleLeft from '../../assets/images/circle-left.png'
import productsImg from '../../assets/images/products.png'
import workflowsImg from '../../assets/images/workflows.png'
import validateImg from '../../assets/images/validate.png'
import { PRODUCTS, SECTION_HEADERS } from '../../constants'

// Map product IDs to images and circles
const productImages: Record<string, string> = {
  docsim: productsImg,
  docpilot: workflowsImg,
  doxtract: validateImg,
}

const productCircles: Record<string, string> = {
  docsim: circleRight,
  docpilot: circleLeft,
  doxtract: circleRight,
}

// Animation states: 'idle' -> 'circle-in' -> 'content-in' -> 'visible' -> 'content-out' -> 'circle-out' -> 'idle'
type AnimationState = 'idle' | 'circle-in' | 'content-in' | 'visible' | 'content-out' | 'circle-out'

// Product Section with sequenced animation: Circle first, then content
const ProductBlock = ({
  productName,
  title,
  features,
  benefits,
  buttonColor,
  productImage,
  circleImage,
  imageOnRight = true,
  dotGrid,
}: {
  productName: string
  title: string
  features: string[]
  benefits: string[]
  buttonColor: string
  productImage: string
  circleImage: string
  imageOnRight?: boolean
  dotGrid?: React.ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: '-100px 0px -100px 0px' })
  const [animationState, setAnimationState] = useState<AnimationState>('idle')
  const [wasInView, setWasInView] = useState(false)

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
      x: imageOnRight ? 200 : -200,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 0.6,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    },
    settled: {
      x: imageOnRight ? 50 : -50,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    },
    exit: {
      x: imageOnRight ? 200 : -200,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: 'easeIn'
      }
    }
  }

  // Content animation variants
  const contentVariants = {
    hidden: {
      x: imageOnRight ? -60 : 60,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    },
    exit: {
      x: imageOnRight ? -60 : 60,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: 'easeIn'
      }
    }
  }

  // Image animation variants
  const imageVariants = {
    hidden: {
      x: imageOnRight ? 60 : -60,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    },
    exit: {
      x: imageOnRight ? 60 : -60,
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

  const Content = (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate={getContentAnimate()}
      onAnimationComplete={handleContentAnimationComplete}
      className="space-y-4 md:space-y-5 text-center lg:text-left"
    >
      <span
        className="inline-block px-4 md:px-6 py-3 md:py-4 text-white text-[16px] md:text-[20px] font-semibold rounded-full text-button"
        style={{ background: 'linear-gradient(90deg, #CD6028 11%, #3E6EB4 100%)' }}
      >
        {productName}
      </span>
      <h3 className="text-[24px] md:text-[28px] lg:text-[32px] max-w-[600px] mx-auto lg:mx-0 font-bold text-[#141219] font-heading leading-tight">
        {title}
      </h3>

      <div className="space-y-3 md:space-y-4">
        <div>
          <h4 className="text-[18px] md:text-[20px] font-bold text-[#696969] mb-1 font-heading">Features:</h4>
          <ul className="space-y-1 md:space-y-1.5">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-[#696969] text-[14px] md:text-[15px] font-body justify-center lg:justify-start">
                <span className="text-gray-400 mt-0.5">•</span>
                <span className="text-left">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[18px] md:text-[20px] font-bold text-[#696969] mb-1 font-heading">Benefits:</h4>
          <ul className="space-y-1 md:space-y-1.5">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2 text-[#1E1C26]/70 text-[14px] md:text-[15px] font-body justify-center lg:justify-start">
                <span className="text-gray-400 mt-0.5">•</span>
                <span className="text-left">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-3 md:pt-4 justify-center lg:justify-start">
        <button
          className="px-6 md:px-9 py-3 md:py-4 text-white text-button rounded-full transition-all duration-300 hover:shadow-lg"
          style={{ backgroundColor: buttonColor }}
        >
          Learn More
        </button>
        <button
          className="px-5 md:px-7 py-2.5 md:py-3 text-white text-button rounded-full transition-all duration-300 hover:shadow-lg"
          style={{ backgroundColor: buttonColor }}
        >
          Schedule a Demo
        </button>
      </div>
    </motion.div>
  )

  const ImageWithCircle = (
    <div className="relative flex justify-center">
      {/* Animated Circle Behind - animates first on enter, last on exit - hidden on mobile */}
      <motion.div
        className="absolute -z-10 pointer-events-none hidden md:block"
        variants={circleVariants}
        initial="hidden"
        animate={getCircleAnimate()}
        onAnimationComplete={handleCircleAnimationComplete}
        style={{
          width: '761px',
          height: '761px',
          top: -110,
          ...(imageOnRight
            ? { right: '-150px' }
            : { left: '-150px' }
          ),
        }}
      >
        <img
          src={circleImage}
          alt=""
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Product Image - animates after circle on enter, before circle on exit */}
      <motion.img
        src={productImage}
        alt={productName}
        className="w-full max-w-[400px] lg:max-w-none h-auto rounded-2xl relative z-10"
        variants={imageVariants}
        initial="hidden"
        animate={getContentAnimate()}
      />
    </div>
  )

  return (
    <div ref={containerRef} className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-32">
      {/* DotGrid for this product section */}
      {dotGrid}
      {imageOnRight ? (
        <>
          <div className="order-2 lg:order-1">{Content}</div>
          <div className="order-1 lg:order-2">{ImageWithCircle}</div>
        </>
      ) : (
        <>
          <div className="order-2 lg:order-1">{ImageWithCircle}</div>
          <div className="order-1 lg:order-2">{Content}</div>
        </>
      )}
    </div>
  )
}

const ProductsSection = () => {
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { margin: '-100px 0px -100px 0px' })

  return (
    <section className="py-16 md:py-28 relative overflow-hidden bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-12 md:mb-20"
          initial={{ y: -60, opacity: 0 }}
          animate={titleInView ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p
            className="text-[18px] md:text-[24px] font-medium mb-3 md:mb-4 tracking-wide font-body bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(90deg, #CD6028 11%, #3E6EB4 100%)' }}
          >
            {SECTION_HEADERS.products.subtitle}
          </p>
          <h2 className="text-[32px] md:text-[48px] font-semibold text-[#141219]">
            {SECTION_HEADERS.products.title}
          </h2>
        </motion.div>

        <div className="relative flex flex-col gap-16 md:gap-24">
          {PRODUCTS.map((product, index) => (
            <ProductBlock
              key={product.id}
              productName={product.name}
              title={product.title}
              features={[...product.features]}
              benefits={[...product.benefits]}
              buttonColor={product.buttonColor}
              productImage={productImages[product.id]}
              circleImage={productCircles[product.id]}
              imageOnRight={product.imageOnRight}
              dotGrid={
                index === 0 ? (
                  <div className="hidden lg:block absolute left-[-70px] top-[-220px]">
                    <DotGridV2 animation="left" delay={0.1} />
                  </div>
                ) : index === 1 ? (
                  <div className="hidden lg:block absolute right-[100px] top-[-20px]">
                    <DotGridV1 animation="up" delay={0.2} />
                  </div>
                ) : (
                  <div className="hidden lg:block absolute left-[90px] top-0 -z-10">
                    <DotGridV2 animation="up" delay={0.3} />
                  </div>
                )
              }
            />
          ))}
        </div>


      </div>
    </section>
  )
}

export default ProductsSection
