"use client";
import { useState } from "react";
import { faqs } from "@/data/site-data";
import { gsap } from "../ui/anim";

/** Accordion that animates height with GSAP. */
const ContactFaq = () => {
    const [open, setOpen] = useState<number | null>(0);

    const toggle = (i: number, e: React.MouseEvent<HTMLButtonElement>) => {
        const list = (e.currentTarget.closest(".ag-faq-list") as HTMLElement).querySelectorAll<HTMLElement>(".ag-faq-body");
        list.forEach((body, k) => {
            const opening = k === i && open !== i;
            gsap.to(body, { height: opening ? "auto" : 0, duration: 0.7, ease: "expo.inOut" });
            if (opening) gsap.fromTo(body.querySelector("p"), { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, delay: 0.15, ease: "power3.out" });
        });
        setOpen(open === i ? null : i);
    };

    return (
        <section className="ag-section" style={{ background: "#fff" }}>
            <div className="ag-container">
                <div className="ag-faq">
                    <div>
                        <span className="ag-label" data-ag-fade="">FAQ</span>
                        <h2 className="ag-h2" data-ag-split="" style={{ marginTop: 20 }}>
                            Common <em>questions</em>
                        </h2>
                    </div>
                    <div className="ag-faq-list" data-ag-stagger="">
                        {faqs.map((f, i) => (
                            <div className={`ag-faq-item ${open === i ? "is-open" : ""}`} key={f.q}>
                                <button onClick={(e) => toggle(i, e)} aria-expanded={open === i}>
                                    {f.q}
                                    <span className="ag-faq-icon" />
                                </button>
                                <div className="ag-faq-body" style={i === 0 ? { height: "auto" } : undefined}>
                                    <p>{f.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactFaq;
