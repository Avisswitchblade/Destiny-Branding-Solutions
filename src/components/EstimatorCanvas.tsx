/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

interface EstimatorCanvasProps {
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
  uploadedLogo: string | null;
}

export default function EstimatorCanvas({ formData, uploadedLogo }: EstimatorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  return (
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
      
      <div className="px-5 py-3.5 bg-neutral-900/10 border-t border-neutral-900/40 text-[11px] text-neutral-500 flex items-start gap-2 text-left">
        <Info className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
        <p>
          Disclaimer: This tool calculates close estimates based on raw material cubic thickness and spatial wiring complexity. Actual fabrication and delivery require detailed structural checkoffs by Destiny teams prior to print execution.
        </p>
      </div>
    </div>
  );
}
