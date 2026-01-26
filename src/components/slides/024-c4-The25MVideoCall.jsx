import React from 'react';
import { Video, AlertTriangle, CheckCircle, Phone, DollarSign, Users, ShieldCheck } from 'lucide-react';

/**
 * C4: The $25M Video Call
 * Focus: Hero story - Arup deepfake + supporting cases
 * Best for: Maximum emotional impact, memorable keynote beat
 *
 * SOURCES:
 * - Arup: https://www.cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk
 * - Voice Scams: https://consumer.ftc.gov/consumer-alerts/2023/03/scammers-use-ai-enhance-their-family-emergency-schemes
 */
const The25MVideoCallSlide = ({ theme: t }) => {
  const title = "The $25M Video Call";
  const subtitle = "When every face on the call was AI";

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-6">
        <h2 className={`text-5xl md:text-7xl font-black mb-4 ${t.textOnPage}`}>
          {title}
        </h2>
        <p className={`text-xl md:text-2xl ${t.accentColor} font-medium`}>
          {subtitle}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Hero Card - Arup */}
        <div className={`${t.cardBg} rounded-xl border-2 border-red-500/50 overflow-hidden mb-6`}>
          <div className="bg-red-500/20 p-4 border-b border-red-500/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Video className="w-10 h-10 text-red-400" />
                <div>
                  <div className="font-black text-3xl text-red-400">Arup Engineering</div>
                  <div className="text-slate-400 text-xl">Hong Kong | January 2024</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-red-400">$25M</div>
                <div className="text-slate-400 text-lg">stolen</div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-6">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { step: "1", label: "Phishing Email", desc: "\"Confidential transaction\" from CFO" },
                { step: "2", label: "Video Call", desc: "CFO + executives on screen - ALL DEEPFAKES" },
                { step: "3", label: "Urgent Transfer", desc: "15 transactions to 5 accounts" },
                { step: "4", label: "Discovery", desc: "Fraud found 1 week later" }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-red-500/30 border border-red-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-red-400 font-bold text-xl">{item.step}</span>
                  </div>
                  <div className="text-slate-200 font-bold text-lg">{item.label}</div>
                  <div className="text-slate-400 text-base">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 text-center">
              <p className="text-xl text-slate-300">
                Finance worker joined a call with the CFO and colleagues.
                <span className="text-red-400 font-bold"> Every person on the call was AI-generated.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Supporting Cases */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={`${t.cardBg} rounded-xl border ${t.cardBorder} p-4`}>
            <div className="flex items-center gap-3 mb-3">
              <Phone className="w-8 h-8 text-amber-400" />
              <div>
                <div className="font-bold text-xl text-amber-400">Voice Clone Scams</div>
                <div className="text-slate-400">2023-2024</div>
              </div>
            </div>
            <div className="text-2xl font-black text-amber-400 mb-2">$3.4B</div>
            <div className="text-slate-300 text-lg">Lost by seniors to AI voice cloning scams</div>
            <div className="text-slate-400 text-base mt-2">3 seconds of audio = convincing clone</div>
          </div>

          <div className={`${t.cardBg} rounded-xl border ${t.cardBorder} p-4`}>
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-8 h-8 text-purple-400" />
              <div>
                <div className="font-bold text-xl text-purple-400">Deepfake Incidents</div>
                <div className="text-slate-400">Q1 2025</div>
              </div>
            </div>
            <div className="text-2xl font-black text-purple-400 mb-2">3,000%</div>
            <div className="text-slate-300 text-lg">Increase in deepfake fraud attempts since 2023</div>
            <div className="text-slate-400 text-base mt-2">179 incidents in Q1 2025 alone</div>
          </div>
        </div>

        {/* Guardrail Fixes */}
        <div className={`${t.cardBg} rounded-xl border-2 border-emerald-500/50 p-4`}>
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span className="text-emerald-400 font-bold text-xl">Guardrail Fixes</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: Phone, label: "Out-of-band verification", desc: "Call back on known number" },
              { icon: DollarSign, label: "Payment controls", desc: "Dual approval for transfers" },
              { icon: Users, label: "Code words", desc: "Pre-agreed family phrases" },
              { icon: Video, label: "Liveness checks", desc: "Ask them to wave/turn head" }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-emerald-400 font-bold text-lg">{item.label}</div>
                    <div className="text-slate-400 text-base">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default The25MVideoCallSlide;
