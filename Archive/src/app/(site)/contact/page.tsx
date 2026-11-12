import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactOffices from "@/components/contact/ContactOffices";
import ContactFaq from "@/components/contact/ContactFaq";
import { brand } from "@/data/site-data";

export const metadata: Metadata = {
    title: `Contact Us | ${brand.fullName}`,
    description: "Get in touch with our business, media, investor relations and careers teams around the world.",
};

export default function ContactPage() {
    return (
        <main>
            <ContactHero />
            <ContactForm />
            <ContactOffices />
            <ContactFaq />
        </main>
    );
}
