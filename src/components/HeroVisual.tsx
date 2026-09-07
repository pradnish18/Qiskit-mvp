import React from 'react';
import quantumHardwareImg from '../assets/images/quantum_computer_hero_1788726525195.jpg';

export type QuantumStage = 'discover' | 'learn' | 'build' | 'connect';

interface HeroVisualProps {
  className?: string;
  stage?: QuantumStage;
  scrollProgress?: number; // 0.0 to 1.0 interpolation for downstream scroll transitions
}

/**
 * HeroVisual: Cryogenic Quantum Computing Hardware Visual.
 *
 * Implements Stage 01 - DISCOVER:
 * An authentic, high-precision dilution refrigerator / cryogenic quantum processor system
 * emerging organically from the deep obsidian environment.
 *
 * Visual Treatment:
 * - Unboxed: No borders, no cards, no containers.
 * - Soft edge vignettes & gradient masking on left, bottom, and right for seamless dark canvas immersion.
 * - Micro-cinematic depth and parallax scaling based on scroll progress.
 * - Architectural hairline laser trace & state coordinate overlay prepared for future LEARN/BUILD phases.
 */
export const HeroVisual: React.FC<HeroVisualProps> = ({
  className = '',
  stage = 'discover',
  scrollProgress = 0,
}) => {
  // Micro-motion calculation based on scroll progress:
  // As user starts scrolling down, the hardware experiences subtle vertical parallax and scale reduction
  const translateY = scrollProgress * 28;
  const scale = 1 - scrollProgress * 0.03;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      aria-label="Cryogenic dilution refrigerator quantum computing hardware system at SRM University-AP"
    >
      {/* Visual Canvas Container: 40-45vw proportion with controlled aspect ratio */}
      <div
        className="relative w-full max-w-[480px] xl:max-w-[560px] aspect-[3/4] overflow-hidden"
        style={{
          transform: `translateY(${translateY}px) scale(${scale})`,
          transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* The Dominant Quantum Computer Photograph / Render */}
        <img
          src={quantumHardwareImg}
          alt="Advanced cryogenic quantum computing hardware dilution chandelier"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[0.96]"
          loading="eager"
        />

        {/* Masking & Soft Edge Vignettes: Dissolves hard image edges seamlessly into #07090e */}
        {/* Left Edge Falloff: Prevents harsh boundary facing the typography */}
        <div
          className="absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-[#07090e] via-[#07090e]/75 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        {/* Right Edge Falloff */}
        <div
          className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#07090e] to-transparent pointer-events-none"
          aria-hidden="true"
        />
        {/* Bottom Edge Falloff: Dissolves into the dark background */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-[#07090e] via-[#07090e]/85 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        {/* Top Edge Subtle Atmospheric Falloff */}
        <div
          className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#07090e]/90 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Ambient Dark Obsidian Wash: Controls contrast and ensures metallic tones match the theme */}
        <div
          className="absolute inset-0 bg-radial-vignette pointer-events-none mix-blend-multiply opacity-60"
          aria-hidden="true"
        />

        {/* Stage 01 DISCOVER: Restrained Atmospheric Laser Horizon */}
        {/* Hairline technical depth cue linking the hardware to the computational space */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          {/* Extremely faint cryogenic stage datum line */}
          <div
            className="absolute left-6 right-6 top-[38%] h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
            style={{ opacity: 0.4 - scrollProgress * 0.3 }}
          />
        </div>
      </div>
    </div>
  );
};
