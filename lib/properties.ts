export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: "House" | "Condo" | "Townhouse" | "Penthouse";
  image: string;
  description: string;
  aiValuation: number;
  capRate: string;
  walkScore: number;
  features: string[];
}

export function formatINR(value: number): string {
  if (value >= 10000000) {
    const crValue = value / 10000000;
    return `₹${crValue.toFixed(2).replace(/\.00$/, '')} Cr`;
  } else if (value >= 100000) {
    const lakhValue = value / 100000;
    return `₹${lakhValue.toFixed(2).replace(/\.00$/, '')} Lakh`;
  }
  return `₹${value.toLocaleString('en-IN')}`;
}

export function formatINRFull(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`;
}

export const PROPERTIES: Property[] = [
  {
    id: "prop-1",
    title: "DLF Kings Court Premium Villa",
    address: "Greater Kailash 2, New Delhi, Delhi",
    price: 185000000,
    bedrooms: 4,
    bathrooms: 4.5,
    sqft: 5200,
    type: "House",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000",
    description: "An ultra-luxury modern villa in South Delhi's most prestigious gated community. Features fully home-automated systems, imported marble flooring, a private elevator, and modular chef's kitchen with a landscaped terrace garden.",
    aiValuation: 191000000,
    capRate: "4.2%",
    walkScore: 92,
    features: ["Fully Automated", "Gated Security", "Private Elevator", "EV Charger", "Terrace Garden"]
  },
  {
    id: "prop-2",
    title: "Lodha Altamount Skyline Penthouse",
    address: "Altamount Road, South Mumbai, Maharashtra",
    price: 245000000,
    bedrooms: 3,
    bathrooms: 4,
    sqft: 3400,
    type: "Penthouse",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000",
    description: "Breathtaking 360-degree views of the Arabian Sea and Mumbai skyline from Billionaires' Row. Complete with private butler service, bespoke high ceilings, concierge, and a luxury sky lounge access.",
    aiValuation: 238000000,
    capRate: "3.8%",
    walkScore: 97,
    features: ["Arabian Sea View", "Private Butler", "Sky Deck", "Bespoke Interiors", "Gym & Spa Access"]
  },
  {
    id: "prop-3",
    title: "Prestige Golfshire Villa",
    address: "Devanahalli, Bengaluru, Karnataka",
    price: 78900000,
    bedrooms: 5,
    bathrooms: 5,
    sqft: 5800,
    type: "House",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1000",
    description: "A gorgeous golf-facing ultra-luxury villa situated at the foothills of Nandi Hills. Boasts a massive personal lawn, private plunge pool, and access to an 18-hole championship golf course.",
    aiValuation: 80500000,
    capRate: "4.5%",
    walkScore: 78,
    features: ["Golf Course View", "Plunge Pool", "Massive Lawn", "Nandi Hills Backdrop", "Clubhouse Access"]
  },
  {
    id: "prop-4",
    title: "L&T Emerald Isle Powai Loft",
    address: "Powai Lake Road, Powai, Mumbai, Maharashtra",
    price: 31500000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1250,
    type: "Condo",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000",
    description: "Chic modern apartment overlooking Powai Lake. Designed for corporate professionals, featuring premium modular fitting, world-class amenities, and strategic connectivity to major business hubs.",
    aiValuation: 32500000,
    capRate: "5.1%",
    walkScore: 95,
    features: ["Lake View", "Modular Kitchen", "Centralized AC", "Skywalk Access", "Intercom Facility"]
  },
  {
    id: "prop-5",
    title: "Sobha Dream Acres Premium Row House",
    address: "Panathur-Varthur Road, East Bengaluru, Karnataka",
    price: 11500000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    type: "Townhouse",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    description: "Elegant row-house style townhouse in a premier self-contained township. Perfect for IT professionals working in Outer Ring Road (ORR) and Whitefield.",
    aiValuation: 11900000,
    capRate: "5.5%",
    walkScore: 89,
    features: ["IT Corridor Proximity", "Pre-cast Construction", "24/7 Power Backup", "Sports Complex", "Kids Play Area"]
  },
  {
    id: "prop-6",
    title: "Brigade Gateway Luxury Suite",
    address: "Malleswaram-Rajajinagar, Bengaluru, Karnataka",
    price: 26500000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1800,
    type: "Condo",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=10000",
    description: "Premium high-rise apartment inside the world-class Brigade Gateway enclave. Steps away from the World Trade Center, Orion Mall, and Columbia Asia Hospital.",
    aiValuation: 27500000,
    capRate: "4.8%",
    walkScore: 99,
    features: ["Integrated Township", "WTC Proximity", "Lake View Park", "Metro Connectivity", "Clubhouse Enclave"]
  }
];

export const AI_COPILOT_QA = [
  {
    q: "What is the market outlook for Mumbai & Delhi in 2026?",
    a: "Indian tier-1 metro areas are experiencing robust capital appreciation, particularly premium micro-markets like South Mumbai and South Delhi. Luxury residential demand remains extremely strong, with price growth projected at 6.5% - 8.0% annually, supported by massive infrastructure developments."
  },
  {
    q: "How does the AI Valuation compare to listing prices?",
    a: "Our AI Copilot cross-references historical registry transaction data, circle rates, localized neighborhood premium scores, and near-term infrastructure impacts. A listing price lower than our AI Valuation represents a high-potential deal with room for price negotiation."
  },
  {
    q: "What home loan interest rates are expected in India?",
    a: "Currently, Indian home loan interest rates for major public and private banks (such as SBI, HDFC, and ICICI) are hovering between 8.4% and 9.1% per annum. Refinancing options are expected to become highly favorable later this fiscal year."
  }
];
