import React from 'react';
import { Shield, Flame, Smartphone, Database, Mail } from 'lucide-react';

/**
 * Pattern Applications Slide
 *
 * Shows that the "math detects, AI explains" pattern works everywhere.
 * Reinforces that the guardrail sandwich is a template, not a one-off.
 */
export const PatternApplicationsSlide = ({ theme: t }) => {
  const applications = [
    {
      icon: Shield,
      system: 'M365 CA Policies',
      detects: 'Policy state changed',
      explains: 'Security impact of the change',
      color: 'amber'
    },
    {
      icon: Flame,
      system: 'Firewall Rules',
      detects: 'New "allow any" rule added',
      explains: 'What exposure was created',
      color: 'red'
    },
    {
      icon: Smartphone,
      system: 'Duo MFA',
      detects: 'User put in bypass mode',
      explains: 'MFA gap and risk window',
      color: 'emerald'
    },
    {
      icon: Database,
      system: 'Backup Jobs',
      detects: 'Retention period shortened',
      explains: 'RPO risk and data exposure',
      color: 'blue'
    },
    {
      icon: Mail,
      system: 'DNS Records',
      detects: 'DMARC/SPF changed',
      explains: 'Email auth weakened',
      color: 'purple'
    }
  ];

  const colorClasses = {
    amber: 'text-amber-400 bg-amber-500/20 border-amber-500/50',
    red: 'text-red-400 bg-red-500/20 border-red-500/50',
    emerald: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/50',
    blue: 'text-blue-400 bg-blue-500/20 border-blue-500/50',
    purple: 'text-purple-400 bg-purple-500/20 border-purple-500/50'
  };

  return (
    <div className="w-full h-full flex flex-col px-12 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className={`text-6xl font-bold ${t.textOnPage} mb-4`}>
          One Pattern, Many Applications
        </h2>
        <p className="text-2xl text-slate-400">
          The same architecture works everywhere
        </p>
      </div>

      {/* Table */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Header row */}
        <div className="grid grid-cols-[200px_1fr_1fr] gap-4 mb-4 px-4">
          <div className="text-xl font-bold text-slate-500 uppercase tracking-wider">
            System
          </div>
          <div className="text-xl font-bold text-amber-400 uppercase tracking-wider">
            What Math Detects
          </div>
          <div className="text-xl font-bold text-purple-400 uppercase tracking-wider">
            What AI Explains
          </div>
        </div>

        {/* Data rows */}
        <div className="space-y-3">
          {applications.map((app, idx) => {
            const Icon = app.icon;
            const colors = colorClasses[app.color];
            return (
              <div
                key={idx}
                className="grid grid-cols-[200px_1fr_1fr] gap-4 items-center bg-slate-800/40 border border-slate-700/50 rounded-xl px-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border ${colors}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-semibold text-slate-200">
                    {app.system}
                  </span>
                </div>
                <div className="text-2xl text-amber-300">
                  {app.detects}
                </div>
                <div className="text-2xl text-purple-300">
                  {app.explains}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer - The pattern */}
      <div className="mt-8 flex justify-center">
        <div className="bg-slate-900/80 border border-slate-700 rounded-xl px-10 py-4">
          <p className="text-3xl text-slate-300 font-mono">
            <span className="text-emerald-400">Baseline</span>
            <span className="text-slate-500"> → </span>
            <span className="text-amber-400">Compare</span>
            <span className="text-slate-500"> → </span>
            <span className="text-purple-400">Explain</span>
            <span className="text-slate-500"> → </span>
            <span className="text-red-400">Alert</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatternApplicationsSlide;
