import React, { useState } from 'react';
import { TreeConfig } from '../types';

interface OverlayProps {
  config: TreeConfig;
  setConfig: React.Dispatch<React.SetStateAction<TreeConfig>>;
}

const Overlay: React.FC<OverlayProps> = ({ config, setConfig }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between items-center">
      {/* Header - Always Visible */}
      <header className="mt-12 md:mt-16 text-center animate-fade-in-down w-full max-w-2xl mx-auto px-4">
        <h1 className="font-serif text-xl md:text-4xl font-bold tracking-wider leading-relaxed text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7CE] to-[#C5A059] drop-shadow-[0_2px_10px_rgba(197,160,89,0.3)] whitespace-nowrap">
          送给许正云小朋友的圣诞树！
        </h1>
      </header>

      {/* Settings Modal - Centered */}
      {showSettings && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px] pointer-events-auto transition-opacity duration-300">
          <div className="w-full max-w-xs md:max-w-sm bg-black/80 backdrop-blur-xl border border-[#C5A059]/40 p-8 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-fade-in-up">
            <h3 className="font-serif text-xl mb-6 text-[#C5A059] border-b border-[#C5A059]/20 pb-4 text-center tracking-widest">
              氛围调节
            </h3>
            
            <div className="space-y-8 font-serif text-[#E5D3B3]">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <label className="tracking-widest opacity-80">亮度</label>
                  <span className="opacity-50 text-xs font-sans">{config.intensity.toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="3" 
                  step="0.1" 
                  value={config.intensity}
                  onChange={(e) => setConfig({...config, intensity: parseFloat(e.target.value)})}
                  className="w-full h-1 bg-[#333] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <label className="tracking-widest opacity-80">旋转速度</label>
                  <span className="opacity-50 text-xs font-sans">{config.rotationSpeed.toFixed(1)}</span>
                </div>
                 <input 
                  type="range" 
                  min="0" 
                  max="2" 
                  step="0.1" 
                  value={config.rotationSpeed}
                  onChange={(e) => setConfig({...config, rotationSpeed: parseFloat(e.target.value)})}
                  className="w-full h-1 bg-[#333] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
                />
              </div>
              
              <button 
                onClick={() => setShowSettings(false)}
                className="w-full mt-4 py-3 border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#000] transition-colors duration-300 rounded font-serif tracking-[0.2em] text-sm uppercase"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Toggle Button - Bottom Right */}
      {!showSettings && (
        <div className="absolute bottom-8 right-8 pointer-events-auto">
          <button 
            onClick={() => setShowSettings(true)}
            className="group p-4 rounded-full border border-[#C5A059]/30 bg-black/40 backdrop-blur-md text-[#C5A059] shadow-lg transition-all duration-300 hover:scale-110 hover:border-[#C5A059] hover:bg-black/60 hover:shadow-[0_0_20px_rgba(197,160,89,0.4)]"
            aria-label="Settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-700 group-hover:rotate-90">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Overlay;