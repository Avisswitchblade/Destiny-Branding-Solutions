/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import CustomerSuccessStories from './CustomerSuccessStories';
import HeroSection from './HeroSection';
import FlagshipSignage from './FlagshipSignage';
import OtherServices from './OtherServices';
import ShowroomContact from './ShowroomContact';
import { SystemLog } from '../types';

interface SignageWebsiteProps {
  onOpenEstimator: () => void;
  onContactFormSubmitted: (log: SystemLog) => void;
}

export default function SignageWebsite({ onOpenEstimator, onContactFormSubmitted }: SignageWebsiteProps) {
  return (
    <div className="bg-neutral-950 text-white min-h-screen font-sans selection:bg-orange-500 selection:text-white relative">
      
      {/* Ambient Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* 1. EDGE-TO-EDGE HERO SECTION */}
      <HeroSection onOpenEstimator={onOpenEstimator} />

      {/* 2. FLAGSHIP PRODUCT SECTION: 3D & 2D SIGNAGE */}
      <FlagshipSignage onOpenEstimator={onOpenEstimator} />

      {/* 3. OTHER SERVICES SECTION (Bento grid visual) */}
      <OtherServices />

      {/* 4. CUSTOMER SUCCESS STORIES CAROUSEL */}
      <CustomerSuccessStories />

      {/* 5. NYAHURURU SHOWROOM MAP & GPS LANDMARKS */}
      <ShowroomContact onContactFormSubmitted={onContactFormSubmitted} />

    </div>
  );
}
