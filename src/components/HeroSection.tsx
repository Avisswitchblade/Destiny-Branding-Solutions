/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface HeroSectionProps {
  onOpenEstimator: () => void;
}

export default function HeroSection({ onOpenEstimator }: HeroSectionProps) {
  return (
    <section id="hero" className="relative font-sans min-h-[85vh] flex items-center justify-center overflow-hidden z-10">
      {/* Background Overlay Grid */}
      <div className="absolute inset-0 bg-neutral-950">
        {/* Main Visual background using generated premium image */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-luminosity bg-cover bg-center" 
          style={{ backgroundImage: "url('/src/assets/images/destiny_hero_banner_png_1779539328980.png')" }}
        ></div>
        {/* Subtle radial gradients overlaying dark modes */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40"></div>
        
        {/* Blueprint fine lines overlay */}
        <div className="absolute inset-0" style={{ backgroundSize: '40px 40px', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.01) 1px, transparent 1px)' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center z-10 space-y-8">
        
        {/* Centered grand brand logo icon with golden 3D metallic aesthetics */}
        <div className="flex justify-center mb-2 animate-fade-in">
          <div className="relative group">
            {/* Outer double glowing ring of light */}
            <div className="absolute inset-[-6px] bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-xl opacity-30 group-hover:opacity-55 group-hover:inset-[-8px] transition-all duration-500"></div>
            {/* Glowing aura */}
            <div className="absolute inset-0 bg-neutral-950 rounded-full border border-orange-500/35 shadow-[0_0_80px_rgba(249,115,22,0.45)]"></div>
            
            <img 
              src="/src/assets/images/destiny_logo_1779650336177.png" 
              alt="Destiny Branding Solutions 3D Logo" 
              className="w-28 h-28 sm:w-36 sm:h-36 object-contain rounded-full border-2 border-white/10 relative z-10 shadow-2xl transition-all duration-500 group-hover:scale-105 select-none"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Slogan pill tag */}
        <div className="mb-6 inline-flex items-center gap-2 bg-neutral-950 border border-white/10 px-3 py-1.5 rounded-full mx-auto animate-fade-in">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Flagship 3D Signage</span>
        </div>

        {/* Epic Main Headline matching Immersive UI font weights */}
        <div className="space-y-4 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.9] text-white uppercase">
            ELEVATE YOUR<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">VISIBILITY.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-400 leading-relaxed font-light font-sans pt-2">
            We engineer premium 3D and 2D outdoor signage, high-fidelity T-Shirt printing, window films, vehicle branding and complete branding solutions.
          </p>
        </div>

        {/* CTAs Blocks */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenEstimator}
            className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-orange-600/20 transition-all cursor-pointer w-full sm:w-auto"
          >
            Get Custom Quote
          </button>
          
          <a
            href="#contact-showroom"
            className="border border-white/10 hover:bg-white/5 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer w-full sm:w-auto text-center block"
          >
            Contact Showroom
          </a>
        </div>

        {/* Quick Nyahururu Location Indicators */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-neutral-900/70 text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-neutral-500 uppercase">ENTERPRISE HQ</span>
            <p className="text-xs text-white font-semibold">Pondo Park Building, Nyahururu</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-neutral-500 uppercase">LOCAL LANDMARK</span>
            <p className="text-xs text-neutral-400">Next to New Galana Petrol Station</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-neutral-500 uppercase">CAL THE DIRECTOR</span>
            <p className="text-xs text-orange-400 font-semibold">0723 408 672 | 0721 691 511</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-neutral-500 uppercase">FLAGSHIP PRODUCT</span>
            <p className="text-xs text-amber-400 font-semibold">3D / 2D LED Backlit Signs</p>
          </div>
        </div>

      </div>
    </section>
  );
}
