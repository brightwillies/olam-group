"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import RotatingBadge from "./RotatingBadge";
import { gsap, onSiteReady, prefersReduced } from "./anim";

type Props = { label: string; title: string[]; desc: string; badge?: string; badgeHref?: string };

/** Inner-page hero: breadcrumb, two-line masked title (second line italic lime), intro on site ready. */
const PageHero = ({ label, title, desc, badge = "Scroll to explore • Caraway Africa • ", badgeHref = "#content" }: Props) => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || prefersReduced()) return;
        const ctx = gsap.context(() => {
            gsap.set(".ag-hl > span", { yPercent: 115 });
            gsap.set(".ag-ph-anim", { autoAlpha: 0, y: 30 });
        }, el);
        const off = onSiteReady(() => {
            ctx.add(() => {
                gsap.timeline()
                    .to(".ag-hl > span", { yPercent: 0, duration: 1.3, ease: "power4.out", stagger: 0.12 })
                    .to(".ag-ph-anim", { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 }, 0.35)
                    .from(".ag-page-hero-glow", { scale: 0.4, autoAlpha: 0, duration: 2, ease: "power2.out" }, 0);
            });
        });
        return () => { off(); ctx.revert(); };
    }, []);

    return (
        <section className="ag-page-hero" ref={ref}>
            <div className="ag-page-hero-glow" />
            <div className="ag-container" style={{ position: "relative" }}>
                <nav className="ag-crumbs ag-ph-anim" aria-label="Breadcrumb">
                    <Link href="/">Home</Link><i />
                    <span>{label}</span>
                </nav>
                <h1>
                    {title.map((l) => <span className="ag-hl" key={l}><span>{l}</span></span>)}
                </h1>
                <div className="ag-page-hero-foot">
                    <p className="ag-ph-anim">{desc}</p>
                    <div className="ag-ph-anim">
                        <RotatingBadge text={badge} href={badgeHref} size={130} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PageHero;
