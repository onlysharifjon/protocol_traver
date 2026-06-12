// All site content extracted from the Figma design (Travel_pro / "Protocol")

export const nav = [
  { label: "Tours", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "About", href: "/about" },
  { label: "Documents", href: "/documents" },
  { label: "Contact", href: "#contact" },
];

export const contact = {
  email: "travel@protocoluz.com",
  phone: "+998 71 200 00 00",
  address: "1 Amir Temur Square, Tashkent",
  whatsapp: "998712000000",
};

// --- Home: featured tours (3) ---
export const featuredTours = [
  {
    index: "01",
    tagline: "Timur's Eternal Capital",
    title: "The Imperial Samarkand",
    duration: "5 days",
    price: "from $4,900",
    image: "/images/prev-samarkand.jpg",
  },
  {
    index: "02",
    tagline: "A Living Medieval City",
    title: "The Bukhara Chronicle",
    duration: "4 days",
    price: "from $3,800",
    image: "/images/prev-bukhara.jpg",
  },
  {
    index: "03",
    tagline: "An Open-Air Museum",
    title: "Khiva: The Frozen City",
    duration: "3 days",
    price: "from $3,200",
    image: "/images/prev-khiva.jpg",
  },
];

export const homeFeatures = [
  {
    title: "Private & Personal",
    body: "Every journey is yours alone. No shared groups, no compromises. Your schedule, your interests, your pace — attended by a dedicated guide from arrival to departure.",
  },
  {
    title: "Curated Excellence",
    body: "We partner exclusively with artisan riads, restored caravanserais, and intimate boutique hotels. Every meal, every transfer, every moment is selected to exceed expectation.",
  },
  {
    title: "Local Mastery",
    body: "Our guides are historians, architects, and storytellers born of this land. They open private collections, hidden courtyards, and scholarly conversations unavailable to the public.",
  },
];

export const homeStats = [
  { value: "16", suffix: "", label: "Years of Expertise" },
  { value: "1,240", suffix: "+", label: "Private Tours Completed" },
  { value: "38", suffix: "", label: "Countries Represented" },
  { value: "4.97", suffix: "/ 5", label: "Average Review Score" },
];

export const testimonial = {
  quote:
    "Protocol did not take us to Uzbekistan. They took us inside it. Our guide spent thirty years studying Timurid manuscripts — he read the inscriptions to us in the original, beneath the arches of the Shah-i-Zinda at dawn. Nothing was what we expected. Everything was more.",
  name: "Margaret & David Ashworth",
  place: "London, United Kingdom",
};

// --- Tours page: 6 tours ---
export const tours = [
  {
    category: "Cultural",
    place: "Samarkand",
    duration: "5 days",
    title: "The Imperial Samarkand",
    body: "Enter Timur's capital as it was meant to be experienced — after hours, behind closed gates, guided by a scholar who has spent decades decoding the geometry of its inscriptions.",
    price: "from $4,900",
    image: "/images/tour-samarkand.jpg",
  },
  {
    category: "Cultural",
    place: "Bukhara",
    duration: "4 days",
    title: "The Bukhara Chronicle",
    body: "Wander two millennia of continuous habitation. Bukhara's medieval bazaars, caravanserais, and mausoleums remain living tissue — our guides know every threshold.",
    price: "from $3,800",
    image: "/images/tour-bukhara.jpg",
  },
  {
    category: "Cultural",
    place: "Khiva",
    duration: "3 days",
    title: "Khiva: The Frozen City",
    body: "Ichan Kala is the world's most intact ancient Central Asian city. At night, with the crowds gone and the mud-brick walls lit amber, it belongs entirely to you.",
    price: "from $3,200",
    image: "/images/tour-khiva.jpg",
  },
  {
    category: "Grand Tour",
    place: "Multi-City",
    duration: "12 days",
    title: "Grand Silk Road",
    body: "The definitive private journey: Tashkent, Samarkand, Shahrisabz, Bukhara, and Khiva in one seamless arc — each city revealed in depth, never in haste.",
    price: "from $11,500",
    image: "/images/tour-silkroad.jpg",
  },
  {
    category: "Gastronomy",
    place: "Tashkent",
    duration: "3 days",
    title: "Tashkent & The Bazaars",
    body: "A city of contrasts between Soviet boulevards and ancient bazaars. Private cooking sessions, market mornings with a culinary historian, and dinner with a master ceramicist.",
    price: "from $2,900",
    image: "/images/tour-tashkent.jpg",
  },
  {
    category: "Adventure",
    place: "Multi-City",
    duration: "8 days",
    title: "The Steppe & The Stars",
    body: "Beyond the monuments lies a landscape of extraordinary silence. Yurt camps on the Kyzylkum, rides at dawn, and skies so clear the Milky Way casts shadows.",
    price: "from $7,200",
    image: "/images/tour-steppe.jpg",
  },
];

