import React from 'react';

interface LearningVisualProps {
  progress: number; // 0.00 to 1.00 continuously from scroll
  className?: string;
}

/**
 * LearningVisual: Refined Cinematic Quantum Primitive System.
 *
 * PHILOSOPHY:
 * - Pure abstraction: Avoids literal circuit diagrams or generic tech telemetry.
 * - Organic Choreography: Each of the 6 primitive nodes has distinct depth (foreground,
 *   midground, background), distinct travel delay/duration windows, and unique subtle curves.
 * - Multi-layered depth: Nodes at different virtual depths experience subtle scale and opacity variations.
 * - Continuous Reversibility: Fully driven by mathematical interpolation of the scroll progress.
 *
 * STATES:
 * DISCOVER (p = 0.00 - 0.25):
 *   Sparse, uncoupled luminous points adrift in calm obsidian space.
 *
 * TRANSITION (p = 0.25 - 0.75):
 *   Staggered gravitational attraction draws nodes into coherent geometric harmony.
 *   Subtle phase filaments emerge without harsh snapping.
 *
 * LEARN (p = 0.75 - 1.00):
 *   An elegant, balanced structural constellation where relationships and pathways are clear.
 */
export const LearningVisual: React.FC<LearningVisualProps> = ({
  progress,
  className = '',
}) => {
  const p = Math.max(0, Math.min(1, progress));

  // Refined Organic Easing: Slow start, controlled acceleration, soft settling (cubic-bezier like)
  const smoothStep = (t: number) => {
    return t * t * (3 - 2 * t);
  };

  // Node Stagger Function: Each node begins and ends its movement at slightly different progress windows
  const getNodeProgress = (startThreshold: number, endThreshold: number) => {
    if (p <= startThreshold) return 0;
    if (p >= endThreshold) return 1;
    const localT = (p - startThreshold) / (endThreshold - startThreshold);
    return smoothStep(localT);
  };

  // 6 Continuous Quantum Primitives with Spatial Depth & Stagger Windows
  const nodeSpecs = [
    {
      id: 'q0',
      depth: 'fg', // Foreground: larger presence, crisp edge
      scaleFactor: 1.15,
      startT: 0.12,
      endT: 0.72,
      discX: 110,
      discY: 120,
      learnX: 140,
      learnY: 175,
      curveOffset: -16, // Subtle lateral trajectory arc
    },
    {
      id: 'q1',
      depth: 'mid',
      scaleFactor: 1.0,
      startT: 0.18,
      endT: 0.78,
      discX: 430,
      discY: 100,
      learnX: 380,
      learnY: 175,
      curveOffset: 18,
    },
    {
      id: 'q2',
      depth: 'bg', // Background: slightly dimmer, softer halo
      scaleFactor: 0.85,
      startT: 0.25,
      endT: 0.82,
      discX: 65,
      discY: 330,
      learnX: 260,
      learnY: 260,
      curveOffset: -22,
    },
    {
      id: 'q3',
      depth: 'mid',
      scaleFactor: 1.0,
      startT: 0.16,
      endT: 0.76,
      discX: 300,
      discY: 460,
      learnX: 140,
      learnY: 345,
      curveOffset: 20,
    },
    {
      id: 'q4',
      depth: 'fg',
      scaleFactor: 1.15,
      startT: 0.22,
      endT: 0.84,
      discX: 450,
      discY: 380,
      learnX: 380,
      learnY: 345,
      curveOffset: -14,
    },
    {
      id: 'q5',
      depth: 'bg',
      scaleFactor: 0.9,
      startT: 0.08,
      endT: 0.68,
      discX: 255,
      discY: 55,
      learnX: 260,
      learnY: 90,
      curveOffset: 12,
    },
  ];

  // Calculate coordinates with organic arced trajectory
  const currentNodes = nodeSpecs.map((spec) => {
    const nodeT = getNodeProgress(spec.startT, spec.endT);
    // Linear base interpolation
    const baseX = spec.discX + (spec.learnX - spec.discX) * nodeT;
    const baseY = spec.discY + (spec.learnY - spec.discY) * nodeT;
    // Arc displacement (parabolic curve peaking midway through the travel)
    const arc = Math.sin(nodeT * Math.PI) * spec.curveOffset;

    return {
      id: spec.id,
      depth: spec.depth,
      scaleFactor: spec.scaleFactor,
      nodeT,
      x: baseX + arc,
      y: baseY - arc * 0.4,
    };
  });

  // Harmonious Relational Pathways (Organized geometry in LEARN)
  const pathways = [
    // Top register line (q0 -> q1)
    { from: 0, to: 1, startT: 0.38, endT: 0.76, weight: 1.1 },
    // Bottom register line (q3 -> q4)
    { from: 3, to: 4, startT: 0.44, endT: 0.82, weight: 1.1 },
    // Left vertical axis (q0 -> q3)
    { from: 0, to: 3, startT: 0.50, endT: 0.86, weight: 0.9 },
    // Right vertical axis (q1 -> q4)
    { from: 1, to: 4, startT: 0.52, endT: 0.88, weight: 0.9 },
    // Central alignment meridian (q5 -> q2)
    { from: 5, to: 2, startT: 0.34, endT: 0.74, weight: 0.8 },
    // Diagonal state harmonization (q0 -> q2 -> q4)
    { from: 0, to: 2, startT: 0.58, endT: 0.92, weight: 0.75 },
    { from: 2, to: 4, startT: 0.60, endT: 0.94, weight: 0.75 },
  ];

  const getPathwayOpacity = (startT: number, endT: number) => {
    if (p <= startT) return 0;
    if (p >= endT) return 0.75;
    return smoothStep((p - startT) / (endT - startT)) * 0.75;
  };

  return (
    <div
      className={`relative w-full aspect-[5/6] max-w-[460px] xl:max-w-[520px] flex items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 520 520"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle cohesive halo for organized LEARN state */}
          <radialGradient id="halo-learn-field" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.08 * p} />
            <stop offset="60%" stopColor="#0f62fe" stopOpacity={0.03 * p} />
            <stop offset="100%" stopColor="#07090e" stopOpacity="0" />
          </radialGradient>

          {/* Node halo highlight: restrained, no neon flash */}
          <radialGradient id="node-highlight-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Cohesion Field: Deep, soft atmosphere that emerges gradually */}
        <circle cx="260" cy="260" r="220" fill="url(#halo-learn-field)" />

        {/* Dynamic Structural Relationships */}
        {pathways.map((path, idx) => {
          const nodeA = currentNodes[path.from];
          const nodeB = currentNodes[path.to];
          const opacity = getPathwayOpacity(path.startT, path.endT);

          if (opacity <= 0) return null;

          return (
            <line
              key={`path-${idx}`}
              x1={nodeA.x}
              y1={nodeA.y}
              x2={nodeB.x}
              y2={nodeB.y}
              stroke={idx % 2 === 0 ? '#38bdf8' : '#60a5fa'}
              strokeWidth={path.weight}
              opacity={opacity}
              strokeLinecap="round"
            />
          );
        })}

        {/* 6 Visual Primitives Rendered with Depth & Choreographed Motion */}
        {currentNodes.map((node) => {
          // Node visual characteristics based on depth and progress
          const isAnchoredInLearn = p > 0.75;
          const rBase = node.depth === 'fg' ? 5 : node.depth === 'mid' ? 4 : 3.2;
          const r = rBase * (1 + p * 0.15);

          return (
            <g key={node.id} className="transition-all duration-75 ease-out">
              {/* Soft halo when settled in LEARN */}
              {isAnchoredInLearn && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={r * 3.2}
                  fill="url(#node-highlight-grad)"
                />
              )}

              {/* Node Outer Ring: Crisp, technical line */}
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill="#07090e"
                stroke={
                  isAnchoredInLearn
                    ? 'rgba(56, 189, 248, 0.9)'
                    : 'rgba(248, 250, 252, 0.35)'
                }
                strokeWidth={isAnchoredInLearn ? 1.25 : 0.85}
              />

              {/* Solid Core Point */}
              <circle
                cx={node.x}
                cy={node.y}
                r={r * 0.4}
                fill={isAnchoredInLearn ? '#f8fafc' : '#cbd5e1'}
              />
            </g>
          );
        })}

        {/* Central Equilibrium Coordinate in LEARN (Abstract, minimal, no complex telemetry) */}
        {p > 0.65 && (
          <circle
            cx="260"
            cy="260"
            r="16"
            fill="none"
            stroke="rgba(56, 189, 248, 0.2)"
            strokeWidth="0.75"
            strokeDasharray="2 4"
            opacity={smoothStep((p - 0.65) / 0.35)}
          />
        )}
      </svg>
    </div>
  );
};
