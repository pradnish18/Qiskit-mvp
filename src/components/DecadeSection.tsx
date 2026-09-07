import React, { useRef } from 'react';
import { LearningVisual } from './LearningVisual';
import { NarrativeStateIndex } from './NarrativeStateIndex';
import { useScrollProgress, smoothStep } from '../utils/useScrollProgress';

export const DecadeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(containerRef);

  // Discover fadeout calculation
  const discT = Math.max(0, Math.min(1, (scrollProgress - 0.22) / 0.30));
  const discoverOpacity = 1 - smoothStep(discT);
  const discoverTranslateY = -smoothStep(discT) * 28;

  // Learn fadein calculation
  const learnT = Math.max(0, Math.min(1, (scrollProgress - 0.44) / 0.32));
  const learnOpacity = smoothStep(learnT);
  const learnTranslateY = (1 - smoothStep(learnT)) * 28;

  // Section Exit Behavior:
  // As scroll reaches the end of the section (progress > 0.94),
  // the stage executes a subtle, calm exit translation and scale down for the next section.
  const exitFactor = Math.max(0, (scrollProgress - 0.94) / 0.06);
  const stageScale = 1 - exitFactor * 0.02;
  const stageOpacity = 1 - exitFactor * 0.15;

  return (
    <section
      ref={containerRef}
      id="milestone"
      className="relative min-h-[220vh] bg-[#07090e] border-t border-white/5"
      aria-label="A Decade of Quantum on Cloud: From Discovery to Structured Learning"
    >
      {/* Sticky Viewport Stage: Smooth continuous gliding without scroll hijacking */}
      <div
        className="sticky top-0 h-screen w-full flex items-center overflow-hidden transition-transform duration-75 ease-out"
        style={{
          transform: `scale(${stageScale})`,
          opacity: stageOpacity,
        }}
      >
        {/* Subtle Ambient Grid Background: Restrained, imperceptible texture */}
        <div
          className="absolute inset-0 bg-tech-grid opacity-35 pointer-events-none"
          aria-hidden="true"
        />

        {/* Deep Gradient Transitions for Flawless Cinematic Blending */}
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
            {/* LEFT 55–60%: Narrative Typography Stage (Span 7) */}
            <div className="lg:col-span-7 flex flex-col justify-center select-none">
              {/* Editorial State Indicator */}
              <div className="mb-6 sm:mb-8">
                <NarrativeStateIndex
                  currentStage="01"
                  nextStage="02"
                  transitionProgress={scrollProgress}
                />
              </div>

              {/* Spatial Narrative Text Container: Single-cell grid prevents layout thrashing */}
              <div className="grid grid-cols-1 grid-rows-1 mb-10 sm:mb-12">
                {/* ---------------------------------------------------- */}
                {/* STATE 01: DISCOVER                                   */}
                {/* ---------------------------------------------------- */}
                <div
                  className="col-start-1 row-start-1 flex flex-col justify-start transition-all duration-100 ease-out"
                  style={{
                    opacity: discoverOpacity,
                    transform: `translateY(${discoverTranslateY}px)`,
                    pointerEvents: scrollProgress > 0.5 ? 'none' : 'auto',
                    visibility: discoverOpacity <= 0 ? 'hidden' : 'visible',
                  }}
                  aria-hidden={scrollProgress > 0.5}
                >
                  <div className="text-xs font-mono-tech uppercase tracking-[0.25em] text-slate-400 mb-3">
                    2016 · CLOUD QUANTUM EMERGENCE
                  </div>

                  <h2 className="text-3xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-extrabold tracking-[-0.035em] text-[#f8fafc] leading-[1.02] font-sans mb-5 sm:mb-6 max-w-2xl">
                    AN UNCHARTED
                    <br />
                    COMPUTATIONAL SPACE.
                  </h2>

                  <p className="text-sm sm:text-base text-slate-400 max-w-xl font-mono-tech leading-relaxed">
                    A decade ago, quantum hardware became accessible on the cloud. What began as isolated, exploratory experiments opened an entirely new physical paradigm for computation.
                  </p>
                </div>

                {/* ---------------------------------------------------- */}
                {/* STATE 02: LEARN                                      */}
                {/* ---------------------------------------------------- */}
                <div
                  className="col-start-1 row-start-1 flex flex-col justify-start transition-all duration-100 ease-out"
                  style={{
                    opacity: learnOpacity,
                    transform: `translateY(${learnTranslateY}px)`,
                    pointerEvents: scrollProgress <= 0.45 ? 'none' : 'auto',
                    visibility: learnOpacity <= 0 ? 'hidden' : 'visible',
                  }}
                  aria-hidden={scrollProgress <= 0.45}
                >
                  <div className="text-xs font-mono-tech uppercase tracking-[0.25em] text-sky-400 mb-3">
                    2026 · STRUCTURED UNDERSTANDING
                  </div>

                  <h2 className="text-3xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-extrabold tracking-[-0.035em] text-[#f8fafc] leading-[1.02] font-sans mb-5 sm:mb-6 max-w-2xl">
                    FROM RAW NOISE TO
                    <br />
                    ORDERED ALGORITHMS.
                  </h2>

                  <p className="text-sm sm:text-base text-slate-400 max-w-xl font-mono-tech leading-relaxed">
                    Ten years of foundational development transform abstract states into structured algorithms. Students and researchers at SRM University-AP advance from theoretical inquiry to practical implementation.
                  </p>
                </div>
              </div>

              {/* Minimal Editorial Progress Rail: Sits independently in natural document flow */}
              <div
                className="w-full max-w-xs sm:max-w-sm pt-6 border-t border-white/10 select-none"
                aria-label="Story progress"
              >
                {/* Minimal Single Hairline with Traveling Point (No telemetry percentage) */}
                <div className="relative w-full h-px bg-white/15">
                  {/* Subtle active segment */}
                  <div
                    className="absolute top-0 left-0 h-full bg-sky-400/80 transition-all duration-75 ease-out"
                    style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                  />
                  {/* Active Coordinate Point */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-400 border-2 border-[#07090e] transition-all duration-75 ease-out"
                    style={{ left: `${Math.round(scrollProgress * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT 40–45%: Evolving Continuous Visual Primitive System (Span 5) */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <LearningVisual
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
