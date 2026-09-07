/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { EVENT_IDENTITY } from '../data/eventData';
import { useScrollProgress, smoothStep } from '../utils/useScrollProgress';

interface PhaseFormatData {
  id: string;
  number: string;
  phaseLabel: string;
  type: string;
  locationLabel: string;
  dates: string;
  headline: string;
  focusKeywords: string[];
  description: string;
}

const PHASES_FORMAT: PhaseFormatData[] = [
  {
    id: 'phase-1',
    number: '01',
    phaseLabel: EVENT_IDENTITY.phases[0].phase,
    type: EVENT_IDENTITY.phases[0].type,
    locationLabel: 'VIRTUAL ENVIRONMENT',
    dates: EVENT_IDENTITY.phases[0].dates,
    headline: 'Virtual Foundations & Circuit Design',
    focusKeywords: ['LEARN', 'EXPLORE', 'PREPARE'],
    description:
      'An accessible online phase focused on foundational quantum concepts, circuit design with Qiskit, and independent exploration of cloud quantum systems.',
  },
  {
    id: 'phase-2',
    number: '02',
    phaseLabel: EVENT_IDENTITY.phases[1].phase,
    type: 'ON-CAMPUS',
    locationLabel: `${EVENT_IDENTITY.institution}, ${EVENT_IDENTITY.location}`,
    dates: EVENT_IDENTITY.phases[1].dates,
    headline: 'On-Campus Development & Synthesis',
    focusKeywords: ['BUILD', 'COLLABORATE', 'CONNECT'],
    description:
      `An intensive in-person phase hosted at ${EVENT_IDENTITY.institution} in ${EVENT_IDENTITY.location}, uniting attendees for collaborative development, project assembly, and community exchange.`,
  },
];

