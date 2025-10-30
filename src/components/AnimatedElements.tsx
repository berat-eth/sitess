'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

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
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={className}
    >
      <motion.span
        initial={{ textContent: 0 }}
        whileInView={{ textContent: end }}
        viewport={{ once: true }}
        transition={{ duration, ease: "easeOut" }}
        onUpdate={(latest) => {
          if (typeof latest.textContent === 'number') {
            const element = document.querySelector(`[data-count="${end}"]`);
            if (element) {
              element.textContent = Math.round(latest.textContent) + suffix;
            }
          }
        }}
        data-count={end}
      />
    </motion.span>
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
