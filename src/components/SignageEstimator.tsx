/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { QuoteFormData, SystemLog } from '../types';
import { Sparkles, Check, RefreshCw } from 'lucide-react';
import EstimatorCanvas from './EstimatorCanvas';
import EstimatorControls from './EstimatorControls';
import EstimatorPricing from './EstimatorPricing';

interface SignageEstimatorProps {
  onQuoteSubmitted: (log: SystemLog, data: any) => void;
  onNavigateToContact: () => void;
}

export default function SignageEstimator({ onQuoteSubmitted, onNavigateToContact }: SignageEstimatorProps) {
  const [formData, setFormData] = useState<Omit<QuoteFormData, 'logoAttached'>>({
    width: 48,
    height: 24,
    lettersCount: 14,
    text: "DESTINY CREATIVE",
    materials: 'acrylic',
    lighting: 'led_backlit',
    backing: 'clear_acrylic',
    signType: '3d_channel',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    notes: '',
  });

  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [pricingBreakdown, setPricingBreakdown] = useState({
    baseMaterial: 0,
    dimensionsCost: 0,
    lightingCost: 0,
    backingCost: 0,
    lettersCost: 0,
    subtotal: 0,
    discount: 0,
    total: 0,
    deliveryDays: 7,
  });

  // Recalculate Pricing on parameters change
  useEffect(() => {
    let baseMaterial = 0;
    let sizeModifier = 0;
    
    switch (formData.materials) {
      case 'acrylic':
        baseMaterial = 15000;
        sizeModifier = 8; // KES per sq. inch
        break;
      case 'stainless_steel':
        baseMaterial = 28000;
        sizeModifier = 14;
        break;
      case 'brass':
        baseMaterial = 38000;
        sizeModifier = 22;
        break;
      case 'alucobond':
        baseMaterial = 12000;
        sizeModifier = 6;
        break;
    }

    const area = formData.width * formData.height;
    const dimensionsCost = Math.round(area * sizeModifier);

    let lightingCost = 0;
    switch (formData.lighting) {
      case 'led_backlit':
        lightingCost = 18000;
        break;
      case 'frontlit':
        lightingCost = 12000;
        break;
      case 'side_glow':
        lightingCost = 15000;
        break;
      case 'non_lit':
        lightingCost = 0;
        break;
    }

    let backingCost = 0;
    switch (formData.backing) {
      case 'metal':
        backingCost = 8200;
        break;
      case 'clear_acrylic':
        backingCost = 11500;
        break;
      case 'none':
        backingCost = 0;
        break;
    }

    const singleLetterCost = formData.materials === 'brass' || formData.materials === 'stainless_steel' ? 2400 : 1200;
    const lettersCost = formData.signType === '3d_channel' || formData.signType === '2d_flat'
      ? formData.lettersCount * singleLetterCost
      : 0;

    const subtotal = baseMaterial + dimensionsCost + lightingCost + backingCost + lettersCost;
    
    // Volume discount for larger signs
    const discount = area > 1500 ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal - discount;

    let deliveryDays = 7;
    if (formData.materials === 'brass') deliveryDays = 12;
    if (formData.signType === '3d_channel') deliveryDays += 2;
    if (formData.lighting === 'led_backlit') deliveryDays += 1;

    setPricingBreakdown({
      baseMaterial,
      dimensionsCost,
      lightingCost,
      backingCost,
      lettersCost,
      subtotal,
      discount,
      total,
      deliveryDays,
    });
  }, [formData]);

  // Respond to presets loaded dynamically from Customer Success Stories
  useEffect(() => {
    const handleLoadPreset = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setFormData(prev => ({
          ...prev,
          ...customEvent.detail,
        }));
      }
    };
    window.addEventListener('load-estimator-preset', handleLoadPreset);
    return () => window.removeEventListener('load-estimator-preset', handleLoadPreset);
  }, []);

  // Submit Quote Inquiry Configuration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientPhone) {
      alert("Please fill out your Name and Phone Contact for scheduling.");
      return;
    }

    setIsSubmitting(true);

    // Mock network transmission logs to update our system console
    const quoteId = `DST-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const outgoingLog: SystemLog = {
      id: Math.random().toString(),
      timestamp: new Date().toISOString(),
      type: 'outgoing',
      method: "POST",
      url: "/api/quote",
      payload: JSON.stringify({
        ...formData,
        calculatedPrice: pricingBreakdown.total,
        logoAttachedName: uploadedLogo ? "user_uploaded_logo.png" : null,
      }, null, 2),
    };

    onQuoteSubmitted(outgoingLog, null);

    // Wait a brief simulated latency (1.5 seconds)
    setTimeout(() => {
      const successResponse: SystemLog = {
        id: Math.random().toString(),
        timestamp: new Date().toISOString(),
        type: 'success',
        method: "RECEIVE",
        url: "/api/quote",
        response: JSON.stringify({
          success: true,
          quoteId,
          message: `Digital proof and customized structural specs matching "${formData.text}" placed in Nyahururu showroom queue. Quick contacts routed.`,
          estimatedCostKES: pricingBreakdown.total,
          estimatedDeliveryDays: pricingBreakdown.deliveryDays,
          notifiers: ["SMS active on " + formData.clientPhone, "Email scheduled to admin"]
        }, null, 2),
      };

      onQuoteSubmitted(successResponse, {
        quoteId,
        clientName: formData.clientName,
        totalPrice: pricingBreakdown.total,
        estimatedDays: pricingBreakdown.deliveryDays,
        signText: formData.text
      });

      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 1500);
  };

  return (
    <section id="estimator-workspace" className="py-12 bg-neutral-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-neutral-950 border border-white/10 px-3 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Custom Architectural Builder</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black italic tracking-tighter leading-[0.9] text-white uppercase mb-3">
            BUILD YOUR <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">PREMIUM SIGN</span>
          </h2>
          <p className="mt-3 text-neutral-400 text-sm max-w-xl mx-auto leading-relaxed font-light">
            Configure raw materials, dimensions, and spatial LED designs in our high-end design tool. Receive a real-time architectural estimate matching Nyahururu's top local print schedules.
          </p>
        </div>

        {submittedSuccess ? (
          <div className="max-w-2xl mx-auto bg-neutral-900/60 rounded-2xl border border-emerald-500/30 p-8 text-center backdrop-blur-sm shadow-xl">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Quotation Configured Safely!</h3>
            <p className="mt-2 text-neutral-300 text-sm">
              We have compiled your signage blueprint parameters. Your simulated reference is <span className="text-amber-400 font-mono font-bold">DST-2026-{formData.lettersCount * 25}</span>.
            </p>

            <div className="mt-6 bg-neutral-950 p-6 rounded-xl text-left border border-neutral-800 font-mono text-xs text-neutral-400 divide-y divide-neutral-900">
              <div className="pb-3 flex justify-between">
                <span>Signage Text:</span>
                <span className="text-white font-bold">{formData.text || "NONE"}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span>Material Selected:</span>
                <span className="text-white font-semibold capitalize">{formData.materials.replace('_', ' ')}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span>Lighting Profile:</span>
                <span className="text-white font-semibold capitalize">{formData.lighting.replace('_', ' ')}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span>Estimated Value:</span>
                <span className="text-amber-400 font-bold">KES {pricingBreakdown.total.toLocaleString()}</span>
              </div>
              <div className="pt-3 flex justify-between">
                <span>Production Schedule:</span>
                <span className="text-emerald-400 font-bold">Approx {pricingBreakdown.deliveryDays} Business Days</span>
              </div>
            </div>

            <p className="mt-6 text-neutral-400 text-xs">
              Would you like to speak to our lead visual engineer in Nyahururu to finalize the mock drafts?
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/254723408672?text=Hi%20Destiny%20Creative,%20I%20just%20configured%20a%20custom%20signage%20on%20your%20website%20estimator.%20Please%20draft%20my%20proof!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 px-6 rounded-xl transition text-sm cursor-pointer"
              >
                Send via Whatsapp
              </a>
              <button
                onClick={() => {
                  setSubmittedSuccess(false);
                  setFormData(prev => ({ ...prev, text: 'NEW BRAND' }));
                }}
                className="inline-flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 py-2.5 px-6 rounded-xl transition text-sm cursor-pointer border border-neutral-700"
              >
                <RefreshCw className="w-4 h-4" /> Configure Another
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls Column (lg:col-span-5) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <EstimatorControls
                formData={formData}
                setFormData={setFormData}
                uploadedLogo={uploadedLogo}
                setUploadedLogo={setUploadedLogo}
              />
            </div>

            {/* Right Interactive Preview & Pricing (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              
              {/* Live Canvas Box */}
              <EstimatorCanvas
                formData={formData}
                uploadedLogo={uploadedLogo}
              />

              {/* Pricing Breakdown Card */}
              <EstimatorPricing
                formData={formData}
                setFormData={setFormData}
                pricingBreakdown={pricingBreakdown}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
              />

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
