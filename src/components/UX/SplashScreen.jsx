import React, { useEffect, useState, useMemo } from 'react';
import Lottie from 'lottie-react';
import santaAnimation from '../../assets/lottie/santa_sleigh.json';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const Star = ({ star, mouseX, mouseY }) => {
  const x = useTransform(mouseX, (v) => v * star.speed);
  const y = useTransform(mouseY, (v) => v * star.speed);
  
  return (
    <motion.div
      className="absolute bg-white rounded-full opacity-40"
      style={{
        left: star.left,
        top: star.top,
        width: star.size,
        height: star.size,
        x,
        y,
        boxShadow: '0 0 8px rgba(255,255,255,0.4)'
      }}
    />
  );
};

const SplashScreen = ({ onComplete }) => {
  const [show, setShow] = useState(true);
  
  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) / 25;
      const moveY = (clientY - window.innerHeight / 2) / 25;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Standard reveal duration
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 1000); 
    }, 4500); 

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [onComplete]);

  // Generate random stars for parallax background
  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + i % 2, 
      speed: Math.random() * 0.5 + 0.2
    }));
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-[#020408]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
           {/* Dark Night Sky with Parallax Stars */}
           <div className="absolute inset-0 z-0">
              {stars.map((star) => (
                <Star key={star.id} star={star} mouseX={mouseX} mouseY={mouseY} />
              ))}
           </div>

           {/* Cosmic Dust / Gradients */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,42,45,0.05),transparent_70%)]" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_rgba(50,100,255,0.03),transparent_70%)]" />

           {/* Brand Reveal at the Center */}
           <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-center px-6">
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <motion.h1 
                        className="text-6xl md:text-8xl font-black tracking-tighter drop-shadow-[0_0_50px_rgba(239,68,68,0.3)]"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
                    >
                        <span className="text-red-500">KringleCore</span>
                        <span className="text-white opacity-20 ml-4">Enterprise</span>
                    </motion.h1>
                    
                    <motion.div 
                        className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent" 
                        initial={{ width: 0 }}
                        animate={{ width: "80vw", maxWidth: "600px" }}
                        transition={{ delay: 0.8, duration: 1.5 }}
                    />
                    
                    <p className="mt-8 text-white/20 font-mono text-[10px] tracking-[0.6em] uppercase animate-pulse">
                        Neural Logistics Interface Initialized
                    </p>
                </motion.div>
           </div>

           {/* Subtle Status Bar */}
           <motion.div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-wrap justify-center items-center gap-6 text-white/10 font-mono text-[8px] z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
           >
                <span>SYS_V2.0.4</span>
                <span className="w-1 h-1 bg-white/10 rounded-full hidden md:block" />
                <span>MAGI_DRIVE_ACTIVE</span>
                <span className="w-1 h-1 bg-white/10 rounded-full hidden md:block" />
                <span>LINK_ESTABLISHED</span>
           </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
