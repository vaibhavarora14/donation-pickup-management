import React from 'react';
import { cn } from '../../utils/cn';

const Radio = ({
  name,
  value,
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <label className={cn(
      'flex items-center gap-2.5 cursor-pointer text-sm font-medium text-gray-700 tracking-[0.7px] select-none',
      disabled && 'cursor-not-allowed opacity-60',
      className
    )}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-[18px] h-[18px] cursor-pointer accent-call-to-action m-0 disabled:cursor-not-allowed"
        {...props}
      />
      <span className={cn(
        'transition-colors',
        checked && 'text-call-to-action font-medium'
      )}>
        {label || value}
      </span>
    </label>
  );
};

export default Radio;

