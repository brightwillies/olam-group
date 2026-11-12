"use client";
import { useRef } from "react";
import { images, regions } from "@/data/site-data";
import { gsap, useAgriAnim } from "../ui/anim";

/** World map with pins that drop in and pulse, plus regional counters. */
const AboutFootprint = () => {
    const ref = useRef<HTMLElement>(null);

    useAgriAnim(ref, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ".ag-map", start: "top 75%", once: true } });
        tl.from(".ag-map-img", { autoAlpha: 0, scale: 1.08, duration: 1.6, ease: "power2.out" })
            .from(".ag-pin-dot", { scale: 0, duration: 0.8, ease: "back.out(3)", stagger: 0.12 }, 0.5)
            .from(".ag-pin-label", { y: 16, autoAlpha: 0, duration: 0.6, ease: "power3.out", stagger: 0.12 }, 0.7);
    });

    return (
        <section className="ag-section" id="footprint" ref={ref}>
            <div className="ag-container">
                <div className="ag-head-row" style={{ marginBottom: 0 }}>
                    <div>
                        <span className="ag-label" data-ag-fade="">Global Footprint</span>
                        <h2 className="ag-h2" data-ag-split="" style={{ marginTop: 20, maxWidth: 760 }}>
                            Present at <em>origin</em>, close to every customer
                        </h2>
                    </div>
                    <p className="ag-lead" data-ag-fade="" style={{ maxWidth: 420 }}>
                        From sourcing and processing at origin to distribution in key consuming markets, our teams are on the ground across five continents.
                    </p>
                </div>
                <div className="ag-map">
                    { }
                    <img className="ag-map-img" src={images.map} alt="World map" />
                    {regions.map((r) => (
                        <div className="ag-pin" key={r.name} style={{ left: `${r.x}%`, top: `${r.y}%` }}>
                            <span className="ag-pin-label">{r.name}<b>{r.countries}</b></span>
                            <span className="ag-pin-dot" />
                        </div>
                    ))}
                </div>
                <div className="ag-region-list" data-ag-stagger="">
                    {regions.map((r) => (
                        <div key={r.name}>
                            <b data-ag-count={r.countries}>{r.countries}</b>
                            <span>Countries in {r.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutFootprint;
