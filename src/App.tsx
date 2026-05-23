/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import SignageWebsite from './components/SignageWebsite';
import SignageEstimator from './components/SignageEstimator';
import PRDViewer from './components/PRDViewer';
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
  const [activeMode, setActiveMode] = useState<'website' | 'prd'>('website');
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
    setActiveMode('website');
    setTimeout(() => {
      const el = document.getElementById('estimator-workspace');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-200">
      
      {/* GLOBAL HUD SYSTEM NOTIFICATIONS */}
      {activeNotification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-neutral-900 border border-orange-500/30 text-xs text-neutral-200 p-4 rounded-xl shadow-2xl backdrop-blur-md flex items-start gap-3 animate-slide-up">
          <div className="w-5 h-5 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20 shrink-0 select-none">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div className="text-left space-y-1">
            <span className="font-mono text-[9px] text-orange-500 font-bold block">SIMULATION LAYER</span>
            <p className="font-sans leading-relaxed text-neutral-300">{activeNotification}</p>
          </div>
        </div>
      )}

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

          {/* Core mode toggle panels */}
          <div className="flex bg-neutral-900 p-1 rounded-xl border border-white/10 max-w-full">
            <button
              onClick={() => setActiveMode('website')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeMode === 'website'
                  ? 'bg-orange-600 font-bold text-white shadow-lg shadow-orange-600/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">1. Live Store</span> Website
            </button>

            <button
              onClick={() => setActiveMode('prd')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeMode === 'prd'
                  ? 'bg-amber-600 font-bold text-white shadow-lg shadow-amber-600/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">2. PRD &</span> Blueprints
            </button>
          </div>

          {/* Quick interactive phone and cost estimating headers */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="text-right text-xs">
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
        {activeMode === 'website' ? (
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
        ) : (
          /* 3. Detailed PRD Dashboard Viewer & Live REST Clients Console */
          <PRDViewer
            systemLogs={systemLogs}
            onClearLogs={() => setSystemLogs([])}
          />
        )}
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
