/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import SignageWebsite from './components/SignageWebsite';
import SignageEstimator from './components/SignageEstimator';
import { SystemLog } from './types';
import {
  Sparkles,
  Terminal,
  Activity,
  Heart,
  ChevronRight,
  Monitor,
  HeartHandshake,
  HelpCircle,
  FileText,
  MessageCircle,
  Phone,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  // Auto-clear notification after delay
  useEffect(() => {
    if (activeNotification) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  // Hook new action dispatches to system simulator log lists
  const handleAddLog = (newLog: SystemLog) => {
    setSystemLogs(prev => [newLog, ...prev]);
    
    if (newLog.type === 'outgoing') {
      setActiveNotification(`[${newLog.method}] Dispatching simulated payload to ${newLog.url}...`);
    } else if (newLog.type === 'success') {
      setActiveNotification(`[SUCCESS] Simulated 200 OK received from ${newLog.url}!`);
    }
  };

  // Switch tabs and scroll smoothly to anchor points
  const handleScrollToEstimator = () => {
    const el = document.getElementById('estimator-workspace');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-200">
      
      {/* GLOBAL HUD SYSTEM NOTIFICATIONS */}
      {activeNotification && (
        <div className="fixed bottom-6 left-6 z-50 max-w-sm bg-neutral-900 border border-orange-500/30 text-xs text-neutral-200 p-4 rounded-xl shadow-2xl backdrop-blur-md flex items-start gap-3 animate-slide-up">
          <div className="w-5 h-5 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20 shrink-0 select-none">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div className="text-left space-y-1">
            <span className="font-mono text-[9px] text-orange-500 font-bold block">SIMULATION LAYER</span>
            <p className="font-sans leading-relaxed text-neutral-300">{activeNotification}</p>
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP CHAT BUTTON */}
      <a 
        href="https://wa.me/254723408672?text=Hi%20Destiny%20Creative%2c%20I'm%20visiting%20your%20website%20and%20would%20like%20to%20make%20an%20instant%20inquiry%20regarding%20custom%20signage!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all transform hover:scale-105 active:scale-95 group font-sans text-xs font-bold uppercase tracking-wider select-none cursor-pointer"
        id="whatsapp-chat-fab"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.449 5.476 0 9.932-4.453 9.935-9.93.002-2.655-1.03-5.15-2.903-7.026C16.535 1.77 14.043.738 11.39.738C5.908.738 1.452 5.19 1.449 10.672c-.001 1.67.444 3.296 1.288 4.757L1.693 20.89l5.636-1.48s.001-.001.001-.001zM18.73 15.65c-.328-.163-1.94-.957-2.24-1.066-.3-.11-.518-.163-.734.163-.216.327-.837 1.056-1.026 1.274-.188.217-.378.244-.706.082-.328-.164-1.383-.51-2.637-1.627-.975-.87-1.633-1.946-1.824-2.273-.19-.328-.02-.505.143-.668.148-.146.328-.382.493-.574.164-.19.219-.327.328-.546.11-.218.055-.409-.028-.574-.082-.164-.734-1.77-1.005-2.593-.298-.717-.611-.617-.837-.628-.216-.01-.464-.01-.712-.01-.248 0-.651.093-.992.465-.34.373-1.3 1.27-1.3 3.1 0 1.827 1.33 3.593 1.514 3.84.184.246 2.618 4.0 6.342 5.61 3.725 1.61 3.725 1.073 4.394 1.01.669-.064 1.94-.793 2.212-1.558.272-.765.272-1.42.19-1.557-.081-.137-.3-.219-.628-.381z"/>
        </svg>
        <span>Chat on WhatsApp</span>
      </a>

      {/* STICKY GLASSMORPHIC HEADER */}
      <header className="sticky top-0 z-50 w-full bg-neutral-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          
          {/* Logo Brand Design with Immersive UI Gradient Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-700 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-transform hover:scale-105">
              <span className="font-black text-neutral-950 text-xl italic font-sans select-none">DC</span>
            </div>
            <div className="leading-none text-left">
              <h1 className="font-bold tracking-tighter text-sm uppercase text-white">Destiny Creative</h1>
              <p className="text-[10px] text-orange-500 uppercase tracking-widest font-bold">Branding Solutions</p>
            </div>
          </div>

          {/* Quick interactive phone and cost estimating headers */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right text-xs">
              <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-bold block">NYAHURURU SALES</span>
              <a href="tel:0723408672" className="text-white hover:text-orange-500 font-bold block">0723 408 672</a>
            </div>
            
            <button
              onClick={handleScrollToEstimator}
              className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-tighter shadow-lg shadow-orange-600/20 transition-all cursor-pointer"
            >
              Get a Quote
            </button>
          </div>

        </div>
      </header>

      {/* MAIN VIEWPORT HYDRATION ROUTING */}
      <main className="min-h-[calc(100vh-4.5rem)]">
        <div>
          {/* 1. Standard Brand Website */}
          <SignageWebsite
            onOpenEstimator={handleScrollToEstimator}
            onContactFormSubmitted={handleAddLog}
          />

          {/* 2. Embedded Realtime Estimator Block */}
          <SignageEstimator
            onQuoteSubmitted={handleAddLog}
            onNavigateToContact={() => {
              const el = document.getElementById('contact-showroom');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          />
        </div>
      </main>

      {/* FOOTER METADATA MARGIN BLOCK */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-12 px-6 text-neutral-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left space-y-1.5">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold">
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse" />
              <span>DESTINY BRANDING SOLUTIONS</span>
            </div>
            <p className="max-w-md text-neutral-500">
              Pondo Park Building, Nyahururu, Laikipia. Next to New Galana Petrol station. High-end signboards, corporate apparel, laser-tag doors, warning templates.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-neutral-500 font-mono text-[10px]">
            <span>TEL: 0723408672 / 0721691511</span>
            <span>MON-SAT: 8:00 AM - 6:00 PM</span>
            <span>&copy; {new Date().getFullYear()} DST DESIGN LABS</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