// --- Destinations page: masonry of 6 ---
export const destinations = [
  {
    name: "Samarkand",
    blurb: "The blue city that made the world hold its breath.",
    tours: "8 tours",
    image: "/images/dest-samarkand.jpg",
    span: "tall", // layout hint
  },
  {
    name: "Bukhara",
    blurb: "Two thousand years of continuous human habitation, still breathing.",
    tours: "5 tours",
    image: "/images/dest-bukhara.jpg",
    span: "short",
  },
  {
    name: "Khiva",
    blurb: "An open-air museum so intact it seems to have outlasted time itself.",
    tours: "4 tours",
    image: "/images/dest-khiva.jpg",
    span: "short",
  },
  {
    name: "Tashkent",
    blurb: "A capital city that wears three centuries in a single afternoon.",
    tours: "6 tours",
    image: "/images/dest-tashkent.jpg",
    span: "tall",
  },
  {
    name: "Fergana Valley",
    blurb: "Where silk was born and the mountains guard ancient craft alive.",
    tours: "3 tours",
    image: "/images/dest-fergana.jpg",
    span: "medium",
  },
  {
    name: "Nurata",
    blurb: "At the desert's edge, a fortress older than the Silk Road itself.",
    tours: "2 tours",
    image: "/images/dest-nurata.jpg",
    span: "medium",
  },
];

// --- About page ---
export const timeline = [
  {
    year: "2008",
    title: "Founded in Tashkent",
    body: "Akbar Rakhimov establishes Protocol Travel Services from a single office on Amir Temur Square, hosting twelve guests in the inaugural season. Every tour is led personally.",
  },
  {
    year: "2011",
    title: "First International Recognition",
    body: "Condé Nast Traveller names Protocol one of Central Asia's most promising boutique operators. The team expands to Samarkand with a permanent cultural liaison and archive scholar.",
  },
  {
    year: "2015",
    title: "Exclusive Partnerships Established",
    body: "Long-term agreements signed with the Samarkand State Museum of Culture and the Bukhara Architectural Heritage Institute, granting private after-hours access to key monuments.",
  },
  {
    year: "2018",
    title: "A Decade on the Road",
    body: "Protocol marks ten years and 800 completed private journeys. The team of eighteen guides spans six cities and four language groups. A dedicated air charter division is launched.",
  },
  {
    year: "2022",
    title: "Expansion to Fergana & Khiva",
    body: "Two new resident specialists join for the Fergana Valley and Khiva circuits. Protocol becomes the only operator offering exclusive yurt-camp nights inside the Kyzylkum reserve.",
  },
  {
    year: "2024",
    title: "Present Day",
    body: "Over 1,240 private tours completed across 38 countries of origin. Protocol remains privately held, deliberately small, and wholly dedicated to depth over volume.",
  },
];

export const team = [
  {
    role: "Founder & Director",
    name: "Akbar Rakhimov",
    bio: "Art historian, fluent in six languages, twenty years on the Silk Road.",
    image: "/images/team-akbar.jpg",
  },
  {
    role: "Head of Guest Experience",
    name: "Nilufar Yusupova",
    bio: "Former senior concierge at Aman resorts. Orchestrates every detail before you arrive.",
    image: "/images/team-nilufar.jpg",
  },
  {
    role: "Lead Cultural Guide, Samarkand",
    name: "James Hartwell",
    bio: "Oxford-trained archaeologist. Fifteen seasons decoding Timurid inscriptions.",
    image: "/images/team-james.jpg",
  },
  {
    role: "Bukhara & Khiva Specialist",
    name: "Madina Karimova",
    bio: "Descendant of a Bukharan merchant family. Her knowledge of the old city is unmatched.",
    image: "/images/team-madina.jpg",
  },
];

export const partners = [
  "Aman Resorts",
  "Orient Express Hotels",
  "Abercrombie & Kent",
  "Condé Nast Traveller",
  "National Geographic Expeditions",
  "IATA Certified",
];