export const EventFormatSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(containerRef);

  // Transition Choreography (Desktop 1024px+):
  // 0.00 - 0.28: Hold Phase I
  // 0.28 - 0.62: Phase I smoothly transitions to Phase II in the exact same spot
  // 0.62 - 0.92: Hold Phase II stable
  // 0.92 - 1.00: Section completes and smoothly releases to the next section
  const transT = Math.max(0, Math.min(1, (scrollProgress - 0.28) / 0.34));
  const easedTrans = smoothStep(transT);

  // Phase I values (Hold 1 -> drift upward as Phase II enters from below)
  const phase1Opacity = 1 - easedTrans;
  const phase1TranslateY = -easedTrans * 88;

  // Phase II values (Emerge upward through the stage with a longer parallax travel)
  const phase2Opacity = easedTrans;
  const phase2TranslateY = (1 - easedTrans) * 88;

  // Moving accent coordinate indicator along vertical timeline datum (12% -> 88%)
  const datumDotTopPercent = 12 + easedTrans * 76;

  // Active phase index for coordinate numbers and indicators
  const isPhase2Dominant = scrollProgress >= 0.45;

  return (
    <section
      ref={containerRef}
      id="event-format"
      className="relative w-full bg-[#07090e] text-[#f8fafc] border-t border-white/[0.08] lg:min-h-[220vh]"
      aria-labelledby="event-format-heading"
    >
      {/* Background Architectural Datum: Restrained hairline guides */}
      <div
        className="absolute inset-0 pointer-events-none select-none max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-between"
        aria-hidden="true"
      >
        <div className="w-px h-full bg-white/[0.02]" />
        <div className="hidden lg:block w-px h-full bg-white/[0.02]" />
        <div className="w-px h-full bg-white/[0.02]" />
      </div>

      {/*
        DESKTOP STICKY VIEWPORT STAGE:
        sticky top-0 h-screen w-full flex items-center
        Locks the entire viewport (both left editorial and right phase stage) in the exact vertical center of the screen
        while native scrolling progresses through the 220vh section distance.
        Once 220vh is traversed, it naturally unpins and continues down to the next section.
      */}
      <div className="lg:sticky lg:top-0 lg:h-screen w-full flex items-center justify-center py-20 sm:py-28 lg:py-0 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
            
            {/* Left Column: Eyebrow, Main Headline & High-Level Exposition (Span 5) */}
            {/* STUCK IN THE MIDDLE OF THE SCREEN WITH THE SECTION STAGE - UNMOVING & STABLE */}
            <div className="lg:col-span-5 flex flex-col justify-center select-none">
              {/* Section Eyebrow */}
              <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.25em] text-sky-400 mb-4 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80" aria-hidden="true" />
                <span>EVENT FORMAT</span>
              </div>

              {/* Display Headline */}
              <h2
                id="event-format-heading"
                className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-[-0.035em] text-[#f8fafc] leading-[1.04] font-sans mb-6 max-w-md"
              >
                ONE EVENT.
                <br />
                <span className="text-slate-400 font-normal">TWO PHASES.</span>
              </h2>

              {/* Concise Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-300 font-mono-tech leading-relaxed font-light mb-8 max-w-lg">
                Qiskit Fall Fest 2026 is structured as a two-stage progression—advancing from virtual foundations and cloud algorithm design to intensive in-person collaboration at SRM University-AP.
              </p>

              {/* Editorial Metadata Anchor */}
              <div className="pt-6 border-t border-white/[0.06] space-y-2 select-none">
                <div className="flex items-center gap-2 font-mono-tech text-xs text-slate-400">
                  <span className="text-slate-500 uppercase tracking-widest text-[10px]">HOST INSTITUTION:</span>
                  <span className="text-slate-200">{EVENT_IDENTITY.institution}</span>
                </div>
                <div className="flex items-center gap-2 font-mono-tech text-xs text-slate-400">
                  <span className="text-slate-500 uppercase tracking-widest text-[10px]">CAMPUS LOCATION:</span>
                  <span className="text-slate-200">{EVENT_IDENTITY.location}</span>
                </div>
                <div className="flex items-center gap-2 font-mono-tech text-xs text-slate-400">
                  <span className="text-slate-500 uppercase tracking-widest text-[10px]">RECOGNITION:</span>
                  <span className="text-sky-400 font-medium">{EVENT_IDENTITY.hostBadge}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Timeline Datum & Story Stage (Span 7) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              {/* DESKTOP STAGE (lg:flex): Scroll-driven single-cell stage */}
              <div className="hidden lg:flex items-center gap-8 pl-4">
                
                {/* Vertical Datum Coordinate Line */}
                <div
                  className="relative flex flex-col items-center justify-between h-[360px] select-none shrink-0"
                  aria-hidden="true"
                >
                  {/* Phase 01 Top Coordinate Anchor */}
                  <div className="flex flex-col items-center gap-1.5">
                    <span
                      className={`font-mono-tech text-[11px] tracking-wider transition-colors duration-300 font-semibold ${
                        !isPhase2Dominant ? 'text-sky-400' : 'text-slate-500'
                      }`}
                    >
                      01
                    </span>
                    <div
                      className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                        !isPhase2Dominant
                          ? 'bg-sky-400 border-sky-300 scale-125'
                          : 'bg-[#07090e] border-white/20'
                      }`}
                    />
                  </div>

                  {/* Connecting Hairline Datum Track */}
                  <div className="relative w-px h-[280px] bg-white/[0.12]">
                    {/* Travelling Coordinate Accent Marker */}
                    <div
                      className="absolute left-[-2px] w-[5px] h-6 bg-gradient-to-b from-sky-400 to-sky-500/80 rounded-full transition-transform duration-100 ease-out will-change-transform"
                      style={{
                        top: `${datumDotTopPercent}%`,
                        transform: 'translateY(-50%)',
                      }}
                    />
                  </div>

                  {/* Phase 02 Bottom Coordinate Anchor */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                        isPhase2Dominant
                          ? 'bg-sky-400 border-sky-300 scale-125'
                          : 'bg-[#07090e] border-white/20'
                      }`}
                    />
                    <span
                      className={`font-mono-tech text-[11px] tracking-wider transition-colors duration-300 font-semibold ${
                        isPhase2Dominant ? 'text-sky-400' : 'text-slate-500'
                      }`}
                    >
                      02
                    </span>
                  </div>
                </div>

                {/* Single-Cell Coordinate Stage: Phase I and Phase II occupy exact same spatial coordinates */}
                <div className="relative w-full min-h-[360px] grid grid-cols-1 grid-rows-1 items-center">
                  
                  {/* PHASE I LAYER */}
                  <article
                    className="col-start-1 row-start-1 will-change-transform transition-[opacity,transform] duration-200 ease-out"
                    style={{
                      opacity: phase1Opacity,
                      transform: `translate3d(0, ${phase1TranslateY}px, 0)`,
                      pointerEvents: phase1Opacity > 0.1 ? 'auto' : 'none',
                      visibility: phase1Opacity > 0.005 ? 'visible' : 'hidden',
                    }}
                    aria-hidden={phase1Opacity < 0.5}
                    aria-labelledby="phase-1-desktop-title"
                  >
                    <header className="mb-4">
                      <div className="flex items-baseline gap-3 font-mono-tech text-xs tracking-[0.2em] mb-2 select-none">
                        <span className="text-sky-400 font-semibold">{PHASES_FORMAT[0].number}</span>
                        <span className="text-white/20 text-[10px]" aria-hidden="true">/</span>
                        <span className="text-[#f8fafc] font-medium tracking-[0.25em]">
                          {PHASES_FORMAT[0].phaseLabel}
                        </span>
                        <span className="text-white/20 text-[10px]" aria-hidden="true">·</span>
                        <span className="px-2 py-0.5 rounded text-[10px] tracking-widest uppercase bg-sky-950/40 text-sky-400 border border-sky-500/20">
                          {PHASES_FORMAT[0].type}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 font-mono-tech text-xs text-slate-400 mb-3">
                        <span className="text-slate-200 font-medium tracking-wide">
                          {PHASES_FORMAT[0].dates}
                        </span>
                        <span className="text-white/20 text-[10px]" aria-hidden="true">|</span>
                        <span className="text-slate-400 text-[11px] tracking-wide uppercase">
                          {PHASES_FORMAT[0].locationLabel}
                        </span>
                      </div>

                      <h3
                        id="phase-1-desktop-title"
                        className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-white"
                      >
                        {PHASES_FORMAT[0].headline}
                      </h3>
                    </header>

                    {/* Conceptual Focus Keywords Bar */}
                    <div
                      className="flex items-center gap-2 font-mono-tech text-[11px] tracking-[0.18em] text-slate-400 mb-4 select-none"
                      aria-label={`Core focus: ${PHASES_FORMAT[0].focusKeywords.join(', ')}`}
                    >
                      {PHASES_FORMAT[0].focusKeywords.map((keyword, kIdx) => (
                        <React.Fragment key={keyword}>
                          {kIdx > 0 && (
                            <span className="text-white/20 text-[10px]" aria-hidden="true">
                              →
                            </span>
                          )}
                          <span className="text-slate-300 font-medium">
                            {keyword}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>

                    <p className="text-sm sm:text-base text-slate-300 font-mono-tech leading-relaxed max-w-xl font-light">
                      {PHASES_FORMAT[0].description}
                    </p>

                    <div
                      className="mt-6 pt-4 border-t border-dashed border-white/[0.08] flex items-center gap-3 font-mono-tech text-[11px] text-slate-500 uppercase tracking-widest select-none"
                      aria-hidden="true"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                      <span>SCROLL TO ADVANCE TO PHASE II</span>
                    </div>
                  </article>

                  {/* PHASE II LAYER */}
                  <article
                    className="col-start-1 row-start-1 will-change-transform transition-[opacity,transform] duration-200 ease-out"
                    style={{
                      opacity: phase2Opacity,
                      transform: `translate3d(0, ${phase2TranslateY}px, 0)`,
                      pointerEvents: phase2Opacity > 0.1 ? 'auto' : 'none',
                      visibility: phase2Opacity > 0.005 ? 'visible' : 'hidden',
                    }}
                    aria-hidden={phase2Opacity < 0.5}
                    aria-labelledby="phase-2-desktop-title"
                  >
                    <header className="mb-4">
                      <div className="flex items-baseline gap-3 font-mono-tech text-xs tracking-[0.2em] mb-2 select-none">
                        <span className="text-sky-400 font-semibold">{PHASES_FORMAT[1].number}</span>
                        <span className="text-white/20 text-[10px]" aria-hidden="true">/</span>
                        <span className="text-[#f8fafc] font-medium tracking-[0.25em]">
                          {PHASES_FORMAT[1].phaseLabel}
                        </span>
                        <span className="text-white/20 text-[10px]" aria-hidden="true">·</span>
                        <span className="px-2 py-0.5 rounded text-[10px] tracking-widest uppercase bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                          {PHASES_FORMAT[1].type}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 font-mono-tech text-xs text-slate-400 mb-3">
                        <span className="text-slate-200 font-medium tracking-wide">
                          {PHASES_FORMAT[1].dates}
                        </span>
                        <span className="text-white/20 text-[10px]" aria-hidden="true">|</span>
                        <span className="text-slate-400 text-[11px] tracking-wide uppercase">
                          {PHASES_FORMAT[1].locationLabel}
                        </span>
                      </div>

                      <h3
                        id="phase-2-desktop-title"
                        className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-white"
                      >
                        {PHASES_FORMAT[1].headline}
                      </h3>
                    </header>

                    {/* Conceptual Focus Keywords Bar */}
                    <div
                      className="flex items-center gap-2 font-mono-tech text-[11px] tracking-[0.18em] text-slate-400 mb-4 select-none"
                      aria-label={`Core focus: ${PHASES_FORMAT[1].focusKeywords.join(', ')}`}
                    >
                      {PHASES_FORMAT[1].focusKeywords.map((keyword, kIdx) => (
                        <React.Fragment key={keyword}>
                          {kIdx > 0 && (
                            <span className="text-white/20 text-[10px]" aria-hidden="true">
                              →
                            </span>
                          )}
                          <span className="text-slate-300 font-medium">
                            {keyword}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>

                    <p className="text-sm sm:text-base text-slate-300 font-mono-tech leading-relaxed max-w-xl font-light">
                      {PHASES_FORMAT[1].description}
                    </p>

                    <div
                      className="mt-6 pt-4 border-t border-dashed border-white/[0.08] flex items-center gap-3 font-mono-tech text-[11px] text-sky-400/80 uppercase tracking-widest select-none"
                      aria-hidden="true"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                      <span>ON-CAMPUS AT SRM UNIVERSITY-AP</span>
                    </div>
                  </article>
                </div>
              </div>

              {/* MOBILE PRESENTATION (<lg:block): Clean, non-sticky sequential vertical flow */}
              <div className="lg:hidden relative pl-6 sm:pl-10 space-y-12 sm:space-y-14">
                {/* Continuous Timeline Datum */}
                <div
                  className="absolute left-0 top-3 bottom-8 w-px bg-white/[0.12] pointer-events-none"
                  aria-hidden="true"
                />

                {PHASES_FORMAT.map((phase, idx) => (
                  <article
                    key={phase.id}
                    className="relative group"
                    aria-labelledby={`${phase.id}-mobile-title`}
                  >
                    {/* Datum Coordinate Anchor Point */}
                    <div
                      className="absolute -left-6 sm:-left-10 top-2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border bg-[#07090e] border-sky-400"
                      aria-hidden="true"
                    />

                    <header className="mb-3">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono-tech text-xs tracking-[0.2em] mb-2 select-none">
                        <span className="text-sky-400 font-semibold">{phase.number}</span>
                        <span className="text-white/20 text-[10px]" aria-hidden="true">/</span>
                        <span className="text-[#f8fafc] font-medium tracking-[0.25em]">
                          {phase.phaseLabel}
                        </span>
                        <span className="text-white/20 text-[10px]" aria-hidden="true">·</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] tracking-widest uppercase ${
                            phase.type === 'ONLINE'
                              ? 'bg-sky-950/40 text-sky-400 border border-sky-500/20'
                              : 'bg-white/[0.04] text-slate-300 border border-white/[0.08]'
                          }`}
                        >
                          {phase.type}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono-tech text-xs text-slate-400 mb-3">
                        <span className="text-slate-200 font-medium tracking-wide">
                          {phase.dates}
                        </span>
                        <span className="text-white/20 text-[10px]" aria-hidden="true">|</span>
                        <span className="text-slate-400 text-[11px] tracking-wide uppercase">
                          {phase.locationLabel}
                        </span>
                      </div>

                      <h3
                        id={`${phase.id}-mobile-title`}
                        className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-white"
                      >
                        {phase.headline}
                      </h3>
                    </header>

                    <div
                      className="flex flex-wrap items-center gap-2 font-mono-tech text-[11px] tracking-[0.18em] text-slate-400 mb-4 select-none"
                      aria-label={`Core focus: ${phase.focusKeywords.join(', ')}`}
                    >
                      {phase.focusKeywords.map((keyword, kIdx) => (
                        <React.Fragment key={keyword}>
                          {kIdx > 0 && (
                            <span className="text-white/20 text-[10px]" aria-hidden="true">
                              →
                            </span>
                          )}
                          <span className="text-slate-300 font-medium">
                            {keyword}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>

                    <p className="text-sm sm:text-base text-slate-300 font-mono-tech leading-relaxed font-light">
                      {phase.description}
                    </p>

                    {idx === 0 && (
                      <div
                        className="mt-8 pt-4 border-t border-dashed border-white/[0.08] flex items-center gap-3 font-mono-tech text-[11px] text-slate-500 uppercase tracking-widest select-none"
                        aria-hidden="true"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                        <span>SYNTHESIS & TRANSITION INTERVAL (10 — 25 OCT)</span>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
