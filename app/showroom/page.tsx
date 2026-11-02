'use client';

import React, { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Sun, Sunset, Moon, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { useShowroomStore } from '@/store/showroomStore';
import { ArchitecturalConfiguratorPanel } from '@/components/showroom/ArchitecturalConfiguratorPanel';
import { BottomRoomBar } from '@/components/showroom/BottomRoomBar';
import { ProductInfoDrawer } from '@/components/showroom/ProductInfoDrawer';

// Dynamically import Three.js scene with SSR disabled for optimal WebGL initialization
const ShowroomScene = dynamic(
  () =>
    import('@/three/scenes/ShowroomScene').then((mod) => mod.ShowroomScene),
  {
    ssr: false,
    loading: () => <ShowroomLoadingScreen />,
  }
);

function ShowroomLoadingScreen() {
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 95 ? prev + Math.floor(Math.random() * 25) : prev));
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0e12] text-white">
      <div className="relative flex flex-col items-center space-y-5 max-w-sm text-center px-4">
        {/* Animated Emblem */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c5a880] to-[#8f7551] flex items-center justify-center shadow-glow animate-pulse">
          <span className="font-serif text-black font-extrabold text-2xl">V</span>
        </div>

        <div className="space-y-1">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-white">
            VIRTUO 3D Studio
          </h2>
          <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400">
            Calibrating Architectural Lighting
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-60 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-indigo-500 transition-all duration-200 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-[11px] text-neutral-500">
          60 FPS High-Performance Engine • 3D Dollhouse Ready
        </p>
      </div>
    </div>
  );
}

export default function ShowroomPage() {
  const lightingMood = useShowroomStore((s) => s.lightingMood);
  const setLightingMood = useShowroomStore((s) => s.setLightingMood);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0d0e12]">
      {/* Interactive 3D Canvas */}
      <Suspense fallback={<ShowroomLoadingScreen />}>
        <ShowroomScene allowWheelZoom={true} />
      </Suspense>

      {/* Reference Image 4: Left Floating Architectural Material Configurator */}
      <ArchitecturalConfiguratorPanel />

      {/* Reference Image 4: Bottom Clean Room Navigation Dock & Zoom Controls */}
      <BottomRoomBar />

      {/* Floating Product Specification Drawer when an item is selected */}
      <ProductInfoDrawer />

      {/* Top-Right Quick Lighting & Fullscreen Pill */}
      <div className="absolute top-24 right-6 z-30 flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/95 dark:bg-[#181822]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-luxury">
        <button
          onClick={() => setLightingMood('daylight')}
          title="Warm Architectural Daylight"
          className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
            lightingMood === 'daylight'
              ? 'bg-amber-400/20 text-amber-500 font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Sun className="w-4 h-4" />
          <span className="hidden sm:inline text-[11px]">Warm Day</span>
        </button>

        <button
          onClick={() => setLightingMood('golden_hour')}
          title="Sunset Radiance"
          className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
            lightingMood === 'golden_hour'
              ? 'bg-amber-500/20 text-amber-400 font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Sunset className="w-4 h-4" />
          <span className="hidden sm:inline text-[11px]">Sunset</span>
        </button>

        <button
          onClick={() => setLightingMood('noir_evening')}
          title="Gallery Evening Ambiance"
          className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
            lightingMood === 'noir_evening'
              ? 'bg-indigo-500/20 text-indigo-400 font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Moon className="w-4 h-4" />
          <span className="hidden sm:inline text-[11px]">Evening</span>
        </button>

        <div className="w-[1px] h-4 bg-neutral-300 dark:bg-white/20 mx-0.5" />

        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          className="p-2 rounded-xl text-neutral-400 hover:text-white transition-colors"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
