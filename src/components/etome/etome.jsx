  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { motion } from 'framer-motion';
  import Header from '../header/header.jsx';
  import Footer from '../footer/footer.jsx';
  import RequestDemoModal from '../enquiry/RequestDemoModal.jsx';
  import { useCart } from '../../context/CartContext.jsx';
  import heroMainImg  from '../../assets/main1.png';
  import pic4 from '../../assets/eco1-new.png';
  import pic5 from '../../assets/praxam.png';
  import pic6 from '../../assets/etome11.png';
  import pic7 from '../../assets/eco-23.png';
  import frame1 from '../../assets/Frame1.png';
  import frame2 from '../../assets/Frame 1000011165.png';
  import etomeStylusImg from '../../assets/0Q9A0395.png';
  import etomeCoverImg  from '../../assets/0Q9A0380.png';
  import etomeDuaImg    from '../../assets/Etome 2 1.jpg';
  import ecoboardImg       from '../../assets/-LCD-Blackboard.jpg';
  import ecoboardStylusImg from '../../assets/etome eco board.jpg';
  import './etome.css';

  const STATIC_INNOVATIONS = [
    {
      family: 'Etome Family',
      img: frame1,
      products: [
        { id: 'etome-dua',    name: 'Etome Dua',    desc: 'A next-generation interactive display built for collaborative classroom engagement.', img: etomeDuaImg },
        { id: 'etome-stylus', name: 'Etome Stylus',  desc: 'Precision stylus input system designed for seamless digital annotation.', img: etomeStylusImg },
        { id: 'etome-cover',  name: 'Etome Cover',   desc: 'Durable protective accessory that keeps your Etome device safe in any environment.', img: etomeCoverImg },
      ],
    },
    {
      family: 'Ecoboard Family',
      img: frame1,
      products: [
        { id: 'ecoboard',        name: 'Ecoboard',        desc: 'Eco-friendly interactive whiteboard crafted for sustainable, high-performance learning.', img: ecoboardImg },
        { id: 'ecoboard-stylus', name: 'Ecoboard Stylus',  desc: 'Responsive stylus engineered for smooth, accurate writing on Ecoboard surfaces.', img: ecoboardStylusImg },
      ],
    },
  ];

  const EASE = [0.16, 1, 0.3, 1];
  const TITLE_LINES = ['Innovating the', 'Future of', 'Learning'];

  const Etome = () => {
    const navigate  = useNavigate();
    const [showDemo, setShowDemo] = useState(false);
    const { addToCart, removeFromCart, updateQty, cartItems } = useCart();


    return (
      <div className="etome-page">
        <Header />

        <section className="etome-hero">


          {/* Hero text */}
          <div className="hero-content">

            {/* Line-by-line mask reveal */}
            <h1 className="hero-title">
              {TITLE_LINES.map((line, i) => (
                <span key={i} className="title-line-wrap">
                  <motion.span
                    className="title-line"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.78, ease: EASE, delay: 0.08 + i * 0.14 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, ease: EASE, delay: 0.58 }}
            >
              Discover technologies designed to transform education through intelligent digital experiences and sustainable innovation, empowering institutions to teach, learn, and grow with confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.76 }}
            >
              <button
                className="hero-btn"
                onClick={() => window.open('https://www.etome.in', '_blank', 'noopener,noreferrer')}
              >
                Learn More
              </button>
            </motion.div>
          </div>

          {/* Monitors */}
          <div className="hero-image-wrap">
            <img src={heroMainImg} alt="Etome products" className="hero-main-img" />
          </div>
        </section>

        {/* ── Section 2: Built on a Shared Vision ── */}
        <section className="etome-vision">
          {/* Image: slides in from left, photo zooms gently to rest */}
          <motion.div
            className="vision-image"
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={pic4}
              alt="Shared Vision"
              initial={{ scale: 1.10 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.30, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          {/* Right column: slides in from right, slightly delayed */}
          <motion.div
            className="vision-content"
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay: 0.10 }}
          >
            <motion.h2
              className="vision-title"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            >
              Built on a Shared Vision
            </motion.h2>

            <div className="vision-grid">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a9 9 0 0 1 9 9c0 4.97-9 13-9 13S3 15.97 3 11a9 9 0 0 1 9-9z"/><circle cx="12" cy="11" r="3"/>
                    </svg>
                  ),
                  title: 'Eco-Conscious Innovation',
                  desc: 'Designed with sustainability in mind to reduce environmental impact while supporting modern learning needs.',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                  ),
                  title: 'Connected Learning',
                  desc: 'Brings learners, educators, and resources together through a seamless and integrated educational experience.',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                  ),
                  title: 'Intelligent Technology',
                  desc: 'Leverages smart solutions to enhance engagement, efficiency, and everyday learning interactions.',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                    </svg>
                  ),
                  title: 'Long-Term Value',
                  desc: 'Built for durability, adaptability, and continued relevance in evolving educational environments.',
                },
              ].map(({ icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  className="vision-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.26 + i * 0.09 }}
                  whileHover={{ y: -6, transition: { type: 'spring', stiffness: 320, damping: 22 } }}
                >
                  <div className="vision-card-icon">{icon}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Section 3: Praxam ── */}
        <section className="etome-praxam">
          <motion.div
            className="praxam-card"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="praxam-text">
              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.60, ease: [0.22, 1, 0.36, 1], delay: 0.20 }}
              >
                Praxam — Intelligent Examination Experience.
              </motion.h2>
              <motion.p
                className="praxam-sub"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
              >
                Part of the Connected Learning Experience
              </motion.p>
              <motion.p
                className="praxam-desc"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.36 }}
              >
                Empowering institutions with AI-powered assessments, real-time analytics,
                and scalable online examination infrastructure. Redefining evaluation
                workflows with secure, adaptive technology.
              </motion.p>
              <motion.div
                className="praxam-btns"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.50, ease: [0.22, 1, 0.36, 1], delay: 0.44 }}
              >
                <button className="praxam-btn-primary" onClick={() => setShowDemo(true)}>Request Demo</button>
                <button className="praxam-btn-ghost" onClick={() => window.open('https://www.etome.in/apps', '_blank', 'noopener,noreferrer')}>Learn More</button>
              </motion.div>
            </div>
            <motion.div
              className="praxam-image"
              initial={{ opacity: 0, x: 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            >
              <motion.img
                src={pic5}
                alt="Praxam tablet"
                initial={{ scale: 1.10 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.30, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ── Section 3b: Explore Our Innovations ── */}
        <section className="etome-innovations">
          {/* Title: scale-in + fade-up from below */}
          <motion.h2
            className="innovations-title"
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            Explore Our Innovations
          </motion.h2>

          {STATIC_INNOVATIONS.map(({ family, img, products }) => (
            <div key={family} className="innovations-group">
              {/* Group label: wipe in from left */}
              <motion.h3
                className="innovations-group-title"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {family}
              </motion.h3>

              <div className="innovations-grid">
                {products.map((p, pi) => {
                  const cartItem = cartItems.find(c => c.productId === p.id);
                  const inCart   = !!cartItem;
                  const qty      = cartItem?.quantity ?? 0;
                  const decrease = () => { if (qty <= 1) removeFromCart(p.id); else updateQty(p.id, qty - 1); };
                  const increase = () => updateQty(p.id, qty + 1);
                  return (
                    <motion.div
                      key={p.id}
                      className="innovations-card"
                      initial={{ opacity: 0, y: 44 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.18 }}
                      transition={{ duration: 0.60, ease: [0.22, 1, 0.36, 1], delay: pi * 0.11 }}
                      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                    >
                      <div className="innovations-card-img">
                        <motion.img
                          className={p.img ? 'innovations-card-img-contain' : ''}
                          src={p.img || img}
                          alt={p.name}
                          initial={{ scale: 1.08 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true, amount: 0.18 }}
                          transition={{ duration: 1.20, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                      <div className="innovations-card-body">
                        <h4 className="innovations-card-name">{p.name}</h4>
                        <p className="innovations-card-desc">{p.desc}</p>
                        {inCart ? (
                          <div className="innovations-qty-ctrl">
                            <button
                              className="innovations-qty-btn"
                              onClick={decrease}
                              aria-label={qty <= 1 ? 'Remove from cart' : 'Decrease quantity'}
                            >
                              {qty <= 1 ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6"/>
                                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                                  <path d="M10 11v6M14 11v6"/>
                                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                                </svg>
                              ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                  <line x1="5" y1="12" x2="19" y2="12"/>
                                </svg>
                              )}
                            </button>
                            <span className="innovations-qty-label">{qty} in cart</span>
                            <button className="innovations-qty-btn" onClick={increase} aria-label="Add one more">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <button
                            className="innovations-card-btn"
                            onClick={() => addToCart({ productId: p.id, name: p.name, description: p.desc, image: p.img || img })}
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* ── Section 4: Inside the Etome Ecosystem ── */}
        <section className="etome-ecosystem">
          <div className="ecosystem-header">
            <motion.h2
              className="ecosystem-title"
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              Inside the Etome Ecosystem.
            </motion.h2>
            <motion.p
              className="ecosystem-sub"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.60, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
            >
              A modular suite of educational tools designed to work in perfect harmony,
              scaling from single classrooms to national institutions.
            </motion.p>
          </div>

          <div className="ecosystem-grid">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                ),
                title: 'Connected Learning Ecosystem',
                desc: 'Bring learning, assessment, communication, and administration together in one seamless digital experience.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                  </svg>
                ),
                title: 'Centralized Institution Management',
                desc: 'Manage academic operations, users, content, and workflows from a unified platform.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                ),
                title: 'Data-Driven Insights',
                desc: 'Access real-time analytics and actionable insights to support informed decision-making.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
                    <path d="M19 21a7 7 0 1 0-14 0"/>
                  </svg>
                ),
                title: 'Scalable & Future-Ready',
                desc: 'Adapt effortlessly to evolving educational needs, growing institutions, and new technologies.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ),
                title: 'Seamless Collaboration',
                desc: 'Enable meaningful collaboration between students, educators, administrators, and stakeholders.',
              },
            ].map(({ icon, title, desc }, i) => (
              /* 3D perspective tilt entrance + mouse-spotlight glow */
              <motion.div
                key={title}
                className="ecosystem-card"
                initial={{ opacity: 0, y: 48, rotateX: 24 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.70, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 22 } }}
                style={{ transformOrigin: 'bottom center' }}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--gx', `${((e.clientX - r.left) / r.width) * 100}%`);
                  e.currentTarget.style.setProperty('--gy', `${((e.clientY - r.top) / r.height) * 100}%`);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty('--gx', '50%');
                  e.currentTarget.style.setProperty('--gy', '150%');
                }}
              >
                {/* Icon: spring-bounce entrance — small+rotated → normal */}
                <motion.div
                  className="ecosystem-icon"
                  initial={{ scale: 0.55, rotate: -22, opacity: 0 }}
                  whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 16, delay: i * 0.09 + 0.24 }}
                >
                  {icon}
                </motion.div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Section 5: A Sustainable Lifecycle ── */}
        <section className="etome-lifecycle">
          <motion.p
            className="lifecycle-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
          </motion.p>
          <motion.h2
            className="lifecycle-title"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            A Sustainable Lifecycle
          </motion.h2>

          <div className="lifecycle-steps">
            {[
              { n: 1, label: 'Create',  desc: 'Develop engaging learning experiences using innovative educational tools and digital technologies.' },
              { n: 2, label: 'Connect', desc: 'Enable seamless collaboration between learners, educators, content, and institutions through a connected ecosystem.' },
              { n: 3, label: 'Sustain', desc: 'Reduce waste and promote environmentally conscious practices with reusable and eco-friendly solutions.' },
              { n: 4, label: 'Evolve',  desc: 'Continuously adapt and improve through data, insights, and future-ready technologies that grow with educational needs.' },
            ].map(({ n, label, desc }, i) => (
              <>
                <motion.div
                  key={n}
                  className="lifecycle-step"
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.60, ease: [0.22, 1, 0.36, 1], delay: i * 0.13 + 0.18 }}
                >
                  <motion.div
                    className="lifecycle-step-badge"
                    initial={{ scale: 0.55, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: 'spring', stiffness: 340, damping: 18, delay: i * 0.13 + 0.22 }}
                  >
                    {String(n).padStart(2, '0')}
                  </motion.div>

                  <motion.h3
                    className="lifecycle-step-label"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.13 + 0.34 }}
                  >
                    {label}
                  </motion.h3>

                  <motion.p
                    className="lifecycle-step-desc"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.48, delay: i * 0.13 + 0.44 }}
                  >
                    {desc}
                  </motion.p>
                </motion.div>

                {i < 3 && (
                  <div key={`conn-${n}`} className="lifecycle-connector">
                    <motion.div
                      className="lifecycle-connector-line"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.13 + 0.38 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>
                )}
              </>
            ))}
          </div>
        </section>

        {/* ── Section 6: Product Showcase ── */}
        <section className="etome-showcase">
          {/* Card 1: Etome — text left, image right */}
          <motion.div
            className="showcase-card"
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
          >
            <div className="showcase-text">
              <motion.span
                className="showcase-tag"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.50, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
              >
                Etome
              </motion.span>
              <motion.h3
                className="showcase-heading"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.50, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
              >
                Digital Intelligence for Modern Learning
              </motion.h3>
              <motion.p
                className="showcase-desc"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
              >
                Empowers institutions with connected technologies that enhance
                engagement, collaboration, and educational outcomes.
              </motion.p>
            </div>
            <div className="showcase-img">
              <motion.img
                src={pic6}
                alt="Etome"
                initial={{ scale: 1.10 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.40, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.07, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
              />
            </div>
          </motion.div>

          {/* Card 2: Ecoboard — image left, text right */}
          <motion.div
            className="showcase-card showcase-card--reverse"
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.10 }}
            whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
          >
            <div className="showcase-img">
              <motion.img
                src={pic7}
                alt="Ecoboard"
                initial={{ scale: 1.10 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.40, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.07, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
              />
            </div>
            <div className="showcase-text">
              <motion.span
                className="showcase-tag"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.50, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
              >
                Ecoboard
              </motion.span>
              <motion.h3
                className="showcase-heading"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.50, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
              >
                Sustainability for Everyday Education
              </motion.h3>
              <motion.p
                className="showcase-desc"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
              >
                Supports environmentally responsible classrooms with reusable,
                eco-conscious solutions built for long-term impact.
              </motion.p>
            </div>
          </motion.div>
        </section>

        <Footer />

        <RequestDemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />
      </div>
    );
  };

  export default Etome;
