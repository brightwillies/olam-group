import AgButton from "../ui/AgButton";

const AboutEthics = () => (
    <section className="ag-section" style={{ background: "var(--ag-lime)" }}>
        <div className="ag-container">
            <div className="ag-ethics">
                <div>
                    <span className="ag-label" data-ag-fade="" style={{ color: "var(--ag-forest)" }}>Ethics &amp; Compliance</span>
                    <h2 className="ag-h2" data-ag-split="" style={{ marginTop: 20 }}>
                        Doing business <em>the right way</em>, everywhere we operate
                    </h2>
                </div>
                <div data-ag-fade="">
                    <p className="ag-lead" style={{ color: "var(--ag-forest)", marginBottom: 30 }}>
                        Our Code of Conduct, supplier code and independent grievance process hold us to the highest standards of integrity.
                    </p>
                    <AgButton href="/contact" variant="dark">Speak to Our Team</AgButton>
                </div>
            </div>
        </div>
    </section>
);

export default AboutEthics;
