import { features } from "@/data/site-data";
import AgButton from "../ui/AgButton";

const HomeFeatures = () => (
    <section className="ag-section" id="sustainability" style={{ background: "#fff" }}>
        <div className="ag-container">
            {features.map((f, i) => (
                <div className={`ag-feature ${i % 2 ? "is-reverse" : ""}`} key={f.id} id={f.id === "sustainability" ? undefined : f.id}>
                    <div className="ag-feature-media" data-ag-clip="" data-ag-parallax="8">
                        { }
                        <img src={f.img} alt={f.title} />
                        <span className="ag-feature-tag">{f.label}</span>
                    </div>
                    <div>
                        <span className="ag-feature-no" data-ag-fade="">0{i + 1} — 0{features.length}</span>
                        <span className="ag-label" data-ag-fade="">{f.label}</span>
                        <h3 data-ag-split="">{f.title}</h3>
                        <p className="ag-lead" data-ag-fade="">{f.desc}</p>
                        <div data-ag-fade="">
                            <AgButton href={f.cta.href} variant={i === 1 ? "lime" : "dark"}>{f.cta.label}</AgButton>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default HomeFeatures;
