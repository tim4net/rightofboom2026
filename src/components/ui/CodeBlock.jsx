import React from 'react';
import { TOKENS, tw } from '../../config/tokens';

/**
 * CodeBlock - Syntax-highlighted code display
 *
 * @param {object} props
 * @param {string} [props.variant='block'] - 'inline' | 'block'
 * @param {string} [props.color='default'] - 'default' | 'red' | 'green'
 * @param {string} [props.className] - Additional classes
 * @param {React.ReactNode} props.children
 */
export function CodeBlock({
  variant = 'block',
  color = 'default',
  className = '',
  children,
  ...props
}) {
  const variantClasses = {
    inline: {
      default: TOKENS.code.inline,
      red: TOKENS.code.inlineRed,
      green: TOKENS.code.inlineGreen,
    },
    block: {
      default: TOKENS.code.block,
      red: tw(TOKENS.code.block, 'text-red-400'),
      green: tw(TOKENS.code.block, 'text-green-400'),
    },
  };

  const classes = variantClasses[variant]?.[color] || variantClasses.block.default;

  if (variant === 'inline') {
    return (
      <code className={tw(classes, className)} {...props}>
        {children}
      </code>
    );
  }

  return (
    <pre className={tw(classes, className)} {...props}>
      <code>{children}</code>
    </pre>
  );
}

/**
 * InlineCode - Shorthand for inline code
 */
export function InlineCode({ color = 'default', children, ...props }) {
  return (
    <CodeBlock variant="inline" color={color} {...props}>
      {children}
    </CodeBlock>
  );
}

export default CodeBlock;
