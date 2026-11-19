import { BUSINESS_MODELS, DESIGNATIONS, YEAR_OPTIONS, currentYear } from '../sellerFields.js';
import FieldRow from '../components/FieldRow.jsx';

export default function CompanyStep({ form, errors, set }) {
  return (
    <>
      <div className="sr-step-tag">STEP 02</div>
      <h2 className="sr-title">Tell Us About Your Business</h2>
      <p className="sr-desc">Provide accurate company and regulatory information to help our compliance team verify your business credentials, confirm your eligibility, and approve your registration as an authorized marketplace seller or distributor.</p>

      <h3 className="sr-section">Basic Company Details</h3>

      <FieldRow label="Legal Company Name" required error={errors.company_name}>
        <input className="sr-input" placeholder="ABC Technologies Private Limited" value={form.company_name} onChange={e => set('company_name', e.target.value)} />
      </FieldRow>

      <FieldRow label="Brand / Trading Name" error={errors.brand_trading_name}>
        <input className="sr-input" placeholder="ABC Display & VisionTech" value={form.brand_trading_name} onChange={e => set('brand_trading_name', e.target.value)} />
      </FieldRow>

      <FieldRow label="Select Primary Business Model" required error={errors.business_model}>
        <p className="sr-field-hint">Choose the profile that best categorizes your operations. This modifies required onboarding documentation in Step 3.</p>
        <div className="sr-model-grid">
          {BUSINESS_MODELS.map(m => (
            <button
              key={m.key}
              type="button"
              className={`sr-model-card${form.business_model === m.key ? ' selected' : ''}`}
              onClick={() => set('business_model', m.key)}
            >
              <div className="sr-model-radio">
                {form.business_model === m.key && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                )}
              </div>
              {m.label}
            </button>
          ))}
        </div>
      </FieldRow>

      <div className="sr-two-col">
        <FieldRow label="Year of Establishment" required error={errors.year_established}>
          <select className="sr-select" value={form.year_established} onChange={e => set('year_established', e.target.value)}>
            <option value="">Select year</option>
            {YEAR_OPTIONS.map(y => (
              <option key={y} value={y}>
                {y} ({currentYear - y} year{currentYear - y !== 1 ? 's' : ''} in operations)
              </option>
            ))}
          </select>
        </FieldRow>
        <FieldRow label="Company Website" required error={errors.website}>
          <div className="sr-input-wrap">
            <svg className="sr-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <input className="sr-input" placeholder="https://www.abctechnologies.com" value={form.website} onChange={e => set('website', e.target.value)} />
          </div>
        </FieldRow>
      </div>

      <FieldRow label="Company Overview & Product Portfolio" required error={errors.company_overview}>
        <div className="sr-textarea-wrap">
          <textarea
            className="sr-textarea"
            rows={4}
            maxLength={500}
            placeholder="Briefly describe your company and the products you plan to list..."
            value={form.company_overview}
            onChange={e => set('company_overview', e.target.value)}
          />
          <span className="sr-char-count">{form.company_overview.length} / 500 characters</span>
        </div>
      </FieldRow>

      <h3 className="sr-section">Primary Business Signatory &amp; Admin</h3>
      <p className="sr-section-desc">Provide the details of the authorized signatory responsible for marketplace contracts, legal agreements, and primary account management.</p>

      <div className="sr-two-col">
        <FieldRow label="Contact Person's Full Name" required error={errors.signatory_name}>
          <input className="sr-input" placeholder="Arjun Menon" value={form.signatory_name} onChange={e => set('signatory_name', e.target.value)} />
        </FieldRow>
        <FieldRow label="Designation / Corporate Title" required error={errors.signatory_designation}>
          <select className="sr-select" value={form.signatory_designation} onChange={e => set('signatory_designation', e.target.value)}>
            <option value="">Select designation</option>
            {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </FieldRow>
      </div>

      <div className="sr-two-col">
        <FieldRow label="Corporate Email Address" required error={errors.signatory_email}>
          <input className="sr-input" type="email" placeholder="arjun@abctechnologies.com" value={form.signatory_email} onChange={e => set('signatory_email', e.target.value)} />
        </FieldRow>
        <FieldRow label="Official Mobile Phone" required error={errors.signatory_mobile}>
          <div className="sr-phone-wrap">
            <div className="sr-phone-code">
              <span>🇮🇳</span> +91
            </div>
            <input className="sr-input sr-input--phone" placeholder="98765 43210" value={form.signatory_mobile} onChange={e => set('signatory_mobile', e.target.value.replace(/\D/g,'').slice(0,10))} />
          </div>
        </FieldRow>
      </div>

      <FieldRow label={<>Alternate Contact / Escalation Desk <span className="sr-optional">(Optional)</span></>} error={errors.alternate_contact}>
        <input className="sr-input" placeholder="+91 94471 23456" value={form.alternate_contact} onChange={e => set('alternate_contact', e.target.value)} />
      </FieldRow>
    </>
  );
}
