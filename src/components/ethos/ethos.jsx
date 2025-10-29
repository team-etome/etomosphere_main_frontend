import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import "./ethos.css";
import ethos1 from '../../assets/ethos1.jpg';
import ethos2 from '../../assets/ethos2.jpg';
import ethos3 from '../../assets/ethos3.jpg';
import ethos4 from '../../assets/ethos4.png'
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function Ethos() {
    const cards = useMemo(
        () => [
            {
                id: 1,
                title: "Converging Horizons",
                body: "Etomosphere is where technology, education, and community unite. We are building a future-ready ecosystem that empowers schools, institutions, and learners with solutions that inspire growth and innovation.",
                image: ethos1
            },
            {
                id: 2,
                title: "Our Mission",
                body: "To transform education through intelligent, connected solutions that empower teachers, engage learners, and elevate the entire learning experience beyond traditional boundaries.",
                image: ethos2
            },
            {
                id: 3,
                title: "Shaping the Future of Learning",
                body: "Etomosphere unites trusted products and technologies into a connected system that builds better learning environments.",
                image: ethos3
            },
            {
                id: 4,
                title: "Future-Ready Classrooms",
                body: "Our solutions prepare students for the future with modern classroom technology that supports remote learning, hybrid education, and innovative teaching methods.",
                image: ethos4
            },
           
        ], 
        []
    );

    const sectionRef = useRef(null);
    const [progress, setProgress] = useState(0); // 0 → 1 across section

    useEffect(() => {
        const onScroll = () => {
            const el = sectionRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;

            // Normalize scroll progress for the whole section: 0 → 1
            const visibleRange = rect.height;
            const scrolledIn = clamp(vh - rect.top, 0, visibleRange);
            const p = visibleRange > 0 ? scrolledIn / visibleRange : 0;
            setProgress(clamp(p, 0, 1));
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    // Each card gets an equal "slot" of the overall progress
    const perCard = 1 / cards.length;
    const activeIndex = Math.min(
        cards.length - 1,
        Math.floor(progress / perCard)
    );

    return (
        <div className="ethos-container">
            <Header />

            <section
                ref={sectionRef}
                className="stack-section"
                style={{
                    height: `${cards.length * 100}vh`,

                }} // 1 viewport per card

            >

                <div style={{
                    display: "flex",
                    justifyItems: "center",
                    justifyContent: "center",
                    // marginTop:"40px",
                    paddingTop: "80px",

                }} className="stack-viewport">
                    <div style={{
                        borderRadius: "18px",
                     

                    }} className="stack">
                        {cards.map((card, i) => {
                            // Local progress for THIS card's slot (0→1 while it's active)
                            const start = i * perCard;
                            const end = (i + 1) * perCard;
                            const slotT = clamp((progress - start) / (end - start), 0, 1);

                            // Only one card animates at a time:
                            // - Cards BEFORE activeIndex are fully settled (t=1).
                            // - The active card uses slotT (0→1).
                            // - Cards AFTER activeIndex are waiting (t=0).
                            const t =
                                i < activeIndex ? 1 :
                                    i === activeIndex ? slotT : 0;

                            // Motion:
                            // - translateY: rise up from the stack into place
                            // - scale: grow slightly as it comes to front
                            // - opacity: fade in
                            // - zIndex: keep the active card on top of all others
                            const translateY = (1 - t) * 120 + (i - activeIndex) * 6; // px
                            const scale = 0.94 + t * 0.06;
                            const opacity = 0.35 + t * 0.65;
                            const zIndex = i === activeIndex ? 1000 : i; // active card above all

                            return (
                                <article
                                    key={card.id}
                                    className="card"
                                    style={{

                                        zIndex,
                                        opacity,
                                        transform: `translateY(${translateY}px) scale(${scale})`,
                                        boxShadow: `0 20px 40px rgba(0,0,0,${0.18 * (1 - (t * 0.7))})`,
                                    }}
                                >
                                    <div style={{

                                        height: "100%",

                                    }} className="card-content">
                                        <div style={{

                                            height: "100%"
                                        }} className="card-image">
                                            <img src={card.image} alt={card.title} />
                                        </div>
                                        <div className="card-text">
                                            <h3>{card.title}</h3>
                                            <p>{card.body}</p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Ethos;
