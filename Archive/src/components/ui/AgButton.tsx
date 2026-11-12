import Link from "next/link";
import { ArrowUpRight } from "./Icons";

type Props = {
    href?: string;
    children: string;
    variant?: "lime" | "dark" | "light" | "outline";
    type?: "button" | "submit";
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    /** Open href in a new tab (for links to other websites). */
    external?: boolean;
};

/** Pill button with rolling text + rotating arrow (magnetic via data attribute). */
const AgButton = ({ href, children, variant = "lime", type = "button", onClick, className = "", disabled, external }: Props) => {
    const cls = `ag-btn ${variant !== "lime" ? `is-${variant}` : ""} ${className}`;
    const inner = (
        <>
            <span className="ag-btn-text">
                <span>{children}</span>
                <span aria-hidden="true">{children}</span>
            </span>
            <span className="ag-btn-icon">
                <ArrowUpRight />
            </span>
        </>
    );
    if (href && external) {
        return (
            <a href={href} className={cls} target="_blank" rel="noopener noreferrer" data-ag-magnetic="">
                {inner}
            </a>
        );
    }
    if (href) {
        return (
            <Link href={href} className={cls} data-ag-magnetic="">
                {inner}
            </Link>
        );
    }
    return (
        <button type={type} className={cls} onClick={onClick} disabled={disabled} data-ag-magnetic="">
            {inner}
        </button>
    );
};

export default AgButton;
