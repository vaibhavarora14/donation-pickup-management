import React from 'react';
import { cn } from '../../utils/cn';

const Checkbox = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <label className={cn(
      'flex items-center gap-2.5 cursor-pointer text-sm select-none',
      disabled && 'cursor-not-allowed opacity-60',
      className
    )}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-[18px] h-[18px] cursor-pointer accent-call-to-action m-0 disabled:cursor-not-allowed"
        {...props}
      />
      <span className={cn(
        'text-title transition-colors',
        checked && 'text-call-to-action font-medium'
      )}>
        {label}
      </span>
    </label>
  );
};

export default Checkbox;

