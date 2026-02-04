import React from 'react';
import { Calendar, RefreshCw, Users, FileCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

const OperationalizationSlide = ({ theme: t }) => {
  const title = "Your 90-Day Roadmap";
  const subtitle = "Start small, expand with data";

  const steps = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Schedule Regular Tests",
      points: [
        "Daily: Config drift scans",
        "Weekly: Endpoint validation",
        "Monthly: Full segmentation test",
        "Quarterly: Red team simulation"
      ]
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Automate the Routine",
      points: [
        "CI/CD for security tests",
        "Webhook triggers on changes",
        "Scheduled cron jobs",
        "Event-driven validation"
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Human-in-the-Loop",
      points: [
        "AI triages, human approves",
        "Escalation thresholds",
        "VIP protection lists",
        "Audit trail for everything"
      ]
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "Document & Report",
      points: [
        "Reasoning logs for insurance",
        "CIS control mapping",
        "Trend analysis over time",
        "Executive dashboards"
      ]
    }
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[95vw] mx-auto">
        {steps.map((step, i) => (
          <div key={i} className={`${t.cardBg} p-6 rounded-xl border ${t.cardBorder} hover:scale-105 transition-transform`}>
            <div className={`${t.accentColor} mb-4`}>{step.icon}</div>
            <h3 className="text-white font-bold text-2xl mb-4">{step.title}</h3>
            <ul className="space-y-2">
              {step.points.map((point, j) => (
                <li key={j} className="flex items-start gap-2 text-xl text-slate-400">
                  <CheckCircle2 className={`w-5 h-5 ${t.accentColor} shrink-0 mt-0.5`} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`mt-8 ${t.cardBg} p-6 rounded-xl border ${t.cardBorder} max-w-3xl mx-auto`}>
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
          <div>
            <h4 className="text-amber-400 font-bold text-xl mb-2">Ethics & Safety First</h4>
            <p className="text-slate-400 text-xl">
              Always test in controlled environments. Never run offensive tools against production without explicit authorization.
              Document everything. Your testing program should be auditable and defensible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationalizationSlide;
