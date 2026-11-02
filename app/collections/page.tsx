'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Compass,
  Search,
  Filter,
  Eye,
  Sliders,
  Heart,
  ShoppingBag,
  ArrowUpDown,
  Sparkles,
} from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { PRODUCTS } from '@/data/products';
import { COLLECTIONS_DATA } from '@/data/collections';
import { ProductCategory } from '@/types/showroom';
import { useShowroomStore } from '@/store/showroomStore';
import { useCartStore } from '@/store/cartStore';

function CollectionsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as ProductCategory | null;

  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  const focusProductById = useShowroomStore((s) => s.focusProductById);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const isInWishlist = useCartStore((s) => s.isInWishlist);
  const addItemToCart = useCartStore((s) => s.addItem);
  const customizations = useShowroomStore((s) => s.productCustomizations);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.designer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleQuickAdd = (productId: string, price: number) => {
    const config = customizations[productId] || {
      upholsteryId: PRODUCTS.find((p) => p.id === productId)?.customizableParts.upholstery?.defaultId,
      finishId: PRODUCTS.find((p) => p.id === productId)?.customizableParts.finish?.defaultId,
      accentId: PRODUCTS.find((p) => p.id === productId)?.customizableParts.accent?.defaultId,
    };
    addItemToCart(productId, config, price);
  };

  return (
    <>
      {/* Filter and Search Bar */}
      <div className="sticky top-20 z-30 bg-[#0a0a0d]/90 backdrop-blur-xl border-b border-white/10 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-amber-300 text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              All Categories ({PRODUCTS.length})
            </button>
            {COLLECTIONS_DATA.map((col) => {
              const count = PRODUCTS.filter((p) => p.category === col.id).length;
              return (
                <button
                  key={col.id}
                  onClick={() => setSelectedCategory(col.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all ${
                    selectedCategory === col.id
                      ? 'bg-amber-300 text-black font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {col.name.split(' ')[0]} ({count})
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 rounded-full bg-white/5 border border-white/10 focus:border-amber-300 focus:outline-none text-xs text-white placeholder-neutral-500"
              />
            </div>

            {/* Sort Selector */}
            <div className="relative flex items-center">
              <ArrowUpDown className="w-3.5 h-3.5 absolute left-3 text-neutral-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="pl-8 pr-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 focus:outline-none focus:border-amber-300 appearance-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <Filter className="w-10 h-10 text-neutral-500 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-neutral-300">
              No matching architectural products found
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Try adjusting your search criteria or explore all categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-white/10 text-xs text-neutral-200 hover:bg-white/20"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const inWishlist = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="group rounded-3xl bg-white/5 border border-white/10 hover:border-amber-300/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-luxury"
                >
                  <div className="space-y-4">
                    {/* Header: Zone & Category */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-300/30 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                        {product.zone} zone
                      </span>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`text-xs transition-colors p-1 ${
                          inWishlist
                            ? 'text-red-400'
                            : 'text-neutral-500 hover:text-white'
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${inWishlist ? 'fill-red-400' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Product Name & Subtitle */}
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-200 transition-colors">
                        {product.name}
                      </h3>
                      <div className="text-xs text-neutral-400 mt-1">
                        {product.subtitle}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>

                    {/* Dimensions & Designer */}
                    <div className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between text-xs text-neutral-300">
                      <div>
                        <span className="text-[10px] uppercase text-neutral-500 block">
                          Scale
                        </span>
                        <span>
                          {product.dimensions.width} × {product.dimensions.depth} × {product.dimensions.height} cm
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase text-neutral-500 block">
                          Designer
                        </span>
                        <span>{product.designer}</span>
                      </div>
                    </div>

                    {/* Price and Lead time */}
                    <div className="flex items-baseline justify-between pt-1">
                      <div className="font-serif text-2xl font-bold text-amber-200">
                        AED {product.price.toLocaleString()}
                      </div>
                      <span className="text-[11px] text-neutral-400">
                        {product.leadTime.split('(')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-6 border-t border-white/10 space-y-2">
                    <Link
                      href="/showroom"
                      onClick={() => focusProductById(product.id)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-300 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider transition-all shadow-glow"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View in 3D Showroom
                    </Link>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-white/15 hover:border-white/30 text-neutral-300 hover:text-white text-xs transition-all"
                      >
                        <Sliders className="w-3 h-3 text-amber-300" />
                        360° Studio
                      </Link>

                      <button
                        onClick={() => handleQuickAdd(product.id, product.price)}
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-white/15 hover:bg-white/10 text-neutral-300 hover:text-white text-xs transition-all"
                      >
                        <ShoppingBag className="w-3 h-3 text-amber-300" />
                        Add to Order
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0d] text-white pt-24">
      {/* Header Banner */}
      <div className="relative py-14 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#121218] to-[#0a0a0d]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-300/30 text-[11px] uppercase tracking-widest text-amber-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            2026 Collection Portfolio
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            Architectural Product Collections
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
            Every piece in the VIRTUO series is designed to millimeter precision and rendered in high-fidelity interactive WebGL. Filter by category, customize materials, or step directly into the 3D showroom.
          </p>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="py-24 text-center text-xs text-neutral-400">
            Loading architectural collection...
          </div>
        }
      >
        <CollectionsContent />
      </Suspense>

      <Footer />
    </div>
  );
}
