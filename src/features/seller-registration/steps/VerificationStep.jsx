import { REGISTRATION_TYPES } from '../sellerFields.js';
import FieldRow from '../components/FieldRow.jsx';

export default function VerificationStep({ form, errors, set }) {
  return (
    <>
      <div className="sr-step-tag">STEP 03</div>
      <h2 className="sr-title">Verify Your Business</h2>
      <p className="sr-desc">Provide your business identification details and upload the required documents to help our compliance team verify your company's authenticity and eligibility for seller registration.</p>

      <h3 className="sr-section">Business Registration Details</h3>

      <div className="sr-two-col">
        <FieldRow label="GSTIN" required error={errors.gst_number}>
          <input className="sr-input" placeholder="32ABCDE1234F1Z5" value={form.gst_number} onChange={e => set('gst_number', e.target.value.toUpperCase())} maxLength={15} />
        </FieldRow>
        <FieldRow label="Company PAN Number" required error={errors.pan_number}>
          <input className="sr-input" placeholder="ABCDE1234F" value={form.pan_number} onChange={e => set('pan_number', e.target.value.toUpperCase())} maxLength={10} />
        </FieldRow>
      </div>

      <div className="sr-two-col">
        <FieldRow label="Business Registration Type" required error={errors.registration_type}>
          <select className="sr-select" value={form.registration_type} onChange={e => set('registration_type', e.target.value)}>
            <option value="">Select type</option>
            {REGISTRATION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </FieldRow>
        <FieldRow label="Corporate Identity Number (CIN)" required error={errors.cin_number}>
          <input className="sr-input" placeholder="U31900KL2018PTC054321" value={form.cin_number} onChange={e => set('cin_number', e.target.value.toUpperCase())} maxLength={21} />
        </FieldRow>
      </div>

      <h3 className="sr-section">Upload Business Documents</h3>

      <div className="sr-doc-grid">
        {[
          {
            num: 1, field: 'gst_certificate', req: false,
            title: 'GST Registration Certificate',
            desc: 'Form GST REG-06 showing principal place of business.',
          },
          {
            num: 2, field: 'pan_card', req: false,
            title: 'Company PAN Card / Proof',
            desc: 'Scanned copy of official corporate PAN allotment card.',
          },
          {
            num: 3, field: 'incorporation_doc', req: false,
            title: 'Certificate of Registration',
            desc: 'Official MCA document bearing CIN & Registrar seal.',
          },
          {
            num: 4, field: 'oem_auth_letter', req: false,
            title: 'OEM / Brand Authorization letter',
            desc: 'For Manufacturers / Brand Owners: Upload Trademark Certificate or OEM Declaration. (For Distributors: Valid LoA required).',
          },
        ].map(({ num, field, req, title, desc }) => (
          <div key={field} className={`sr-doc-card${errors[field] ? ' sr-doc-card--error' : ''}`}>
            <div className="sr-doc-num-title">
              {num}. {title}{req && <span className="sr-req">*</span>}
            </div>
            <p className="sr-doc-desc">{desc}</p>
            {form[field] ? (
              <div className="sr-doc-file">
                <svg className="sr-doc-file-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                <span className="sr-doc-file-name">{form[field].name}</span>
                <button type="button" className="sr-doc-remove" onClick={() => set(field, null)} aria-label="Remove">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                  </svg>
                </button>
              </div>
            ) : (
              <label className="sr-doc-choose">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Choose File
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={e => set(field, e.target.files[0] || null)} />
              </label>
            )}
            {errors[field] && <span className="sr-error" style={{ marginTop: '6px', display: 'block' }}>{errors[field]}</span>}
          </div>
        ))}
      </div>
    </>
  );
}
