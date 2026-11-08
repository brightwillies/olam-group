"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/site-data";
import AgButton from "../ui/AgButton";
import RotatingBadge from "../ui/RotatingBadge";
import { gsap, ScrollTrigger, onSiteReady, prefersReduced } from "../ui/anim";

const DURATION = 7; // seconds per slide

/**
 * Full-screen hero carousel:
 *  - preloader-synced intro, masked headline lines, Ken Burns backgrounds
 *  - wipe transition between slides, progress-bar tabs, autoplay
 *  - scroll-out parallax
 */
const HomeHero = () => {
    const root = useRef<HTMLElement>(null);
    const [active, setActive] = useState(0);
    const current = useRef(0);
    const busy = useRef(false);
    const progress = useRef<gsap.core.Tween | null>(null);
    const kenBurns = useRef<gsap.core.Tween | null>(null);
    const goRef = useRef<(next: number) => void>(() => {});

    const q = (sel: string) => root.current?.querySelectorAll<HTMLElement>(sel) ?? [];
    const slideEl = (i: number) => q(".ag-hero-slide")[i];

    const animateIn = useCallback((i: number, delay = 0) => {
        const s = slideEl(i);
        if (!s) return gsap.timeline();
        const tl = gsap.timeline({ delay });
        tl.fromTo(s.querySelectorAll(".ag-hl > span"), { yPercent: 115, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 1.3, ease: "power4.out", stagger: 0.1 })
            .fromTo(s.querySelectorAll(".ag-hero-anim"), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out", stagger: 0.1 }, 0.3);
        kenBurns.current?.kill();
        kenBurns.current = gsap.fromTo(s.querySelector(".ag-hero-bg img"), { scale: 1.18 }, { scale: 1, duration: DURATION + 2.5, ease: "none" });
        return tl;
    }, []);

    const startProgress = useCallback((i: number) => {
        progress.current?.kill();
        const bars = q(".ag-hero-progress i");
        gsap.set(bars, { scaleX: 0 });
        bars.forEach((b, k) => { if (k < i) gsap.set(b, { scaleX: 1 }); });
        progress.current = gsap.to(bars[i], {
            scaleX: 1,
            duration: DURATION,
            ease: "none",
            onComplete: () => goRef.current((i + 1) % heroSlides.length),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const go = useCallback((next: number) => {
        if (busy.current || next === current.current) return;
        busy.current = true;
        const prev = current.current;
        const from = slideEl(prev);
        const to = slideEl(next);
        const dir = next > prev || (prev === heroSlides.length - 1 && next === 0) ? 1 : -1;
        current.current = next;
        setActive(next);

        to.classList.add("is-active");
        from.classList.remove("is-active");
        from.classList.add("is-leaving");
        gsap.set(to.querySelectorAll(".ag-hl > span"), { yPercent: 115 });
        gsap.set(to.querySelectorAll(".ag-hero-anim"), { autoAlpha: 0 });

        const tl = gsap.timeline({
            onComplete: () => {
                from.classList.remove("is-leaving");
                gsap.set(from, { clearProps: "clipPath" });
                busy.current = false;
            },
        });
        tl.to(from.querySelectorAll(".ag-hl > span"), { yPercent: -115, duration: 0.7, ease: "power3.in", stagger: 0.05 })
            .to(from.querySelectorAll(".ag-hero-anim"), { autoAlpha: 0, y: -20, duration: 0.5, ease: "power2.in" }, 0)
            .fromTo(to, { clipPath: dir > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" }, 0.2)
            .to(from.querySelector(".ag-hero-bg img"), { xPercent: -8 * dir, duration: 1.4, ease: "expo.inOut" }, 0.2)
            .set(from.querySelector(".ag-hero-bg img"), { xPercent: 0 })
            .add(animateIn(next), 0.85)
            .fromTo(q(".ag-hero-counter-current span"), { yPercent: 100 * dir }, { yPercent: 0, duration: 0.8, ease: "power3.out" }, 0.5);

        startProgress(next);
    }, [animateIn, startProgress]);

    useEffect(() => { goRef.current = go; }, [go]);

    useEffect(() => {
        if (!root.current) return;
        const reduce = prefersReduced();
        const ctx = gsap.context(() => {
            gsap.set(".ag-hero-slide:not(:first-child) .ag-hero-anim", { autoAlpha: 0 });
            if (!reduce) {
                gsap.set(".ag-hero-slide:first-child .ag-hl > span", { yPercent: 115 });
                gsap.set(".ag-hero-slide:first-child .ag-hero-anim, .ag-hero-ui, .ag-hero-side", { autoAlpha: 0 });
            }
        }, root);

        let scrollCtx: gsap.Context | null = null;
        const off = onSiteReady(() => {
            if (!root.current) return;
            if (reduce) return;
            animateIn(0, 0.05);
            gsap.to(q(".ag-hero-ui, .ag-hero-side"), { autoAlpha: 1, duration: 1, delay: 0.8 });
            startProgress(0);
        });

        // scroll-out parallax (after ScrollSmoother is ready)
        const id = window.setTimeout(() => {
            if (!root.current || reduce) return;
            scrollCtx = gsap.context(() => {
                const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
                gsap.to(".ag-hero-content", { yPercent: -18, autoAlpha: 0.2, ease: "none", scrollTrigger: st });
                gsap.to(".ag-hero-bg", { yPercent: 22, ease: "none", scrollTrigger: st });
            }, root);
            ScrollTrigger.refresh();
        }, 400);

        return () => {
            off();
            window.clearTimeout(id);
            progress.current?.kill();
            kenBurns.current?.kill();
            scrollCtx?.revert();
            ctx.revert();
        };
    }, [animateIn, startProgress]);

    return (
        <section className="ag-hero" ref={root} data-cursor-none="">
            {heroSlides.map((s, i) => (
                <div key={i} className={`ag-hero-slide ${i === 0 ? "is-active" : ""}`}>
                    <div className="ag-hero-bg">
                        { }
                        <img src={s.img} alt="" />
                    </div>
                    <div className="ag-hero-content">
                        <div className="ag-container">
                            <span className="ag-label is-light ag-hero-anim">{s.eyebrow}</span>
                            {i === 0 ? (
                                <h1 className="ag-hero-title">
                                    {s.title.map((l) => <span key={l} className="ag-hl"><span>{l}</span></span>)}
                                </h1>
                            ) : (
                                <h2 className="ag-hero-title">
                                    {s.title.map((l) => <span key={l} className="ag-hl"><span>{l}</span></span>)}
                                </h2>
                            )}
                            <p className="ag-hero-desc ag-hero-anim">{s.desc}</p>
                            <div className="ag-hero-anim">
                                <AgButton href={s.cta.href}>{s.cta.label}</AgButton>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="ag-hero-ui">
                <div className="ag-container">
                    <div className="ag-hero-tabs">
                        {heroSlides.map((s, i) => (
                            <button key={i} className={active === i ? "is-active" : ""} onClick={() => go(i)} aria-label={`Show slide ${i + 1}: ${s.tab}`}>
                                <span className="ag-hero-progress"><i /></span>
                                <b>0{i + 1}</b>{s.tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="ag-hero-side">
                <div className="ag-hero-counter">
                    <span className="ag-hero-counter-current"><span style={{ display: "block" }}>0{active + 1}</span></span>
                    {" "}/ 0{heroSlides.length}
                </div>
                <div className="ag-scroll-cue" />
                <RotatingBadge text="Feeding the world • Since 1989 • " href="#intro" size={120} />
            </div>
        </section>
    );
};

export default HomeHero;
