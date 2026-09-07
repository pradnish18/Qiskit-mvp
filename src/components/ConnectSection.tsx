import React, { useRef } from 'react';
import { ConnectVisual } from './ConnectVisual';
import { NarrativeStateIndex } from './NarrativeStateIndex';
import { useScrollProgress, smoothStep } from '../utils/useScrollProgress';

export const ConnectSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(containerRef);

  // Spatial typography transitions:
  // BUILD Narrative (Recap state):
  // - Active at entry (progress 0.00 to 0.20).
  // - Gently translates upward (-28px) and fades out between 0.18 and 0.48.
  // CONNECT Narrative (Ecosystem state):
  // - Emerges from below (+28px) starting at 0.38.
  // - Reaches full prominence by 0.70 and holds stable through 0.94.
  const buildT = Math.max(0, Math.min(1, (scrollProgress - 0.18) / 0.30));
  const buildOpacity = 1 - smoothStep(buildT);
  const buildTranslateY = -smoothStep(buildT) * 28;

  const connectT = Math.max(0, Math.min(1, (scrollProgress - 0.38) / 0.32));
  const connectOpacity = smoothStep(connectT);
  const connectTranslateY = (1 - smoothStep(connectT)) * 28;

  // Calm Section Exit:
  // Above 0.94 progress, gently scale down and soften opacity to seamlessly release into
  // the upcoming event program and ecosystem details.
  const exitFactor = Math.max(0, (scrollProgress - 0.94) / 0.06);
  const stageScale = 1 - exitFactor * 0.02;
  const stageOpacity = 1 - exitFactor * 0.15;

  return (
    <section
      ref={containerRef}
      id="connect"
      className="relative min-h-[220vh] bg-[#07090e] border-t border-white/5"
      aria-label="Quantum Ecosystem: From Computation to Connection"
    >
      {/* Anchor for in-page navigation compatibility */}
      <span id="ecosystem" className="sr-only" aria-hidden="true" />
      {/* Sticky Viewport Stage: Smooth continuous scroll-driven experience */}
      <div
        className="sticky top-0 h-screen w-full flex items-center overflow-hidden transition-transform duration-75 ease-out"
        style={{
          transform: `scale(${stageScale})`,
          opacity: stageOpacity,
        }}
      >
        {/* Subtle Ambient Grid Background: Continuity with prior chapters */}
        <div
          className="absolute inset-0 bg-tech-grid opacity-35 pointer-events-none"
          aria-hidden="true"
        />

        {/* Deep Gradient Transitions for Flawless Atmospheric Immersion */}
        <div
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#07090e] to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07090e] to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Main Stage Grid Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* LEFT 50–55%: Narrative Typography Stage (Span 7) */}
            <div className="lg:col-span-7 flex flex-col justify-center select-none">
              {/* Editorial State Index */}
              <div className="mb-6 sm:mb-8">
                <NarrativeStateIndex
                  currentStage="03"
                  nextStage="04"
                  transitionProgress={scrollProgress}
                />
              </div>

              {/* Spatial Narrative Text Container: Single-cell grid prevents layout thrashing */}
              <div className="grid grid-cols-1 grid-rows-1 mb-10 sm:mb-12">
                {/* ---------------------------------------------------- */}
                {/* STATE 03: BUILD (ENTRY RECAP)                        */}
                {/* ---------------------------------------------------- */}
                <div
                  className="col-start-1 row-start-1 flex flex-col justify-start transition-all duration-100 ease-out"
                  style={{
                    opacity: buildOpacity,
                    transform: `translateY(${buildTranslateY}px)`,
                    pointerEvents: scrollProgress > 0.5 ? 'none' : 'auto',
                    visibility: buildOpacity <= 0 ? 'hidden' : 'visible',
                  }}
                  aria-hidden={scrollProgress > 0.5}
                >
                  <div className="text-xs font-mono-tech uppercase tracking-[0.25em] text-slate-400 mb-3">
                    OPERATIONAL ALGORITHMS
                  </div>

                  <h2 className="text-3xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-extrabold tracking-[-0.035em] text-[#f8fafc] leading-[1.02] font-sans mb-5 sm:mb-6 max-w-2xl">
                    EXECUTABLE CODE.
                    <br />
                    READY TO EXPAND.
                  </h2>

                  <p className="text-sm sm:text-base text-slate-400 max-w-xl font-mono-tech leading-relaxed">
                    Algorithmic circuits compile into active hardware executions. What begins as a single computational register now extends outward to connect researchers, educators, and community collaborators.
                  </p>
                </div>

                {/* ---------------------------------------------------- */}
                {/* STATE 04: CONNECT (ECOSYSTEM & COMMUNITY)            */}
                {/* ---------------------------------------------------- */}
                <div
                  className="col-start-1 row-start-1 flex flex-col justify-start transition-all duration-100 ease-out"
                  style={{
                    opacity: connectOpacity,
                    transform: `translateY(${connectTranslateY}px)`,
                    pointerEvents: scrollProgress <= 0.4 ? 'none' : 'auto',
                    visibility: connectOpacity <= 0 ? 'hidden' : 'visible',
                  }}
                  aria-hidden={scrollProgress <= 0.4}
                >
                  <div className="text-xs font-mono-tech uppercase tracking-[0.25em] text-sky-400 mb-3">
                    COMMUNITY · RESEARCH · ECOSYSTEM
                  </div>

                  <h2 className="text-3xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-extrabold tracking-[-0.035em] text-[#f8fafc] leading-[1.02] font-sans mb-5 sm:mb-6 max-w-2xl">
                    FROM COMPUTATION
                    <br />
                    TO CONNECTION.
                  </h2>

                  <p className="text-sm sm:text-base text-slate-400 max-w-xl font-mono-tech leading-relaxed">
                    Quantum technology thrives through open collaboration. At Qiskit Fall Fest 2026, hosted by SRM University-AP as a Partner Plus Host, students, researchers, and global developers unite across online workshops and in-person hackathons to shape the next decade.
                  </p>
                </div>
              </div>

              {/* Minimal Editorial Progress Rail: Independent layout space, never overlaps text */}
              <div
                className="w-full max-w-xs sm:max-w-sm pt-6 border-t border-white/10 select-none"
                aria-label="Connect progression"
              >
                <div className="relative w-full h-px bg-white/15">
                  <div
                    className="absolute top-0 left-0 h-full bg-sky-400/80 transition-all duration-75 ease-out"
                    style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-400 border-2 border-[#07090e] transition-all duration-75 ease-out"
                    style={{ left: `${Math.round(scrollProgress * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT 45–50%: Continuous Evolving Distributed Ecosystem Visual (Span 5) */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <ConnectVisual
                progress={scrollProgress}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
