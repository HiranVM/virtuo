'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  Heart,
  ShoppingBag,
  Sliders,
  Sparkles,
  ExternalLink,
  Ruler,
  Clock,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useShowroomStore } from '@/store/showroomStore';
import { useCartStore } from '@/store/cartStore';
import { PRODUCTS } from '@/data/products';
import {
  UPHOLSTERY_MATERIALS,
  WOOD_FINISHES,
  METAL_ACCENTS,
  STONE_MATERIALS,
} from '@/data/materials';
import { MaterialSelector } from '../configurator/MaterialSelector';

export const ProductInfoDrawer: React.FC = () => {
  const selectedProductId = useShowroomStore((s) => s.selectedProductId);
  const selectProduct = useShowroomStore((s) => s.selectProduct);
  const customizations = useShowroomStore(
    (s) => (selectedProductId ? s.productCustomizations[selectedProductId] : undefined)
  );
  const openQuotationModal = useShowroomStore((s) => s.openQuotationModal);

  const addItemToCart = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const isInWishlist = useCartStore((s) =>
    selectedProductId ? s.isInWishlist(selectedProductId) : false
  );

  const [activeTab, setActiveTab] = useState<'details' | 'customize'>('customize');
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!selectedProductId) return null;

  const product = PRODUCTS.find((p) => p.id === selectedProductId);
  if (!product) return null;

  // Calculate live dynamic price including custom material upgrades
  let extraPrice = 0;
  if (customizations?.upholsteryId) {
    const up =
      UPHOLSTERY_MATERIALS.find((m) => m.id === customizations.upholsteryId) ||
      STONE_MATERIALS.find((m) => m.id === customizations.upholsteryId);
    if (up?.additionalPrice) extraPrice += up.additionalPrice;
  }
  if (customizations?.finishId) {
    const fn =
      WOOD_FINISHES.find((m) => m.id === customizations.finishId) ||
      STONE_MATERIALS.find((m) => m.id === customizations.finishId);
    if (fn?.additionalPrice) extraPrice += fn.additionalPrice;
  }
  if (customizations?.accentId) {
    const ac = METAL_ACCENTS.find((m) => m.id === customizations.accentId);
    if (ac?.additionalPrice) extraPrice += ac.additionalPrice;
  }

  const finalPrice = product.price + extraPrice;

  const handleAddToCart = () => {
    if (!customizations) return;
    addItemToCart(product.id, customizations, finalPrice);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <aside className="absolute right-4 top-24 bottom-6 z-50 w-full max-w-md sm:max-w-lg pointer-events-none flex flex-col justify-end sm:justify-start">
      <div className="pointer-events-auto bg-black/85 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden text-white transition-all duration-300">
        {/* Drawer Header */}
        <div className="p-5 pb-4 border-b border-white/10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-300/30 text-[10px] font-semibold uppercase tracking-widest text-amber-300">
                {product.zone.toUpperCase()} ZONE
              </span>
              <span className="text-[11px] text-neutral-400 font-medium">
                {product.designer}
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
              {product.name}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">{product.subtitle}</p>
          </div>

          <button
            onClick={() => selectProduct(null)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Price & Primary Switch Tabs */}
        <div className="px-5 py-3 bg-white/5 flex items-center justify-between border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-400">
              Total Investment
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-amber-200">
                AED {finalPrice.toLocaleString()}
              </span>
              {extraPrice > 0 && (
                <span className="text-xs text-amber-300/80">
                  (+AED {extraPrice.toLocaleString()} custom finish)
                </span>
              )}
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/10">
            <button
              onClick={() => setActiveTab('customize')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                activeTab === 'customize'
                  ? 'bg-amber-300 text-black font-semibold shadow-sm'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Customize
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                activeTab === 'details'
                  ? 'bg-amber-300 text-black font-semibold shadow-sm'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Specs
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 overflow-y-auto space-y-6 max-h-[46vh] scrollbar-thin scrollbar-thumb-white/20">
          {activeTab === 'customize' ? (
            <MaterialSelector product={product} />
          ) : (
            <div className="space-y-5 text-sm">
              <p className="text-neutral-300 leading-relaxed text-xs">
                {product.longDescription || product.description}
              </p>

              {/* Architectural Dimensions */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-200">
                  <Ruler className="w-4 h-4 text-amber-300" />
                  Dimensions & Scale
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                    <div className="text-[10px] text-neutral-400 uppercase">Width</div>
                    <div className="font-semibold text-neutral-200">
                      {product.dimensions.width} cm
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                    <div className="text-[10px] text-neutral-400 uppercase">Depth</div>
                    <div className="font-semibold text-neutral-200">
                      {product.dimensions.depth} cm
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                    <div className="text-[10px] text-neutral-400 uppercase">Height</div>
                    <div className="font-semibold text-neutral-200">
                      {product.dimensions.height} cm
                    </div>
                  </div>
                </div>
              </div>

              {/* Craftsmanship Features */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-200">
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  Atelier Craftsmanship
                </div>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lead time & production */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-400/5 border border-amber-300/20 text-xs text-amber-200">
                <Clock className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <span>{product.leadTime}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="p-4 bg-white/5 border-t border-white/10 flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2">
            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-300 hover:bg-amber-400 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-glow"
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" /> Added!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Add to Order
                </>
              )}
            </button>

            {/* Request Quotation */}
            <button
              onClick={() => openQuotationModal(product.id)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/20 hover:border-amber-300/60 hover:bg-white/5 text-neutral-200 text-xs font-semibold tracking-wider uppercase transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Get Quote
            </button>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 px-1">
            {/* Wishlist Toggle */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`flex items-center gap-1.5 transition-colors ${
                isInWishlist
                  ? 'text-red-400 font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${isInWishlist ? 'fill-red-400 text-red-400' : ''}`}
              />
              {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
            </button>

            {/* Standalone Studio link */}
            <Link
              href={`/products/${product.id}`}
              className="flex items-center gap-1 text-amber-300/80 hover:text-amber-200 transition-colors"
            >
              <span>360° Studio View</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

