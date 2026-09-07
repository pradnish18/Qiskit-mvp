import React from 'react';

export type NarrativeStageId = '01' | '02' | '03' | '04';

export interface NarrativeStep {
  id: NarrativeStageId;
  label: string;
}

export const NARRATIVE_STEPS: NarrativeStep[] = [
  { id: '01', label: 'DISCOVER' },
  { id: '02', label: 'LEARN' },
  { id: '03', label: 'BUILD' },
  { id: '04', label: 'CONNECT' },
];

interface NarrativeStateIndexProps {
  currentStage: NarrativeStageId;
  nextStage?: NarrativeStageId;
  transitionProgress?: number; // 0.0 to 1.0 within the section
  maxVisibleStage?: NarrativeStageId; // How much of the narrative is revealed up to this section
}

/**
 * NarrativeStateIndex:
 * Unified 4-chapter narrative progress breadcrumb across the entire cinematic journey.
 * Clean, restrained editorial typography: Plus Jakarta Sans / IBM Plex Mono.
 */
export const NarrativeStateIndex: React.FC<NarrativeStateIndexProps> = ({
  currentStage,
  nextStage,
  transitionProgress = 0,
}) => {
  const isTransitioned = transitionProgress >= 0.5;
  const activeStageId = isTransitioned && nextStage ? nextStage : currentStage;

  return (
    <nav
      className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono-tech text-xs uppercase tracking-[0.2em] select-none"
      aria-label={`Cinematic narrative stage: ${activeStageId} ${
        NARRATIVE_STEPS.find((s) => s.id === activeStageId)?.label
      }`}
    >
      {NARRATIVE_STEPS.map((step, idx) => {
        const isCurrentActive = step.id === activeStageId;
        const isPast = parseInt(step.id, 10) < parseInt(activeStageId, 10);
        const isUpcoming = parseInt(step.id, 10) > parseInt(activeStageId, 10);

        return (
          <React.Fragment key={step.id}>
            {idx > 0 && (
              <span
                className={`text-[10px] ${
                  isPast || isCurrentActive ? 'text-white/20' : 'text-white/10'
                }`}
                aria-hidden="true"
              >
                →
              </span>
            )}
            <span
              className={`transition-colors duration-500 ${
                isCurrentActive
                  ? 'text-sky-400 font-semibold'
                  : isPast
                  ? 'text-slate-400 font-normal'
                  : 'text-slate-600 font-normal'
              }`}
            >
              {step.id} {step.label}
            </span>
          </React.Fragment>
        );
      })}
    </nav>
  );
};
