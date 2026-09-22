import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import ContactModal from '../enquiry/ContactModal.jsx';
import f1 from '../../assets/f1.png';
import f2 from '../../assets/ChatGPT Image Sep 14_ 2026_ 11_11_56 AM.png';
import tce from '../../assets/TCE.webp';
import f3 from '../../assets/a (1).png';
import f4 from '../../assets/f4.png';
import f5 from '../../assets/f5.png';
import f6 from '../../assets/f6.png';
import img1 from '../../assets/1.png';
import img2 from '../../assets/2.png';
import img4 from '../../assets/4.png';
import img5 from '../../assets/5.png';
import t1 from '../../assets/3q.png';
import t2 from '../../assets/4q.png';
import t3 from '../../assets/2q.png';
import t4 from '../../assets/1q.png';
import './ethos.css';

const EASE = [0.16, 1, 0.3, 1];
const TITLE_LINES = ['Transforming Education Through', 'Innovation'];

const IG_ITEMS = [
  {
    title: 'Nationwide Presence',
    body: 'Expanding educational innovation to institutions across India through technology-driven solutions.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    title: 'Transforming Learning Environments',
    body: 'Enabling schools, colleges, and organizations to adopt modern and engaging learning experiences.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3.33 2 8.67 2 12 0v-5"/>
      </svg>
    ),
  },
  {
    title: 'Growing Ecosystem of Innovation',
    body: 'Continuously evolving with new products, platforms, and technologies designed for the future of education.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L8.5 8.5 2 9.27l5 4.87-1.18 6.88L12 17.77l6.18 3.25L17 14.14 22 9.27l-6.5-.77z"/>
      </svg>
    ),
  },
  {
    title: 'Building Sustainable Impact',
    body: 'Combining innovation and responsibility to create long-term value for institutions, learners, and communities.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8C8 10 5.9 16.17 3.82 19.6a.78.78 0 0 0 1.27.8C7.46 17.84 10.31 15 17 14"/>
        <path d="M17 8l-1-4.5A10.06 10.06 0 0 1 22 12c0 5.52-4.48 10-10 10"/>
      </svg>
    ),
  },
];

const TL_ENTRIES = [
  {
    year: '2013', img: img1,
    title: 'The Beginning',
    body: 'A vision emerged to transform how technology was experienced in learning and professional environments. At a time when projectors dominated the market, interactive panels introduced a new way of engaging, teaching, and presenting.',
  },
  {
    year: '2016', img: img2,
    title: 'The Breakthrough',
    body: 'What started with demonstrations and conversations soon became a movement. Early adopters embraced the possibilities, leading to growing demand and widespread acceptance of interactive display technology.',
  },
  {
    year: '2019', img: f3,
    title: 'Expanding Across India',
    body: 'A passionate team came together with a shared mission — to educate, inspire, and accelerate digital transformation. Through continuous engagement with institutions and organizations, innovation reached audiences across the country.',
  },
  {
    year: '2023', img: img4,
    title: 'A New Chapter',
    body: 'The next generation of innovation arrived with a learning-first device designed to support modern educational needs. Built around accessibility, efficiency, and learner-focused experiences, it marked the beginning of a new era.',
  },
  {
    year: '2025', img: img5,
    title: 'Creating a New Experience',
    body: 'As educational technology continued to evolve, a new question emerged: why should institutions search across multiple vendors when everything could be experienced in one place? This idea led to the creation of an immersive technology experience center.',
  },
  {
    year: 'Today', img: f2,
    title: 'Building the Future',
    body: 'What began with a single vision has evolved into a growing ecosystem of technology, innovation, and educational transformation. With a passionate team and a future-focused mindset, the journey continues toward creating meaningful impact for learners and institutions alike.',
  },
];

