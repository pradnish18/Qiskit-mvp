/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { EVENT_IDENTITY, NAV_ITEMS } from '../data/eventData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="colophon"
      className="relative w-full bg-[#07090e] text-[#f8fafc] pt-16 sm:pt-20 pb-16 sm:pb-20 border-t border-white/[0.06] overflow-hidden"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Colophon and Event Information
      </h2>

      {/* Subtle Background Architectural Datum Guide */}
      <div
        className="absolute inset-0 pointer-events-none select-none max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-between"
        aria-hidden="true"
      >
        <div className="w-px h-full bg-white/[0.02]" />
        <div className="hidden lg:block w-px h-full bg-white/[0.02]" />
        <div className="w-px h-full bg-white/[0.02]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10">
        {/* Main Editorial Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Institutional Identification & Identity (Span 6) */}
          <div className="md:col-span-6 flex flex-col justify-start">
            {/* Host Recognition Badge */}
            <div className="flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-[0.25em] text-sky-400 mb-4 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80" aria-hidden="true" />
              <span>{EVENT_IDENTITY.hostBadge}</span>
            </div>

            {/* Event Name */}
            <div className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-2">
              {EVENT_IDENTITY.name}
            </div>

            {/* Host Institution & Campus Location */}
            <div className="font-mono-tech text-xs sm:text-sm text-slate-300 font-medium tracking-wide mb-3">
              {EVENT_IDENTITY.institution} · {EVENT_IDENTITY.location}
            </div>

            {/* Milestone Theme Reference */}
            <p className="font-mono-tech text-xs text-slate-400 leading-relaxed font-light max-w-md mb-6">
              {EVENT_IDENTITY.milestoneTheme}. {EVENT_IDENTITY.milestoneDetail}.
            </p>

            {/* Institutional Coordinates */}
            <div className="flex items-center gap-3 font-mono-tech text-[11px] text-slate-500 uppercase tracking-wider select-none">
              <span>CAMPUS: AMARAVATI, AP</span>
              <span className="text-white/20" aria-hidden="true">/</span>
              <span>HOST STATUS: PARTNER PLUS</span>
            </div>
          </div>

          {/* Right Column: Event Structure & Navigation Anchors (Span 6) */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Event Phases Column */}
            <div>
              <div className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-slate-400 font-semibold mb-4 select-none">
                EVENT
              </div>

              <div className="space-y-4 font-mono-tech text-xs">
                {/* Phase I */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sky-400 font-medium tracking-wider">01 / PHASE I</span>
                    <span className="text-white/20 text-[10px]" aria-hidden="true">·</span>
                    <span className="text-slate-400 uppercase text-[11px]">{EVENT_IDENTITY.phases[0].type}</span>
                  </div>
                  <div className="text-slate-200 font-medium tracking-wide">
                    {EVENT_IDENTITY.phases[0].dates}
                  </div>
                  <div className="text-slate-500 text-[11px] font-light">
                    Virtual Foundations
                  </div>
                </div>

                {/* Phase II */}
                <div className="space-y-1 pt-2 border-t border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <span className="text-sky-400 font-medium tracking-wider">02 / PHASE II</span>
                    <span className="text-white/20 text-[10px]" aria-hidden="true">·</span>
                    <span className="text-slate-400 uppercase text-[11px]">ON-CAMPUS</span>
                  </div>
                  <div className="text-slate-200 font-medium tracking-wide">
                    {EVENT_IDENTITY.phases[1].dates}
                  </div>
                  <div className="text-slate-500 text-[11px] font-light">
                    {EVENT_IDENTITY.institution}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Anchors & Colophon Meta */}
            <div>
              <div className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-slate-400 font-semibold mb-4 select-none">
                NAVIGATION
              </div>

              <nav aria-label="Footer in-page navigation" className="space-y-2 mb-6">
                <ul className="space-y-2 font-mono-tech text-xs" role="list">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        className="text-slate-400 hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5 focus-ring rounded"
                      >
                        <span className="text-slate-600 text-[10px]" aria-hidden="true">/</span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#registration"
                      className="text-sky-400 hover:text-sky-300 transition-colors duration-150 inline-flex items-center gap-1.5 focus-ring rounded"
                    >
                      <span className="text-sky-600 text-[10px]" aria-hidden="true">/</span>
                      <span>Registration</span>
                    </a>
                  </li>
                </ul>
              </nav>

              {/* Back to Top Trigger */}
              <button
                type="button"
                onClick={scrollToTop}
                className="group inline-flex items-center gap-2 font-mono-tech text-xs text-slate-400 hover:text-white transition-colors duration-150 focus-ring rounded select-none"
                aria-label="Scroll back to top of page"
              >
                <span>BACK TO TOP</span>
                <ArrowUp className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-y-0.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Closing Horizon Datum */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-baseline justify-between gap-4 font-mono-tech text-xs text-slate-500 select-none">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© 2026 SRM UNIVERSITY-AP</span>
            <span className="text-white/20" aria-hidden="true">·</span>
            <span>QISKIT FALL FEST 2026</span>
          </div>

          <div className="text-[11px] text-slate-500 tracking-wider">
            IBM QUANTUM & QISKIT COMMUNITY INITIATIVE
          </div>
        </div>
      </div>
    </footer>
  );
};
