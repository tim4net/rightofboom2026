import React from 'react';
import { TOKENS, tw } from '../../config/tokens';

/**
 * TerminalDisplay - Terminal-like output viewer
 *
 * @param {object} props
 * @param {string} [props.borderColor='red'] - 'red' | 'green' | 'blue' | 'none'
 * @param {string} [props.height='md'] - 'sm' | 'md' | 'lg' | 'xl' | 'auto'
 * @param {boolean} [props.scrollable=true] - Enable overflow scrolling
 * @param {string} [props.className] - Additional classes
 * @param {React.ReactNode} props.children
 */
export function TerminalDisplay({
  borderColor = 'red',
  height = 'md',
  scrollable = true,
  className = '',
  children,
  ...props
}) {
  const borderClasses = {
    red: TOKENS.terminal.borderRed,
    green: TOKENS.terminal.borderGreen,
    blue: TOKENS.terminal.borderBlue,
    none: '',
  };

  const heightClasses = {
    sm: TOKENS.terminal.sm,
    md: TOKENS.terminal.md,
    lg: TOKENS.terminal.lg,
    xl: TOKENS.terminal.xl,
    auto: '',
  };

  const classes = tw(
    TOKENS.terminal.withBorder,
    borderClasses[borderColor],
    heightClasses[height],
    scrollable && 'overflow-y-auto',
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

/**
 * TerminalLine - Individual line in terminal output
 */
export function TerminalLine({ type = 'info', children }) {
  const typeClasses = {
    command: 'text-red-500',
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    detail: 'text-slate-500',
    info: 'text-yellow-400',
  };

  return (
    <div className={typeClasses[type] || typeClasses.info}>
      {children}
    </div>
  );
}

export default TerminalDisplay;
