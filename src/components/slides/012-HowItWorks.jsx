import React from 'react';
import { ArrowDown, Clock, Database, Brain, Bell, RefreshCw } from 'lucide-react';
import { CrateBadge } from '../ui/CrateBadge';

/**
 * CA Policy Monitor - How It Works (with Sandwich Mapping)
 *
 * Combined slide showing the technical flow AND how it maps to the guardrail sandwich.
 * Outline boxes group steps into INPUT (deterministic), AI (probabilistic), OUTPUT (deterministic).
 */
export const M365ConfigDriftDemo = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <CrateBadge name="CA Policy Monitor" variant="compact" />
        <h2 className={`text-5xl font-bold ${t.textOnPage}`}>
          How It Works
        </h2>
      </div>

      {/* Main Flow - Three distinct sections with arrows */}
      <div className="flex-1 flex flex-col gap-3">

        {/* ═══ INPUT GUARDRAIL ═══ */}
        <div className="relative border-2 border-dashed border-amber-500/60 rounded-2xl px-8 py-6 flex-[3]">
          <div className="absolute -top-4 left-8 px-4 bg-slate-900">
            <span className="text-lg font-bold text-amber-400 uppercase tracking-wider">Input Guardrail</span>
            <span className="text-lg text-amber-400/50 ml-3 font-medium">deterministic</span>
          </div>

          <div className="h-full flex flex-col justify-between pt-2">
            {/* TRIGGER */}
            <div className="flex items-center gap-6">
              <span className="text-2xl font-black text-emerald-400 w-12">1</span>
              <div className="flex-1 bg-emerald-500/15 border border-emerald-500/50 rounded-xl px-6 py-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-emerald-400">TRIGGER</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 px-5 py-2 bg-slate-800/80 rounded-lg">
                    <Clock className="w-6 h-6 text-slate-400" />
                    <span className="text-xl text-slate-300">Schedule</span>
                  </div>
                  <span className="text-2xl text-slate-600 font-bold">/</span>
                  <div className="flex items-center gap-3 px-5 py-2 bg-emerald-500/25 border border-emerald-500/60 rounded-lg">
                    <img src="/images/microsoft-logo.svg" alt="Microsoft" className="w-6 h-6" />
                    <span className="text-xl text-emerald-300 font-semibold">Graph Webhook</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FETCH + COMPARE */}
            <div className="flex items-center gap-6">
              <span className="text-2xl font-black text-amber-400 w-12">2</span>
              <div className="flex-1 bg-amber-500/15 border border-amber-500/50 rounded-xl px-6 py-4 flex items-center gap-8">
                <Database className="w-8 h-8 text-amber-400" />
                <span className="text-2xl font-bold text-amber-400">FETCH + DIFF</span>
                <div className="flex items-center gap-4 ml-auto font-mono text-xl">
                  <span className="text-emerald-400">+added</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-red-400">−removed</span>
                </div>
              </div>
            </div>

            {/* TRANSLATE */}
            <div className="flex items-center gap-6">
              <span className="text-2xl font-black text-slate-500 w-12">3</span>
              <div className="flex-1 bg-slate-700/40 border border-slate-600/50 rounded-xl px-6 py-4 flex items-center gap-8">
                <span className="text-2xl font-bold text-slate-300">TRANSLATE</span>
                <span className="text-xl text-slate-500">GUIDs → names</span>
                <div className="flex items-center gap-4 ml-auto text-xl">
                  <code className="text-slate-600">a1b2c3...</code>
                  <span className="text-slate-600">→</span>
                  <span className="text-amber-400">admin@contoso.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ArrowDown className="w-8 h-8 text-slate-600" />
        </div>

        {/* ═══ AI LAYER ═══ */}
        <div className="relative border-2 border-dashed border-purple-500/60 rounded-2xl px-8 py-5 flex-1">
          <div className="absolute -top-4 left-8 px-4 bg-slate-900">
            <span className="text-lg font-bold text-purple-400 uppercase tracking-wider">AI Layer</span>
            <span className="text-lg text-purple-400/50 ml-3 font-medium">probabilistic</span>
          </div>

          <div className="flex items-center gap-6 pt-2 h-full">
            <span className="text-2xl font-black text-purple-400 w-12">4</span>
            <div className="flex-1 bg-purple-500/15 border border-purple-500/50 rounded-xl px-6 py-4 flex items-center gap-8">
              <Brain className="w-10 h-10 text-purple-400" />
              <span className="text-2xl font-bold text-purple-400">EXPLAIN</span>
              <span className="text-xl text-purple-300 italic ml-auto">
                "This bypasses MFA for legacy protocols..."
              </span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ArrowDown className="w-8 h-8 text-slate-600" />
        </div>

        {/* ═══ OUTPUT GUARDRAIL ═══ */}
        <div className="relative border-2 border-dashed border-amber-500/60 rounded-2xl px-8 py-5 flex-1">
          <div className="absolute -top-4 left-8 px-4 bg-slate-900">
            <span className="text-lg font-bold text-amber-400 uppercase tracking-wider">Output Guardrail</span>
            <span className="text-lg text-amber-400/50 ml-3 font-medium">deterministic</span>
          </div>

          <div className="flex items-center gap-6 pt-2 h-full">
            <span className="text-2xl font-black text-red-400 w-12">5</span>
            <div className="flex-1 flex gap-6">
              {/* Notify */}
              <div className="flex-1 bg-red-500/15 border border-red-500/50 rounded-xl px-6 py-4 flex items-center gap-5">
                <Bell className="w-10 h-10 text-red-400" />
                <div>
                  <div className="text-2xl font-bold text-red-400">NOTIFY</div>
                  <div className="text-lg text-slate-400">Ticket + Email</div>
                </div>
              </div>
              {/* Update baseline */}
              <div className="flex-1 bg-emerald-500/15 border border-emerald-500/50 rounded-xl px-6 py-4 flex items-center gap-5">
                <RefreshCw className="w-10 h-10 text-emerald-400" />
                <div>
                  <div className="text-2xl font-bold text-emerald-400">SAVE STATE</div>
                  <div className="text-lg text-slate-400">New baseline</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default M365ConfigDriftDemo;
