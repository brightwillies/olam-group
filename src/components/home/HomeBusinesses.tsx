"use client";
import { useRef } from "react";
import Link from "next/link";
import { businesses } from "@/data/site-data";
import { ArrowUpRight } from "../ui/Icons";
import AgButton from "../ui/AgButton";
import { gsap, useAgriAnim } from "../ui/anim";

/** Pinned horizontal scroll gallery on desktop, stacked cards on mobile. */
const HomeBusinesses = () => {
    const ref = useRef<HTMLElement>(null);

    useAgriAnim(ref, () => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 992px)", () => {
            const section = ref.current!;
            const track = section.querySelector<HTMLElement>(".ag-biz-track")!;
            const distance = () => track.scrollWidth - window.innerWidth;
            const tween = gsap.to(track, {
                x: () => -distance(),
                ease: "none",
                scrollTrigger: {
                    trigger: section.querySelector(".ag-biz-pin"),
                    start: "top top",
                    end: () => `+=${distance()}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });
            gsap.to(".ag-biz-progress i", {
                scaleX: 1,
                ease: "none",
                scrollTrigger: { trigger: section.querySelector(".ag-biz-pin"), start: "top top", end: () => `+=${distance()}`, scrub: true },
            });
            gsap.utils.toArray<HTMLElement>(".ag-biz-card").forEach((card) => {
                gsap.fromTo(card.querySelector(".ag-biz-img"), { xPercent: -12 }, {
                    xPercent: 12,
                    ease: "none",
                    scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
                });
                gsap.from(card, {
                    rotate: 4,
                    yPercent: 8,
                    ease: "none",
                    scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "left 55%", scrub: true },
                });
            });
        });
        mm.add("(max-width: 991px)", () => {
            gsap.utils.toArray<HTMLElement>(".ag-biz-card").forEach((card) => {
                gsap.from(card, { y: 80, autoAlpha: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%", once: true } });
            });
        });
    });

    return (
        <section className="ag-biz" id="businesses" ref={ref}>
            <div className="ag-biz-pin ag-section" style={{ paddingBottom: 80 }}>
                <div className="ag-container">
                    <div className="ag-biz-head">
                        <div>
                            <span className="ag-label" data-ag-fade="">Our Businesses</span>
                            <h2 className="ag-h2" data-ag-split="" style={{ marginTop: 20, maxWidth: 760 }}>
                                Focused businesses, <em>one</em> shared purpose
                            </h2>
                        </div>
                        <div data-ag-fade="">
                            <AgButton href="/about" variant="dark">All Businesses</AgButton>
                        </div>
                    </div>
                </div>
                <div className="ag-biz-track">
                    {businesses.map((b) => (
                        <Link href={b.href} className="ag-biz-card" key={b.no} data-cursor="View">
                            <div className="ag-biz-img">
                                { }
                                <img src={b.img} alt={b.title} />
                            </div>
                            <div className="ag-biz-body">
                                <div className="ag-biz-no">
                                    <span>{b.no} / 0{businesses.length}</span>
                                    <span className="ag-biz-arrow"><ArrowUpRight size={20} /></span>
                                </div>
                                <div>
                                    <span className="ag-biz-sub">{b.sub}</span>
                                    <h3>{b.title}</h3>
                                    <p>{b.desc}</p>
                                    <div className="ag-tags">{b.tags.map((t) => <span key={t}>{t}</span>)}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="ag-container">
                    <div className="ag-biz-progress"><i /></div>
                </div>
            </div>
        </section>
    );
};

export default HomeBusinesses;
