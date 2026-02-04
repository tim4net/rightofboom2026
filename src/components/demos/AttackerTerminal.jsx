import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { TERMINAL_CONFIG } from '../../config/typography';
import { TIMING, TERMINAL } from '../../config/presentation';

/**
 * Attacker Terminal Component
 * Embeds a live bash session with pentesting tools using xterm.js + WebSocket
 * Red-themed for attacker perspective
 *
 * Exposes methods via ref:
 * - sendCommand(cmd): Types and sends a command with realistic typing
 * - sendRaw(data): Sends raw data to terminal
 * - clear(): Clears the terminal
 */
// Clear sessions on HMR to get fresh terminals
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    // Clear all terminal sessions
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('terminal-session-')) {
        sessionStorage.removeItem(key);
      }
    });
  });
}

export const AttackerTerminal = forwardRef(function AttackerTerminal(
  { className = '', style = {}, onCommand, sessionKey = 'attacker' },
  ref
) {
  const terminalRef = useRef(null);
  const terminalInstanceRef = useRef(null);
  const fitAddonRef = useRef(null);
  const socketRef = useRef(null);
  const sessionIdRef = useRef(null);
  const mountedRef = useRef(true);
  const reconnectTimeoutRef = useRef(null);
  const onCommandRef = useRef(onCommand);

  const storageKey = `terminal-session-${sessionKey}`;

  const [connected, setConnected] = useState(false);

  // Keep onCommand ref updated without triggering re-renders
  useEffect(() => {
    onCommandRef.current = onCommand;
  }, [onCommand]);

  useEffect(() => {
    if (!terminalRef.current) return;

    mountedRef.current = true;

    // Restore session ID from storage (unique per sessionKey)
    const savedSession = sessionStorage.getItem(storageKey);
    if (savedSession) {
      sessionIdRef.current = savedSession;
    }

    const connect = () => {
      if (!mountedRef.current) return;
      if (socketRef.current?.readyState === WebSocket.OPEN) return;
      if (socketRef.current?.readyState === WebSocket.CONNECTING) return;

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = sessionIdRef.current
        ? `${protocol}//${window.location.host}/terminal/attacker?sessionId=${sessionIdRef.current}`
        : `${protocol}//${window.location.host}/terminal/attacker`;

      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        if (!mountedRef.current) {
          socket.close();
          return;
        }
        setConnected(true);

        // Send initial terminal dimensions
        if (terminalInstanceRef.current) {
          const { cols, rows } = terminalInstanceRef.current;
          socket.send(JSON.stringify({ type: 'resize', cols, rows }));
        }
      };

      socket.onmessage = (event) => {
        if (!mountedRef.current) return;
        const data = event.data;

        // Check for control messages
        if (data.length > 8 && data[0] === '{' && data.slice(0, 8) === '{"type":') {
          try {
            const msg = JSON.parse(data);
            if (msg.type === 'session' && msg.sessionId) {
              sessionIdRef.current = msg.sessionId;
              sessionStorage.setItem(storageKey, msg.sessionId);
              return;
            }
            if (msg.type === 'takeover') {
              terminalInstanceRef.current?.write('\r\n\x1b[31mSession taken over by another client\x1b[0m\r\n');
              return;
            }
          } catch (e) {
            // Not JSON, write to terminal
          }
        }

        // Write data to terminal
        terminalInstanceRef.current?.write(data);
      };

      socket.onerror = (error) => {
        console.error('[AttackerTerminal] WebSocket error:', error);
      };

      socket.onclose = () => {
        if (!mountedRef.current) return;
        setConnected(false);
        // Auto-reconnect after configured delay
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, TIMING.reconnectDelay);
      };
    };

    // Attacker-themed colors (red/black)
    const attackerTheme = {
      background: '#0a0a0a',
      foreground: '#e0e0e0',
      cursor: '#ff3333',
      cursorAccent: '#0a0a0a',
      selection: 'rgba(255, 51, 51, 0.3)',
      black: '#0a0a0a',
      red: '#ff3333',
      green: '#00ff00',
      yellow: '#ffff00',
      blue: '#3399ff',
      magenta: '#ff33ff',
      cyan: '#00ffff',
      white: '#e0e0e0',
      brightBlack: '#666666',
      brightRed: '#ff6666',
      brightGreen: '#66ff66',
      brightYellow: '#ffff66',
      brightBlue: '#66b3ff',
      brightMagenta: '#ff66ff',
      brightCyan: '#66ffff',
      brightWhite: '#ffffff'
    };

    // Create terminal instance
    const terminal = new Terminal({
      cursorBlink: true,
      fontSize: TERMINAL_CONFIG.fontSize,
      fontFamily: TERMINAL_CONFIG.fontFamily,
      theme: attackerTheme,
      allowProposedApi: true,
      scrollback: TERMINAL.scrollback,
    });

    terminalInstanceRef.current = terminal;

    // Add fit addon
    const fitAddon = new FitAddon();
    fitAddonRef.current = fitAddon;
    terminal.loadAddon(fitAddon);

    // Skip WebGL - use canvas renderer for reliability
    // WebGL can fail silently on some systems

    // Open terminal in container
    terminal.open(terminalRef.current);

    // Delay fit and connect to ensure container has dimensions
    requestAnimationFrame(() => {
      fitAddon.fit();
      // Connect after terminal is ready
      connect();
    });

    // Handle terminal input -> WebSocket
    terminal.onData((data) => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(data);
        // Notify parent of command if callback provided
        if (onCommandRef.current && data === '\r') {
          onCommandRef.current();
        }
      }
    });

    // Handle resize
    terminal.onResize(({ cols, rows }) => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ type: 'resize', cols, rows }));
      }
    });

    // ResizeObserver for container resize
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        fitAddon.fit();
      });
    });
    resizeObserver.observe(terminalRef.current);

    // Cleanup
    return () => {
      mountedRef.current = false;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      resizeObserver.disconnect();
      socketRef.current?.close();
      terminal.dispose();
    };
  }, []); // No dependencies - run once on mount

  // Copy keyboard shortcut (paste is handled natively by xterm)
  useEffect(() => {
    const terminal = terminalInstanceRef.current;
    if (!terminal) return;

    const handler = (event) => {
      // Copy: Cmd+C (Mac) or Ctrl+Shift+C (Linux/Windows)
      const isCopy = (
        (event.metaKey && event.key === 'c' && !event.shiftKey && !event.ctrlKey) ||
        (event.ctrlKey && event.shiftKey && event.key === 'C')
      );

      if (isCopy && terminal.hasSelection()) {
        navigator.clipboard.writeText(terminal.getSelection());
        terminal.clearSelection();
        return false;
      }

      return true;
    };

    terminal.attachCustomKeyEventHandler(handler);
  }, []);

  // Expose methods via ref for external control
  useImperativeHandle(ref, () => ({
    /**
     * Send a command (paste instantly)
     * @param {string} command - Command to send
     * @returns {Promise} Resolves when command is sent
     */
    sendCommand: async (command) => {
      if (socketRef.current?.readyState !== WebSocket.OPEN) {
        console.warn('[AttackerTerminal] Cannot send command - socket not connected');
        return;
      }

      // Paste command instantly (like a real paste)
      socketRef.current.send(command);

      // Brief pause then send enter
      await new Promise(r => setTimeout(r, 50));
      socketRef.current.send('\r');
    },

    /**
     * Send raw data directly to terminal
     * @param {string} data - Data to send
     */
    sendRaw: (data) => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(data);
      }
    },

    /**
     * Clear the terminal screen
     */
    clear: () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send('clear\r');
      }
    },

    /**
     * Check if terminal is connected
     */
    isConnected: () => socketRef.current?.readyState === WebSocket.OPEN,

    /**
     * Focus the terminal
     */
    focus: () => terminalInstanceRef.current?.focus()
  }), []);

  // Stop keyboard events from bubbling to parent app
  const handleKeyDown = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <div
      className={`relative ${className}`}
      style={{ background: '#0a0a0a', borderRadius: '6px', border: '1px solid rgba(255,50,50,0.3)', ...style }}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyDown}
      onKeyPress={handleKeyDown}
    >
      {/* Status dot */}
      <div style={{ position: 'absolute', top: '6px', right: '8px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '4px' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: connected ? '#22c55e' : '#6b7280' }} />
      </div>

      {/* Terminal */}
      <div
        ref={terminalRef}
        style={{ width: '100%', height: '100%', padding: '8px' }}
      />
    </div>
  );
});

export default AttackerTerminal;
