import React, { useState, useEffect } from 'react';
import { NAV_ITEMS, EVENT_IDENTITY } from '../data/eventData';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onRegisterClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRegisterClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090e]/95 backdrop-blur-md border-b border-white/10 py-3.5'
          : 'bg-transparent border-b border-white/[0.04] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Desktop Left: Event & Institutional Identity */}
          <a
            href="#"
            className="group flex items-center gap-2 focus-ring text-xs font-mono-tech uppercase tracking-wider"
            aria-label={`${EVENT_IDENTITY.name} - ${EVENT_IDENTITY.institution} Home`}
          >
            <span className="font-semibold text-white group-hover:text-slate-200 transition-colors">
              QISKIT FALL FEST 2026
            </span>
            <span className="text-white/20">/</span>
            <span className="text-slate-400 group-hover:text-white transition-colors">
              SRM UNIVERSITY-AP
            </span>
          </a>

          {/* Desktop Right: Restrained Nav & Action */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono-tech uppercase tracking-widest text-slate-400">
            <nav aria-label="Main Navigation" className="flex items-center gap-7">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="hover:text-white transition-colors py-1 focus-ring"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="#register"
              onClick={(e) => {
                if (onRegisterClick) {
                  e.preventDefault();
                  onRegisterClick();
                }
              }}
              className="inline-flex items-center gap-2 text-white hover:text-sky-300 transition-colors focus-ring pl-4 border-l border-white/15"
            >
              <span>{EVENT_IDENTITY.primaryCTA.label}</span>
              <span className="text-slate-400">→</span>
            </a>
          </div>

          {/* Mobile Action & Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href="#register"
              onClick={(e) => {
                if (onRegisterClick) {
                  e.preventDefault();
                  onRegisterClick();
                }
              }}
              className="px-2.5 py-1 text-xs font-mono-tech uppercase tracking-wider text-white border border-white/20 focus-ring"
            >
              Register
            </a>
            <button
              type="button"
              id="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-400 hover:text-white focus-ring"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 top-[57px] bg-[#07090e]/98 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col justify-between z-40 md:hidden"
        >
          <div className="space-y-6 pt-4">
            <div className="text-xs font-mono-tech uppercase text-slate-400 tracking-wider pb-3 border-b border-white/10">
              Qiskit Fall Fest 2026 · SRM University-AP
            </div>
            <nav className="flex flex-col space-y-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-mono-tech uppercase tracking-wider text-slate-200 hover:text-white py-2 border-b border-white/5 flex items-center justify-between focus-ring"
                >
                  <span>{item.label}</span>
                  <span className="text-slate-400">→</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <p className="text-xs font-mono-tech text-slate-400">
              Phase I: 05—09 Oct · Phase II: 26—30 Oct
            </p>
            <a
              href="#register"
              onClick={() => {
                setMobileMenuOpen(false);
                onRegisterClick?.();
              }}
              className="w-full py-3 text-center text-xs font-mono-tech font-semibold tracking-widest uppercase bg-white text-slate-950 block focus-ring"
            >
              REGISTER →
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

