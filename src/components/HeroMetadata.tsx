import React from 'react';

export const HeroMetadata: React.FC = () => {
  return (
    <div className="w-full max-w-2xl border-t border-white/10 pt-5 mt-2">
      {/* Editorial Date Rail: Hairline & Pure Typography */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
        {/* Phase I: Online */}
        <div className="space-y-1">
          <div className="text-[11px] font-mono-tech text-slate-400 uppercase tracking-widest font-medium">
            PHASE I
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
            05—09 OCT
          </div>
          <div className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider">
            ONLINE · VIRTUAL WORKSHOPS
          </div>
        </div>

        {/* Phase II: On-Campus */}
        <div className="space-y-1">
          <div className="text-[11px] font-mono-tech text-slate-400 uppercase tracking-widest font-medium">
            PHASE II
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
            26—30 OCT
          </div>
          <div className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider">
            ON-CAMPUS · SRM UNIVERSITY-AP
          </div>
        </div>
      </div>
    </div>
  );
};


