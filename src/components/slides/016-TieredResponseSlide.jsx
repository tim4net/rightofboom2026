import React from 'react';
import { Zap, UserCheck, ShieldAlert, ArrowRight, CheckCircle } from 'lucide-react';

/**
 * Tiered Response Slide
 *
 * Shows WHEN AI can auto-execute vs when humans must approve.
 * The decision logic: confidence threshold + impact level = action tier.
 *
 * Three tiers:
 * 1. AUTO-EXECUTE: High confidence (>95%) + Low impact
 * 2. HUMAN APPROVAL: Medium confidence (80-95%) OR Medium impact
 * 3. ALWAYS HUMAN: Any confidence + High impact
 *
 * Photo test: Someone sees this and immediately understands
 * the tiered model - when AI acts alone vs. when humans gate.
 */
export const TieredResponseSlide = ({ theme: t }) => {
  const tiers = [
    {
      name: 'AUTO-EXECUTE',
      subtitle: 'High Confidence (>95%) + Low Impact',
      icon: Zap,
      color: 'emerald',
      actions: [
        'Block IP on threat intel blocklist',
        'Quarantine phishing email',
        'Send "was this you?" notification',
        'Add to MFA challenge group',
        'Revoke suspicious session',
        'Create ticket for review'
      ]
    },
    {
      name: 'HUMAN APPROVAL',
      subtitle: 'Medium Confidence (80-95%) OR Medium Impact',
      icon: UserCheck,
      color: 'amber',
      actions: [
        'Disable/lock user account',
        'Force password reset',
        'Isolate endpoint from network',
        'Remove inbox forwarding rule'
      ]
    },
    {
      name: 'ALWAYS HUMAN',
      subtitle: 'Any Confidence + High Impact',
      icon: ShieldAlert,
      color: 'red',
      actions: [
        'VIP/executive actions',
        'Mass actions (multiple users)',
        'Permanent deletions',
        'Firewall rule changes',
        'Production system isolation'
      ]
    }
  ];

  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-500/15',
      border: 'border-emerald-500/50',
      text: 'text-emerald-400',
      textLight: 'text-emerald-300',
      badge: 'bg-emerald-500/20'
    },
    amber: {
      bg: 'bg-amber-500/15',
      border: 'border-amber-500/50',
      text: 'text-amber-400',
      textLight: 'text-amber-300',
      badge: 'bg-amber-500/20'
    },
    red: {
      bg: 'bg-red-500/15',
      border: 'border-red-500/50',
      text: 'text-red-400',
      textLight: 'text-red-300',
      badge: 'bg-red-500/20'
    }
  };

  return (
    <div className="w-full h-full flex flex-col px-12 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className={`text-6xl font-bold ${t.textOnPage} mb-3`}>
          Tiered Response Model
        </h2>
        <p className="text-2xl text-slate-400">
          When AI acts alone vs. when humans gate
        </p>
      </div>

      {/* Decision logic formula */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-4 bg-slate-800/60 border border-slate-700 rounded-xl px-8 py-3">
          <span className="text-xl text-purple-400 font-semibold">Confidence %</span>
          <span className="text-xl text-slate-500">+</span>
          <span className="text-xl text-blue-400 font-semibold">Impact Level</span>
          <ArrowRight className="w-6 h-6 text-slate-500" />
          <span className="text-xl text-slate-200 font-semibold">Action Tier</span>
        </div>
      </div>

      {/* Three tier columns */}
      <div className="flex-1 grid grid-cols-3 gap-6">
        {tiers.map((tier, idx) => {
          const Icon = tier.icon;
          const colors = colorClasses[tier.color];
          return (
            <div
              key={idx}
              className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-5 flex flex-col`}
            >
              {/* Tier header */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 ${colors.badge} rounded-lg`}>
                  <Icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${colors.text}`}>
                    {tier.name}
                  </div>
                  <div className="text-base text-slate-400">
                    {tier.subtitle}
                  </div>
                </div>
              </div>

              {/* Actions list */}
              <div className="flex-1 space-y-2">
                {tier.actions.map((action, actionIdx) => (
                  <div
                    key={actionIdx}
                    className="flex items-start gap-2 px-3 py-2 bg-slate-800/40 rounded-lg"
                  >
                    <CheckCircle className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                    <span className={`text-lg ${colors.textLight}`}>
                      {action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer - Landing line */}
      <div className="mt-6 flex justify-center">
        <div className="bg-slate-900/80 border border-slate-700 rounded-xl px-10 py-4">
          <p className="text-3xl text-slate-300">
            <span className="text-purple-400 font-semibold">Confidence</span>
            {' '}sets the threshold.{' '}
            <span className="text-blue-400 font-semibold">Impact</span>
            {' '}sets the stakes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TieredResponseSlide;
