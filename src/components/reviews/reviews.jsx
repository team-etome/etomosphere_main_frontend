import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import axios from 'axios';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import './reviews.css';

const APIURL = import.meta.env.VITE_API_URL || 'http://192.168.1.6:8000';

const EASE    = [0.16, 1, 0.3, 1];
const INITIAL = 6;
const STEP    = 3;

const PALETTE = ['#818cf8','#fb923c','#34d399','#f87171','#a78bfa','#60a5fa','#4ade80','#fbbf24'];
const GLOW    = ['rgba(129,140,248,0.35)','rgba(251,146,60,0.35)','rgba(52,211,153,0.35)',
                 'rgba(248,113,113,0.35)','rgba(167,139,250,0.35)','rgba(96,165,250,0.35)',
                 'rgba(74,222,128,0.35)','rgba(251,191,36,0.35)'];

/* ── Count-up ── */
function CountUp({ to, decimals = 1, duration = 1600 }) {
  const [val, setVal] = useState('0');
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    let raf;
    const tick = now => {
      const t = Math.min((now - t0) / duration, 1);
      setVal(((1 - Math.pow(1 - t, 3)) * to).toFixed(decimals));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);
  return <span ref={ref}>{val}</span>;
}

/* ── Avatar ── */
function Avatar({ name, index, size = 44 }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="rv-avatar"
      style={{ background: PALETTE[index % PALETTE.length], width: size, height: size, fontSize: size * 0.33 }}>
      {initials}
    </div>
  );
}

