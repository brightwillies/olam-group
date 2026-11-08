import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import HomeIntro from "@/components/home/HomeIntro";
import HomeStats from "@/components/home/HomeStats";
import HomeMarquee from "@/components/home/HomeMarquee";
import HomeBusinesses from "@/components/home/HomeBusinesses";
import HomeFeatures from "@/components/home/HomeFeatures";
import HomeReport from "@/components/home/HomeReport";
import HomeNews from "@/components/home/HomeNews";
import HomeSubscribe from "@/components/home/HomeSubscribe";
import { brand } from "@/data/site-data";

export const metadata: Metadata = {
    title: `${brand.fullName} | ${brand.tagline}`,
    description: "A leading food and agri-business supplying food ingredients, feed and fibre to 11,000+ customers across 50+ countries.",
};

export default function HomePage() {
    return (
        <main>
            <HomeHero />
            <HomeIntro />
            <HomeMarquee />
            <HomeBusinesses />
            <HomeStats />
            <HomeFeatures />
            <HomeReport />
            <HomeNews />
            <HomeSubscribe />
        </main>
    );
}
