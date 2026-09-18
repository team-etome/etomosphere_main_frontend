import React, { useState, useEffect } from 'react';
import axios from 'axios';

const APIURL = import.meta.env.VITE_API_URL || 'http://192.168.1.6:8000';

function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', message: '' });
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
    if (!form.fullName || !form.email || !form.phone) {
      setError('Please fill all required fields.');
      return;
    }
    try {
      setSubmitting(true);
      await axios.post(`${APIURL}/api/contact/`, form);
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
        <h2 className="hmodal-title">
          Get in <span style={{ color: '#1d4ed8' }}>Touch.</span>
        </h2>

        <form className="hmodal-form" onSubmit={handleSubmit}>
          <div className="hmodal-row">
            <div className="hmodal-field">
              <label className="hmodal-label">Full Name</label>
              <input name="fullName" placeholder="Enter your full name" value={form.fullName}
                onChange={handleChange} className="hmodal-input" />
            </div>
            <div className="hmodal-field">
              <label className="hmodal-label">Email Address</label>
              <input name="email" type="email" placeholder="Enter your email address" value={form.email}
                onChange={handleChange} className="hmodal-input" />
            </div>
          </div>

          <div className="hmodal-field">
            <label className="hmodal-label">Contact Number</label>
            <input name="phone" placeholder="Enter your phone number" value={form.phone}
              onChange={handleChange} className="hmodal-input" />
          </div>

          <div className="hmodal-field">
            <label className="hmodal-label">Your Message</label>
            <textarea name="message" placeholder="How can we help you today?" rows={4}
              value={form.message} onChange={handleChange}
              className="hmodal-input hmodal-textarea" />
          </div>

          {error   && <p className="hmodal-error">{error}</p>}
          {success && <p className="hmodal-success">Message sent! We'll get back to you soon.</p>}

          <button type="submit" className="hmodal-submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit'}
          </button>

          <div className="hmodal-contact-footer">
            <p>Reach out for product info, support or assistance</p>
            <div className="hmodal-contact-row">
              <div className="hmodal-contact-item">
                <span className="hmodal-contact-label">EMAIL ID</span>
                <span className="hmodal-contact-val">info@etome.in</span>
              </div>
              <div className="hmodal-contact-item">
                <span className="hmodal-contact-label">PHONE NUMBER</span>
                <span className="hmodal-contact-val">+91 9037771113</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactModal;
