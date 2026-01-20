import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// ============================================================================
// LIVE CLAUDE CODE DEMO - Interactive AI assistant terminal
// This shows Claude Code running live for interactive demonstrations
// ============================================================================

// Wrapper to lazy-load the terminal component
const ClaudeTerminalWrapper = ({ theme }) => {
  const [Terminal, setTerminal] = useState(null);

  useEffect(() => {
    import('../ClaudeTerminal').then(mod => {
      setTerminal(() => mod.ClaudeTerminal);
    });
  }, []);

  if (!Terminal) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
        <span className="ml-2 text-slate-400">Loading terminal...</span>
      </div>
    );
  }

  return <Terminal theme="dark" className="h-[500px]" />;
};

export const ClaudeCodeDemo = ({ theme }) => {
  return (
    <div className="w-full max-w-[90vw] mx-auto">
      <div className="text-center mb-4">
        <h2 className={`text-3xl md:text-4xl font-black mb-2 ${theme.textOnPage}`}>
          Live Claude Code Session
        </h2>
        <p className={`text-lg ${theme.accentColor}`}>
          Interactive AI assistant - ask questions, write code, explore the codebase
        </p>
      </div>

      <div className={`${theme.cardBg} rounded-xl border ${theme.cardBorder} overflow-hidden`}>
        {/* Import and render the terminal */}
        <ClaudeTerminalWrapper theme={theme} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
        <div className={`${theme.cardBg} rounded-lg p-3 border ${theme.cardBorder}`}>
          <div className={`${theme.accentColor} font-bold`}>Keyboard</div>
          <div className="text-slate-500">Ctrl+Shift+C/V for copy/paste</div>
        </div>
        <div className={`${theme.cardBg} rounded-lg p-3 border ${theme.cardBorder}`}>
          <div className={`${theme.accentColor} font-bold`}>Session</div>
          <div className="text-slate-500">Persists across page refresh</div>
        </div>
        <div className={`${theme.cardBg} rounded-lg p-3 border ${theme.cardBorder}`}>
          <div className={`${theme.accentColor} font-bold`}>Exit</div>
          <div className="text-slate-500">Type /exit or Ctrl+C to stop</div>
        </div>
      </div>
    </div>
  );
};
