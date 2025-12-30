import React from 'react';

const PostSeasonAnalytics = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Post-Season Analytics <span className="text-neutral-500">2025</span></h2>
          <p className="text-neutral-400">Mission Complete. Transitioning to 2026 Inventory Planning.</p>
        </div>
        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all">
          Export Mission Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Cards */}
        <div className="bg-neutral-800/50 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
          <h3 className="text-neutral-400 text-sm font-medium uppercase tracking-wider mb-2">Total Deliveries</h3>
          <div className="text-4xl font-bold text-white">2.4B</div>
          <div className="text-green-400 text-sm mt-2">↑ 4.2% vs 2024</div>
        </div>

        <div className="bg-neutral-800/50 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
          <h3 className="text-neutral-400 text-sm font-medium uppercase tracking-wider mb-2">Joy Index</h3>
          <div className="text-4xl font-bold text-yellow-400">98.7%</div>
          <div className="text-neutral-500 text-sm mt-2">Highest since 1994</div>
        </div>

        <div className="bg-neutral-800/50 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
          <h3 className="text-neutral-400 text-sm font-medium uppercase tracking-wider mb-2">Leftover Coal</h3>
          <div className="text-4xl font-bold text-neutral-300">14 Tons</div>
          <div className="text-red-400 text-sm mt-2">Inventory Surplus</div>
        </div>
      </div>

      {/* 2026 Planning Section */}
      <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">2026 Toy Inventory Planning</h3>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl text-neutral-600">
          [Interactive Chart Placeholder: Regional Demand Forecast]
        </div>
      </div>
    </div>
  );
};

export default PostSeasonAnalytics;