/* ── Stars ── */
function Stars({ count, size = 14 }) {
  return (
    <div className="rv-stars">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= count ? '#fbbf24' : 'rgba(255,255,255,0.25)'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

/* ── Glass card ── */
function GlassCard({ review, index, delay }) {
  const color = PALETTE[index % PALETTE.length];
  const glow  = GLOW[index % GLOW.length];

  return (
    <motion.div
      className="rv-card"
      style={{ '--glow': glow, '--c': color }}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
    >
      {/* Top: stars + rating number */}
      <div className="rv-card-top">
        <Stars count={review.rating} size={15} />
        <span className="rv-card-rating">{review.rating}.0</span>
      </div>

      {/* Quote */}
      <p className="rv-card-quote">"{review.text || review.comment}"</p>

      {/* Divider */}
      <div className="rv-card-divider" />

      {/* Footer */}
      <div className="rv-card-foot">
        <Avatar name={review.name} index={index} size={40} />
        <div className="rv-card-identity">
          <span className="rv-card-name">{review.name}</span>
          <span className="rv-card-school">{review.school}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Write Review Modal ── */
function WriteReviewModal({ isOpen, onClose }) {
  const [form, setForm]       = useState({ name:'', school:'', rating:0, text:'' });
  const [hoverStar, setHoverStar] = useState(0);
  const [files, setFiles]     = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef(null);
  const MIN_CHARS = 50;

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const fn = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const change = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const charCount = form.text.length;
  const charOk = charCount >= MIN_CHARS;

  const handleFiles = newFiles => {
    const valid = Array.from(newFiles).filter(f => f.size <= 5 * 1024 * 1024);
    setFiles(p => [...p, ...valid].slice(0, 3));
  };

  const [submitError,     setSubmitError]     = useState('');
  const [isSubmitting,    setIsSubmitting]    = useState(false);

  const submit = async e => {
    e.preventDefault();
    if (!form.name || !charOk || form.rating === 0 || isSubmitting) return;
    setSubmitError('');
    setIsSubmitting(true);
    try {
      await axios.post(`${APIURL}/api/public-reviews/`, {
        name: form.name,
        school: form.school,
        rating: form.rating,
        comment: form.text,
      });
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setForm({ name:'', school:'', rating:0, text:'' });
        setFiles([]);
      }, 2200);
    } catch (err) {
      setSubmitError(err?.response?.data?.error || 'Unable to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayStar = hoverStar || form.rating;
  const STAR_LABELS = ['','Terrible','Poor','Good','Great','Excellent'];

  return (
    <div className="rvmodal-overlay" onClick={onClose}>
      <motion.div
        className="rvmodal-card"
        onClick={e => e.stopPropagation()}
        initial={{ opacity:0, scale:0.88, y:32 }}
        animate={{ opacity:1, scale:1,    y:0  }}
        exit={{   opacity:0, scale:0.88, y:32  }}
        transition={{ duration:0.32, ease:EASE }}
      >
        <button className="rvmodal-close" onClick={onClose} aria-label="Close">&#x2715;</button>
        <div className="rvmodal-body">

        {submitted ? (
          <motion.div className="rvmodal-success"
            initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }}
            transition={{ type:'spring', stiffness:420, damping:22 }}>
            <motion.div className="rvmodal-success-icon"
              initial={{ scale:0 }} animate={{ scale:1 }}
              transition={{ type:'spring', stiffness:500, damping:20, delay:0.1 }}>
              ✓
            </motion.div>
            <p className="rvmodal-success-title">Thank you!</p>
            <p className="rvmodal-success-sub">Your review has been submitted successfully.</p>
          </motion.div>
        ) : (
          <>
            <div className="rvmodal-header">
              <h2 className="rvmodal-title">Share your experience</h2>
              <p className="rvmodal-sub">Tell us about your experience and what stood out to you. Your feedback helps us improve and guide others.</p>
            </div>

            <form className="rvmodal-form" onSubmit={submit}>

              {/* Star rating */}
              <div className="rvmodal-rating-block">
                <p className="rvmodal-rating-label">Overall Rating</p>
                <div className="rvmodal-stars"
                  onMouseLeave={() => setHoverStar(0)}>
                  {[1,2,3,4,5].map(n => (
                    <motion.button
                      key={n}
                      type="button"
                      className="rvmodal-star-btn"
                      onMouseEnter={() => setHoverStar(n)}
                      onClick={() => setForm(p => ({ ...p, rating: n }))}
                      whileTap={{ scale: 0.82 }}
                      animate={{ scale: displayStar >= n ? 1.12 : 1 }}
                      transition={{ type:'spring', stiffness:500, damping:22 }}
                    >
                      <svg width="36" height="36" viewBox="0 0 24 24"
                        fill={displayStar >= n ? '#fbbf24' : '#e2e8f0'}
                        style={{ filter: displayStar >= n ? 'drop-shadow(0 0 6px rgba(251,191,36,0.5))' : 'none',
                                 transition: 'fill 0.15s, filter 0.15s' }}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </motion.button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  {displayStar > 0 && (
                    <motion.span className="rvmodal-star-label"
                      key={displayStar}
                      initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-4 }}
                      transition={{ duration:0.18 }}>
                      {STAR_LABELS[displayStar]}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Name + School row */}
              <div className="rvmodal-row">
                <div className="rvmodal-field">
                  <label>Your Name <span className="rvmodal-req">*</span></label>
                  <input name="name" placeholder="Enter your name" value={form.name} onChange={change}/>
                </div>
                <div className="rvmodal-field">
                  <label>School Name / Designation</label>
                  <input name="school" placeholder="Enter" value={form.school} onChange={change}/>
                </div>
              </div>

              {/* Textarea */}
              <div className="rvmodal-field">
                <div className="rvmodal-field-header">
                  <label>Your detailed review <span className="rvmodal-req">*</span></label>
                  <span className={`rvmodal-charcount ${charOk ? 'ok' : ''}`}>
                    {charOk ? '✓ ' : ''}{charCount} / {MIN_CHARS} minimum
                  </span>
                </div>
                <textarea
                  name="text"
                  rows={3}
                  placeholder="What did you like? What could be better? Your feedback helps us maintain the editorial standard of Etomosphere."
                  value={form.text}
                  onChange={change}
                />
                <div className="rvmodal-char-bar">
                  <motion.div className="rvmodal-char-fill"
                    animate={{ width: `${Math.min((charCount / MIN_CHARS) * 100, 100)}%`,
                               background: charOk ? '#10b981' : '#7c3aed' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Upload zone */}
              <div className="rvmodal-field">
                <label>Upload Images</label>
                <div
                  className={`rvmodal-upload${dragOver ? ' drag-over' : ''}`}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
                  onClick={() => fileRef.current?.click()}
                >
                  <input ref={fileRef} type="file" multiple accept="image/*,.pdf"
                    style={{ display:'none' }} onChange={e => handleFiles(e.target.files)} />
                  <div className="rvmodal-upload-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                  {files.length > 0 ? (
                    <p className="rvmodal-upload-files">
                      {files.map(f => f.name).join(', ')}
                    </p>
                  ) : (
                    <>
                      <p className="rvmodal-upload-text">
                        Drag and drop or <span className="rvmodal-upload-link">browse files</span>
                      </p>
                      <p className="rvmodal-upload-hint">Upload images, max 5MB each</p>
                    </>
                  )}
                </div>
              </div>

              {submitError && <p style={{color:'#ef4444',fontSize:'0.85rem',marginBottom:'8px'}}>{submitError}</p>}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={!form.name || !charOk || form.rating === 0 || isSubmitting}
                className={`rvmodal-submit${!form.name || !charOk || form.rating === 0 || isSubmitting ? ' disabled' : ''}`}
                whileHover={form.name && charOk && form.rating > 0 && !isSubmitting ? { scale:1.02 } : {}}
                whileTap={form.name  && charOk && form.rating > 0 && !isSubmitting ? { scale:0.97 } : {}}
              >
                {isSubmitting ? 'Submitting…' : 'Submit Review'}
              </motion.button>
              <p style={{textAlign:'center',fontSize:'0.78rem',color:'#94a3b8',marginTop:'8px'}}>
                Your review will appear after admin approval.
              </p>
            </form>
          </>
        )}
        </div>{/* end rvmodal-body */}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
function Reviews() {
  const [shown,      setShown]      = useState(INITIAL);
  const [showModal,  setShowModal]  = useState(false);
  const [apiReviews, setApiReviews] = useState([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    axios.get(`${APIURL}/api/public-reviews/`)
      .then(res => {
        const data = res.data;
        const list = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
        setApiReviews(list);
      })
      .catch(() => setApiReviews([]))
      .finally(() => setLoading(false));
  }, []);

  const visible  = apiReviews.slice(0, shown);
  const hasMore  = shown < apiReviews.length;
  const hasAny   = apiReviews.length > 0;
  const avgRating = hasAny
    ? apiReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / apiReviews.length
    : 0;
  const satisfactionRate = hasAny
    ? Math.round((apiReviews.filter(r => (r.rating || 0) >= 4).length / apiReviews.length) * 100)
    : 0;

  return (
    <div className="reviews-page">
      {/* Floating background orbs */}
      <div className="rv-orbs" aria-hidden="true">
        <div className="rv-orb rv-orb-1" />
        <div className="rv-orb rv-orb-2" />
        <div className="rv-orb rv-orb-3" />
        <div className="rv-orb rv-orb-4" />
        <div className="rv-orb rv-orb-5" />
      </div>

      <Header />

      {/* ── Hero ── */}
      <section className="rv-hero">
        <motion.div className="rv-hero-inner"
          initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, ease:EASE }}
        >
          <h1 className="rv-hero-heading">
            Loved by educators<br/>
            <span className="rv-hero-gradient">across India</span>
          </h1>

          <div className="rv-hero-stats">
            {hasAny && (
              <>
                <div className="rv-hero-stat">
                  <span className="rv-hero-stat-num"><CountUp to={avgRating} decimals={1} duration={1800}/></span>
                  <div className="rv-hero-stat-sub">
                    <div className="rv-stars-hero">
                      {[1,2,3,4,5].map(i => (
                        <motion.svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24"
                          initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }}
                          transition={{ type:'spring', stiffness:500, damping:18, delay:0.5+i*0.07 }}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </motion.svg>
                      ))}
                    </div>
                    <span className="rv-hero-stat-label">{apiReviews.length} reviews</span>
                  </div>
                </div>

                <div className="rv-hero-divider" />

                <div className="rv-hero-stat">
                  <span className="rv-hero-stat-num"><CountUp to={satisfactionRate} decimals={0} duration={1400}/>%</span>
                  <span className="rv-hero-stat-label">satisfaction rate</span>
                </div>

                <div className="rv-hero-divider" />
              </>
            )}

            <motion.button className="rv-write-btn"
              onClick={() => setShowModal(true)}
              whileHover={{ scale:1.06, y:-2 }} whileTap={{ scale:0.96 }}>
              + Write a Review
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ── Glass card grid ── */}
      <div className="rv-grid-wrap">
        {loading ? (
          <div className="rv-loading">
            <div className="rv-spinner" />
            <p className="rv-loading-text">Loading reviews…</p>
          </div>
        ) : hasAny ? (
          <>
            <div className="rv-grid">
              {visible.map((review, i) => (
                <GlassCard
                  key={review.id}
                  review={review}
                  index={i}
                  delay={(i % 3) * 0.08}
                />
              ))}
            </div>

            {hasMore && (
              <motion.div className="rv-loadmore"
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}>
                <motion.button className="rv-loadmore-btn"
                  onClick={() => setShown(s => Math.min(s + STEP, apiReviews.length))}
                  whileHover={{ scale:1.05, y:-2 }} whileTap={{ scale:0.97 }}>
                  Load more reviews
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </motion.button>
                <p className="rv-loadmore-hint">{apiReviews.length - shown} more reviews</p>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div className="rv-empty"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, ease:EASE }}>
            <div className="rv-empty-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <p className="rv-empty-title">No reviews yet</p>
            <p className="rv-empty-sub">Be the first to share your experience with Etomosphere.</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showModal && <WriteReviewModal isOpen={showModal} onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default Reviews;
