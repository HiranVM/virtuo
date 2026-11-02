'use client';

import React from 'react';
import { Html } from '@react-three/drei';
import { useShowroomStore } from '@/store/showroomStore';
import { useCartStore } from '@/store/cartStore';
import { ConfigurableRoomItem } from '@/data/roomSurfaces';

interface NumberedPinProps {
  item: ConfigurableRoomItem;
}

export const NumberedPin: React.FC<NumberedPinProps> = ({ item }) => {
  const showHotspots = useShowroomStore((s) => s.showHotspots);
  const activeConfigurableItemId = useShowroomStore((s) => s.activeConfigurableItemId);
  const setActiveConfigurableItem = useShowroomStore((s) => s.setActiveConfigurableItem);
  const isQuotationModalOpen = useShowroomStore((s) => s.isQuotationModalOpen);
  const isCartDrawerOpen = useCartStore((s) => s.isCartDrawerOpen);
  const isWishlistDrawerOpen = useCartStore((s) => s.isWishlistDrawerOpen);

  // If user has a major overlay modal open, hide pins so they never overlap
  if (!showHotspots || isQuotationModalOpen || isCartDrawerOpen || isWishlistDrawerOpen) {
    return null;
  }

  const isActive = activeConfigurableItemId === item.id;

  return (
    <group position={item.pinPosition}>
      <Html
        center
        distanceFactor={11}
        // Low z-index range (5 to 0) so all UI panels, sidebars, and modals sit comfortably above it
        zIndexRange={[5, 0]}
        style={{
          pointerEvents: 'auto',
          userSelect: 'none',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveConfigurableItem(item.id);
          }}
          title={`Configure ${item.title}`}
          className={`relative group flex items-center justify-center rounded-full font-bold text-xs shadow-md transition-all duration-300 ${
            isActive
              ? 'w-7 h-7 scale-110 ring-4 ring-white/90 ring-offset-2 ring-offset-black/50'
              : 'w-6 h-6 hover:scale-120 opacity-90 hover:opacity-100'
          }`}
          style={{ backgroundColor: item.badgeHex }}
        >
          {isActive && (
            <span
              className="absolute -inset-1 rounded-full animate-ping opacity-30 pointer-events-none"
              style={{ backgroundColor: item.badgeHex }}
            />
          )}

          <span className="relative text-white font-mono text-[11px] font-extrabold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {item.number}
          </span>

          {/* Quick tooltip card */}
          <div className="absolute left-8 px-2 py-0.5 rounded-md bg-black/90 backdrop-blur-md border border-white/20 text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            {item.number}. {item.title}
          </div>
        </button>
      </Html>
    </group>
  );
};
