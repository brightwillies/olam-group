"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { brand } from "@/data/site-data";
import Logo from "../ui/Logo";
import AgButton from "../ui/AgButton";
import { ArrowUpRight, SocialIcon } from "../ui/Icons";
import { gsap, useAgriAnim } from "../ui/anim";

const company = [
    { label: "About Us", href: "/about" },
    { label: "Our Purpose", href: "/about#purpose" },
    { label: "Leadership", href: "/about#leadership" },
    { label: "Contact", href: "/contact" },
];
const explore = [
    { label: "Our Businesses", href: "/#businesses" },
    { label: "Sustainability", href: "/#sustainability" },
    { label: "Annual Report", href: "/#report" },
    { label: "Latest News", href: "/#news" },
];

const Footer = () => {
    const ref = useRef<HTMLElement>(null);
    const [sent, setSent] = useState(false);

    useAgriAnim(ref, () => {
        gsap.from(".ag-footer-word span", {
            yPercent: 100,
            ease: "none",
            stagger: 0.06,
            scrollTrigger: { trigger: ".ag-footer-word", start: "top bottom", end: "bottom bottom", scrub: 1 },
        });
    });

    const toTop = () => {
        const s = ScrollSmoother.get();
        if (s) s.scrollTo(0, true);
        else window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="ag-footer" ref={ref}>
            <div className="ag-container">
                <div className="ag-footer-cta">
                    <h2 data-ag-split="">
                        Let&apos;s grow <em>together.</em>
                    </h2>
                    <AgButton href="/contact">Start a Conversation</AgButton>
                </div>
                <div className="ag-footer-grid">
                    <div data-ag-fade="">
                        <div style={{ marginBottom: 22 }}><Logo tone="light" height={40} /></div>
                        <p style={{ maxWidth: 340, marginBottom: 26 }}>{brand.tagline}. Supplying food, feed and fibre to 11,000+ customers worldwide.</p>
                        <div className="ag-social">
                            {brand.social.map((s) => (
                                <a key={s.label} href={s.href} aria-label={s.label}><SocialIcon name={s.icon} /></a>
                            ))}
                        </div>
                    </div>
                    <div data-ag-fade="" data-ag-delay="0.1">
                        <h6>Company</h6>
                        <ul>{company.map((l) => <li key={l.label}><Link href={l.href}>{l.label}</Link></li>)}</ul>
                    </div>
                    <div data-ag-fade="" data-ag-delay="0.2">
                        <h6>Explore</h6>
                        <ul>{explore.map((l) => <li key={l.label}><Link href={l.href}>{l.label}</Link></li>)}</ul>
                    </div>
                    <div data-ag-fade="" data-ag-delay="0.3">
                        <h6>News alerts</h6>
                        {sent ? (
                            <p style={{ color: "var(--ag-lime)" }}>Thanks — you&apos;re subscribed.</p>
                        ) : (
                            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ marginBottom: 26 }}>
                                <div className="ag-field is-dark">
                                    <input id="ft-email" type="email" placeholder=" " required />
                                    <label htmlFor="ft-email">Your email address</label>
                                    <i className="ag-field-line" />
                                </div>
                                <button type="submit" className="ag-link" style={{ marginTop: 16, background: "none", border: 0, color: "#fff", padding: "0 0 4px" }}>
                                    Subscribe <ArrowUpRight size={14} />
                                </button>
                            </form>
                        )}
                        <p style={{ marginTop: 20 }}>
                            <a href={`mailto:${brand.email}`}>{brand.email}</a><br />
                            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="ag-footer-word" aria-hidden="true">
                {brand.name.split("").map((c, i) => <span key={i}>{c}</span>)}
            </div>
            <div className="ag-container">
                <div className="ag-footer-bottom">
                    <span>© {new Date().getFullYear()} {brand.fullName}. All rights reserved. {brand.regNo}</span>
                    <nav>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Cookie Policy</a>
                        <a href="#">Terms of Use</a>
                        <a href="#">Sitemap</a>
                    </nav>
                </div>
            </div>
            <div className="ag-to-top-wrap" style={{ position: "absolute", right: "var(--ag-gutter)", top: 40 }}>
                <button className="ag-to-top" onClick={toTop} aria-label="Back to top" data-ag-magnetic="">
                    <ArrowUpRight size={20} />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
