/* =====================================================================
   SITE CONTENT: edit everything for Home / About / Contact here.
   Items marked "VERIFY" are placeholders to confirm with Olam Group
   before going live (emails, office addresses, leadership, figures).
   Images live in /public/images; replace the files keeping the names.
   ===================================================================== */

export const brand = {
    name: "Olam",
    fullName: "Olam Group",
    /** Official logo (dark text for light backgrounds) and a white-text version for dark backgrounds.
     *  Swap for SVG files when available for sharper rendering. */
    logo: "/images/olam-logo.png",
    logoWhite: "/images/olam-logo-white.png",
    logoMark: "/images/olam-mark.png",
    tagline: "Re-imagining global agriculture and food systems",
    founded: 1989,
    email: "info@olamgroup.com", // VERIFY
    phone: "+65 6339 4100", // VERIFY
    address: ["7 Straits View, Marina One East Tower", "#20-01, Singapore 018936"], // VERIFY
    hours: "Mon – Fri, 9:00am – 6:00pm (SGT)",
    regNo: "Co. Reg. No. 202180000W",
    social: [
        { label: "LinkedIn", icon: "linkedin", href: "#" },
        { label: "X", icon: "x", href: "#" },
        { label: "YouTube", icon: "youtube", href: "#" },
        { label: "Instagram", icon: "instagram", href: "#" },
    ] as const,
};

const IMG = "/images";
export const images = {
    hero1: `${IMG}/hero-1.jpg`,
    hero2: `${IMG}/hero-2.jpg`,
    hero3: `${IMG}/hero-3.jpg`,
    intro: `${IMG}/intro.jpg`,
    business1: `${IMG}/business-1.jpg`,
    business2: `${IMG}/business-2.jpg`,
    business3: `${IMG}/business-3.jpg`,
    feature1: `${IMG}/feature-1.jpg`,
    feature2: `${IMG}/feature-2.jpg`,
    feature3: `${IMG}/feature-3.jpg`,
    news1: `${IMG}/news-1.jpg`,
    news2: `${IMG}/news-2.jpg`,
    news3: `${IMG}/news-3.jpg`,
    news4: `${IMG}/news-4.jpg`,
    aboutHero: `${IMG}/about-hero.jpg`,
    aboutWho: `${IMG}/about-who.jpg`,
    map: `${IMG}/world-map.png`,
};

export const mainNav = [
    { label: "Home", href: "/" },
    {
        label: "About Us",
        href: "/about",
        children: [
            { label: "Our Purpose", href: "/about#purpose" },
            { label: "Our Journey", href: "/about#journey" },
            { label: "Global Footprint", href: "/about#footprint" },
            { label: "Our Leadership", href: "/about#leadership" },
        ],
    },
    // { label: "Our Businesses", href: "/#businesses" },
    // { label: "Sustainability", href: "/#sustainability" },
    // { label: "News", href: "/#news" },
    { label: "Contact", href: "/contact" },
];

/* ------------------------------ HOME ------------------------------ */

export const heroSlides = [
    {
        eyebrow: "Since 1989",
        title: ["Re-imagining", "global agriculture"],
        desc: "We explore, grow, source and process the food ingredients and agricultural commodities the world depends on.",
        cta: { label: "Explore Our Businesses", href: "/#businesses" },
        tab: "Who we are",
        img: images.hero1,
    },
    {
        eyebrow: "Sustainability",
        title: ["Caring for the", "communities we serve"],
        desc: "Working alongside farmers and communities to build livelihoods, protect landscapes and secure the future of food.",
        cta: { label: "Our Commitments", href: "/#sustainability" },
        tab: "Our purpose",
        img: images.hero2,
    },
    {
        eyebrow: "2025 Annual Report",
        title: ["From vision", "to value"],
        desc: "Read the highlights of our year, or download the full annual report.",
        cta: { label: "View Our Reports", href: "/#report" },
        tab: "Annual report",
        img: images.hero3,
    },
];

export const intro = {
    label: "Who we are",
    statement:
        "We are re-imagining global agriculture: working with cocoa farmers in Africa, growing almonds in Australia and developing ingredients in Asia, so our customers can meet rising demand for sustainable sourcing and healthier food.",
    cta: { label: "Find Out More About Us", href: "/about" },
};

export const stats = [
    { value: 1989, suffix: "", label: "Established", note: "More than three decades of growth", plain: true },
    { value: 50, suffix: "+", label: "Countries", note: "Operations across five continents" },
    { value: 11000, suffix: "+", label: "Customers", note: "From large multinationals to small family businesses" },
    { value: 2, suffix: "M+", label: "Farmers", note: "In our global sourcing network" }, // VERIFY
];

