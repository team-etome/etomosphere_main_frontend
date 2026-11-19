import { Link } from 'react-router-dom';
import FieldRow from '../components/FieldRow.jsx';

export default function AccountStep({ form, errors, set, showPw, setShowPw }) {
  return (
    <>
      <div className="sr-step-tag">STEP 01</div>
      <h2 className="sr-title">Create Your Seller Account</h2>
      <p className="sr-desc">Join our marketplace and showcase your products to educational institutions across India. Register as a seller to expand your reach, connect with potential buyers, and grow your business.</p>

      <h3 className="sr-section">1. Contact Information</h3>
      <FieldRow label="Full Name" required error={errors.full_name}>
        <div className="sr-input-wrap">
          <svg className="sr-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <input className="sr-input" placeholder="Arjun Menon" value={form.full_name} onChange={e => set('full_name', e.target.value)} />
        </div>
      </FieldRow>

      <FieldRow label="Business Email Address" required error={errors.email}>
        <div className="sr-input-wrap">
          <svg className="sr-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <input className="sr-input" type="email" placeholder="arjun@abctechnologies.com" value={form.email} onChange={e => set('email', e.target.value)} />
        </div>
      </FieldRow>

      <FieldRow label="Mobile Number" required error={errors.mobile}>
        <div className="sr-phone-wrap">
          <div className="sr-phone-code">+91 (IN)</div>
          <input className="sr-input sr-input--phone" placeholder="98765 43210" value={form.mobile} onChange={e => set('mobile', e.target.value.replace(/\D/g,'').slice(0,10))} />
        </div>
      </FieldRow>

      <h3 className="sr-section">2. Security &amp; Login Credentials</h3>
      <FieldRow label="Create Master Password" required error={errors.password}>
        <div className="sr-input-wrap">
          <svg className="sr-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4m-4 4v2" />
          </svg>
          <input className="sr-input" type={showPw ? 'text' : 'password'} placeholder="Min 8 characters" value={form.password} onChange={e => set('password', e.target.value)} />
          <button type="button" className="sr-eye-btn" onClick={() => setShowPw(v => !v)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {showPw
                ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>
                : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
            </svg>
          </button>
        </div>
      </FieldRow>

      <FieldRow label="Confirm Master Password" required error={errors.password2}>
        <div className="sr-input-wrap">
          <svg className="sr-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4m-4 4v2" />
          </svg>
          <input className="sr-input" type={showPw ? 'text' : 'password'} placeholder="Re-enter password" value={form.password2} onChange={e => set('password2', e.target.value)} />
          <button type="button" className="sr-eye-btn" onClick={() => setShowPw(v => !v)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {showPw
                ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>
                : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
            </svg>
          </button>
        </div>
      </FieldRow>

      <div className="sr-agree-row">
        <input type="checkbox" id="agree" checked={form.agree} onChange={e => set('agree', e.target.checked)} className="sr-checkbox" />
        <label htmlFor="agree" className="sr-agree-label">
          I agree to the <Link to="/terms-conditions" className="sr-link">Terms &amp; Conditions</Link> and <Link to="/privacy-policy" className="sr-link">Privacy Policy</Link> and consent to the collection and processing of my information for seller registration and verification.
        </label>
      </div>
      {errors.agree && <span className="sr-error">{errors.agree}</span>}
    </>
  );
}
