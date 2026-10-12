import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up', // 'up', 'down', 'left', 'right', 'none'
  threshold = 0.15,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (shouldReduceMotion) return { opacity: 0 };
    switch (direction) {
      case 'up': return { opacity: 0, y: 35 };
      case 'down': return { opacity: 0, y: -35 };
      case 'left': return { opacity: 0, x: -35 };
      case 'right': return { opacity: 0, x: 35 };
      case 'none':
      default: return { opacity: 0 };
    }
  };

  const getTargetPosition = () => {
    if (shouldReduceMotion) return { opacity: 1 };
    switch (direction) {
      case 'up':
      case 'down': return { opacity: 1, y: 0 };
      case 'left':
      case 'right': return { opacity: 1, x: 0 };
      case 'none':
      default: return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getTargetPosition()}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1] // smooth cubic bezier
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
