import React from 'react';
import { Video } from 'lucide-react';

const VideoFallbackOverlay = ({ slide, theme: t, onClose }) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
      <div className="text-center max-w-2xl mx-auto p-8">
        <div className="mb-8 w-32 h-32 rounded-full bg-purple-600/20 border-2 border-purple-500 flex items-center justify-center mx-auto">
          <Video className="w-16 h-16 text-purple-400" />
        </div>
        <h2 className="text-4xl font-black mb-4 text-white">Video Fallback Active</h2>
        <p className="text-xl text-slate-400 mb-8">
          Pre-recorded backup for: <span className={`${t.accentColor} font-bold`}>{slide.title}</span>
        </p>
        <div className={`${t.cardBg} p-6 rounded-xl border ${t.cardBorder} mb-8`}>
          <p className="text-slate-500 font-mono text-sm mb-4">[PRESENTER: Play video from backup folder]</p>
          <code className="text-sm text-slate-400 bg-black/50 px-3 py-1 rounded">
            /backups/demos/{slide.type}.mp4
          </code>
        </div>
        <button
          onClick={onClose}
          className={`px-6 py-3 ${t.accentBg} rounded-xl font-bold hover:brightness-110 transition-all`}
        >
          Return to Live Demo (V)
        </button>
      </div>
    </div>
  );
};

export default VideoFallbackOverlay;
