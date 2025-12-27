import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const Select = ({
  value,
  onChange,
  options = [],
  placeholder = 'Select...',
  className = '',
  disabled = false,
  fullWidth = false,
  ...props
}) => {
  const selectClasses = cn(
    'appearance-none bg-white border border-[#d7e1ea] rounded-full px-5 py-3 pr-10 font-sans text-base text-heading cursor-pointer transition-all outline-none',
    'focus:border-accent focus:ring-3 focus:ring-accent/10',
    disabled && 'bg-gray-100 cursor-not-allowed opacity-60',
    fullWidth && 'w-full',
    className
  );

  return (
    <div className="relative inline-block">
      <select
        className={selectClasses}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const optionLabel = typeof option === 'string' ? option : option.label;
          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
      <ChevronDown size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-body opacity-60" />
    </div>
  );
};

export default Select;