export const commodities = ["Cocoa", "Coffee", "Nuts", "Spices", "Dairy", "Grains", "Rice", "Cotton", "Edible Oils", "Animal Feed"];

export const businesses = [
    {
        no: "01",
        title: "ofi",
        sub: "olam food ingredients",
        desc: "Natural, value-added food and beverage ingredients (cocoa, coffee, dairy, nuts and spices) that help customers create healthier, more sustainable products.",
        tags: ["Cocoa", "Coffee", "Dairy", "Nuts", "Spices"],
        img: images.business1,
        href: "/about",
    },
    {
        no: "02",
        title: "Olam Agri",
        sub: "food, feed & fibre",
        desc: "A market-leading food, feed and fibre agri-business connecting producing and consuming nations across grains, edible oils, rice and cotton.",
        tags: ["Grains", "Edible Oils", "Rice", "Cotton"],
        img: images.business2,
        href: "/about",
    },
    {
        no: "03",
        title: "Olam Global Holdings",
        sub: "OGH",
        desc: "Holds the Group's other businesses and assets, and incubates new platforms for the future of food and agriculture.",  // VERIFY description
        tags: ["Holdings", "New ventures"],
        img: images.business3,
        href: "/about",
    },
];

export const features = [
    {
        id: "reorganisation",
        label: "Strategy",
        title: "Re-organising to deliver sharper focus and value",
        desc: "We are separating the Group into focused operating groups (ofi, Olam Agri and OGH), each with its own strategy, capital structure and leadership, to unlock long-term value for shareholders.",
        cta: { label: "Read More", href: "/about" },
        img: images.feature1,
    },
    {
        id: "sustainability",
        label: "Sustainability",
        title: "Caring for the communities that we work with",
        desc: "Sustainability is part of every decision we make, from farmer training and fair pricing to traceable supply chains and protecting the landscapes we source from.",
        cta: { label: "Read More", href: "/about#purpose" },
        img: images.feature2,
    },
    {
        id: "careers",
        label: "Careers",
        title: "A future at Olam: imagine the extraordinary",
        desc: "Join a global team where you get the autonomy to lead early and the opportunity to make a real impact on how the world grows and eats.",
        cta: { label: "Read More", href: "/contact" },
        img: images.feature3,
    },
];

export const report = {
    label: "2025 Annual Report",
    desc: "Read the highlights of our year or download the full annual report.",
    cta: { label: "View Our Reports", href: "#" },
};

export const news = [
    { date: "24 Sep 2026", cat: "Press Release", title: "ofi prices US$300 million Perpetual Hybrid Capital Instrument", img: images.news1 },
    { date: "31 Aug 2026", cat: "Press Release", title: "ofi issues US$100 million 5-year notes via private placement", img: images.news2 },
    { date: "22 Aug 2025", cat: "Governance", title: "Olam Group improves governance ranking with SGTI score of 81.8", img: images.news3 },
    { date: "2023", cat: "Blog", title: "Protecting forests: conservation in the Congo Basin", img: images.news4 },
];

export const subscribeTopics = ["Press Releases", "Financial Results", "Sustainability", "Events"];

/* ------------------------------ ABOUT ----------------------------- */

export const aboutHero = {
    label: "About Us",
    title: ["Rooted in farms,", "growing for the world"],
    desc: "Since 1989 we have connected the people who grow food with the people who make and enjoy it.",
};

export const whoWeAre = {
    label: "Who we are",
    title: "A leading food & agri-business supplying 11,000+ customers worldwide",
    paras: [
        "Olam Group supplies food ingredients, feed and fibre to over 11,000 customers worldwide, from large multinationals to small family businesses. We operate in more than 50 countries.",
        "Our businesses manage supply chains end to end, from the farm to the factory gate. Our network of farmers is the foundation of everything we do.",
    ],
};

export const purposeCards = [
    {
        no: "01",
        label: "Our Purpose",
        title: "Re-imagine global agriculture and food systems",
        desc: "We exist to make agriculture and food systems work better for people and the planet, producing more with less and sharing the value fairly.",
        points: ["Prosperous farmers & food systems", "Thriving communities", "Regenerating the living world"],
        tone: "dark",
    },
    {
        no: "02",
        label: "Our Vision",
        title: "Focused businesses, built to create value",
        desc: "Trusted by customers for the quality, traceability and sustainability of everything we supply, and run with discipline to create long-term value.", // VERIFY wording
        points: ["Customer-centric innovation", "Traceable supply chains", "Disciplined capital allocation"],
        tone: "lime",
    },
    {
        no: "03",
        label: "Our Values",
        title: "The principles that guide every decision",
        desc: "Our values shape how we work with farmers, customers, colleagues and communities wherever we operate.", // VERIFY list
        points: ["Ownership", "Stretch & Ambition", "Partnership", "Integrity", "Mutual Respect"],
        tone: "cream",
    },
];

