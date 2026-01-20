import { useEffect, useRef, useState, useCallback } from 'react';
import { Monitor, RefreshCw } from 'lucide-react';

/**
 * SPICE Viewer Component
 * Embeds a libvirt VM display using spice-html5
 *
 * Prerequisites:
 * 1. VM must be configured with SPICE display
 * 2. websockify must be running to proxy SPICE to WebSocket
 *    Example: websockify 5900 localhost:5901
 * 3. Server must proxy /spice to websockify
 */
export function SpiceViewer({
  className = '',
  style = {},
  vmName = 'Windows Target',
  wsPort = 5900,
  onConnect,
  onDisconnect
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const spiceRef = useRef(null);

  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [vmStatus, setVmStatus] = useState('unknown'); // unknown, running, stopped

  // Check VM status via server API
  const checkVmStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/vm/status');
      if (response.ok) {
        const data = await response.json();
        setVmStatus(data.running ? 'running' : 'stopped');
        return data.running;
      }
    } catch (e) {
      console.warn('[SpiceViewer] Could not check VM status:', e);
    }
    setVmStatus('unknown');
    return false;
  }, []);

  // Connect to SPICE server
  const connect = useCallback(async () => {
    if (connecting || connected) return;

    setConnecting(true);
    setError(null);

    try {
      // Dynamically import spice-html5
      // Note: spice-html5 needs to be installed or included in public/
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/spice`;

      // Check if SpiceMainConn is available
      if (typeof window.SpiceMainConn === 'undefined') {
        // Try to load spice-html5 script dynamically
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = '/spice-html5/spice.js';
          script.onload = resolve;
          script.onerror = () => reject(new Error('Failed to load spice-html5'));
          document.head.appendChild(script);
        });
      }

      if (typeof window.SpiceMainConn === 'undefined') {
        throw new Error('spice-html5 not available');
      }

      // Create SPICE connection
      const sc = new window.SpiceMainConn({
        uri: wsUrl,
        screen_id: 'spice-screen',
        dump_id: 'debug-dump',
        message_id: 'spice-message',
        password: '', // Set if VM requires password
        onerror: (e) => {
          console.error('[SpiceViewer] SPICE error:', e);
          setError(e.message || 'Connection error');
          setConnected(false);
          setConnecting(false);
          onDisconnect?.();
        },
        onsuccess: () => {
          console.log('[SpiceViewer] SPICE connected');
          setConnected(true);
          setConnecting(false);
          onConnect?.();
        },
        onagent: () => {
          console.log('[SpiceViewer] SPICE agent connected');
        }
      });

      spiceRef.current = sc;

    } catch (e) {
      console.error('[SpiceViewer] Connection failed:', e);
      setError(e.message);
      setConnecting(false);
    }
  }, [connecting, connected, onConnect, onDisconnect]);

  // Disconnect from SPICE server
  const disconnect = useCallback(() => {
    if (spiceRef.current) {
      try {
        spiceRef.current.stop();
      } catch (e) {
        console.warn('[SpiceViewer] Error stopping SPICE:', e);
      }
      spiceRef.current = null;
    }
    setConnected(false);
    onDisconnect?.();
  }, [onDisconnect]);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  }, []);

  // Check VM status on mount
  useEffect(() => {
    checkVmStatus();
    const interval = setInterval(checkVmStatus, 10000); // Check every 10s
    return () => clearInterval(interval);
  }, [checkVmStatus]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  // Handle fullscreen change
  useEffect(() => {
    const handler = () => {
      setFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        background: '#000',
        borderRadius: '6px',
        border: '1px solid rgba(59,130,246,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {/* SPICE display or placeholder */}
      <div id="spice-screen" ref={canvasRef} style={{ width: '100%', height: '100%' }}>
        {!connected && !connecting && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px' }}>
            <Monitor size={32} color="#3b82f6" opacity={0.3} />
            <span style={{ fontSize: '11px', color: '#6b7280' }}>
              {error || (vmStatus === 'stopped' ? 'VM not running' : 'VM Display')}
            </span>
            <button
              onClick={connect}
              style={{
                padding: '6px 12px',
                background: '#2563eb',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              Connect
            </button>
          </div>
        )}
        {connecting && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <RefreshCw size={24} color="#3b82f6" className="animate-spin" />
          </div>
        )}
      </div>

      {/* Hidden elements for spice-html5 */}
      <div id="debug-dump" style={{ display: 'none' }} />
      <div id="spice-message" style={{ display: 'none' }} />
    </div>
  );
}

export default SpiceViewer;
