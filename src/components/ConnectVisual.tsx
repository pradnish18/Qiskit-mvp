import React from 'react';

interface ConnectVisualProps {
  progress: number; // 0.00 (BUILD complete) to 1.00 (CONNECT complete)
  className?: string;
}

/**
 * ConnectVisual: Continuous Evolutionary State from BUILD into CONNECT.
 *
 * PHILOSOPHY & CONTINUITY:
 * - Frame 0.00 exactly corresponds to the final resting frame of BUILD in BuildVisual:
 *   - The 6 core anchor nodes (c0-c5) at their settled coordinates:
 *     c0: (120, 165), c1: (400, 165), c2: (260, 260),
 *     c3: (120, 355), c4: (400, 355), c5: (260, 75).
 *   - Primary horizontal operational registers (c0->c1, c3->c4) and centroid cross couplers.
 *
 * THE METAPHOR: COMPUTATION -> ECOSYSTEM (COLLABORATION & COMMUNITY)
 * - Single computational object expands outward into a distributed quantum network.
 * - Outward connections branch laterally and diagonally into secondary nodes representing
 *   distributed research, education, cloud execution, and community collaboration.
 * - Restrained nodes: Not hundreds of particles, but an intelligent, balanced constellation
 *   with substantial negative space and clear visual hierarchy.
 * - 3 Depth layers: Foreground (active collaboration paths), Midground (secondary ecosystem nodes),
 *   Background (deep structural network mesh).
 */
