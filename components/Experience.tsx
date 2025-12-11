import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import Tree from './Tree';
import { TreeConfig } from '../types';

interface ExperienceProps {
  config: TreeConfig;
}

const Experience: React.FC<ExperienceProps> = ({ config }) => {
  return (
    <Canvas shadows dpr={[1, 2]} gl={{ antialias: false }}>
      <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={50} />
      
      {/* Lighting - The Key to Luxury */}
      <ambientLight intensity={0.2} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={2} 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
      />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#046307" />
      <Environment preset="city" />

      {/* Main Object */}
      <Tree config={config} />

      {/* Grounding */}
      <ContactShadows 
        resolution={1024} 
        scale={20} 
        blur={2} 
        opacity={0.5} 
        far={10} 
        color="#000000" 
      />

      {/* Post Processing for Cinematic Feel */}
      <EffectComposer disableNormalPass>
        <Bloom 
            luminanceThreshold={1.1} 
            mipmapBlur 
            intensity={0.8} 
            radius={0.6} 
        />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
        <Noise opacity={0.02} /> 
      </EffectComposer>

      <OrbitControls 
        enablePan={false} 
        minPolarAngle={Math.PI / 4} 
        maxPolarAngle={Math.PI / 1.8}
        minDistance={5}
        maxDistance={12}
        autoRotate={false}
      />
      
      {/* Background Color to match the mood */}
      <color attach="background" args={['#050505']} />
    </Canvas>
  );
};

export default Experience;