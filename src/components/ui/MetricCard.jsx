import React from 'react';
import { TOKENS, tw } from '../../config/tokens';

/**
 * MetricCard - Stats/metrics display card
 *
 * @param {object} props
 * @param {string|number} props.value - The metric value to display
 * @param {string} props.label - Description label
 * @param {string} [props.valueColor] - Tailwind text color class (e.g., 'text-red-400')
 * @param {string} [props.className] - Additional classes
 */
export function MetricCard({
  value,
  label,
  valueColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <div className={tw(TOKENS.metric.container, className)} {...props}>
      <div className={tw(TOKENS.metric.value, valueColor)}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className={TOKENS.metric.label}>{label}</div>
    </div>
  );
}

/**
 * MetricGrid - Grid container for multiple MetricCards
 */
export function MetricGrid({ children, cols = 5, className = '' }) {
  const colsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  };

  return (
    <div className={tw('grid gap-4', colsClass[cols] || 'grid-cols-5', className)}>
      {children}
    </div>
  );
}

export default MetricCard;
