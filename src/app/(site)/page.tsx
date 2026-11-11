import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import HomeIntro from "@/components/home/HomeIntro";
import HomeStats from "@/components/home/HomeStats";
import HomeMarquee from "@/components/home/HomeMarquee";
import HomeMarket from "@/components/home/HomeMarket";
import HomeProducts from "@/components/home/HomeProducts";
import { brand } from "@/data/site-data";

export const metadata: Metadata = {
    title: `${brand.fullName} | ${brand.tagline}`,
    description: "Caraway Africa makes everyday foods and drinks for Ghana, Nigeria and beyond: Tasty Tom, NutriSnax, Nutri-C, Perk!, Nutri Choco and King Cracker.",
};

export default function HomePage() {
    return (
        <main>
            <HomeHero />
            <HomeIntro />
            <HomeStats />
            <HomeMarquee />
            <HomeMarket market="ghana" />
            <HomeMarket market="nigeria" />
            <HomeProducts />
        </main>
    );
}
