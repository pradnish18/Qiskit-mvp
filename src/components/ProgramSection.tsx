/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Clock, ArrowUpRight } from 'lucide-react';
import { EVENT_IDENTITY } from '../data/eventData';
import { smoothStep, useScrollProgress } from '../utils/useScrollProgress';

interface PhaseProgramOverview {
  number: string;
  phaseLabel: string;
  type: string;
  dates: string;
  location: string;
  scopeHeadline: string;
  curriculumFoci: string[];
  scheduleStatus: string;
  editorialNote: string;
}

const PROGRAM_PHASES: PhaseProgramOverview[] = [
  {
    number: '01',
    phaseLabel: EVENT_IDENTITY.phases[0].phase,
    type: EVENT_IDENTITY.phases[0].type,
    dates: EVENT_IDENTITY.phases[0].dates,
    location: 'Virtual / Cloud Infrastructure',
    scopeHeadline: 'Foundational Theory & Cloud Workflows',
    curriculumFoci: [
      'Circuit Synthesis & Superposition Dynamics',
      'Qiskit SDK Environment Configuration',
      'Algorithmic Execution on IBM Quantum Simulators',
    ],
    scheduleStatus: 'Syllabus & streaming timetable in preparation',
    editorialNote:
      'Phase I is fully distributed and designed for remote participation, establishing conceptual fluency before in-person synthesis.',
  },
  {
    number: '02',
    phaseLabel: EVENT_IDENTITY.phases[1].phase,
    type: 'ON-CAMPUS',
    dates: EVENT_IDENTITY.phases[1].dates,
    location: `${EVENT_IDENTITY.institution}, ${EVENT_IDENTITY.location}`,
    scopeHeadline: 'Physical Assembly & Collaborative Hackathon',
    curriculumFoci: [
      'In-Person Team Formation & Sprint Scoping',
      'Quantum Algorithm Benchmarking & Hardware Access',
      'Project Demonstration & Technical Presentation',
    ],
    scheduleStatus: 'Room allocations & track schedule in preparation',
    editorialNote:
      'Phase II gathers accepted participants physically at SRM University-AP for intensive project development, hands-on debugging, and communal exchange.',
  },
];

