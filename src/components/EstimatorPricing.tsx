/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Building2, Send, RefreshCw } from 'lucide-react';

interface EstimatorPricingProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  pricingBreakdown: {
    baseMaterial: number;
    dimensionsCost: number;
    lightingCost: number;
    backingCost: number;
    lettersCost: number;
    subtotal: number;
    discount: number;
    total: number;
    deliveryDays: number;
  };
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function EstimatorPricing({
  formData,
  setFormData,
  pricingBreakdown,
  isSubmitting,
  onSubmit,
}: EstimatorPricingProps) {
  return (
    <div className="bg-neutral-900/45 border border-neutral-800/80 rounded-2xl p-6 backdrop-blur-sm text-left">
      <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
        <Building2 className="w-5 h-5 text-amber-500" />
        Cost Estimation Blueprint (Ksh KES)
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-neutral-800 text-xs font-mono text-neutral-300">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-neutral-500">Base Frame Craft:</span>
            <span className="text-white">KES {pricingBreakdown.baseMaterial.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-left">
            <span className="text-neutral-500">Dimension Scaling ({formData.width}" × {formData.height}"):</span>
            <span className="text-white">KES {pricingBreakdown.dimensionsCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Letter Milling ({formData.lettersCount} units):</span>
            <span className="text-white">KES {pricingBreakdown.lettersCost.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-neutral-500">Lighting Integration:</span>
            <span className="text-white">KES {pricingBreakdown.lightingCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Supporting Plate:</span>
            <span className="text-white">KES {pricingBreakdown.backingCost.toLocaleString()}</span>
          </div>
          {pricingBreakdown.discount > 0 && (
            <div className="flex justify-between text-orange-400">
              <span>Volume Discount:</span>
              <span>- KES {pricingBreakdown.discount.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="text-left">
          <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">ESTIMATED TOTAL OUTLAY</div>
          <div className="text-3xl font-extrabold text-orange-400 tracking-tight mt-1 flex items-baseline gap-1.5Box">
            <span className="text-base font-medium text-neutral-400">KES</span>
            {pricingBreakdown.total.toLocaleString()}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            Production turnaround: <span className="text-amber-500 font-serif font-semibold">{pricingBreakdown.deliveryDays} Days</span> from proof signoff local delivery.
          </div>
        </div>

        {/* Client Info Block for Quote Submission */}
        <form onSubmit={onSubmit} className="w-full md:w-auto shrink-0 space-y-3">
          <div className="grid grid-cols-1 gap-2 max-w-sm">
            <input
              type="text"
              required
              placeholder="Your Full Name"
              value={formData.clientName}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, clientName: e.target.value }))}
              className="bg-neutral-950 border border-neutral-800 text-xs text-white rounded-lg px-3 py-2 outline-none focus:border-orange-500"
            />
            <input
              type="tel"
              required
              placeholder="Phone Contact (e.g. 0723408672)"
              value={formData.clientPhone}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, clientPhone: e.target.value }))}
              className="bg-neutral-950 border border-neutral-800 text-xs text-white rounded-lg px-3 py-2 outline-none focus:border-orange-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold py-2.5 px-6 rounded-xl transition text-xs tracking-wider uppercase shadow-md shadow-orange-950/40 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                COMPILING BLUEPRINT...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                Digital proof and custom offer
              </>
            )}
          </button>
          <p className="text-[10px] text-right text-neutral-500">
            Dispatched instantly to our Nyahururu center.
          </p>
        </form>

      </div>

    </div>
  );
}
