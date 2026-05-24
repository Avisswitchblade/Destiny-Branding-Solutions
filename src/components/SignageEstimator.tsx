/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { QuoteFormData, SystemLog } from '../types';
import { DollarSign, Upload, Info, Sliders, Check, CirclePlay, RefreshCw, Send, Sparkles, Building2, HelpCircle } from 'lucide-react';

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
  const [dragActive, setDragActive] = useState(false);
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Synchronize dynamic sample text inputs with character count
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const txt = e.target.value.toUpperCase();
    const count = txt.replace(/\s/g, '').length;
    setFormData(prev => ({
      ...prev,
      text: txt,
      lettersCount: count > 0 ? count : 1,
    }));
  };

  // Preview Canvas Rendering (glowing metal signage effect)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and draw wall background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid background for blueprints style
    ctx.strokeStyle = '#262626';
    ctx.lineWidth = 0.5;
    const gridSize = 20;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw the sign backing plate
    const signW = Math.min(canvas.width - 120, (formData.width / 120) * (canvas.width - 160) + 100);
    const signH = Math.min(canvas.height - 100, (formData.height / 48) * (canvas.height - 140) + 60);
    const signX = (canvas.width - signW) / 2;
    const signY = (canvas.height - signH) / 2;

    // Shadow backlighting glow if lighting is active
    if (formData.lighting !== 'non_lit') {
      ctx.save();
      ctx.shadowColor = '#f97316'; // Vibrant orange default
      if (formData.lighting === 'side_glow') ctx.shadowColor = '#eab308'; // Gold glow
      
      ctx.shadowBlur = 40;
      ctx.fillStyle = 'rgba(249, 115, 22, 0.08)';
      ctx.beginPath();
      ctx.roundRect(signX - 5, signY - 5, signW + 10, signH + 10, 8);
      ctx.fill();
      ctx.restore();
    }

    // Backing panel layer
    if (formData.backing === 'clear_acrylic') {
      ctx.fillStyle = 'rgba(38, 38, 38, 0.4)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(signX, signY, signW, signH, 8);
      ctx.fill();
      ctx.stroke();
    } else if (formData.backing === 'metal') {
      // Metallic steel brushed look
      const grad = ctx.createLinearGradient(signX, signY, signX + signW, signY + signH);
      grad.addColorStop(0, '#1c1917');
      grad.addColorStop(0.5, '#292524');
      grad.addColorStop(1, '#1c1917');
      ctx.fillStyle = grad;
      ctx.strokeStyle = '#eab308'; // Gold borders for premium feel
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(signX, signY, signW, signH, 8);
      ctx.fill();
      ctx.stroke();
    }

    // Render dimensions indicator lines
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#eab308';
    ctx.font = '10px monospace';

    // Width indicator
    ctx.beginPath();
    ctx.moveTo(signX, signY - 15);
    ctx.lineTo(signX + signW, signY - 15);
    ctx.stroke();
    ctx.fillText(`${formData.width}" (${Math.round(formData.width * 2.54)}cm)`, signX + signW / 2 - 30, signY - 22);

    // Height indicator
    ctx.beginPath();
    ctx.moveTo(signX - 15, signY);
    ctx.lineTo(signX - 15, signY + signH);
    ctx.stroke();
    ctx.save();
    ctx.translate(signX - 22, signY + signH / 2 + 20);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${formData.height}" (${Math.round(formData.height * 2.54)}cm)`, 0, 0);
    ctx.restore();

    // Render client logo inside sign preview if loaded
    let textXOffset = 0;
    if (uploadedLogo) {
      const img = new Image();
      img.src = uploadedLogo;
      img.onload = () => {
        try {
          // Draw logo on the left portion
          const logoSize = Math.min(signH * 0.5, 70);
          const logoX = signX + 40;
          const logoY = signY + (signH - logoSize) / 2;
          
          ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
          
          // Draw logo bounding ring glowing
          ctx.strokeStyle = '#f97316';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(logoX + logoSize/2, logoY + logoSize/2, logoSize/2 + 5, 0, Math.PI * 2);
          ctx.stroke();
        } catch (e) {
          console.error("Canvas drawImage failed", e);
        }
      };
      textXOffset = 40; // shift text to right
    } else {
      // Draw a subtle wireframe metallic orange orbit ring as the Destiny Brand Mark watermark inside sign if no logo uploaded
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(signX + 60, signY + signH/2, 28, 12, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.3)';
      ctx.beginPath();
      ctx.arc(signX + 60, signY + signH/2, 18, 0, Math.PI * 2);
      ctx.stroke();
      textXOffset = 30;
    }

    // Text specifications (custom name)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Choose font rendering and glowing text style
    let glowColor = '';
    if (formData.lighting === 'led_backlit') glowColor = '#f97316';
    else if (formData.lighting === 'side_glow') glowColor = '#eab308';
    else if (formData.lighting === 'frontlit') glowColor = '#ffffff';

    if (glowColor) {
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 15;
    }

    // Metallic material text filling style
    if (formData.materials === 'brass') {
      ctx.fillStyle = '#eab308'; // Gold color fill
    } else if (formData.materials === 'stainless_steel') {
      ctx.fillStyle = '#e5e5e5'; // Silver stainless
    } else {
      ctx.fillStyle = '#f97316'; // Vivid orange acrylic
    }

    // Dynamic font sizing
    const calculatedFontSize = Math.max(12, Math.min(28, (signW / formData.text.length) * 1.2));
    ctx.font = `bold ${calculatedFontSize}px sans-serif`;

    const txtX = signX + signW / 2 + textXOffset / 2;
    const txtY = signY + signH / 2;

    // Draw solid letter strokes and lighting offsets to simulate 3D spacing depths
    if (formData.signType === '3d_channel') {
      ctx.shadowBlur = 0;
      // Draw 3D side blocks displacement lines
      ctx.fillStyle = '#7c2d12'; // deeper copper/bronze/orange
      if (formData.materials === 'brass') ctx.fillStyle = '#854d0e';
      if (formData.materials === 'stainless_steel') ctx.fillStyle = '#404040';

      for (let offset = 4; offset > 0; offset--) {
        ctx.fillText(formData.text || "PREVIEW SITE", txtX - offset, txtY + offset);
      }
    }

    // Main top letter face
    if (glowColor) {
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 12;
    }
    if (formData.materials === 'brass') {
      ctx.fillStyle = '#fef08a'; // bright gold
    } else if (formData.materials === 'stainless_steel') {
      ctx.fillStyle = '#fafafa';
    } else {
      ctx.fillStyle = '#ffedd5'; // glowing paper-white/orange
    }
    ctx.fillText(formData.text || "PREVIEW SITE", txtX, txtY);

    // Reset shadow state
    ctx.shadowBlur = 0;

  }, [formData, uploadedLogo]);

  // Handle Drag & Drop uploading
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file (PNG/JPG)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedLogo(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const resetLogo = () => {
    setUploadedLogo(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
            
            {/* Left Controls Column (lg:col-span-4) */}
            <div className="lg:col-span-5 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-neutral-800">
                <Sliders className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold text-white font-sans">Craft Options</h3>
              </div>

              {/* Text Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono text-neutral-400 tracking-wider">SIGNAGE DISPLAY TEXT</label>
                  <span className="text-[10px] font-mono text-amber-500">{formData.lettersCount} Letters</span>
                </div>
                <input
                  type="text"
                  maxLength={40}
                  value={formData.text}
                  onChange={handleTextChange}
                  className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg px-3 py-2.5 focus:border-orange-500/50 outline-none uppercase tracking-widest font-mono"
                  placeholder="E.G. DESTINY CREATIVE"
                />
              </div>

              {/* Dimensions Input */}
              <div className="space-y-4">
                <label className="text-xs font-mono text-neutral-400 tracking-wider block">PHYSICAL BOUNDARIES (INCHES)</label>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-neutral-500 font-mono">
                    <span>Width: {formData.width} Inches</span>
                    <span>120" Max</span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={120}
                    value={formData.width}
                    onChange={(e) => setFormData(prev => ({ ...prev, width: parseInt(e.target.value) }))}
                    className="w-full h-1 bg-neutral-950 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-neutral-500 font-mono">
                    <span>Height: {formData.height} Inches</span>
                    <span>48" Max</span>
                  </div>
                  <input
                    type="range"
                    min={6}
                    max={48}
                    value={formData.height}
                    onChange={(e) => setFormData(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                    className="w-full h-1 bg-neutral-950 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>
              </div>

              {/* Dropdowns parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-400">SIGN TYPE</label>
                  <select
                    value={formData.signType}
                    onChange={(e) => setFormData(prev => ({ ...prev, signType: e.target.value as any }))}
                    className="w-full bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 rounded-lg p-2.5 outline-none focus:border-orange-500"
                  >
                    <option value="3d_channel">3D Channel Letter</option>
                    <option value="2d_flat">2D Flat-Cut Acrylic</option>
                    <option value="light_box">Vibrant Light Box</option>
                    <option value="custom_cut">Custom Molded Sign</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-400">SURFACE MATERIAL</label>
                  <select
                    value={formData.materials}
                    onChange={(e) => setFormData(prev => ({ ...prev, materials: e.target.value as any }))}
                    className="w-full bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 rounded-lg p-2.5 outline-none focus:border-orange-500"
                  >
                    <option value="acrylic">Commercial Acrylic (Acrylic Gloss)</option>
                    <option value="stainless_steel">Mild Stainless Steel (Anti-Rust)</option>
                    <option value="brass">Polished Brass Gold Plate</option>
                    <option value="alucobond">Alucobond Composite Plate</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-400">LIGHTING ILLUM</label>
                  <select
                    value={formData.lighting}
                    onChange={(e) => setFormData(prev => ({ ...prev, lighting: e.target.value as any }))}
                    className="w-full bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 rounded-lg p-2.5 outline-none focus:border-orange-500"
                  >
                    <option value="led_backlit">Backlit Halo LED (Vivid Orange)</option>
                    <option value="frontlit">Direct Front Glow LED (White)</option>
                    <option value="side_glow">Intense Edge Glow (Gold)</option>
                    <option value="non_lit">Eco Non-Lit Signage</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-400">BACKING SUPPORT</label>
                  <select
                    value={formData.backing}
                    onChange={(e) => setFormData(prev => ({ ...prev, backing: e.target.value as any }))}
                    className="w-full bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 rounded-lg p-2.5 outline-none focus:border-orange-500"
                  >
                    <option value="clear_acrylic">Polished Clear Acrylic Pane</option>
                    <option value="metal">Brushed Solid Steel frame</option>
                    <option value="none">Direct Facade Mount (Clean)</option>
                  </select>
                </div>

              </div>

              {/* Logo Upload Drag and Drop */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-400 tracking-wider block">ATTACH ESTABLISHED BRAND LOGO (OPTIONAL)</label>
                
                {uploadedLogo ? (
                  <div className="flex items-center justify-between p-3 bg-neutral-950/70 border border-orange-500/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <img
                        src={uploadedLogo}
                        alt="Uploaded Proof Preview"
                        className="w-10 h-10 object-contain rounded bg-neutral-900 border border-neutral-800"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-left">
                        <p className="text-xs text-white font-medium">Uploaded Logo</p>
                        <p className="text-[10px] text-neutral-500">Rendered on preview canvas</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={resetLogo}
                      className="text-xs text-neutral-500 hover:text-red-400 transition"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={triggerUploadClick}
                    className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition ${
                      dragActive ? 'border-orange-500 bg-orange-500/5' : 'border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/30'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Upload className="w-5 h-5 mx-auto text-neutral-500 mb-2" />
                    <p className="text-xs text-neutral-300">Drag & drop logo file here, or click to browse</p>
                    <p className="text-[10px] text-neutral-500 mt-1">Supports PNG, JPG (Max 5MB)</p>
                  </div>
                )}
              </div>

            </div>

            {/* Right Interactive Preview & Pricing (lg:col-span-8) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Live Canvas Box */}
              <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden shadow-lg relative">
                <div className="px-5 py-3 border-b border-neutral-955/60 bg-neutral-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-xs font-mono text-neutral-400 tracking-wider uppercase">Live Client Rendering Engine</span>
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 italic">Realistic lighting modeling applied</div>
                </div>

                <div className="p-4 flex justify-center items-center bg-[#050505]">
                  <canvas
                    ref={canvasRef}
                    width={560}
                    height={280}
                    className="w-full max-w-full aspect-[2/1] rounded-xl outline-none"
                  />
                </div>
                
                <div className="px-5 py-3.5 bg-neutral-900/10 border-t border-neutral-900/40 text-[11px] text-neutral-500 flex items-start gap-2">
                  <Info className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <p>
                    Disclaimer: This tool calculates close estimates based on raw material cubic thickness and spatial wiring complexity. Actual fabrication and delivery require detailed structural checkoffs by Destiny teams prior to print execution.
                  </p>
                </div>
              </div>

              {/* Pricing Breakdown Card */}
              <div className="bg-neutral-900/45 border border-neutral-800/80 rounded-2xl p-6 backdrop-blur-sm">
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
                    <div className="flex justify-between">
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
                  <div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">ESTIMATED TOTAL OUTLAY</div>
                    <div className="text-3xl font-extrabold text-orange-400 tracking-tight mt-1 flex items-baseline gap-1.5">
                      <span className="text-base font-medium text-neutral-400">KES</span>
                      {pricingBreakdown.total.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-1">
                      Production turnaround: <span className="text-amber-500 font-serif font-semibold">{pricingBreakdown.deliveryDays} Days</span> from proof signoff local delivery.
                    </div>
                  </div>

                  {/* Client Info Block for Quote Submission */}
                  <form onSubmit={handleSubmit} className="w-full md:w-auto shrink-0 space-y-3">
                    <div className="grid grid-cols-1 gap-2 max-w-sm">
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={formData.clientName}
                        onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                        className="bg-neutral-950 border border-neutral-800 text-xs text-white rounded-lg px-3 py-2 outline-none focus:border-orange-500"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Phone Contact (e.g. 0723408672)"
                        value={formData.clientPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
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

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
