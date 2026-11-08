"use client";
import { useRef } from "react";
import { purposeCards } from "@/data/site-data";
import { Check } from "../ui/Icons";
import { gsap, useAgriAnim } from "../ui/anim";

/** Purpose / Vision / Values cards that pin and stack on top of each other. */
const AboutPurpose = () => {
    const ref = useRef<HTMLElement>(null);

    useAgriAnim(ref, () => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 992px)", () => {
            const cards = gsap.utils.toArray<HTMLElement>(".ag-stack-card");
            const last = cards[cards.length - 1];
            cards.forEach((card, i) => {
                if (i === cards.length - 1) return;
                gsap.to(card, {
                    scale: 0.9 + i * 0.03,
                    filter: "brightness(0.88)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: cards[i + 1],
                        start: "top bottom",
                        end: "top 120px",
                        scrub: true,
                    },
                });
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 120px",
                        endTrigger: last,
                        end: "top 120px",
                        pin: true,
                        pinSpacing: false,
                    },
                });
            });
        });
    });

    return (
        <section className="ag-section ag-stack" id="purpose" ref={ref} style={{ paddingTop: 0 }}>
            <div className="ag-container">
                <div className="ag-head-row">
                    <h2 className="ag-h2" data-ag-split="" style={{ maxWidth: 900 }}>
                        What drives us, <em>every single day</em>
                    </h2>
                </div>
                {purposeCards.map((c) => (
                    <article className={`ag-stack-card tone-${c.tone}`} key={c.no}>
                        <div>
                            <span className="ag-label">{c.label}</span>
                            <h3>{c.title}</h3>
                            <p>{c.desc}</p>
                        </div>
                        <div>
                            <div className="ag-stack-no" aria-hidden="true">{c.no}</div>
                            <ul>
                                {c.points.map((pt) => <li key={pt}><Check />{pt}</li>)}
                            </ul>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default AboutPurpose;
