import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Terminal, Loader2 } from 'lucide-react';

/**
 * PowerShell Code Display Slide
 *
 * Fetches and displays the FULL Invoke-SafeEndpointValidation.ps1 script
 * with syntax highlighting. Scrollable view of the entire file.
 * DRY - loads the actual script from /scripts/
 */

// Tokenize a line into syntax-highlighted spans
const tokenizeLine = (line) => {
  const tokens = [];
  let remaining = line;
  let key = 0;

  // Patterns in order of precedence
  const patterns = [
    { regex: /#.*$/, className: 'text-slate-500 italic' },
    { regex: /"(?:[^"\\]|\\.)*"/, className: 'text-amber-400' },
    { regex: /'(?:[^'\\]|\\.)*'/, className: 'text-amber-400' },
    { regex: /\$[\w:]+/, className: 'text-purple-400' },
    { regex: /\b(function|param|if|else|elseif|foreach|try|catch|finally|return|switch|default|break|continue)\b/i, className: 'text-pink-400 font-semibold' },
    { regex: /(Get-|Set-|New-|Add-|Remove-|Test-|Write-|Invoke-|Select-|Where-|ForEach-|Start-|Stop-|Out-|ConvertTo-|ConvertFrom-|Join-|Split-|Measure-)\w+/, className: 'text-blue-400' },
    { regex: /\b(-eq|-ne|-gt|-lt|-ge|-le|-like|-match|-contains|-in|-not|-and|-or|-split|-join|-replace)\b/, className: 'text-cyan-400' },
    { regex: /\b(PASS)\b/, className: 'text-emerald-400 font-bold' },
    { regex: /\b(FAIL|ERROR)\b/, className: 'text-red-400 font-bold' },
    { regex: /\b(WARN)\b/, className: 'text-amber-400 font-bold' },
    { regex: /\b(SKIP|INFO)\b/, className: 'text-blue-400 font-bold' },
    { regex: /\[[\w\[\]\.]+\]/, className: 'text-teal-400' }, // Type annotations
    { regex: /@\{/, className: 'text-orange-400' }, // Hashtable start
    { regex: /@\(/, className: 'text-orange-400' }, // Array start
  ];

  while (remaining.length > 0) {
    let earliestMatch = null;
    let earliestIndex = remaining.length;
    let matchedPattern = null;

    for (const pattern of patterns) {
      const match = remaining.match(pattern.regex);
      if (match && match.index < earliestIndex) {
        earliestMatch = match;
        earliestIndex = match.index;
        matchedPattern = pattern;
      }
    }

    if (earliestMatch && matchedPattern) {
      // Add text before match
      if (earliestIndex > 0) {
        tokens.push(<span key={key++} className="text-slate-300">{remaining.slice(0, earliestIndex)}</span>);
      }
      // Add matched token
      tokens.push(<span key={key++} className={matchedPattern.className}>{earliestMatch[0]}</span>);
      remaining = remaining.slice(earliestIndex + earliestMatch[0].length);
    } else {
      // No more matches, add remaining text
      tokens.push(<span key={key++} className="text-slate-300">{remaining}</span>);
      break;
    }
  }

  return tokens.length > 0 ? tokens : [<span key={0}>&nbsp;</span>];
};

// Color rotation for dynamically detected sections
const SECTION_COLORS = ['emerald', 'amber', 'red', 'blue', 'purple', 'pink', 'teal', 'cyan', 'orange', 'lime'];

// Short labels for known category names
const CATEGORY_LABELS = {
  'ANTIVIRUS': 'Antivirus',
  'ATTACK SURFACE REDUCTION': 'ASR Rules',
  'CREDENTIAL PROTECTION': 'Credentials',
  'NETWORK SECURITY': 'Network',
  'ENCRYPTION': 'Encryption',
  'LOCAL SECURITY': 'Local',
  'REMOTE ACCESS': 'Remote',
  'LOGGING & VISIBILITY': 'Logging',
  'LOGGING': 'Logging',
};

// Extract section headers from script by detecting patterns:
// 1. Lines starting with "# CATEGORY: NAME"
// 2. Lines like "# MAIN EXECUTION" or "# BUILD OUTPUT" (between === separators)
const extractJumpPoints = (scriptText) => {
  const lines = scriptText.split('\n');
  const jumpPoints = [];
  let colorIndex = 0;

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();

    // Match # CATEGORY: SOMETHING
    const categoryMatch = trimmed.match(/^#\s*CATEGORY:\s*(.+)/i);
    if (categoryMatch) {
      const fullName = categoryMatch[1].trim();
      const label = CATEGORY_LABELS[fullName.toUpperCase()] || fullName.split(/\s+/).slice(0, 2).join(' ');

      jumpPoints.push({
        label,
        line: lineNum,
        color: SECTION_COLORS[colorIndex % SECTION_COLORS.length]
      });
      colorIndex++;
      return;
    }

    // Match major sections like "# MAIN EXECUTION" or "# BUILD OUTPUT"
    // These are lines that are ALL CAPS, between === separator lines
    if (trimmed.match(/^#\s*(MAIN EXECUTION|BUILD OUTPUT|HELPER FUNCTIONS|INITIALIZATION)/i)) {
      const sectionMatch = trimmed.match(/^#\s*(.+)/);
      if (sectionMatch) {
        const fullName = sectionMatch[1].trim();
        const label = fullName.split(/\s+/).slice(0, 2).join(' ');

        jumpPoints.push({
          label,
          line: lineNum,
          color: SECTION_COLORS[colorIndex % SECTION_COLORS.length]
        });
        colorIndex++;
      }
    }
  });

  return jumpPoints;
};

const PowerShellCodeSlide = ({ theme: t }) => {
  const [script, setScript] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const lineRefs = useRef({});

  const jumpToLine = (lineNum) => {
    const lineEl = lineRefs.current[lineNum];
    if (lineEl && scrollRef.current) {
      // Get the line's position relative to the scroll container
      const containerTop = scrollRef.current.getBoundingClientRect().top;
      const lineTop = lineEl.getBoundingClientRect().top;
      const currentScroll = scrollRef.current.scrollTop;
      const targetScroll = currentScroll + (lineTop - containerTop);

      scrollRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetch('/scripts/Invoke-SafeEndpointValidation.ps1')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then(text => {
        setScript(text);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load script:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const highlightedLines = useMemo(() => {
    if (!script) return [];
    return script.split('\n').map((line, i) => ({
      lineNum: i + 1,
      tokens: tokenizeLine(line)
    }));
  }, [script]);

  const jumpPoints = useMemo(() => {
    if (!script) return [];
    return extractJumpPoints(script);
  }, [script]);

  const lineCount = highlightedLines.length;
  const lineNumWidth = String(lineCount).length;

  return (
    <div className="w-full h-full flex flex-col px-8 py-4">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Terminal className="w-8 h-8 text-amber-400" />
          <div>
            <h2 className={`text-4xl font-black ${t.textOnPage}`}>
              The PowerShell Behind It
            </h2>
            <p className="text-xl text-slate-400">
              Real code. No magic. 100% auditable.
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg text-amber-400 font-mono">
            /scripts/Invoke-SafeEndpointValidation.ps1
          </div>
          <div className="text-lg text-slate-500">
            {lineCount > 0 ? `${lineCount.toLocaleString()} lines` : ''} • MIT Licensed
          </div>
        </div>
      </div>

      {/* Full Code Display */}
      <div className={`flex-1 ${t.cardBg} rounded-xl border border-amber-500/30 overflow-hidden min-h-0`}>
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
            <span className="ml-3 text-xl text-slate-400">Loading script...</span>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center">
            <span className="text-xl text-red-400">Failed to load: {error}</span>
          </div>
        ) : (
          <div ref={scrollRef} className="h-full overflow-auto">
            <pre className="font-mono text-base leading-relaxed p-4">
              {highlightedLines.map(({ lineNum, tokens }) => (
                <div
                  key={lineNum}
                  ref={(el) => { lineRefs.current[lineNum] = el; }}
                  className="flex hover:bg-slate-700/30"
                >
                  <span
                    className="text-slate-600 select-none text-right mr-4 flex-shrink-0"
                    style={{ width: `${lineNumWidth + 1}ch` }}
                  >
                    {lineNum}
                  </span>
                  <span className="flex-1 whitespace-pre">{tokens}</span>
                </div>
              ))}
            </pre>
          </div>
        )}
      </div>

      {/* Jump Navigation */}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <span className="text-lg text-slate-500 mr-2">Jump to:</span>
        {jumpPoints.map((point) => {
          const colorClasses = {
            emerald: 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-emerald-500/40',
            amber: 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border-amber-500/40',
            red: 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/40',
            blue: 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/40',
            purple: 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-purple-500/40',
            pink: 'bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 border-pink-500/40',
            teal: 'bg-teal-500/20 text-teal-400 hover:bg-teal-500/30 border-teal-500/40',
            cyan: 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border-cyan-500/40',
            orange: 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border-orange-500/40',
            lime: 'bg-lime-500/20 text-lime-400 hover:bg-lime-500/30 border-lime-500/40',
          };
          return (
            <button
              key={point.label}
              onClick={() => jumpToLine(point.line)}
              className={`px-3 py-1.5 rounded-lg text-base font-medium border transition-colors ${colorClasses[point.color]}`}
            >
              {point.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PowerShellCodeSlide;
