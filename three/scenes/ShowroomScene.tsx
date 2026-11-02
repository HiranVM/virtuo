'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useShowroomStore } from '@/store/showroomStore';
import { PRODUCTS } from '@/data/products';
import { ROOM_CONFIGURABLE_ITEMS } from '@/data/roomSurfaces';
import { ShowroomArchitecture } from './ShowroomArchitecture';
import { CameraController } from '../controls/CameraController';
import { ProductHotspot } from '../interactions/ProductHotspot';
import { NumberedPin } from '../interactions/NumberedPin';
import {
  AethelSofa,
  ElysianLoungeChair,
  MonolithCoffeeTable,
  LuminaFloorLamp,
  VesperCredenza,
  SolsticeDiningTable,
  ConstellationChandelier,
  SerenadeBed,
  KyotoArmchair,
} from '../models/FurnitureModels';

// Realistic Warm Architectural Lighting (matching Reference Images 1, 4 & 5)
const ArchitecturalWarmLighting: React.FC = () => {
  const lightingMood = useShowroomStore((s) => s.lightingMood);

  if (lightingMood === 'noir_evening') {
    return (
      <>
        {/* Soft dark blue ambient night foundation */}
        <ambientLight intensity={0.25} color="#1d202e" />
        
        {/* Subtle moonlit window glow */}
        <directionalLight position={[10, 7, 3]} intensity={0.5} color="#8aa2d4" />
        
        {/* Interior warm spot lights */}
        <pointLight position={[-3.8, 3.8, 0]} intensity={1.8} color="#ffd8a8" distance={9} />
        <pointLight position={[5.5, 3.8, -2]} intensity={1.4} color="#ffd8a8" distance={8} />
      </>
    );
  }

  if (lightingMood === 'golden_hour') {
    return (
      <>
        <ambientLight intensity={0.5} color="#ffd499" />
        {/* Low dramatic golden sun pouring from window */}
        <directionalLight
          position={[11, 4, 2]}
          intensity={2.8}
          color="#ffaa44"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={30}
          shadow-camera-left={-12}
          shadow-camera-right={12}
          shadow-camera-top={12}
          shadow-camera-bottom={-12}
          shadow-bias={-0.00015}
        />
        <pointLight position={[-2, 3.2, 1]} intensity={0.8} color="#ffbe73" distance={8} />
      </>
    );
  }

  // Default: Warm Architectural Daylight (warm 3000K sunlight, soft cove wash, natural warmth)
  return (
    <>
      {/* High-quality warm ambient fill */}
      <ambientLight intensity={0.85} color="#fff6eb" />

      {/* Primary Warm Sun from right glass window */}
      <directionalLight
        position={[11, 8, 3]}
        intensity={2.2}
        color="#fff4df"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={32}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-bias={-0.00012}
      />

      {/* Soft warm interior fill from ceiling */}
      <directionalLight position={[-8, 6, -4]} intensity={0.45} color="#fceecc" />

      {/* Warm recessed downlights */}
      <pointLight position={[-3.8, 4.2, 0.2]} intensity={0.7} color="#ffe2b8" distance={7} />
      <pointLight position={[5.5, 4.2, -2.0]} intensity={0.6} color="#ffe2b8" distance={7} />
    </>
  );
};

interface ShowroomSceneProps {
  allowWheelZoom?: boolean;
}

export const ShowroomScene: React.FC<ShowroomSceneProps> = ({
  allowWheelZoom = true,
}) => {
  return (
    <div className="relative w-full h-full bg-[#0d0e12] select-none">
      <Canvas
        shadows
        camera={{ position: [-2.2, 2.2, 4.8], fov: 42, near: 0.1, far: 80 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
        dpr={[1, 1.5]} // Capped to 1.5 to eliminate lag on 4K/retina displays
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#0e0f14']} />
          <fog attach="fog" args={['#0e0f14', 18, 45]} />

          <ArchitecturalWarmLighting />

          {/* Showroom Architecture (Floor, Walls, Ceiling, Fireplace, Window) */}
          <ShowroomArchitecture />

          {/* Furniture Pieces */}
          <AethelSofa />
          <ElysianLoungeChair />
          <MonolithCoffeeTable />
          <LuminaFloorLamp />
          <VesperCredenza />
          <SolsticeDiningTable />
          <ConstellationChandelier />
          <SerenadeBed />
          <KyotoArmchair />

          {/* Reference Image 4: Numbered Circular 3D Badge Pins (1 to 7) */}
          {ROOM_CONFIGURABLE_ITEMS.map((item) => (
            <NumberedPin key={item.id} item={item} />
          ))}

          {/* Camera Controller & OrbitControls */}
          <CameraController allowWheelZoom={allowWheelZoom} />
        </Suspense>
      </Canvas>
    </div>
  );
};