// --- Documents / Licenses page ---
export type DocStatus = "valid" | "expired" | "ongoing";

export const documentGroups = [
  {
    title: "Tour Operator Licenses",
    count: "3 documents",
    intro:
      "State-issued operating licenses authorising Protocol Travel Services to conduct inbound tourism activities within the Republic of Uzbekistan.",
    docs: [
      {
        type: "PDF",
        title: "State Tour Operator License",
        subtitle: "Inbound Tourism — Republic of Uzbekistan",
        issuer: "Ministry of Tourism and Cultural Heritage, Uzbekistan",
        issued: "Issued 12 March 2009",
        status: "Valid until 12 March 2027",
        statusType: "valid" as DocStatus,
      },
      {
        type: "PDF",
        title: "Private Tour Operator Certification",
        subtitle: "Luxury & VIP Services Classification",
        issuer: "Uzbektourism National Company",
        issued: "Issued 8 January 2020",
        status: "Expired 8 January 2026",
        statusType: "expired" as DocStatus,
      },
      {
        type: "DOC",
        title: "Foreign Tourist Services Permit",
        subtitle: "Authorisation for International Client Operations",
        issuer: "State Committee for Tourism Development",
        issued: "Issued 3 June 2022",
        status: "Expired 3 June 2025",
        statusType: "expired" as DocStatus,
      },
    ],
  },
  {
    title: "Quality Certificates",
    count: "3 documents",
    intro:
      "International quality assurance certifications recognising Protocol's commitment to service standards, responsible tourism, and guest safety.",
    docs: [
      {
        type: "CERT",
        title: "ISO 9001:2015 Quality Management",
        subtitle: "Tourism Services — Certified Scope",
        issuer: "Bureau Veritas Certification",
        issued: "Issued 14 September 2021",
        status: "Expired 14 September 2024",
        statusType: "expired" as DocStatus,
      },
      {
        type: "CERT",
        title: "Travelife Gold Certification",
        subtitle: "Sustainability in Tourism — Highest Award",
        issuer: "Travelife Ltd., Amsterdam",
        issued: "Issued 27 April 2023",
        status: "Expired 27 April 2026",
        statusType: "expired" as DocStatus,
      },
      {
        type: "PDF",
        title: "SafeTravels Stamp",
        subtitle: "COVID-19 Health & Safety Protocols Compliant",
        issuer: "World Travel & Tourism Council (WTTC)",
        issued: "Issued 1 October 2021",
        status: "Ongoing membership",
        statusType: "ongoing" as DocStatus,
      },
    ],
  },
  {
    title: "Association Memberships",
    count: "3 documents",
    intro:
      "Active memberships in leading international and regional tourism industry bodies, affirming Protocol's standing within the global travel community.",
    docs: [
      {
        type: "CERT",
        title: "ASTA Active Member",
        subtitle: "American Society of Travel Advisors",
        issuer: "ASTA — Washington D.C., USA",
        issued: "Issued 1 January 2016",
        status: "Ongoing membership",
        statusType: "ongoing" as DocStatus,
      },
      {
        type: "CERT",
        title: "ECTAA Associate Member",
        subtitle: "European Travel Agents' & Tour Operators' Associations",
        issuer: "ECTAA — Brussels, Belgium",
        issued: "Issued 15 March 2018",
        status: "Ongoing membership",
        statusType: "ongoing" as DocStatus,
      },
      {
        type: "CERT",
        title: "UNWTO Affiliate Member",
        subtitle: "United Nations World Tourism Organization",
        issuer: "UNWTO — Madrid, Spain",
        issued: "Issued 22 July 2019",
        status: "Ongoing membership",
        statusType: "ongoing" as DocStatus,
      },
    ],
  },
];

// --- Footer ---
export const footerColumns = [
  {
    title: "Journeys",
    links: ["Private Tours", "Group Departures", "Custom Itineraries", "Day Excursions"],
  },
  {
    title: "Destinations",
    links: ["Samarkand", "Bukhara", "Khiva", "Tashkent", "Fergana Valley"],
  },
  {
    title: "Company",
    links: ["About Protocol", "Our Guides", "Press", "Sustainability"],
  },
  {
    title: "Resources",
    links: ["Documents & Visas", "Travel Advisories", "FAQ", "Terms"],
  },
];
