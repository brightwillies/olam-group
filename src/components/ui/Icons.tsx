type P = { size?: number; className?: string };

export const ArrowUpRight = ({ size = 16, className }: P) => (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 12L12 4M12 4H5.5M12 4V10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ArrowRight = ({ size = 16, className }: P) => (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const Caret = ({ size = 10, className }: P) => (
    <svg className={className} width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M2 3.5 5 6.5l3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const Check = ({ size = 18, className }: P) => (
    <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeOpacity=".35" />
        <path d="m6 10.2 2.6 2.6L14 7.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* Wheat / grain ornament used in marquee & accents */
export const Sprig = ({ size = 48, className }: P) => (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
        <path d="M24 46V10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M24 12c0-5 3-9 3-9s3 4 3 9-6 6-6 6 0-1 0-6Z" />
        <path d="M24 12c0-5-3-9-3-9s-3 4-3 9 6 6 6 6 0-1 0-6Z" opacity=".55" />
        <path d="M24 24c4-1 9 1 11 4-4 2-9 1-11-4Z" />
        <path d="M24 24c-4-1-9 1-11 4 4 2 9 1 11-4Z" opacity=".55" />
        <path d="M24 34c4-1 9 1 11 4-4 2-9 1-11-4Z" />
        <path d="M24 34c-4-1-9 1-11 4 4 2 9 1 11-4Z" opacity=".55" />
    </svg>
);

export const LeafMark = ({ size = 34 }: P) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="20" fill="#B4E717" />
        <g className="ag-logo-leaf">
            <path d="M20 31c0-9 3-15 10-19-1 9-4 15-10 19Z" fill="#10302A" />
            <path d="M20 31c0-7-2.5-12-8-15 .5 7 3 12 8 15Z" fill="#10302A" opacity=".6" />
            <path d="M20 31V20" stroke="#10302A" strokeWidth="1.6" strokeLinecap="round" />
        </g>
    </svg>
);

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const SocialIcon = ({ name, size = 16 }: { name: "linkedin" | "x" | "youtube" | "instagram"; size?: number }) => {
    switch (name) {
        case "linkedin":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-1.8 3.44-1.8 3.68 0 4.2 2.2 4.2 5.06v6.24h-4v-5.53c0-1.32-.02-3.02-1.84-3.02-1.85 0-2.13 1.44-2.13 2.92v5.63H9.5v-11Z" />
                </svg>
            );
        case "x":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45Z" />
                </svg>
            );
        case "youtube":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
                </svg>
            );
        default:
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.3" cy="6.7" r=".6" fill="currentColor" />
                </svg>
            );
    }
};

export const MailIcon = ({ size = 16 }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
    </svg>
);

export const ChannelIcon = ({ name, size = 22 }: { name: "handshake" | "news" | "chart" | "user"; size?: number }) => {
    const paths: Record<string, React.ReactNode> = {
        handshake: (
            <>
                <path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" />
                <path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2L15 11l-1.6 1.6a2 2 0 0 1-2.8 0 1 1 0 0 1 0-1.4L13.5 8.4a2.6 2.6 0 0 1 3.4-.2l.4.3a2.6 2.6 0 0 0 1.7.5H21" />
                <path d="M21 4v10h-2M3 4v10h2l5.5 5.5a1.4 1.4 0 0 0 2-2" />
                <path d="M3 5h7.5" />
            </>
        ),
        news: (
            <>
                <path d="M4 20h15a2 2 0 0 0 2-2V5H7v13a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2V9h5" />
                <path d="M11 9h6M11 13h6M11 17h3" />
            </>
        ),
        chart: (
            <>
                <path d="M3 3v18h18" />
                <path d="m7 15 4-4 3 3 6-7" />
            </>
        ),
        user: (
            <>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21a8 8 0 0 1 16 0" />
            </>
        ),
    };
    return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>{paths[name]}</svg>;
};
