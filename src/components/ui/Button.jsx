import React from 'react';
import { cn } from '../../utils/cn';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60';
  
  const variantClasses = {
    primary: 'bg-accent text-white hover:bg-primary-hover',
    secondary: 'bg-secondary text-white hover:bg-secondary-hover',
    outline: 'border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white',
    dark: 'bg-bg-dark text-bg-light hover:opacity-90',
    success: 'bg-green-500 text-white hover:bg-green-600',
  };

  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.medium,
    fullWidth && 'w-full',
    className
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

