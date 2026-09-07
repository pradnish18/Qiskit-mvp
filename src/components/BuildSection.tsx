import React, { useRef } from 'react';
import { BuildVisual } from './BuildVisual';
import { NarrativeStateIndex } from './NarrativeStateIndex';
import { useScrollProgress, smoothStep } from '../utils/useScrollProgress';

export const BuildSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(containerRef);

  // Spatial typography transitions:
  // LEARN Narrative (Recap state):
  // - Active at entry (progress 0.00 to 0.25).
  // - Gently translates upward and fades out between 0.22 and 0.52.
  // BUILD Narrative (Creation state):
  // - Emerges from below (+28px) starting at 0.42.
  // - Reaches full prominence by 0.72 and holds stable through 1.00.
  const learnT = Math.max(0, Math.min(1, (scrollProgress - 0.20) / 0.32));
  const learnOpacity = 1 - smoothStep(learnT);
  const learnTranslateY = -smoothStep(learnT) * 28;

  const buildT = Math.max(0, Math.min(1, (scrollProgress - 0.40) / 0.32));
  const buildOpacity = smoothStep(buildT);
  const buildTranslateY = (1 - smoothStep(buildT)) * 28;

  return (
    <section
      ref={containerRef}
      id="build"
      className="relative min-h-[220vh] bg-[#07090e] border-t border-white/5"
      aria-label="Quantum Execution: From Structured Understanding to Creation"
    >
      {/* Sticky Viewport Stage: Smooth continuous scroll-driven experience */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        {/* Subtle Ambient Grid Background: Preserves unbroken texture from DecadeSection */}
        <div
          className="absolute inset-0 bg-tech-grid opacity-35 pointer-events-none"
          aria-hidden="true"
        />

        {/* Deep Gradient Transitions for Seamless Atmospheric Immersion */}
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
                  currentStage="02"
                  nextStage="03"
                  transitionProgress={scrollProgress}
                />
              </div>

              {/* Spatial Narrative Text Container: Single-cell grid prevents layout shifts */}
              <div className="grid grid-cols-1 grid-rows-1 mb-10 sm:mb-12">
                {/* ---------------------------------------------------- */}
                {/* STATE 02: LEARN (ENTRY RECAP)                        */}
                {/* ---------------------------------------------------- */}
                <div
                  className="col-start-1 row-start-1 flex flex-col justify-start transition-all duration-100 ease-out"
                  style={{
                    opacity: learnOpacity,
                    transform: `translateY(${learnTranslateY}px)`,
                    pointerEvents: scrollProgress > 0.5 ? 'none' : 'auto',
                    visibility: learnOpacity <= 0 ? 'hidden' : 'visible',
                  }}
                  aria-hidden={scrollProgress > 0.5}
                >
                  <div className="text-xs font-mono-tech uppercase tracking-[0.25em] text-slate-400 mb-3">
                    FOUNDATION ESTABLISHED
                  </div>

                  <h2 className="text-3xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-extrabold tracking-[-0.035em] text-[#f8fafc] leading-[1.02] font-sans mb-5 sm:mb-6 max-w-2xl">
                    ORDERED PRINCIPLES.
                    <br />
                    READY FOR SYNTHESIS.
                  </h2>

                  <p className="text-sm sm:text-base text-slate-400 max-w-xl font-mono-tech leading-relaxed">
                    Theoretical comprehension solidifies into reliable foundations. The quantum computational register is now primed to transition from passive observation to active program execution.
                  </p>
                </div>

                {/* ---------------------------------------------------- */}
                {/* STATE 03: BUILD (CREATION & EXECUTION)              */}
                {/* ---------------------------------------------------- */}
                <div
                  className="col-start-1 row-start-1 flex flex-col justify-start transition-all duration-100 ease-out"
                  style={{
                    opacity: buildOpacity,
                    transform: `translateY(${buildTranslateY}px)`,
                    pointerEvents: scrollProgress <= 0.4 ? 'none' : 'auto',
                    visibility: buildOpacity <= 0 ? 'hidden' : 'visible',
                  }}
                  aria-hidden={scrollProgress <= 0.4}
                >
                  <div className="text-xs font-mono-tech uppercase tracking-[0.25em] text-sky-400 mb-3">
                    EXECUTION · SYNTHESIS · CODE
                  </div>

                  <h2 className="text-3xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-extrabold tracking-[-0.035em] text-[#f8fafc] leading-[1.02] font-sans mb-5 sm:mb-6 max-w-2xl">
                    FROM UNDERSTANDING
                    <br />
                    TO CREATION.
                  </h2>

                  <p className="text-sm sm:text-base text-slate-400 max-w-xl font-mono-tech leading-relaxed">
                    Abstract states become operational algorithms. At Qiskit Fall Fest 2026, students and researchers compose unitary operations, construct entangling gates, and deploy executable quantum software onto real cloud hardware.
                  </p>
                </div>
              </div>

              {/* Minimal Editorial Progress Rail: Independent layout space, never overlaps text */}
              <div
                className="w-full max-w-xs sm:max-w-sm pt-6 border-t border-white/10 select-none"
                aria-label="Build progression"
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

            {/* RIGHT 45–50%: Continuous Evolving Computational Visual (Span 5) */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <BuildVisual
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
