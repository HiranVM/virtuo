'use client';

import React, { useState } from 'react';
import {
  RotateCcw,
  Sun,
  Sunset,
  Moon,
  Tag,
  Maximize2,
  Minimize2,
  Box,
  Compass,
  Armchair,
  Utensils,
  Bed,
} from 'lucide-react';
import { useShowroomStore } from '@/store/showroomStore';
import { SHOWROOM_ZONES } from '@/data/products';
import { ShowroomZoneId, LightingMood } from '@/types/showroom';

export const ShowroomControls: React.FC = () => {
  const activeZone = useShowroomStore((s) => s.activeZone);
  const setActiveZone = useShowroomStore((s) => s.setActiveZone);
  const triggerCameraReset = useShowroomStore((s) => s.triggerCameraReset);
  const lightingMood = useShowroomStore((s) => s.lightingMood);
  const setLightingMood = useShowroomStore((s) => s.setLightingMood);
  const showHotspots = useShowroomStore((s) => s.showHotspots);
  const toggleHotspots = useShowroomStore((s) => s.toggleHotspots);
  const isWireframe = useShowroomStore((s) => s.isWireframe);
  const toggleWireframe = useShowroomStore((s) => s.toggleWireframe);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  const getZoneIcon = (id: ShowroomZoneId) => {
    switch (id) {
      case 'overview':
        return <Compass className="w-3.5 h-3.5" />;
      case 'living':
        return <Armchair className="w-3.5 h-3.5" />;
      case 'dining':
        return <Utensils className="w-3.5 h-3.5" />;
      case 'bedroom':
        return <Bed className="w-3.5 h-3.5" />;
    }
  };

  return (
    <>
      {/* Top Zone Navigation Bar */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-luxury max-w-[95vw] overflow-x-auto scrollbar-none">
        {SHOWROOM_ZONES.map((zone) => {
          const isActive = activeZone === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => setActiveZone(zone.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? 'bg-amber-300 text-black font-semibold shadow-glow scale-[1.02]'
                  : 'text-neutral-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {getZoneIcon(zone.id)}
              <span>{zone.name}</span>
            </button>
          );
        })}
      </div>

      {/* Floating Left Camera & Viewport Tools */}
      <div className="absolute top-44 left-6 z-20 flex flex-col gap-2.5">
        {/* Reset View Button */}
        <button
          onClick={triggerCameraReset}
          title="Reset Camera View"
          className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/10 hover:border-amber-300/40 text-neutral-300 hover:text-amber-200 transition-all duration-300 shadow-luxury"
        >
          <RotateCcw className="w-4 h-4 transition-transform group-hover:-rotate-90 duration-300" />
          <span className="absolute left-14 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[11px] text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            Reset Camera View
          </span>
        </button>

        {/* Toggle Hotspots */}
        <button
          onClick={toggleHotspots}
          title={showHotspots ? 'Hide 3D Hotspots' : 'Show 3D Hotspots'}
          className={`group relative flex items-center justify-center w-11 h-11 rounded-xl backdrop-blur-xl border transition-all duration-300 shadow-luxury ${
            showHotspots
              ? 'bg-amber-300/10 border-amber-300/40 text-amber-300'
              : 'bg-black/60 border-white/10 text-neutral-400 hover:text-white hover:bg-black/90'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span className="absolute left-14 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[11px] text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            {showHotspots ? 'Hotspots Active' : 'Hotspots Hidden'}
          </span>
        </button>

        {/* Toggle Wireframe */}
        <button
          onClick={toggleWireframe}
          title="Toggle Wireframe CAD Mode"
          className={`group relative flex items-center justify-center w-11 h-11 rounded-xl backdrop-blur-xl border transition-all duration-300 shadow-luxury ${
            isWireframe
              ? 'bg-amber-300/20 border-amber-300 text-amber-300'
              : 'bg-black/60 border-white/10 text-neutral-400 hover:text-white hover:bg-black/90'
          }`}
        >
          <Box className="w-4 h-4" />
          <span className="absolute left-14 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[11px] text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            {isWireframe ? 'Wireframe Mode: ON' : 'Wireframe Mode: OFF'}
          </span>
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          title="Toggle Fullscreen"
          className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/10 hover:border-amber-300/40 text-neutral-300 hover:text-amber-200 transition-all duration-300 shadow-luxury"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
          <span className="absolute left-14 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[11px] text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </span>
        </button>
      </div>

      {/* Floating Bottom-Left Lighting Mood Selector */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-luxury">
        <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 px-2 hidden sm:inline">
          Lighting
        </span>
        <button
          onClick={() => setLightingMood('daylight')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            lightingMood === 'daylight'
              ? 'bg-white/20 text-white font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Sun className="w-3.5 h-3.5 text-amber-200" />
          <span className="hidden sm:inline">Day</span>
        </button>
        <button
          onClick={() => setLightingMood('golden_hour')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            lightingMood === 'golden_hour'
              ? 'bg-amber-400/20 text-amber-200 border border-amber-400/30 font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Sunset className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Golden</span>
        </button>
        <button
          onClick={() => setLightingMood('noir_evening')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            lightingMood === 'noir_evening'
              ? 'bg-indigo-900/40 text-indigo-200 border border-indigo-400/30 font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Moon className="w-3.5 h-3.5 text-indigo-300" />
          <span className="hidden sm:inline">Noir</span>
        </button>
      </div>

      {/* Floating Navigation Hint */}
      <div className="hidden lg:flex items-center gap-3 absolute bottom-6 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/5 text-[11px] text-neutral-400 select-none">
        <span>Click furniture to inspect</span>
        <span>•</span>
        <span>Drag to orbit camera</span>
        <span>•</span>
        <span>Scroll to zoom</span>
        <span>•</span>
        <span>Right-click to pan</span>
      </div>
    </>
  );
};

