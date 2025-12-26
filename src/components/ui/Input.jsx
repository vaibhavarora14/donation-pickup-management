import React, { forwardRef } from 'react';
import './Input.css';

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
  const inputClasses = [
    'input',
    error && 'input-error',
    disabled && 'input-disabled',
    fullWidth && 'input-full-width',
    icon && 'input-with-icon',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={`input-group ${fullWidth ? 'input-group-full-width' : ''}`}>
      {label && <label className="input-label">{label}</label>}
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
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
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

