import Link from "next/link";
import { brand } from "@/data/site-data";
import { LeafMark } from "./Icons";

type Tone = "auto" | "light" | "dark";

/**
 * Site logo (image when brand.logo is set, otherwise a text logo). `tone="light"` = white text (for dark backgrounds), `"dark"` = original colours,
 * `"auto"` renders both and lets CSS pick (used in the header, which changes background on scroll).
 */
const Logo = ({ height = 34, onClick, tone = "dark" }: { height?: number; onClick?: () => void; tone?: Tone }) => {
    const img = (src: string, cls: string) => (
        <img src={src} alt={brand.fullName} className={`ag-logo-img ${cls}`} style={{ height, width: "auto" }} />
    );
    return (
        <Link href="/" className={`ag-logo is-${tone}`} aria-label={`${brand.fullName} home`} onClick={onClick}>
            {brand.logo ? (
                <>
                    {tone !== "dark" && img(brand.logoWhite || brand.logo, "is-white")}
                    {tone !== "light" && img(brand.logo, "is-colour")}
                </>
            ) : (
                <>
                    <LeafMark size={height} />
                    <span>
                        {brand.name}
                        <small>Africa</small>
                    </span>
                </>
            )}
        </Link>
    );
};

export default Logo;
