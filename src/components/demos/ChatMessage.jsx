import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { CHAT_CONFIG } from '../../config/typography';

/**
 * Chat message component for attacker/AI conversation display
 * Supports typing animation, code block rendering with copy button, and bold text
 */
export function ChatMessage({ role, content, animate = false, onComplete, onTypingProgress }) {
  const [displayedContent, setDisplayedContent] = useState(animate ? '' : content);
  const [isComplete, setIsComplete] = useState(!animate);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    if (!animate) {
      setDisplayedContent(content);
      setIsComplete(true);
      return;
    }

    setDisplayedContent('');
    setIsComplete(false);

    // Fast typing animation - reveal in chunks for speed
    const chunkSize = 3;
    let index = 0;
    let lastScrollTime = 0;

    const timer = setInterval(() => {
      index += chunkSize;
      if (index >= content.length) {
        setDisplayedContent(content);
        setIsComplete(true);
        // Defer scroll until after React commits the DOM update
        requestAnimationFrame(() => {
          onTypingProgress?.();
          onComplete?.();
        });
        clearInterval(timer);
      } else {
        setDisplayedContent(content.slice(0, index));
        // Throttle scroll updates to prevent bouncing
        const now = Date.now();
        if (now - lastScrollTime >= 100) {
          lastScrollTime = now;
          requestAnimationFrame(() => onTypingProgress?.());
        }
      }
    }, 15);

    return () => clearInterval(timer);
  }, [content, animate, onComplete, onTypingProgress]);

  // Copy code to clipboard
  const copyCode = async (code, index) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Parse inline markdown (bold)
  const parseInlineMarkdown = (text) => {
    const parts = [];
    const boldRegex = /\*\*(.+?)\*\*/g;
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
      }
      parts.push({ type: 'bold', content: match[1] });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content: text }];
  };

  // Render text with inline formatting
  const renderText = (text) => {
    const inlineParts = parseInlineMarkdown(text);
    return inlineParts.map((part, i) => {
      if (part.type === 'bold') {
        return <strong key={i} className="text-white font-semibold">{part.content}</strong>;
      }
      return <span key={i}>{part.content}</span>;
    });
  };

  // Parse content to extract code blocks
  const renderContent = (text) => {
    const parts = [];
    const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index)
        });
      }
      // Add code block
      parts.push({
        type: 'code',
        language: match[1] || 'bash',
        content: match[2].trim()
      });
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex)
      });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content: text }];
  };

  const isUser = role === 'user';
  const parts = renderContent(displayedContent);

  return (
    <div className={`flex gap-3 ${isUser ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div
        className={`${CHAT_CONFIG.avatarSize} rounded-full flex items-center justify-center ${CHAT_CONFIG.avatarTextSize} font-bold shrink-0 ${
          isUser
            ? 'bg-red-900/50 text-red-400 border border-red-500/30'
            : 'bg-purple-900/50 text-purple-400 border border-purple-500/30'
        }`}
      >
        {isUser ? '👤' : '🤖'}
      </div>

      {/* Message bubble */}
      <div
        className={`flex-1 rounded-lg p-4 ${
          isUser
            ? 'bg-red-950/40 border border-red-500/20'
            : 'bg-purple-950/40 border border-purple-500/20'
        }`}
      >
        {/* Role label */}
        <div className={`${CHAT_CONFIG.labelSize} font-semibold mb-2 ${isUser ? 'text-red-400' : 'text-purple-400'}`}>
          {isUser ? 'ATTACKER' : 'AI ASSISTANT'}
        </div>

        {/* Content */}
        <div className={`${CHAT_CONFIG.contentSize} ${CHAT_CONFIG.contentLineHeight}`}>
          {parts.map((part, i) => (
            part.type === 'code' ? (
              <div key={i} className="my-2 rounded bg-black/50 border border-slate-700/50 overflow-hidden">
                <div className="px-2 py-1 bg-slate-800/50 text-xs text-slate-400 border-b border-slate-700/50 flex items-center justify-between">
                  <span>{part.language}</span>
                  <button
                    onClick={() => copyCode(part.content, i)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-700/50 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copiedIndex === i ? (
                      <>
                        <Check size={12} className="text-green-400" />
                        <span className="text-green-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className={`p-3 ${CHAT_CONFIG.codeSize} font-mono text-green-400 overflow-x-auto whitespace-pre-wrap`}>
                  {part.content}
                </pre>
              </div>
            ) : (
              <span key={i} className="text-slate-200 whitespace-pre-wrap">
                {renderText(part.content)}
              </span>
            )
          ))}
          {!isComplete && <span className="animate-pulse">▊</span>}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
