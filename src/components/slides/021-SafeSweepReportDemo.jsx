import React from 'react';
import { ExternalLink } from 'lucide-react';

/**
 * Safe Sweep Report Demo Slide
 *
 * Shows the actual rendered report from a lab run in an iframe.
 * This is real output from the Rewst workflow running against 3 test endpoints.
 */
const SafeSweepReportDemoSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-8 py-4">
      {/* Minimal Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className={`text-3xl font-bold ${t.textOnPage}`}>
          Live Report Output
        </h2>
        <a
          href="/samples/safe-sweep-report-example.html"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 text-lg ${t.accentColor} hover:underline`}
        >
          Open full report <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Report iframe - takes most of the slide */}
      <div className="flex-1 rounded-xl overflow-hidden border border-slate-600 shadow-2xl bg-white">
        <iframe
          src="/samples/safe-sweep-report-example.html"
          className="w-full h-full"
          title="Safe Sweep Security Report"
          style={{ minHeight: '600px' }}
        />
      </div>

      {/* Footer */}
      <div className="mt-2 flex items-center justify-between">
        <p className="text-lg text-slate-400">
          Real output from lab run: WIN10-ROB, WIN11-ROB, WIN11-FRESH-INS
        </p>
        <a
          href="https://app.rewst.io/organizations/5b3f70a7-566b-4f4f-9232-0ac2ec41e4e6/workflows/019be802-43d7-7ed5-894e-440f1149e4dd"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
          title="Open workflow in Rewst"
        >
          <span className="text-sm text-slate-400">Open in</span>
          <img src="/images/rewst-logo.png" alt="Rewst" className="h-6" />
        </a>
      </div>
    </div>
  );
};

export default SafeSweepReportDemoSlide;
