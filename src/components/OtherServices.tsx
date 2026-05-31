/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shirt, Sparkles, CheckCircle, Flame } from 'lucide-react';

export default function OtherServices() {
  return (
    <section id="other-branding-services" className="py-20 bg-neutral-950 px-4 sm:px-6 border-t border-neutral-900/50">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono text-amber-500 tracking-widest uppercase block">COMPREHENSIVE DESIGN & EXECUTION</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            End-to-End Visual Solutions
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto">
            Extend your visual presence seamlessly from store exterior signage to professional staff apparel and corporate accessories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Apparel Card */}
          <div className="bg-neutral-900/40 p-6 rounded-2xl border border-neutral-900 hover:border-neutral-800 transition flex flex-col justify-between space-y-6 text-left relative group">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/25 rounded-lg flex items-center justify-center text-orange-500">
                <Shirt className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Apparel Prints & Embroidery</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Highly durable branding on cotton t-shirts, warm hoodies, and structural baseball caps. Direct-to-apparel screen-printing and metallic thread sewing suited for company custom uniforms.
              </p>
            </div>

            {/* Embedded Showcase Image */}
            <div className="rounded-xl overflow-hidden border border-neutral-800">
              <img
                src="/src/assets/images/apparel_branding_showcase_png_1779539362517.png"
                alt="Apparel embroidery caps and hoodie design"
                className="w-full h-auto aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 pt-2">
              <span>MINIMUM LIMITS: 5 Units</span>
              <span className="text-orange-400 font-bold">Embroidery / Vinyl Prints</span>
            </div>
          </div>

          {/* Window film & Vinyl Sheets */}
          <div className="bg-neutral-900/40 p-6 rounded-2xl border border-neutral-900 hover:border-neutral-800 transition flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/25 rounded-lg flex items-center justify-center text-amber-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Window Glass Film & Decals</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Professional window frosted films, sandblast security decals, and full-bleed promotion adhesives window vinyls. Elegant glare shields blocking harmful solar light with precision die-cut office layouts.
              </p>

              <div className="space-y-2 border-t border-neutral-900 pt-3">
                <span className="text-[10px] font-mono text-neutral-500 block">KEY APPLICATIONS</span>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-amber-400" /> Office Frosting
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-amber-400" /> One-Way Vision
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-amber-400" /> Dust Adhesives
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-amber-400" /> UV Defense Film
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
              <span>PRICING SPEC: PER SQ. MTR</span>
              <span className="text-amber-400 font-bold">Frosted / Custom Shapes</span>
            </div>
          </div>

          {/* Corporate Warning, Stickers & Door Tag Keys */}
          <div className="bg-neutral-900/40 p-6 rounded-2xl border border-neutral-900 hover:border-neutral-800 transition flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-red-500/10 border border-red-500/25 rounded-lg flex items-center justify-center text-red-500">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Accessories & Compliance Tags</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Heavy-duty industry warning compliant danger signs, aluminum/PVC fire symbols, custom transparent adhesive stickers, and laser-etched door key labels/apartment keytags in wood or brass.
              </p>

              <div className="space-y-2 border-t border-neutral-900 pt-3">
                <span className="text-[10px] font-mono text-neutral-500 block">OTHER COMMERCE ITEMS</span>
                <div className="grid grid-cols-1 gap-1.5 text-[11px] text-neutral-300">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Custom cut key tags with room numbers
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Safety Warning caution boards
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Promotion adhesive roll-up banners
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
              <span>STAIN-PROOF BASE COATS</span>
              <span className="text-orange-400 font-bold">Commercial UV-Shielded</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
