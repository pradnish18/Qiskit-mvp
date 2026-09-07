import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { HeroMetadata } from './HeroMetadata';
import { HeroActions } from './HeroActions';
import { HeroVisual } from './HeroVisual';

interface HeroSectionProps {
  onRegisterClick?: () => void;
  onExploreClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onExploreClick,
}) => {
  // Track scroll progress for smooth transition toward LEARN stage
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const ratio = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      setScrollRatio(ratio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Choreographed Cinematic Entrance:
  // 0.15s Event Identity, 0.25s-0.45s Headline lines, 0.60s Dates, 0.70s CTA, 0.75s Quantum Hardware Visual (settles by 0.95s)
  const lineReveal = (delay: number) => ({
    hidden: { y: '105%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay,
      },
    },
  });

  const fadeItem = (delay: number) => ({
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        delay,
      },
    },
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-20 flex flex-col justify-center bg-[#07090e] bg-tech-grid overflow-hidden selection:bg-blue-600 selection:text-white"
      aria-labelledby="hero-heading"
    >
      {/* Main Two-Part Visual Composition Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT 55–60%: Typography + Event Information (Span 7 on lg/xl) */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center z-10">
            {/* Step 1: Event Identity & Institutional Authority (0.10s) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeItem(0.1)}
              className="space-y-1.5 mb-6 sm:mb-8"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-mono-tech uppercase tracking-widest text-slate-400">
                <span className="text-white font-semibold">QISKIT FALL FEST 2026</span>
                <span className="text-white/20">/</span>
                <span className="text-slate-200">SRM UNIVERSITY-AP · AMARAVATI</span>
              </div>
              <div className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-sky-400 font-medium">
                PARTNER PLUS HOST
              </div>
            </motion.div>

            {/* Step 2: Main Headline - Solid Off-White, Single Typographic Family, Fluid Scale (0.25s - 0.45s) */}
            <h1
              id="hero-heading"
              className="text-[42px] sm:text-[64px] lg:text-[76px] xl:text-[88px] font-extrabold tracking-[-0.035em] text-[#f8fafc] leading-[0.98] font-sans mb-8 sm:mb-10 select-none"
              style={{
                opacity: 1 - scrollRatio * 0.6,
              }}
            >
              {/* Line 1: A DECADE OF */}
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial="hidden"
                  animate="visible"
                  variants={lineReveal(0.25)}
                  className="block text-2xl sm:text-3xl lg:text-[42px] xl:text-[48px] font-light text-slate-300 tracking-[-0.01em] mb-1 sm:mb-2 font-sans"
                >
                  A DECADE OF
                </motion.span>
              </span>

              {/* Line 2: QUANTUM */}
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial="hidden"
                  animate="visible"
                  variants={lineReveal(0.35)}
                  className="block text-[#f8fafc]"
                >
                  QUANTUM
                </motion.span>
              </span>

              {/* Line 3: ON CLOUD. */}
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial="hidden"
                  animate="visible"
                  variants={lineReveal(0.45)}
                  className="block text-[#f8fafc]"
                >
                  ON CLOUD.
                </motion.span>
              </span>
            </h1>

            {/* Mobile Visual Preview: Deliberately positioned between typography and dates */}
            <div className="block lg:hidden my-6 -mx-2 flex items-center justify-center max-h-[320px] overflow-hidden">
              <HeroVisual className="w-full max-w-[340px]" scrollProgress={scrollRatio} />
            </div>

            {/* Step 3: Verified Dates (0.60s) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeItem(0.60)}
            >
              <HeroMetadata />
            </motion.div>

            {/* Step 4: Action Baseline (0.70s) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeItem(0.70)}
            >
              <HeroActions
                onRegisterClick={onRegisterClick}
                onExploreClick={onExploreClick}
              />
            </motion.div>
          </div>

          {/* RIGHT 40–45%: Cryogenic Quantum Hardware Visual (Span 5 on lg/xl, reveal at 0.75s, settles by 0.95s) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 items-center justify-end relative select-none">
            <motion.div
              initial={{ opacity: 0, x: 24, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
              className="w-full max-w-[480px] xl:max-w-[560px]"
              style={{
                opacity: 1 - scrollRatio * 0.45,
              }}
            >
              <HeroVisual scrollProgress={scrollRatio} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};


