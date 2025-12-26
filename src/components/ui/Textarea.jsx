import React, { forwardRef } from 'react';
import './Textarea.css';

const Textarea = forwardRef(({
  placeholder,
  value,
  onChange,
  label,
  error,
  disabled = false,
  fullWidth = false,
  className = '',
  icon,
  rows = 4,
  ...props
}, ref) => {
  const textareaClasses = [
    'textarea',
    error && 'textarea-error',
    disabled && 'textarea-disabled',
    fullWidth && 'textarea-full-width',
    icon && 'textarea-with-icon',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={`textarea-group ${fullWidth ? 'textarea-group-full-width' : ''}`}>
      {label && <label className="textarea-label">{label}</label>}
      <div className="textarea-wrapper">
        {icon && <span className="textarea-icon">{icon}</span>}
        <textarea
          ref={ref}
          className={textareaClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          rows={rows}
          {...props}
        />
      </div>
      {error && <span className="textarea-error-message">{error}</span>}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;

