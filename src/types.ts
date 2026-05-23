/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SystemLog {
  id: string;
  timestamp: string;
  type: 'incoming' | 'outgoing' | 'success' | 'error' | 'info';
  method: string;
  url: string;
  payload?: string;
  response?: string;
}

export interface QuoteFormData {
  width: number; // in inches
  height: number; // in inches
  lettersCount: number;
  text: string;
  materials: 'acrylic' | 'stainless_steel' | 'brass' | 'alucobond';
  lighting: 'led_backlit' | 'frontlit' | 'side_glow' | 'non_lit';
  backing: 'metal' | 'clear_acrylic' | 'none';
  signType: '3d_channel' | '2d_flat' | 'light_box' | 'custom_cut';
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
  logoAttached: File | null;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  estimatedDelivery: string;
  basePrice: string;
}
