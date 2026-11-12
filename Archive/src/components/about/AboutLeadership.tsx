import { leadership } from "@/data/site-data";
import { MailIcon, SocialIcon } from "../ui/Icons";

const AboutLeadership = () => (
    <section className="ag-section" id="leadership" style={{ background: "#fff" }}>
        <div className="ag-container">
            <div className="ag-head-row">
                <div>
                    <span className="ag-label" data-ag-fade="">Our Leadership</span>
                    <h2 className="ag-h2" data-ag-split="" style={{ marginTop: 20 }}>
                        The people <em>leading</em> the way
                    </h2>
                </div>
                <p className="ag-lead" data-ag-fade="" style={{ maxWidth: 420 }}>
                    An experienced leadership team and an independent board guiding our strategy and governance.
                </p>
            </div>
            <div className="ag-leaders" data-ag-stagger="">
                {leadership.map((l) => (
                    <div className="ag-leader" key={l.role}>
                        <div className="ag-leader-img">
                            { }
                            <img src={l.img} alt={l.name} />
                            <div className="ag-leader-social">
                                <a href="#" aria-label={`${l.name} on LinkedIn`}><SocialIcon name="linkedin" /></a>
                                <a href="#" aria-label={`Email ${l.name}`}><MailIcon /></a>
                            </div>
                        </div>
                        <h5>{l.name}</h5>
                        <span>{l.role}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default AboutLeadership;
