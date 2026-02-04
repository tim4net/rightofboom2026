import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Footer = ({ theme: t, currentSlide, totalSlides, prevSlide, nextSlide }) => {
  return (
    <footer className="p-4 flex justify-center gap-4 relative z-20">
      <button
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className={`flex items-center justify-center gap-2 w-36 py-3 rounded-xl bg-slate-800/80 border border-slate-700 hover:bg-slate-700 disabled:opacity-20 transition-all font-bold`}
      >
        <ChevronLeft className="w-5 h-5" /> BACK
      </button>
      <button
        onClick={nextSlide}
        disabled={currentSlide === totalSlides - 1}
        className={`flex items-center justify-center gap-2 w-36 py-3 rounded-xl ${t.accentBg} border ${t.accentBorder} hover:brightness-110 disabled:opacity-20 ${t.accentGlow} transition-all font-bold`}
      >
        NEXT <ChevronRight className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
