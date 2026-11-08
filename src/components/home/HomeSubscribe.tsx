"use client";
import { useState } from "react";
import { subscribeTopics } from "@/data/site-data";
import AgButton from "../ui/AgButton";
import { Check } from "../ui/Icons";

const HomeSubscribe = () => {
    const [topics, setTopics] = useState<string[]>([subscribeTopics[0]]);
    const [done, setDone] = useState(false);
    const toggle = (t: string) => setTopics((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

    return (
        <section className="ag-section" style={{ background: "var(--ag-sand)" }}>
            <div className="ag-container">
                <div className="ag-subscribe">
                    <div>
                        <span className="ag-label" data-ag-fade="">Stay informed</span>
                        <h2 className="ag-h2" data-ag-split="" style={{ marginTop: 20 }}>Subscribe to <em>news alerts</em></h2>
                        <p className="ag-lead" data-ag-fade="" style={{ marginTop: 24, maxWidth: 460 }}>
                            Get press releases, results and sustainability updates delivered straight to your inbox.
                        </p>
                    </div>
                    <div data-ag-fade="">
                        {done ? (
                            <div className="ag-success">
                                <div className="ag-success-icon"><Check size={40} /></div>
                                <h3>You&apos;re on the list</h3>
                                <p className="ag-lead">We&apos;ll send you {topics.join(", ").toLowerCase() || "updates"}.</p>
                            </div>
                        ) : (
                            <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
                                <div className="ag-sub-row">
                                    <div className="ag-field">
                                        <input id="sub-name" placeholder=" " required />
                                        <label htmlFor="sub-name">Full name</label>
                                        <i className="ag-field-line" />
                                    </div>
                                    <div className="ag-field">
                                        <input id="sub-email" type="email" placeholder=" " required />
                                        <label htmlFor="sub-email">Email address</label>
                                        <i className="ag-field-line" />
                                    </div>
                                </div>
                                <div>
                                    <p style={{ fontWeight: 600, marginBottom: 14, color: "var(--ag-forest)" }}>I&apos;m interested in</p>
                                    <div className="ag-chips">
                                        {subscribeTopics.map((t) => (
                                            <button type="button" key={t} className={topics.includes(t) ? "is-on" : ""} onClick={() => toggle(t)} aria-pressed={topics.includes(t)}>
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ marginTop: 10 }}>
                                    <AgButton type="submit" variant="dark">Subscribe</AgButton>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeSubscribe;
