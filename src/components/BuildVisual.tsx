import React from 'react';

interface BuildVisualProps {
  progress: number; // 0.00 (LEARN complete) to 1.00 (BUILD complete)
  className?: string;
}

/**
 * BuildVisual: Continuous Evolutionary State from LEARN into BUILD.
 *
 * PHILOSOPHY & CONTINUITY:
 * - Frame 0.00 exactly matches the final resting frame of LEARN in LearningVisual:
 *   Same 6 anchor nodes (q0-q5) at their identical coordinates:
 *   q0: (140, 175), q1: (380, 175), q2: (260, 260),
 *   q3: (140, 345), q4: (380, 345), q5: (260, 90).
 *
 * THE METAPHOR: UNDERSTANDING -> CREATION (EXECUTION)
 * - Nodes become stable computational registers / anchors.
 * - Static bus lines stretch into active operational execution tracks.
 * - Controlled gate-like geometric modules (entanglement junctions, phase rotations, and execution nodes)
 *   crystallize onto the pathways with organic staggered easing.
 * - A directional computational flow (active cyan pulse along the primary execution axis) signifies execution.
 * - Zero generic circuit-board or HUD clichés: clean, editorial mathematical precision.
 */
export const BuildVisual: React.FC<BuildVisualProps> = ({
  progress,
  className = '',
}) => {
  const p = Math.max(0, Math.min(1, progress));

  // Organic polynomial smooth-step easing
  const smooth = (t: number) => {
    const clamped = Math.max(0, Math.min(1, t));
    return clamped * clamped * (3 - 2 * clamped);
  };

  // Stagger helper for gradual structural formation
  const getSubProgress = (startT: number, endT: number) => {
    if (p <= startT) return 0;
    if (p >= endT) return 1;
    return smooth((p - startT) / (endT - startT));
  };

  // 1. ANCHOR NODES:
  // Start from EXACT LEARN positions (progress = 0) and gently expand into a wider operational matrix
  const anchorSpecs = [
    {
      id: 'b0',
      depth: 'fg',
      learnX: 140,
      learnY: 175,
      buildX: 120,
      buildY: 165,
    },
    {
      id: 'b1',
      depth: 'mid',
      learnX: 380,
      learnY: 175,
      buildX: 400,
      buildY: 165,
    },
    {
      id: 'b2',
      depth: 'bg',
      learnX: 260,
      learnY: 260,
      buildX: 260,
      buildY: 260, // Equilibrium centroid remains rock-solid
    },
    {
      id: 'b3',
      depth: 'mid',
      learnX: 140,
      learnY: 345,
      buildX: 120,
      buildY: 355,
    },
    {
      id: 'b4',
      depth: 'fg',
      learnX: 380,
      learnY: 345,
      buildX: 400,
      buildY: 355,
    },
    {
      id: 'b5',
      depth: 'bg',
      learnX: 260,
      learnY: 90,
      buildX: 260,
      buildY: 75,
    },
  ];

  // Subtle anchor shift driven by smooth transition (0.0 -> 0.6)
  const anchorShiftT = getSubProgress(0.0, 0.6);
  const currentAnchors = anchorSpecs.map((spec) => ({
    id: spec.id,
    depth: spec.depth,
    x: spec.learnX + (spec.buildX - spec.learnX) * anchorShiftT,
    y: spec.learnY + (spec.buildY - spec.learnY) * anchorShiftT,
  }));

  // 2. PRIMARY OPERATIONAL BUSES:
  // Derived directly from LEARN connections, gaining structural authority as BUILD progresses
  const busA_T = getSubProgress(0.1, 0.55); // Top horizontal track (b0 -> b1)
  const busB_T = getSubProgress(0.15, 0.60); // Bottom horizontal track (b3 -> b4)
  const busC_T = getSubProgress(0.2, 0.65); // Vertical axis (b5 -> b2)
  const busD_T = getSubProgress(0.25, 0.70); // Cross-register links (b0 -> b3, b1 -> b4)

  // 3. COMPUTATIONAL INTERSECTION GATES & OPERATIONAL JUNCTIONS:
  // These are restrained geometric elements (squares/diamonds/crossbars) that emerge along pathways:
  // Gate 1: Phase rotation module on upper bus (between b0 and b1 at x: 210, y: 165)
  const gate1_T = getSubProgress(0.35, 0.75);
  // Gate 2: Entangled controlled-not node on lower bus (between b3 and b4 at x: 310, y: 355)
  const gate2_T = getSubProgress(0.42, 0.82);
  // Gate 3: Central unitary interaction diamond at centroid b2 (x: 260, y: 260)
  const gate3_T = getSubProgress(0.50, 0.90);
  // Gate 4: Transverse computational bridge coupling (x: 210, y: 165 to x: 260, y: 260)
  const bridge1_T = getSubProgress(0.48, 0.88);
  const bridge2_T = getSubProgress(0.54, 0.94);

  // 4. ACTIVE PULSE STREAM:
  // Fluid operational tracer along the upper & lower buses indicating live program execution
  const pulseOffset = (p * 3) % 1;

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
          {/* Subtle computational core glow */}
          <radialGradient id="build-core-field" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.07 + p * 0.08} />
            <stop offset="60%" stopColor="#0f62fe" stopOpacity={0.03 + p * 0.04} />
            <stop offset="100%" stopColor="#07090e" stopOpacity="0" />
          </radialGradient>

          {/* Precision gate node highlight */}
          <radialGradient id="build-gate-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Spatial Field: Expands gently as BUILD completes */}
        <circle cx="260" cy="260" r={220 + p * 15} fill="url(#build-core-field)" />

        {/* ------------------------------------------------------------- */}
        {/* BASE REGISTER RUNNERS: The foundational execution tracks      */}
        {/* ------------------------------------------------------------- */}
        {/* Upper Track: Extended computational wire */}
        <line
          x1={currentAnchors[0].x - 30 * busA_T}
          y1={currentAnchors[0].y}
          x2={currentAnchors[1].x + 30 * busA_T}
          y2={currentAnchors[1].y}
          stroke="#38bdf8"
          strokeWidth={1.2 + p * 0.3}
          opacity={0.65 + p * 0.25}
          strokeLinecap="round"
        />

        {/* Lower Track: Extended computational wire */}
        <line
          x1={currentAnchors[3].x - 30 * busB_T}
          y1={currentAnchors[3].y}
          x2={currentAnchors[4].x + 30 * busB_T}
          y2={currentAnchors[4].y}
          stroke="#60a5fa"
          strokeWidth={1.2 + p * 0.3}
          opacity={0.65 + p * 0.25}
          strokeLinecap="round"
        />

        {/* Vertical Axis Datum */}
        <line
          x1={currentAnchors[5].x}
          y1={currentAnchors[5].y}
          x2={currentAnchors[2].x}
          y2={currentAnchors[2].y}
          stroke="rgba(56, 189, 248, 0.6)"
          strokeWidth={0.9}
          strokeDasharray={p > 0.4 ? '4 4' : 'none'}
        />

        {/* Vertical Register Coupling Couplers */}
        <line
          x1={currentAnchors[0].x}
          y1={currentAnchors[0].y}
          x2={currentAnchors[3].x}
          y2={currentAnchors[3].y}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={0.8}
          opacity={0.5 + busD_T * 0.3}
        />
        <line
          x1={currentAnchors[1].x}
          y1={currentAnchors[1].y}
          x2={currentAnchors[4].x}
          y2={currentAnchors[4].y}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={0.8}
          opacity={0.5 + busD_T * 0.3}
        />

        {/* ------------------------------------------------------------- */}
        {/* COMPUTATIONAL BRIDGES: Reorganized diagonal pathways in BUILD  */}
        {/* ------------------------------------------------------------- */}
        {bridge1_T > 0 && (
          <line
            x1={210}
            y1={currentAnchors[0].y}
            x2={currentAnchors[2].x}
            y2={currentAnchors[2].y}
            stroke="#38bdf8"
            strokeWidth={1}
            opacity={bridge1_T * 0.8}
            strokeDasharray="3 3"
          />
        )}
        {bridge2_T > 0 && (
          <line
            x1={currentAnchors[2].x}
            y1={currentAnchors[2].y}
            x2={310}
            y2={currentAnchors[3].y}
            stroke="#38bdf8"
            strokeWidth={1}
            opacity={bridge2_T * 0.8}
            strokeDasharray="3 3"
          />
        )}

        {/* ------------------------------------------------------------- */}
        {/* GATE-LIKE GEOMETRIC MODULES (Restrained Editorial Precision)  */}
        {/* ------------------------------------------------------------- */}
        {/* Gate 1: Phase Rotation Unit on Upper Track (x: 210) */}
        {gate1_T > 0 && (
          <g
            transform={`translate(210, ${currentAnchors[0].y}) scale(${0.4 + gate1_T * 0.6})`}
            opacity={gate1_T}
          >
            {/* Gate Module Frame */}
            <rect
              x="-12"
              y="-12"
              width="24"
              height="24"
              fill="#07090e"
              stroke="#38bdf8"
              strokeWidth="1.2"
              rx="2"
            />
            {/* Internal Gate Glyph (Minimal geometric phase slash) */}
            <line
              x1="-6"
              y1="6"
              x2="6"
              y2="-6"
              stroke="#f8fafc"
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="1.5" fill="#38bdf8" />
          </g>
        )}

        {/* Gate 2: Controlled Entanglement Target Unit on Lower Track (x: 310) */}
        {gate2_T > 0 && (
          <g
            transform={`translate(310, ${currentAnchors[3].y}) scale(${0.4 + gate2_T * 0.6})`}
            opacity={gate2_T}
          >
            <circle
              cx="0"
              cy="0"
              r="12"
              fill="#07090e"
              stroke="#60a5fa"
              strokeWidth="1.2"
            />
            <line x1="-7" y1="0" x2="7" y2="0" stroke="#f8fafc" strokeWidth="1" />
            <line x1="0" y1="-7" x2="0" y2="7" stroke="#f8fafc" strokeWidth="1" />
          </g>
        )}

        {/* Gate 3: Centroid Unitary Core Diamond (At b2 centroid) */}
        {gate3_T > 0 && (
          <g
            transform={`translate(${currentAnchors[2].x}, ${currentAnchors[2].y}) scale(${0.5 + gate3_T * 0.5})`}
            opacity={gate3_T}
          >
            {/* Soft background pulse */}
            <circle cx="0" cy="0" r="24" fill="url(#build-gate-glow)" />
            {/* Precision Diamond Boundary */}
            <rect
              x="-14"
              y="-14"
              width="28"
              height="28"
              transform="rotate(45)"
              fill="#07090e"
              stroke="#38bdf8"
              strokeWidth="1.2"
            />
            {/* Inner Concentric Diamond */}
            <rect
              x="-7"
              y="-7"
              width="14"
              height="14"
              transform="rotate(45)"
              fill="none"
              stroke="#f8fafc"
              strokeWidth="0.8"
              opacity="0.8"
            />
          </g>
        )}

        {/* Active Execution Packet Tracer (Only visible in active BUILD phase) */}
        {p > 0.45 && (
          <g opacity={(p - 0.45) / 0.55}>
            {/* Upper bus traveling packet */}
            <circle
              cx={currentAnchors[0].x + (currentAnchors[1].x - currentAnchors[0].x) * pulseOffset}
              cy={currentAnchors[0].y}
              r="2.5"
              fill="#f8fafc"
            />
            <circle
              cx={currentAnchors[0].x + (currentAnchors[1].x - currentAnchors[0].x) * pulseOffset}
              cy={currentAnchors[0].y}
              r="6"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.75"
              opacity="0.6"
            />
          </g>
        )}

        {/* ------------------------------------------------------------- */}
        {/* THE 6 CORE ANCHOR NODES (Visual Continuity from LEARN)        */}
        {/* ------------------------------------------------------------- */}
        {currentAnchors.map((node) => {
          const rBase = node.depth === 'fg' ? 5.5 : node.depth === 'mid' ? 4.5 : 3.8;
          const r = rBase * (1 + p * 0.1);

          return (
            <g key={node.id} className="transition-all duration-75 ease-out">
              {/* Outer Glow Halo in BUILD */}
              <circle
                cx={node.x}
                cy={node.y}
                r={r * 2.8}
                fill="url(#build-gate-glow)"
                opacity={0.6 + p * 0.4}
              />

              {/* Node Outer Ring */}
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill="#07090e"
                stroke="#38bdf8"
                strokeWidth="1.25"
              />

              {/* Node Solid Core */}
              <circle
                cx={node.x}
                cy={node.y}
                r={r * 0.4}
                fill="#f8fafc"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
