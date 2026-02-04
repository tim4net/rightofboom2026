import React from 'react';
import { TOKENS, tw } from '../../config/tokens';

/**
 * StatusBadge - Colored status indicator
 *
 * @param {object} props
 * @param {string} [props.variant='neutral'] - 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'critical' | 'high' | 'medium' | 'low'
 * @param {string} [props.className] - Additional classes
 * @param {React.ReactNode} props.children
 */
export function StatusBadge({
  variant = 'neutral',
  className = '',
  children,
  ...props
}) {
  const variantClasses = {
    success: TOKENS.badge.success,
    error: TOKENS.badge.error,
    warning: TOKENS.badge.warning,
    info: TOKENS.badge.info,
    neutral: TOKENS.badge.neutral,
    // Severity variants
    critical: TOKENS.badge.critical,
    high: TOKENS.badge.high,
    medium: TOKENS.badge.medium,
    low: TOKENS.badge.low,
  };

  return (
    <span className={tw(variantClasses[variant] || variantClasses.neutral, className)} {...props}>
      {children}
    </span>
  );
}

/**
 * APIStatusBadge - Badge showing API availability status
 */
export function APIStatusBadge({ name, available }) {
  return (
    <StatusBadge variant={available ? 'success' : 'error'}>
      {name} {available ? '✓' : '✗'}
    </StatusBadge>
  );
}

/**
 * SeverityBadge - Badge for severity levels
 */
export function SeverityBadge({ severity }) {
  const severityMap = {
    critical: 'critical',
    high: 'high',
    medium: 'medium',
    low: 'low',
  };

  return (
    <StatusBadge variant={severityMap[severity?.toLowerCase()] || 'neutral'}>
      {severity}
    </StatusBadge>
  );
}

export default StatusBadge;
