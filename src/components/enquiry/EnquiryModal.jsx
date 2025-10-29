import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
/**
 * EnquiryModal - reusable enquiry/contact form modal
 * Props:
 * - isOpen: boolean - controls visibility
 * - onClose: () => void - called when closing
 * - onSubmit?: (payload) => Promise<void> | void - optional submit handler
 */
function EnquiryModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    designation: '',
    phone: '',
    email: '',
    location: '',
    comment: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = 'Required';
    if (!formData.organisation.trim()) next.organisation = 'Required';
    if (!formData.phone.trim()) next.phone = 'Required';
    if (!formData.email.trim()) next.email = 'Required';
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    try {
      setSubmitting(true);
      if (onSubmit) {
        await onSubmit(formData);
      }
      onClose?.();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.card} onClick={(e) => e.stopPropagation()}>
        {/* Placeholder color styles */}
        <style>{`
          .enquiry-input::placeholder { color: #000; opacity: 1; }
          .enquiry-textarea::placeholder { color: #000; opacity: 1; }
          /* Disable hover/focus border effects */
          .enquiry-input:hover, .enquiry-textarea:hover { border-color: #000 !important; }
          .enquiry-input:focus, .enquiry-textarea:focus { outline: none; border-color: #000 !important; box-shadow: none !important; }
          .enquiry-btn { outline: none; box-shadow: none; }
          .enquiry-btn:hover, .enquiry-btn:focus { outline: none; box-shadow: none; border-color: inherit; }
        `}</style>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.brandRow}>
          <div>
          <Link to="/" className="brand-link">
            <h1 style={{
              fontSize:"30px"
            }} className="brand-name">ETOMOSPHERE</h1>
          </Link>
        </div>
            <button type="button" onClick={onClose} aria-label="Close" style={styles.closeBtn}>
              ×
            </button>
          </div>
          <h2 style={styles.title}>Get in Touch with Our Experts</h2>
          <p style={styles.subtitle}>
            Share your details and our team will help you find the right solution for your needs.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.grid2}>
            <div style={styles.inputWrap}>
              <input
                name="name"
                placeholder="Name*"
                value={formData.name}
                onChange={handleChange}
                className="enquiry-input"
                style={{ ...styles.input, ...(errors.name ? styles.inputError : null) }}
              />
            </div>
            <div style={styles.inputWrap}>
              <input
                name="organisation"
                placeholder="Organisation*"
                value={formData.organisation}
                onChange={handleChange}
                className="enquiry-input"
                style={{ ...styles.input, ...(errors.organisation ? styles.inputError : null) }}
              />
            </div>

            <div style={styles.inputWrap}>
              <input
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleChange}
                className="enquiry-input"
                style={styles.input}
              />
            </div>
            <div style={styles.inputWrap}>
              <input
                name="phone"
                placeholder="Phone Number*"
                value={formData.phone}
                onChange={handleChange}
                className="enquiry-input"
                style={{ ...styles.input, ...(errors.phone ? styles.inputError : null) }}
              />
            </div>

            <div style={styles.inputWrap}>
              <input
                name="email"
                placeholder="Email*"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="enquiry-input"
                style={{ ...styles.input, ...(errors.email ? styles.inputError : null) }}
              />
            </div>
            <div style={styles.inputWrap}>
              <input
                name="location"
                placeholder="Location*"
                value={formData.location}
                onChange={handleChange}
                className="enquiry-input"
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.textareaWrap}>
            <textarea
              name="comment"
              placeholder="Comment"
              rows={4}
              value={formData.comment}
              onChange={handleChange}
              className="enquiry-textarea"
              style={styles.textarea}
            />
          </div>

          <div style={styles.actions}>
         
            <button type="submit" disabled={submitting} style={styles.primaryBtn} className="enquiry-btn">
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: 16
  },
  card: {
    width: 'min(920px, 95vw)', background: '#fff', borderRadius: 12,
    boxShadow: '0 10px 30px rgba(0,0,0,0.25)'
  },
  header: { padding: '20px 20px 0 20px' },
  brandRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logoText: { fontSize: 22, letterSpacing: 1, fontFamily: 'Inter, system-ui, Arial, sans-serif' },
  closeBtn: {
    width: 32, height: 32, color:"black", cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 0, lineHeight: 1, background: 'transparent', border: 'none'
  },
  title: {
    margin: '12px 0 4px 0', textAlign: 'center', fontSize: 20, fontWeight: 700, color: '#111827'
  },
  subtitle: {
    margin: 0, textAlign: 'center', color: 'black', fontSize: 16, paddingBottom: 12
  },
  form: { padding: 20 },
  grid2: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12
  },
  inputWrap: {},
  input: {
    width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #000',
    outline: 'none', fontSize: 14, background: '#fff', color: '#000'
  },
  inputError: { borderColor: '#ef4444' },
  textareaWrap: { marginTop: 12 },
  textarea: {
    width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #000', resize: 'vertical', fontSize: 14,
    background: '#fff', color: '#000'
  },
  actions: {
    display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 12
  },
  secondaryBtn: {
    padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer'
  },
  primaryBtn: {
    padding: '10px 14px', borderRadius: 8, border: '1px solid #1d4ed8', background: '#1d4ed8', color: '#fff', cursor: 'pointer'
  }
};

export default EnquiryModal;


