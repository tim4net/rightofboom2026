import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Zap, User } from 'lucide-react';

/**
 * Sandwich Example Slide
 * Shows all 3 layers of the guardrail sandwich in action
 * Side-by-side: approved vs rejected through the full pipeline
 */
const SandwichExampleSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className={`text-5xl font-bold ${t.textOnPage} mb-2`}>
          The Sandwich in Action
        </h2>
        <p className="text-2xl text-slate-400">
          Same source, valid input — different outcomes
        </p>
      </div>

      {/* Main content - side by side comparison */}
      <div className="flex-1 flex gap-6 items-stretch justify-center max-w-6xl mx-auto w-full">

        {/* APPROVED Card */}
        <div className="flex-1">
          <div
            className="h-full rounded-2xl border-4 border-emerald-500/60 p-6 flex flex-col"
            style={{
              background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 78, 59, 0.2) 100%)'
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-9 h-9 text-emerald-400" />
              <span className="text-3xl font-bold text-emerald-400">APPROVED</span>
            </div>

            {/* 3 Layers */}
            <div className="space-y-3 flex-1">
              {/* INPUT */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-amber-400" />
                  <span className="text-xl font-bold text-amber-400">INPUT</span>
                </div>
                <div className="text-lg text-slate-300 pl-7">
                  Sentinel: "Cobalt Strike beacon on WKS-042"
                </div>
              </div>

              {/* AI */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <span className="text-xl font-bold text-purple-400">AI</span>
                </div>
                <div className="text-lg text-slate-300 pl-7">
                  Decision: <span className="font-mono text-emerald-400">"isolate_endpoint"</span>
                  <span className="text-slate-400 ml-2">(92%)</span>
                </div>
              </div>

              {/* OUTPUT */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-amber-400" />
                  <span className="text-xl font-bold text-amber-400">OUTPUT</span>
                </div>
                <div className="text-lg text-slate-300 pl-7">
                  On allowlist, 92% ≥ 80% threshold
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="mt-4 pt-4 border-t-2 border-emerald-500/30">
              <div className="flex items-center gap-3">
                <Zap className="w-9 h-9 text-emerald-400" />
                <div>
                  <div className="text-2xl font-bold text-emerald-400">AUTO-EXECUTE</div>
                  <div className="text-lg text-emerald-400/70">No human needed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* REJECTED Card */}
        <div className="flex-1">
          <div
            className="h-full rounded-2xl border-4 border-red-500/60 p-6 flex flex-col"
            style={{
              background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.15) 0%, rgba(127, 29, 29, 0.2) 100%)'
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-9 h-9 text-red-400" />
              <span className="text-3xl font-bold text-red-400">REJECTED</span>
            </div>

            {/* 3 Layers */}
            <div className="space-y-3 flex-1">
              {/* INPUT */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-amber-400" />
                  <span className="text-xl font-bold text-amber-400">INPUT</span>
                </div>
                <div className="text-lg text-slate-300 pl-7">
                  EDR: "Ransomware indicators on FILESRV01"
                </div>
              </div>

              {/* AI */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <span className="text-xl font-bold text-purple-400">AI</span>
                </div>
                <div className="text-lg text-slate-300 pl-7">
                  Decision: <span className="font-mono text-amber-400">"shutdown_server"</span>
                  <span className="text-slate-400 ml-2">(73%)</span>
                </div>
              </div>

              {/* OUTPUT */}
              <div className="bg-red-500/20 border-2 border-red-500/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-xl font-bold text-red-400">OUTPUT</span>
                </div>
                <div className="text-lg text-red-300 pl-7 font-medium">
                  Critical asset requires ≥95%
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="mt-4 pt-4 border-t-2 border-amber-500/30">
              <div className="flex items-center gap-3">
                <User className="w-9 h-9 text-amber-400" />
                <div>
                  <div className="text-2xl font-bold text-amber-400">HUMAN REVIEW</div>
                  <div className="text-lg text-amber-400/70">Analyst approval required</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="text-center mt-5">
        <p className="text-2xl font-medium text-slate-300">
          Same framework, different thresholds.
          <span className="text-amber-400 font-bold"> Higher stakes = higher bar.</span>
        </p>
      </div>
    </div>
  );
};

export default SandwichExampleSlide;
