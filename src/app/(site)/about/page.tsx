import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import WideMedia from "@/components/ui/WideMedia";
import AboutWho from "@/components/about/AboutWho";
import AboutPurpose from "@/components/about/AboutPurpose";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutFootprint from "@/components/about/AboutFootprint";
import AboutLeadership from "@/components/about/AboutLeadership";
import AboutEthics from "@/components/about/AboutEthics";
import { aboutHero, brand, images } from "@/data/site-data";

export const metadata: Metadata = {
    title: `About Us | ${brand.fullName}`,
    description: "Our purpose, vision, values, history and leadership.",
};

export default function AboutPage() {
    return (
        <main>
            <PageHero label={aboutHero.label} title={aboutHero.title} desc={aboutHero.desc} badge="Our story • Since 1989 • Olam Group • " />
            <WideMedia src={images.aboutHero} alt="Close-up of a flowering plant" />
            <AboutWho />
            <AboutPurpose />
            <AboutTimeline />
            <AboutFootprint />
            <AboutLeadership />
            <AboutEthics />
        </main>
    );
}
