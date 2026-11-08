"use client";
import { useRef } from "react";
import { timeline } from "@/data/site-data";
import { gsap, ScrollTrigger, useAgriAnim } from "../ui/anim";

/** Journey timeline: rail draws with scroll, milestones light up as they reach the centre. */
const AboutTimeline = () => {
    const ref = useRef<HTMLElement>(null);

    useAgriAnim(ref, () => {
        gsap.to(".ag-tl-rail i", {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ".ag-timeline", start: "top 55%", end: "bottom 55%", scrub: true },
        });
        gsap.utils.toArray<HTMLElement>(".ag-tl-item").forEach((item) => {
            ScrollTrigger.create({
                trigger: item,
                start: "top 58%",
                end: "bottom 58%",
                toggleClass: { targets: item, className: "is-active" },
                onLeave: () => item.classList.add("is-active"),
            });
            gsap.from(item.querySelectorAll(".ag-tl-year, .ag-tl-body"), {
                y: 60,
                autoAlpha: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.12,
                scrollTrigger: { trigger: item, start: "top 85%", once: true },
            });
        });
    });

    return (
        <section className="ag-section ag-darker" id="journey" ref={ref}>
            <div className="ag-container">
                <div className="ag-center" style={{ marginBottom: 80 }}>
                    <span className="ag-label is-light" data-ag-fade="">Our Journey</span>
                    <h2 className="ag-h2" data-ag-split="" style={{ marginTop: 20 }}>
                        Three decades of <em className="ag-lime-text">growth</em>
                    </h2>
                </div>
                <div className="ag-timeline">
                    <div className="ag-tl-rail"><i /></div>
                    {timeline.map((t) => (
                        <div className="ag-tl-item" key={t.year}>
                            <span className="ag-tl-dot" />
                            <div className="ag-tl-year">{t.year}</div>
                            <div className="ag-tl-body">
                                <h4>{t.title}</h4>
                                <p>{t.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutTimeline;
