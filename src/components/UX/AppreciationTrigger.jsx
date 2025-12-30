import React from 'react';
import Lottie from 'lottie-react';

// Using a public confetti lottie animation URL (saved as json, or fetched)
// For robustness, I'll use a fetch or just a simple reliable one if available.
// I'll embed a small confetti JSON logic or fetch it. 
// Since I can't browse, I'll check if I can use a remote URL with lottie-react directly?
// lottie-react takes `animationData` object. fetching it is better.

const AppreciationTrigger = ({ active, onClose }) => {
  const [animationData, setAnimationData] = React.useState(null);

  React.useEffect(() => {
    // Fetch a celebration animation
    fetch('https://assets2.lottiefiles.com/packages/lf20_u4yrau.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Lottie Load Failed", err));
  }, []);

  if (!active || !animationData) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
       <div className="w-full h-full">
           <Lottie 
             animationData={animationData} 
             loop={false} 
             onComplete={onClose}
             style={{ width: '100%', height: '100%' }}
           />
       </div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-black text-yellow-400 drop-shadow-2xl animate-bounce">
           MILESTONE ACHIEVED!
       </div>
    </div>
  );
};

export default AppreciationTrigger;
