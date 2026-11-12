"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "../ui/anim";
import { brand } from "@/data/site-data";
import { LeafMark } from "../ui/Icons";

let firstMount = true;

/** Lifts off the page on every client-side navigation (first load is handled by the Preloader). */
const PageCurtain = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [active] = useState(() => {
        if (typeof window === "undefined") return false; // server render: never show
        if (firstMount) { firstMount = false; return false; }
        window.__agReady = false;
        return true;
    });
    const [gone, setGone] = useState(!active);

    useEffect(() => {
        if (!active || !ref.current) return;
        const tl = gsap.timeline({ delay: 0.45 });
        tl.to(ref.current.querySelector("img, svg"), { scale: 0.6, autoAlpha: 0, duration: 0.4, ease: "power2.in" })
            .to(ref.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" })
            .add(() => {
                window.__agReady = true;
                window.dispatchEvent(new Event("ag:ready"));
            }, "-=0.5")
            .add(() => setGone(true));
        return () => { tl.kill(); window.__agReady = true; };
    }, [active]);

    if (gone) return null;
    return createPortal(
        <div className="ag-curtain" ref={ref} aria-hidden="true">
            {brand.logoMark ? <img src={brand.logoMark} alt="" style={{ width: 64, height: 64 }} /> : <LeafMark size={64} />}
        </div>,
        document.body
    );
};

export default PageCurtain;
