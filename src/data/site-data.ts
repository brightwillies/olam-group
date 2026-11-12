/* =====================================================================
   SITE CONTENT: edit everything for Home / About / Contact here.
   Items marked "VERIFY" are placeholders to confirm with Caraway Africa
   before going live (links, emails, product facts, market availability).
   Images live in /public/images; replace the files keeping the names.
   ===================================================================== */

export const brand = {
    name: "Caraway",
    fullName: "Caraway Africa",
    /** Logo files. Leave empty to use the text logo; when the real logo arrives, set e.g.
     *  logo: "/images/caraway-logo.svg", logoWhite: "/images/caraway-logo-white.svg", logoMark: "/images/caraway-mark.svg" */
    logo: "",
    logoWhite: "",
    logoMark: "",
    tagline: "Good food, rooted in Africa",
    founded: 1989,
    email: "info@caraway.africa", // VERIFY
    phone: "+233 00 000 0000", // VERIFY
    address: ["Accra, Ghana", "Lagos, Nigeria"], // VERIFY
    hours: "Mon – Fri, 8:00am – 5:00pm (GMT)", // VERIFY
    regNo: "",
    social: [
        { label: "LinkedIn", icon: "linkedin", href: "#" },
        { label: "X", icon: "x", href: "#" },
        { label: "YouTube", icon: "youtube", href: "#" },
        { label: "Instagram", icon: "instagram", href: "#" },
    ] as const,
};

/**
 * Country websites. PASTE THE REAL URLS HERE when they're ready.
 * While a url is empty, the navbar link scrolls to that market's section on the homepage
 * and the section button shows "Coming soon".
 */
export const marketSites = {
    ghana: { label: "Ghana", url: "" }, // e.g. "https://gh.caraway.africa"
    nigeria: { label: "Nigeria", url: "" }, // e.g. "https://ng.caraway.africa"
};

const IMG = "/images";
const P = `${IMG}/products`;
export const images = {
    hero1: `${IMG}/hero-1.jpg`,
    intro: `${IMG}/intro.jpg`,
    aboutHero: `${IMG}/about-hero.jpg`,
    aboutWho: `${IMG}/about-who.jpg`,
    map: `${IMG}/world-map.png`,
};

/* ----------------------------- PRODUCTS --------------------------- */

export type ProductCategory = "Biscuits & Snacks" | "Drinks" | "Cooking";
export type Market = "Ghana" | "Nigeria";

export type Product = {
    id: string;
    name: string;
    brand: string;
    category: ProductCategory;
    desc: string;
    img: string;
    markets: Market[]; // VERIFY availability per market
};

/** VERIFY: product names, descriptions and market availability with Caraway. */
export const products: Product[] = [
    { id: "tasty-tom", name: "Tasty Tom Tomato Mix", brand: "Tasty Tom", category: "Cooking", desc: "Rich tomato mix for jollof, stews and sauces.", img: `${P}/tasty-tom.png`, markets: ["Ghana", "Nigeria"] },
    { id: "nutrisnax", name: "NutriSnax Oats Digestive", brand: "NutriSnax", category: "Biscuits & Snacks", desc: "Oat digestive biscuits, high in fibre.", img: `${P}/nutrisnax-oats-digestive.jpg`, markets: ["Ghana", "Nigeria"] },
    { id: "nutri-c", name: "Nutri-C Sweet Mango", brand: "Nutri-C", category: "Drinks", desc: "Instant mango-flavoured drink powder. Just add water.", img: `${P}/nutri-c.jpg`, markets: ["Ghana", "Nigeria"] },
    { id: "perk-choco", name: "Perk! Choco Shortcake", brand: "Perk!", category: "Biscuits & Snacks", desc: "Chocolate shortcake biscuits for every break.", img: `${P}/perk-choco.png`, markets: ["Ghana", "Nigeria"] },
    { id: "nutri-choco", name: "Nutri Choco", brand: "Nutri Choco", category: "Drinks", desc: "Chocolate-flavoured milk drink, ready to enjoy.", img: `${P}/nutri-choco.jpg`, markets: ["Ghana", "Nigeria"] },
    { id: "king-cracker", name: "King Cracker Deluxe", brand: "King Cracker", category: "Biscuits & Snacks", desc: "Light, crunchy crackers for snacking and sharing.", img: `${P}/king-cracker.jpg`, markets: ["Ghana", "Nigeria"] },
];

const byId = (id: string) => products.find((p) => p.id === id)!;

