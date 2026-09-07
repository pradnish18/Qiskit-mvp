/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DecadeSection } from './components/DecadeSection';
import { BuildSection } from './components/BuildSection';
import { ConnectSection } from './components/ConnectSection';
import { WhyAttendSection } from './components/WhyAttendSection';
import { EventFormatSection } from './components/EventFormatSection';
import { ProgramSection } from './components/ProgramSection';
import { RegistrationSection } from './components/RegistrationSection';
import { Footer } from './components/Footer';
import { RegisterModal } from './components/RegisterModal';

export default function App() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };

  const handleExploreClick = () => {
    // Smooth scroll down to narrative milestone section
    const milestoneAnchor = document.getElementById('milestone');
    if (milestoneAnchor) {
      milestoneAnchor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-blue-600 selection:text-white flex flex-col font-sans">
      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:outline-none font-mono-tech text-xs"
      >
        Skip to main content
      </a>

      {/* Global Minimal Header */}
      <Header onRegisterClick={handleRegisterClick} />

      {/* Main Content Area: Continuous Cinematic Narrative */}
      <main id="main-content" className="flex-1">
        {/* Step 01: Hero Section (Approved & Locked) */}
        <HeroSection
          onRegisterClick={handleRegisterClick}
          onExploreClick={handleExploreClick}
        />

        {/* Step 02: Signature Cinematic Scroll Section (DISCOVER -> LEARN) */}
        <DecadeSection />

        {/* Step 03: Narrative State Section (LEARN -> BUILD) */}
        <BuildSection />

        {/* Step 04: Narrative State Section (BUILD -> CONNECT) */}
        <ConnectSection />

        {/* Information Architecture: Why Attend / Value Proposition */}
        <WhyAttendSection onRegisterClick={handleRegisterClick} />

        {/* Information Architecture: Event Format (One Event. Two Phases.) */}
        <EventFormatSection />

        {/* Information Architecture: Program Syllabus & Timeline Index */}
        <ProgramSection />

        {/* Primary Conversion Moment: Registration CTA */}
        <RegistrationSection onRegisterClick={handleRegisterClick} />
      </main>

      {/* Institutional Colophon & Functional Footer */}
      <Footer />

      {/* Registration Status Modal */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
}
