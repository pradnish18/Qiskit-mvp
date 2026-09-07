/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Calendar, ShieldCheck, Clock } from 'lucide-react';
import { EVENT_IDENTITY } from '../data/eventData';
import { smoothStep } from '../utils/useScrollProgress';

interface RegistrationSectionProps {
  onRegisterClick?: () => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({ onRegisterClick }) => {
  const revealContainerRef = useRef<HTMLDivElement>(null);
  const [revealProgress, setRevealProgress] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Dedicated scroll listener tracking the bottom typography reveal window
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!revealContainerRef.current) return;

      const rect = revealContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight;

      // Start revealing when the top of the reveal region enters the bottom of the viewport
      const startTrigger = windowHeight * 1.05;
      // Finish revealing when the reveal container is fully scrolled into view
      const endTrigger = windowHeight - rect.height;

      const rawProgress = (startTrigger - rect.top) / Math.max(1, startTrigger - endTrigger);
      const isAtDocBottom = scrollY + windowHeight >= docHeight - 12;

      // Ensure that when user reaches the end of the page, reveal completes fully
      const clamped = isAtDocBottom ? 1 : Math.max(0, Math.min(1, rawProgress));

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setRevealProgress(clamped);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Polynomial smoothStep easing for heavy architectural emergence
  const eased = smoothStep(revealProgress);

  // Initial: sits 100% down (completely hidden below horizon)
  // Final: settles with 80% visible upward (20% submerged below bottom edge)
  const translateYPercent = prefersReducedMotion ? 20 : (1 - eased) * 80 + 20;
  const textOpacity = prefersReducedMotion ? 1 : 0.3 + eased * 0.7;

  return (
    <section
      id="registration"
      className="relative w-full bg-[#07090e] text-[#f8fafc] pt-28 sm:pt-36 pb-0 border-t border-white/[0.08] overflow-hidden"
      aria-labelledby="registration-heading"
    >
      {/* Anchor for in-page navigation compatibility */}
      <span id="register" className="sr-only" aria-hidden="true" />
      {/* Background Architectural Datum: Restrained hairline guides */}
      <div
        className="absolute inset-0 pointer-events-none select-none max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-between"
        aria-hidden="true"
      >
        <div className="w-px h-full bg-white/[0.02]" />
        <div className="hidden lg:block w-px h-full bg-white/[0.02]" />
        <div className="w-px h-full bg-white/[0.02]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10">
        {/* Asymmetric Editorial Composition (Registration Content Unchanged) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Eyebrow, Display Headline & Editorial Call (Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            {/* Section Eyebrow */}
            <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.25em] text-sky-400 mb-4 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80" aria-hidden="true" />
              <span>REGISTRATION</span>
            </div>

