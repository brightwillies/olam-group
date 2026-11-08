"use client";
import { useRef } from "react";
import { commodities } from "@/data/site-data";
import { Sprig } from "../ui/Icons";
import { gsap, ScrollTrigger, useAgriAnim } from "../ui/anim";

/** Infinite commodity ticker that speeds up / reverses with scroll velocity. */
const HomeMarquee = () => {
    const ref = useRef<HTMLElement>(null);

    useAgriAnim(ref, () => {
        const track = ref.current!.querySelector(".ag-marquee-track");
        const loop = gsap.to(track, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
        let dir = 1;
        ScrollTrigger.create({
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
                const v = self.getVelocity();
                if (v !== 0) dir = v > 0 ? 1 : -1;
                gsap.to(loop, { timeScale: dir * (1 + Math.min(Math.abs(v) / 250, 6)), duration: 0.2, overwrite: true });
                gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.25, ease: "power2.out" });
            },
        });
        gsap.from(ref.current, { autoAlpha: 0, duration: 1.2, scrollTrigger: { trigger: ref.current, start: "top 90%", once: true } });
    });

    const items = [...commodities, ...commodities];
    return (
        <section className="ag-marquee" ref={ref} aria-label="Commodities we work with">
            <div className="ag-marquee-track">
                {items.map((c, i) => (
                    <div className="ag-marquee-item" key={i} aria-hidden={i >= commodities.length}>
                        <span>{c}</span>
                        <Sprig />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HomeMarquee;