/* 3D tilt card — spring physics follow mouse */
function TiltCard({ children, className, style, tiltStrength = 10, ...rest }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotX = useSpring(useTransform(py, [0, 1], [tiltStrength, -tiltStrength]), { stiffness: 300, damping: 28 });
  const rotY = useSpring(useTransform(px, [0, 1], [-tiltStrength, tiltStrength]), { stiffness: 300, damping: 28 });
  const sc   = useSpring(1, { stiffness: 300, damping: 28 });
  return (
    <motion.div
      className={className}
      style={{ rotateX: rotX, rotateY: rotY, scale: sc, transformStyle: 'preserve-3d', willChange: 'transform', ...style }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top)  / r.height);
        sc.set(1.03);
      }}
      onMouseLeave={() => { px.set(0.5); py.set(0.5); sc.set(1); }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════
   CORE VALUES — Premium 5-Technique System
════════════════════════════════════════ */

const CV_CARDS = [
  { title: 'Innovation',    body: 'Challenging conventional thinking to create better educational experiences.' },
  { title: 'Excellence',    body: 'Maintaining the highest standards in everything we build and deliver.' },
  { title: 'Trust',         body: 'Building lasting relationships through transparency, reliability, and integrity.' },
  { title: 'Sustainability',body: 'Creating solutions that support both education and environmental responsibility.' },
  { title: 'Collaboration', body: 'Working together with institutions, educators, and learners to achieve meaningful outcomes.' },
  { title: 'Growth',        body: 'Embracing continuous learning, improvement, and future possibilities.' },
];

function getScrollTechnique(index) { return ['A', 'B', 'C', 'D', 'E'][index % 5]; }

function useCvScroll() {
  const cvRef = useRef(null);
  const { scrollYProgress: raw } = useScroll({ target: cvRef, offset: ['start 50%', 'end 50%'] });
  const cvProgress = useSpring(raw, { stiffness: 80, damping: 20 });
  return { cvRef, cvProgress };
}

function CvCardA({ card, delay = 0 }) {
  return (
    <div className="cv-tech-outer">
      <motion.div
        className="cv-card"
        initial={{ opacity: 0, y: 28, rotateX: -10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65, ease: EASE, delay }}
        style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
      >
        <h3 className="cv-card-title">{card.title}</h3>
        <p className="cv-card-body">{card.body}</p>
      </motion.div>
    </div>
  );
}

function CvCardB({ card, delay = 0 }) {
  return (
    <motion.div
      className="cv-card cv-card-rel"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: EASE, delay }}
    >
      <div className="cv-b-accent" />
      <h3 className="cv-card-title">{card.title}</h3>
      <p className="cv-card-body">{card.body}</p>
    </motion.div>
  );
}

function CvCardC({ card, delay = 0 }) {
  return (
    <motion.div
      className="cv-card cv-card-glass"
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: EASE, delay }}
      style={{ willChange: 'transform' }}
    >
      <div className="cv-c-glow" />
      <h3 className="cv-card-title">{card.title}</h3>
      <p className="cv-card-body">{card.body}</p>
    </motion.div>
  );
}

function CvCardD({ card, delay = 0 }) {
  const px   = useMotionValue(0.5);
  const py   = useMotionValue(0.5);
  const rotX = useSpring(useTransform(py, [0, 1], [ 6, -6]), { stiffness: 80, damping: 20 });
  const rotY = useSpring(useTransform(px, [0, 1], [-6,  6]), { stiffness: 80, damping: 20 });
  const sc   = useSpring(1, { stiffness: 80, damping: 20 });
  return (
    <div className="cv-tech-outer">
      <motion.div
        className="cv-card"
        style={{ rotateX: rotX, rotateY: rotY, scale: sc, transformStyle: 'preserve-3d', willChange: 'transform' }}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65, ease: EASE, delay }}
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top)  / r.height);
          sc.set(1.04);
        }}
        onMouseLeave={() => { px.set(0.5); py.set(0.5); sc.set(1); }}
      >
        <h3 className="cv-card-title">{card.title}</h3>
        <p className="cv-card-body">{card.body}</p>
      </motion.div>
    </div>
  );
}

function CvCardE({ card, delay = 0 }) {
  return (
    <motion.div
      className="cv-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: EASE, delay }}
    >
      <h3 className="cv-card-title">{card.title}</h3>
      <p className="cv-card-body">{card.body}</p>
    </motion.div>
  );
}

function CvCardWrapper({ card, index, cvProgress }) {
  const col   = index % 3;
  const row   = Math.floor(index / 3);
  const delay = col * 0.1 + row * 0.15;
  switch (getScrollTechnique(index)) {
    case 'A': return <CvCardA card={card} delay={delay} />;
    case 'B': return <CvCardB card={card} delay={delay} />;
    case 'C': return <CvCardC card={card} delay={delay} />;
    case 'D': return <CvCardD card={card} delay={delay} />;
    case 'E': return <CvCardE card={card} delay={delay} />;
    default:  return <CvCardA card={card} delay={delay} />;
  }
}

