"use client";
import { useRef } from "react";
import { gsap, useAgriAnim } from "./anim";

/** Full-bleed image that grows from an inset rounded card to edge-to-edge as you scroll. */
const WideMedia = ({ src, alt }: { src: string; alt: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    useAgriAnim(ref, () => {
        const inner = ref.current!.querySelector(".ag-wide-media-inner");
        const st = { trigger: ref.current, start: "top bottom", end: "center center", scrub: true };
        gsap.fromTo(inner, { clipPath: "inset(0% 18% 0% 18% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: st });
        gsap.fromTo(inner!.querySelector("img"), { yPercent: -8, scale: 1.2 }, { yPercent: 8, scale: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
    });
    return (
        <div className="ag-wide-media" ref={ref} id="content">
            <div className="ag-wide-media-inner">
                { }
                <img src={src} alt={alt} />
            </div>
        </div>
    );
};

export default WideMedia;
