import React from 'react';
import { MessageSquare, Eye, FileSearch, Hand, Ban, HelpCircle } from 'lucide-react';

const TAILSlide = ({ theme: t }) => {
  const title = "The TAIL Method";
  const subtitle = "Talking to Clients About AI";

  const tailFramework = [
    {
      letter: "T",
      word: "Transparency",
      meaning: "Disclose AI tools before they ask. No surprises.",
      icon: Eye,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20"
    },
    {
      letter: "A",
      word: "Audit Trail",
      meaning: '"We can prove what AI did and why." Logs available.',
      icon: FileSearch,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20"
    },
    {
      letter: "I",
      word: "Intervention Points",
      meaning: '"AI suggests, humans approve." Clear escalation path.',
      icon: Hand,
      color: "text-amber-400",
      bgColor: "bg-amber-500/20"
    },
    {
      letter: "L",
      word: "Limits",
      meaning: "Explicit about what AI doesn't do. Data boundaries.",
      icon: Ban,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20"
    }
  ];

  const clientQuestions = [
    {
      question: '"Is AI reading my data?"',
      answer: "Here's exactly what touches your data"
    },
    {
      question: '"Are you using AI on my environment?"',
      answer: "Yes, here's what/why/how governed"
    },
    {
      question: '"What if AI makes a mistake?"',
      answer: "Human oversight + rollback plan"
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-6">
        <h2 className={`text-5xl md:text-7xl font-black mb-4 ${t.textOnPage}`}>
          {title}
        </h2>
        <p className={`text-xl md:text-2xl ${t.accentColor} font-medium`}>
          {subtitle}
        </p>
        <p className="text-xl text-slate-500 mt-2">Original framework by Tim Fournet & Roddy Bergeron</p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* TAIL Framework */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {tailFramework.map((item, i) => (
            <div key={i} className={`${t.cardBg} p-5 rounded-xl border ${t.cardBorder} text-center`}>
              <div className={`${item.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3`}>
                <span className={`text-4xl font-black ${item.color}`}>{item.letter}</span>
              </div>
              <div className={`text-2xl font-bold ${item.color} mb-2`}>{item.word}</div>
              <div className="text-xl text-slate-400">{item.meaning}</div>
            </div>
          ))}
        </div>

        {/* Client Questions */}
        <div className={`${t.cardBg} p-6 rounded-xl border ${t.cardBorder} mb-6`}>
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className={`w-6 h-6 ${t.accentColor}`} />
            <div className="text-2xl font-bold text-slate-200">The Three Questions Every Client Asks</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {clientQuestions.map((q, i) => (
              <div key={i} className="p-4 rounded-lg bg-slate-800/50">
                <div className="text-xl text-slate-300 font-medium mb-2">{q.question}</div>
                <div className={`text-xl ${t.accentColor}`}>→ {q.answer}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Message */}
        <div className={`text-center p-5 rounded-xl border-2 ${t.accentBorder} ${t.cardBg}`}>
          <MessageSquare className={`w-8 h-8 ${t.accentColor} mx-auto mb-2`} />
          <p className="text-2xl text-slate-200">
            "<span className={`${t.accentColor} font-bold`}>Disclose before they ask.</span> It builds trust."
          </p>
        </div>
      </div>
    </div>
  );
};

export default TAILSlide;
