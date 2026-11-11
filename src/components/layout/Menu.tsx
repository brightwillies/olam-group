"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { SocialIcon } from "../ui/Icons";
import { gsap } from "../ui/anim";
import { brand, mainNav, marketLink } from "@/data/site-data";

/** Full-screen menu that expands as a circle from the burger button. */
const Menu = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const first = useRef(true);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (first.current) { first.current = false; if (!open) return; }
        const links = el.querySelectorAll(".ag-menu-links a");
        const side = el.querySelectorAll(".ag-menu-side > *");
        const tl = gsap.timeline();
        if (open) {
            tl.set(el, { visibility: "visible" })
                .to(el, { clipPath: "circle(150% at calc(100% - 60px) 48px)", duration: 1.1, ease: "expo.inOut" })
                .fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.06 }, 0.45)
                .fromTo(side, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1 }, 0.7);
        } else {
            tl.to(links, { yPercent: -110, duration: 0.5, ease: "power3.in", stagger: 0.03 })
                .to(el, { clipPath: "circle(0% at calc(100% - 60px) 48px)", duration: 0.9, ease: "expo.inOut" }, 0.2)
                .set(el, { visibility: "hidden" });
        }
        return () => { tl.kill(); };
    }, [open]);

    return (
        <div className="ag-menu" ref={ref} aria-hidden={!open}>
            <div className="ag-container ag-menu-inner">
                <ul className="ag-menu-links">
                    {mainNav.map((item, i) => {
                        const link = item.market ? marketLink(item.market) : { href: item.href, external: false };
                        return (
                            <li key={item.label}>
                                {link.external ? (
                                    <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={onClose}>
                                        <small>0{i + 1}</small>
                                        {item.label} ↗
                                    </a>
                                ) : (
                                    <Link href={link.href} onClick={onClose}>
                                        <small>0{i + 1}</small>
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
                <div className="ag-menu-side">
                    <div>
                        <h6>Headquarters</h6>
                        <p>{brand.address.join(", ")}</p>
                    </div>
                    <div>
                        <h6>Say hello</h6>
                        <a href={`mailto:${brand.email}`}>{brand.email}</a><br />
                        <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
                    </div>
                    <div className="ag-social">
                        {brand.social.map((s) => (
                            <a key={s.label} href={s.href} aria-label={s.label}><SocialIcon name={s.icon} /></a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