function CvCounter({ cvProgress }) {
  const [num, setNum] = useState(1);
  useEffect(() => {
    return cvProgress.on('change', v => {
      setNum(Math.min(Math.max(Math.ceil((v / 0.38) * CV_CARDS.length), 1), CV_CARDS.length));
    });
  }, [cvProgress]);
  return (
    <div className="cv-counter-wrap">
      <AnimatePresence mode="wait">
        <motion.span
          key={num}
          className="cv-count-num"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0,  opacity: 1 }}
          exit={{    y: -16, opacity: 0 }}
          transition={{ duration: 0.14 }}
        >
          {String(num).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
      <span className="cv-count-label">&thinsp;/ {String(CV_CARDS.length).padStart(2, '0')} Core Values</span>
    </div>
  );
}



/* ─── Trionn-style horizontal scroll timeline ─── */
function HorizontalTimeline({ entries }) {
  const driverRef  = useRef(null);
  const stageRef   = useRef(null);
  const trackRef   = useRef(null);
  const travelRef  = useRef(0);
  const count      = entries.length;
  const [activeIdx, setActiveIdx] = useState(0);
  const prevRef    = useRef(0);
  useEffect(() => {
    const driver = driverRef.current;
    const stage  = stageRef.current;
    const track  = trackRef.current;
    if (!driver || !stage || !track) return;

    const calcTravel = () => {
      const cards = track.querySelectorAll('.htl-card');
      if (!cards.length) return;
      travelRef.current = cards[cards.length - 1].offsetLeft;
    };

    const st = ScrollTrigger.create({
      trigger:       driver,
      start:         'top top',
      end:           'bottom bottom',
      pin:           stage,
      anticipatePin: 1,
      scrub:         1.4,
      onRefresh:     calcTravel,
      onUpdate(self) {
        gsap.set(track, { x: -(self.progress * travelRef.current) });
        const next = Math.min(Math.round(self.progress * (count - 1)), count - 1);
        if (next !== prevRef.current) {
          setActiveIdx(next);
          prevRef.current = next;
        }
      },
    });

    calcTravel();
    return () => st.kill();
  }, [count]);

  const e = entries[activeIdx];

  return (
    <div className="htl-section">
      <div ref={driverRef} className="htl-driver">
        <div ref={stageRef} className="htl-stage">

          {/* ── LEFT: fixed info panel ── */}
          <div className="htl-left">
            <span className="htl-eyebrow">Since 2013</span>
            <h2 className="htl-heading">Our<br />Evolution</h2>

            <AnimatePresence mode="wait">
              <motion.div key={activeIdx} className="htl-entry-info"
                initial={{ y: 36, opacity: 0, backgroundColor: 'rgba(76,94,199,0.10)' }}
                animate={{ y: 0,  opacity: 1, backgroundColor: 'rgba(76,94,199,0)' }}
                exit={{    y: -28, opacity: 0 }}
                transition={{
                  y:               { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
                  opacity:         { duration: 0.38 },
                  backgroundColor: { duration: 0.9, ease: 'easeOut' },
                }}
                style={{ borderRadius: 12 }}
              >
                <span className="htl-year-chip">{e.year}</span>
                <h3 className="htl-entry-title">{e.title}</h3>
                <p  className="htl-entry-body">{e.body}</p>
              </motion.div>
            </AnimatePresence>

            <div className="htl-progress">
              <span className="htl-counter">
                <strong>{String(activeIdx + 1).padStart(2, '0')}</strong>
                <span className="htl-counter-sep"> / {String(count).padStart(2, '0')}</span>
              </span>
              <div className="htl-dots">
                {entries.map((_, i) => (
                  <motion.span key={i} className="htl-dot"
                    animate={{
                      width:      i === activeIdx ? 24 : 6,
                      background: i === activeIdx ? '#4c5ec7' : i < activeIdx ? 'rgba(76,94,199,0.35)' : '#e2e8f0',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: horizontal card track ── */}
          <div className="htl-right">
            <div ref={trackRef} className="htl-track">
              {entries.map((card, i) => (
                <div key={i} data-idx={i} className={`htl-card${i === activeIdx ? ' htl-card--active' : ''}`}>
                  <img src={card.img} alt={card.title} className="htl-card-img" />
                  <div className="htl-card-foot">
                    <span className="htl-card-yr">{card.year}</span>
                    <span className="htl-card-name">{card.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


function Ethos() {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);

  // Hero ambient parallax
  const heroX  = useMotionValue(0);
  const heroY  = useMotionValue(0);
  const shX    = useSpring(heroX, { stiffness: 40, damping: 20 });
  const shY    = useSpring(heroY, { stiffness: 40, damping: 20 });
  const orb1x  = useTransform(shX, [-1, 1], [-40, 40]);
  const orb1y  = useTransform(shY, [-1, 1], [-30, 30]);
  const orb2x  = useTransform(shX, [-1, 1], [25, -25]);
  const orb2y  = useTransform(shY, [-1, 1], [20, -20]);
  const orb3x  = useTransform(shX, [-1, 1], [-18, 18]);
  const orb3y  = useTransform(shY, [-1, 1], [14, -14]);


  // Core Values
  const { cvRef, cvProgress } = useCvScroll();
  const spotBg = useTransform(cvProgress, [0, 1], [
    'radial-gradient(ellipse 700px 580px at 15% 80%, rgba(76,94,199,0.09) 0%, transparent 65%)',
    'radial-gradient(ellipse 700px 580px at 85% 20%, rgba(76,94,199,0.09) 0%, transparent 65%)',
  ]);
  const orbScrollX     = useTransform(cvProgress, [0, 1], [0, -50]);
  const orbScrollScale = useTransform(cvProgress, [0, 0.5, 1], [0.85, 1.15, 0.9]);

  return (
    <div className="ethos-page">
      <Header />

      {/* ── Hero ── */}
      <section
        className="ethos-hero"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          heroX.set((e.clientX - r.left) / r.width  * 2 - 1);
          heroY.set((e.clientY - r.top)  / r.height * 2 - 1);
        }}
        onMouseLeave={() => { heroX.set(0); heroY.set(0); }}
      >
        <motion.div className="ethos-orb-track eo-t1" style={{ x: orb1x, y: orb1y }}>
          <motion.div className="ethos-orb eo-1"
            animate={{ y: [0, -38, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.div>
        <motion.div className="ethos-orb-track eo-t2" style={{ x: orb2x, y: orb2y }}>
          <motion.div className="ethos-orb eo-2"
            animate={{ y: [0, 28, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }} />
        </motion.div>
        <motion.div className="ethos-orb-track eo-t3" style={{ x: orb3x, y: orb3y }}>
          <motion.div className="ethos-orb eo-3"
            animate={{ y: [0, -22, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 5 }} />
        </motion.div>

        <div className="ethos-content">
          <h1 className="ethos-title">
            {TITLE_LINES.map((line, i) => (
              <span key={i} className="ethos-line-wrap">
                <motion.span
                  className="ethos-line"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.08 + i * 0.13 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="ethos-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
          >
            We are committed to creating meaningful learning experiences through
            technology, sustainability, and forward-thinking solutions that
            empower institutions, educators, and learners.
          </motion.p>

          <motion.div
            className="ethos-btns"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.72 }}
          >
            <button
              className="ethos-btn ethos-btn-primary"
              onClick={() => navigate('/etome')}
            >
              Explore our Journey
            </button>

            <button
              className="ethos-btn ethos-btn-outline"
              onClick={() => setShowContact(true)}
            >
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Partnership banner ── */}
      <section className="partner-section">
        <TiltCard
          className="partner-card"
          tiltStrength={5}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.72, ease: EASE }}
        >
          <div className="partner-text">
            <h2 className="partner-title">
              A Partnership<br />Built for Better<br />Learning
            </h2>
            <p className="partner-body">
              Through strategic collaborations with leading educational
              organizations, we continue to deliver innovative solutions that
              support institutions, educators, and learners.
            </p>
          </div>
          <div className="partner-logo">
            <img src={tce} alt="TATA ClassEdge" />
          </div>
        </TiltCard>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="ethos-mv-section">
        <div className="ethos-mv-grid">
          <TiltCard
            className="ethos-mv-card ethos-mv-dark"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.72, ease: EASE }}
          >
            <div className="ethos-mv-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <h3 className="ethos-mv-title">Our Mission</h3>
            <p className="ethos-mv-body">
              To empower educational institutions through innovative technology,
              connected learning experiences, and sustainable solutions that
              create meaningful impact for learners and educators.
            </p>
          </TiltCard>

          <TiltCard
            className="ethos-mv-card ethos-mv-light"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.72, ease: EASE, delay: 0.14 }}
          >
            <div className="ethos-mv-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3 className="ethos-mv-title">Our Vision</h3>
            <p className="ethos-mv-body">
              To shape the future of education by building intelligent,
              accessible, and future-ready ecosystems that inspire learning,
              innovation, and growth.
            </p>
          </TiltCard>
        </div>
      </section>

      {/* ── Our Evolution — Horizontal scroll timeline ── */}
      <HorizontalTimeline entries={TL_ENTRIES} />

      {/* ── Core Values — Premium 5-Technique System ── */}
      <section className="cv-section" ref={cvRef}>
        <motion.div className="cv-spotlight" style={{ background: spotBg }} />

        <motion.div className="cv-orb-track" style={{ x: orbScrollX, scale: orbScrollScale }}>
          <motion.div
            className="cv-orb"
            animate={{ x: [0, 35, -20, 0], y: [0, -28, 18, 0], rotate: [0, 140, 280, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <div className="cv-section-head">
          <motion.h2
            className="cv-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Core Values
          </motion.h2>
        </div>

        <div className="cv-grid">
          <div className="cv-col">
            <CvCardWrapper card={CV_CARDS[0]} index={0} cvProgress={cvProgress} />
            <CvCardWrapper card={CV_CARDS[3]} index={3} cvProgress={cvProgress} />
          </div>
          <div className="cv-col cv-col-center">
            <CvCardWrapper card={CV_CARDS[1]} index={1} cvProgress={cvProgress} />
            <CvCardWrapper card={CV_CARDS[4]} index={4} cvProgress={cvProgress} />
          </div>
          <div className="cv-col">
            <CvCardWrapper card={CV_CARDS[2]} index={2} cvProgress={cvProgress} />
            <CvCardWrapper card={CV_CARDS[5]} index={5} cvProgress={cvProgress} />
          </div>
        </div>
      </section>

      {/* ── Impact & Growth ── */}
      <section className="ig-section">
        <motion.h2
          className="ig-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          Impact &amp; Growth
        </motion.h2>

        <div className="ig-grid">
          {IG_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              className="ig-item"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.03 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.1 }}
            >
              <div className="ig-icon-wrap">{item.icon}</div>
              <h3 className="ig-item-title">{item.title}</h3>
              <p className="ig-item-body">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Why Institutions Choose Us ── */}
      <section className="wic-section">
        <motion.h2
          className="wic-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          Why Institutions Choose Us
        </motion.h2>

        <div className="wic-row">
          <motion.img
            src={t4}
            alt="Driving Innovation"
            className="wic-img"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.04 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: EASE }}
          />
          <motion.div
            className="wic-text"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.12 }}
          >
            <h3 className="wic-title">Driving Innovation in Modern Education</h3>
            <p className="wic-body">
              We continuously explore and introduce innovative technologies that
              help institutions create engaging, interactive, and future-ready
              learning experiences. Our focus is on enabling educational
              environments that evolve with the changing needs of learners and
              educators.
            </p>
          </motion.div>
        </div>

        <div className="wic-row wic-row-reverse">
          <motion.div
            className="wic-text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <h3 className="wic-title">Deep Understanding of Educational Needs</h3>
            <p className="wic-body">
              With extensive experience in the education sector, we understand
              the challenges institutions face in delivering quality learning
              experiences. This understanding helps us create solutions that are
              practical, impactful, and aligned with real educational requirements.
            </p>
          </motion.div>
          <motion.img
            src={t3}
            alt="Deep Understanding"
            className="wic-img"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.04 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.12 }}
          />
        </div>

        <div className="wic-row">
          <motion.img
            src={t1}
            alt="Building a Connected Learning Ecosystem"
            className="wic-img"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.04 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: EASE }}
          />
          <motion.div
            className="wic-text"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.12 }}
          >
            <h3 className="wic-title">Building a Connected Learning Ecosystem</h3>
            <p className="wic-body">
              Our solutions are designed to work together seamlessly, connecting
              classrooms, learning platforms, assessments, and institutional
              operations. This integrated approach creates a unified ecosystem
              that supports collaboration, efficiency, and growth.
            </p>
          </motion.div>
        </div>

        <div className="wic-row wic-row-reverse">
          <motion.div
            className="wic-text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <h3 className="wic-title">Committed to Long-Term Success</h3>
            <p className="wic-body">
              We believe successful partnerships go beyond implementation. By
              providing continuous support, guidance, and innovation, we help
              institutions maximize value from their investments and confidently
              prepare for the future of education.
            </p>
          </motion.div>
          <motion.img
            src={t2}
            alt="Committed to Long-Term Success"
            className="wic-img"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.04 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.12 }}
          />
        </div>
      </section>

      <Footer />

      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
}

export default Ethos;
