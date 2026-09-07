import React, { useEffect, useRef } from 'react';
import { EVENT_IDENTITY } from '../data/eventData';
import { X, ShieldCheck, Calendar, Bell, CheckCircle2 } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Trap focus & handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-xl bg-[#0d121c] border border-white/15 p-6 sm:p-8 text-left shadow-2xl shadow-black/80 focus-ring"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/10 focus-ring"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-sky-400">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Official Host Registration Protocol</span>
          </div>

          <div>
            <h2 id="modal-title" className="text-2xl font-bold tracking-tight text-white">
              {EVENT_IDENTITY.name}
            </h2>
            <p className="text-sm font-mono-tech text-slate-400 mt-1">
              SRM University-AP, Amaravati · Partner Plus Host
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              Official delegate and participant registration for the 2026 edition opens in accordance with institutional guidelines. Participation is partitioned into two distinct operational phases:
            </p>

            <div className="space-y-2 pt-1">
              {EVENT_IDENTITY.phases.map((p) => (
                <div
                  key={p.phase}
                  className="flex items-start gap-3 p-3 rounded-lg bg-black/40 border border-white/10"
                >
                  <Calendar className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                  <div className="text-xs font-mono-tech">
                    <span className="font-semibold text-white">
                      {p.phase} ({p.type}): {p.dates}
                    </span>
                    <p className="text-slate-400 mt-0.5">
                      {p.type === 'ONLINE'
                        ? 'Global virtual access for foundational workshops & technical sessions'
                        : 'On-campus collaborative development & technical sessions at SRM University-AP'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-blue-950/30 border border-blue-500/20 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-relaxed">
              Registration portals will activate prior to the Online Phase. Check back here or coordinate with the SRM University-AP Website & Technology Cell.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono-tech uppercase tracking-wider font-semibold focus-ring"
            >
              Acknowledged
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
