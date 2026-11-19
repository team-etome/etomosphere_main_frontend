import { useRef, useState } from 'react';

import { AGREEMENTS, DRAFT_KEY } from '../agreementDraft.js';

export default function SellerAgreements({ onBack, onSubmit, submitting, checked, setChecked, signature, setSignature, children }) {
  const [viewing, setViewing] = useState(null);
  const [notice, setNotice] = useState('');
  const [fileError, setFileError] = useState('');
  const dialog = useRef(null);
  const input = useRef(null);

  function saveDraft() {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(checked));
      setNotice('Agreement selections saved for this tab. Signature files are not saved.');
    } catch {
      setNotice('This browser did not allow the draft to be saved.');
    }
  }

  function selectSignature(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'application/pdf'].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setFileError('Select a PNG, JPEG, or PDF file no larger than 5 MB.');
      event.target.value = '';
      return;
    }
    setSignature(file);
    setFileError('');
  }

  return (
    <section aria-labelledby="sr-agreements-title">
      <div className="sr-step-tag">STEP 05</div>
      <h2 className="sr-title" id="sr-agreements-title">Agreements</h2>
      <p className="sr-desc">Review the agreements required to complete your OEM registration.</p>

      <div className="sr-agreement-list">
        {AGREEMENTS.map(([id, title, description]) => (
          <div className="sr-agreement-row" key={id}>
            <div>
              <h3>{title} <span className="sr-agreement-required" aria-label="required">*</span></h3>
              <p>{description}</p>
            </div>
            <div className="sr-agreement-actions">
              <button type="button" className="sr-agreement-view" aria-label={`View ${title}`} onClick={() => {
                setViewing([title, description]);
                dialog.current?.showModal();
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
                </svg>
                View
              </button>
              <label className="sr-agreement-blue">
                <input type="checkbox" aria-label={`Preview acceptance of ${title}`} checked={checked.includes(id)} onChange={event => {
                  const selected = event.target.checked;
                  setChecked(previous => selected ? [...previous, id] : previous.filter(key => key !== id));
                  setNotice('');
                }} />
                <svg className="sr-agreement-check" width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="2" width="12" height="12" rx="1" />
                  <path d="m5 8 2 2 4-4" />
                </svg>
                I Agree
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="sr-agreement-upload">
        <input ref={input} type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={selectSignature} hidden />
        <button type="button" className="sr-agreement-blue" onClick={() => input.current?.click()}>
          <span aria-hidden="true">↑</span> Signature Upload
        </button>
        {signature && <span className="sr-agreement-file">{signature.name} <button type="button" onClick={() => {
          setSignature(null);
          setFileError('');
          if (input.current) input.current.value = '';
        }}>Remove</button></span>}
        {fileError && <p className="sr-api-error" role="alert">{fileError}</p>}
      </div>

      <aside className="sr-agreement-note">
        <h3>Important</h3>
        <ul>
          <li>Read each official agreement carefully before accepting. All agreements are required for seller activation.</li>
          <li>This is a preview. Official documents are not available here yet; selections and signature files are not submitted.</li>
        </ul>
      </aside>

      {children}
      <p className="sr-agreement-status" role="status">{notice}</p>
      <div className="sr-agreement-nav">
        <button type="button" onClick={onBack}>← Back to Business Address</button>
        <button type="button" onClick={saveDraft}>Save as Draft</button>
        <button type="button" className="sr-agreement-blue" onClick={onSubmit} disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit →'}
        </button>
      </div>

      <dialog className="sr-agreement-dialog" ref={dialog} aria-labelledby="sr-agreement-dialog-title">
        <h3 id="sr-agreement-dialog-title">{viewing?.[0]}</h3>
        <p>{viewing?.[1]}</p>
        <p>This is a summary, not the official agreement.</p>
        <form method="dialog"><button className="sr-agreement-blue" autoFocus>Close</button></form>
      </dialog>
    </section>
  );
}
