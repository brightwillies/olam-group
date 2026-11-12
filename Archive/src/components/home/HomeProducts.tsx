"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { Flip } from "gsap/Flip";
import { marketLink, products, type ProductCategory } from "@/data/site-data";
import AgButton from "../ui/AgButton";
import { gsap } from "../ui/anim";

gsap.registerPlugin(Flip);

const FILTERS: ("All" | ProductCategory)[] = ["All", "Biscuits & Snacks", "Drinks", "Cooking"];

/** Product grid with animated category filter (GSAP Flip) and 3D-tilting cards. */
const HomeProducts = () => {
    const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
    const grid = useRef<HTMLDivElement>(null);
    const tabs = useRef<HTMLDivElement>(null);
    const flipState = useRef<Flip.FlipState | null>(null);

    const choose = (f: (typeof FILTERS)[number]) => {
        if (f === filter || !grid.current) return;
        flipState.current = Flip.getState(grid.current.querySelectorAll(".ag-prod"));
        setFilter(f);
    };

    // sliding pill + Flip re-layout after the filter changes
    useLayoutEffect(() => {
        const wrap = tabs.current;
        const btn = wrap?.querySelector<HTMLElement>("button.is-active");
        const pill = wrap?.querySelector(".ag-tab-pill");
        if (btn && pill) gsap.to(pill, { x: btn.offsetLeft - 6, width: btn.offsetWidth, duration: flipState.current ? 0.6 : 0, ease: "expo.out" });

        if (flipState.current) {
            Flip.from(flipState.current, {
                duration: 0.75,
                ease: "power3.inOut",
                absolute: true,
                nested: true,
                onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.85, y: 30 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, delay: 0.15, ease: "power3.out" }),
                onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.85, duration: 0.4, ease: "power2.in" }),
            });
            flipState.current = null;
        }
    }, [filter]);

    // 3D tilt on hover
    const tilt = (e: React.MouseEvent<HTMLElement>) => {
        if (!window.matchMedia("(hover: hover)").matches) return;
        const el = e.currentTarget.querySelector<HTMLElement>(".ag-prod-plate");
        if (!el) return;
        const r = e.currentTarget.getBoundingClientRect();
        gsap.to(el, {
            rotateY: ((e.clientX - r.left) / r.width - 0.5) * 14,
            rotateX: -((e.clientY - r.top) / r.height - 0.5) * 14,
            duration: 0.6,
            ease: "power3.out",
            transformPerspective: 800,
        });
    };
    const untilt = (e: React.MouseEvent<HTMLElement>) => {
        const el = e.currentTarget.querySelector<HTMLElement>(".ag-prod-plate");
        if (el) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });
    };

    const gh = marketLink("ghana");
    const ng = marketLink("nigeria");

    return (
        <section className="ag-section ag-products" id="products">
            <div className="ag-container">
                <div className="ag-head-row">
                    <div>
                        <span className="ag-label" data-ag-fade="">Our food &amp; brands</span>
                        <h2 className="ag-h2" data-ag-split="" style={{ marginTop: 20, maxWidth: 780 }}>
                            Products you&apos;ll find <em>on every table</em>
                        </h2>
                    </div>
                    <div className="ag-tabs is-light" ref={tabs} role="tablist" data-ag-fade="">
                        <span className="ag-tab-pill" />
                        {FILTERS.map((f) => (
                            <button key={f} role="tab" aria-selected={filter === f} className={filter === f ? "is-active" : ""} onClick={() => choose(f)}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="ag-prod-grid" ref={grid} data-ag-stagger="">
                    {products.map((p) => {
                        const shown = filter === "All" || p.category === filter;
                        return (
                            <article
                                className={`ag-prod ${shown ? "" : "is-hidden"}`}
                                key={p.id}
                                data-flip-id={p.id}
                                onMouseMove={tilt}
                                onMouseLeave={untilt}
                            >
                                <div className="ag-prod-plate">
                                    <span className="ag-prod-cat">{p.category}</span>
                                    <span className="ag-prod-markets">
                                        {p.markets.map((m) => <i key={m} title={m}>{m === "Ghana" ? "GH" : "NG"}</i>)}
                                    </span>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={p.img} alt={p.name} loading="lazy" />
                                </div>
                                <div className="ag-prod-body">
                                    <span className="ag-prod-brand">{p.brand}</span>
                                    <h4>{p.name}</h4>
                                    <p>{p.desc}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="ag-prod-cta" data-ag-fade="">
                    <p>Looking for recipes, pack sizes or where to buy? <b>Visit your local Caraway site.</b></p>
                    <div className="ag-btn-row">
                        <AgButton href={gh.href} external={gh.external} variant="dark">Caraway Ghana</AgButton>
                        <AgButton href={ng.href} external={ng.external} variant="dark">Caraway Nigeria</AgButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeProducts;
