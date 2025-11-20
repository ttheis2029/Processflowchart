import React from "react";
import { motion } from "motion/react";

interface FlowchartNodeProps {
  type: "start" | "end" | "activity" | "decision" | "system";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
  isCompleted?: boolean;
  isHighlighted?: boolean;
  delay?: number;
}

export function FlowchartNode({ 
  type, 
  children, 
  className = "", 
  onClick, 
  isActive = false,
  isCompleted = false,
  isHighlighted = false,
  delay = 0
}: FlowchartNodeProps) {
  const baseClasses = "cursor-pointer transition-all duration-300 relative overflow-hidden";
  
  const getNodeClasses = () => {
    let classes = "";
    
    if (isActive) {
      classes += " ring-4 ring-primary/50 shadow-lg scale-105";
    }
    
    if (isCompleted) {
      classes += " bg-green-100 border-green-500 text-green-800";
    }
    
    if (isHighlighted) {
      classes += " ring-2 ring-blue-400 shadow-md";
    }
    
    return classes;
  };

  const nodeVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        delay: delay,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  switch (type) {
    case "start":
    case "end":
      return (
        <motion.div 
          className={`${baseClasses} bg-primary text-primary-foreground rounded-full px-8 py-4 ${className} ${getNodeClasses()}`}
          onClick={onClick}
          variants={nodeVariants}
          initial="hidden"
          animate={isActive ? ["visible", "pulse"] : "visible"}
          whileHover="hover"
          whileTap="tap"
        >
          <div className="text-center relative z-10">{children}</div>
          {isActive && (
            <motion.div
              className="absolute inset-0 bg-primary rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      );
    
    case "activity":
      return (
        <motion.div 
          className={`${baseClasses} bg-card border-2 border-border rounded-lg px-6 py-4 ${className} ${getNodeClasses()}`}
          onClick={onClick}
          variants={nodeVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <div className="text-center relative z-10">{children}</div>
          {isActive && (
            <motion.div
              className="absolute inset-0 bg-blue-500/10 rounded-lg"
              animate={{
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      );
    
    case "decision":
      return (
        <motion.div 
          className={`${baseClasses} bg-accent text-accent-foreground border-2 border-border transform rotate-45 ${className} ${getNodeClasses()}`}
          onClick={onClick}
          variants={nodeVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <div className="transform -rotate-45 text-center p-2 relative z-10">{children}</div>
          {isActive && (
            <motion.div
              className="absolute inset-0 bg-yellow-500/20 border-2 border-yellow-400"
              animate={{
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      );
    
    case "system":
      return (
        <motion.div 
          className={`${baseClasses} bg-secondary text-secondary-foreground border-2 border-border px-6 py-4 ${className} ${getNodeClasses()}`}
          style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%)" }}
          onClick={onClick}
          variants={nodeVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <div className="text-center relative z-10">{children}</div>
          {isActive && (
            <motion.div
              className="absolute inset-0 bg-purple-500/20"
              style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%)" }}
              animate={{
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      );
    
    default:
      return null;
  }
}