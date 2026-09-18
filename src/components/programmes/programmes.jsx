import { useState, useRef, useEffect, useCallback } from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import './programmes.css';

const PROGRAMME_CATEGORIES = [
  {
    title: 'Engagements',
    items: [
      'Principal Leadership Program (PLP)',
      'ClassEdge Classroom Championship (CCC)',
      'Learning Webinars (LW)',
      "India's Future Tycoons (IFT)",
      'Think Quest Awards',
      'Tata Building India School Essay Competition (TBI)',
      'Tata Building India Digital Mini Essays',
    ],
  },
  {
    title: 'Academic Programmes',
    items: [
      'Tata ClassEdge Imprints (TCEI)',
      'Tata ClassEdge Early Years Programme (TCEYP)',
    ],
  },
  {
    title: 'Teacher Development',
    items: [
      'Teacher Professional Development Workshops (TPDW)',
      'Teacher Professional Development Course (TPDC)',
      'Classroom Reflection Programme (CRP)',
    ],
  },
  {
    title: 'Student Development',
    items: ['Student Internship Programme'],
  },
  {
    title: 'Strategic & Academic Collaborations',
    items: [
      'ENpower – Composite Skill Lab',
      'Tata Steel Sports – Sports-Integrated Education',
      'Tata 1mg – Industry Exposure & Internships',
      'Tata STRIVE – Skill Development & Career Readiness',
      'AZVASA – Values-Based & Holistic Education',
      'Kalrashukla – Competitive Examination Readiness',
    ],
  },
  {
    title: 'Academic & Digital Learning Solutions',
    items: ['EarlyEdge', 'ClassEdge Platinum', 'CE Prime', 'ClassEdge 360', 'TestEdge'],
  },
  {
    title: 'Skill & Lab Solutions',
    items: ['ThinkEdge – STEM Lab', 'ClassEdge Language Studio', 'Music Edge'],
  },
];

export default function Programmes() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = PROGRAMME_CATEGORIES[activeIdx];
  const totalCount = PROGRAMME_CATEGORIES.reduce((n, c) => n + c.items.length, 0);

  const tabsRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft]   = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = tabsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState]);

  const scrollTabs = (dir) => {
    const el = tabsRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 240, behavior: 'smooth' });
  };

  return (
    <div className="prog-page">
      <Header />

      <section className="prog-hero">
        <h1 className="prog-hero-title">Programmes &amp; Services</h1>
        <p className="prog-hero-sub">
          Tata ClassEdge's full range of {totalCount} engagements, academic programmes,
          teacher development, and digital learning solutions for schools and educators.
        </p>
      </section>

      <div className="prog-tabs-wrap">
        <div className="prog-tabs-inner">
          <button
            className="prog-tabs-arrow"
            onClick={() => scrollTabs(-1)}
            aria-label="Scroll categories left"
            disabled={!canScrollLeft}
          >
            &#8249;
          </button>

          <div className="prog-tabs" ref={tabsRef} onScroll={updateScrollState}>
            {PROGRAMME_CATEGORIES.map((cat, i) => (
              <button
                key={cat.title}
                className={`prog-tab ${i === activeIdx ? 'active' : ''}`}
                onClick={() => setActiveIdx(i)}
              >
                {cat.title}
                <span className="prog-tab-count">{cat.items.length}</span>
              </button>
            ))}
          </div>

          <button
            className="prog-tabs-arrow"
            onClick={() => scrollTabs(1)}
            aria-label="Scroll categories right"
            disabled={!canScrollRight}
          >
            &#8250;
          </button>
        </div>
      </div>

      <main className="prog-main">
        <h2 className="prog-category-title">{active.title}</h2>
        <div className="prog-grid">
          {active.items.map((item) => (
            <div key={item} className="prog-card">
              <span className="prog-card-icon">
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="prog-card-text">{item}</span>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
