import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'elevated' | 'outlined';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'elevated',
  onClick,
}) => {
  const baseClasses = 'bg-white rounded-lg p-4 transition-all duration-200';
  const variantClasses = {
    elevated: 'shadow-md hover:shadow-lg',
    outlined: 'border border-gray-200 hover:border-gray-300',
  };
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${clickableClasses} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
