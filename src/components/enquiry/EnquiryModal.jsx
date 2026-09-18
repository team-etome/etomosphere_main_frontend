import React, { useState, useEffect } from 'react';
import axios from 'axios';
import etomosphereLogo from '../../assets/Etomosphere Full logo.png';
import './EnquiryModal.css';

const initialFormState = {
  name: '', organisation: '', designation: '',
  phone: '', email: '', location: '', comment: ''
};

function EnquiryModal({ isOpen, onClose, onSubmit, cartItems = [] }) {
  const APIURL = import.meta.env.VITE_API_URL || 'http://192.168.1.6:8000';

  const [formData, setFormData]           = useState(initialFormState);
  const [submitting, setSubmitting]       = useState(false);
  const [errors, setErrors]               = useState({});
  const [submitError, setSubmitError]     = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim())         errs.name         = 'Required';
    if (!formData.organisation.trim()) errs.organisation = 'Required';
    if (!formData.phone.trim())        errs.phone        = 'Required';
    if (!formData.email.trim())        errs.email        = 'Required';
    return errs;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitError(''); setSubmitSuccess(false);
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    try {
      setSubmitting(true);
      const products = cartItems.map(
        item => `${item.name}${item.quantity > 1 ? ` (x${item.quantity})` : ''}${item.brandName ? ` — ${item.brandName}` : ''}`
      );

      const payload = {
        name: formData.name.trim(), organisation: formData.organisation.trim(),
        designation: formData.designation.trim(), phone: formData.phone.trim(),
        email: formData.email.trim(), location: formData.location.trim(),
        comment: formData.comment.trim(),
        products,
      };
      await axios.post(`${APIURL}/api/enquiry/`, payload);
      setSubmitSuccess(true);
      setFormData(initialFormState); setErrors({});
      if (onSubmit) await onSubmit(payload);
      setTimeout(() => { onClose?.(); setSubmitSuccess(false); }, 2000);
    } catch (err) {
      setSubmitError(err.response?.data?.detail || err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally { setSubmitting(false); }
  };

  return (
    <div className="pro-overlay" onClick={onClose}>
      <div className="pro-modal" onClick={e => e.stopPropagation()}>

        {/* ── Left info panel ── */}
        <aside className="pro-aside">
          <img src={etomosphereLogo} alt="Etomosphere" className="pro-aside-logo" />

          <div className="pro-aside-main">
            <h2 className="pro-aside-title">Request a Pricing Enquiry</h2>
            <p className="pro-aside-body">
              Get personalised pricing, bulk discounts, and expert guidance for your institution.
            </p>
          </div>

          <div className="pro-steps">
            <p className="pro-steps-heading">What happens next?</p>
            {[
              { n: '01', text: 'We review your enquiry within 2 business hours.' },
              { n: '02', text: 'Our specialist prepares a tailored pricing proposal.' },
              { n: '03', text: 'You receive the quote directly to your email.' },
            ].map(s => (
              <div key={s.n} className="pro-step">
                <span className="pro-step-n">{s.n}</span>
                <p className="pro-step-text">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="pro-aside-footer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Your information is kept strictly confidential.
          </div>
        </aside>

        {/* ── Right form panel ── */}
        <div className="pro-form-wrap">
          <div className="pro-form-head">
            <div>
              <h3 className="pro-form-title">Your Details</h3>
              <p className="pro-form-sub">Fields marked <span>*</span> are required.</p>
            </div>
            <button className="pro-close" onClick={onClose} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate className="pro-form">
            <div className="pro-grid">

              <div className={`pro-field${errors.name ? ' pro-field--err' : ''}`}>
                <label>Full Name <span>*</span></label>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Anil Kumar" />
                {errors.name && <em>{errors.name}</em>}
              </div>

              <div className={`pro-field${errors.organisation ? ' pro-field--err' : ''}`}>
                <label>Organisation <span>*</span></label>
                <input name="organisation" value={formData.organisation} onChange={handleChange} placeholder="School or company name" />
                {errors.organisation && <em>{errors.organisation}</em>}
              </div>

              <div className="pro-field">
                <label>Designation</label>
                <input name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g. Principal, Director" />
              </div>

              <div className={`pro-field${errors.phone ? ' pro-field--err' : ''}`}>
                <label>Phone Number <span>*</span></label>
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                {errors.phone && <em>{errors.phone}</em>}
              </div>

              <div className={`pro-field${errors.email ? ' pro-field--err' : ''}`}>
                <label>Email Address <span>*</span></label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                {errors.email && <em>{errors.email}</em>}
              </div>

              <div className="pro-field">
                <label>Location</label>
                <input name="location" value={formData.location} onChange={handleChange} placeholder="City, State" />
              </div>

            </div>

            <div className="pro-field pro-field--full">
              <label>Additional Message <span className="pro-opt">(Optional)</span></label>
              <textarea name="comment" value={formData.comment} onChange={handleChange}
                placeholder="Share any specific requirements, quantity, or questions…" rows={2} />
            </div>

            {submitError   && <p className="pro-alert pro-alert--err">{submitError}</p>}
            {submitSuccess && <p className="pro-alert pro-alert--ok">Enquiry submitted successfully. We'll be in touch shortly.</p>}

            <div className="pro-actions">
              <button type="button" className="pro-btn-cancel" onClick={onClose}>Cancel</button>
              <button type="submit" disabled={submitting} className="pro-btn-submit">
                {submitting ? <><span className="pro-spinner" /> Submitting…</> : 'Submit Enquiry'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default EnquiryModal;
