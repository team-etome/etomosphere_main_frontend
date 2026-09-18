import React, { useState, useEffect } from 'react';
import axios from 'axios';

const APIURL = import.meta.env.VITE_API_URL || 'http://192.168.1.6:8000';

function RequestDemoModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    fullName: '', email: '', mobile: '', meetingType: '', institution: '', designation: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(false);
    if (!form.fullName || !form.email || !form.mobile) {
      setError('Please fill all required fields.');
      return;
    }
    try {
      setSubmitting(true);
      await axios.post(`${APIURL}/api/demo/`, form);
      setSuccess(true);
      setTimeout(onClose, 1800);
    } catch {
      setError('Unable to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="hmodal-overlay" onClick={onClose}>
      <div className="hmodal-card" onClick={e => e.stopPropagation()}>
        <button className="hmodal-close" onClick={onClose} aria-label="Close">×</button>
        <h2 className="hmodal-title">Request a Demo</h2>

        <form className="hmodal-form" onSubmit={handleSubmit}>
          <div className="hmodal-field">
            <label className="hmodal-label">Full Name</label>
            <input name="fullName" placeholder="Enter your first name" value={form.fullName}
              onChange={handleChange} className="hmodal-input" />
          </div>

          <div className="hmodal-field">
            <label className="hmodal-label">Email Address</label>
            <input name="email" type="email" placeholder="Enter your email address" value={form.email}
              onChange={handleChange} className="hmodal-input" />
          </div>

          <div className="hmodal-row">
            <div className="hmodal-field">
              <label className="hmodal-label">Mobile Number</label>
              <input name="mobile" placeholder="Enter your mobile number" value={form.mobile}
                onChange={handleChange} className="hmodal-input" />
            </div>
            <div className="hmodal-field">
              <label className="hmodal-label">Virtual / Physical</label>
              <input name="meetingType" placeholder="Paste link" value={form.meetingType}
                onChange={handleChange} className="hmodal-input" />
            </div>
          </div>

          <div className="hmodal-row">
            <div className="hmodal-field">
              <label className="hmodal-label">Institution Name</label>
              <input name="institution" placeholder="Enter your institution name" value={form.institution}
                onChange={handleChange} className="hmodal-input" />
            </div>
            <div className="hmodal-field">
              <label className="hmodal-label">Designation</label>
              <input name="designation" placeholder="Enter your designation" value={form.designation}
                onChange={handleChange} className="hmodal-input" />
            </div>
          </div>

          {error   && <p className="hmodal-error">{error}</p>}
          {success && <p className="hmodal-success">Application submitted! We'll be in touch soon.</p>}

          <button type="submit" className="hmodal-submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestDemoModal;
