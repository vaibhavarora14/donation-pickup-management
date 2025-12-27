import React from 'react';
import { cn } from '../../utils/cn';

const Card = ({
  children,
  variant = 'default',
  padding = 'medium',
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'bg-white rounded-[15px] transition-all duration-300';
  
  const variantClasses = {
    default: 'border border-[#d7e1ea] shadow-[9px_10px_21.9px_rgba(185,204,225,0.15)]',
    outlined: 'border border-[#e0e0e0]',
    elevated: 'shadow-md',
    flat: '',
  };

  const paddingClasses = {
    small: 'p-4',
    medium: 'p-8',
    large: 'p-10',
    none: 'p-0',
  };

  const cardClasses = cn(
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    paddingClasses[padding] || paddingClasses.medium,
    onClick && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-xl',
    className
  );

  return (
    <div className={cardClasses} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default Card;

