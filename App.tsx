import React, { useState } from 'react';
import Experience from './components/Experience';
import Overlay from './components/Overlay';
import { TreeConfig } from './types';

const App: React.FC = () => {
  // Initial Luxury Config
  const [config, setConfig] = useState<TreeConfig>({
    treeColor: '#003318', // Deep Emerald
    ornamentColor: '#C5A059', // Antique Gold
    lightsColor: '#FFD700', // Bright Gold
    intensity: 1.5,
    rotationSpeed: 1.0,
  });

  return (
    <div className="relative w-full h-full bg-[#050505] overflow-hidden">
      {/* 3D Context */}
      <div className="absolute inset-0 z-0">
        <Experience config={config} />
      </div>

      {/* UI Overlay */}
      <Overlay config={config} setConfig={setConfig} />
      
      {/* Mobile/Sticky Prompt */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-50 z-20" />
    </div>
  );
};

export default App;