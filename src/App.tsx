/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import SignageWebsite from './components/SignageWebsite';
import SignageEstimator from './components/SignageEstimator';
import { SystemLog } from './types';
import { generateXMLSitemap, getSitemapDataUri } from './utils/sitemap';
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

interface SEOConfig {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
}

const SEO_SECTIONS: Record<'home' | 'services' | 'contact', SEOConfig> = {
  home: {
    title: "Destiny Branding Solutions | Premium 3D Signage Kenya & LED Backlit Signs",
    description: "Destiny Branding Solutions: Premier 3D & 2D outdoor signage, custom-milled brass letters, apparel screen-printing, and sandblast window film solutions in Nyahururu, Kenya.",
    canonical: "https://destinybranding.co.ke/",
    ogTitle: "Destiny Branding Solutions - Premium Signage & Branding Kenya",
    ogDescription: "Transform your storefront with premium 3D/2D LED backlit signs, custom uniforms, safety warning boards, and window frosted films in Kenya."
  },
  services: {
    title: "Commercial 3D Backlit Lettering & Windows Glass Film Services Kenya | Destiny",
    description: "Custom architectural 3D acrylic signs, steel backlit signs, frosted office glass films, and high-fidelity branded apparel crafted with professional precision in Kenya.",
    canonical: "https://destinybranding.co.ke/#services",
    ogTitle: "Destiny Branding Services | 3D LED Signboards & Apparel Printing",
    ogDescription: "Discover premium 3D/2D commercial signs, corporate t-shirt screen-printing/embroidery, and Frosted Glass UV block films."
  },
  contact: {
    title: "Contact Destiny Branding Nyahururu Showroom | Call 0723408672",
    description: "Contact our Kenya signage fabrication studio. Address: Pondo Park Building near New Galana Petrol Station, Nyahururu. WhatsApp details or call now for instant quote.",
    canonical: "https://destinybranding.co.ke/#contact",
    ogTitle: "Get a Custom Signage Quote | Contact Destiny Branding Kenya",
    ogDescription: "Visit our Nyahururu showroom at Pondo Park Building or message our design engineers for premium high-visibility storefront quotes."
  }
};

