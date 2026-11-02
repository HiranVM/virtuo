'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, ArrowRight, Sparkles, Eye, X } from 'lucide-react';
import { useShowroomStore } from '@/store/showroomStore';
import { ROOM_CONFIGURABLE_ITEMS, SurfaceOption } from '@/data/roomSurfaces';

export const ArchitecturalConfiguratorPanel: React.FC = () => {
  const activeConfigurableItemId = useShowroomStore((s) => s.activeConfigurableItemId);
  const setActiveConfigurableItem = useShowroomStore((s) => s.setActiveConfigurableItem);
  const selectNextConfigurableItem = useShowroomStore((s) => s.selectNextConfigurableItem);
  const roomSelections = useShowroomStore((s) => s.roomSelections);
  const setRoomSelection = useShowroomStore((s) => s.setRoomSelection);
  const openQuotationModal = useShowroomStore((s) => s.openQuotationModal);
  const activeZone = useShowroomStore((s) => s.activeZone);

  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  const getZoneTitle = () => {
    switch (activeZone) {
      case 'living':
        return 'Living Room';
      case 'dining':
        return 'Dining Sanctuary';
      case 'bedroom':
        return 'Master Suite';
      default:
        return 'Showroom Pavilion';
    }
  };

  if (isPanelCollapsed) {
    return (
      <button
        onClick={() => setIsPanelCollapsed(false)}
        className="absolute top-24 left-6 z-30 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-[#16161d]/95 backdrop-blur-xl border border-white/20 text-neutral-900 dark:text-white font-semibold text-xs shadow-2xl hover:scale-105 transition-all"
      >
        <Sparkles className="w-4 h-4 text-purple-500" />
        <span>Open Material Configurator</span>
      </button>
    );
  }

  return (
    <div className="absolute top-24 left-6 z-50 w-80 sm:w-88 max-w-[90vw] pointer-events-none transition-all duration-300">
      <div className="pointer-events-auto flex flex-col gap-3">
        {/* Top Room Indicator Pill (Matching Image 4) */}
        <div className="inline-flex items-center justify-between px-4 py-2 rounded-2xl bg-[#1c1c24]/90 backdrop-blur-xl border border-white/10 shadow-lg text-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-serif text-sm font-bold tracking-wide">
              {getZoneTitle()}
            </span>
          </div>
          <button
            onClick={() => setIsPanelCollapsed(true)}
            className="text-neutral-400 hover:text-white text-xs p-1"
            title="Minimize Panel"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Main Floating Configurator Card (Matching Image 4) */}
        <div className="bg-white/95 dark:bg-[#181822]/95 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-3xl p-5 shadow-2xl text-neutral-900 dark:text-white max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
          <div className="space-y-3">
            {ROOM_CONFIGURABLE_ITEMS.map((item) => {
              const isExpanded = activeConfigurableItemId === item.id;
              const currentSelectedOptionId =
                roomSelections[item.id] || item.defaultOptionId;
              const currentOption = item.options.find(
                (o) => o.id === currentSelectedOptionId
              );

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl transition-all duration-200 border ${
                    isExpanded
                      ? 'bg-neutral-50 dark:bg-white/5 border-neutral-300 dark:border-white/20 p-3 shadow-md'
                      : 'border-transparent hover:bg-neutral-100 dark:hover:bg-white/5 p-2'
                  }`}
                >
                  {/* Item Accordion Header */}
                  <button
                    onClick={() =>
                      setActiveConfigurableItem(isExpanded ? null : item.id)
                    }
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      {/* Numbered Badge Pill (Matching Image 4) */}
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs font-mono shadow-sm ${item.badgeColor}`}
                      >
                        {item.number}
                      </span>
                      <div>
                        <div className="font-medium text-xs text-neutral-900 dark:text-white">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                          {currentOption?.name}
                        </div>
                      </div>
                    </div>

                    <div className="text-neutral-400">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* Swatches Section (When expanded, exactly like Image 4) */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-white/10 space-y-2">
                      <div className="grid grid-cols-4 gap-2">
                        {item.options.map((option) => {
                          const isSelected =
                            currentSelectedOptionId === option.id;

                          return (
                            <button
                              key={option.id}
                              onClick={() =>
                                setRoomSelection(item.id, option.id)
                              }
                              className={`group relative flex flex-col items-center p-1 rounded-xl transition-all ${
                                isSelected
                                  ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-white dark:ring-offset-black scale-105'
                                  : 'hover:scale-102 opacity-80 hover:opacity-100'
                              }`}
                            >
                              {/* Swatch Preview Block */}
                              <div
                                className={`w-12 h-12 rounded-xl shadow-inner border border-black/10 dark:border-white/20 flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${
                                  option.previewGradient || 'from-neutral-400 to-neutral-600'
                                }`}
                                style={{ backgroundColor: option.color }}
                              >
                                {isSelected && (
                                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md">
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  </div>
                                )}
                              </div>

                              {/* SET Badge for active swatch (Matching Image 4!) */}
                              {isSelected ? (
                                <span className="mt-1 px-1.5 py-0.5 rounded bg-emerald-500 text-white font-extrabold text-[8px] uppercase tracking-wider">
                                  SET
                                </span>
                              ) : (
                                <span className="mt-1 text-[9px] text-neutral-600 dark:text-neutral-400 line-clamp-1 w-full text-center">
                                  {option.name.split(' ')[0]}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Big Purple/Indigo "NEXT" Button (Matching Image 4) */}
          <div className="pt-4 border-t border-neutral-200 dark:border-white/10 mt-4">
            <button
              onClick={() => selectNextConfigurableItem()}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-indigo-500/25"
            >
              <span>NEXT STEP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

