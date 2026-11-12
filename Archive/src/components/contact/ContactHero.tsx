import { contactChannels, contactHero } from "@/data/site-data";
import PageHero from "../ui/PageHero";
import { ChannelIcon } from "../ui/Icons";

const ContactHero = () => (
    <>
        <PageHero label={contactHero.label} title={contactHero.title} desc={contactHero.desc} badge="Get in touch • We reply in 24h • " badgeHref="#enquiry" />
        <section className="ag-darker" style={{ paddingBottom: 100 }}>
            <div className="ag-container">
                <div className="ag-channels" data-ag-stagger="">
                    {contactChannels.map((c) => (
                        <a className="ag-channel" key={c.title} href={`mailto:${c.email}`}>
                            <div className="ag-channel-icon"><ChannelIcon name={c.icon} /></div>
                            <h5>{c.title}</h5>
                            <p>{c.desc}</p>
                            <span>{c.email}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    </>
);

export default ContactHero;
