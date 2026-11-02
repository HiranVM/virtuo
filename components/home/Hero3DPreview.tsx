'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { AethelSofa, ElysianLoungeChair, MonolithCoffeeTable, LuminaFloorLamp } from '@/three/models/FurnitureModels';
import { ShowroomArchitecture } from '@/three/scenes/ShowroomArchitecture';

const FloatingHeroScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <ShowroomArchitecture />
      <AethelSofa />
      <ElysianLoungeChair />
      <MonolithCoffeeTable />
      <LuminaFloorLamp />
    </group>
  );
};

export const Hero3DPreview: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        shadows
        camera={{ position: [-2.2, 2.2, 4.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#0e0f14']} />
          <fog attach="fog" args={['#0e0f14', 18, 40]} />

          {/* Warm Architectural Lighting */}
          <ambientLight intensity={0.8} color="#fff6eb" />
          <directionalLight
            position={[10, 8, 3]}
            intensity={2.2}
            color="#fff4df"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.0001}
          />
          <pointLight position={[-3.8, 3.8, 0]} intensity={1.0} color="#ffd8a8" distance={8} />

          <FloatingHeroScene />

          {/* CRITICAL UX FIX: enableZoom={false} and enablePan={false}
              This allows the user to scroll down the page naturally with the mouse wheel
              without getting trapped by OrbitControls! */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            autoRotate
            autoRotateSpeed={0.4}
            maxPolarAngle={Math.PI / 2 - 0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
