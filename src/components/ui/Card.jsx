import React from 'react';
import { TOKENS, tw } from '../../config/tokens';

/**
 * Card - Themed container component
 *
 * @param {object} props
 * @param {string} [props.variant='default'] - 'default' | 'red' | 'green' | 'blue' | 'yellow' | 'orange'
 * @param {string} [props.size='md'] - 'sm' | 'md' | 'lg' | 'xl'
 * @param {string} [props.className] - Additional classes
 * @param {React.ReactNode} props.children
 */
export function Card({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const variantClasses = {
    default: TOKENS.card.padded,
    red: TOKENS.card.red,
    green: TOKENS.card.green,
    blue: TOKENS.card.blue,
    yellow: TOKENS.card.yellow,
    orange: TOKENS.card.orange,
  };

  const sizeClasses = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  // For size variants, we use the base card and add padding
  const baseClass = variant === 'default'
    ? tw(TOKENS.card.base, sizeClasses[size])
    : variantClasses[variant];

  return (
    <div className={tw(baseClass, className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
