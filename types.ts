export interface TreeConfig {
  treeColor: string;
  ornamentColor: string;
  lightsColor: string;
  intensity: number;
  rotationSpeed: number;
}

export interface OrnamentData {
  position: [number, number, number];
  scale: number;
  type: 'sphere' | 'box' | 'diamond';
}