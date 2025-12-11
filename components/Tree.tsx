import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float, Instance, Instances } from '@react-three/drei';
import { TreeConfig } from '../types';

interface TreeProps {
  config: TreeConfig;
}

const FallingSnow = () => {
  const count = 300;
  const geomRef = useRef<THREE.BufferGeometry>(null);
  
  // Create initial random positions for snow
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for(let i=0; i<count; i++) {
        pos[i*3] = (Math.random() - 0.5) * 20;     // x: spread wide
        pos[i*3+1] = Math.random() * 20 - 5;       // y: spread height
        pos[i*3+2] = (Math.random() - 0.5) * 20;   // z: spread depth
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!geomRef.current) return;
    const pos = geomRef.current.attributes.position.array as Float32Array;
    
    for(let i=0; i<count; i++) {
        // Move down
        pos[i*3+1] -= delta * 0.8; 
        
        // Reset when hitting bottom
        if (pos[i*3+1] < -6) {
             pos[i*3+1] = 12; // Reset to top
             pos[i*3] = (Math.random() - 0.5) * 20;
             pos[i*3+2] = (Math.random() - 0.5) * 20;
        }
    }
    geomRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <points>
        <bufferGeometry ref={geomRef}>
            <bufferAttribute 
                attach="attributes-position" 
                count={count} 
                array={positions} 
                itemSize={3} 
            />
        </bufferGeometry>
        <pointsMaterial 
          size={0.12} 
          color="#FFFFFF" 
          transparent 
          opacity={0.8} 
        />
    </points>
  )
}

const TreeLayer = ({ 
  position, 
  scale, 
  color 
}: { 
  position: [number, number, number]; 
  scale: number; 
  color: string 
}) => {
  return (
    <group position={position}>
      <mesh receiveShadow castShadow>
        <coneGeometry args={[1.5 * scale, 2.5 * scale, 32]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3} 
          metalness={0.2} 
          envMapIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

const Ornaments = ({ count, color }: { count: number, color: string }) => {
  const positions = useMemo(() => {
    const pos = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); 
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      
      const height = (y + 1) * 2.5; 
      const coneRadius = (1 - height / 6) * 2; 

      const theta = phi * i;
      
      const x = Math.cos(theta) * coneRadius;
      const z = Math.sin(theta) * coneRadius;
      
      pos.push({
        position: [x, height - 3.5, z] as [number, number, number],
        scale: 0.1 + Math.random() * 0.15
      });
    }
    return pos;
  }, [count]);

  return (
    <Instances range={count}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.1} 
        metalness={1} 
        envMapIntensity={2} 
      />
      {positions.map((data, i) => (
        <Instance 
          key={i} 
          position={data.position} 
          scale={[data.scale, data.scale, data.scale]} 
        />
      ))}
    </Instances>
  );
};

const GlowingLights = ({ count, color, intensity }: { count: number, color: string, intensity: number }) => {
   const lights = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        const t = i / count;
        const angle = t * Math.PI * 12; 
        const height = t * 6 - 3; 
        const radius = (1 - t) * 2.2;
        
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        temp.push([x, height, z] as [number, number, number]);
    }
    return temp;
  }, [count]);

  return (
    <group>
        {lights.map((pos, i) => (
             <mesh key={i} position={pos}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial 
                    color={color} 
                    emissive={color}
                    emissiveIntensity={intensity * 4}
                    toneMapped={false}
                />
                <pointLight distance={1} intensity={intensity} color={color} decay={2} />
             </mesh>
        ))}
    </group>
  );
}

const Star = () => {
    const starRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if(starRef.current) {
            starRef.current.rotation.y += 0.01;
            starRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    return (
        <group ref={starRef} position={[0, 3.2, 0]}>
             <mesh>
                <octahedronGeometry args={[0.4, 0]} />
                <meshStandardMaterial 
                    color="#FFD700" 
                    emissive="#FFD700" 
                    emissiveIntensity={2}
                    roughness={0}
                    metalness={1}
                />
            </mesh>
        </group>
    )
}

const Tree: React.FC<TreeProps> = ({ config }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2 * config.rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <TreeLayer position={[0, 1.5, 0]} scale={0.8} color={config.treeColor} />
        <TreeLayer position={[0, 0, 0]} scale={1.0} color={config.treeColor} />
        <TreeLayer position={[0, -1.5, 0]} scale={1.2} color={config.treeColor} />
        <TreeLayer position={[0, -2.8, 0]} scale={1.4} color={config.treeColor} />

        <Ornaments count={60} color={config.ornamentColor} />
        <GlowingLights count={40} color={config.lightsColor} intensity={config.intensity} />
        <Star />
      </Float>
      {/* Falling Snow Effect in global space relative to tree group */}
      <FallingSnow />
    </group>
  );
};

export default Tree;