"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, SplitText, prefersReduced } from "../ui/anim";

/**
 * Declarative scroll animations for the whole site. Add data attributes in markup:
 *  data-ag-split          heading reveals line by line from a mask
 *  data-ag-fade           fades up (data-ag-delay="0.2")
 *  data-ag-stagger        children fade up one after another
 *  data-ag-clip           image wipes open from bottom while zooming out
 *  data-ag-parallax       inner <img> drifts while scrolling (value = strength %)
 *  data-ag-fill           words light up as you scroll (scrubbed)
 *  data-ag-count="11000"  number counts up (data-ag-suffix / data-ag-plain)
 *  data-ag-line           1px rule draws from the left
 *  data-ag-magnetic       element is gently pulled towards the cursor
 */
const Animator = () => {
    const pathname = usePathname();

    useEffect(() => {
        if (prefersReduced()) return;
        let ctx: gsap.Context | null = null;
        const cleanups: (() => void)[] = [];

        const id = window.setTimeout(() => {
            const root = document.querySelector(".ag-site");
            if (!root) return;

            ctx = gsap.context(() => {
                // Line reveals
                gsap.utils.toArray<HTMLElement>("[data-ag-split]").forEach((el) => {
                    const split = new SplitText(el, { type: "lines", mask: "lines" });
                    gsap.from(split.lines, {
                        yPercent: 110,
                        rotate: 2,
                        duration: 1.2,
                        ease: "power4.out",
                        stagger: 0.09,
                        delay: Number(el.dataset.agDelay ?? 0),
                        scrollTrigger: { trigger: el, start: "top 88%", once: true },
                    });
                });

                // Fades
                gsap.utils.toArray<HTMLElement>("[data-ag-fade]").forEach((el) => {
                    el.style.transition = "none"; // avoid CSS transitions fighting the tween
                    gsap.from(el, {
                        onComplete: () => { el.style.transition = ""; },
                        y: 50,
                        autoAlpha: 0,
                        duration: 1.1,
                        ease: "power3.out",
                        delay: Number(el.dataset.agDelay ?? 0),
                        scrollTrigger: { trigger: el, start: "top 90%", once: true },
                    });
                });

                // Staggered children
                gsap.utils.toArray<HTMLElement>("[data-ag-stagger]").forEach((el) => {
                    const kids = gsap.utils.toArray<HTMLElement>(el.children);
                    kids.forEach((k) => { k.style.transition = "none"; });
                    gsap.from(kids, {
                        onComplete: () => kids.forEach((k) => { k.style.transition = ""; }),
                        y: 60,
                        autoAlpha: 0,
                        duration: 1,
                        ease: "power3.out",
                        stagger: 0.12,
                        scrollTrigger: { trigger: el, start: "top 85%", once: true },
                    });
                });

                // Image clip reveals
                gsap.utils.toArray<HTMLElement>("[data-ag-clip]").forEach((el) => {
                    const img = el.querySelector("img");
                    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
                    tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" });
                    if (img) tl.from(img, { scale: 1.35, duration: 1.8, ease: "expo.out" }, 0.2);
                });

                // Parallax images
                gsap.utils.toArray<HTMLElement>("[data-ag-parallax]").forEach((el) => {
                    const img = el.querySelector("img");
                    if (!img) return;
                    const amt = Number(el.dataset.agParallax || 10);
                    gsap.fromTo(img, { yPercent: -amt }, {
                        yPercent: amt,
                        ease: "none",
                        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
                    });
                });

                // Word fill
                gsap.utils.toArray<HTMLElement>("[data-ag-fill]").forEach((el) => {
                    const split = new SplitText(el, { type: "words", wordsClass: "ag-word" });
                    const color = el.dataset.agFill || "#10302a";
                    gsap.to(split.words, {
                        color,
                        stagger: 0.1,
                        ease: "none",
                        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 1 },
                    });
                });

                // Counters
                gsap.utils.toArray<HTMLElement>("[data-ag-count]").forEach((el) => {
                    const end = Number(el.dataset.agCount);
                    const plain = el.dataset.agPlain === "true";
                    const obj = { v: plain ? Math.round(end * 0.97) : 0 };
                    const fmt = (n: number) => (plain ? String(Math.round(n)) : Math.round(n).toLocaleString("en-US"));
                    el.textContent = fmt(obj.v);
                    gsap.to(obj, {
                        v: end,
                        duration: 2.2,
                        ease: "power3.out",
                        scrollTrigger: { trigger: el, start: "top 90%", once: true },
                        onUpdate: () => { el.textContent = fmt(obj.v); },
                    });
                });

                // Rules
                gsap.utils.toArray<HTMLElement>("[data-ag-line]").forEach((el) => {
                    gsap.from(el, {
                        scaleX: 0,
                        transformOrigin: "left center",
                        duration: 1.4,
                        ease: "expo.inOut",
                        scrollTrigger: { trigger: el, start: "top 92%", once: true },
                    });
                });
            }, root);

            // Magnetic hover (desktop pointers only)
            if (window.matchMedia("(hover: hover) and (min-width: 1025px)").matches) {
                document.querySelectorAll<HTMLElement>("[data-ag-magnetic]").forEach((el) => {
                    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
                    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
                    const move = (e: MouseEvent) => {
                        const r = el.getBoundingClientRect();
                        xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
                        yTo((e.clientY - (r.top + r.height / 2)) * 0.38);
                    };
                    const leave = () => { xTo(0); yTo(0); };
                    el.addEventListener("mousemove", move);
                    el.addEventListener("mouseleave", leave);
                    cleanups.push(() => {
                        el.removeEventListener("mousemove", move);
                        el.removeEventListener("mouseleave", leave);
                        gsap.set(el, { x: 0, y: 0 });
                    });
                });
            }

            ScrollTrigger.refresh();
        }, 420);

        return () => {
            window.clearTimeout(id);
            ctx?.revert();
            cleanups.forEach((c) => c());
        };
    }, [pathname]);

    return null;
};

export default Animator;
