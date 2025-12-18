import React from 'react';
import FlatViewer from '../components/3d/FlatViewer';
import Button from '../components/common/Button';

/**
 * Fullscreen Virtual Tour - Click to start
 */
const VirtualTourPage = () => {
  return (
    <div className="fixed inset-0 bg-neutral-900">
      {/* 3D Viewer - Click directly to start */}
      <FlatViewer firstPersonMode={true} hideInstructions={true} />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div className="glass-effect-dark shadow-lg">
          <div className="container-custom">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center space-x-2 pointer-events-auto">
                <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <span className="font-display font-bold text-xl text-white">
                  Haven<span className="text-accent-500">Estate</span>
                </span>
              </div>
              <Button
                variant="outline"
                size="md"
                onClick={() => window.location.href = '/'}
                className="border-white/30 text-white hover:bg-white hover:text-neutral-900 pointer-events-auto"
              >
                Exit Tour
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions hint - Always visible */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <div className="glass-effect-dark rounded-xl px-6 py-3 shadow-lg">
          <p className="text-sm text-white font-medium">
            <span className="text-accent-400">Click</span> to start • 
            <span className="text-accent-400"> WASD</span> to move • 
            <span className="text-accent-400"> Mouse</span> to look • 
            <span className="text-accent-400"> ESC</span> to exit
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
        {/* Floor Plans Button */}
        <div className="relative group pointer-events-auto">
          <button
            onClick={() => window.location.href = '/floor-plans'}
            className="glass-effect-dark rounded-full p-4 text-white hover:bg-white/20 transition-all shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </button>
          {/* Animated Label */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap group-hover:translate-x-0 translate-x-2">
            <div className="glass-effect-dark px-4 py-2 rounded-lg shadow-lg">
              <span className="text-sm text-white font-medium">View Floor Plans</span>
            </div>
          </div>
        </div>

        {/* Contact Button */}
        <div className="relative group pointer-events-auto">
          <button
            onClick={() => window.location.href = '/contact'}
            className="glass-effect-dark rounded-full p-4 text-white hover:bg-white/20 transition-all shadow-lg bg-accent-500/80"
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </button>
          {/* Animated Label */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap group-hover:translate-x-0 translate-x-2">
            <div className="glass-effect-dark px-4 py-2 rounded-lg shadow-lg">
              <span className="text-sm text-white font-medium">Contact Us</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTourPage;