            {/* Display Headline */}
            <h2
              id="registration-heading"
              className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-[-0.04em] text-[#f8fafc] leading-[1.02] font-sans mb-8 max-w-xl"
            >
              READY TO
              <br />
              <span className="text-slate-400 font-normal">TAKE PART?</span>
            </h2>

            {/* Concise Supporting Exposition */}
            <p className="text-base sm:text-lg text-slate-300 font-mono-tech leading-relaxed font-light mb-10 max-w-xl">
              Join students, developers, and researchers at SRM University-AP as we mark a decade of quantum computing on cloud—from remote algorithm design in Phase I to collaborative synthesis on campus in Phase II.
            </p>

            {/* Institutional Endorsement Anchor */}
            <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-tech text-xs text-slate-400 select-none">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 uppercase tracking-widest text-[10px]">HOST:</span>
                <span className="text-slate-200">{EVENT_IDENTITY.institution}</span>
              </div>
              <span className="text-white/20 text-[10px]" aria-hidden="true">·</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 uppercase tracking-widest text-[10px]">LOCATION:</span>
                <span className="text-slate-200">{EVENT_IDENTITY.location}</span>
              </div>
              <span className="text-white/20 text-[10px]" aria-hidden="true">·</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 uppercase tracking-widest text-[10px]">STATUS:</span>
                <span className="text-sky-400 font-medium">{EVENT_IDENTITY.hostBadge}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Event Coordinate Summary & Primary Action Anchor (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="p-8 sm:p-10 rounded border border-white/[0.1] bg-white/[0.02] flex flex-col justify-between">
              
              {/* Event Coordinates Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-[0.25em] text-sky-400 mb-2 select-none">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                  <span>OFFICIAL EVENT REGISTRATION</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white mb-1">
                  {EVENT_IDENTITY.name}
                </div>
                <div className="font-mono-tech text-xs text-slate-400">
                  {EVENT_IDENTITY.institution} · {EVENT_IDENTITY.location}
                </div>
              </div>

              {/* Two-Phase Date Coordinates */}
              <div className="space-y-4 mb-8 select-none">
                <div className="flex items-start justify-between gap-4 p-3.5 rounded border border-white/[0.06] bg-black/40">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <div className="font-mono-tech text-xs font-semibold text-white tracking-wide">
                        PHASE I · ONLINE
                      </div>
                      <div className="font-mono-tech text-[11px] text-slate-400 mt-0.5">
                        Virtual Foundations & Circuit Design
                      </div>
                    </div>
                  </div>
                  <div className="font-mono-tech text-xs text-slate-200 font-medium tracking-wide shrink-0">
                    {EVENT_IDENTITY.phases[0].dates}
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4 p-3.5 rounded border border-white/[0.06] bg-black/40">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <div className="font-mono-tech text-xs font-semibold text-white tracking-wide">
                        PHASE II · ON-CAMPUS
                      </div>
                      <div className="font-mono-tech text-[11px] text-slate-400 mt-0.5">
                        SRM University-AP, Amaravati
                      </div>
                    </div>
                  </div>
                  <div className="font-mono-tech text-xs text-slate-200 font-medium tracking-wide shrink-0">
                    {EVENT_IDENTITY.phases[1].dates}
                  </div>
                </div>
              </div>

              {/* Primary Action Button & Status */}
              <div className="space-y-3">
                <button
                  type="button"
                  id="primary-registration-btn"
                  onClick={onRegisterClick}
                  className="group w-full py-4 px-6 rounded bg-[#f8fafc] hover:bg-white text-[#07090e] font-mono-tech text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.99] focus-ring"
                  aria-label="View official registration protocol and schedule for Qiskit Fall Fest 2026"
                >
                  <span>REGISTER FOR FALL FEST</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </button>

                {/* Clear, Intentional Status Clarification */}
                <div className="flex items-center justify-center gap-2 font-mono-tech text-[11px] text-slate-400 select-none text-center pt-1">
                  <Clock className="w-3 h-3 text-sky-400 shrink-0" aria-hidden="true" />
                  <span>REGISTRATION PROTOCOL ACTIVE · FORM LAUNCH IMMINENT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transitional Spacing Datum Anchor */}
        <div
          className="mt-20 pt-8 border-t border-white/[0.08] flex items-center justify-between font-mono-tech text-[11px] text-slate-500 uppercase tracking-widest select-none"
          aria-hidden="true"
        >
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80" />
            <span>QISKIT FALL FEST 2026</span>
          </div>
          <div className="text-slate-500">
            SRM UNIVERSITY-AP · AMARAVATI
          </div>
        </div>
      </div>

      {/* 
        ============================================================
        CINEMATIC TYPOGRAPHIC REVEAL: "QISKIT FALL FEST"
        ============================================================
        An oversized, architectural typographic mark that physically
        rises from beneath the bottom clipping boundary as the user
        scrolls toward the conclusion of the section.
      */}
      <div
        ref={revealContainerRef}
        className="relative w-full mt-16 sm:mt-24 pt-8 pb-0 overflow-hidden select-none pointer-events-none"
        aria-label="Qiskit Fall Fest brand signature"
      >
        {/* Top Boundary Subtle Datum Hairline */}
        <div className="w-full h-px bg-white/[0.06] mb-4 sm:mb-6" aria-hidden="true" />

        {/* Reveal Viewport / Mask */}
        <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-8 overflow-hidden flex justify-center items-end">
          <div
            className="w-full text-center transition-transform duration-100 ease-out will-change-transform"
            style={{
              transform: `translate3d(0, ${translateYPercent}%, 0)`,
              opacity: textOpacity,
            }}
          >
            {/*
              Desktop (1024px+): Single unbroken line with fluid clamp scaling.
              Mobile / Tablet: Controlled natural wrap without clipping or horizontal overflow.
            */}
            <h3
              className="font-sans font-extrabold tracking-[-0.045em] uppercase text-transparent leading-[0.88] whitespace-normal lg:whitespace-nowrap select-none"
              style={{
                fontSize: 'clamp(3.5rem, 11.5vw, 15rem)',
                WebkitTextStroke: '1.5px rgba(248, 250, 252, 0.28)',
                textShadow: '0 0 30px rgba(7, 9, 14, 0.8)',
              }}
            >
              QISKIT FALL FEST
            </h3>
          </div>
        </div>

        {/* Bottom Horizon Hairline Grounding the Section */}
        <div className="w-full h-px bg-white/[0.08] mt-2 sm:mt-4" aria-hidden="true" />
      </div>
    </section>
  );
};
