import { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import PostSeasonAnalytics from './components/PostSeason/PostSeasonAnalytics';
import RouteOptimization from './components/MissionControl/RouteOptimization';
import SplashScreen from './components/UX/SplashScreen';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Temporal UI Logic
  const getTemporalView = () => {
    // Check for "Post-Season" (Dec 30)
    // Month is 0-indexed (11 = Dec)
    if (currentDate.getMonth() === 11 && currentDate.getDate() === 30) {
      return <PostSeasonAnalytics />;
    }
    
    // Check for "Christmas Eve" (Dec 24)
    if (currentDate.getMonth() === 11 && currentDate.getDate() === 24) {
      return <RouteOptimization />;
    }
    
    // Default
    return <Dashboard />;
  };

  return (
    <>
      {loading ? (
        <SplashScreen onComplete={() => setLoading(false)} />
      ) : (
        <div className="min-h-screen bg-neutral-900 text-white font-sans antialiased selection:bg-red-500 selection:text-white animate-in fade-in duration-1000">
           {/* Header / Nav could go here */}
      <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
             <h1 className="text-xl font-bold tracking-tighter text-red-500">KringleCore <span className="text-white opacity-50">Enterprise</span></h1>
             <div className="flex gap-2 text-xs">
                 <button onClick={() => setCurrentDate(new Date('2025-12-30'))} className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors">Dec 30</button>
                 <button onClick={() => setCurrentDate(new Date('2025-12-24'))} className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors">Dec 24</button>
                 <button onClick={() => setCurrentDate(new Date('2025-12-01'))} className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors">Normal</button>
             </div>
        </div>
        <div className="text-xs text-white/50 font-mono">
           {currentDate.toDateString()}
        </div>
      </header>
      
      <main className="pt-20 p-6">
        {getTemporalView()}
      </main>
        </div>
      )}
    </>
  );
}

export default App;

