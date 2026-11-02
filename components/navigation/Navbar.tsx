'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, ShoppingBag, Compass, Layers, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useShowroomStore } from '@/store/showroomStore';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const cartItems = useCartStore((s) => s.items);
  const wishlist = useCartStore((s) => s.wishlist);
  const setCartDrawerOpen = useCartStore((s) => s.setCartDrawerOpen);
  const setWishlistDrawerOpen = useCartStore((s) => s.setWishlistDrawerOpen);
  const openQuotationModal = useShowroomStore((s) => s.openQuotationModal);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c5a880] to-[#8f7551] flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-300">
            <span className="font-serif text-black font-extrabold text-xl tracking-tighter">
              V
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.25em] text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
              VIRTUO
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-400">
              Architectural Showroom
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
              pathname === '/'
                ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                : 'text-neutral-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Studio
          </Link>
          <Link
            href="/showroom"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
              pathname === '/showroom'
                ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                : 'text-neutral-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            3D Pavilion
          </Link>
          <Link
            href="/collections"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
              pathname === '/collections'
                ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                : 'text-neutral-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Catalogue
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Bespoke Quote Button */}
          <button
            onClick={() => openQuotationModal()}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white/50 text-neutral-200 text-xs font-mono tracking-wider uppercase transition-all duration-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Trade Dossier
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setWishlistDrawerOpen(true)}
            aria-label="Wishlist"
            className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setCartDrawerOpen(true)}
            aria-label="Shopping Cart"
            className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-black text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

