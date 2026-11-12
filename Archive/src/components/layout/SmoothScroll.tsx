"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/** GSAP ScrollSmoother on #smooth-wrapper / #smooth-content, reset to top on every route change. */
const SmoothScroll = () => {
    const pathname = usePathname();

    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: reduce ? 0 : 1.6,
            effects: true,
            smoothTouch: 0.1,
            ignoreMobileResize: true,
        });
        return () => smoother.kill();
    }, []);

    useEffect(() => {
        const s = ScrollSmoother.get();
        if (s) s.scrollTop(0);
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default SmoothScroll;
