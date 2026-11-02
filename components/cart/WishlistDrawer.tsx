'use client';

import React from 'react';
import Link from 'next/link';
import { X, Heart, Trash2, ArrowRight, Eye } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useShowroomStore } from '@/store/showroomStore';
import { PRODUCTS } from '@/data/products';

export const WishlistDrawer: React.FC = () => {
  const isWishlistDrawerOpen = useCartStore((s) => s.isWishlistDrawerOpen);
  const setWishlistDrawerOpen = useCartStore((s) => s.setWishlistDrawerOpen);
  const wishlist = useCartStore((s) => s.wishlist);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const focusProductById = useShowroomStore((s) => s.focusProductById);

  if (!isWishlistDrawerOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setWishlistDrawerOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-[#121217] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-10 text-white h-full overflow-hidden">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400 fill-red-400" />
              <h2 className="font-serif text-xl font-bold tracking-tight">
                Saved Masterpieces ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setWishlistDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="mt-4 max-h-[70vh] overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-white/20">
            {wishlistProducts.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <p className="text-neutral-400 text-sm">
                  Your wishlist is currently empty.
                </p>
                <Link
                  href="/showroom"
                  onClick={() => setWishlistDrawerOpen(false)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold hover:underline"
                >
                  Explore 3D Showroom <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300/80">
                        {product.category}
                      </span>
                      <h4 className="font-medium text-sm text-neutral-100">
                        {product.name}
                      </h4>
                      <div className="text-xs text-neutral-300 font-serif font-semibold mt-0.5">
                        AED {product.price.toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2 pt-2">
                    <Link
                      href="/showroom"
                      onClick={() => {
                        setWishlistDrawerOpen(false);
                        focusProductById(product.id);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/10 hover:bg-amber-300 hover:text-black text-neutral-200 text-xs font-semibold tracking-wider transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View in 3D
                    </Link>
                    <Link
                      href={`/products/${product.id}`}
                      onClick={() => setWishlistDrawerOpen(false)}
                      className="py-2 px-3 rounded-xl border border-white/10 hover:border-white/30 text-xs text-neutral-300 hover:text-white transition-all"
                    >
                      Specs
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <Link
            href="/collections"
            onClick={() => setWishlistDrawerOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/20 hover:border-amber-300 text-neutral-200 text-xs uppercase tracking-widest transition-all"
          >
            Browse Full Catalog
          </Link>
        </div>
      </div>
    </div>
  );
};

