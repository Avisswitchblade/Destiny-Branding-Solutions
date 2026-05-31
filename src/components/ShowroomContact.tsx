/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageSquare, CheckCircle } from 'lucide-react';
import { SystemLog } from '../types';

interface ShowroomContactProps {
  onContactFormSubmitted: (log: SystemLog) => void;
}

export default function ShowroomContact({ onContactFormSubmitted }: ShowroomContactProps) {
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
          deliveryRecipient: "Destiny Branding Solutions Team"
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
                    type="text"
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
  );
}
