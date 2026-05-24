import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle, Sparkles, Star, ArrowRight, ArrowUpRight } from 'lucide-react';

interface Testimonial {
  id: string;
  clientName: string;
  companyName: string;
  location: string;
  signType: string;
  outcomeMetric: string;
  outcomeText: string;
  quote: string;
  accentColor: string;
  preset: {
    materials: 'acrylic' | 'stainless_steel' | 'brass' | 'alucobond';
    lighting: 'led_backlit' | 'frontlit' | 'side_glow' | 'non_lit';
    backing: 'metal' | 'clear_acrylic' | 'none';
    signType: '3d_channel' | '2d_flat' | 'lightbox' | 'monolith';
    text: string;
    lettersCount: number;
    width: number;
    height: number;
  };
}

const testimonials: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Kevin Kariuki',
    companyName: 'Laikipia Apex Motors & Spares',
    location: 'Nyahururu Highway Wing',
    signType: 'Premium 3D Brass Channel Letters (LED Halo Backlit Overlay)',
    outcomeMetric: '+42% Night Footfall Increase',
    outcomeText: 'Replaced a generic signage board with customized liquid-cast polished heavy brass with halo LEDs.',
    quote: "Destiny Creative's premium brass work completely changed our business profile. At night, our entire high-velocity showroom on the Laikipia highway glows with an architectural aura that has doubled our luxury spare sales.",
    accentColor: 'from-amber-500 to-orange-700',
    preset: {
      materials: 'brass',
      lighting: 'led_backlit',
      backing: 'clear_acrylic',
      signType: '3d_channel',
      text: 'APEX MOTORS',
      lettersCount: 10,
      width: 60,
      height: 30
    }
  },
  {
    id: 't2',
    clientName: 'Rose Maina',
    companyName: 'Nyahururu Elite Commercial Offices',
    location: 'Laikipia Road Plaza',
    signType: 'Custom Sandblast Frosted Window Glass Film & Flat Acrylic Cores',
    outcomeMetric: '12 Boardrooms Frosted',
    outcomeText: 'Crafted custom sound-and-glare shields embedded with high-precision logo geometry.',
    quote: "We needed both absolute board privacy and modern architectural aesthetics. Destiny design engineers came on-site to Laikipia Plaza, mapped out our partitions, and installed beautiful UV-resistant frosted decals in record time.",
    accentColor: 'from-blue-500 via-teal-400 to-emerald-500',
    preset: {
      materials: 'acrylic',
      lighting: 'non_lit',
      backing: 'none',
      signType: '2d_flat',
      text: 'ELITE OFFICE',
      lettersCount: 11,
      width: 48,
      height: 20
    }
  },
  {
    id: 't3',
    clientName: 'David Nderitu',
    companyName: 'Galana Avenue Bakeries',
    location: 'Next to New Galana Petrol Station',
    signType: 'Heavy duty 3D Stainless Steel Frontlit Letters on Alucobond',
    outcomeMetric: '100% Weatherproof Guarantee',
    outcomeText: 'Engineered a highly resilient high-exposure facade designed for harsh Nyahururu rainstorms.',
    quote: "Our brand sits right next to the New Galana Station with extreme road dust and regular cloudbursts. After two full years, our stainless steel signs look as pristine and polished as the day Destiny Creative mounted them on our wall.",
    accentColor: 'from-orange-500 to-yellow-500',
    preset: {
      materials: 'stainless_steel',
      lighting: 'frontlit',
      backing: 'metal',
      signType: '3d_channel',
      text: 'GALANA BAKE',
      lettersCount: 10,
      width: 72,
      height: 24
    }
  }
];

