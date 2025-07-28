import React from 'react';
import { motion } from 'motion/react';

const SectionDivider = ({ 
  variant = "dots", 
  color = "primary", 
  height = "h-12",
  className = "" 
}) => {
  const variants = {
    curve: (
      <div className={`w-full ${height} relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background to-transparent"></div>
        <svg 
          className="absolute bottom-0 w-full h-full" 
          viewBox="0 0 1200 60" 
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,0C300,60,900,60,1200,0V60H0Z"
            className={`fill-${color}/10`}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
      </div>
    ),
    curveInverted: (
      <div className={`w-full ${height} relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background to-transparent"></div>
        <svg 
          className="absolute top-0 w-full h-full" 
          viewBox="0 0 1200 60" 
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,60C300,0,900,0,1200,60V0H0Z"
            className={`fill-${color}/10`}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
      </div>
    ),
  };

  return variants[variant] || variants.dots;
};

export default SectionDivider; 