export const ConnectVisual: React.FC<ConnectVisualProps> = ({
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

  // 1. CORE ANCHOR NODES (Visual continuity directly from BUILD at p=0.00)
  // As the ecosystem expands, the core registers slightly consolidate toward the center (slight scale)
  // to give breathing room for the peripheral network clusters.
  const coreAnchorBase = [
    { id: 'c0', depth: 'fg', baseX: 120, baseY: 165, targetX: 135, targetY: 175 },
    { id: 'c1', depth: 'mid', baseX: 400, baseY: 165, targetX: 385, targetY: 175 },
    { id: 'c2', depth: 'bg', baseX: 260, baseY: 260, targetX: 260, targetY: 260 }, // Centroid remains stable
    { id: 'c3', depth: 'mid', baseX: 120, baseY: 355, targetX: 135, targetY: 345 },
    { id: 'c4', depth: 'fg', baseX: 400, baseY: 355, targetX: 385, targetY: 345 },
    { id: 'c5', depth: 'bg', baseX: 260, baseY: 75, targetX: 260, targetY: 90 },
  ];

  const coreConsolidationT = getSubProgress(0.15, 0.70);
  const coreNodes = coreAnchorBase.map((node) => ({
    id: node.id,
    depth: node.depth,
    x: node.baseX + (node.targetX - node.baseX) * coreConsolidationT,
    y: node.baseY + (node.targetY - node.baseY) * coreConsolidationT,
  }));

  // 2. SECONDARY DISTRIBUTED ECOSYSTEM NODES
  // These emerge outward from the core execution pathways across specific progress windows:
  // Node e0 (Northwest - Research Cluster): branches from c0
  const e0_T = getSubProgress(0.20, 0.65);
  // Node e1 (Northeast - Cloud Hardware Cluster): branches from c1
  const e1_T = getSubProgress(0.25, 0.70);
  // Node e2 (Southwest - Student & Learning Community): branches from c3
  const e2_T = getSubProgress(0.30, 0.75);
  // Node e3 (Southeast - Developer & Algorithm Ecosystem): branches from c4
  const e3_T = getSubProgress(0.35, 0.80);
  // Node e4 (North Meridian - Global Network Hub): branches from c5
  const e4_T = getSubProgress(0.40, 0.85);
  // Node e5 (South Meridian - Open Synthesis Node): branches down from c2
  const e5_T = getSubProgress(0.45, 0.90);

  // Position coordinates: Emerging outward from the core anchors
  const ecoNodes = [
    {
      id: 'e0',
      depth: 'mid',
      originX: 120,
      originY: 165,
      targetX: 55,
      targetY: 105,
      t: e0_T,
    },
    {
      id: 'e1',
      depth: 'fg',
      originX: 400,
      originY: 165,
      targetX: 465,
      targetY: 115,
      t: e1_T,
    },
    {
      id: 'e2',
      depth: 'fg',
      originX: 120,
      originY: 355,
      targetX: 55,
      targetY: 410,
      t: e2_T,
    },
    {
      id: 'e3',
      depth: 'mid',
      originX: 400,
      originY: 355,
      targetX: 465,
      targetY: 405,
      t: e3_T,
    },
    {
      id: 'e4',
      depth: 'bg',
      originX: 260,
      originY: 75,
      targetX: 260,
      targetY: 35,
      t: e4_T,
    },
    {
      id: 'e5',
      depth: 'bg',
      originX: 260,
      originY: 260,
      targetX: 260,
      targetY: 465,
      t: e5_T,
    },
  ];

  // 3. OUTWARD CONNECTIONS & NETWORK CLUSTERS (Harmonious structural lines)
  // Cross-ecosystem links form as the network reaches maturity (p > 0.55)
  const ringA_T = getSubProgress(0.50, 0.88); // Lateral ecosystem bridge e0 -> e4
  const ringB_T = getSubProgress(0.55, 0.92); // Lateral ecosystem bridge e4 -> e1
  const ringC_T = getSubProgress(0.60, 0.95); // Diagonal network balance e2 -> e5 -> e3

  // Ambient traveling data pulse across the expanded network
  const networkPulse = (p * 2.5) % 1;

  return (
    <div
      className={`relative w-full aspect-[5/6] max-w-[460px] xl:max-w-[540px] flex items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 520 520"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Expansive ecosystem ambient field */}
          <radialGradient id="connect-ambient-field" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.06 + p * 0.08} />
            <stop offset="50%" stopColor="#0f62fe" stopOpacity={0.03 + p * 0.04} />
            <stop offset="100%" stopColor="#07090e" stopOpacity="0" />
          </radialGradient>

          {/* Precision halo for ecosystem nodes */}
          <radialGradient id="connect-halo-highlight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Spatial Field: Expands to encompass the wide ecosystem */}
        <circle cx="260" cy="260" r={220 + p * 30} fill="url(#connect-ambient-field)" />

        {/* ------------------------------------------------------------- */}
        {/* CORE COMPUTATIONAL RUNNERS (Preserved directly from BUILD)     */}
        {/* ------------------------------------------------------------- */}
        {/* Upper Track */}
        <line
          x1={coreNodes[0].x}
          y1={coreNodes[0].y}
          x2={coreNodes[1].x}
          y2={coreNodes[1].y}
          stroke="#38bdf8"
          strokeWidth="1.2"
          opacity={0.7}
          strokeLinecap="round"
        />

        {/* Lower Track */}
        <line
          x1={coreNodes[3].x}
          y1={coreNodes[3].y}
          x2={coreNodes[4].x}
          y2={coreNodes[4].y}
          stroke="#60a5fa"
          strokeWidth="1.2"
          opacity={0.7}
          strokeLinecap="round"
        />

        {/* Vertical Center Datum */}
        <line
          x1={coreNodes[5].x}
          y1={coreNodes[5].y}
          x2={coreNodes[2].x}
          y2={coreNodes[2].y}
          stroke="rgba(56, 189, 248, 0.45)"
          strokeWidth="0.8"
          strokeDasharray="4 4"
        />

        {/* Core Vertical Couplers */}
        <line
          x1={coreNodes[0].x}
          y1={coreNodes[0].y}
          x2={coreNodes[3].x}
          y2={coreNodes[3].y}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="0.8"
        />
        <line
          x1={coreNodes[1].x}
          y1={coreNodes[1].y}
          x2={coreNodes[4].x}
          y2={coreNodes[4].y}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="0.8"
        />

        {/* Central Unitary Diamond in Core (Preserved from BUILD, stabilized) */}
        <g transform={`translate(${coreNodes[2].x}, ${coreNodes[2].y})`}>
          <rect
            x="-11"
            y="-11"
            width="22"
            height="22"
            transform="rotate(45)"
            fill="#07090e"
            stroke="#38bdf8"
            strokeWidth="1"
            opacity={0.9}
          />
          <circle cx="0" cy="0" r="2" fill="#f8fafc" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* OUTWARD BRANCHING CONNECTIONS: Core expanding into Ecosystem  */}
        {/* ------------------------------------------------------------- */}
        {ecoNodes.map((node) => {
          if (node.t <= 0) return null;
          const currX = node.originX + (node.targetX - node.originX) * node.t;
          const currY = node.originY + (node.targetY - node.originY) * node.t;

          return (
            <g key={`branch-${node.id}`}>
              {/* Outward path filament */}
              <line
                x1={node.originX}
                y1={node.originY}
                x2={currX}
                y2={currY}
                stroke="#38bdf8"
                strokeWidth={node.depth === 'fg' ? 1.1 : 0.85}
                opacity={node.t * 0.75}
                strokeDasharray={node.depth === 'bg' ? '3 3' : 'none'}
              />

              {/* Emerging Ecosystem Node */}
              <g
                transform={`translate(${currX}, ${currY}) scale(${0.4 + node.t * 0.6})`}
                opacity={node.t}
              >
                {/* Ambient node glow */}
                <circle cx="0" cy="0" r="14" fill="url(#connect-halo-highlight)" />

                {/* Node Ring */}
                <circle
                  cx="0"
                  cy="0"
                  r={node.depth === 'fg' ? 5 : 4}
                  fill="#07090e"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                />

                {/* Solid Core Point */}
                <circle
                  cx="0"
                  cy="0"
                  r={node.depth === 'fg' ? 2 : 1.5}
                  fill="#f8fafc"
                />
              </g>
            </g>
          );
        })}

        {/* ------------------------------------------------------------- */}
        {/* SECONDARY ECOSYSTEM HARMONIZATION BRIDGES                     */}
        {/* ------------------------------------------------------------- */}
        {/* Top Arc (e0 -> e4 -> e1) */}
        {ringA_T > 0 && (
          <line
            x1={55}
            y1={105}
            x2={260}
            y2={35}
            stroke="#60a5fa"
            strokeWidth="0.8"
            strokeDasharray="2 3"
            opacity={ringA_T * 0.55}
          />
        )}
        {ringB_T > 0 && (
          <line
            x1={260}
            y1={35}
            x2={465}
            y2={115}
            stroke="#60a5fa"
            strokeWidth="0.8"
            strokeDasharray="2 3"
            opacity={ringB_T * 0.55}
          />
        )}

        {/* Bottom Arc (e2 -> e5 -> e3) */}
        {ringC_T > 0 && (
          <>
            <line
              x1={55}
              y1={410}
              x2={260}
              y2={465}
              stroke="#38bdf8"
              strokeWidth="0.8"
              strokeDasharray="2 3"
              opacity={ringC_T * 0.55}
            />
            <line
              x1={260}
              y1={465}
              x2={465}
              y2={405}
              stroke="#38bdf8"
              strokeWidth="0.8"
              strokeDasharray="2 3"
              opacity={ringC_T * 0.55}
            />
          </>
        )}

        {/* ------------------------------------------------------------- */}
        {/* AMBIENT ECOSYSTEM SIGNAL TRACER: Signifying Collaboration     */}
        {/* ------------------------------------------------------------- */}
        {p > 0.55 && (
          <g opacity={(p - 0.55) / 0.45}>
            {/* Outward pulse along northwest branch (c0 to e0) */}
            <circle
              cx={120 + (55 - 120) * networkPulse}
              cy={165 + (105 - 165) * networkPulse}
              r="2"
              fill="#f8fafc"
            />
            {/* Outward pulse along southeast branch (c4 to e3) */}
            <circle
              cx={400 + (465 - 400) * networkPulse}
              cy={355 + (405 - 355) * networkPulse}
              r="2"
              fill="#f8fafc"
            />
          </g>
        )}

        {/* ------------------------------------------------------------- */}
        {/* CORE 6 ANCHORS (Rock-solid continuity from BUILD)             */}
        {/* ------------------------------------------------------------- */}
        {coreNodes.map((node) => (
          <g key={node.id} className="transition-all duration-75 ease-out">
            <circle
              cx={node.x}
              cy={node.y}
              r={node.depth === 'fg' ? 5.5 : 4.5}
              fill="#07090e"
              stroke="#38bdf8"
              strokeWidth="1.25"
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={node.depth === 'fg' ? 2 : 1.5}
              fill="#f8fafc"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};
