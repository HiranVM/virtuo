'use client';

import React from 'react';
import {
  Compass,
  Armchair,
  Utensils,
  Bed,
  Box,
  Plus,
  Minus,
  RotateCcw,
  Tag,
  Maximize2,
  CheckCircle,
} from 'lucide-react';
import { useShowroomStore, ViewMode } from '@/store/showroomStore';
import { ShowroomZoneId } from '@/types/showroom';

export const BottomRoomBar: React.FC = () => {
  const activeZone = useShowroomStore((s) => s.activeZone);
  const setActiveZone = useShowroomStore((s) => s.setActiveZone);
  const viewMode = useShowroomStore((s) => s.viewMode);
  const setViewMode = useShowroomStore((s) => s.setViewMode);
  const zoomIn = useShowroomStore((s) => s.zoomIn);
  const zoomOut = useShowroomStore((s) => s.zoomOut);
  const triggerCameraReset = useShowroomStore((s) => s.triggerCameraReset);
  const showHotspots = useShowroomStore((s) => s.showHotspots);
  const toggleHotspots = useShowroomStore((s) => s.toggleHotspots);

  const rooms: Array<{ id: ShowroomZoneId; label: string; icon: React.ReactNode }> = [
    { id: 'overview', label: 'Hallway', icon: <Compass className="w-4 h-4" /> },
    { id: 'living', label: 'Living Room', icon: <Armchair className="w-4 h-4" /> },
    { id: 'dining', label: 'Dining Area', icon: <Utensils className="w-4 h-4" /> },
    { id: 'bedroom', label: 'Master Suite', icon: <Bed className="w-4 h-4" /> },
  ];

  const handleRoomClick = (id: ShowroomZoneId) => {
    setViewMode('interior');
    setActiveZone(id);
  };

  const toggleIsometricMode = () => {
    setViewMode(viewMode === 'isometric' ? 'interior' : 'isometric');
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col sm:flex-row items-center gap-3 max-w-[95vw]">
      {/* On-screen Zoom & Camera Reset Controls (Solves Wheel Frustration!) */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/95 dark:bg-[#181822]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-luxury">
        <button
          onClick={zoomIn}
          title="Zoom In"
          className="p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={zoomOut}
          title="Zoom Out"
          className="p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-neutral-300 dark:bg-white/20 mx-0.5" />
        <button
          onClick={triggerCameraReset}
          title="Reset View"
          className="p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={toggleHotspots}
          title={showHotspots ? 'Hide 3D Pins' : 'Show 3D Pins'}
          className={`p-2 rounded-xl transition-colors ${
            showHotspots
              ? 'text-emerald-500 bg-emerald-500/10'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Tag className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Room Tabs Dock (Exact design matching Reference Image 4) */}
      <div className="flex items-center gap-2 p-2 rounded-3xl bg-white/95 dark:bg-[#181822]/95 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-2xl overflow-x-auto scrollbar-none">
        {rooms.map((room) => {
          const isActive = viewMode === 'interior' && activeZone === room.id;

          return (
            <button
              key={room.id}
              onClick={() => handleRoomClick(room.id)}
              className={`group flex flex-col items-center justify-center min-w-[72px] sm:min-w-[88px] px-3 py-2.5 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'bg-neutral-100 dark:bg-white/10 text-neutral-900 dark:text-white ring-2 ring-emerald-500 ring-offset-2 ring-offset-white dark:ring-offset-black font-bold shadow-md'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5'
              }`}
            >
              <div className="mb-1 text-inherit">{room.icon}</div>
              <span className="text-[11px] tracking-tight">{room.label}</span>
              {isActive && (
                <div className="w-4 h-1 rounded-full bg-emerald-500 mt-1" />
              )}
            </button>
          );
        })}

        {/* Isometric 3D Cutaway Dollhouse Mode (Matching Reference Image 3 & 5!) */}
        <button
          onClick={toggleIsometricMode}
          className={`group flex flex-col items-center justify-center min-w-[72px] sm:min-w-[88px] px-3 py-2.5 rounded-2xl transition-all duration-200 ${
            viewMode === 'isometric'
              ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 ring-offset-2 ring-offset-white dark:ring-offset-black font-bold shadow-lg'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5'
          }`}
        >
          <div className="mb-1 text-inherit">
            <Box className="w-4 h-4" />
          </div>
          <span className="text-[11px] tracking-tight whitespace-nowrap">
            3D Cutaway
          </span>
          {viewMode === 'isometric' && (
            <div className="w-4 h-1 rounded-full bg-white mt-1" />
          )}
        </button>
      </div>
    </div>
  );
};

