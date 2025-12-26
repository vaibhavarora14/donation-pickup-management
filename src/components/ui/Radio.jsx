import React from 'react';
import './Radio.css';

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
    <label className={`radio ${disabled ? 'radio-disabled' : ''} ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="radio-input"
        {...props}
      />
      <span className="radio-label">{label || value}</span>
    </label>
  );
};

export default Radio;

