import React from 'react';
import { EVENT_IDENTITY } from '../data/eventData';
import { ArrowRight } from 'lucide-react';

interface HeroActionsProps {
  onRegisterClick?: () => void;
  onExploreClick?: () => void;
}

export const HeroActions: React.FC<HeroActionsProps> = ({
  onRegisterClick,
  onExploreClick,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-3">
      {/* Primary Call to Action: Sharp Rectangular Editorial Button */}
      <a
        href="#register"
        onClick={(e) => {
          if (onRegisterClick) {
            e.preventDefault();
            onRegisterClick();
          }
        }}
        className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#f8fafc] hover:bg-white text-slate-950 font-mono-tech text-xs font-semibold tracking-widest uppercase transition-all duration-150 active:scale-[0.98] focus-ring"
      >
        <span>{EVENT_IDENTITY.primaryCTA.label}</span>
        <ArrowRight
          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </a>

      {/* Secondary Call to Action: Minimal Editorial Text Link */}
      <a
        href="#program"
        onClick={(e) => {
          if (onExploreClick) {
            e.preventDefault();
            onExploreClick();
          }
        }}
        className="group inline-flex items-center gap-2 text-slate-400 hover:text-white font-mono-tech text-xs font-medium tracking-widest uppercase transition-colors duration-150 focus-ring py-2"
      >
        <span className="border-b border-white/20 group-hover:border-white pb-0.5 transition-colors">
          {EVENT_IDENTITY.secondaryCTA.label}
        </span>
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      </a>
    </div>
  );
};


