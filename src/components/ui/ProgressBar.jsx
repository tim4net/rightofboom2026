import React from 'react';
import { TOKENS, tw } from '../../config/tokens';

/**
 * ProgressBar - Animated progress indicator
 *
 * @param {object} props
 * @param {number} props.value - Progress value (0-100)
 * @param {string} [props.color='blue'] - 'red' | 'green' | 'blue' | 'yellow'
 * @param {boolean} [props.animated=true] - Enable transition animation
 * @param {string} [props.className] - Additional classes
 */
export function ProgressBar({
  value,
  color = 'blue',
  animated = true,
  className = '',
  ...props
}) {
  const colorClasses = {
    red: TOKENS.progress.barRed,
    green: TOKENS.progress.barGreen,
    blue: TOKENS.progress.barBlue,
    yellow: TOKENS.progress.barYellow,
  };

  const barClass = tw(
    TOKENS.progress.bar,
    colorClasses[color] || colorClasses.blue,
    animated && 'transition-all duration-300'
  );

  return (
    <div className={tw(TOKENS.progress.track, className)} {...props}>
      <div
        className={barClass}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export default ProgressBar;
