"use client";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { brand, enquiryTypes } from "@/data/site-data";
import AgButton from "../ui/AgButton";
import { Check } from "../ui/Icons";
import { gsap } from "../ui/anim";

type FormValues = { name: string; email: string; company: string; phone: string; message: string; consent: boolean };

/** Enquiry form with type chips, floating labels, validation and an animated success state. */
const ContactForm = () => {
    const [type, setType] = useState(enquiryTypes[0]);
    const [sent, setSent] = useState(false);
    const card = useRef<HTMLDivElement>(null);
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        // TODO: connect to your email service / API route here.
        await new Promise((r) => setTimeout(r, 900));
        console.info("Enquiry", { type, ...data });
        toast.success("Message sent — we'll be in touch soon.");
        const el = card.current;
        if (!el) { setSent(true); return; }
        gsap.to(el.querySelector("form"), {
            autoAlpha: 0, y: -30, duration: 0.5, ease: "power2.in",
            onComplete: () => {
                setSent(true);
                reset();
                requestAnimationFrame(() => {
                    gsap.from(el.querySelectorAll(".ag-success > *"), { y: 40, autoAlpha: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 });
                    gsap.from(el.querySelector(".ag-success-icon"), { scale: 0, rotate: -90, duration: 1, ease: "back.out(2.5)" });
                });
            },
        });
    };

    return (
        <section className="ag-section" id="enquiry">
            <div className="ag-container">
                <div className="ag-contact-grid">
                    <div>
                        <span className="ag-label" data-ag-fade="">Send an enquiry</span>
                        <h2 className="ag-h2" data-ag-split="" style={{ marginTop: 20, marginBottom: 50 }}>
                            How can we <em>help?</em>
                        </h2>
                        <div data-ag-stagger="">
                            <div className="ag-info-item">
                                <h6>Global Headquarters</h6>
                                <p>{brand.address[0]}<br />{brand.address[1]}</p>
                            </div>
                            <div className="ag-info-item">
                                <h6>Call us</h6>
                                <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
                            </div>
                            <div className="ag-info-item">
                                <h6>Email</h6>
                                <a href={`mailto:${brand.email}`}>{brand.email}</a>
                            </div>
                            <div className="ag-info-item">
                                <h6>Office hours</h6>
                                <p>{brand.hours}</p>
                            </div>
                        </div>
                    </div>

                    <div className="ag-form-card" ref={card} data-ag-fade="">
                        {sent ? (
                            <div className="ag-success">
                                <div className="ag-success-icon"><Check size={44} /></div>
                                <h3>Thank you!</h3>
                                <p className="ag-lead" style={{ marginBottom: 30 }}>Your {type.toLowerCase()} enquiry is with our team. We usually reply within one working day.</p>
                                <AgButton variant="dark" onClick={() => setSent(false)}>Send another message</AgButton>
                            </div>
                        ) : (
                            <form onSubmit={(e) => handleSubmit(onSubmit)(e)} noValidate>
                                <div>
                                    <p style={{ fontWeight: 600, marginBottom: 14, color: "var(--ag-forest)" }}>What is your enquiry about?</p>
                                    <div className="ag-chips">
                                        {enquiryTypes.map((t) => (
                                            <button type="button" key={t} className={type === t ? "is-on" : ""} onClick={() => setType(t)} aria-pressed={type === t}>{t}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="ag-form-row">
                                    <div className="ag-field">
                                        <input id="c-name" placeholder=" " {...register("name", { required: "Required" })} />
                                        <label htmlFor="c-name">Full name *</label>
                                        <i className="ag-field-line" />
                                        {errors.name && <span className="ag-field-error">{errors.name.message}</span>}
                                    </div>
                                    <div className="ag-field">
                                        <input id="c-email" type="email" placeholder=" " {...register("email", { required: "Required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" } })} />
                                        <label htmlFor="c-email">Email address *</label>
                                        <i className="ag-field-line" />
                                        {errors.email && <span className="ag-field-error">{errors.email.message}</span>}
                                    </div>
                                </div>
                                <div className="ag-form-row">
                                    <div className="ag-field">
                                        <input id="c-company" placeholder=" " {...register("company")} />
                                        <label htmlFor="c-company">Company</label>
                                        <i className="ag-field-line" />
                                    </div>
                                    <div className="ag-field">
                                        <input id="c-phone" type="tel" placeholder=" " {...register("phone")} />
                                        <label htmlFor="c-phone">Phone</label>
                                        <i className="ag-field-line" />
                                    </div>
                                </div>
                                <div className="ag-field">
                                    <textarea id="c-msg" placeholder=" " {...register("message", { required: "Required", minLength: { value: 10, message: "Tell us a bit more" } })} />
                                    <label htmlFor="c-msg">Your message *</label>
                                    <i className="ag-field-line" />
                                    {errors.message && <span className="ag-field-error">{errors.message.message}</span>}
                                </div>
                                <label className="ag-check">
                                    <input type="checkbox" {...register("consent", { required: true })} />
                                    <span style={{ color: errors.consent ? "#d9480f" : undefined }}>
                                        I agree to the processing of my personal data in line with the Privacy Policy.
                                    </span>
                                </label>
                                <div>
                                    <AgButton type="submit" variant="dark" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send Message"}</AgButton>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