export const ProgramSection: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number | null>(null);
  const [narrativeTravel, setNarrativeTravel] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  );
  const sectionRef = useRef<HTMLElement>(null);
  const narrativeViewportRef = useRef<HTMLDivElement>(null);
  const narrativeTrackRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(sectionRef);

  useLayoutEffect(() => {
    const updateNarrativeTravel = () => {
      const viewport = narrativeViewportRef.current;
      const track = narrativeTrackRef.current;
      if (!viewport || !track) return;

      setNarrativeTravel(Math.max(0, track.scrollHeight - viewport.clientHeight));
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const handleMotionPreference = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
      requestAnimationFrame(updateNarrativeTravel);
    };
    const handleViewportChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
      requestAnimationFrame(updateNarrativeTravel);
    };

    setPrefersReducedMotion(mediaQuery.matches);
    setIsDesktop(desktopQuery.matches);
    updateNarrativeTravel();
    mediaQuery.addEventListener('change', handleMotionPreference);
    desktopQuery.addEventListener('change', handleViewportChange);

    const resizeObserver = new ResizeObserver(updateNarrativeTravel);
    if (narrativeViewportRef.current) resizeObserver.observe(narrativeViewportRef.current);
    if (narrativeTrackRef.current) resizeObserver.observe(narrativeTrackRef.current);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreference);
      desktopQuery.removeEventListener('change', handleViewportChange);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const frame = requestAnimationFrame(() => {
      const viewport = narrativeViewportRef.current;
      const track = narrativeTrackRef.current;
      if (!viewport || !track) return;

      setNarrativeTravel(Math.max(0, track.scrollHeight - viewport.clientHeight));
    });

    return () => cancelAnimationFrame(frame);
  }, [isDesktop, prefersReducedMotion]);

  const easedProgress = smoothStep(scrollProgress);
  const motionEnabled = isDesktop && !prefersReducedMotion;
  const narrativeOffset = motionEnabled ? easedProgress * narrativeTravel : 0;
  const activeScrollPhase = motionEnabled && scrollProgress > 0.68 ? 1 : 0;
  const sectionStyle = motionEnabled
    ? { minHeight: `calc(100vh - 5rem + ${narrativeTravel}px)` }
    : undefined;
  const stageContainerStyle = motionEnabled
    ? { minHeight: `calc(100vh - 5rem + ${narrativeTravel}px)` }
    : undefined;

  return (
    <section
      ref={sectionRef}
      id="program"
      className={`relative w-full bg-[#07090e] text-[#f8fafc] py-24 sm:py-32 border-t border-white/[0.08] ${motionEnabled ? 'lg:py-0' : ''}`}
      style={sectionStyle}
      aria-labelledby="program-heading"
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

      <div
        className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10"
        style={stageContainerStyle}
      >
        {/* Asymmetric Editorial Grid */}
        <div className={`${motionEnabled ? 'lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]' : ''} grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center`}>
          
          {/* Left Column: Eyebrow, Main Headline & Editorial Context (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Section Eyebrow */}
            <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.25em] text-sky-400 mb-4 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80" aria-hidden="true" />
              <span>PROGRAM</span>
            </div>

            {/* Display Headline */}
            <h2
              id="program-heading"
              className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-[-0.035em] text-[#f8fafc] leading-[1.04] font-sans mb-6 max-w-md"
            >
              WHAT HAPPENS
              <br />
              <span className="text-slate-400 font-normal">NEXT?</span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 font-mono-tech leading-relaxed font-light mb-8 max-w-lg">
              The event syllabus maps directly to the two-phase timeline. Participants begin with remote quantum algorithmic foundations and advance to physical project implementation at SRM University-AP.
            </p>

            {/* Publication Status Notice: Elegant & Authoritative */}
            <div className="p-5 rounded border border-white/[0.08] bg-white/[0.02] space-y-3 select-none">
              <div className="flex items-center gap-2 font-mono-tech text-xs text-sky-400 font-semibold tracking-wider uppercase">
                <Clock className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                <span>DETAILED SCHEDULE PENDING</span>
              </div>
              <p className="font-mono-tech text-xs text-slate-400 leading-relaxed font-light">
                Session timetables, technical track briefs, and daily schedules are currently undergoing final faculty synchronization. Confirmed date ranges and structural objectives for both phases are finalized below.
              </p>
              <div className="pt-2 flex items-center gap-2 font-mono-tech text-[10px] text-slate-500 uppercase tracking-widest border-t border-white/[0.04]">
                <span>FACULTY COORDINATION:</span>
                <span className="text-slate-300">{EVENT_IDENTITY.institution}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Vertical Editorial Program Index (Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            
            <div
              ref={narrativeViewportRef}
              className={`relative pl-6 sm:pl-10 ${motionEnabled ? 'lg:h-[min(72vh,680px)] lg:overflow-hidden' : ''}`}
            >
              {/* Continuous Vertical Editorial Datum Line */}
              <div
                className="absolute left-0 top-3 bottom-8 w-px bg-white/[0.12] pointer-events-none"
                aria-hidden="true"
              >
                {/* Active Focus Marker on Datum Track */}
                <div
                  className="absolute left-[-2px] w-[5px] h-8 bg-gradient-to-b from-sky-400 to-sky-500/80 rounded-full transition-all duration-500 ease-out pointer-events-none"
                  style={{
                    top: activeScrollPhase === 1 ? '70%' : '18%',
                  }}
                />
              </div>

              {/* Program Phase Cards / Editorial Segments */}
              <div
                ref={narrativeTrackRef}
                className="space-y-12 sm:space-y-16 will-change-transform"
                style={{
                  transform: motionEnabled ? `translate3d(0, -${narrativeOffset}px, 0)` : undefined,
                }}
              >
                {PROGRAM_PHASES.map((phase, idx) => {
                  const isActive = activePhaseIndex === idx || activeScrollPhase === idx;

                  return (
                    <article
                      key={phase.number}
                      onMouseEnter={() => setActivePhaseIndex(idx)}
                      onMouseLeave={() => setActivePhaseIndex(null)}
                      className="group relative transition-colors duration-300"
                      aria-labelledby={`program-phase-${phase.number}-title`}
                    >
                      {/* Datum Coordinate Anchor Point */}
                      <div
                        className={`absolute -left-6 sm:-left-10 top-2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                            isActive
                            ? 'bg-sky-400 border-sky-300 scale-125'
                            : 'bg-[#07090e] border-white/30'
                        }`}
                        aria-hidden="true"
                      />

                      {/* Phase Header & Coordinates */}
                      <header className="mb-4">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono-tech text-xs tracking-[0.2em] mb-2 select-none">
                          <span className="text-sky-400 font-semibold">{phase.number}</span>
                          <span className="text-white/20 text-[10px]" aria-hidden="true">/</span>
                          <span className="text-[#f8fafc] font-medium tracking-[0.25em]">
                            {phase.phaseLabel}
                          </span>
                          <span className="text-white/20 text-[10px]" aria-hidden="true">·</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] tracking-widest uppercase transition-colors duration-200 ${
                              phase.type === 'ONLINE'
                                ? 'bg-sky-950/40 text-sky-400 border border-sky-500/20'
                                : 'bg-white/[0.04] text-slate-300 border border-white/[0.08]'
                            }`}
                          >
                            {phase.type}
                          </span>
                        </div>

                        {/* Schedule & Environment Coordinates */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono-tech text-xs text-slate-400 mb-3">
                          <span className="text-slate-200 font-medium tracking-wide">
                            {phase.dates}
                          </span>
                          <span className="text-white/20 text-[10px]" aria-hidden="true">|</span>
                          <span className="text-slate-400 text-[11px] tracking-wide uppercase">
                            {phase.location}
                          </span>
                        </div>

                        {/* Phase Scope Headline */}
                        <h3
                          id={`program-phase-${phase.number}-title`}
                          className={`text-2xl sm:text-3xl font-bold font-sans tracking-tight transition-colors duration-200 ${
                            isActive ? 'text-white' : 'text-slate-100'
                          }`}
                        >
                          {phase.scopeHeadline}
                        </h3>
                      </header>

                      {/* Editorial Narrative Summary */}
                      <p className="text-sm sm:text-base text-slate-300 font-mono-tech leading-relaxed max-w-2xl font-light mb-6">
                        {phase.editorialNote}
                      </p>

                      {/* Curriculum Focus Vectors */}
                      <div className="mb-6 space-y-2">
                        <div className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-slate-500 select-none">
                          TECHNICAL TRACK FOCUS
                        </div>
                        <ul className="space-y-2 font-mono-tech text-xs text-slate-300" role="list">
                          {phase.curriculumFoci.map((focus) => (
                            <li key={focus} className="flex items-start gap-3">
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-sky-400/70 mt-1.5 shrink-0"
                                aria-hidden="true"
                              />
                              <span className="font-light leading-relaxed">{focus}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Status Row: Scheduled Verification Indicator */}
                      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4 font-mono-tech text-xs select-none">
                        <div className="flex items-center gap-2 text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" aria-hidden="true" />
                          <span className="text-[11px] tracking-wide">{phase.scheduleStatus}</span>
                        </div>

                        <div
                          className={`hidden sm:flex items-center gap-1.5 text-[11px] uppercase tracking-wider transition-colors duration-200 ${
                            isActive ? 'text-sky-400' : 'text-slate-600'
                          }`}
                          aria-hidden="true"
                        >
                          <span>SYLLABUS ARCHIVE</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Separation between Phase 1 and 2 */}
                      {idx === 0 && (
                        <div
                          className="mt-10 pt-4 border-t border-dashed border-white/[0.08] flex items-center gap-3 font-mono-tech text-[11px] text-slate-500 uppercase tracking-widest select-none"
                          aria-hidden="true"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                          <span>INTER-PHASE PROJECT PREPARATION (10 — 25 OCT 2026)</span>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
