import { stats } from "@/data/site-data";

const HomeStats = () => (
    <section className="ag-section ag-dark ag-stats">
        <div className="ag-container">
            <div className="ag-stats-head">
                <h2 className="ag-h2" data-ag-split="" style={{ maxWidth: 820 }}>
                    A global network, <em className="ag-lime-text">rooted</em> in every origin
                </h2>
                <p className="ag-lead ag-maxw-560" data-ag-fade="" style={{ maxWidth: 420 }}>
                    We supply over 11,000 customers — from large multinationals to small family businesses — with food, feed and fibre.
                </p>
            </div>
            <div className="ag-stats-grid">
                {stats.map((s) => (
                    <div className="ag-stat" key={s.label} data-ag-fade="">
                        <span className="ag-stat-line" data-ag-line="" />
                        <div className="ag-stat-num">
                            <span data-ag-count={s.value} data-ag-plain={s.plain ? "true" : "false"}>
                                {s.plain ? s.value : s.value.toLocaleString("en-US")}
                            </span>
                            <span className="ag-suffix">{s.suffix}</span>
                        </div>
                        <h6>{s.label}</h6>
                        <p>{s.note}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default HomeStats;
