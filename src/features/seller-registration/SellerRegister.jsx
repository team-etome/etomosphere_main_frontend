import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initForm, validateSellerStep } from './sellerFields.js';
import { registerSeller, getSellerFieldErrors } from './sellerApi.js';
import AccountStep from './steps/AccountStep.jsx';
import CompanyStep from './steps/CompanyStep.jsx';
import VerificationStep from './steps/VerificationStep.jsx';
import AddressStep from './steps/AddressStep.jsx';
import ReviewStep from './components/ReviewStep.jsx';
import Header from '../../components/header/header.jsx';
import Footer from '../../components/footer/footer.jsx';
import SellerAgreements from './steps/SellerAgreements.jsx';
import { readAgreementDraft } from './agreementDraft.js';
import './SellerRegister.css';

const STEPS = [
  { num: 1, label: 'Create Account',        sub: 'Contact & Login' },
  { num: 2, label: 'Company Details',       sub: 'Business Info' },
  { num: 3, label: 'Business Verification', sub: 'Documents' },
  { num: 4, label: 'Business Address',      sub: 'Location' },
  { num: 5, label: 'Agreements',           sub: 'Agreements' },
];

function ProgressBar({ current, goTo }) {
  return (
    <div className="sr-progress">
      <div className="sr-progress-label">
        ONBOARDING PROGRESS &nbsp;•&nbsp; STEP {current} OF {STEPS.length} — {STEPS[current - 1].label.toUpperCase()}
      </div>
      <div className="sr-steps">
        {STEPS.flatMap((s) => {
          const isDone = current > s.num;
          const stepEl = (
            <div
              key={`s${s.num}`}
              className={`sr-step ${current === s.num ? 'active' : isDone ? 'done' : ''}${isDone ? ' sr-step--clickable' : ''}`}
              onClick={isDone ? () => goTo(s.num) : undefined}
            >
              <div className="sr-step-circle">
                {current > s.num
                  ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  : s.num}
              </div>
              <div className="sr-step-info">
                <span className="sr-step-label">{s.label}</span>
                <span className="sr-step-sub">{current === s.num ? 'In Progress' : current > s.num ? 'Completed' : 'Upcoming'}</span>
              </div>
            </div>
          );
          if (s.num < STEPS.length) {
            return [stepEl, (
              <div key={`c${s.num}`} className="sr-step-connector">
                <div className="sr-step-connector-fill" style={{ width: current > s.num ? '100%' : '0%' }} />
              </div>
            )];
          }
          return [stepEl];
        })}
      </div>
    </div>
  );
}


export default function SellerRegister() {
  const [step,    setStep]    = useState(1);
  const [form,    setForm]    = useState(initForm);
  const [errors,  setErrors]  = useState({});
  const [showPw,  setShowPw]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [checked, setChecked] = useState(readAgreementDraft);
  const [signature, setSignature] = useState(null);
  const pending = useRef(false);
  const navigate = useNavigate();

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const next = () => {
    const fieldErrors = validateSellerStep(step, form);
    setErrors(fieldErrors);
    if (!Object.keys(fieldErrors).length) setStep(current => Math.min(current + 1, STEPS.length));
  };
  const prev = () => setStep(current => Math.max(current - 1, 1));

  const handleSubmit = async () => {
    if (pending.current) return;
    pending.current = true;
    setErrors({});
    setSubmitting(true);
    try {
      await registerSeller(form);
      setForm(current => ({ ...current, password: '', password2: '' }));
      setSubmitted(true);
    } catch (error) {
      const fields = getSellerFieldErrors(error);
      const detail = fields.non_field_errors || fields.detail || Object.values(fields)[0];
      setErrors({
        ...fields,
        non_field_errors: detail || (error.response
          ? 'We could not submit your application. Please try again.'
          : 'We could not confirm your submission. Check your connection before trying again.'),
      });
      if (fields.email) setStep(1);
    } finally {
      pending.current = false;
      setSubmitting(false);
    }
  };
  if (submitted) {
    return (
      <div className="sr-page">
        <Header hideCatNav />
        <div className="sr-success">
          <div className="sr-success-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/><polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h2>Application Submitted!</h2>
          <p>Thank you, <strong>{form.full_name}</strong>! We've received your seller registration for <strong>{form.company_name}</strong>.</p>
          <p>Our team will review your application and contact you at <strong>{form.email}</strong> within 2–3 business days.</p>
          <button className="sr-btn-primary" onClick={() => navigate('/')}>Back to Home</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="sr-page">
      <Header hideCatNav />
      <ProgressBar current={step} goTo={setStep} />

      <div className={step === 5 ? 'sr-body sr-body--agreements' : 'sr-body'}>
        <div className="sr-form-wrap">

          {/* ── Step 1: Create Account ── */}
          {step === 1 && <AccountStep form={form} errors={errors} set={set} showPw={showPw} setShowPw={setShowPw} />}

          {/* ── Step 2: Company Details ── */}
          {step === 2 && <CompanyStep form={form} errors={errors} set={set} />}

          {/* ── Step 3: Verify Your Business ── */}
          {step === 3 && <VerificationStep form={form} errors={errors} set={set} />}

          {/* ── Step 4: Business Location ── */}
          {step === 4 && <AddressStep form={form} errors={errors} set={set} />}

          {step === 5 && (
            <SellerAgreements onBack={prev} onSubmit={handleSubmit} submitting={submitting}
              checked={checked} setChecked={setChecked} signature={signature} setSignature={setSignature}>
              <details className="sr-agreement-review">
                <summary>Review application details</summary>
                <ReviewStep form={form} setStep={setStep} />
              </details>
              {errors.non_field_errors && <div role="alert" className="sr-api-error">{errors.non_field_errors}</div>}
            </SellerAgreements>
          )}

          {/* ── Navigation buttons ── */}
          {step !== 5 && <div className="sr-agreement-nav sr-agreement-nav--step">
            {step > 1 && (
              <button type="button" className="sr-btn-back" onClick={prev}>
                ← {step === 2 ? 'Back to Account Setup'
                  : step === 3 ? 'Back to Company Details'
                  : step === 4 ? 'Back to Verification'
                  : 'Back'}
              </button>
            )}
            {(step === 2 || step === 3 || step === 4) && (
              <button type="button" className="sr-btn-draft">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                Save as Draft
              </button>
            )}
            {step < 5 && (
              <button type="button" className="sr-agreement-blue" onClick={next}>
                {step === 1 ? 'Create Account & Continue →'
                  : step === 2 ? 'Save & Continue to Step 3 →'
                  : step === 3 ? 'Save & Continue to Step 4 →'
                  : 'Save & Continue to Agreements →'}
              </button>
            )}
          </div>}

        </div>
      </div>

      <Footer />
    </div>
  );
}
