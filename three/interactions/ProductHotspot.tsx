'use client';

import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { useShowroomStore } from '@/store/showroomStore';
import { useCartStore } from '@/store/cartStore';
import { FurnitureProduct } from '@/types/showroom';

interface ProductHotspotProps {
  product: FurnitureProduct;
}

export const ProductHotspot: React.FC<ProductHotspotProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const selectedProductId = useShowroomStore((s) => s.selectedProductId);
  const selectProduct = useShowroomStore((s) => s.selectProduct);
  const showHotspots = useShowroomStore((s) => s.showHotspots);
  const isQuotationModalOpen = useShowroomStore((s) => s.isQuotationModalOpen);
  const isCartDrawerOpen = useCartStore((s) => s.isCartDrawerOpen);
  const isWishlistDrawerOpen = useCartStore((s) => s.isWishlistDrawerOpen);

  if (!showHotspots || isQuotationModalOpen || isCartDrawerOpen || isWishlistDrawerOpen) {
    return null;
  }

  const isSelected = selectedProductId === product.id;

  const hotspotPos: [number, number, number] = [
    product.defaultPosition[0],
    product.defaultPosition[1] + (product.dimensions.height / 100) * 0.9 + 0.35,
    product.defaultPosition[2],
  ];

  return (
    <group position={hotspotPos}>
      <Html
        center
        distanceFactor={14}
        zIndexRange={[5, 0]}
        style={{
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'auto',
          userSelect: 'none',
        }}
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            selectProduct(product.id);
          }}
          className="group relative flex items-center cursor-pointer"
        >
          {/* Pulsing Beacon Dot */}
          <div
            className={`relative flex items-center justify-center w-6 h-6 rounded-full backdrop-blur-md transition-all duration-300 ${
              isSelected
                ? 'bg-amber-400 text-black scale-110 shadow-lg'
                : 'bg-black/70 text-white/90 border border-white/20 hover:border-amber-300 hover:scale-105'
            }`}
          >
            {isSelected && (
              <span className="absolute inline-flex h-full w-full rounded-full opacity-40 animate-ping bg-amber-400" />
            )}
            <svg
              className="w-3 h-3 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>

          {/* Expanded Card on Hover */}
          <div
            className={`absolute left-8 whitespace-nowrap px-3 py-1.5 rounded-xl backdrop-blur-xl border transition-all duration-200 flex items-center gap-2.5 shadow-xl ${
              isHovered || isSelected
                ? 'opacity-100 translate-x-0 pointer-events-auto bg-black/90 border-amber-300/40 text-white'
                : 'opacity-0 -translate-x-2 pointer-events-none'
            }`}
          >
            <div>
              <div className="text-[10px] font-medium tracking-wider uppercase text-amber-300/90">
                {product.name}
              </div>
              <div className="text-[11px] font-semibold text-neutral-200">
                AED {product.price.toLocaleString()}
              </div>
            </div>
            <div className="text-[9px] uppercase font-bold tracking-widest text-neutral-400 border border-neutral-700 rounded px-1.5 py-0.5">
              Inspect
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};
