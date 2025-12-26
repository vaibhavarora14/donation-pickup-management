import React from 'react';
import { cn } from '../../utils/cn';

const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
  className = '',
  ...props
}) => {
  const variantClasses = {
    default: 'bg-[#3ac58c] text-white',
    primary: 'bg-call-to-action text-white',
    secondary: 'bg-main text-white',
    success: 'bg-[#30b979] text-white',
    warning: 'bg-[#ffc107] text-black',
    error: 'bg-[#dc3545] text-white',
  };

  const sizeClasses = {
    small: 'w-3.5 h-3.5 text-[8px]',
    medium: 'w-5 h-5 text-xs',
    large: 'w-7 h-7 text-sm',
  };

  const badgeClasses = cn(
    'inline-flex items-center justify-center rounded-full font-medium flex-shrink-0',
    variantClasses[variant] || variantClasses.default,
    sizeClasses[size] || sizeClasses.medium,
    className
  );

  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  );
};

export default Badge;

