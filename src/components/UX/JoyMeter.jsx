import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const JoyMeter = ({ level = 84 }) => {
  const barRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Animate the bar width
    gsap.to(barRef.current, {
      width: `${level}%`,
      duration: 2,
      ease: 'power3.out',
    });

    // Animate the counter
    gsap.fromTo(textRef.current, 
        { innerText: 0 },
        { 
            innerText: level, 
            duration: 2, 
            snap: { innerText: 1 },
            onUpdate: function() {
                if (textRef.current) textRef.current.innerText = Math.round(this.targets()[0].innerText) + '%';
            }
        }
    );
  }, [level]);

  return (
    <div className="w-full max-w-md">
       <div className="flex justify-between mb-1">
           <span className="text-xs font-medium text-yellow-400 uppercase tracking-widest">World Joy Percent</span>
           <span ref={textRef} className="text-xs font-bold text-white">0%</span>
       </div>
       <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
           <div 
             ref={barRef} 
             className="h-full bg-gradient-to-r from-yellow-500 to-red-500 w-0 relative"
           >
               <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
           </div>
       </div>
    </div>
  );
};

export default JoyMeter;
