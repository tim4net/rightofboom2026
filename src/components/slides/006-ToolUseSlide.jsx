import React from 'react';
import { User, Brain, Wrench, Zap, ChevronRight, AlertTriangle, UserX, Ticket, Shield, Mail, Scroll } from 'lucide-react';

/**
 * How Agentic AI Acts Slide
 * Explains tool use: the bridge from AI reasoning to real-world action
 * Positioned after "Three Words You'll Hear" to deepen understanding of "Agentic"
 */
const ToolUseSlide = ({ theme: t }) => {
  const tools = [
    { icon: UserX, label: 'Disable accounts', color: 'text-blue-400' },
    { icon: Ticket, label: 'Create tickets', color: 'text-purple-400' },
    { icon: Shield, label: 'Isolate endpoints', color: 'text-emerald-400' },
    { icon: Mail, label: 'Delete emails', color: 'text-red-400' },
    { icon: Zap, label: 'Run RMM Scripts', color: 'text-yellow-400' },
    { icon: Scroll, label: 'Update CA Policies', color: 'text-pink-400' },
  ];

  const vendorQuestions = [
    'What tools can it access?',
    'What runs without approval?',
    'How is prompt injection prevented?',
  ];

  return (
    <div className="w-full h-full flex flex-col px-20 py-10">
      {/* Header */}
      <div className="mb-12">
        <h2 className={`text-7xl font-black ${t.textOnPage}`}>What Agentic AI Does</h2>
        <p className="text-3xl mt-3 text-slate-400">
          Tools are the bridge from reasoning to reality
        </p>
      </div>

      {/* Flow Diagram - Horizontal Pipeline */}
      <div className="flex items-center justify-center gap-6 mb-20">
        {/* User */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-500/20 rounded-2xl p-4 border-2 border-blue-500/40">
            <User className="w-12 h-12 text-blue-400" />
          </div>
          <span className="text-2xl text-blue-400 font-semibold mt-2">Prompt happens</span>
        </div>

        <ChevronRight className="w-8 h-8 text-slate-500" />

        {/* AI Agent */}
        <div className="flex flex-col items-center">
          <div className="bg-purple-500/20 rounded-2xl p-4 border-2 border-purple-500/40">
            <Brain className="w-12 h-12 text-purple-400" />
          </div>
          <span className="text-2xl text-purple-400 font-semibold mt-2">AI decides</span>
        </div>

        <ChevronRight className="w-8 h-8 text-slate-500" />

        {/* Tool */}
        <div className="flex flex-col items-center">
          <div className="bg-amber-500/20 rounded-2xl p-4 border-2 border-amber-500/40">
            <Wrench className="w-12 h-12 text-amber-400" />
          </div>
          <span className="text-2xl text-amber-400 font-semibold mt-2">Tools execute</span>
        </div>

        <ChevronRight className="w-8 h-8 text-slate-500" />

        {/* Real World */}
        <div className="flex flex-col items-center">
          <div className="bg-red-500/20 rounded-2xl p-4 border-2 border-red-500/40">
            <Zap className="w-12 h-12 text-red-400" />
          </div>
          <span className="text-2xl text-red-400 font-semibold mt-2">Stuff changes</span>
        </div>
      </div>

      {/* Two Column Lower Section */}
      <div className="grid grid-cols-2 gap-20">
        {/* Left: Tool Examples */}
        <div>
          <div className="text-xl text-slate-500 uppercase tracking-widest mb-5 font-semibold">
            Common AI Tools in Your Stack
          </div>
          <div className="grid grid-cols-2 gap-4">
            {tools.map((tool, i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-xl p-3 flex items-center gap-3"
              >
                <tool.icon className={`w-7 h-7 ${tool.color}`} />
                <span className="text-2xl text-white">{tool.label}</span>
              </div>
            ))}
          </div>

          {/* Key Insight */}
          <div className="mt-6 text-2xl text-slate-300">
            The AI <span className="text-purple-400 font-semibold">chooses</span> the tool and <span className="text-amber-400 font-semibold">provides arguments</span>.
            <br />
            It can be wrong about both.
          </div>
        </div>

        {/* Right: Security Warning + Vendor Questions */}
        <div className="flex flex-col gap-10">
          {/* Security Warning */}
          <div className="bg-slate-900 border-l-4 border-red-500 rounded-r-xl p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-red-400 shrink-0" />
              <div>
                <div className="text-2xl text-red-400 font-bold mb-2">
                  The Threat Model Shift
                </div>
                <div className="text-2xl text-white leading-relaxed">
                  Prompt injection + tools = <span className="text-red-400 font-semibold">execution</span>
                </div>
                <div className="text-xl text-slate-400 mt-2">
                  Malicious input can trigger real actions via your AI's tool access.
                </div>
              </div>
            </div>
          </div>

          {/* Vendor Questions */}
          <div>
            <div className="text-xl text-amber-400 uppercase tracking-widest mb-4 font-semibold">
              Ask Your Vendors
            </div>
            <ul className="space-y-4">
              {vendorQuestions.map((q, i) => (
                <li key={i} className="text-2xl text-slate-200 flex items-start gap-3">
                  <span className="text-amber-400 font-bold">{i + 1}.</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolUseSlide;
