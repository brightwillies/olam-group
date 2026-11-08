"use client";
import { useEffect, type RefObject, type DependencyList } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

declare global {
    interface Window { __agReady?: boolean }
}

export const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 992px)").matches;
export const prefersReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Run cb once the preloader / page curtain has finished. */
export const onSiteReady = (cb: () => void) => {
    if (typeof window === "undefined") return () => {};
    if (window.__agReady) {
        cb();
        return () => {};
    }
    const h = () => cb();
    window.addEventListener("ag:ready", h, { once: true });
    return () => window.removeEventListener("ag:ready", h);
};

/**
 * Scoped GSAP context, started shortly after mount so ScrollSmoother and layout have settled.
 */
export function useAgriAnim(scope: RefObject<HTMLElement | null>, fn: () => void | (() => void), deps: DependencyList = [], delay = 380) {
    useEffect(() => {
        let ctx: gsap.Context | null = null;
        const id = window.setTimeout(() => {
            if (!scope.current) return;
            ctx = gsap.context(fn, scope.current);
            ScrollTrigger.refresh();
        }, delay);
        return () => {
            window.clearTimeout(id);
            ctx?.revert();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

/** Split a heading into masked lines (for line-by-line reveals). */
export const splitLines = (el: Element) =>
    new SplitText(el, { type: "lines", linesClass: "ag-line-inner", mask: "lines" });
