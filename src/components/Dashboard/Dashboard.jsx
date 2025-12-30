import React, { useEffect, useState } from 'react';
import { Gift, Zap, CloudLightning } from 'lucide-react';
import VirtualTable from '../GiftTable/VirtualTable';
import JoyMeter from '../UX/JoyMeter';
import ZeroClickForm from '../UX/ZeroClickForm';
import AppreciationTrigger from '../UX/AppreciationTrigger';

const Dashboard = () => {
  const [showAddGift, setShowAddGift] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [metrics, setMetrics] = useState({
    giftsRemaining: 154302,
    reindeerEnergy: 92,
    weatherRisks: 3
  });
  
  const [giftData, setGiftData] = useState([]);

  // Generate "Enterprise Scale" Mock Data
  useEffect(() => {
      const dummy = Array.from({ length: 50 }).map((_, i) => ({
          _id: `mock-${i}`,
          childName: ['Timmy', 'Sally', 'Ralph', 'Cindy', 'Bob', 'Alice', 'John'][Math.floor(Math.random() * 7)] + ` ${i}`,
          address: `${Math.floor(Math.random() * 9000) + 100} Snow Lane`,
          region: ['Europe', 'North America', 'Asia', 'Oceania'][Math.floor(Math.random() * 4)],
          timezone: 'GMT+1',
          item: ['Bicycle', 'Coal', 'Ps5 Pro', 'Pony', 'Lego Set', 'Drone'][i % 6],
          status: ['Pending', 'Wrapped', 'Loaded', 'Delivered'][Math.floor(Math.random() * 4)],
          riskLevel: Math.random() > 0.8 ? 'High' : 'Low'
      }));
      setGiftData(dummy);
  }, []);

  const handleAddGift = (formData) => {
      // Immediate local update
      const newGift = {
          ...formData,
          _id: `local-${Date.now()}`,
          status: 'Pending',
          riskLevel: formData.item.toLowerCase() === 'coal' ? 'High' : 'Low' // Client-side business logic
      };
      
      setGiftData(prev => [newGift, ...prev]);
      setMetrics(prev => ({ ...prev, giftsRemaining: prev.giftsRemaining + 1 }));
      setShowAddGift(false);
      setShowCelebration(true); // Immediate validation reward
      setTimeout(() => setShowCelebration(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      
      {/* Joy Meter */}
      <div className="flex justify-between items-center px-8">
          <JoyMeter level={metrics.reindeerEnergy} />
          <button 
            onClick={() => setShowAddGift(true)}
            className="glass-button text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-900/20"
          >
            <Gift className="w-5 h-5 text-neon-red" />
            <span className="text-glow">Add Gift</span>
          </button>
          
          <button onClick={() => setShowCelebration(true)} className="ml-2 text-xs text-neutral-600 hover:text-yellow-500 transition-colors">
              (Test Celebration)
          </button>
      </div>
      
      <AppreciationTrigger active={showCelebration} onClose={() => setShowCelebration(false)} />

      {/* Three Numbers Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-8 flex flex-col items-center justify-center text-center group hover:border-red-500/30 transition-colors">
          <div className="bg-red-500/10 p-4 rounded-full mb-4 group-hover:bg-red-500/20 transition-colors">
             <Gift className="w-8 h-8 text-neon-red" />
          </div>
          <div className="text-5xl font-black text-white tracking-tighter text-glow">{metrics.giftsRemaining.toLocaleString()}</div>
          <div className="text-neutral-400 font-medium mt-2 tracking-wide uppercase text-sm">Gifts Remaining</div>
        </div>

        <div className="glass-card p-8 flex flex-col items-center justify-center text-center group hover:border-yellow-500/30 transition-colors">
          <div className="bg-yellow-500/10 p-4 rounded-full mb-4 group-hover:bg-yellow-500/20 transition-colors">
             <Zap className="w-8 h-8 text-neon-gold" />
          </div>
          <div className="text-5xl font-black text-white tracking-tighter text-glow">{metrics.reindeerEnergy}%</div>
          <div className="text-neutral-400 font-medium mt-2 tracking-wide uppercase text-sm">Reindeer Energy</div>
        </div>

        <div className="glass-card p-8 flex flex-col items-center justify-center text-center group hover:border-blue-500/30 transition-colors">
           <div className="bg-blue-500/10 p-4 rounded-full mb-4 group-hover:bg-blue-500/20 transition-colors">
             <CloudLightning className="w-8 h-8 text-blue-400" />
          </div>
          <div className="text-5xl font-black text-white tracking-tighter text-glow">{metrics.weatherRisks}</div>
          <div className="text-neutral-400 font-medium mt-2 tracking-wide uppercase text-sm">Weather Risks</div>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card p-6 h-[600px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-red animate-pulse"></span>
                Live Operations
             </h3>
             <span className="text-xs text-neutral-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">Local System Active</span>
        </div>
        <VirtualTable data={giftData} />
      </div>

      {/* Zero Click Modal */}
      {showAddGift && (
          <ZeroClickForm 
            onClose={() => setShowAddGift(false)} 
            onAdd={handleAddGift} 
          />
      )}
    </div>
  );
};


export default Dashboard;
