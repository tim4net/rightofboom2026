import React from 'react';
import { StickyNote, X } from 'lucide-react';

/**
 * Render notes with basic formatting:
 * - **bold** becomes <strong>
 * - Newlines preserved
 * - → becomes arrow
 */
const formatNotes = (notes) => {
  if (!notes) return null;

  // Split by lines, process each
  return notes.split('\n').map((line, i) => {
    // Replace **text** with bold
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const formatted = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j} className="text-amber-400 font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    return (
      <div key={i} className={line.startsWith('→') || line.startsWith('⏱') || line.startsWith('👁') ? 'text-slate-500 mt-1' : ''}>
        {formatted}
      </div>
    );
  });
};

const PresenterNotes = ({ slide, theme: t, onClose }) => {
  return (
    <div className="presenter-notes fixed bottom-20 right-4 w-[500px] max-h-[400px] bg-black/95 border border-white/20 rounded-xl p-4 z-50 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <StickyNote className={`w-4 h-4 ${t.accentColor}`} />
          <span className={`text-xs font-bold ${t.accentColor} uppercase tracking-wide`}>Presenter Notes</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="text-xs text-slate-300 leading-relaxed overflow-y-auto max-h-[320px] font-mono">
        {slide.notes ? formatNotes(slide.notes) : (
          <span className="text-slate-500 italic">No notes for this slide. Press N to hide.</span>
        )}
      </div>
      <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-slate-600 font-mono">
        N (notes) | T (timer) | R (reset) | ←→ (nav)
      </div>
    </div>
  );
};

export default PresenterNotes;
