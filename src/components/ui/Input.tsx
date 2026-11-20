import React, { useState } from 'react';
import EyeIcon from '../../assets/icons/eye-icon.svg';
import EyeOffIcon from '../../assets/icons/eye-off-icon.svg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  rightHint?: string;
  leftIcon?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  required = false,
  rightHint,
  leftIcon,
  error,
  type = 'text',
  id,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full space-y-1.5">
      {/* Label & Optional Right Hint */}
      <div className="flex items-center justify-between text-xs">
        <label htmlFor={inputId} className="font-semibold text-gray-800">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {rightHint && <span className="text-gray-400 font-normal">{rightHint}</span>}
      </div>

      {/* Input Wrapper */}
      <div className="relative flex items-center">
        {leftIcon && (
          <img
            src={leftIcon}
            alt=""
            aria-hidden="true"
            className="w-4 h-4 absolute left-3.5 pointer-events-none opacity-60"
          />
        )}

        <input
          id={inputId}
          type={inputType}
          className={`w-full h-11 bg-[#F3F4F6] text-sm text-gray-800 placeholder-gray-400 rounded-lg border transition-colors focus:bg-white focus:outline-none ${
            leftIcon ? 'pl-10' : 'pl-3.5'
          } ${isPassword ? 'pr-10' : 'pr-3.5'} ${
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-transparent focus:border-[#0052B4]'
          } ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3.5 p-1 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <img
              src={showPassword ? EyeOffIcon : EyeIcon}
              alt=""
              aria-hidden="true"
              className="w-4 h-4 opacity-70"
            />
          </button>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};