export const mainNav: { label: string; href: string; external?: boolean; market?: keyof typeof marketSites; children?: { label: string; href: string }[] }[] = [
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
    { label: "Products", href: "/#products" },
    { label: "Ghana", href: "/#ghana", market: "ghana" },
    { label: "Nigeria", href: "/#nigeria", market: "nigeria" },
    { label: "Contact", href: "/contact" },
];

/* ------------------------------ HOME ------------------------------ */

/**
 * Hero slides. Slide 1 is a photo slide; slides 2 and 3 replicate the Ghana and Nigeria
 * section designs and take their text, products and flag from `markets` further down.
 */
type PhotoSlide = {
    kind: "photo";
    eyebrow: string;
    title: string[];
    desc: string;
    cta: { label: string; href: string };
    tab: string;
    img: string;
    products: Product[];
};
type MarketSlide = { kind: "market"; market: "ghana" | "nigeria"; tab: string };

export const heroSlides: (PhotoSlide | MarketSlide)[] = [
    {
        kind: "photo",
        eyebrow: "Caraway Africa",
        title: ["Good food,", "rooted in Africa"],
        desc: "Everyday foods and drinks made for the tables of Ghana, Nigeria and beyond.",
        cta: { label: "Explore Our Products", href: "/#products" },
        tab: "Who we are",
        img: images.hero1,
        products: [byId("tasty-tom"), byId("nutri-c"), byId("king-cracker")],
    },
    { kind: "market", market: "ghana", tab: "Ghana" },
    { kind: "market", market: "nigeria", tab: "Nigeria" },
];

export const intro = {
    label: "Who we are",
    statement:
        "Caraway makes everyday food moments matter. From tomato mix for Sunday jollof to biscuits for the school bag, our brands are made for African kitchens and the people who gather around them.",
    cta: { label: "Find Out More About Us", href: "/about" },
};

/** VERIFY: swap in real figures when available. */
export const stats = [
    { value: 2, suffix: "", label: "Markets", note: "Ghana and Nigeria, each with its own local site", plain: false },
    { value: 6, suffix: "+", label: "Everyday brands", note: "Across cooking, snacks and drinks", plain: false },
    { value: 3, suffix: "", label: "Categories", note: "Biscuits & snacks, drinks and cooking", plain: false },
];

export const marqueeItems = ["Tasty Tom", "NutriSnax", "Nutri-C", "Perk!", "Nutri Choco", "King Cracker"];

export const markets = {
    ghana: {
        id: "ghana",
        label: "Nutrifoods Ghana",
        eyebrow: "Made for everyday moments",
        title: ["A little inspiration.", "A lot of flavour."],
        desc: "Our Ghana site is built for home cooks and families: explore our products, find recipes for the dishes you love and see where to buy near you.",
        features: [
            { title: "Products", desc: "Product facts and pack sizes" },
            { title: "Recipes & inspiration", desc: "Ideas for everyday meals" },
            { title: "Our Ghana story", desc: "The people behind our brands" },
            { title: "Where to buy", desc: "Find a store near you" },
        ],
        cta: "Visit Nutrifoods Ghana",
        products: [byId("tasty-tom"), byId("nutri-c"), byId("king-cracker")], // VERIFY Ghana line-up
        flag: ["#ce1126", "#fcd116", "#006b3f"],
    },
    nigeria: {
        id: "nigeria",
        label: "Caraway Nigeria",
        eyebrow: "Good food. Strong partnerships.",
        title: ["A portfolio built", "for every day."],
        desc: "Our Nigeria site brings our full range together for shoppers, retailers and distributors, with recipes, retailer finder and a direct line to our trade team.",
        features: [
            { title: "Products & brands", desc: "Browse by category or need" },
            { title: "Recipes & usage ideas", desc: "Ideas for the table" },
            { title: "Find a retailer", desc: "Stockists across Nigeria" },
            { title: "Trade enquiries", desc: "Become a distributor or retailer" },
        ],
        cta: "Visit Caraway Nigeria",
        products: [byId("nutrisnax"), byId("perk-choco"), byId("nutri-choco")], // VERIFY Nigeria line-up
        flag: ["#008751", "#ffffff", "#008751"],
    },
};

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

/** Where a market link should go: the country website if set, otherwise its homepage section. */
export const marketLink = (m: keyof typeof marketSites) => {
    const url = marketSites[m].url;
    return url ? { href: url, external: true } : { href: `/#${m}`, external: false };
};
