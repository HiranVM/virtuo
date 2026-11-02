'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Compass,
  Heart,
  ShoppingBag,
  Sparkles,
  Clock,
  ShieldCheck,
  Check,
  ArrowLeft,
} from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { FurnitureProduct } from '@/types/showroom';
import {
  UPHOLSTERY_MATERIALS,
  WOOD_FINISHES,
  METAL_ACCENTS,
  STONE_MATERIALS,
} from '@/data/materials';
import { MaterialSelector } from '@/components/configurator/MaterialSelector';
import { useShowroomStore } from '@/store/showroomStore';
import { useCartStore } from '@/store/cartStore';

const SingleProductStudio = dynamic(
  () =>
    import('@/three/scenes/SingleProductStudio').then(
      (mod) => mod.SingleProductStudio
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 text-xs">
        Loading 360° Studio Engine...
      </div>
    ),
  }
);

interface ProductDetailClientProps {
  product: FurnitureProduct;
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
  const customizations = useShowroomStore(
    (s) => s.productCustomizations[product.id]
  );
  const openQuotationModal = useShowroomStore((s) => s.openQuotationModal);
  const focusProductById = useShowroomStore((s) => s.focusProductById);

  const addItemToCart = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const isInWishlist = useCartStore((s) => s.isInWishlist(product.id));

  const [addedAnimation, setAddedAnimation] = useState(false);

  // Compute live price with custom finishes
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
    <div className="min-h-screen bg-[#0a0a0d] text-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Collections</span>
          </Link>

          <Link
            href="/showroom"
            onClick={() => focusProductById(product.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-300 text-xs font-semibold hover:bg-amber-400/20 transition-all"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>View Inside 3D Showroom</span>
          </Link>
        </div>

        {/* Main 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: 360° Studio Turntable Canvas */}
          <div className="lg:col-span-7 space-y-4">
            <div className="h-[520px] w-full rounded-3xl overflow-hidden shadow-luxury border border-white/10 bg-[#121217]">
              <SingleProductStudio product={product} />
            </div>

            {/* Scale & Dimensions strip */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="text-[10px] uppercase text-neutral-400">Width</span>
                <div className="font-semibold text-sm text-neutral-200">
                  {product.dimensions.width} cm
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase text-neutral-400">Depth</span>
                <div className="font-semibold text-sm text-neutral-200">
                  {product.dimensions.depth} cm
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase text-neutral-400">Height</span>
                <div className="font-semibold text-sm text-neutral-200">
                  {product.dimensions.height} cm
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information, Material Customizer & Order Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2 border-b border-white/10 pb-5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-300/30 text-[10px] font-bold uppercase tracking-widest text-amber-300">
                  {product.category}
                </span>
                <span className="text-xs text-neutral-400 font-medium">
                  Designed by {product.designer}
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400">{product.subtitle}</p>

              {/* Price */}
              <div className="pt-3 flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-amber-200">
                  AED {finalPrice.toLocaleString()}
                </span>
                {extraPrice > 0 && (
                  <span className="text-xs text-amber-300">
                    (+AED {extraPrice.toLocaleString()} custom finishes)
                  </span>
                )}
              </div>
            </div>

            {/* Real-time Material Configurator */}
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10 shadow-lg">
              <MaterialSelector product={product} />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-amber-300 hover:bg-amber-400 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-glow"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Order!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Order
                    </>
                  )}
                </button>

                <button
                  onClick={() => openQuotationModal(product.id)}
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border border-white/20 hover:border-amber-300/60 hover:bg-white/5 text-neutral-200 text-xs font-semibold tracking-wider uppercase transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Get Quotation
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs transition-colors ${
                  isInWishlist
                    ? 'border-red-400/40 bg-red-400/10 text-red-300'
                    : 'border-white/10 hover:border-white/30 text-neutral-400 hover:text-white'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${isInWishlist ? 'fill-red-400 text-red-400' : ''}`}
                />
                {isInWishlist ? 'Saved in Masterpiece Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Description & Atelier Features */}
            <div className="space-y-4 pt-2">
              <p className="text-xs text-neutral-300 leading-relaxed">
                {product.longDescription || product.description}
              </p>

              <div className="space-y-2 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-200">
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  Structural Integrity & Craft
                </div>
                <ul className="space-y-1.5 text-xs text-neutral-400">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-400/5 border border-amber-300/20 text-xs text-amber-200">
                <Clock className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <span>Production Lead Time: {product.leadTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

