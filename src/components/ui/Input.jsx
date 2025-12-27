import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  disabled = false,
  fullWidth = false,
  className = '',
  icon,
  ...props
}, ref) => {
  const inputClasses = cn(
    'w-full px-4 py-3 border rounded-full font-sans text-base text-heading bg-white transition-all outline-none',
    'focus:border-accent focus:ring-3 focus:ring-accent/10',
    error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
    disabled && 'bg-gray-100 cursor-not-allowed opacity-60',
    icon && 'pl-12',
    className
  );

  return (
    <div className={cn('flex flex-col gap-2', fullWidth && 'w-full')}>
      {label && <label className="text-sm font-medium text-heading mb-1">{label}</label>}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-4 text-body opacity-50 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

