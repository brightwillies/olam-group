import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import Cursor from "@/components/layout/Cursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Animator from "@/components/layout/Animator";
import HashScroll from "@/components/layout/HashScroll";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Preloader />
            <Cursor />
            <Header />
            <div id="smooth-wrapper">
                <div id="smooth-content" className="ag-site">
                    {children}
                    <Footer />
                </div>
            </div>
            <SmoothScroll />
            <Animator />
            <HashScroll />
        </>
    );
}
