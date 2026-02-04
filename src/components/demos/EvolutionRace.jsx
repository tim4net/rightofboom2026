import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

// ============================================================================
// EVOLUTION RACE - Side-by-side animated comparison of response methods
// ============================================================================
export const EvolutionRace = ({ theme }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  const lanes = [
    {
      name: "Manual",
      color: "slate",
      totalTime: 2700, // 45 minutes in seconds
      steps: [
        { label: "Alert received", time: 0 },
        { label: "Analyst assigned", time: 120 },
        { label: "Log review begins", time: 300 },
        { label: "Cross-referencing IPs...", time: 900 },
        { label: "Calling user...", time: 1500 },
        { label: "User confirms travel", time: 2400 },
        { label: "Ticket closed", time: 2700 },
      ]
    },
    {
      name: "Script",
      color: "yellow",
      totalTime: 120, // 2 minutes
      steps: [
        { label: "Alert triggers webhook", time: 0 },
        { label: "PowerShell executing...", time: 5 },
        { label: "Revoking sessions...", time: 30 },
        { label: "CEO LOCKED OUT!", time: 60, error: true },
        { label: "Rollback initiated", time: 90 },
        { label: "Escalation required", time: 120 },
      ]
    },
    {
      name: "Autonomous",
      color: "green",
      totalTime: 22,
      steps: [
        { label: "Alert ingested", time: 0 },
        { label: "Checking calendar...", time: 2 },
        { label: "Travel confirmed", time: 5 },
        { label: "AI reasoning...", time: 8 },
        { label: "Risk: LOW (legit travel)", time: 15 },
        { label: "Alert auto-resolved", time: 22, success: true },
      ]
    }
  ];

  const maxTime = 180; // Show 3 minutes of the race

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed(prev => {
          if (prev >= maxTime) {
            setIsRunning(false);
            return maxTime;
          }
          return prev + 0.5;
        });
      }, 50);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const reset = () => {
    setIsRunning(false);
    setElapsed(0);
  };

  const formatTime = (seconds) => {
    if (seconds >= 60) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    return `${seconds.toFixed(1)}s`;
  };

  const getCurrentStep = (lane) => {
    let current = lane.steps[0];
    for (const step of lane.steps) {
      if (elapsed >= step.time) current = step;
    }
    return current;
  };

  const isComplete = (lane) => elapsed >= lane.totalTime;

  return (
    <div className="w-full max-w-[90vw] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold">Response Evolution Race</h3>
        <div className="flex items-center gap-4">
          <div className="text-3xl font-mono font-bold">{formatTime(elapsed)}</div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`p-3 rounded-lg ${isRunning ? 'bg-yellow-600' : 'bg-green-600'} hover:brightness-110 transition-all`}
            >
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={reset}
              className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition-all"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Race lanes */}
      <div className="space-y-4">
        {lanes.map((lane) => {
          const progress = Math.min((elapsed / lane.totalTime) * 100, 100);
          const complete = isComplete(lane);
          const currentStep = getCurrentStep(lane);
          const colorMap = {
            slate: { bg: 'bg-slate-600', border: 'border-slate-500', text: 'text-slate-400' },
            yellow: { bg: 'bg-yellow-600', border: 'border-yellow-500', text: 'text-yellow-400' },
            green: { bg: 'bg-green-600', border: 'border-green-500', text: 'text-green-400' },
          };
          const colors = colorMap[lane.color];

          return (
            <div key={lane.name} className={`p-4 rounded-xl border ${colors.border} bg-slate-900/50`}>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <span className={`font-bold text-xl ${colors.text}`}>{lane.name}</span>
                  {complete && lane.color === 'green' && (
                    <span className="px-2 py-1 bg-green-500 text-black text-xs font-bold rounded">WINNER</span>
                  )}
                  {complete && lane.color === 'yellow' && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">FAILED</span>
                  )}
                </div>
                <div className="font-mono text-sm">
                  {complete ? formatTime(lane.totalTime) : formatTime(Math.min(elapsed, lane.totalTime))}
                  <span className="text-slate-500"> / {formatTime(lane.totalTime)}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-8 bg-slate-800 rounded-lg overflow-hidden mb-2 relative">
                <div
                  className={`h-full ${colors.bg} transition-all duration-100 flex items-center justify-end pr-2`}
                  style={{ width: `${progress}%` }}
                >
                  {progress > 10 && <span className="text-xs font-bold">🏃</span>}
                </div>
              </div>

              {/* Current status */}
              <div className={`text-sm font-mono ${currentStep.error ? 'text-red-400' : currentStep.success ? 'text-green-400' : 'text-slate-400'}`}>
                {currentStep.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {elapsed >= 22 && (
        <div className="mt-6 p-4 bg-green-950/30 rounded-xl border border-green-500/30 animate-in fade-in">
          <div className="text-center">
            <div className="text-green-400 font-bold text-lg mb-1">Autonomous Agent: Alert Resolved</div>
            <div className="text-slate-400 text-sm">
              Manual still has {formatTime(2700 - elapsed)} remaining - Script failed and escalated
            </div>
          </div>
        </div>
      )}

      {/* 2025 Research Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700 text-center">
          <div className="text-2xl font-black text-emerald-400">$1.76M</div>
          <div className="text-xs text-slate-400">Breach cost savings with AI</div>
          <div className="text-xs text-slate-600">IBM 2024</div>
        </div>
        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700 text-center">
          <div className="text-2xl font-black text-emerald-400">74 days</div>
          <div className="text-xs text-slate-400">Faster containment</div>
          <div className="text-xs text-slate-600">IBM 2024</div>
        </div>
        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700 text-center">
          <div className="text-2xl font-black text-emerald-400">33%</div>
          <div className="text-xs text-slate-400">Breach cost reduction</div>
          <div className="text-xs text-slate-600">AI-driven tools</div>
        </div>
      </div>
    </div>
  );
};
