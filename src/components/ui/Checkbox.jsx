import React from 'react';
import './Checkbox.css';

const Checkbox = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <label className={`checkbox ${disabled ? 'checkbox-disabled' : ''} ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="checkbox-input"
        {...props}
      />
      <span className="checkbox-label">{label}</span>
    </label>
  );
};

export default Checkbox;

