import { images, stats, whoWeAre } from "@/data/site-data";

const AboutWho = () => (
    <section className="ag-section">
        <div className="ag-container">
            <div className="ag-who">
                <div>
                    <span className="ag-label" data-ag-fade="">{whoWeAre.label}</span>
                    <h2 data-ag-split="">{whoWeAre.title}</h2>
                    <div className="ag-region-list" style={{ gridTemplateColumns: "repeat(2, 1fr)" }} data-ag-stagger="">
                        {stats.slice(1).map((s) => (
                            <div key={s.label} style={{ paddingBottom: 20 }}>
                                <b><span data-ag-count={s.value}>{s.value.toLocaleString("en-US")}</span>{s.suffix}</b>
                                <span>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="ag-who-paras">
                        {whoWeAre.paras.map((p, i) => <p className="ag-lead" key={i} data-ag-fade="" data-ag-delay={String(i * 0.1)}>{p}</p>)}
                    </div>
                    <div className="ag-who-img" data-ag-clip="" data-ag-parallax="8">
                        { }
                        <img src={images.aboutWho} alt="Farmer standing in a field of flowers" />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default AboutWho;
