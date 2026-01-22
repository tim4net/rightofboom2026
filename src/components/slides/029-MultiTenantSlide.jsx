import React from 'react';
import { Building2, ArrowRight, Globe, Bell, Settings } from 'lucide-react';

const MultiTenantSlide = ({ theme: t }) => {
  const title = "Multi-Tenant Architecture";
  const subtitle = "Build once, run across all clients";

  const tenants = [
    { name: "Client A", color: "bg-blue-500" },
    { name: "Client B", color: "bg-emerald-500" },
    { name: "Client C", color: "bg-purple-500" },
    { name: "Client D", color: "bg-amber-500" },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h2 className={`text-5xl md:text-7xl font-black mb-4 ${t.textOnPage}`}>
          {title}
        </h2>
        <p className={`text-xl md:text-2xl ${t.accentColor} font-medium`}>
          {subtitle}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Visual Architecture Flow */}
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-center mb-8">
          {/* Single Workflow */}
          <div className={`${t.cardBg} p-6 rounded-xl border ${t.cardBorder} text-center`}>
            <Settings className={`w-12 h-12 ${t.accentColor} mx-auto mb-3`} />
            <div className="text-xl font-bold text-slate-200 mb-2">Single Workflow</div>
            <div className="text-xl text-slate-400">Define once, maintain once</div>
            <div className={`mt-3 px-3 py-1 rounded-full ${t.accentBg}/20 text-xl ${t.accentColor}`}>
              Config Drift Scanner
            </div>
          </div>

          <ArrowRight className={`w-8 h-8 ${t.accentColor}`} />

          {/* Trigger Configuration */}
          <div className={`${t.cardBg} p-6 rounded-xl border ${t.cardBorder} text-center`}>
            <Globe className={`w-12 h-12 ${t.accentColor} mx-auto mb-3`} />
            <div className="text-xl font-bold text-slate-200 mb-2">Org Mapping</div>
            <div className="text-xl text-slate-400 mb-3">Auto-deploy to all tenants</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {tenants.map((tenant, i) => (
                <div key={i} className={`${tenant.color} px-2 py-1 rounded text-xl font-medium text-white`}>
                  {tenant.name}
                </div>
              ))}
            </div>
          </div>

          <ArrowRight className={`w-8 h-8 ${t.accentColor}`} />

          {/* Centralized Results */}
          <div className={`${t.cardBg} p-6 rounded-xl border ${t.cardBorder} text-center`}>
            <Bell className={`w-12 h-12 ${t.accentColor} mx-auto mb-3`} />
            <div className="text-xl font-bold text-slate-200 mb-2">Central Alerting</div>
            <div className="text-xl text-slate-400">Aggregated results, per-client context</div>
            <div className={`mt-3 px-3 py-1 rounded-full bg-emerald-500/20 text-xl text-emerald-400`}>
              Single pane of glass
            </div>
          </div>
        </div>

        {/* Trigger Types */}
        <div className={`${t.cardBg} p-6 rounded-xl border ${t.cardBorder}`}>
          <div className="text-2xl font-bold text-slate-200 mb-4 text-center">Trigger Options</div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-slate-800/50">
              <div className={`text-2xl font-bold ${t.accentColor}`}>Scheduled</div>
              <div className="text-xl text-slate-400 mt-1">Daily/weekly scans</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-slate-800/50">
              <div className={`text-2xl font-bold ${t.accentColor}`}>Webhook</div>
              <div className="text-xl text-slate-400 mt-1">On-demand from tickets</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-slate-800/50">
              <div className={`text-2xl font-bold ${t.accentColor}`}>Event-Driven</div>
              <div className="text-xl text-slate-400 mt-1">On config change</div>
            </div>
          </div>
        </div>

        {/* MSP Value Prop */}
        <div className={`mt-6 text-center p-4 rounded-xl border ${t.cardBorder} ${t.cardBg}`}>
          <Building2 className={`w-8 h-8 ${t.accentColor} mx-auto mb-2`} />
          <p className="text-2xl text-slate-300">
            <span className={`${t.accentColor} font-bold`}>MSP advantage:</span>{" "}
            Same workflow definition scales from 10 to 1,000 clients with zero additional effort
          </p>
        </div>
      </div>
    </div>
  );
};

export default MultiTenantSlide;
