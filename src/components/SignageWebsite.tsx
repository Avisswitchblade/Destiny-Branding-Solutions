/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Flame,
  Shirt,
  Tags,
  Image as ImageIcon,
  CheckCircle,
  HelpCircle,
  Send,
  MessageSquare
} from 'lucide-react';
import { SystemLog } from '../types';

interface SignageWebsiteProps {
  onOpenEstimator: () => void;
  onContactFormSubmitted: (log: SystemLog) => void;
}

export default function SignageWebsite({ onOpenEstimator, onContactFormSubmitted }: SignageWebsiteProps) {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '3D Signage Consultation',
    message: ''
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Quick contact submission simulating backend communication
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) {
      alert("Please enter both Name and Phone context.");
      return;
    }

    setSubmitting(true);
    
    // Log outbound payload trace
    const outgoingLog: SystemLog = {
      id: Math.random().toString(),
      timestamp: new Date().toISOString(),
      type: 'outgoing',
      method: "POST",
      url: "/api/contact",
      payload: JSON.stringify(contactForm, null, 2),
    };

    onContactFormSubmitted(outgoingLog);

    setTimeout(() => {
      // Return log payload
      const successResponse: SystemLog = {
        id: Math.random().toString(),
        timestamp: new Date().toISOString(),
        type: 'success',
        method: "RECEIVE",
        url: "/api/contact",
        response: JSON.stringify({
          success: true,
          referenceId: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
          message: "Contact message stored successfully. Whatsapp alert dispatched to Nyahururu admins.",
          deliveryRecipient: "Destiny Creative Team"
        }, null, 2),
      };

      onContactFormSubmitted(successResponse);
      setSubmitting(false);
      setFormSuccess(true);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '3D Signage Consultation',
        message: ''
      });
    }, 1200);
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen font-sans selection:bg-orange-500 selection:text-white relative">
      
      {/* Ambient Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* 2. EDGE-TO-EDGE HERO SECTION */}
      <section id="hero" className="relative font-sans min-h-[85vh] flex items-center justify-center overflow-hidden z-10">
        {/* Background Overlay Grid */}
        <div className="absolute inset-0 bg-neutral-950">
          {/* Main Visual background using generated premium image */}
          <div className="absolute inset-0 opacity-40 mix-blend-luminosity bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/images/destiny_hero_banner_png_1779539328980.png')" }}></div>
          {/* Subtle radial gradients overlaying dark modes */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40"></div>
          
          {/* Blueprint fine lines overlay */}
          <div className="absolute inset-0" style={{ backgroundSize: '40px 40px', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.01) 1px, transparent 1px)' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center z-10 space-y-8">
          
          {/* Slogan pill tag */}
          <div className="mb-6 inline-flex items-center gap-2 bg-neutral-950 border border-white/10 px-3 py-1.5 rounded-full mx-auto animate-fade-in">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Flagship Product Signage</span>
          </div>

          {/* Epic Main Headline matching Immersive UI font weights */}
          <div className="space-y-4 max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.9] text-white uppercase">
              ELEVATE YOUR<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">VISIBILITY.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-400 leading-relaxed font-light font-sans pt-2">
              We engineer premium 3D and 2D outdoor signage, high-fidelity apparel screen-printing, window films, and complete branding solutions out of Nyahururu, Kenya.
            </p>
          </div>

          {/* CTAs Blocks */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenEstimator}
              className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-orange-600/20 transition-all cursor-pointer w-full sm:w-auto"
            >
              Get Custom Quote
            </button>
            
            <a
              href="#contact-showroom"
              className="border border-white/10 hover:bg-white/5 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer w-full sm:w-auto text-center block"
            >
              Contact Showroom
            </a>
          </div>

          {/* Quick Nyahururu Location Indicators */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-neutral-900/70 text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase">ENTERPRISE HQ</span>
              <p className="text-xs text-white font-semibold">Pondo Park Building, Nyahururu</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase">LOCAL LANDMARK</span>
              <p className="text-xs text-neutral-400">Next to New Galana Petrol Station</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase">FAST DIRECT DIAL</span>
              <p className="text-xs text-orange-400 font-semibold">0723 408 672 | 0721 691 511</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase">FLAGSHIP PRODUCT</span>
              <p className="text-xs text-amber-400 font-semibold">3D / 2D LED Backlit Signs</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FLAGSHIP PRODUCT SECTION: 3D & 2D SIGNAGE */}
      <section id="flagship-signage" className="py-24 bg-neutral-950 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-neutral-900 pb-8">
            <div>
              <span className="text-xs font-mono text-orange-500 tracking-widest uppercase block mb-1">UNCOMPROMISING VISIBILITY</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Flagship Architectural Signage
              </h2>
            </div>
            <p className="text-sm max-w-md text-neutral-400">
              Our signature 3D LED backlit letters and multi-layered 2D architectural board displays offer Nyahururu's elite brand presence that lasts generations.
            </p>
          </div>

          {/* Flagship Product Showcase Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Spec Columns */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs rounded-full">
                <Award className="w-3.5 h-3.5" />
                <span>3D Acrylic & Steel Letters</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-normal">
                LED Backlit Halo Glow Letters
              </h3>
              
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-light font-sans">
                Each letter is individually liquid-cast or CNC carved from high-diffusion structural acrylic or commercial stainless steel. Lined internally with outdoor IP67 LEDs designed to project highly elegant retro glows on concrete or wood surfaces.
              </p>

              {/* Specs Matrix */}
              <div className="grid grid-cols-2 gap-4 border-t border-neutral-900 pt-6 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-neutral-500 block">WEATHER DEFENSE</span>
                  <span className="text-white font-bold block">Waterproof, Rustproof Polymer</span>
                </div>
                <div className="space-y-1">
                  <span className="text-neutral-500 block">ILLUMINATION PROFILE</span>
                  <span className="text-white font-bold block">Halo / Front Backlighting</span>
                </div>
                <div className="space-y-1">
                  <span className="text-neutral-500 block">ACRYLIC CORES</span>
                  <span className="text-white font-bold block">3mm To 10mm Gloss Cast</span>
                </div>
                <div className="space-y-1">
                  <span className="text-neutral-500 block">WIND STRENGTH</span>
                  <span className="text-white font-bold block">Rated up to 120 km/h</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenEstimator}
                  className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-850 text-orange-400 hover:text-white border border-neutral-800 hover:border-orange-500/30 px-5 py-3 rounded-lg text-xs font-mono transition cursor-pointer"
                >
                  <span>Build custom proof specs</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Showcase Image with glows */}
            <div className="lg:col-span-7 bg-neutral-900/60 p-4 border border-neutral-900 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-600/10 rounded-full blur-[80px] group-hover:bg-orange-600/15 transition-all"></div>
              
              {/* Generated Image */}
              <img
                src="/src/assets/images/backlit_signage_showcase_png_1779539346981.png"
                alt="Halo backlighting custom design by Destiny Branding Solutions"
                className="w-full h-auto aspect-[4/3] rounded-xl object-cover relative z-10 border border-neutral-800/80 mix-blend-color-dodge brightness-110"
                referrerPolicy="no-referrer"
              />

              <div className="absolute bottom-6 left-6 z-20 bg-neutral-950/80 border border-neutral-800 backdrop-blur-md px-4 py-2 text-left rounded-lg">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">Project draft sample</span>
                <span className="text-xs text-white font-bold">Metallic Gold Bezel + Backlit LED Glow</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. OTHER SERVICES SECTION (Bento grid visual) */}
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
                <p className="text-xs text-neutral-400 leading-relaxed leading-relaxed font-sans">
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

                <div className="space-y-2 border-t border-neutral-950 pt-3">
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

                <div className="space-y-2 border-t border-neutral-950 pt-3">
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

      {/* 5. NYAHURURU SHOWROOM MAP & GPS LANDMARKS */}
      <section id="contact-showroom" className="py-20 bg-neutral-950 px-4 sm:px-6 relative border-t border-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Informatives and contacts */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-mono text-orange-500 tracking-widest uppercase block mb-1">VISIT MEETS</span>
            <h2 className="text-3xl font-extrabold text-white">Nyahururu Local Showroom</h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Drop by our core fabrication studio to browse physical material mockups, examine LED dispersion hues in real context, and sit with our blueprint designers to draft custom templates.
            </p>

            <div className="space-y-4 pt-4 border-t border-neutral-900">
              
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-orange-500 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="text-neutral-500 uppercase block font-mono">STREET LOCATION ADDRESS:</span>
                  <span className="text-white font-bold block mt-0.5 text-sm">Pondo Park Building</span>
                  <p className="text-neutral-400 mt-0.5">Next to New Galana Petrol Station, Nyahururu, Kenya.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-500 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="text-neutral-500 uppercase block font-mono">TALK TO DESIGN ENGINEER:</span>
                  <div className="flex gap-4 mt-1 font-bold">
                    <a href="tel:0723408672" className="text-orange-400 hover:text-orange-300">0723 408 672</a>
                    <span className="text-neutral-700">|</span>
                    <a href="tel:0721691511" className="text-orange-400 hover:text-orange-300">0721 691 511</a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="text-neutral-500 uppercase block font-mono">OFFICE FABRICATION HOURS:</span>
                  <span className="text-white font-bold block mt-1">Mon - Sat: 8:00 AM - 6:00 PM</span>
                  <span className="text-neutral-500 italic">Closed Sundays & Public Holidays</span>
                </div>
              </div>

            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/254723408672?text=Hi%20Destiny%20Creative,%20I'd%20like%20to%20make%20an%20appointment%20to%20visit%20your%20Nyahururu%20showroom%20at%20Pondo%20Park."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold px-5 py-3 rounded-lg transition"
              >
                <MessageSquare className="w-4 h-4" /> Message on WhatsApp
              </a>
              <a
                href="tel:0723408672"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 text-xs font-mono font-bold px-5 py-3 rounded-lg border border-neutral-800 transition"
              >
                <Phone className="w-4 h-4" /> Place direct Call
              </a>
            </div>

          </div>

          {/* Quick Contact Consultation Form */}
          <div className="lg:col-span-7 bg-neutral-900/40 p-6 rounded-2xl border border-neutral-900/80 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange-500" />
              Express Consultation Call
            </h3>

            {formSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Call Scheduled Safely!</h4>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
                  We have mapped your inquiry details. The technical dispatch team has been notified. We will call you back on the phone number provided shortly.
                </p>
                <button
                  onClick={() => setFormSuccess(false)}
                  className="text-xs text-orange-400 underline hover:text-orange-300 mt-2 cursor-pointer"
                >
                  Send another inquiry message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-mono">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-neutral-500 font-semibold tracking-wider">YOUR FULL NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe Kariuki"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-neutral-950 border border-neutral-850 px-3.5 py-2.5 rounded-lg text-white font-sans text-xs outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-neutral-500 font-semibold tracking-wider">MEMBER CONTACT PHONE *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0723408672"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-neutral-950 border border-neutral-850 px-3.5 py-2.5 rounded-lg text-white font-sans text-xs outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-neutral-500 font-semibold tracking-wider">YOUR EMAIL ADDRESS</label>
                    <input
                      type="email"
                      placeholder="e.g. business@gmail.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-neutral-950 border border-neutral-850 px-3.5 py-2.5 rounded-lg text-white font-sans text-xs outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-neutral-500 font-semibold tracking-wider">INTERESTED SERVICE</label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full bg-neutral-950 border border-neutral-850 p-2.5 rounded-lg text-neutral-300 font-sans text-xs outline-none focus:border-orange-500"
                    >
                      <option value="3D/2D Channel Letters">3D & 2D Signage Letters</option>
                      <option value="Window Film sandblast">Window Film Frosted sheets</option>
                      <option value="Branded Hoodies caps">Corporate Apparel (T-shirts/Hoodies)</option>
                      <option value="Warning compliant signs">Warning compliant and PVC Banners</option>
                      <option value="Custom key Door tags">Apartment laser-milled Keytags</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-neutral-500 font-semibold tracking-wider">DETAILED REQUIREMENTS (OPTIONAL)</label>
                  <textarea
                    rows={4}
                    placeholder="Hi Destiny Team, we are building a branch near petrol station and require estimates for backlit sign board..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-neutral-950 border border-neutral-850 px-3.5 py-2.5 rounded-lg text-white font-sans text-xs outline-none focus:border-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-xl transition text-xs tracking-widest uppercase cursor-pointer"
                >
                  {submitting ? 'DISPATCHING TRACE...' : 'Send request'}
                </button>
                <p className="text-[10px] text-center text-neutral-500">
                  By submitting, you route this request into our active /api/contact simulated pipeline.
                </p>

              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
