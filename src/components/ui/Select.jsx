import React from 'react';
import { ChevronDown } from 'lucide-react';
import './Select.css';

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
  const selectClasses = [
    'select',
    fullWidth && 'select-full-width',
    disabled && 'select-disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="select-wrapper">
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
      <ChevronDown size={16} className="select-icon" />
    </div>
  );
};

export default Select;

