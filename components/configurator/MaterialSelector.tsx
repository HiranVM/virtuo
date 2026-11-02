'use client';

import React from 'react';
import { RotateCcw, Check } from 'lucide-react';
import { FurnitureProduct, MaterialOption } from '@/types/showroom';
import { useShowroomStore } from '@/store/showroomStore';

interface MaterialSelectorProps {
  product: FurnitureProduct;
}

export const MaterialSelector: React.FC<MaterialSelectorProps> = ({ product }) => {
  const customizations = useShowroomStore(
    (s) => s.productCustomizations[product.id]
  );
  const updateCustomization = useShowroomStore((s) => s.updateCustomization);
  const resetCustomization = useShowroomStore((s) => s.resetCustomization);

  const parts = product.customizableParts;

  const renderSection = (
    title: string,
    slot: 'upholsteryId' | 'finishId' | 'accentId',
    partConfig?: { label: string; options: MaterialOption[]; defaultId: string }
  ) => {
    if (!partConfig || partConfig.options.length === 0) return null;

    const currentSelectedId = customizations?.[slot] || partConfig.defaultId;

    return (
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-neutral-300">{partConfig.label}</span>
          <span className="text-[11px] text-amber-300 font-medium">
            {partConfig.options.find((o) => o.id === currentSelectedId)?.name || 'Default'}
          </span>
        </div>

        {/* Swatch grid */}
        <div className="grid grid-cols-4 gap-2">
          {partConfig.options.map((option) => {
            const isSelected = currentSelectedId === option.id;

            return (
              <button
                key={option.id}
                onClick={() => updateCustomization(product.id, slot, option.id)}
                title={`${option.name}${option.additionalPrice ? ` (+AED ${option.additionalPrice.toLocaleString()})` : ''}`}
                className={`group relative flex flex-col items-center p-1.5 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? 'border-amber-300 bg-amber-400/10 shadow-glow'
                    : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                {/* Circular Swatch */}
                <div
                  className="w-7 h-7 rounded-full shadow-inner relative flex items-center justify-center border border-white/20 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: option.color }}
                >
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                  )}
                </div>

                {/* Option Name Abbreviation */}
                <span className="text-[10px] text-neutral-300 mt-1 line-clamp-1 text-center w-full">
                  {option.name.split(' ')[0]}
                </span>

                {/* Extra Price tag */}
                {option.additionalPrice ? (
                  <span className="text-[9px] text-amber-300/80">
                    +AED {option.additionalPrice.toLocaleString()}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <h4 className="text-xs uppercase tracking-widest font-semibold text-neutral-300">
          Material & Finish Atelier
        </h4>
        <button
          onClick={() => resetCustomization(product.id)}
          className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-amber-300 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset Default
        </button>
      </div>

      {renderSection('Upholstery', 'upholsteryId', parts.upholstery)}
      {renderSection('Structure & Base', 'finishId', parts.finish)}
      {renderSection('Hardware Accents', 'accentId', parts.accent)}
    </div>
  );
};