/** VERIFY dates and wording with the client's corporate history. */
export const timeline = [
    { year: "1989", title: "Humble beginnings", desc: "Founded in Nigeria with a single product and a vision to manage the supply chain end to end." },
    { year: "1995", title: "A global base", desc: "Established our headquarters in Singapore and expanded into new products and origins." },
    { year: "2005", title: "Going public", desc: "Listed on the Singapore Exchange, fuelling investment in processing and farming." },
    { year: "2020", title: "A new structure", desc: "Announced the re-organisation into focused operating groups." },
    { year: "2022", title: "Olam Group", desc: "Olam Group became the parent company of ofi, Olam Agri and OGH." },
    { year: "2026", title: "Vision to value", desc: "Completed the stake sale in Olam Agri to SALIC, unlocking value for shareholders." },
];

/** VERIFY country counts per region. */
export const regions = [
    { name: "Africa", countries: 18, x: 52, y: 63 },
    { name: "Asia", countries: 14, x: 71, y: 45 },
    { name: "Europe", countries: 9, x: 50, y: 30 },
    { name: "Americas", countries: 8, x: 27, y: 52 },
    { name: "Oceania", countries: 3, x: 85, y: 75 },
];

/** VERIFY: replace with the real leadership team and photos. */
export const leadership = [
    { name: "Leader Name", role: "Group Chief Executive Officer", img: `${IMG}/leader-1.jpg` },
    { name: "Leader Name", role: "Group Chief Financial Officer", img: `${IMG}/leader-2.jpg` },
    { name: "Leader Name", role: "Group Chief Operating Officer", img: `${IMG}/leader-3.jpg` },
    { name: "Leader Name", role: "Chief Sustainability Officer", img: `${IMG}/leader-4.jpg` },
];

/* ----------------------------- CONTACT ---------------------------- */

export const contactHero = {
    label: "Contact Us",
    title: ["Let's grow", "something together"],
    desc: "Whether you're a customer, supplier, investor or journalist, our teams around the world are here to help.",
};

/** VERIFY all email addresses. */
export const contactChannels = [
    { icon: "handshake", title: "Business Enquiries", desc: "Products, sourcing & partnerships", email: "business@olamgroup.com" },
    { icon: "news", title: "Media Relations", desc: "Press, interviews & assets", email: "media@olamgroup.com" },
    { icon: "chart", title: "Investor Relations", desc: "Results, reports & shareholders", email: "ir@olamgroup.com" },
    { icon: "user", title: "Careers", desc: "Join our global team", email: "careers@olamgroup.com" },
] as const;

export const enquiryTypes = ["General", "Business", "Media", "Investors", "Careers", "Grievance"];

/** VERIFY: office list and details are placeholders. */
type Office = { city: string; type: string; address: string; phone?: string };
export const offices: Record<string, Office[]> = {
    Asia: [
        { city: "Singapore", type: "Global Headquarters", address: "7 Straits View, Marina One East Tower, #20-01, Singapore 018936", phone: "+65 6339 4100" },
        { city: "India", type: "Regional Office", address: "Address to be confirmed" },
        { city: "Vietnam", type: "Processing", address: "Address to be confirmed" },
    ],
    Africa: [
        { city: "Nigeria", type: "Regional Office", address: "Address to be confirmed" },
        { city: "Côte d'Ivoire", type: "Cocoa Operations", address: "Address to be confirmed" },
        { city: "Ghana", type: "Sourcing", address: "Address to be confirmed" },
    ],
    Europe: [
        { city: "United Kingdom", type: "Office", address: "Address to be confirmed" },
        { city: "Netherlands", type: "Processing", address: "Address to be confirmed" },
    ],
    Americas: [
        { city: "United States", type: "Regional Office", address: "Address to be confirmed" },
        { city: "Brazil", type: "Coffee Operations", address: "Address to be confirmed" },
    ],
    Oceania: [
        { city: "Australia", type: "Almond Orchards", address: "Address to be confirmed" },
    ],
};

export const faqs = [
    { q: "How can I become a supplier?", a: "Send us your company profile and the products you supply through the form above, choosing the 'Business' enquiry type. Our sourcing team will review it and get back to you." },
    { q: "Where can I find financial results and reports?", a: "Annual reports, financial results and investor presentations are published in the Investors section. You can also subscribe to news alerts to receive them as soon as they're released." },
    { q: "How do I raise a grievance about our supply chain?", a: "Choose 'Grievance' as the enquiry type. Grievances are logged, investigated and tracked through to resolution." },
    { q: "Do you offer internships or graduate programmes?", a: "Select 'Careers' in the form or email our careers team to find out about current openings across our operating countries." },
];
