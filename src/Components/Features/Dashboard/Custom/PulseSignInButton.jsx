// comments in English
import { motion, useReducedMotion } from 'motion/react';

// Drop-in replacement for your button
function PulseSignInButton({ children, ...props }) {
  const reduce = useReducedMotion(); // respect OS reduced-motion

  return (
    <motion.div
      className="inline-block"
      initial={false}
      animate={{
        // Always animate - more noticeable for call-to-action
        scale: [1, 1.04, 1],
        filter: [
          'drop-shadow(0 0 0px rgba(53,79,124,0))',
          'drop-shadow(0 0 18px rgba(53,79,124,0.6))',
          'drop-shadow(0 0 0px rgba(53,79,124,0))',
        ],
      }}
      whileHover={
        reduce
          ? {}
          : {
              scale: 1.05,
              filter: 'drop-shadow(0 0 20px rgba(53,79,124,0.8))',
            }
      }
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 1.0, // slightly faster for more attention
        ease: [0.4, 0.0, 0.2, 1],
        repeat: Infinity,
        repeatDelay: 0.9, // shorter delay = more frequent pulses
      }}
    >
      <motion.div
        {...props}
        className={`${props.className || ''} flex justify-center`}
        animate={{
          textShadow: [
            '0 0 0px rgba(255,255,255,0)',
            '0 0 8px rgba(255,255,255,0.3)',
            '0 0 0px rgba(255,255,255,0)',
          ],
        }}
        transition={{
          duration: 2.5,
          ease: 'linear',
          repeat: Infinity,
          repeatDelay: 2.5, // shimmer every 5 seconds
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default PulseSignInButton;
