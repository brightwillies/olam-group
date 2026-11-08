import { images, intro } from "@/data/site-data";
import AgButton from "../ui/AgButton";

const HomeIntro = () => (
    <section className="ag-section ag-intro" id="intro">
        <div className="ag-container">
            <div className="ag-intro-grid">
                <div>
                    <span className="ag-label" data-ag-fade="">{intro.label}</span>
                    <div className="ag-intro-img ag-mt-40" data-ag-clip="" data-ag-parallax="8">
                        { }
                        <img src={images.intro} alt="Farming family in a field at sunset" />
                    </div>
                </div>
                <div>
                    <p className="ag-intro-statement ag-fill-text" data-ag-fill="#10302a">{intro.statement}</p>
                    <div className="ag-intro-foot" data-ag-fade="">
                        <AgButton href={intro.cta.href} variant="dark">{intro.cta.label}</AgButton>
                        <a href="#businesses" className="ag-link" style={{ color: "var(--ag-forest)" }}>Explore our businesses</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default HomeIntro;
