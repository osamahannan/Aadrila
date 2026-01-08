import { useEffect, useRef, useState, ReactNode } from 'react'
import { motion, useInView, useAnimation, Variants } from 'framer-motion'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
  duration?: number
  once?: boolean
}

const getVariants = (direction: string): Variants => {
  const baseHidden = { opacity: 0 }
  const baseVisible = { opacity: 1 }

  switch (direction) {
    case 'up':
      return {
        hidden: { ...baseHidden, y: 60 },
        visible: { ...baseVisible, y: 0 },
      }
    case 'down':
      return {
        hidden: { ...baseHidden, y: -60 },
        visible: { ...baseVisible, y: 0 },
      }
    case 'left':
      return {
        hidden: { ...baseHidden, x: -60 },
        visible: { ...baseVisible, x: 0 },
      }
    case 'right':
      return {
        hidden: { ...baseHidden, x: 60 },
        visible: { ...baseVisible, x: 0 },
      }
    case 'scale':
      return {
        hidden: { ...baseHidden, scale: 0.8 },
        visible: { ...baseVisible, scale: 1 },
      }
    default:
      return {
        hidden: { ...baseHidden, y: 60 },
        visible: { ...baseVisible, y: 0 },
      }
  }
}

const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = false,
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { 
    margin: '-100px 0px -100px 0px',
    once: once 
  })
  const controls = useAnimation()
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView) {
      controls.start('visible', {
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1],
        }
      })
      setHasAnimated(true)
    } else if (!once && hasAnimated) {
      controls.start('hidden', {
        transition: {
          duration: 0.4,
          delay: 0,
          ease: [0.25, 0.1, 0.25, 1],
        }
      })
    }
  }, [isInView, controls, once, hasAnimated, duration, delay])

  const variants = getVariants(direction)

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedSection
