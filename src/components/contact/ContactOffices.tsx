"use client";
import { useEffect, useRef, useState } from "react";
import { offices } from "@/data/site-data";
import { gsap } from "../ui/anim";

const regions = Object.keys(offices);

/** Region tabs with a sliding pill; office cards re-deal on every switch. */
const ContactOffices = () => {
    const [region, setRegion] = useState<string>(regions[0]);
    const tabs = useRef<HTMLDivElement>(null);
    const grid = useRef<HTMLDivElement>(null);
    const first = useRef(true);

    const movePill = (instant = false) => {
        const wrap = tabs.current;
        if (!wrap) return;
        const btn = wrap.querySelector<HTMLElement>("button.is-active");
        const pill = wrap.querySelector(".ag-tab-pill");
        if (!btn || !pill) return;
        gsap.to(pill, { x: btn.offsetLeft - 6, width: btn.offsetWidth, duration: instant ? 0 : 0.6, ease: "expo.out" });
    };

    useEffect(() => {
        movePill(first.current);
        const onResize = () => movePill(true);
        window.addEventListener("resize", onResize);
        if (!first.current && grid.current) {
            gsap.fromTo(grid.current.children, { y: 50, autoAlpha: 0, rotateX: -15 }, { y: 0, autoAlpha: 1, rotateX: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 });
        }
        first.current = false;
        return () => window.removeEventListener("resize", onResize);
    }, [region]);

    return (
        <section className="ag-section ag-dark ag-offices">
            <div className="ag-container">
                <div className="ag-head-row">
                    <div>
                        <span className="ag-label is-light" data-ag-fade="">Our Offices</span>
                        <h2 className="ag-h2" data-ag-split="" style={{ marginTop: 20 }}>
                            Find us <em className="ag-lime-text">around the world</em>
                        </h2>
                    </div>
                </div>
                <div className="ag-tabs" ref={tabs} role="tablist" data-ag-fade="">
                    <span className="ag-tab-pill" />
                    {regions.map((r) => (
                        <button key={r} role="tab" aria-selected={region === r} className={region === r ? "is-active" : ""} onClick={() => setRegion(r)}>
                            {r}
                        </button>
                    ))}
                </div>
                <div className="ag-office-grid" ref={grid} style={{ perspective: 1000 }} data-ag-stagger="">
                    {offices[region].map((o) => (
                        <div className="ag-office" key={o.city}>
                            <span className="ag-office-type">{o.type}</span>
                            <h4>{o.city}</h4>
                            <p>{o.address}</p>
                            {o.phone && <a href={`tel:${o.phone.replace(/\s/g, "")}`}>{o.phone}</a>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactOffices;
