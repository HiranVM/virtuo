'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useShowroomStore } from '@/store/showroomStore';
import { PRODUCTS } from '@/data/products';
import {
  UPHOLSTERY_MATERIALS,
  WOOD_FINISHES,
  METAL_ACCENTS,
  STONE_MATERIALS,
} from '@/data/materials';

export const CartDrawer: React.FC = () => {
  const isCartDrawerOpen = useCartStore((s) => s.isCartDrawerOpen);
  const setCartDrawerOpen = useCartStore((s) => s.setCartDrawerOpen);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const openQuotationModal = useShowroomStore((s) => s.openQuotationModal);

  if (!isCartDrawerOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  const getMaterialName = (id?: string) => {
    if (!id) return null;
    const all = [
      ...UPHOLSTERY_MATERIALS,
      ...WOOD_FINISHES,
      ...METAL_ACCENTS,
      ...STONE_MATERIALS,
    ];
    return all.find((m) => m.id === id)?.name || id;
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setCartDrawerOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-[#121217] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-10 text-white h-full overflow-hidden">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <h2 className="font-serif text-xl font-bold tracking-tight">
                Curated Selection ({items.length})
              </h2>
            </div>
            <button
              onClick={() => setCartDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-white/20">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <p className="text-neutral-400 text-sm">
                  Your curated collection is currently empty.
                </p>
                <Link
                  href="/showroom"
                  onClick={() => setCartDrawerOpen(false)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold hover:underline"
                >
                  Explore 3D Showroom <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const product = PRODUCTS.find((p) => p.id === item.productId);
                if (!product) return null;

                const upholsteryName = getMaterialName(item.config.upholsteryId);
                const finishName = getMaterialName(item.config.finishId);
                const accentName = getMaterialName(item.config.accentId);

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-medium text-sm text-neutral-100">
                          {product.name}
                        </h4>
                        <div className="text-xs text-amber-300 font-serif font-bold mt-0.5">
                          AED {(item.unitPrice * item.quantity).toLocaleString()}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Configured Materials Summary */}
                    <div className="text-[11px] text-neutral-400 space-y-0.5 border-t border-white/5 pt-2">
                      {upholsteryName && (
                        <div>
                          <span className="text-neutral-500">Finish:</span> {upholsteryName}
                        </div>
                      )}
                      {finishName && (
                        <div>
                          <span className="text-neutral-500">Timber/Base:</span> {finishName}
                        </div>
                      )}
                      {accentName && (
                        <div>
                          <span className="text-neutral-500">Hardware:</span> {accentName}
                        </div>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:text-amber-300 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs px-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:text-amber-300 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-[11px] text-neutral-400">
                        AED {item.unitPrice.toLocaleString()} each
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer Checkout / Quotation */}
        {items.length > 0 && (
          <div className="border-t border-white/10 pt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-400">Estimated Total</span>
              <span className="font-serif text-2xl font-bold text-amber-200">
                AED {subtotal.toLocaleString()}
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              Includes White-Glove installation consultation & bespoke freight insurance.
            </p>

            <button
              onClick={() => {
                setCartDrawerOpen(false);
                openQuotationModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-amber-300 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-widest transition-all shadow-glow"
            >
              <Sparkles className="w-4 h-4" />
              Generate Formal Quotation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

