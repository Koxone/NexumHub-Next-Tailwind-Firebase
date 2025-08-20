'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export default function AnimatedItem({
  children,
  index,
  onMouseEnter,
  onClick,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, triggerOnce: false });

  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.05 }}
      className="mb-4 cursor-pointer"
    >
      {children}
    </motion.div>
  );
}
