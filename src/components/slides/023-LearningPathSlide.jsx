import React from 'react';
import { GraduationCap, Eye, Sliders, Wrench, ArrowRight } from 'lucide-react';

const LearningPathSlide = ({ theme: t }) => {
  const title = "Your Team's AI Learning Path";
  const subtitle = "Crawl → Walk → Run";

  const phases = [
    {
      name: "CRAWL",
      duration: "Month 1-2",
      focus: "Judge the AI",
      activity: "Approve/reject all recommendations",
      icon: Eye,
      color: "text-amber-400",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/50"
    },
    {
      name: "WALK",
      duration: "Month 3-6",
      focus: "Tune the AI",
      activity: "Adjust thresholds, customize playbooks",
      icon: Sliders,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/50"
    },
    {
      name: "RUN",
      duration: "Month 6+",
      focus: "Design workflows",
      activity: "Architect new automation",
      icon: Wrench,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/50"
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

      <div className="max-w-6xl mx-auto">
        {/* Phase Cards */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {phases.map((phase, i) => (
            <React.Fragment key={i}>
              <div className={`${t.cardBg} p-6 rounded-xl border ${phase.borderColor} flex-1 max-w-xs`}>
                <div className={`${phase.bgColor} p-3 rounded-lg w-fit mb-4`}>
                  <phase.icon className={`w-8 h-8 ${phase.color}`} />
                </div>
                <div className={`text-2xl font-black ${phase.color} mb-1`}>{phase.name}</div>
                <div className="text-sm text-slate-500 mb-3">{phase.duration}</div>
                <div className="text-lg font-bold text-slate-200 mb-2">{phase.focus}</div>
                <div className="text-sm text-slate-400">{phase.activity}</div>
              </div>
              {i < phases.length - 1 && (
                <ArrowRight className={`w-8 h-8 ${t.accentColor} flex-shrink-0`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Key Stats */}
        <div className={`${t.cardBg} p-6 rounded-xl border ${t.cardBorder} mb-6`}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-lg font-bold text-slate-200 mb-3">The Shift</div>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span><span className="text-red-400 font-bold">50%</span> of L1 tasks replaced by AI by 2028</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${t.accentBg}`} />
                  <span>Role shifts: execution → <span className={`${t.accentColor} font-bold`}>judgment & oversight</span></span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-200 mb-3">Hiring Implications</div>
              <div className="space-y-2 text-slate-300 text-sm">
                <div>✓ Probably don't need to hire — upskill existing</div>
                <div>✓ Identify one "Automation Champion" (curious L2)</div>
                <div>✓ Hire for: curiosity, judgment, communication</div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Message */}
        <div className={`text-center p-6 rounded-xl border ${t.cardBorder} ${t.cardBg}`}>
          <GraduationCap className={`w-10 h-10 ${t.accentColor} mx-auto mb-3`} />
          <p className="text-2xl text-slate-200 font-medium">
            "You don't need to become <span className={`${t.accentColor} font-bold`}>AI experts</span>.
            <br />You need to become <span className={`${t.accentColor} font-bold`}>AI supervisors</span>."
          </p>
          <p className="text-slate-500 text-sm mt-3">— Gartner, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default LearningPathSlide;
