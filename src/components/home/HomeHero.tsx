"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides, marketLink, markets, marketSites } from "@/data/site-data";
import AgButton from "../ui/AgButton";
import RotatingBadge from "../ui/RotatingBadge";
import { ArrowUpRight } from "../ui/Icons";
import { gsap, ScrollTrigger, onSiteReady, prefersReduced } from "../ui/anim";

const DURATION = 7; // seconds per slide
const TILE_ROT = [-6, 5, -3]; // resting tilt of the floating product cards (slide 1)
const FAN = [
    { x: -62, y: 6, r: -12 },
    { x: 0, y: -10, r: 0 },
    { x: 62, y: 6, r: 12 },
]; // fanned-out positions of the market product cards (slides 2 & 3)

const isLight = (i: number) => {
    const s = heroSlides[i];
    return s.kind === "market" && s.market === "ghana";
};

/**
 * Full-screen hero carousel:
 *  - slide 1: photo background with floating product cards
 *  - slides 2 & 3: the Ghana and Nigeria section designs (flag, headline, fan of products)
 *  - preloader-synced intro, wipe transitions, progress tabs, autoplay, scroll-out parallax
 *  - header and slider controls switch to dark while the light Ghana slide is showing
 */
const HomeHero = () => {
    const root = useRef<HTMLElement>(null);
    const [active, setActive] = useState(0);
    const current = useRef(0);
    const busy = useRef(false);
    const progress = useRef<gsap.core.Tween | null>(null);
    const kenBurns = useRef<gsap.core.Tween | null>(null);
    const wordDrift = useRef<gsap.core.Tween | null>(null);
    const goRef = useRef<(next: number) => void>(() => {});

    const q = (sel: string) => root.current?.querySelectorAll<HTMLElement>(sel) ?? [];
    const slideEl = (i: number) => q(".ag-hero-slide")[i];

    const setTheme = (i: number) => {
        root.current?.classList.toggle("is-light-slide", isLight(i));
        document.body.classList.toggle("ag-hero-light", isLight(i));
    };

    const animateIn = useCallback((i: number, delay = 0) => {
        const s = slideEl(i);
        if (!s) return gsap.timeline();
        const tl = gsap.timeline({ delay });
        tl.fromTo(s.querySelectorAll(".ag-hl > span"), { yPercent: 115, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 1.3, ease: "power4.out", stagger: 0.1 })
            .fromTo(s.querySelectorAll(".ag-hero-anim"), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out", stagger: 0.1 }, 0.3)
            .fromTo(
                s.querySelectorAll(".ag-hero-tile"),
                { y: 140, autoAlpha: 0, scale: 0.8, rotate: (k: number) => TILE_ROT[k] * 2.4 },
                { y: 0, autoAlpha: 1, scale: 1, rotate: (k: number) => TILE_ROT[k], duration: 1.5, ease: "expo.out", stagger: 0.12 },
                0.35
            );

        // market slides: flag draws, orb grows, cards spread from a stack into a fan
        const cards = s.querySelectorAll(".ag-hs-card");
        if (cards.length) {
            tl.fromTo(s.querySelectorAll(".ag-hs-flag i"), { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.9, ease: "expo.out", stagger: 0.1 }, 0.15)
                .fromTo(s.querySelector(".ag-mk-orb"), { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.4, ease: "expo.out" }, 0.1)
                .fromTo(
                    cards,
                    { xPercent: 0, yPercent: 40, rotate: (k: number) => (k - 1) * 4, scale: 0.8, autoAlpha: 0 },
                    {
                        xPercent: (k: number) => FAN[k].x,
                        yPercent: (k: number) => FAN[k].y,
                        rotate: (k: number) => FAN[k].r,
                        scale: 1,
                        autoAlpha: 1,
                        duration: 1.6,
                        ease: "expo.out",
                        stagger: 0.08,
                    },
                    0.35
                );
        }
        // slow drift of the giant country word (kept outside the timeline so transitions finish on time)
        wordDrift.current?.kill();
        const word = s.querySelector(".ag-hs-word");
        if (word) wordDrift.current = gsap.fromTo(word, { xPercent: 4 }, { xPercent: -6, duration: DURATION + 2, ease: "none" });

        kenBurns.current?.kill();
        const bgImg = s.querySelector(".ag-hero-bg img");
        if (bgImg) kenBurns.current = gsap.fromTo(bgImg, { scale: 1.18 }, { scale: 1, duration: DURATION + 2.5, ease: "none" });
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
        gsap.set(to.querySelectorAll(".ag-hero-anim, .ag-hero-tile, .ag-hs-card, .ag-mk-orb"), { autoAlpha: 0 });

        const tl = gsap.timeline({
            onComplete: () => {
                from.classList.remove("is-leaving");
                gsap.set(from, { clearProps: "clipPath" });
                busy.current = false;
            },
        });
        tl.to(from.querySelectorAll(".ag-hl > span"), { yPercent: -115, duration: 0.7, ease: "power3.in", stagger: 0.05 })
            .to(from.querySelectorAll(".ag-hero-anim"), { autoAlpha: 0, y: -20, duration: 0.5, ease: "power2.in" }, 0)
            .to(from.querySelectorAll(".ag-hero-tile"), { autoAlpha: 0, y: -90, duration: 0.6, ease: "power2.in", stagger: 0.05 }, 0)
            .to(from.querySelectorAll(".ag-hs-card"), { xPercent: 0, yPercent: -20, rotate: 0, autoAlpha: 0, duration: 0.6, ease: "power2.in", stagger: 0.04 }, 0)
            .to(from.querySelectorAll(".ag-mk-orb"), { scale: 0.85, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, 0.05)
            .fromTo(to, { clipPath: dir > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" }, 0.2)
            .to(from.querySelectorAll(".ag-hero-bg img"), { xPercent: -8 * dir, duration: 1.4, ease: "expo.inOut" }, 0.2)
            .set(from.querySelectorAll(".ag-hero-bg img"), { xPercent: 0 })
            .add(() => setTheme(next), 0.75)
            .add(animateIn(next), 0.85)
            .fromTo(q(".ag-hero-counter-current span"), { yPercent: 100 * dir }, { yPercent: 0, duration: 0.8, ease: "power3.out" }, 0.5);

        startProgress(next);
    }, [animateIn, startProgress]);

    useEffect(() => { goRef.current = go; }, [go]);

    useEffect(() => {
        if (!root.current) return;
        const reduce = prefersReduced();
        const ctx = gsap.context(() => {
            gsap.set(
                ".ag-hero-slide:not(:first-child) .ag-hero-anim, .ag-hero-slide:not(:first-child) .ag-hero-tile, .ag-hero-slide:not(:first-child) .ag-hs-card, .ag-hero-slide:not(:first-child) .ag-mk-orb",
                { autoAlpha: 0 }
            );
            if (!reduce) {
                gsap.set(".ag-hero-slide:first-child .ag-hl > span", { yPercent: 115 });
                gsap.set(".ag-hero-slide:first-child .ag-hero-anim, .ag-hero-slide:first-child .ag-hero-tile, .ag-hero-ui, .ag-hero-side", { autoAlpha: 0 });
            }
        }, root);
        setTheme(0);

        let scrollCtx: gsap.Context | null = null;
        const off = onSiteReady(() => {
            if (!root.current) return;
            if (reduce) return;
            animateIn(0, 0.05);
            gsap.to(q(".ag-hero-ui, .ag-hero-side"), { autoAlpha: 1, duration: 1, delay: 0.8 });
            startProgress(0);
        });

        // scroll-out parallax; the header goes back to normal once the hero leaves the top
        const id = window.setTimeout(() => {
            if (!root.current) return;
            scrollCtx = gsap.context(() => {
                ScrollTrigger.create({
                    trigger: root.current,
                    start: "top top",
                    end: "bottom 80px",
                    onLeave: () => document.body.classList.remove("ag-hero-light"),
                    onEnterBack: () => document.body.classList.toggle("ag-hero-light", isLight(current.current)),
                });
                if (reduce) return;
                const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
                // explicit start values: hidden slides would otherwise be captured at opacity 0
                gsap.fromTo(".ag-hero-content", { yPercent: 0, opacity: 1 }, { yPercent: -18, opacity: 0.2, ease: "none", scrollTrigger: st });
                gsap.to(".ag-hero-bg", { yPercent: 22, ease: "none", scrollTrigger: st });
                gsap.to(".ag-hero-products", { yPercent: -25, ease: "none", scrollTrigger: st });
            }, root);
            ScrollTrigger.refresh();
        }, 400);

        // product cards drift with the mouse; market fans tilt (desktop)
        const hero = root.current!;
        const layers = gsap.utils.toArray<HTMLElement>(".ag-hero-tile-depth", hero);
        const movers = layers.map((l) => ({
            depth: Number(l.dataset.depth || 1),
            x: gsap.quickTo(l, "x", { duration: 1.2, ease: "power3.out" }),
            y: gsap.quickTo(l, "y", { duration: 1.2, ease: "power3.out" }),
        }));
        const fans = gsap.utils.toArray<HTMLElement>(".ag-hero .ag-mk-fan", hero).map((f) => ({
            rx: gsap.quickTo(f, "rotateX", { duration: 0.9, ease: "power3.out" }),
            ry: gsap.quickTo(f, "rotateY", { duration: 0.9, ease: "power3.out" }),
        }));
        const onMove = (e: MouseEvent) => {
            const px = e.clientX / window.innerWidth - 0.5;
            const py = e.clientY / window.innerHeight - 0.5;
            movers.forEach((m) => { m.x(px * 40 * m.depth); m.y(py * 30 * m.depth); });
            fans.forEach((f) => { f.ry(px * 16); f.rx(-py * 12); });
        };
        if (!reduce) hero.addEventListener("mousemove", onMove);

        return () => {
            hero.removeEventListener("mousemove", onMove);
            document.body.classList.remove("ag-hero-light");
            off();
            window.clearTimeout(id);
            progress.current?.kill();
            kenBurns.current?.kill();
            wordDrift.current?.kill();
            scrollCtx?.revert();
            ctx.revert();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animateIn, startProgress]);

    return (
        <section className="ag-hero" ref={root} data-cursor-none="">
            {heroSlides.map((s, i) =>
                s.kind === "photo" ? (
                    <div key={i} className={`ag-hero-slide ${i === 0 ? "is-active" : ""}`}>
                        <div className="ag-hero-bg">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
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
                        <div className="ag-hero-products" aria-hidden="true">
                            {s.products.map((p, k) => (
                                <div className={`ag-hero-tile is-${k + 1}`} key={p.id}>
                                    <div className="ag-hero-tile-depth" data-depth={[1.4, 0.8, 1.1][k]}>
                                        <div className="ag-hero-tile-float">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={p.img} alt="" />
                                            <span>{p.brand}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <MarketSlide key={i} market={s.market} first={i === 0} />
                )
            )}

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
                <RotatingBadge text="Good food • Rooted in Africa • " href="#intro" size={120} color="currentColor" />
            </div>
        </section>
    );
};

/** Hero version of the Ghana / Nigeria section: same look, sized to one screen. */
const MarketSlide = ({ market, first }: { market: "ghana" | "nigeria"; first: boolean }) => {
    const m = markets[market];
    const site = marketSites[market];
    const link = marketLink(market);
    const dark = market === "nigeria";
    const Title = first ? "h1" : "h2";

    return (
        <div className={`ag-hero-slide ag-hs ${dark ? "is-dark" : "is-light"} ${first ? "is-active" : ""}`}>
            <div className="ag-hero-bg is-solid">
                <div className="ag-hs-word" aria-hidden="true">{site.label}</div>
            </div>
            <div className="ag-hero-content">
                <div className="ag-container">
                    <div className="ag-hs-grid">
                        <div className="ag-hs-text">
                            <div className="ag-hs-flag" aria-hidden="true">
                                {m.flag.map((c, k) => <i key={k} style={{ background: c }} />)}
                            </div>
                            <span className={`ag-label ag-hero-anim ${dark ? "is-light" : ""}`}>{m.label} · {m.eyebrow}</span>
                            <Title className="ag-hero-title">
                                <span className="ag-hl"><span>{m.title[0]}</span></span>
                                <span className="ag-hl"><span>{m.title[1]}</span></span>
                            </Title>
                            <p className="ag-hero-desc ag-hero-anim">{m.desc}</p>
                            <div className="ag-btn-row ag-hero-anim">
                                {link.external ? (
                                    <AgButton href={link.href} external variant={dark ? "lime" : "dark"}>{m.cta}</AgButton>
                                ) : (
                                    <span className="ag-btn ag-btn-soon" aria-disabled="true" title="Website launching soon">
                                        <span className="ag-btn-text"><span>{m.cta}</span></span>
                                        <span className="ag-soon-chip">Coming soon</span>
                                    </span>
                                )}
                                {dark ? (
                                    <AgButton href="/contact" variant="outline" className="ag-hs-secondary">Trade Enquiry</AgButton>
                                ) : (
                                    <a href="#products" className="ag-link ag-hs-secondary">See our products <ArrowUpRight size={14} /></a>
                                )}
                            </div>
                        </div>
                        <div className="ag-mk-visual ag-hs-visual" aria-hidden="true">
                            <div className="ag-mk-orb" />
                            <div className="ag-mk-fan">
                                {m.products.map((p) => (
                                    <div className="ag-mk-card ag-hs-card" key={p.id}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={p.img} alt="" />
                                        <span>{p.brand}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="ag-mk-badge ag-hero-anim">
                                <span>{site.label}</span>
                                <b>{link.external ? "Visit site ↗" : "Site coming soon"}</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeHero;
