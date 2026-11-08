import { news } from "@/data/site-data";
import AgButton from "../ui/AgButton";

const HomeNews = () => (
    <section className="ag-section ag-news" id="news" style={{ paddingTop: 40 }}>
        <div className="ag-container">
            <div className="ag-news-head">
                <div>
                    <span className="ag-label" data-ag-fade="">Newsroom</span>
                    <h2 className="ag-h2" data-ag-split="" style={{ marginTop: 20 }}>Latest <em>news</em></h2>
                </div>
                <div data-ag-fade=""><AgButton href="#" variant="dark">All News</AgButton></div>
            </div>
            <div className="ag-news-grid" data-ag-stagger="">
                {news.map((n) => (
                    <a href="#" className="ag-news-card" key={n.title} data-cursor="Read">
                        <div className="ag-news-img">
                            { }
                            <img src={n.img} alt="" />
                            <span className="ag-news-cat">{n.cat}</span>
                        </div>
                        <div className="ag-news-meta"><span>{n.date}</span><span>3 min read</span></div>
                        <h4>{n.title}</h4>
                    </a>
                ))}
            </div>
        </div>
    </section>
);

export default HomeNews;
