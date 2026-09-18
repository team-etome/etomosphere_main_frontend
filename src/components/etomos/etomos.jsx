import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Header from '../header/header.jsx';
import homepage1 from '../../assets/z.png';
import './etomos.css';

const Etomos = () => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  /* Ultra-smooth spring — high damping for cinematic lag */
  const mx = useSpring(rawX, { stiffness: 20, damping: 16, mass: 1.2 });
  const my = useSpring(rawY, { stiffness: 20, damping: 16, mass: 1.2 });

  /* ── Layer 0: Sky / deep background — slowest, drifts opposite ── */
  const bgX = useTransform(mx, [-1, 1], ['6%', '-6%']);
  const bgY = useTransform(my, [-1, 1], ['4%', '-4%']);

  /* ── Layer 1: Atmospheric haze — medium speed, same direction as cursor ── */
  const hazeX = useTransform(mx, [-1, 1], ['-14px', '14px']);
  const hazeY = useTransform(my, [-1, 1], ['-10px', '10px']);

  /* ── Layer 2: Foreground depth vignette — faster ── */
  const fgX = useTransform(mx, [-1, 1], ['-28px', '28px']);
  const fgY = useTransform(my, [-1, 1], ['-18px', '18px']);

  /* ── Layer 3: Text content — most travel (closest to viewer) ── */
  const ctX = useTransform(mx, [-1, 1], ['-22px', '22px']);
  const ctY = useTransform(my, [-1, 1], ['-14px', '14px']);

  /* ── 3D tilt on the scene (perspective in CSS) ── */
  const rotY = useTransform(mx, [-1, 1], [-6, 6]);
  const rotX = useTransform(my, [-1, 1], [4, -4]);

  /* Framer Motion handler — feeds rawX/rawY for background parallax */
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width  * 2 - 1);
    rawY.set((e.clientY - r.top)  / r.height * 2 - 1);
  };
  const onLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <div className="etomos-container">
      <Header />

      <section
        className="etomos-hero"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {/* ── 3D perspective scene wrapper — background photo ── */}
        <motion.div
          className="etomos-scene"
          style={{ rotateX: rotX, rotateY: rotY }}
        >
          <motion.div className="etomos-hero-bg" style={{ x: bgX, y: bgY }}>
            <img src={homepage1} alt="" className="etomos-hero-img" />
          </motion.div>
          <div className="etomos-hero-overlay" />
          <motion.div className="etomos-layer-haze" style={{ x: hazeX, y: hazeY }} />
          <motion.div className="etomos-layer-fg"   style={{ x: fgX,   y: fgY   }} />
        </motion.div>

        {/* ── Hero text — left column ── */}
        <motion.div
          className="etomos-hero-content"
          style={{ x: ctX, y: ctY }}
        >
          <h1 className="etomos-hero-title">
            Future-Ready<br />Learning Starts Here
          </h1>
          <p className="etomos-hero-subtitle">
            Explore innovative educational technologies, smart classroom systems,
            connected learning ecosystems, and digital campus solutions.
          </p>
          <div className="etomos-hero-btns">
            <Link to="/enquiry" className="etomos-btn-primary">Request a Demo</Link>
            <Link to="/edumart" className="etomos-btn-secondary">
              Explore Products
              <span className="etomos-btn-arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          </div>
        </motion.div>

      </section>
    </div>
  );
};

export default Etomos;
