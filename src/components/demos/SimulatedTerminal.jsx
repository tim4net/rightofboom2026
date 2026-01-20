import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { TERMINAL_CONFIG } from '../../config/typography';

/**
 * Simulated Terminal Component
 * Displays pre-recorded terminal output with typing animation
 * Used as fallback when no live VM is available
 */
export const SimulatedTerminal = forwardRef(function SimulatedTerminal(
  { className = '', style = {} },
  ref
) {
  const [lines, setLines] = useState([{ type: 'prompt', content: '$ ' }]);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef(null);
  const queueRef = useRef([]);
  const processingRef = useRef(false);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  // Process queued commands
  const processQueue = async () => {
    if (processingRef.current || queueRef.current.length === 0) return;
    processingRef.current = true;

    while (queueRef.current.length > 0) {
      const { command, output, onComplete } = queueRef.current.shift();
      await typeCommand(command, output);
      onComplete?.();
    }

    processingRef.current = false;
  };

  // Execute a command (paste instantly, then show output)
  const typeCommand = async (command, output) => {
    setIsTyping(true);

    // Paste command instantly (like a real paste)
    const commandLines = command.split('\n');
    setLines(prev => {
      const newLines = [...prev];
      // Replace last prompt with first command line
      newLines[newLines.length - 1] = {
        type: 'command',
        content: commandLines[0]
      };
      // Add remaining command lines
      for (let i = 1; i < commandLines.length; i++) {
        newLines.push({ type: 'command', content: commandLines[i] });
      }
      return newLines;
    });

    // Brief pause before output (simulates execution starting)
    await new Promise(r => setTimeout(r, 400));

    // Show output line by line
    const outputLines = output.split('\n');
    for (const line of outputLines) {
      await new Promise(r => setTimeout(r, 50 + Math.random() * 30));
      setLines(prev => [...prev, { type: 'output', content: line }]);
    }

    // Add new prompt
    await new Promise(r => setTimeout(r, 300));
    setLines(prev => [...prev, { type: 'prompt', content: '$ ' }]);
    setIsTyping(false);
  };

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    executeCommand: (command, output) => {
      return new Promise(resolve => {
        queueRef.current.push({ command, output, onComplete: resolve });
        processQueue();
      });
    },
    clear: () => {
      setLines([{ type: 'prompt', content: '$ ' }]);
      queueRef.current = [];
    },
    addOutput: (output) => {
      const outputLines = output.split('\n');
      setLines(prev => [
        ...prev.slice(0, -1), // Remove last prompt
        ...outputLines.map(line => ({ type: 'output', content: line })),
        { type: 'prompt', content: '$ ' }
      ]);
    }
  }));

  return (
    <div
      className={`relative ${className}`}
      style={{
        background: '#0a0a0a',
        borderRadius: '6px',
        border: '1px solid rgba(255,50,50,0.3)',
        ...style
      }}
    >
      {/* Status indicator */}
      <div
        style={{
          position: 'absolute',
          top: '6px',
          right: '8px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '10px',
          color: '#6b7280'
        }}
      >
        <span>SIMULATED</span>
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: isTyping ? '#f59e0b' : '#22c55e'
          }}
        />
      </div>

      {/* Terminal content */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          padding: '24px 12px 12px 12px',
          fontFamily: TERMINAL_CONFIG.fontFamily,
          fontSize: `${TERMINAL_CONFIG.fontSize}px`,
          lineHeight: TERMINAL_CONFIG.lineHeight,
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              color: line.type === 'output' ? '#a0a0a0' : '#e0e0e0',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all'
            }}
          >
            {line.type === 'prompt' ? (
              <>
                <span style={{ color: '#ff3333' }}>root@kali</span>
                <span style={{ color: '#666' }}>:</span>
                <span style={{ color: '#3399ff' }}>~</span>
                <span style={{ color: '#666' }}># </span>
                {i === lines.length - 1 && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '16px',
                      background: '#ff3333',
                      marginLeft: '2px',
                      animation: 'blink 1s step-end infinite'
                    }}
                  />
                )}
              </>
            ) : line.type === 'command' ? (
              <>
                {i === 0 || lines[i - 1].type !== 'command' ? (
                  <>
                    <span style={{ color: '#ff3333' }}>root@kali</span>
                    <span style={{ color: '#666' }}>:</span>
                    <span style={{ color: '#3399ff' }}>~</span>
                    <span style={{ color: '#666' }}># </span>
                  </>
                ) : null}
                <span style={{ color: '#22c55e' }}>{line.content}</span>
              </>
            ) : (
              line.content
            )}
          </div>
        ))}
      </div>

      {/* Blink animation */}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
});

export default SimulatedTerminal;
