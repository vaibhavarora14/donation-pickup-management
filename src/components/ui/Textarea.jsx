import React from 'react';
import './Textarea.css';

const Textarea = ({
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
}) => {
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
};

export default Textarea;

