import React from "react";
import { motion } from "motion/react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface FlowchartArrowProps {
  direction?: "down" | "right" | "left";
  label?: string;
  className?: string;
  isAnimated?: boolean;
  isHighlighted?: boolean;
  delay?: number;
}

export function FlowchartArrow({ 
  direction = "down", 
  label, 
  className = "", 
  isAnimated = false,
  isHighlighted = false,
  delay = 0
}: FlowchartArrowProps) {
  const getArrowIcon = () => {
    const iconClass = `w-6 h-6 ${isHighlighted ? 'text-blue-500' : 'text-muted-foreground'}`;
    switch (direction) {
      case "right":
        return <ChevronRight className={iconClass} />;
      case "left":
        return <ChevronRight className={`${iconClass} rotate-180`} />;
      default:
        return <ChevronDown className={iconClass} />;
    }
  };

  const arrowVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.5
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        delay: delay,
        duration: 0.3
      }
    }
  };

  const flowVariants = {
    flow: {
      y: direction === "down" ? [0, 5, 0] : 0,
      x: direction === "right" ? [0, 5, 0] : direction === "left" ? [0, -5, 0] : 0,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className={`flex items-center justify-center ${className}`}
      variants={arrowVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col items-center">
        <motion.div
          animate={isAnimated ? "flow" : {}}
          variants={flowVariants}
          className={`${isHighlighted ? 'filter drop-shadow-lg' : ''}`}
        >
          {getArrowIcon()}
        </motion.div>
        {label && (
          <motion.span 
            className={`text-sm mt-1 px-2 py-1 rounded border ${
              isHighlighted 
                ? 'text-blue-600 bg-blue-50 border-blue-200' 
                : 'text-muted-foreground bg-background border-border'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.2 }}
          >
            {label}
          </motion.span>
        )}
      </div>
      {isAnimated && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(circle, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0) 100%)",
              "radial-gradient(circle, rgba(59, 130, 246, 0.1) 20%, rgba(59, 130, 246, 0) 70%)",
              "radial-gradient(circle, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0) 100%)"
            ]
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
}