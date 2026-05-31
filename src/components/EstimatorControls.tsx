/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { Sliders, Upload } from 'lucide-react';

interface EstimatorControlsProps {
  formData: {
    width: number;
    height: number;
    materials: string;
    lighting: string;
    backing: string;
    signType: string;
    text: string;
    lettersCount: number;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  uploadedLogo: string | null;
  setUploadedLogo: (logo: string | null) => void;
}

export default function EstimatorControls({
  formData,
  setFormData,
  uploadedLogo,
  setUploadedLogo,
}: EstimatorControlsProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize dynamic sample text inputs with character count
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const txt = e.target.value.toUpperCase();
    const count = txt.replace(/\s/g, '').length;
    setFormData((prev: any) => ({
      ...prev,
      text: txt,
      lettersCount: count > 0 ? count : 1,
    }));
  };

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

  return (
    <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-6 text-left">
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
            onChange={(e) => setFormData((prev: any) => ({ ...prev, width: parseInt(e.target.value) }))}
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
            onChange={(e) => setFormData((prev: any) => ({ ...prev, height: parseInt(e.target.value) }))}
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
            onChange={(e) => setFormData((prev: any) => ({ ...prev, signType: e.target.value as any }))}
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
            onChange={(e) => setFormData((prev: any) => ({ ...prev, materials: e.target.value as any }))}
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
            onChange={(e) => setFormData((prev: any) => ({ ...prev, lighting: e.target.value as any }))}
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
            onChange={(e) => setFormData((prev: any) => ({ ...prev, backing: e.target.value as any }))}
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
  );
}
