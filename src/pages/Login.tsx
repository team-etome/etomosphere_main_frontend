import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { validateLoginForm } from '../utils/validators';
import { ROUTES } from '../constants/routes';

// Icons
import AtIcon from '../assets/icons/at-icon.svg';
import LockIcon from '../assets/icons/lock-icon.svg';
import GoogleLogo from '../assets/icons/google-logo.svg';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const validationErrors = validateLoginForm(identifier, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await authService.login({ identifier: identifier.trim(), password });
      navigate(ROUTES.HOME);
    } catch (err: any) {
      setApiError(
        err?.response?.data?.message || 'Invalid credentials. Please check your details and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__inner">

          {/* Card Header */}
          <div className="login-card__header">
            <h1 className="login-card__title">
              Welcome Back!
            </h1>
            <p className="login-card__subtitle">
              Your gateway to smarter education and innovative technology solutions. Explore, connect, and grow with us.
            </p>
          </div>

          {/* API Error Banner */}
          {apiError && (
            <div className="login-card__error" role="alert">
              {apiError}
            </div>
          )}

          {/* Login Form & Footer */}
          <div className="login-card__body">
            <form onSubmit={handleSubmit} noValidate className="login-form-stack">
              <div className="login-fields">

                {/* Email Address or Mobile Number */}
                <div className="login-field">
                  <label htmlFor="login-identifier" className="login-field__label">
                    Email Address or Mobile Number *
                  </label>
                  <div className="login-field__box">
                    <div className="login-field__input-wrap">
                      <img
                        src={AtIcon}
                        alt=""
                        aria-hidden="true"
                        className="login-field__icon"
                      />
                      <input
                        id="login-identifier"
                        type="text"
                        required
                        placeholder="arjun.patel@example.com"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        autoComplete="username"
                        className="login-field__input"
                      />
                    </div>
                  </div>
                  {errors.identifier && (
                    <span className="login-field__error">{errors.identifier}</span>
                  )}
                </div>

                {/* Password */}
                <div className="login-field login-field--password">
                  <div className="login-field__top">
                    <label htmlFor="login-password" className="login-field__label">
                      Password *
                    </label>
                    <span className="login-field__hint">
                      Min. 8 characters
                    </span>
                  </div>
                  <div className="login-field__box login-field__box--password">
                    <div className="login-field__input-wrap">
                      <img
                        src={LockIcon}
                        alt=""
                        aria-hidden="true"
                        className="login-field__icon login-field__icon--lock"
                      />
                      <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        className={`login-field__input ${!showPassword ? 'login-field__input--masked' : ''}`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      aria-pressed={showPassword}
                      className="login-field__toggle"
                    >
                      <svg
                        viewBox="0 0 20 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="login-field__toggle-icon"
                      >
                        <path
                          d="M10 1.25C5.45 1.25 1.73 4.08 0.25 7C1.73 9.92 5.45 12.75 10 12.75C14.55 12.75 18.27 9.92 19.75 7C18.27 4.08 14.55 1.25 10 1.25ZM10 10.75C7.93 10.75 6.25 9.07 6.25 7C6.25 4.93 7.93 3.25 10 3.25C12.07 3.25 13.75 4.93 13.75 7C13.75 9.07 12.07 10.75 10 10.75ZM10 4.75C8.76 4.75 7.75 5.76 7.75 7C7.75 8.24 8.76 9.25 10 9.25C11.24 9.25 12.25 8.24 12.25 7C12.25 5.76 11.24 4.75 10 4.75Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                  {errors.password && (
                    <span className="login-field__error">{errors.password}</span>
                  )}
                </div>

              </div>

              <div className="login-forgot-wrap">
                <Link to={ROUTES.FORGOT_PASSWORD} className="login-forgot-link">
                  Forgot Password?
                </Link>
              </div>
            </form>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="login-submit-btn"
            >
              <span className="login-submit-btn__label">
                {isLoading ? 'Signing In...' : 'Sign In →'}
              </span>
            </button>

            {/* Divider */}
            <div className="login-divider">
              <div className="login-divider__line" />
              <span className="login-divider__text">
                OR CONTINUE WITH
              </span>
              <div className="login-divider__line" />
            </div>

            {/* Google Auth & Sign Up Footer */}
            <div className="login-footer-group">
              <button
                type="button"
                onClick={authService.initiateGoogleLogin}
                className="login-google-btn"
              >
                <img
                  src={GoogleLogo}
                  alt=""
                  aria-hidden="true"
                  className="login-google-btn__icon"
                />
                <span className="login-google-btn__label">
                  Continue with Google
                </span>
              </button>

              <div className="login-signup">
                <span className="login-signup__text">
                  Don't have an account?
                </span>
                <Link to={ROUTES.REGISTER} className="login-signup__link">
                  Create Account
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};