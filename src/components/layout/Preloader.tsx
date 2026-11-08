"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "../ui/anim";
import { brand } from "@/data/site-data";

const WORDS = ["Growing", "Sourcing", "Processing", "Delivering"];

/** First-load intro: counter + word ticker, then two panels lift away. */
const Preloader = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        document.body.classList.add("ag-lock");
        const finish = () => {
            document.body.classList.remove("ag-lock");
            window.__agReady = true;
            window.dispatchEvent(new Event("ag:ready"));
        };

        const ctx = gsap.context(() => {
            const count = { v: 0 };
            const num = el.querySelector(".ag-pre-count") as HTMLElement;
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.from(".ag-pre-logo > *", { yPercent: 120, duration: 0.9, ease: "power4.out" })
                .to(".ag-pre-bar i", { scaleX: 1, duration: 1.9, ease: "power2.inOut" }, 0.2)
                .to(count, {
                    v: 100, duration: 1.9, ease: "power2.inOut",
                    onUpdate: () => { num.textContent = String(Math.round(count.v)); },
                }, 0.2)
                .to(".ag-pre-words-track", { yPercent: -75, duration: 1.8, ease: "steps(3)" }, 0.25)
                .to(".ag-pre-inner", { autoAlpha: 0, y: -40, duration: 0.5, ease: "power2.in" }, "+=0.1")
                .to(".ag-pre-panel.is-forest", { yPercent: -100, duration: 1, ease: "expo.inOut" })
                .to(".ag-pre-panel.is-lime", { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=0.86")
                .add(finish, "-=0.55")
                .add(() => setDone(true));
        }, el);

        return () => {
            ctx.revert();
            document.body.classList.remove("ag-lock");
            window.__agReady = true;
        };
    }, []);

    if (done) return null;

    return (
        <div className="ag-preloader" ref={ref} aria-hidden="true">
            <div className="ag-pre-panel is-lime" />
            <div className="ag-pre-panel is-forest" />
            <div className="ag-pre-inner">
                <div className="ag-pre-logo">
                    <img src={brand.logoWhite} alt={brand.fullName} style={{ height: 56, width: "auto" }} />
                </div>
                <div className="ag-pre-bar"><i /></div>
                <div className="ag-pre-words">
                    <div className="ag-pre-words-track">
                        {WORDS.map((w) => <span key={w}>{w} the future of food</span>)}
                    </div>
                </div>
                <div className="ag-pre-count">0</div>
            </div>
        </div>
    );
};

export default Preloader;
