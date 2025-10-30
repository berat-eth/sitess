'use client';

import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  duration?: number;
}

export const FadeInUp = ({ children, className = '', delay = 0, duration = 0.6 }: AnimatedElementProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInLeft = ({ children, className = '', delay = 0, duration = 0.6 }: AnimatedElementProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInRight = ({ children, className = '', delay = 0, duration = 0.6 }: AnimatedElementProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn = ({ children, className = '', delay = 0, duration = 0.5 }: AnimatedElementProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FloatingElement = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      animate={{ 
        y: [0, -10, 0],
        rotate: [0, 1, -1, 0]
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const PulseGlow = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      animate={{ 
        boxShadow: [
          '0 0 20px rgba(59, 130, 246, 0.3)',
          '0 0 40px rgba(59, 130, 246, 0.6)',
          '0 0 20px rgba(59, 130, 246, 0.3)'
        ]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const HoverLift = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
      }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const CountUp = ({ 
  end, 
  duration = 2, 
  className = '',
  suffix = ''
}: { 
  end: number; 
  duration?: number; 
  className?: string;
  suffix?: string;
}) => {
  // Simple, reliable counter using requestAnimationFrame
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    let rafId = 0;
    const start = performance.now();
    const from = 0;
    const to = end;
    const totalMs = Math.max(0.1, duration) * 1000;

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / totalMs);
      const next = from + (to - from) * elapsed;
      setValue(next);
      if (elapsed < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration]);

  return (
    <span className={className}>{Math.round(value)}{suffix}</span>
  );
};

export const GradientText = ({ 
  children, 
  className = '',
  gradient = 'from-blue-600 via-purple-600 to-pink-600'
}: { 
  children: ReactNode; 
  className?: string;
  gradient?: string;
}) => {
  return (
    <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};

export const GlowCard = ({ 
  children, 
  className = '',
  glowColor = 'blue'
}: { 
  children: ReactNode; 
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'pink' | 'orange';
}) => {
  const glowClasses = {
    blue: 'glow-blue',
    purple: 'glow-purple', 
    green: 'glow-green',
    pink: 'glow-pink',
    orange: 'shadow-orange-500/30'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`${glowClasses[glowColor]} hover-lift ${className}`}
    >
      {children}
    </motion.div>
  );
};
