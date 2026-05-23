/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  SITEMAP_DATA,
  HOMEPAGE_SECTIONS,
  SEO_METADATA_STRATEGY,
  API_ROUTE_SCHEMAS,
  CONVERSION_FUNNEL_STEPS,
  ComponentNode
} from '../PRD_DATA';
import { SystemLog } from '../types';
import {
  FileText,
  Map,
  Layers,
  FileCode,
  Globe,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Terminal,
  Cpu,
  Bookmark,
  ExternalLink,
  Shield,
  Clock,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface PRDViewerProps {
  systemLogs: SystemLog[];
  onClearLogs: () => void;
}

export default function PRDViewer({ systemLogs, onClearLogs }: PRDViewerProps) {
  const [activeSubTab, setActiveSubTab] = useState<'sitemap' | 'sections' | 'api' | 'seo' | 'funnel'>('sitemap');
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [expandedSitemap, setExpandedSitemap] = useState<number | null>(0);
  const [selectedApiRoute, setSelectedApiRoute] = useState<number>(0);
  const [mockApiInputPayload, setMockApiInputPayload] = useState<string>(
    JSON.stringify(JSON.parse(API_ROUTE_SCHEMAS[0].samplePayload), null, 2)
  );

  const handleApiSelect = (idx: number) => {
    setSelectedApiRoute(idx);
    setMockApiInputPayload(JSON.stringify(JSON.parse(API_ROUTE_SCHEMAS[idx].samplePayload), null, 2));
  };

  return (
    <div className="bg-neutral-950 border-t border-white/10 min-h-screen py-8 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Sub Header */}
        <div className="border-b border-white/10 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-neutral-950 border border-white/10 px-3 py-1.5 rounded-full mb-2">
              <Cpu className="w-4 h-4 animate-spin text-orange-500" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Technical Specification Framework</span>
            </div>
            <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase mt-2">
              BLUEPRINT & <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">PRD SPECS</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-2 max-w-xl">
              Architectural definitions, local SEO mapping layouts, component trees, and reactive REST controller simulators for Destiny Branding Solutions.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="flex flex-wrap gap-2">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 font-mono text-[10px] text-neutral-400">
              <span className="text-orange-500">FRAMEWORK:</span> Next.js 15 App Router
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 font-mono text-[10px] text-neutral-400">
              <span className="text-amber-500">STYLING:</span> Tailwind CSS v4
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 font-mono text-[10px] text-neutral-400">
              <span className="text-emerald-500">ANIMATION:</span> Motion & Framer Engine
            </div>
          </div>
        </div>

        {/* PRD Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-neutral-900 pb-4">
          <button
            onClick={() => setActiveSubTab('sitemap')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono border transition ${
              activeSubTab === 'sitemap'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 font-bold'
                : 'bg-transparent border-neutral-800 hover:border-neutral-700 text-neutral-400'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            1. Sitemap & Component Tree
          </button>
          
          <button
            onClick={() => setActiveSubTab('sections')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono border transition ${
              activeSubTab === 'sections'
                ? 'bg-orange-500/10 border-orange-500/30 text-orange-400 font-bold'
                : 'bg-transparent border-neutral-800 hover:border-neutral-700 text-neutral-400'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            2. Homepage layouts (Tailwind)
          </button>

          <button
            onClick={() => setActiveSubTab('api')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono border transition ${
              activeSubTab === 'api'
                ? 'bg-orange-505/20 border-orange-500/40 text-orange-400 font-bold'
                : 'bg-transparent border-neutral-800 hover:border-neutral-700 text-neutral-400'
            }`}
            style={activeSubTab === 'api' ? { backgroundColor: 'rgba(249,115,22,0.1)', borderColor: 'rgba(249,115,22,0.3)' } : {}}
          >
            <FileCode className="w-3.5 h-3.5" />
            3. Backend & API Scope Simulator
          </button>

          <button
            onClick={() => setActiveSubTab('seo')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono border transition ${
              activeSubTab === 'seo'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 font-bold'
                : 'bg-transparent border-neutral-800 hover:border-neutral-700 text-neutral-400'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            4. Local SEO & Performance
          </button>

          <button
            onClick={() => setActiveSubTab('funnel')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono border transition ${
              activeSubTab === 'funnel'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold'
                : 'bg-transparent border-neutral-800 hover:border-neutral-700 text-neutral-400'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            5. User Journey Conversion
          </button>
        </div>

        {/* Tab Contents */}
        <div className="mt-4">
          
          {/* 1. SITEMAP CONTAINER */}
          {activeSubTab === 'sitemap' && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 mb-6">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-orange-500" />
                  Next.js App Router Folder Architecture
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  For maximum SEO indexability and lightning-fast edge delivery, we structure the app on Next.js 15 using parallel route groups and static optimization.
                </p>
                <pre className="p-4 bg-neutral-950 font-mono text-[11px] text-green-400 rounded-lg overflow-x-auto border border-neutral-900 leading-relaxed">
{`/src
├── app/                  # Next.js App Router (Page Directory)
│   ├── layout.tsx        # Base Document shell, Global CSS import, SEO metadata config
│   ├── page.tsx          # Homepage portal route (Direct client hydration)
│   ├── services/
│   │   └── page.tsx      # Comprehensive branding specification lists
│   ├── estimator/
│   │   └── page.tsx      # Interactive sign customization workspace
│   └── contact/
│       └── page.tsx      # Direct maps references, contacts form, action hooks
├── components/           # Isolated presentation-layer components (Strict React Client)
│   ├── NavbarHeader.tsx  # Sticky glassmorphism header
│   ├── SpecsGrid.tsx     # Display spec indicators matrix
│   ├── MaterialGloss.tsx # Material metadata accordion
│   └── Estimator.tsx     # Custom pricing canvas container
└── api/                  # Native server-side routing controllers (Edge-runtime proxy)
    ├── quote/
    │   └── route.ts      # Custom calculation logs email transmission REST controller
    └── contact/
        └── route.ts      # Emergency staff WhatsApp router`}
                </pre>
              </div>

              {/* Sitemap Interactive Nodes */}
              <div className="space-y-4">
                <h4 className="text-sm font-mono text-neutral-400 uppercase tracking-widest mb-2">Component Specifications per Page Route</h4>
                {SITEMAP_DATA.map((page, pIdx) => (
                  <div key={pIdx} className="bg-neutral-900/30 border border-neutral-800 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedSitemap(expandedSitemap === pIdx ? null : pIdx)}
                      className="w-full flex justify-between items-center p-4 hover:bg-neutral-900/50 transition text-left"
                    >
                      <div>
                        <span className="bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-[10px] px-2 py-0.5 rounded-full mr-2">
                          {page.route}
                        </span>
                        <span className="text-sm font-bold text-white font-sans">{page.name}</span>
                        <p className="text-[11px] text-neutral-400 mt-1">{page.purpose}</p>
                      </div>
                      {expandedSitemap === pIdx ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>

                    {expandedSitemap === pIdx && (
                      <div className="p-4 bg-neutral-950/40 border-t border-neutral-900 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {page.components.map((comp, cIdx) => (
                            <div key={cIdx} className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 space-y-2">
                              <div className="flex justify-between items-start">
                                <span className="text-xs font-mono font-bold text-amber-500 uppercase">{comp.name}</span>
                                <span className="text-[10px] font-mono text-neutral-600">React Component</span>
                              </div>
                              <p className="text-[11px] text-neutral-300">{comp.description}</p>
                              
                              <div className="text-[10px] font-mono text-neutral-500">
                                <strong className="text-neutral-400 block mb-1">PROPS INTERFACE:</strong>
                                <div className="flex flex-wrap gap-1">
                                  {comp.props.map((p, propIdx) => (
                                    <span key={propIdx} className="bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800 text-[9px]">
                                      {p}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="text-[11px] text-neutral-400 border-t border-neutral-900 pt-2 italic">
                                <strong>Role:</strong> {comp.purpose}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. HOMEPAGE SECTIONS CONTAINER */}
          {activeSubTab === 'sections' && (
            <div className="space-y-4">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 mb-4">
                <h4 className="text-sm font-bold text-white mb-2">Infinix-inspired Layout specs (Tailwind & Web Design system)</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We translate the high-impact tech visual aesthetic of Infinix Mobility into corporate signage. Key features: Edge-to-edge canvas showcases, neon micro-glow borders, custom typography overlays, minimal visual containers, and beautiful gold/orange focal accents on charcoal grays are detailed below.
                </p>
              </div>

              <div className="space-y-3">
                {HOMEPAGE_SECTIONS.map((sec, idx) => (
                  <div key={idx} className="bg-neutral-900/30 border border-neutral-800 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
                      className="w-full flex justify-between items-center p-4 hover:bg-neutral-900/50 transition text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono flex items-center justify-center border border-orange-500/20 shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="text-xs font-mono text-neutral-400 tracking-wider font-semibold block uppercase">Layout block</span>
                          <span className="text-sm font-bold text-white">{sec.title}</span>
                        </div>
                      </div>
                      {expandedSection === idx ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>

                    {expandedSection === idx && (
                      <div className="p-4 bg-neutral-950/40 border-t border-neutral-900 space-y-4 text-xs">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h5 className="font-mono text-orange-400 text-[10px] tracking-widest uppercase">Visual & Audio Objective</h5>
                            <p className="text-neutral-300 leading-relaxed">{sec.visualObjective}</p>
                          </div>

                          <div className="space-y-2">
                            <h5 className="font-mono text-amber-500 text-[10px] tracking-widest uppercase">Copywriting Hooks & Branded elements</h5>
                            <p className="text-neutral-300 leading-relaxed font-sans">{sec.copywritingHook}</p>
                          </div>
                        </div>

                        <div className="border-t border-neutral-900 pt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <h5 className="font-mono text-neutral-500 text-[10px] tracking-widest uppercase">Core Tailwind Utility classes</h5>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {sec.tailwindClasses.map((tClass, tIdx) => (
                                <span key={tIdx} className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded font-mono text-[9px] text-green-400">
                                  {tClass}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <h5 className="font-mono text-emerald-400 text-[10px] tracking-widest uppercase">High Conversion Triggers</h5>
                            <p className="text-neutral-300 leading-relaxed mt-1 font-semibold">{sec.conversionTrigger}</p>
                          </div>
                        </div>

                        <div className="border-t border-neutral-900 pt-3">
                          <span className="font-mono text-neutral-400 block mb-1">BEHAVIORS DETAILS:</span>
                          <p className="text-neutral-400 leading-relaxed italic">{sec.details}</p>
                        </div>

                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. API SCOPE CONTAINER WITH LIVE REST CLIENT SIMULATOR */}
          {activeSubTab === 'api' && (
            <div className="space-y-6">
              <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-5">
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-orange-500" />
                  Node.js API Route Architectures (Express/Next API Paths)
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Both Next.js Serverless routes and standalone Node.js Express routes must validate request structures securely prior to forwarding coordinates to email endpoints (Nodemailer) or saving database schemas. Check the definitions below or <strong className="text-orange-400">play with our Live REST Client Playground</strong> below to test simulated backends!
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Controller Route Specifications Info */}
                <div className="lg:col-span-5 space-y-4">
                  <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Available Edge Routes</h4>
                  {API_ROUTE_SCHEMAS.map((route, rIdx) => (
                    <div
                      key={rIdx}
                      onClick={() => handleApiSelect(rIdx)}
                      className={`cursor-pointer border p-4 rounded-xl transition text-left space-y-2 ${
                        selectedApiRoute === rIdx
                          ? 'bg-orange-500/5 border-orange-500/40'
                          : 'bg-neutral-900/20 border-neutral-800/60 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-white">{route.path}</span>
                        <span className="bg-emerald-500/15 text-emerald-400 font-mono text-[9px] px-2 py-0.5 rounded-full border border-emerald-500/10">
                          {route.method}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-300">{route.description}</p>
                      
                      <div className="flex items-center gap-1 text-[10px] text-neutral-500 pt-1 border-t border-neutral-900">
                        <Shield className="w-3.5 h-3.5 text-amber-500" />
                        <span>Security: {route.security}</span>
                      </div>
                    </div>
                  ))}

                  {/* Node Server Controller Code Preview */}
                  <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
                    <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-neutral-800">
                      <div className="flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-orange-400" />
                        <span className="text-[10px] font-mono text-neutral-300">server/controllers/quote.ts</span>
                      </div>
                      <span className="text-[9px] font-mono text-neutral-500">TypeScript / ESM</span>
                    </div>
                    <pre className="font-mono text-[10px] text-neutral-400 overflow-x-auto max-h-48 leading-relaxed">
{`import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export async function createQuote(req: Request, res: Response) {
  try {
    const { width, height, clientPhone, clientName, materials } = req.body;
    
    // Server-side size validation
    if (!clientPhone || !clientName) {
      return res.status(400).json({ error: 'Missing contact info' });
    }
    
    // Connect transporter (Nodemailer config)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const info = await transporter.sendMail({
      from: '"Destiny Signage Node" <sign@destinycreative.ke>',
      to: "admin@destinybrandingsolutions.co.ke",
      subject: \`🚩 New Signage Quote for \${clientName}\`,
      html: \`<h4>Dimensions: \${width}" x \${height}"</h4>
             <p>Phone: \${clientPhone}</p>
             <p>Material: \${materials}</p>\`
    });

    res.status(200).json({ success: true, ref: 'DST-2026-N' });
  } catch(e) {
    res.status(500).json({ error: 'Internal fabrication queue error' });
  }
}`}
                    </pre>
                  </div>
                </div>

                {/* Right Interactive REST Controller Playground */}
                <div className="lg:col-span-7 bg-neutral-900/30 border border-neutral-850/80 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-mono text-emerald-400 block font-bold">LIVE API PLAYGROUND CLIENT</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500">Targeting {API_ROUTE_SCHEMAS[selectedApiRoute].path}</span>
                  </div>

                  {/* Input request console */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-neutral-400">HTTP POST REQUEST BODY (EDIT REGION)</label>
                    <textarea
                      value={mockApiInputPayload}
                      onChange={(e) => setMockApiInputPayload(e.target.value)}
                      rows={6}
                      className="w-full bg-neutral-950 font-mono text-[11px] text-orange-400 p-3 rounded-lg border border-neutral-800 outline-none focus:border-orange-500/50 leading-relaxed"
                    />
                  </div>

                  {/* Response Inspection */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-mono text-neutral-400">HTTP RESPONSE STREAM</label>
                      <span className="text-[10px] font-mono text-neutral-500">STATUS: 200 OK</span>
                    </div>
                    <pre className="p-3 bg-neutral-950/80 font-mono text-[11px] text-green-400 rounded-lg border border-neutral-880 overflow-x-auto leading-relaxed max-h-48">
{API_ROUTE_SCHEMAS[selectedApiRoute].sampleResponse}
                    </pre>
                  </div>

                  <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl">
                    <h5 className="text-[11px] font-mono text-neutral-400 mb-2 uppercase tracking-wide">Showroom Request Console Submissions Log:</h5>
                    <div className="space-y-1 max-h-32 overflow-y-auto font-mono text-[10px] text-neutral-450 divide-y divide-neutral-900">
                      {systemLogs.length === 0 ? (
                        <div className="text-neutral-500 italic py-2">No API traffic logged. Try submitting a signage configuration in the custom estimator above!</div>
                      ) : (
                        systemLogs.map((log) => (
                          <div key={log.id} className="py-2 flex flex-col gap-1 text-left">
                            <div className="flex justify-between text-[9px]">
                              <span className="text-neutral-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                              <span className={`font-bold ${
                                log.type === 'outgoing' ? 'text-amber-400' : 'text-emerald-400'
                              }`}>{log.method} &rarr; {log.url} (Simulated)</span>
                            </div>
                            <pre className="text-[10px] text-neutral-300 max-h-16 overflow-y-auto bg-neutral-900/50 p-1.5 rounded mt-1 border border-neutral-900">
                              {log.payload || log.response}
                            </pre>
                          </div>
                        ))
                      )}
                    </div>
                    {systemLogs.length > 0 && (
                      <button
                        onClick={onClearLogs}
                        className="text-[9px] font-mono text-neutral-500 hover:text-red-400 transition mt-2 cursor-pointer underline"
                      >
                        Clear Simulation Logs
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 4. SEO & PERFORMANCE CONTAINER */}
          {activeSubTab === 'seo' && (
            <div className="space-y-6">
              
              {/* Local SEO Nyahururu Strategy */}
              <div className="bg-neutral-900/55 border border-neutral-800 rounded-xl p-5">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-orange-500" />
                  Nyahururu & Kenya Local Search Optimization Strategy
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  For a regional branding leader, SEO is dominated by localized organic searching. Key phrases like "3D Signage Nyahururu", "Corporate branding next to petrol station, Nyahururu" or "hoodie print shop near New Galana" must map directly to raw HTML structure profiles.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-amber-500 uppercase block">Meta tag & Open Graph schemas</span>
                    <div className="bg-neutral-950 p-3 rounded border border-neutral-900 font-mono text-[10px] space-y-1 text-neutral-400">
                      <div>&lt;<span className="text-white">title</span>&gt;{SEO_METADATA_STRATEGY.metaTitle}&lt;/title&gt;</div>
                      <div>&lt;<span className="text-white">meta name="description"</span> content="{SEO_METADATA_STRATEGY.metaDescription}" /&gt;</div>
                      <div>&lt;<span className="text-white">meta property="og:type"</span> content="website" /&gt;</div>
                      <div>&lt;<span className="text-white">meta property="og:title"</span> content="Destiny Branding | 3D Signage" /&gt;</div>
                      <div>&lt;<span className="text-white">meta property="og:image"</span> content="/assets/destiny_og.jpg" /&gt;</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-amber-500 uppercase block">Targeted Keywords Index</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {SEO_METADATA_STRATEGY.keywords.map((kw, kwIdx) => (
                        <span key={kwIdx} className="bg-neutral-905 border border-neutral-800 bg-neutral-900 px-2 py-0.5 rounded text-[10px] font-mono text-neutral-300">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* JSON-LD Schema Microdata */}
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-5">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  Structured JSON-LD (Search Engine Microdata injection)
                </h4>
                <p className="text-xs text-neutral-400 mb-3">
                  Injected directly into page headers to activate rich panels on Google Local Finder maps:
                </p>
                <pre className="p-4 bg-neutral-950 font-mono text-[10px] text-green-400 rounded-lg overflow-x-auto border border-neutral-900 leading-relaxed max-h-56">
{JSON.stringify(SEO_METADATA_STRATEGY.structuredDataLocalBusiness, null, 2)}
                </pre>
              </div>

              {/* Core Web Vitals optimization techniques */}
              <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-5">
                <h4 className="text-sm font-bold text-white mb-3">Performance & Core Web Vitals Strategy</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {SEO_METADATA_STRATEGY.performanceOptimization.map((opt, oIdx) => (
                    <div key={oIdx} className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 space-y-1">
                      <span className="text-xs font-mono text-orange-400 block font-bold">{opt.metric}</span>
                      <p className="text-[11px] text-neutral-300 leading-normal">{opt.technique}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* 5. USER FLOW CONTAINER */}
          {activeSubTab === 'funnel' && (
            <div className="space-y-4">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 mb-4">
                <h4 className="text-sm font-bold text-white mb-2">User Journey & Conversion Optimization mapping (UX Funnel)</h4>
                <p className="text-xs text-neutral-400">
                  How a Nyahururu business owner goes from regional search discovery to submitting custom design logs to our showroom queue:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {CONVERSION_FUNNEL_STEPS.map((step, idx) => (
                  <div key={idx} className="bg-neutral-905 border border-neutral-800/80 bg-neutral-900/30 rounded-xl p-4 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-600/10 text-orange-500 font-mono text-sm font-bold flex items-center justify-center border border-orange-500/30 shrink-0">
                      {idx + 1}
                    </div>
                    <div className="space-y-1 text-left">
                      <span className="text-xs font-mono font-bold text-white">{step.stage}</span>
                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
