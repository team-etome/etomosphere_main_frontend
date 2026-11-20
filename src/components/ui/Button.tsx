import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  isLoading?: boolean;
  leftIcon?: string;
  rightIcon?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'w-full h-11 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-[#0052B4] hover:bg-[#004191] text-white',
    outline: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {leftIcon && <img src={leftIcon} alt="" aria-hidden="true" className="w-4 h-4" />}
      <span>{isLoading ? 'Please wait...' : children}</span>
      {!isLoading && rightIcon && (
        <img src={rightIcon} alt="" aria-hidden="true" className="w-4 h-4" />
      )}
    </button>
  );
};