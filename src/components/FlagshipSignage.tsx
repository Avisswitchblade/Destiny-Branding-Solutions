/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, ArrowUpRight } from 'lucide-react';

interface FlagshipSignageProps {
  onOpenEstimator: () => void;
}

export default function FlagshipSignage({ onOpenEstimator }: FlagshipSignageProps) {
  return (
    <section id="flagship-signage" className="py-24 bg-neutral-950 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-neutral-900 pb-8">
          <div>
            <span className="text-xs font-mono text-orange-500 tracking-widest uppercase block mb-1">UNCOMPROMISING VISIBILITY</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Flagship Architectural Signage
            </h2>
          </div>
          <p className="text-sm max-w-md text-neutral-400">
            Our signature 3D LED backlit letters and multi-layered 2D architectural board displays offer Nyahururu's elite brand presence that lasts generations.
          </p>
        </div>

        {/* Flagship Product Showcase Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Spec Columns */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs rounded-full">
              <Award className="w-3.5 h-3.5" />
              <span>3D Acrylic & Steel Letters</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-normal">
              LED Backlit Halo Glow Letters
            </h3>
            
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-light font-sans">
              Each letter is individually liquid-cast or CNC carved from high-diffusion structural acrylic or commercial stainless steel. Lined internally with outdoor IP67 LEDs designed to project highly elegant retro glows on concrete or wood surfaces.
            </p>

            {/* Specs Matrix */}
            <div className="grid grid-cols-2 gap-4 border-t border-neutral-900 pt-6 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-neutral-500 block">WEATHER DEFENSE</span>
                <span className="text-white font-bold block">Waterproof, Rustproof Polymer</span>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-500 block">ILLUMINATION PROFILE</span>
                <span className="text-white font-bold block">Halo / Front Backlighting</span>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-500 block">ACRYLIC CORES</span>
                <span className="text-white font-bold block">3mm To 10mm Gloss Cast</span>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-500 block">WIND STRENGTH</span>
                <span className="text-white font-bold block">Rated up to 120 km/h</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenEstimator}
                className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-850 text-orange-400 hover:text-white border border-neutral-800 hover:border-orange-500/30 px-5 py-3 rounded-lg text-xs font-mono transition cursor-pointer"
              >
                <span>Build custom proof specs</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Showcase Image with glows */}
          <div className="lg:col-span-7 bg-neutral-900/60 p-4 border border-neutral-900 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-600/10 rounded-full blur-[80px] group-hover:bg-orange-600/15 transition-all"></div>
            
            {/* Generated Image */}
            <img
              src="/src/assets/images/backlit_signage_showcase_png_1779539346981.png"
              alt="Halo backlighting custom design by Destiny Branding Solutions"
              className="w-full h-auto aspect-[4/3] rounded-xl object-cover relative z-10 border border-neutral-800/80 mix-blend-color-dodge brightness-110"
              referrerPolicy="no-referrer"
            />

            <div className="absolute bottom-6 left-6 z-20 bg-neutral-950/80 border border-neutral-800 backdrop-blur-md px-4 py-2 text-left rounded-lg">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">Project draft sample</span>
              <span className="text-xs text-white font-bold">Metallic Gold Bezel + Backlit LED Glow</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