export default function CustomerSuccessStories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Support autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8500);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleApplyPreset = (testimonial: Testimonial) => {
    // Scroll smoothly to estimator
    const el = document.getElementById('estimator-workspace');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Dispatch custom event to load presets in SignageEstimator component
    setTimeout(() => {
      const event = new CustomEvent('load-estimator-preset', {
        detail: testimonial.preset
      });
      window.dispatchEvent(event);
    }, 150);
  };

  const current = testimonials[activeIndex];

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 }
      }
    })
  };

  return (
    <section id="success-stories" className="py-24 bg-neutral-950 border-t border-white/10 relative overflow-hidden">
      {/* Subtle radial gradients overlaying dark modes */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none transition-all duration-700`} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-neutral-950 border border-white/10 px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">IMPACT MATTERS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black italic tracking-tighter leading-[0.9] text-white uppercase">
            CLIENT <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">SUCCESS STORIES</span>
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto font-light">
            Read how we have crafted high-performance spatial branding signage and privacy frosting concepts for Nyahururu's lead business landmarks.
          </p>
        </div>

        {/* Carousel Workstation Wrapper */}
        <div className="relative max-w-5xl mx-auto min-h-[460px] md:min-h-[400px] flex items-center justify-center">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Product Info / Metric Side Block */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-neutral-900/40 border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden text-left">
                {/* Visual accent bar */}
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${current.accentColor}`} />
                
                <div className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block tracking-wider">PROJECT OUTCOME</span>
                    <h4 className={`text-2xl sm:text-3xl font-black bg-gradient-to-r ${current.accentColor} bg-clip-text text-transparent italic`}>
                      {current.outcomeMetric}
                    </h4>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold">CLIENT SOLUTION</h5>
                    <p className="text-xs text-white bg-white/5 px-3 py-2 rounded-lg border border-white/10 select-none">
                      {current.signType}
                    </p>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {current.outcomeText}
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 mt-6 sm:mt-0">
                  <button
                    onClick={() => handleApplyPreset(current)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 hover:text-white transition-all duration-300 group cursor-pointer"
                  >
                    <span>Configure Sign Template</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Textual Quote Body Side Block */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-neutral-900/20 border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-sm text-left">
                <div className="space-y-6">
                  
                  {/* Verified badge + stars */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                      <CheckCircle className="w-3 h-3" /> VERIFIED OUTCOME
                    </div>
                  </div>

                  {/* Quote text block */}
                  <div className="relative">
                    <span className="absolute -top-10 -left-6 text-7xl text-white/5 font-serif select-none">“</span>
                    <p className="text-sm sm:text-base md:text-lg text-neutral-200 font-light leading-relaxed italic relative z-10 font-sans">
                      {current.quote}
                    </p>
                  </div>

                </div>

                {/* Author Credentials */}
                <div className="pt-8 border-t border-white/5 flex justify-between items-center mt-6">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white tracking-wide">{current.clientName}</p>
                    <p className="text-xs text-neutral-500">
                      {current.companyName} &middot; <span className="text-orange-400">{current.location}</span>
                    </p>
                  </div>
                  
                  {/* Miniature brand icon box */}
                  <div className={`w-8 h-8 rounded bg-gradient-to-br ${current.accentColor} flex items-center justify-center font-bold text-xs text-neutral-950 italic select-none font-sans shrink-0`}>
                    {current.companyName.substring(0, 1)}
                  </div>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 sm:-left-12 lg:-left-16 w-10 h-10 rounded-full bg-neutral-900/80 border border-white/10 hover:border-orange-500/30 flex items-center justify-center text-white/70 hover:text-white hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 z-20 cursor-pointer shadow-lg backdrop-blur"
            title="Previous Story"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute -right-4 sm:-right-12 lg:-right-16 w-10 h-10 rounded-full bg-neutral-900/80 border border-white/10 hover:border-orange-500/30 flex items-center justify-center text-white/70 hover:text-white hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 z-20 cursor-pointer shadow-lg backdrop-blur"
            title="Next Story"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Paginated Dots navigation indicators */}
        <div className="flex justify-center items-center gap-2.5 mt-8 relative z-20">
          {testimonials.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex 
                  ? 'w-6 bg-orange-500' 
                  : 'w-2 bg-neutral-700 hover:bg-neutral-500'
              }`}
              title={`Jump to story ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
