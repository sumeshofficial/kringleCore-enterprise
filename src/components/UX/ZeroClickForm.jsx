import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Clock } from 'lucide-react';

const ZeroClickForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    childName: '',
    address: '',
    region: '',
    timezone: '',
    item: '',
    riskLevel: 'Low'
  });

  const [isAutoFilling, setIsAutoFilling] = useState(false);

  // Simulation of "Contextual Pre-Filling"
  useEffect(() => {
    // When address is typed, simulate APi lookup
    if (formData.address.length > 5) {
        setIsAutoFilling(true);
        const timer = setTimeout(() => {
            // Mock Geocoding Logic
            let region = 'Unknown';
            let tz = 'UTC';
            
            if (formData.address.toLowerCase().includes('london')) { region = 'Europe'; tz = 'GMT'; }
            if (formData.address.toLowerCase().includes('york')) { region = 'North America'; tz = 'EST'; }
            if (formData.address.toLowerCase().includes('tokyo')) { region = 'Asia'; tz = 'JST'; }

            setFormData(prev => ({
                ...prev,
                region,
                timezone: tz
            }));
            setIsAutoFilling(false);
        }, 800);
        return () => clearTimeout(timer);
    }
  }, [formData.address]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 border border-white/10 p-8 rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="text-yellow-400" />
                Add New Gift
            </h2>
            <button onClick={onClose} className="text-neutral-500 hover:text-white">&times;</button>
        </div>

        <div className="space-y-4">
            <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Child Name</label>
                <input 
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:border-red-500 outline-none transition-colors"
                  value={formData.childName}
                  onChange={e => setFormData({...formData, childName: e.target.value})}
                  placeholder="e.g. Timmy"
                />
            </div>
            
            <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Address (Auto-Detect)</label>
                <div className="relative">
                    <input 
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:border-red-500 outline-none transition-colors"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    placeholder="Enter city (e.g. London, New York)"
                    />
                    {isAutoFilling && <div className="absolute right-3 top-3 text-yellow-400 animate-spin">⟳</div>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               {/* Pre-filled fields */}
               <div className={`p-3 rounded-lg border border-dashed transition-colors ${formData.region ? 'bg-green-900/20 border-green-500/50' : 'bg-neutral-800 border-neutral-700'}`}>
                   <div className="flex items-center gap-2 text-neutral-400 text-xs uppercase mb-1"><MapPin size={12}/> Region</div>
                   <div className="text-white font-mono">{formData.region || '---'}</div>
               </div>
               <div className={`p-3 rounded-lg border border-dashed transition-colors ${formData.timezone ? 'bg-green-900/20 border-green-500/50' : 'bg-neutral-800 border-neutral-700'}`}>
                   <div className="flex items-center gap-2 text-neutral-400 text-xs uppercase mb-1"><Clock size={12}/> Timezone</div>
                   <div className="text-white font-mono">{formData.timezone || '---'}</div>
               </div>
            </div>

            <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Requested Item</label>
                <input 
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:border-red-500 outline-none transition-colors"
                  value={formData.item}
                  onChange={e => setFormData({...formData, item: e.target.value})}
                />
            </div>

            <button 
                onClick={() => onAdd(formData)}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl mt-4 transition-transform active:scale-95"
            >
                Process Order
            </button>
        </div>
      </div>
    </div>
  );
};

export default ZeroClickForm;
