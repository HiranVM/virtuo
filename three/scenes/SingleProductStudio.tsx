'use client';

import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { FurnitureProduct } from '@/types/showroom';
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

interface SingleProductStudioProps {
  product: FurnitureProduct;
}

export const SingleProductStudio: React.FC<SingleProductStudioProps> = ({ product }) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [zoomScale, setZoomScale] = useState(1);

  const handleZoom = (delta: number) => {
    if (!controlsRef.current) return;
    const cam = controlsRef.current.object;
    cam.position.multiplyScalar(delta);
    controlsRef.current.update();
  };

  const handleReset = () => {
    if (!controlsRef.current) return;
    const cam = controlsRef.current.object;
    cam.position.set(0, 2.2, 4.2);
    controlsRef.current.target.set(0, 0.4, 0);
    controlsRef.current.update();
  };

  const renderProductMesh = () => {
    switch (product.id) {
      case 'virtuo-sofa-01':
        return (
          <group position={[4, 0, 0.8]}>
            <AethelSofa />
          </group>
        );
      case 'virtuo-chair-01':
        return (
          <group position={[1.2, 0, -0.9]} rotation={[0, Math.PI * 0.7, 0]}>
            <ElysianLoungeChair />
          </group>
        );
      case 'virtuo-table-coffee':
        return (
          <group position={[4, 0, -0.8]}>
            <MonolithCoffeeTable />
          </group>
        );
      case 'virtuo-lamp-01':
        return (
          <group position={[7.2, 0, 2.2]} rotation={[0, -0.8, 0]}>
            <LuminaFloorLamp />
          </group>
        );
      case 'virtuo-storage-01':
        return (
          <group position={[4, 0, 5.2]}>
            <VesperCredenza />
          </group>
        );
      case 'virtuo-dining-01':
        return (
          <group position={[-5.5, 0, 2]}>
            <SolsticeDiningTable />
          </group>
        );
      case 'virtuo-light-01':
        return (
          <group position={[-5.5, -1.8, 2]}>
            <ConstellationChandelier />
          </group>
        );
      case 'virtuo-bed-01':
        return (
          <group position={[-4, 0, -6.2]} rotation={[0, -Math.PI, 0]}>
            <SerenadeBed />
          </group>
        );
      case 'virtuo-chair-02':
        return (
          <group position={[-0.6, 0, -6.2]} rotation={[0, 0.6, 0]}>
            <KyotoArmchair />
          </group>
        );
      default:
        return (
          <group position={[4, 0, 0.8]}>
            <AethelSofa />
          </group>
        );
    }
  };

  return (
    <div className="relative w-full h-full min-h-[460px] bg-gradient-to-b from-[#14151a] to-[#0c0d11] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
      <Canvas
        shadows
        camera={{ position: [0, 2.2, 4.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#101116']} />

          {/* Warm Studio Lights */}
          <ambientLight intensity={0.8} color="#fff6eb" />
          <directionalLight
            position={[5, 8, 4]}
            intensity={2.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            color="#fff8ed"
          />
          <directionalLight position={[-5, 4, -3]} intensity={0.5} color="#ffd499" />
          <pointLight position={[0, 0.5, 0]} intensity={0.4} color="#ffe2b5" />

          {/* Minimalist Studio Cylindrical Plinth / Turntable */}
          <group position={[0, -0.05, 0]}>
            <mesh receiveShadow position={[0, -0.05, 0]}>
              <cylinderGeometry args={[2.8, 3.0, 0.1, 48]} />
              <meshStandardMaterial color="#1a1a22" roughness={0.35} metalness={0.1} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
              <ringGeometry args={[2.6, 2.65, 64]} />
              <meshBasicMaterial color="#c5a880" transparent opacity={0.3} />
            </mesh>
          </group>

          {/* Centered Product Mesh */}
          {renderProductMesh()}

          {/* CRITICAL UX FIX: enableZoom={false}
              Prevents mouse wheel scrolling over the canvas from getting hijacked! */}
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.08}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2 - 0.02}
            autoRotate
            autoRotateSpeed={0.6}
          />
        </Suspense>
      </Canvas>

      {/* Floating On-Screen Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 p-1 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
        <button
          onClick={() => handleZoom(0.85)}
          title="Zoom In"
          className="p-2 rounded-xl hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom(1.15)}
          title="Zoom Out"
          className="p-2 rounded-xl hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          title="Reset View"
          className="p-2 rounded-xl hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating 360 Hint */}
      <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-neutral-300 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Drag to rotate 360° • Use + / - to zoom
      </div>
    </div>
  );
};
