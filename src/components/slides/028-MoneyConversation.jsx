import React from 'react';
import { DollarSign, TrendingUp, Clock, Users } from 'lucide-react';

/**
 * BudgetSlide - "The Money Conversation"
 *
 * REDESIGNED for projection-scale typography (30+ feet)
 * - Reduced from 4 stats to 3 hero stats
 * - Simplified ROI calculation to summary view
 * - All text now 24px+ minimum
 */
const BudgetSlide = ({ theme: t }) => {
  const title = "The Money Conversation";
  const subtitle = "ROI that leadership understands";

  const stats = [
    { value: "$1.76M", label: "Breach cost savings", source: "IBM 2024", icon: DollarSign },
    { value: "74 days", label: "Faster containment", source: "IBM 2024", icon: Clock },
    { value: "234%", label: "MSP automation ROI", source: "TravisASM", icon: TrendingUp },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className={`text-5xl md:text-7xl font-black mb-4 ${t.textOnPage}`}>
          {title}
        </h2>
        <p className={`text-2xl md:text-3xl ${t.accentColor} font-medium`}>
          {subtitle}
        </p>
      </div>

      <div className="max-w-6xl w-full">
        {/* Key Stats Grid - 3 big cards */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className={`${t.cardBg} p-8 rounded-2xl border ${t.cardBorder} text-center`}>
              <stat.icon className={`w-12 h-12 ${t.accentColor} mx-auto mb-4`} />
              <div className={`text-5xl md:text-6xl font-black ${t.accentColor}`}>{stat.value}</div>
              <div className="text-2xl text-slate-300 mt-3">{stat.label}</div>
              <div className="text-xl text-slate-500 mt-2">{stat.source}</div>
            </div>
          ))}
        </div>

        {/* Simplified ROI Summary */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Savings */}
          <div className={`${t.cardBg} p-8 rounded-2xl border border-emerald-500/50`}>
            <div className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8" /> Annual Savings
            </div>
            <div className="text-5xl font-black text-emerald-400 mb-4">$156,000</div>
            <div className="text-2xl text-slate-400">60 hrs/week saved at $50/hr</div>
          </div>

          {/* Investment */}
          <div className={`${t.cardBg} p-8 rounded-2xl border border-amber-500/50`}>
            <div className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-3">
              <DollarSign className="w-8 h-8" /> Annual Investment
            </div>
            <div className="text-5xl font-black text-amber-400 mb-4">$50-80K</div>
            <div className="text-2xl text-slate-400">Platform + training + management</div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="grid grid-cols-2 gap-8">
          <div className={`${t.cardBg} p-8 rounded-2xl border-2 border-emerald-500/50 text-center`}>
            <div className="text-6xl font-black text-emerald-400">2-3x ROI</div>
            <div className="text-2xl text-slate-400 mt-3">Year one return</div>
          </div>
          <div className={`${t.cardBg} p-8 rounded-2xl border ${t.cardBorder} flex items-center gap-6`}>
            <Users className={`w-14 h-14 ${t.accentColor} flex-shrink-0`} />
            <div>
              <div className="text-3xl font-bold text-slate-200">Headcount Reality</div>
              <div className="text-2xl text-slate-400 mt-2">
                Don't hire. Free existing staff for higher-value work
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSlide;
