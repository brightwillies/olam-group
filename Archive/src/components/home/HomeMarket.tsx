"use client";
import { useRef } from "react";
import { marketLink, markets, marketSites } from "@/data/site-data";
import AgButton from "../ui/AgButton";
import { ArrowUpRight } from "../ui/Icons";
import { gsap, useAgriAnim } from "../ui/anim";

type Props = { market: "ghana" | "nigeria" };

/**
 * Market teaser: giant country name sliding behind, flag stripe, feature list,
 * a fan of product cards that spreads open on scroll, and a link to the country website.
 */
const HomeMarket = ({ market }: Props) => {
    const ref = useRef<HTMLElement>(null);
    const m = markets[market];
    const site = marketSites[market];
    const link = marketLink(market);
    const dark = market === "nigeria";
    const reverse = market === "nigeria";

    useAgriAnim(ref, () => {
        const section = ref.current!;
        // giant word drifts sideways while scrolling
        gsap.fromTo(".ag-mk-word", { xPercent: reverse ? -18 : 6 }, {
            xPercent: reverse ? 6 : -18,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
        });
        // flag stripe draws in
        gsap.from(".ag-mk-flag i", { scaleX: 0, transformOrigin: "left", duration: 1, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: section, start: "top 75%", once: true } });
        // product fan spreads open
        const cards = gsap.utils.toArray<HTMLElement>(".ag-mk-card");
        const spread = [
            { xPercent: -62, yPercent: 6, rotate: -12 },
            { xPercent: 0, yPercent: -10, rotate: 0 },
            { xPercent: 62, yPercent: 6, rotate: 12 },
        ];
        cards.forEach((c, i) => {
            gsap.fromTo(c, { xPercent: 0, yPercent: 30, rotate: (i - 1) * 4, scale: 0.85 }, {
                ...spread[i],
                scale: 1,
                ease: "power2.out",
                scrollTrigger: { trigger: ".ag-mk-visual", start: "top 85%", end: "center 55%", scrub: 1 },
            });
        });
        gsap.from(".ag-mk-orb", { scale: 0.6, autoAlpha: 0, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: ".ag-mk-visual", start: "top 80%", once: true } });

        // tilt the fan with the mouse
        if (window.matchMedia("(hover: hover)").matches) {
            const vis = section.querySelector<HTMLElement>(".ag-mk-fan")!;
            const rx = gsap.quickTo(vis, "rotateX", { duration: 0.9, ease: "power3.out" });
            const ry = gsap.quickTo(vis, "rotateY", { duration: 0.9, ease: "power3.out" });
            const area = section.querySelector<HTMLElement>(".ag-mk-visual")!;
            const move = (e: MouseEvent) => {
                const r = area.getBoundingClientRect();
                ry(((e.clientX - r.left) / r.width - 0.5) * 16);
                rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
            };
            const leave = () => { rx(0); ry(0); };
            area.addEventListener("mousemove", move);
            area.addEventListener("mouseleave", leave);
            return () => { area.removeEventListener("mousemove", move); area.removeEventListener("mouseleave", leave); };
        }
    });

    return (
        <section className={`ag-section ag-market ${dark ? "ag-dark is-dark" : "is-light"} ${reverse ? "is-reverse" : ""}`} id={m.id} ref={ref}>
            <div className="ag-mk-word" aria-hidden="true">{site.label}</div>
            <div className="ag-container">
                <div className="ag-mk-grid">
                    <div className="ag-mk-text">
                        <div className="ag-mk-flag" aria-hidden="true">
                            {m.flag.map((c, i) => <i key={i} style={{ background: c }} />)}
                        </div>
                        <span className={`ag-label ${dark ? "is-light" : ""}`} data-ag-fade="">{m.label} · {m.eyebrow}</span>
                        <h2 className="ag-h2" data-ag-split="">
                            {m.title[0]} <em className={dark ? "ag-lime-text" : ""}>{m.title[1]}</em>
                        </h2>
                        <p className="ag-lead" data-ag-fade="">{m.desc}</p>
                        <ul className="ag-mk-features" data-ag-stagger="">
                            {m.features.map((f, i) => (
                                <li key={f.title}>
                                    <b>0{i + 1}</b>
                                    <div>
                                        <h5>{f.title}</h5>
                                        <span>{f.desc}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="ag-btn-row" data-ag-fade="">
                            {link.external ? (
                                <AgButton href={link.href} external variant={dark ? "lime" : "dark"}>{m.cta}</AgButton>
                            ) : (
                                <span className="ag-btn ag-btn-soon" aria-disabled="true" title="Website launching soon">
                                    <span className="ag-btn-text"><span>{m.cta}</span></span>
                                    <span className="ag-soon-chip">Coming soon</span>
                                </span>
                            )}
                            {market === "nigeria" ? (
                                <AgButton href="/contact" variant="outline">Trade Enquiry</AgButton>
                            ) : (
                                <a href="#products" className="ag-link">See our products <ArrowUpRight size={14} /></a>
                            )}
                        </div>
                    </div>

                    <div className="ag-mk-visual" data-cursor={link.external ? "Visit" : undefined}>
                        <div className="ag-mk-orb" />
                        <div className="ag-mk-fan">
                            {m.products.map((p) => (
                                <div className="ag-mk-card" key={p.id}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={p.img} alt={p.name} />
                                    <span>{p.brand}</span>
                                </div>
                            ))}
                        </div>
                        <div className="ag-mk-badge">
                            <span>{site.label}</span>
                            <b>{link.external ? "Visit site ↗" : "Site coming soon"}</b>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeMarket;
