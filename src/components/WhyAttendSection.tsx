/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EVENT_IDENTITY } from '../data/eventData';

interface ValuePillar {
  number: string;
  stage: string;
  question: string;
  headline: string;
  description: string;
  audienceFocus: string;
}

const VALUE_PILLARS: ValuePillar[] = [
  {
    number: '01',
    stage: 'LEARN',
    question: 'What can I understand?',
    headline: 'Build Practical Foundations',
    description:
      'Demystify quantum circuits, superposition, and entanglement through structured exploration of Qiskit algorithms and cloud execution.',
    audienceFocus: 'Students & newcomers entering quantum computing',
  },
  {
    number: '02',
    stage: 'BUILD',
    question: 'What can I create?',
    headline: 'Turn Concepts into Executable Code',
    description:
      'Translate quantum theory into real applications. Run quantum circuits on cloud hardware simulators and write functional benchmarks.',
    audienceFocus: 'Developers & researchers testing quantum workloads',
  },
  {
    number: '03',
    stage: 'CONNECT',
    question: 'Who can I collaborate with?',
    headline: 'Engage with the Quantum Community',
    description:
      'Bridge online learning with in-person collaboration at SRM University-AP during Phase II, connecting with peers, mentors, and fellow builders.',
    audienceFocus: 'Collaborators, student teams & quantum enthusiasts',
  },
];

interface WhyAttendSectionProps {
  onRegisterClick?: () => void;
}

export const WhyAttendSection: React.FC<WhyAttendSectionProps> = ({ onRegisterClick }) => {
  const [activeHover, setActiveHover] = useState<number | null>(null);

  return (
    <section
      id="why-attend"
      className="relative w-full bg-[#07090e] text-[#f8fafc] py-24 sm:py-32 border-t border-white/[0.08] overflow-hidden"
      aria-labelledby="why-attend-heading"
    >
      {/* Anchor for in-page navigation compatibility */}
      <span id="highlights" className="sr-only" aria-hidden="true" />
      {/* Background Architectural Datum: Restrained hairline guide */}
      <div
        className="absolute inset-0 pointer-events-none select-none max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-between"
        aria-hidden="true"
      >
        <div className="w-px h-full bg-white/[0.02]" />
        <div className="hidden lg:block w-px h-full bg-white/[0.02]" />
        <div className="w-px h-full bg-white/[0.02]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10">
        {/* Top Section Editorial Header: Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 sm:mb-20">
          {/* Left Column: Eyebrow, Main Heading, Supporting Statement (Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Section Eyebrow */}
            <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.25em] text-sky-400 mb-4 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80" aria-hidden="true" />
              <span>WHY QISKIT FALL FEST</span>
            </div>

            {/* Editorial Headline: High-Contrast Display */}
            <h2
              id="why-attend-heading"
              className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-[-0.035em] text-[#f8fafc] leading-[1.04] font-sans mb-6 max-w-2xl"
            >
              A PLACE TO
              <br />
              LEARN, BUILD,
              <br />
              <span className="text-slate-400 font-normal">AND CONNECT.</span>
            </h2>

            {/* Concise Supporting Statement */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-mono-tech leading-relaxed font-light mb-6">
              Quantum computation is transitioning from isolated laboratory experiments to a collaborative global discipline. At SRM University-AP, Qiskit Fall Fest 2026 bridges foundational inquiry with hands-on development across both online and in-person phases.
            </p>

            {/* Audience Relevance Indicator */}
            <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs text-slate-400 pt-2 select-none">
              <span className="text-slate-500 uppercase tracking-wider">Designed for:</span>
              <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-slate-300">
                Students
              </span>
              <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-slate-300">
                Researchers
              </span>
              <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-slate-300">
                Quantum Developers
              </span>
            </div>
          </div>

          {/* Right Column: Architectural Context & Event Structure Digest (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-start lg:pt-6">
            <div className="p-6 sm:p-8 rounded-lg bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-4 select-none flex items-center justify-between">
                <span>EVENT STRUCTURE</span>
                <span className="text-sky-400 font-semibold">{EVENT_IDENTITY.hostBadge}</span>
              </div>

              <div className="space-y-4">
                {EVENT_IDENTITY.phases.map((phase) => (
                  <div
                    key={phase.phase}
                    className="pb-3 border-b border-white/[0.04] last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
                      <span className="text-[#f8fafc] font-medium">{phase.phase} · {phase.type}</span>
                      <span className="text-sky-400/90">{phase.dates}</span>
                    </div>
                    <p className="text-[11px] font-mono-tech text-slate-400 leading-normal">
                      {phase.type === 'ONLINE'
                        ? 'Foundational workshops, tutorials, and remote cloud quantum workflows.'
                        : `In-person collaboration, hackathon development, and networking at ${EVENT_IDENTITY.location}.`}
                    </p>
                  </div>
                ))}
              </div>

              {onRegisterClick && (
                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={onRegisterClick}
                    className="group inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.15em] text-sky-400 hover:text-white transition-colors duration-200"
                  >
                    <span>JOIN THE COHORT</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Value Pillars: Premium Editorial Rows (No SaaS Cards) */}
        <div className="border-t border-white/[0.12] divide-y divide-white/[0.08]">
          {VALUE_PILLARS.map((pillar, idx) => {
            const isHovered = activeHover === idx;

            return (
              <div
                key={pillar.stage}
                onMouseEnter={() => setActiveHover(idx)}
                onMouseLeave={() => setActiveHover(null)}
                className="group relative py-8 sm:py-10 transition-colors duration-300"
              >
                {/* Active Hairline Accent */}
                <div
                  className={`absolute top-0 left-0 h-px bg-gradient-to-r from-sky-400 to-transparent transition-all duration-500 ease-out ${
                    isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                  {/* Metadata & Stage Identifier (Span 4) */}
                  <div className="md:col-span-4 flex flex-col justify-start">
                    <div className="flex items-center gap-3 font-mono-tech text-xs tracking-[0.2em] mb-2 select-none">
                      <span className="text-slate-500 font-normal">{pillar.number}</span>
                      <span className="text-white/20 text-[10px]" aria-hidden="true">/</span>
                      <span
                        className={`transition-colors duration-300 font-semibold ${
                          isHovered ? 'text-sky-400' : 'text-slate-300'
                        }`}
                      >
                        {pillar.stage}
                      </span>
                    </div>

                    <div className="font-mono-tech text-xs text-sky-400/90 italic tracking-wide">
                      "{pillar.question}"
                    </div>

                    <div className="mt-3 font-mono-tech text-[11px] text-slate-500 tracking-wider uppercase">
                      {pillar.audienceFocus}
                    </div>
                  </div>

                  {/* Core Value Statement & Elaboration (Span 8) */}
                  <div className="md:col-span-8 flex flex-col justify-start">
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3
                        className={`text-xl sm:text-2xl font-bold font-sans tracking-tight transition-colors duration-300 ${
                          isHovered ? 'text-[#f8fafc]' : 'text-slate-200'
                        }`}
                      >
                        {pillar.headline}
                      </h3>

                      <div
                        className={`hidden sm:flex items-center gap-1 font-mono-tech text-xs transition-all duration-300 select-none ${
                          isHovered ? 'text-sky-400 translate-x-1' : 'text-slate-600 opacity-60'
                        }`}
                        aria-hidden="true"
                      >
                        <span className="tracking-widest uppercase text-[10px]">EXPLORE</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-slate-400 font-mono-tech leading-relaxed max-w-3xl">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
