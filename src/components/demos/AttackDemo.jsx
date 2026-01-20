import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

// ============================================================================
// ATTACK DEMO - OODA Loop demonstration showing attacker speed
// ============================================================================
export const AttackDemo = ({ theme }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  const steps = [
    { name: "OBSERVE", action: "Scanning for exposed tokens...", duration: 8, icon: "🔍" },
    { name: "ORIENT", action: "AI analyzing target profile...", duration: 12, icon: "🧠" },
    { name: "DECIDE", action: "Selecting attack vector: Token Theft", duration: 7, icon: "🎯" },
    { name: "ACT", action: "Injecting inbox forwarding rule...", duration: 15, icon: "💀" },
  ];

  const totalTime = 42;

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed(prev => {
          if (prev >= totalTime) {
            setIsRunning(false);
            return totalTime;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    let acc = 0;
    for (let i = 0; i < steps.length; i++) {
      if (elapsed >= acc && elapsed < acc + steps[i].duration) {
        setCurrentStep(i);
        break;
      }
      acc += steps[i].duration;
      if (i === steps.length - 1 && elapsed >= acc) {
        setCurrentStep(steps.length);
      }
    }
  }, [elapsed]);

  const reset = () => {
    setIsRunning(false);
    setCurrentStep(-1);
    setElapsed(0);
  };

  const getStepProgress = (index) => {
    let start = 0;
    for (let i = 0; i < index; i++) start += steps[i].duration;
    const end = start + steps[index].duration;
    if (elapsed < start) return 0;
    if (elapsed >= end) return 100;
    return ((elapsed - start) / steps[index].duration) * 100;
  };

  return (
    <div className="w-full max-w-[90vw] mx-auto">
      {/* Header with timer */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-3xl font-bold text-red-500 font-mono">ATTACKER OODA LOOP [LIVE]</h3>
        <div className="flex items-center gap-4">
          <div className={`text-6xl font-black font-mono ${elapsed >= totalTime ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            {elapsed.toFixed(1)}s
          </div>
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

      {/* OODA Steps */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {steps.map((step, i) => (
          <div
            key={step.name}
            className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
              currentStep === i
                ? 'border-red-500 bg-red-950/50 scale-105 shadow-lg shadow-red-500/20'
                : currentStep > i
                ? 'border-green-500/50 bg-green-950/30'
                : 'border-slate-700 bg-slate-900/50'
            }`}
          >
            <div className="text-3xl mb-2">{step.icon}</div>
            <div className={`font-bold text-lg ${currentStep >= i ? 'text-white' : 'text-slate-500'}`}>
              {step.name}
            </div>
            <div className={`text-xs mt-1 ${currentStep === i ? 'text-red-400' : 'text-slate-500'}`}>
              {currentStep >= i ? step.action : '...'}
            </div>
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 rounded-b-xl overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all duration-100"
                style={{ width: `${getStepProgress(i)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Attack Log */}
      <div className="bg-[#0a0a0a] rounded-lg p-2 font-mono text-xs leading-relaxed border border-red-500/30 relative z-10 isolate shadow-xl space-y-1">
        <div className="text-red-500">root@attacker:~# ./ooda_loop.py --target msft365</div>
        {currentStep >= 0 && <div className="text-green-400">[+] Token captured from phishing page</div>}
        {currentStep >= 1 && <div className="text-yellow-400">[*] Analyzing org structure via Graph API...</div>}
        {currentStep >= 2 && <div className="text-yellow-400">[*] Target identified: CFO inbox</div>}
        {currentStep >= 3 && <div className="text-green-400">[+] Inbox rule created: "Auto-Forward to attacker@evil.com"</div>}
        {elapsed >= totalTime && (
          <div className="text-red-500 font-bold animate-pulse">
            [!] ATTACK COMPLETE - Mean Time to Pwn: 42 seconds
          </div>
        )}
        {currentStep === -1 && <div className="text-slate-500">Waiting to start...</div>}
      </div>

      {/* Defender comparison */}
      {elapsed >= totalTime && (
        <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700 animate-in fade-in">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-slate-400 text-sm">Meanwhile, your SOC's SLA:</div>
              <div className="text-4xl font-black text-slate-300">15:00 minutes</div>
            </div>
            <div className="text-red-500 text-2xl font-bold">
              Attacker wins by 14:18
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