export default function App() {
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  const [isWhatsAppMinimized, setIsWhatsAppMinimized] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'services' | 'contact'>('home');

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
  const handleAddLog = useCallback((newLog: SystemLog) => {
    setSystemLogs(prev => [newLog, ...prev]);
    
    if (newLog.type === 'outgoing') {
      setActiveNotification(`[${newLog.method}] Dispatching simulated payload to ${newLog.url}...`);
    } else if (newLog.type === 'success') {
      setActiveNotification(`[SUCCESS] Simulated 200 OK received from ${newLog.url}!`);
    }
  }, []);

  // Dynamic Sitemap Generation Simulation
  useEffect(() => {
    const sitemapXml = generateXMLSitemap();
    handleAddLog({
      id: Math.random().toString(),
      timestamp: new Date().toISOString(),
      type: 'success',
      method: "SITEMAP: COMPILE",
      url: "/sitemap.xml",
      response: JSON.stringify({
        status: "200 Dynamic XML Generated Successfully",
        xml_metadata_engine: "Nyahururu Local Crawler Helper V2",
        links_discovered: 6,
        domain_mapping: "https://destinybranding.co.ke",
        locations: [
          "/",
          "/#hero",
          "/#flagship-signage",
          "/#other-branding-services",
          "/#estimator-workspace",
          "/#contact-showroom"
        ],
        raw_xml_sample: sitemapXml.substring(0, 150) + "..."
      }, null, 2)
    });
  }, [handleAddLog]);

  // Dynamic Section Detection for SEO Metadata Updates
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-10% 0px -40% 0px', // slightly offset trigger zones for pleasant responsive updates
      threshold: [0, 0.1, 0.3],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries.filter(e => e.isIntersecting);
      if (visibleEntries.length === 0) return;

      visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const topEntry = visibleEntries[0];

      const id = topEntry.target.id;
      let sectionDetect: 'home' | 'services' | 'contact' | null = null;
      if (id === 'hero') {
        sectionDetect = 'home';
      } else if (
        id === 'flagship-signage' ||
        id === 'other-branding-services' ||
        id === 'estimator-workspace'
      ) {
        sectionDetect = 'services';
      } else if (id === 'contact-showroom') {
        sectionDetect = 'contact';
      }

      if (sectionDetect) {
        setActiveSection(prev => {
          if (prev !== sectionDetect) {
            const currentSEO = SEO_SECTIONS[sectionDetect!];
            handleAddLog({
              id: Math.random().toString(),
              timestamp: new Date().toISOString(),
              type: 'success',
              method: `SEO INDEX: ${sectionDetect?.toUpperCase()}`,
              url: `/seo/metadata/#${sectionDetect}`,
              response: JSON.stringify({
                active_section: sectionDetect,
                injected_title: currentSEO.title,
                canonical_link: currentSEO.canonical,
                meta_description: currentSEO.description,
                status: "Hoisted via React Helmet Successfully"
              }, null, 2)
            });
          }
          return sectionDetect!;
        });
      }
    };

    const observer = new IntersectionObserver(observerCallback, options);

    const targets = [
      document.getElementById('hero'),
      document.getElementById('flagship-signage'),
      document.getElementById('other-branding-services'),
      document.getElementById('estimator-workspace'),
      document.getElementById('contact-showroom'),
    ].filter(Boolean) as HTMLElement[];

    targets.forEach(target => observer.observe(target));

    return () => {
      targets.forEach(target => observer.unobserve(target));
    };
  }, [handleAddLog]);

  // Switch tabs and scroll smoothly to anchor points
  const handleScrollToEstimator = () => {
    const el = document.getElementById('estimator-workspace');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#030303] text-neutral-200">
        <Helmet>
          <title>{SEO_SECTIONS[activeSection].title}</title>
          <meta name="description" content={SEO_SECTIONS[activeSection].description} />
          <link rel="canonical" href={SEO_SECTIONS[activeSection].canonical} />
          <meta property="og:title" content={SEO_SECTIONS[activeSection].ogTitle} />
          <meta property="og:description" content={SEO_SECTIONS[activeSection].ogDescription} />
          <meta property="og:url" content={SEO_SECTIONS[activeSection].canonical} />
          <meta property="og:type" content="website" />
        </Helmet>
      
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
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end" id="whatsapp-chat-fab-wrapper">
        {isWhatsAppMinimized ? (
          <button
            onClick={() => setIsWhatsAppMinimized(false)}
            className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all transform hover:scale-110 active:scale-95 cursor-pointer relative"
            title="Expand WhatsApp Chat Window"
            id="whatsapp-chat-fab-minimized"
          >
            {/* Pulsing indicator badge */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366] border border-white"></span>
            </span>
            <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.449 5.476 0 9.932-4.453 9.935-9.93.002-2.655-1.03-5.15-2.903-7.026C16.535 1.77 14.043.738 11.39.738C5.908.738 1.452 5.19 1.449 10.672c-.001 1.67.444 3.296 1.288 4.757L1.693 20.89l5.636-1.48s.001-.001.001-.001zM18.73 15.65c-.328-.163-1.94-.957-2.24-1.066-.3-.11-.518-.163-.734.163-.216.327-.837 1.056-1.026 1.274-.188.217-.378.244-.706.082-.328-.164-1.383-.51-2.637-1.627-.975-.87-1.633-1.946-1.824-2.273-.19-.328-.02-.505.143-.668.148-.146.328-.382.493-.574.164-.19.219-.327.328-.546.11-.218.055-.409-.028-.574-.082-.164-.734-1.77-1.005-2.593-.298-.717-.611-.617-.837-.628-.216-.01-.464-.01-.712-.01-.248 0-.651.093-.992.465-.34.373-1.3 1.27-1.3 3.1 0 1.827 1.33 3.593 1.514 3.84.184.246 2.618 4.0 6.342 5.61 3.725 1.61 3.725 1.073 4.394 1.01.669-.064 1.94-.793 2.212-1.558.272-.765.272-1.42.19-1.557-.081-.137-.3-.219-.628-.381z"/>
            </svg>
          </button>
        ) : (
          <div className="flex items-center gap-1 bg-[#25D366] hover:bg-[#20ba5a] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all transform hover:scale-[1.02] pr-1.5 pl-4 py-2 text-white font-sans text-xs font-bold uppercase tracking-wider select-none relative" id="whatsapp-expanded-container">
            <a 
              href="https://wa.me/254723408672?text=Hi%20Destiny%20Creative%2c%20I'm%20visiting%20your%20website%20and%20would%20like%20to%20make%20an%20instant%20inquiry%20regarding%20custom%20signage!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-1 cursor-pointer select-none text-white mr-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.449 5.476 0 9.932-4.453 9.935-9.93.002-2.655-1.03-5.15-2.903-7.026C16.535 1.77 14.043.738 11.39.738C5.908.738 1.452 5.19 1.449 10.672c-.001 1.67.444 3.296 1.288 4.757L1.693 20.89l5.636-1.48s.001-.001.001-.001zM18.73 15.65c-.328-.163-1.94-.957-2.24-1.066-.3-.11-.518-.163-.734.163-.216.327-.837 1.056-1.026 1.274-.188.217-.378.244-.706.082-.328-.164-1.383-.51-2.637-1.627-.975-.87-1.633-1.946-1.824-2.273-.19-.328-.02-.505.143-.668.148-.146.328-.382.493-.574.164-.19.219-.327.328-.546.11-.218.055-.409-.028-.574-.082-.164-.734-1.77-1.005-2.593-.298-.717-.611-.617-.837-.628-.216-.01-.464-.01-.712-.01-.248 0-.651.093-.992.465-.34.373-1.3 1.27-1.3 3.1 0 1.827 1.33 3.593 1.514 3.84.184.246 2.618 4.0 6.342 5.61 3.725 1.61 3.725 1.073 4.394 1.01.669-.064 1.94-.793 2.212-1.558.272-.765.272-1.42.19-1.557-.081-.137-.3-.219-.628-.381z"/>
              </svg>
              <span className="hidden xs:inline">Chat on WhatsApp</span>
            </a>
            {/* Retract / Minimize button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsWhatsAppMinimized(true);
              }}
              className="w-6 h-6 rounded-full hover:bg-black/15 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 ml-1"
              title="Retract Button text"
              aria-label="Retract WhatsApp Button"
              id="whatsapp-chat-retract-btn"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* STICKY GLASSMORPHIC HEADER */}
      <header className="sticky top-0 z-50 w-full bg-neutral-950/80 backdrop-blur-md border-b border-white/10 h-16 sm:h-18 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between">
          
          {/* Logo Brand Design with Immersive UI 3D Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              src="/src/assets/images/destiny_logo_1779650336177.png" 
              alt="Destiny Branding Solutions" 
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-full border border-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:scale-110 transition-transform shrink-0 select-none animate-fade-in"
              referrerPolicy="no-referrer"
            />
            <div className="leading-none text-left">
              <h1 className="font-bold tracking-tighter text-xs sm:text-sm uppercase text-white">DESTINY BRANDING SOLUTIONS</h1>
              <p className="text-[8px] sm:text-[10px] text-orange-500 uppercase tracking-widest font-bold">Premium Branding & Signage</p>
            </div>
          </div>

          {/* Quick interactive phone and cost estimating headers */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden lg:flex items-center gap-2 border border-neutral-800 bg-neutral-900/50 px-2.5 py-1 rounded-full text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-neutral-400">SEO:</span>
              <span className="text-orange-400 font-bold uppercase">{activeSection}</span>
            </div>
            
            <div className="hidden md:block text-right text-xs">
              <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-bold block">NYAHURURU SALES</span>
              <a href="tel:0723408672" className="text-white hover:text-orange-500 font-bold block">0723 408 672</a>
            </div>
            
            <button
              onClick={handleScrollToEstimator}
              className="bg-orange-600 hover:bg-orange-500 text-white px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-tighter shadow-lg shadow-orange-600/20 transition-all cursor-pointer whitespace-nowrap"
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
              <img 
                src="/src/assets/images/destiny_logo_1779650336177.png" 
                alt="Destiny Branding Solutions Logo" 
                className="w-6 h-6 object-contain rounded-full shadow-[0_0_8px_rgba(249,115,22,0.3)] shrink-0"
                referrerPolicy="no-referrer"
              />
              <span>DESTINY BRANDING SOLUTIONS</span>
            </div>
            <p className="max-w-md text-neutral-500">
              Pondo Park Building, Nyahururu, Laikipia. Next to New Galana Petrol station. High-end signboards, corporate apparel, laser-tag doors, warning templates.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-neutral-500 font-mono text-[10px] relative">
            <span>TEL: 0723408672 / 0721691511</span>
            <span>MON-SAT: 8:00 AM - 6:00 PM</span>
            <span>&copy; {new Date().getFullYear()} DST DESIGN LABS</span>
            
            {/* Dynamic Sitemap Link: visually hidden but fully indexed by search engines to optimize organic index crawlability */}
            <a 
              href="/sitemap.xml" 
              className="absolute opacity-0 w-1 h-1 overflow-hidden pointer-events-none select-none text-[1px]" 
              tabIndex={-1} 
              aria-hidden="true"
              id="dynamic-sitemap-hidden-anchor"
            >
              Destiny Signage Kenya XML Sitemap Index
            </a>
          </div>

        </div>
      </footer>

      </div>
    </HelmetProvider>
  );
}
