'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Eye,
  Sliders,
  Ruler,
  Check,
  Package,
  Layers,
  FileText,
} from 'lucide-react';
import { Hero3DPreview } from '@/components/home/Hero3DPreview';
import { Footer } from '@/components/layout/Footer';
import { PRODUCTS, SHOWROOM_ZONES } from '@/data/products';
import { useShowroomStore } from '@/store/showroomStore';
import { useCartStore } from '@/store/cartStore';

export default function HomePage() {
  const focusProductById = useShowroomStore((s) => s.focusProductById);
  const setActiveZone = useShowroomStore((s) => s.setActiveZone);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const isInWishlist = useCartStore((s) => s.isInWishlist);

  const featuredProducts = PRODUCTS.slice(0, 6);

  return (
    <div className="relative min-h-screen bg-[#0d0e12] text-neutral-100 antialiased selection:bg-amber-200 selection:text-neutral-900">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 px-4 sm:px-6 lg:px-8">
        {/* Interactive 3D WebGL Canvas Background */}
        <Hero3DPreview />

        {/* Subtle cinematic gradient overlays that allow the 3D room to shine warmly */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0d0e12]/60 pointer-events-none" />

        {/* Editorial Foreground Header */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 pointer-events-none">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 dark:bg-black/50 border border-white/15 backdrop-blur-md pointer-events-auto shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-300">
              VIRTUO STUDIO • MILAN / COPENHAGEN • 2026 COLLECTION
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-white leading-[1.05]">
            Forms For Living. <br />
            <span className="italic font-light text-neutral-300">
              Materials That Endure.
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-neutral-300 font-normal leading-relaxed">
            Explore our handcrafted interior collection in an interactive architectural showroom.
            Configure Italian aniline leathers, French oak, and honed marble in real time.
          </p>

          {/* Understated Human Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
            <Link
              href="/showroom"
              className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-neutral-100 text-neutral-950 font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-xl hover:scale-105"
            >
              <Compass className="w-4 h-4 text-neutral-900" />
              <span>Enter 3D Pavilion</span>
            </Link>

            <Link
              href="/collections"
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs tracking-widest uppercase backdrop-blur-md transition-all duration-300"
            >
              <span>View Catalogue Index</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-8 pointer-events-auto inline-flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
            <span>Drag horizontally to orbit view</span>
            <span>•</span>
            <span>Scroll naturally to read catalogue</span>
          </div>
        </div>
      </section>

      {/* ================= 2. HUMAN DESIGN MANIFESTO & ATELIER STORY ================= */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#111217]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-300/90 block">
              The Atelier Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-snug">
              Furniture sculpted to live in quiet dialogue with light and stone.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-neutral-300 text-sm leading-relaxed border-l border-white/10 pl-0 lg:pl-10">
            <p>
              Founded between Milan and Copenhagen, VIRTUO collaborates directly with master cabinetmakers, bronze casters, and stone artisans. Rather than mass manufacturing, each piece is individually crafted to order using sustainably certified European hardwoods and hand-finished natural minerals.
            </p>
            <p>
              Our virtual 3D showroom provides architects, interior designers, and collectors with millimeter-exact spatial clarity. Test finishes under morning sunlight, golden dusk, and nocturnal hearth illumination before specification.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/10 text-neutral-200">
              <div>
                <div className="font-mono text-2xl font-semibold text-white">1:1</div>
                <div className="text-xs text-neutral-400 mt-1">True Scale Fidelity</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-semibold text-white">32</div>
                <div className="text-xs text-neutral-400 mt-1">Countries White-Glove</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-semibold text-white">10 yr</div>
                <div className="text-xs text-neutral-400 mt-1">Frame Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. ARCHITECTURAL ROOM STUDIES (LOOKBOOK) ================= */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#0d0e12]">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-amber-300/90 block">
                Spatial Compositions
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mt-1">
                Curated Room Studies
              </h2>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm">
              Each environment demonstrates scale, tactile pairings, and architectural lighting balance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Study 01 */}
            <div className="group rounded-3xl p-7 bg-white/5 border border-white/10 hover:border-amber-300/40 flex flex-col justify-between transition-all duration-300 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>STUDY NO. 01</span>
                  <span>MILANO</span>
                </div>
                <h3 className="font-serif text-2xl text-white font-normal group-hover:text-amber-200 transition-colors">
                  The Living Pavilion
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Low-profile curved sectional seating in alabaster bouclé, balanced by a double-tier Calacatta marble hearth table and brushed bronze arc luminaire.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="text-[11px] text-neutral-400 font-mono">
                  Featuring: Aethel Curved Sofa • Monolith Table • Lumina Lamp
                </div>
                <Link
                  href="/showroom"
                  onClick={() => setActiveZone('living')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-amber-300 transition-colors"
                >
                  <span>Explore Pavilion in 3D</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Study 02 */}
            <div className="group rounded-3xl p-7 bg-white/5 border border-white/10 hover:border-amber-300/40 flex flex-col justify-between transition-all duration-300 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>STUDY NO. 02</span>
                  <span>TUSCANY</span>
                </div>
                <h3 className="font-serif text-2xl text-white font-normal group-hover:text-amber-200 transition-colors">
                  The Dining Sanctuary
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Sculptural 10-seat dining table anchored by fluted timber columns, illuminated by a kinetic suspended Murano glass mobile chandelier.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="text-[11px] text-neutral-400 font-mono">
                  Featuring: Solstice Oval Table • Constellation Mobile
                </div>
                <Link
                  href="/showroom"
                  onClick={() => setActiveZone('dining')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-amber-300 transition-colors"
                >
                  <span>Explore Sanctuary in 3D</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Study 03 */}
            <div className="group rounded-3xl p-7 bg-white/5 border border-white/10 hover:border-amber-300/40 flex flex-col justify-between transition-all duration-300 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>STUDY NO. 03</span>
                  <span>KYOTO</span>
                </div>
                <h3 className="font-serif text-2xl text-white font-normal group-hover:text-amber-200 transition-colors">
                  The Master Retreat
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Floating cantilevered bed platform with acoustic horizontal headboard, accompanied by Japanese mortise-joinery saddle leather armchair.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="text-[11px] text-neutral-400 font-mono">
                  Featuring: Serenade Platform Bed • Kyoto Armchair
                </div>
                <Link
                  href="/showroom"
                  onClick={() => setActiveZone('bedroom')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-amber-300 transition-colors"
                >
                  <span>Explore Retreat in 3D</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. TACTILE MATERIAL ATELIER ================= */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#111217]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-300/90">
              The Material Library
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              Tactile, Authentic Minerals & Textiles
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Selected for their patina, natural grain, and graceful aging characteristics.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                name: 'Tuscan Leather',
                sub: 'Full-Grain Aniline',
                color: '#7b4424',
              },
              {
                name: 'Alabaster Bouclé',
                sub: 'High-Density Wool',
                color: '#e4dfd5',
              },
              {
                name: 'French Oak',
                sub: 'Smoked Bog Finish',
                color: '#26221d',
              },
              {
                name: 'Calacatta Vagli',
                sub: 'Honed Italian Marble',
                color: '#ebe7de',
              },
              {
                name: 'Nero Marquina',
                sub: 'Spanish Black Marble',
                color: '#161719',
              },
              {
                name: 'Satin Bronze',
                sub: 'Brushed Champagne',
                color: '#c5a880',
              },
            ].map((mat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center space-y-3 hover:border-amber-300/40 transition-colors"
              >
                <div
                  className="w-14 h-14 rounded-xl shadow-inner border border-white/20"
                  style={{ backgroundColor: mat.color }}
                />
                <div>
                  <div className="text-xs font-medium text-white">{mat.name}</div>
                  <div className="text-[10px] text-neutral-400">{mat.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-amber-300 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-white">
                  Architectural Sample Swatch Box
                </h4>
                <p className="text-xs text-neutral-400">
                  Request physical textile cuttings and timber finishes delivered directly to your practice.
                </p>
              </div>
            </div>
            <Link
              href="/collections"
              className="px-6 py-2.5 rounded-full border border-white/20 hover:border-amber-300 text-xs text-white uppercase tracking-wider font-semibold whitespace-nowrap transition-colors"
            >
              Order Sample Kit
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 5. THE CATALOGUE INDEX ================= */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#0d0e12]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-amber-300/90 block">
                Selected Edition
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mt-1">
                2026 Collection Index
              </h2>
            </div>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white transition-colors"
            >
              <span>View Complete Index ({PRODUCTS.length} Pieces)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => {
              const inWishlist = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="group rounded-3xl bg-white/5 border border-white/10 hover:border-white/25 p-7 flex flex-col justify-between transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                      <span className="uppercase">{product.category}</span>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`transition-colors p-1 ${
                          inWishlist ? 'text-amber-300' : 'text-neutral-500 hover:text-white'
                        }`}
                      >
                        {inWishlist ? '★ In Wishlist' : '☆ Save'}
                      </button>
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl font-normal text-white group-hover:text-amber-200 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-2 flex items-baseline justify-between font-mono">
                      <div className="text-lg text-white font-semibold">
                        AED {product.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {product.dimensions.width} × {product.dimensions.depth} cm
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center gap-3">
                    <Link
                      href="/showroom"
                      onClick={() => focusProductById(product.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-neutral-900 font-semibold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View in 3D
                    </Link>
                    <Link
                      href={`/products/${product.id}`}
                      className="flex items-center justify-center p-2.5 rounded-xl border border-white/15 hover:border-white/30 text-neutral-300 hover:text-white transition-all"
                      title="Inspect Specifications"
                    >
                      <Sliders className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 6. ARCHITECT & TRADE PROCUREMENT ================= */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#121318]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase font-mono tracking-widest text-amber-300/90">
            Contract & Residential Specification
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
            Designed for Architects, Specifiers & Studios
          </h2>
          <p className="text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Access 3D CAD models, material sample dossiers, COM customization support, and volume trade quotations through our dedicated Milan studio desk.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/showroom"
              className="px-8 py-3.5 rounded-full bg-white text-neutral-950 font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-lg"
            >
              Open 3D Interior Atelier
            </Link>
            <Link
              href="/collections"
              className="px-8 py-3.5 rounded-full border border-white/20 hover:border-white/40 text-xs uppercase tracking-widest text-neutral-200 transition-colors"
            >
              Request Trade Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
