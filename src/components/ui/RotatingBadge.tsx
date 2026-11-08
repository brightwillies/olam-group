import { ArrowUpRight } from "./Icons";

/** Circular rotating text badge. */
const RotatingBadge = ({ text, href = "#", size = 140, color = "#fff" }: { text: string; href?: string; size?: number; color?: string }) => (
    <a href={href} className="ag-badge" style={{ width: size, height: size, color }} data-ag-magnetic="" aria-label={text}>
        <svg className="ag-badge-text" viewBox="0 0 140 140" aria-hidden="true">
            <defs>
                <path id="agBadgePath" d="M70,70 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0" />
            </defs>
            <text>
                <textPath href="#agBadgePath">{text}</textPath>
            </text>
        </svg>
        <span className="ag-badge-core">
            <ArrowUpRight size={20} />
        </span>
    </a>
);

export default RotatingBadge;
