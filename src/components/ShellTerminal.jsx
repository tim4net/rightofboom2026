import { useEffect, useRef, useState, useCallback } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebglAddon } from '@xterm/addon-webgl';
import '@xterm/xterm/css/xterm.css';

/**
 * Shell Terminal Component
 * A plain bash shell terminal for demos - lets you type `claude` to launch it
 */
export function ShellTerminal({ theme = 'dark', className = '' }) {
  const terminalRef = useRef(null);
  const terminalInstanceRef = useRef(null);
  const fitAddonRef = useRef(null);
  const socketRef = useRef(null);
  const sessionIdRef = useRef(null);

  const [connected, setConnected] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);

  const connect = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = sessionIdRef.current
      ? `${protocol}//${window.location.host}/terminal/shell?sessionId=${sessionIdRef.current}`
      : `${protocol}//${window.location.host}/terminal/shell`;

    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      setConnected(true);
      setReconnecting(false);

      // Send initial terminal dimensions
      if (terminalInstanceRef.current) {
        const { cols, rows } = terminalInstanceRef.current;
        socket.send(JSON.stringify({ type: 'resize', cols, rows }));
      }
    };

    socket.onmessage = (event) => {
      const data = event.data;

      // Check for control messages
      if (data.length > 8 && data[0] === '{' && data.slice(0, 8) === '{"type":') {
        try {
          const msg = JSON.parse(data);
          if (msg.type === 'session' && msg.sessionId) {
            sessionIdRef.current = msg.sessionId;
            sessionStorage.setItem('shell-terminal-session', msg.sessionId);
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
      console.error('[ShellTerminal] WebSocket error:', error);
    };

    socket.onclose = () => {
      setConnected(false);
      // Auto-reconnect after 2 seconds
      setTimeout(() => {
        setReconnecting(true);
        connect();
      }, 2000);
    };
  }, []);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Restore session ID from storage
    const savedSession = sessionStorage.getItem('shell-terminal-session');
    if (savedSession) {
      sessionIdRef.current = savedSession;
    }

    // Create terminal instance
    const terminal = new Terminal({
      cursorBlink: true,
      fontSize: 20,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: theme === 'dark' ? {
        background: '#0d1117',
        foreground: '#c9d1d9',
        cursor: '#58a6ff',
        cursorAccent: '#0d1117',
        selection: 'rgba(88, 166, 255, 0.3)',
        black: '#0d1117',
        red: '#ff7b72',
        green: '#3fb950',
        yellow: '#d29922',
        blue: '#58a6ff',
        magenta: '#bc8cff',
        cyan: '#39c5cf',
        white: '#c9d1d9',
        brightBlack: '#484f58',
        brightRed: '#ffa198',
        brightGreen: '#56d364',
        brightYellow: '#e3b341',
        brightBlue: '#79c0ff',
        brightMagenta: '#d2a8ff',
        brightCyan: '#56d4dd',
        brightWhite: '#f0f6fc'
      } : {
        background: '#ffffff',
        foreground: '#24292e',
        cursor: '#0366d6',
        selection: 'rgba(3, 102, 214, 0.2)'
      },
      allowProposedApi: true,
      scrollback: 5000
    });

    terminalInstanceRef.current = terminal;

    // Add fit addon
    const fitAddon = new FitAddon();
    fitAddonRef.current = fitAddon;
    terminal.loadAddon(fitAddon);

    // Try WebGL renderer
    try {
      const webglAddon = new WebglAddon();
      webglAddon.onContextLoss(() => {
        console.warn('[ShellTerminal] WebGL context lost');
      });
      terminal.loadAddon(webglAddon);
    } catch (e) {
      console.warn('[ShellTerminal] WebGL not available:', e.message);
    }

    // Open terminal in container
    terminal.open(terminalRef.current);
    fitAddon.fit();

    // Handle terminal input -> WebSocket
    terminal.onData((data) => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(data);
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

    // Connect WebSocket
    connect();

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      socketRef.current?.close();
      terminal.dispose();
    };
  }, [theme, connect]);

  // Copy/paste keyboard shortcuts
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

      // Paste: Cmd+V (Mac) or Ctrl+Shift+V (Linux/Windows)
      const isPaste = (
        (event.metaKey && event.key === 'v' && !event.shiftKey && !event.ctrlKey) ||
        (event.ctrlKey && event.shiftKey && event.key === 'V')
      );

      if (isPaste) {
        event.preventDefault();
        navigator.clipboard.readText().then(text => {
          if (text && socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(text);
          }
        });
        return false;
      }

      return true;
    };

    terminal.attachCustomKeyEventHandler(handler);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Status indicator */}
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : reconnecting ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`} />
        <span className="text-xs text-gray-400">
          {connected ? 'Connected' : reconnecting ? 'Reconnecting...' : 'Disconnected'}
        </span>
      </div>

      {/* Terminal container */}
      <div
        ref={terminalRef}
        className="w-full h-full min-h-[400px] rounded-lg overflow-hidden"
        style={{ padding: '8px', background: theme === 'dark' ? '#0d1117' : '#ffffff' }}
      />
    </div>
  );
}

export default ShellTerminal;
