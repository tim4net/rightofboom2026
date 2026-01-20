import React, { useState } from 'react';
import { LayoutGrid } from 'lucide-react';

const Header = ({
  theme: t,
  slides,
  currentSlide,
  setCurrentSlide
}) => {
  const [showTracker, setShowTracker] = useState(false);

  return (
    <header className="p-3 px-6 flex justify-between items-center bg-slate-800/40 backdrop-blur-md border-b border-white/10 z-20 relative">
      <div className="flex items-center gap-3">
        <img
          src="/images/rob-logo-horiz.webp"
          alt="Right of Boom"
          className="h-10 w-auto object-contain"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
      <div className="flex items-center gap-2">
        {/* Tracker toggle button */}
        <button
          onClick={() => setShowTracker(!showTracker)}
          className={`p-1.5 rounded-lg transition-all opacity-30 hover:opacity-100 ${showTracker ? `${t.accentBg}/20 border ${t.accentBorder} opacity-100` : 'bg-black/30 border border-white/10'}`}
          title="P: Toggle progress tracker"
        >
          <LayoutGrid className={`w-3 h-3 ${showTracker ? t.accentColor : 'text-slate-500'}`} />
        </button>

        {/* Progress tracker (hidden by default) */}
        {showTracker && (
          <>
            <div className="hidden lg:flex gap-1 ml-2">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all cursor-pointer hover:opacity-80 ${i === currentSlide ? `${t.accentBg} w-6` : 'bg-slate-700 w-2'
                    }`}
                  onClick={() => setCurrentSlide(i)}
                />
              ))}
            </div>
            <div className={`text-sm font-mono ${t.accentColor} bg-black/50 px-3 py-1.5 rounded-lg border ${t.accentBorder}/30`}>
              {String(currentSlide + 1).padStart(2, '0')} / {slides.length}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
