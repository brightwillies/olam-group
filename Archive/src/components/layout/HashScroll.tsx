"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { onSiteReady } from "../ui/anim";

const scrollToHash = (hash: string) => {
    const target = hash && document.querySelector(hash);
    if (!target) return false;
    const s = ScrollSmoother.get();
    if (s) s.scrollTo(target, true, "top 90px");
    else target.scrollIntoView({ behavior: "smooth" });
    return true;
};

/** Smooth in-page anchor links (works with GSAP ScrollSmoother). */
const HashScroll = () => {
    const pathname = usePathname();

    useEffect(() => {
        let id = 0;
        const off = onSiteReady(() => {
            id = window.setTimeout(() => scrollToHash(window.location.hash), 250);
        });
        return () => { off(); window.clearTimeout(id); };
    }, [pathname]);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const a = (e.target as HTMLElement).closest("a");
            if (!a || !a.hash || e.metaKey || e.ctrlKey) return;
            const url = new URL(a.href);
            if (url.pathname !== window.location.pathname || url.origin !== window.location.origin) return;
            if (scrollToHash(url.hash)) {
                e.preventDefault();
                history.replaceState(null, "", url.hash);
            }
        };
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);

    return null;
};

export default HashScroll;
