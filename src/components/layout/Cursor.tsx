"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "../ui/anim";

/** Lime dot + trailing ring. Grows on links; shows a label over [data-cursor="Text"]. */
const Cursor = () => {
    const ref = useRef<HTMLDivElement>(null);
    const label = useRef<HTMLSpanElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const el = ref.current;
        if (!el || !window.matchMedia("(hover: hover) and (min-width: 1025px)").matches) return;
        const dot = el.querySelector(".ag-cursor-dot") as HTMLElement;
        const ring = el.querySelector(".ag-cursor-ring") as HTMLElement;
        const dx = gsap.quickTo(dot, "x", { duration: 0.12 });
        const dy = gsap.quickTo(dot, "y", { duration: 0.12 });
        const rx = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
        const ry = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });
        const move = (e: MouseEvent) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); };
        const over = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            const lab = t.closest<HTMLElement>("[data-cursor]");
            if (lab) {
                el.classList.add("is-label");
                el.classList.remove("is-hover");
                if (label.current) label.current.textContent = lab.dataset.cursor || "";
                return;
            }
            el.classList.remove("is-label");
            el.classList.toggle("is-hover", !!t.closest("a, button, input, textarea, label, select"));
        };
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", over);
        gsap.set(el, { autoAlpha: 1 });
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", over);
        };
    }, []);

    useEffect(() => {
        ref.current?.classList.remove("is-label", "is-hover");
    }, [pathname]);

    return (
        <div className="ag-cursor" ref={ref} style={{ visibility: "hidden" }} aria-hidden="true">
            <div className="ag-cursor-ring"><span ref={label} /></div>
            <div className="ag-cursor-dot" />
        </div>
    );
};

export default Cursor;
