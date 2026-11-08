"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { mainNav } from "@/data/site-data";
import Logo from "../ui/Logo";
import AgButton from "../ui/AgButton";
import { ArrowRight, Caret } from "../ui/Icons";
import Menu from "./Menu";

const Header = () => {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [open, setOpen] = useState(false);
    const lastY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 40);
            setHidden(y > 320 && y > lastY.current + 2);
            if (y < lastY.current - 2) setHidden(false);
            lastY.current = y;
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // close the menu and reveal the header whenever the route changes
    const [prevPath, setPrevPath] = useState(pathname);
    if (prevPath !== pathname) {
        setPrevPath(pathname);
        setOpen(false);
        setHidden(false);
    }

    useEffect(() => {
        ScrollSmoother.get()?.paused(open);
        document.body.classList.toggle("ag-lock", open);
    }, [open]);

    const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]) && !href.includes("#"));

    return (
        <>
            <header className={`ag-header ${scrolled ? "is-scrolled" : ""} ${hidden && !open ? "is-hidden" : ""} ${open ? "is-menu-open" : ""}`}>
                <div className="ag-container ag-header-inner">
                    <Logo tone="auto" onClick={() => setOpen(false)} />
                    <ul className="ag-nav">
                        {mainNav.map((item) => (
                            <li key={item.label}>
                                <Link href={item.href} className={isActive(item.href) ? "is-active" : ""}>
                                    <span className="ag-roll">
                                        <span>{item.label}</span>
                                        <span aria-hidden="true">{item.label}</span>
                                    </span>
                                    {item.children && <Caret className="ag-caret" />}
                                </Link>
                                {item.children && (
                                    <div className="ag-dropdown">
                                        {item.children.map((c) => (
                                            <Link key={c.label} href={c.href}>
                                                {c.label}
                                                <ArrowRight size={14} />
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className="ag-header-actions">
                        <AgButton href="/contact" variant={scrolled && !open ? "dark" : "lime"}>Get in Touch</AgButton>
                        <button
                            className={`ag-burger ${open ? "is-open" : ""}`}
                            onClick={() => setOpen((o) => !o)}
                            aria-label={open ? "Close menu" : "Open menu"}
                            aria-expanded={open}
                        >
                            <span /><span /><span />
                        </button>
                    </div>
                </div>
            </header>
            <Menu open={open} onClose={() => setOpen(false)} />
        </>
    );
};

export default Header;
