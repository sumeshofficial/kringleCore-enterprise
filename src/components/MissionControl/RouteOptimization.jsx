import React from 'react';

const RouteOptimization = () => {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in duration-500">
      <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h2 className="text-4xl font-bold text-white">Route Optimization Active</h2>
      <p className="text-xl text-red-400">Targeting: Prime Meridian Midnight Zone</p>
      <div className="bg-black/50 p-4 rounded-lg font-mono text-green-400 mt-8">
        Calculating Optimal Path... Sleigh Load: 98%
      </div>
    </div>
  );
};

export default RouteOptimization;
