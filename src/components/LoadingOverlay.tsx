import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAppleWhole,
  faLemon,
  faCarrot,
  faPepperHot,
} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'

export function LoadingOverlay() {
  const fruits = [
    { icon: faAppleWhole, color: 'text-red-500' },
    { icon: faLemon, color: 'text-yellow-500' },
    { icon: faCarrot, color: 'text-orange-500' },
    { icon: faPepperHot, color: 'text-red-500' },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % fruits.length)
    }, 500)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 
        flex items-center justify-center"
    >
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <div className="h-12 w-12 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50, rotate: -180 }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: 0,
                transition: {
                  type: 'spring',
                  bounce: 0.5,
                },
              }}
              exit={{ opacity: 0, y: -50, rotate: 180 }}
              transition={{ duration: 0.5 }}
              className={`${fruits[currentIndex].color}`}
            >
              <FontAwesomeIcon
                icon={fruits[currentIndex].icon}
                className="h-12 w-12"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <motion.p
          className="text-gray-600 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
