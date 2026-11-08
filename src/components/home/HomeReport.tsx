"use client";
import { useRef } from "react";
import { report } from "@/data/site-data";
import AgButton from "../ui/AgButton";
import { gsap, useAgriAnim } from "../ui/anim";

/** Annual report banner with a 3D book that follows the cursor and floats on scroll. */
const HomeReport = () => {
    const ref = useRef<HTMLElement>(null);

    useAgriAnim(ref, () => {
        const wrap = ref.current!.querySelector<HTMLElement>(".ag-report")!;
        const book = wrap.querySelector<HTMLElement>(".ag-book")!;
        gsap.from(book, { rotateY: -70, rotateX: 20, y: 120, autoAlpha: 0, duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: wrap, start: "top 70%", once: true } });
        gsap.to(".ag-report-glow", { xPercent: -40, yPercent: 40, ease: "none", scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(wrap, { scale: 0.92, borderRadius: 80 }, { scale: 1, borderRadius: 36, ease: "none", scrollTrigger: { trigger: wrap, start: "top bottom", end: "top 40%", scrub: true } });

        if (window.matchMedia("(hover: hover)").matches) {
            const rx = gsap.quickTo(book, "rotateX", { duration: 0.8, ease: "power3.out" });
            const ry = gsap.quickTo(book, "rotateY", { duration: 0.8, ease: "power3.out" });
            const move = (e: MouseEvent) => {
                const r = wrap.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                ry(-22 + px * 30);
                rx(6 - py * 20);
            };
            const leave = () => { ry(-22); rx(6); };
            wrap.addEventListener("mousemove", move);
            wrap.addEventListener("mouseleave", leave);
            return () => { wrap.removeEventListener("mousemove", move); wrap.removeEventListener("mouseleave", leave); };
        }
    });

    return (
        <section className="ag-section" id="report" ref={ref} style={{ paddingTop: 0 }}>
            <div className="ag-container">
                <div className="ag-report">
                    <div className="ag-report-glow" />
                    <div style={{ position: "relative" }}>
                        <span className="ag-label is-light" data-ag-fade="">{report.label}</span>
                        <h2 data-ag-split="">From Vision <em>to Value</em></h2>
                        <p className="ag-lead" data-ag-fade="">{report.desc}</p>
                        <div className="ag-btn-row" data-ag-fade="">
                            <AgButton href={report.cta.href}>{report.cta.label}</AgButton>
                            <AgButton href="#" variant="outline">Download PDF</AgButton>
                        </div>
                    </div>
                    <div className="ag-book-wrap">
                        <div className="ag-book">
                            <div className="ag-book-pages" />
                            <div className="ag-book-cover">
                                <span>Annual Report 2025</span>
                                <svg className="ag-book-lines" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
                                    {[0, 1, 2, 3, 4, 5].map((k) => (
                                        <path key={k} d={`M0 ${100 - k * 14} C 100 ${60 - k * 10}, 220 ${110 - k * 16}, 400 ${30 - k * 4}`} stroke="#10302a" strokeWidth="2" fill="none" />
                                    ))}
                                </svg>
                                <h4>From Vision <em>to Value</em></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeReport;
