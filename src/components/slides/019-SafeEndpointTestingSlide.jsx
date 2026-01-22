import React from 'react';
import { Shield, FlaskConical, Target, AlertTriangle, CheckCircle2 } from 'lucide-react';

/**
 * Safe Endpoint Testing - Framing Slide
 *
 * Sets up the "safe testing" philosophy for MSPs:
 * - Scoped targets (test ring / lab)
 * - Two-tier approach: production-safe vs lab-fidelity
 * - Expected alerts + rollback/cleanup
 */
const SafeEndpointTestingSlide = ({ theme: t }) => {
  const title = "Safe Endpoint Testing";
  const subtitle = "How to validate without breaking production";

  const principles = [
    {
      icon: Target,
      label: "Scoped Targets",
      description: "Test ring or lab VMs only — never production without isolation",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      icon: FlaskConical,
      label: "Two-Tier Testing",
      description: "Built-in safe checks for prod, Atomic Red Team for lab fidelity",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/30"
    },
    {
      icon: AlertTriangle,
      label: "Expected Alerts",
      description: "Know what should fire — validate detection, not just execution",
      color: "text-amber-400",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/30"
    },
    {
      icon: CheckCircle2,
      label: "Rollback Ready",
      description: "Every test has a cleanup step — leave no artifacts behind",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30"
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center mb-10">
        <div className={`mb-6 ${t.accentBg} w-20 h-20 rounded-full flex items-center justify-center mx-auto ${t.accentGlow}`}>
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h2 className={`text-5xl md:text-7xl font-black mb-4 ${t.textOnPage}`}>
          {title}
        </h2>
        <p className={`text-2xl md:text-3xl ${t.accentColor} font-medium`}>
          {subtitle}
        </p>
      </div>

      {/* Four Principles Grid */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        {principles.map((p, i) => (
          <div
            key={i}
            className={`${t.cardBg} p-6 rounded-xl border ${p.borderColor} hover:border-opacity-60 transition-all`}
          >
            <div className="flex items-start gap-4">
              <div className={`${p.bgColor} p-3 rounded-lg flex-shrink-0`}>
                <p.icon className={`w-8 h-8 ${p.color}`} />
              </div>
              <div>
                <div className={`text-2xl font-bold ${p.color} mb-2`}>{p.label}</div>
                <p className="text-xl text-slate-300">{p.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Message */}
      <div className="text-center">
        <div className={`inline-block ${t.cardBg} px-8 py-4 rounded-xl border ${t.cardBorder}`}>
          <p className="text-2xl text-slate-300">
            <span className="text-amber-400 font-semibold">Vendor-neutral:</span>{' '}
            PowerShell checks work on any Windows endpoint — no Intune required
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafeEndpointTestingSlide;
