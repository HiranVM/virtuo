'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Compass, Shield, Award, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0c0c10] border-t border-white/10 text-neutral-400 text-xs">
      {/* Brand Value Pillars */}
      <div className="border-b border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-300/30 flex items-center justify-center flex-shrink-0 text-amber-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-white mb-1">
                Real-Time 3D Fidelity
              </h4>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Every silhouette is modeled to millimeter precision with physically accurate roughness, reflectance, and structural proportions.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-300/30 flex items-center justify-center flex-shrink-0 text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-white mb-1">
                Custom Material Configurator
              </h4>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Experience tactile bouclés, full-grain Italian leathers, smoked bog oak, and Italian Calacatta marble in real-time WebGL.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-300/30 flex items-center justify-center flex-shrink-0 text-amber-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-white mb-1">
                White-Glove Architectural Logistics
              </h4>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Direct atelier dispatch with room-of-choice placement, uncrating, and certified white-glove assembly worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c5a880] to-[#8f7551] flex items-center justify-center shadow-glow">
              <span className="font-serif text-black font-extrabold text-lg">V</span>
            </div>
            <span className="font-serif tracking-[0.25em] text-lg font-bold text-white">
              VIRTUO
            </span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
            VIRTUO bridges luxury industrial furniture design and state-of-the-art interactive spatial WebGL visualization. Designed for discerning architects, interior designers, and collectors.
          </p>
          <div className="pt-2 text-[11px] text-amber-300/80 font-mono">
            Ateliers: Dubai Design District (d3) • Milan • Copenhagen • Tokyo
          </div>
        </div>

        {/* Column 1 */}
        <div className="space-y-3">
          <h5 className="font-serif text-xs uppercase tracking-widest text-neutral-200 font-semibold">
            Showroom Zones
          </h5>
          <ul className="space-y-2">
            <li>
              <Link href="/showroom" className="hover:text-amber-200 transition-colors">
                Grand Living Pavilion
              </Link>
            </li>
            <li>
              <Link href="/showroom" className="hover:text-amber-200 transition-colors">
                Dining Sanctuary
              </Link>
            </li>
            <li>
              <Link href="/showroom" className="hover:text-amber-200 transition-colors">
                Master Suite Retreat
              </Link>
            </li>
            <li>
              <Link href="/showroom" className="hover:text-amber-200 transition-colors">
                Panoramic Overview
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="space-y-3">
          <h5 className="font-serif text-xs uppercase tracking-widest text-neutral-200 font-semibold">
            Collections
          </h5>
          <ul className="space-y-2">
            <li>
              <Link href="/collections" className="hover:text-amber-200 transition-colors">
                Curved Sofas
              </Link>
            </li>
            <li>
              <Link href="/collections" className="hover:text-amber-200 transition-colors">
                Lounge & Swivel Chairs
              </Link>
            </li>
            <li>
              <Link href="/collections" className="hover:text-amber-200 transition-colors">
                Sculptural Dining
              </Link>
            </li>
            <li>
              <Link href="/collections" className="hover:text-amber-200 transition-colors">
                Architectural Lighting
              </Link>
            </li>
            <li>
              <Link href="/collections" className="hover:text-amber-200 transition-colors">
                Platform Beds
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="space-y-3">
          <h5 className="font-serif text-xs uppercase tracking-widest text-neutral-200 font-semibold">
            Trade & Contract
          </h5>
          <ul className="space-y-2">
            <li>
              <span className="hover:text-amber-200 cursor-pointer">
                BIM / Revit & 3D Assets
              </span>
            </li>
            <li>
              <span className="hover:text-amber-200 cursor-pointer">
                Architect Trade Program
              </span>
            </li>
            <li>
              <span className="hover:text-amber-200 cursor-pointer">
                COM Textile Submission
              </span>
            </li>
            <li>
              <span className="hover:text-amber-200 cursor-pointer">
                Global White-Glove Logistics
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} VIRTUO Design Ateliers Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-300 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-neutral-300 cursor-pointer">Terms of Procurement</span>
            <span className="hover:text-neutral-300 cursor-pointer">Bespoke Warranty</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

