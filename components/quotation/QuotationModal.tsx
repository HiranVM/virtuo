'use client';

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Download, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShowroomStore } from '@/store/showroomStore';
import { useCartStore } from '@/store/cartStore';
import { PRODUCTS } from '@/data/products';
import {
  UPHOLSTERY_MATERIALS,
  WOOD_FINISHES,
  METAL_ACCENTS,
  STONE_MATERIALS,
} from '@/data/materials';

export const QuotationModal: React.FC = () => {
  const isQuotationModalOpen = useShowroomStore((s) => s.isQuotationModalOpen);
  const closeQuotationModal = useShowroomStore((s) => s.closeQuotationModal);
  const quotationProductId = useShowroomStore((s) => s.quotationProductId);
  const customizations = useShowroomStore(
    (s) => (quotationProductId ? s.productCustomizations[quotationProductId] : undefined)
  );
  const cartItems = useCartStore((s) => s.items);

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectCity, setProjectCity] = useState('');
  const [projectType, setProjectType] = useState('Residential Penthouse');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isQuotationModalOpen) return null;

  const product = PRODUCTS.find((p) => p.id === quotationProductId);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c5a880', '#e8e4dc', '#ffffff'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={closeQuotationModal}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#14141a] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-300/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
                Architectural Quotation Request
              </h2>
              <p className="text-xs text-neutral-400">
                Official VIRTUO Procurement Specification
              </p>
            </div>
          </div>
          <button
            onClick={closeQuotationModal}
            className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center mx-auto text-amber-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Quotation Dossier Transmitted
            </h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-amber-200 font-semibold">{clientName || 'Valued Client'}</span>. Your custom specification sheet and trade pricing breakdown have been scheduled for review by our Senior Architectural Consultant.
            </p>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-sm mx-auto text-xs text-neutral-400 space-y-1">
              <div>Reference ID: <span className="text-white font-mono">VIR-{Math.floor(100000 + Math.random() * 900000)}</span></div>
              <div>Estimated Response: <span className="text-amber-300">Within 4 Business Hours</span></div>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                closeQuotationModal();
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-amber-300 text-black font-semibold text-xs uppercase tracking-widest hover:bg-amber-400 transition-all shadow-glow"
            >
              Return to Showroom
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Selected item summary card */}
            {product && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                    Primary Focus Piece
                  </span>
                  <h4 className="font-serif text-base font-bold text-white">
                    {product.name}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {getMaterialName(customizations?.upholsteryId)} • {getMaterialName(customizations?.finishId)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-serif font-bold text-amber-200">
                    AED {product.price.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-neutral-400">{product.leadTime}</div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Full Name / Design Firm *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Studio Zaha Hadid / Arthur Sterling"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-amber-300 focus:outline-none text-sm text-white placeholder-neutral-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Corporate / Client Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="procurement@designatelier.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-amber-300 focus:outline-none text-sm text-white placeholder-neutral-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Project Location (Emirate, UAE / International)
                </label>
                <input
                  type="text"
                  placeholder="Dubai / Abu Dhabi, UAE"
                  value={projectCity}
                  onChange={(e) => setProjectCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-amber-300 focus:outline-none text-sm text-white placeholder-neutral-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Typology
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-amber-300 focus:outline-none text-sm text-white"
                >
                  <option value="Palm Jumeirah Villa">Palm Jumeirah / Emirates Hills Villa</option>
                  <option value="Downtown Penthouse">Downtown Dubai / DIFC Penthouse</option>
                  <option value="Boutique Luxury Hotel">Boutique Luxury Hotel / Resort</option>
                  <option value="Executive HQ">Executive Headquarters</option>
                  <option value="Superyacht Interior">Superyacht Interior</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Bespoke Dimensional & Material Requests
              </label>
              <textarea
                rows={3}
                placeholder="Include custom architectural dimensions, COM (Customer's Own Material) requirements, or freight logistics..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/15 focus:border-amber-300 focus:outline-none text-sm text-white placeholder-neutral-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeQuotationModal}
                className="px-5 py-2.5 rounded-xl border border-white/15 hover:bg-white/5 text-xs text-neutral-300 uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-300 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-widest transition-all shadow-glow"
              >
                <Send className="w-4 h-4" />
                Submit Specification Dossier
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

