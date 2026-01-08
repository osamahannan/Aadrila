import { motion } from 'framer-motion'

type AnimationDirection = 
  | 'left' 
  | 'right' 
  | 'up' 
  | 'down' 
  | 'diagonal-top-left' 
  | 'diagonal-top-right' 
  | 'diagonal-bottom-left' 
  | 'diagonal-bottom-right'

interface DotGridProps {
  className?: string
  animation?: AnimationDirection
  delay?: number
  duration?: number
  show?: boolean // When provided, controls animation manually instead of using whileInView
}

const getAnimationVariants = (direction: AnimationDirection, distance: number = 60) => {
  const variants: Record<AnimationDirection, { x: number; y: number }> = {
    'left': { x: -distance, y: 0 },
    'right': { x: distance, y: 0 },
    'up': { x: 0, y: -distance },
    'down': { x: 0, y: distance },
    'diagonal-top-left': { x: -distance, y: -distance },
    'diagonal-top-right': { x: distance, y: -distance },
    'diagonal-bottom-left': { x: -distance, y: distance },
    'diagonal-bottom-right': { x: distance, y: distance },
  }
  return variants[direction]
}

// Version 1: 7x7 grid (49 dots) with smaller gaps - used for decorative patterns
export const DotGridV1 = ({ className = '', animation, delay = 0, duration = 0.6, show }: DotGridProps) => {
  const initial = animation ? { ...getAnimationVariants(animation), opacity: 0 } : { opacity: 0 }
  const animate = { x: 0, y: 0, opacity: 1 }
  const hidden = animation ? { ...getAnimationVariants(animation), opacity: 0 } : { opacity: 0 }
  
  // If show prop is provided, use controlled animation
  if (show !== undefined) {
    return (
      <motion.div 
        className={`grid grid-cols-7 gap-x-[19.65px] gap-y-[9.33px] ${className}`}
        initial={initial}
        animate={show ? animate : hidden}
        transition={{ duration, delay, ease: 'easeOut' }}
      >
        {Array.from({ length: 49 }).map((_, i) => (
          <div key={i} className="w-[6.55px] h-[6.55px] rounded-full bg-[#D8D8D8]" />
        ))}
      </motion.div>
    )
  }
  
  return (
    <motion.div 
      className={`grid grid-cols-7 gap-x-[19.65px] gap-y-[9.33px] ${className}`}
      initial={initial}
      whileInView={animate}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {Array.from({ length: 49 }).map((_, i) => (
        <div key={i} className="w-[6.55px] h-[6.55px] rounded-full bg-[#D8D8D8]" />
      ))}
    </motion.div>
  )
}

// Version 2: 7x3 grid (21 dots) with larger gaps - used for wider patterns
export const DotGridV2 = ({ className = '', animation, delay = 0, duration = 0.6, show }: DotGridProps) => {
  const initial = animation ? { ...getAnimationVariants(animation), opacity: 0 } : { opacity: 0 }
  const animate = { x: 0, y: 0, opacity: 1 }
  const hidden = animation ? { ...getAnimationVariants(animation), opacity: 0 } : { opacity: 0 }
  
  // If show prop is provided, use controlled animation
  if (show !== undefined) {
    return (
      <motion.div 
        className={`grid grid-cols-7 gap-x-[37.48px] gap-y-[17.66px] ${className}`}
        initial={initial}
        animate={show ? animate : hidden}
        transition={{ duration, delay, ease: 'easeOut' }}
      >
        {Array.from({ length: 21 }).map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-gray-300/60" />
        ))}
      </motion.div>
    )
  }
  
  return (
    <motion.div 
      className={`grid grid-cols-7 gap-x-[37.48px] gap-y-[17.66px] ${className}`}
      initial={initial}
      whileInView={animate}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {Array.from({ length: 21 }).map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full bg-gray-300/60" />
      ))}
    </motion.div>
  )
}
