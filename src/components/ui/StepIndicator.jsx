import React from 'react';
import { Loader2 } from 'lucide-react';
import { TOKENS, tw } from '../../config/tokens';

/**
 * StepIndicator - Progress step for wizards/multi-step processes
 *
 * @param {object} props
 * @param {string} props.name - Step name
 * @param {string} [props.icon] - Emoji or icon
 * @param {'pending' | 'active' | 'complete'} [props.status='pending'] - Step status
 * @param {string} [props.className] - Additional classes
 */
export function StepIndicator({
  name,
  icon,
  status = 'pending',
  className = '',
  ...props
}) {
  const statusClasses = {
    pending: TOKENS.step.pending,
    active: TOKENS.step.active,
    complete: TOKENS.step.complete,
  };

  return (
    <div className={tw(TOKENS.step.base, statusClasses[status], className)} {...props}>
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      <div className={`font-bold text-sm ${status !== 'pending' ? 'text-white' : 'text-slate-500'}`}>
        {name}
      </div>
      {status === 'active' && (
        <Loader2 className="absolute top-2 right-2 w-4 h-4 text-red-400 animate-spin" />
      )}
      {status === 'complete' && (
        <span className="absolute top-2 right-2 text-green-400">✓</span>
      )}
    </div>
  );
}

/**
 * StepProgress - Container for multiple StepIndicators
 */
export function StepProgress({ steps, currentStep, className = '' }) {
  return (
    <div className={tw('grid gap-3', className)} style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
      {steps.map((step, i) => (
        <StepIndicator
          key={step.name}
          name={step.name}
          icon={step.icon}
          status={currentStep === i ? 'active' : currentStep > i ? 'complete' : 'pending'}
        />
      ))}
    </div>
  );
}

export default StepIndicator;
