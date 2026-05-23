/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ComponentNode {
  name: string;
  description: string;
  props: string[];
  purpose: string;
}

export interface SitemapPage {
  name: string;
  route: string;
  purpose: string;
  components: ComponentNode[];
}

export interface WebSection {
  title: string;
  copywritingHook: string;
  visualObjective: string;
  tailwindClasses: string[];
  conversionTrigger: string;
  details: string;
}

export const SITEMAP_DATA: SitemapPage[] = [
  {
    name: "Homepage (Index Portal)",
    route: "/",
    purpose: "Instantly establish credentials as the region's premier branding power-house; capture high-intent leads using immersive visuals.",
    components: [
      {
        name: "NavbarHeader",
        description: "Sticky glassmorphic global navigation bar.",
        props: ["activeTab", "onTabChange"],
        purpose: "Quick access to services, design logs, showroom status, contact, and core estimator panel."
      },
      {
        name: "MainHeroShowcase",
        description: "Ultra-wide, cinematic brand banner containing the glowing golden-orange Destiny Creative logo ring.",
        props: ["openEstimator"],
        purpose: "Anchor the visual tone (Infinix-inspired) and drive quick quote click-throughs."
      },
      {
        name: "FlagshipHighlight",
        description: "Split bento-grid spotlight section on 3D LED Backlit & 2D Professional signage.",
        props: ["onSelectService"],
        purpose: "Elevate the premium flagship product line with interactive dynamic speck grids."
      },
      {
        name: "ServicesMatrix",
        description: "Interactive category carousel highlighting other services like custom apparel embroidery, warning signs, keytags.",
        props: ["activeCategory"],
        purpose: "Promote cross-selling across the business's diverse print portfolio without causing visual clutter."
      },
      {
        name: "LocationShowroom",
        description: "Local showroom coordinates grid with interactive navigation assistance.",
        props: ["coordinates", "phoneContacts"],
        purpose: "Local Nyahururu foot-traffic conversion. Provides directions to Pondo Park Building near Galana Petrol."
      },
      {
        name: "InstantEstimatorPane",
        description: "The interactive signage configurator and quote builder.",
        props: ["onSubmitQuote", "onTriggerNotification"],
        purpose: "Allow clients to self-estimate, lower transaction friction, and collect high-value leads with vector specifications."
      }
    ]
  },
  {
    name: "Services Details",
    route: "/services",
    purpose: "Detailed technical breakdowns of signage, window filming, keytags, warnings, apparel screen printing.",
    components: [
      {
        name: "ServiceDetailsGrid",
        description: "Tech spec matrix highlighting design constraints, material widths, outdoor weather-durability ratings.",
        props: ["selectedService"],
        purpose: "Educate professional procurement agents, real-estate managers, and small business owners on available prints."
      },
      {
        name: "MaterialGlossary",
        description: "Accordion-driven specifications chart outlining Acrylic, Alucobond, Stainless Steel, and Brass differences.",
        props: ["materialsInfo"],
        purpose: "Build trust by highlighting premium architectural-grade raw material standards."
      }
    ]
  },
  {
    name: "Interactive Cost Estimator",
    route: "/estimator",
    purpose: "Self-service calculation playground allowing structural choice, backlighting, logo upload, and live estimates.",
    components: [
      {
        name: "EstimatorPlayground",
        description: "Three-column structural workspace panel with immediate math estimations.",
        props: ["clientData", "onEstimateUpdate"],
        purpose: "Drive users to configure custom parameters (dimensions, LED, frontlighting, backlighting) in a gamified environment."
      },
      {
        name: "UploadArea",
        description: "Drag-and-drop area matching user logo uploads and performing canvas boundaries sizing.",
        props: ["onFileAccept", "dragActive"],
        purpose: "Gather branding assets on the spot to fast-track digital proofs."
      }
    ]
  },
  {
    name: "Contact & Showroom GPS Portal",
    route: "/contact",
    purpose: "Double conversion page with simple quick dial, dynamic Whatsapp preloads, and local GPS maps.",
    components: [
      {
        name: "LocationMapCard",
        description: "High-contrast visual maps card with direction checkpoints.",
        props: ["contacts"],
        purpose: "Reinforce physical presence next to New Galana Petrol Station, Nyahururu."
      },
      {
        name: "ExpressForm",
        description: "Simple, high-response validation request form.",
        props: ["onSubmit"],
        purpose: "Support immediate call-backs and email routing queue."
      }
    ]
  }
];

export const HOMEPAGE_SECTIONS: WebSection[] = [
  {
    title: "1. Cinematic Brand Header & Sticky Glassmorphic Nav",
    copywritingHook: "Logo: 'Destiny Creative' (3D Metallic orange/gold wireframe ring in constant orbital movement).",
    visualObjective: "Transmit immediate premium quality. The logo is not a flat image but feels sculptural. Glassmorphism navigation creates depth as it scrolls over background image glows.",
    tailwindClasses: ["fixed", "top-0", "w-full", "z-50", "backdrop-blur-md", "bg-neutral-950/70", "border-b", "border-neutral-800/60", "transition-all"],
    conversionTrigger: "Direct Call-to-action button: 'Quick Quote' (Vibrant Orange `#f97316`) glowing on dark background.",
    details: "The navigation items use active state indicator rings, responding to mouse hover with subtle vertical scaling offsets."
  },
  {
    title: "2. Edge-to-Edge Hero Banner ('Spotlight Elevation')",
    copywritingHook: "Headline: 'ELEVATE YOUR BRAND VISIBILITY WITH OUR PRINTS.' Subheading: 'Architectural-grade 3D & 2D Signage, Custom Corporate Apparel, and Masterful Exterior Branding tailored in Nyahururu.'",
    visualObjective: "Render the flagship product in context. Emulates high-end consumer technology sites (e.g., Infinix homepage) with immersive scale, low-key background grids, and gold ambient glows.",
    tailwindClasses: ["relative", "h-[85vh]", "flex", "items-center", "overflow-hidden", "bg-neutral-950"],
    conversionTrigger: "'Design My Signage' primary button in Vibrant Orange and 'Browse Services' secondary button in Gold border.",
    details: "Incorporates the custom generated 'destiny_hero_banner' displaying premium spatial 3D acrylic signage on a concrete texturized facade, with ambient gold backlights."
  },
  {
    title: "3. Flagship Signage Spotlight Bento Grid",
    copywritingHook: "Heading: '3D & 2D Signage: The Ultimate Standard of Presence.' Subhead: 'Our signature signage combines rust-proof structural polymers, light-diffusion acrylic, and long-life architectural LEDs.'",
    visualObjective: "Present technical precision and luxurious aesthetics. Interactive specifications cards display raw materials like acrylic, steel, brass, and alucobond on hover.",
    tailwindClasses: ["grid", "grid-cols-1", "md:grid-cols-12", "gap-6", "py-24", "bg-neutral-950", "px-6", "max-w-7xl", "mx-auto"],
    conversionTrigger: "'Configure 3D Letter' link pointing straight into the interactive cost engine.",
    details: "Utilizes clean 4:3 showcase thumbnails of acrylic backlit signs, paired with real physical specifications: wind resistance, luminous flux, acrylic core thickness."
  },
  {
    title: "4. Unified Custom Branding Grid (Bento Carousel)",
    copywritingHook: "Heading: 'Comprehensive Branding: Head-to-Toe Cohesion.' Subhead: 'T-Shirts, Hoodies, Caps, Window Films, Warn-signs, Banners, and Door Tags. Seamless identity from your store facade to customer merchandise.'",
    visualObjective: "Clean, high-fidelity visual cards showing apparel, film, warning signs, keytags under a uniform, luxury presentation style.",
    tailwindClasses: ["grid", "grid-cols-2", "md:grid-cols-4", "gap-4", "px-6", "pb-24", "bg-neutral-950", "max-w-7xl", "mx-auto"],
    conversionTrigger: "Quick inquiry WhatsApp trigger preset with service name (e.g. 'Hi, I need a quote for branded hoodies...').",
    details: "Features flat-lay images of black hoodies, caps, and t-shirts featuring the golden ring icon, printed cleanly with high precision."
  },
  {
    title: "5. Contextual Map & Local Showroom Portal",
    copywritingHook: "Heading: 'Meet Us in Nyahururu.' Anchor Coordinates: 'Pondo Park Building, Next to New Galana Petrol Station, Nyahururu. Open Mon-Sat 8:00 AM - 6:00 PM.'",
    visualObjective: "Remove proximity anxiety. Build trust by pinpointing Nyahururu's physical storefront with precise street hallmarks.",
    tailwindClasses: ["relative", "py-20", "bg-neutral-950", "border-t", "border-neutral-900", "px-6"],
    conversionTrigger: "'Get GPS Directions' link and direct dial action triggers (0723408672 | 0721691511).",
    details: "Incorporates detailed driving directions, prominent landmarks (Galana Petrol Station, Pondo Park Building), and direct high-impact mobile buttons."
  }
];

export const SEO_METADATA_STRATEGY = {
  metaTitle: "Destiny Branding Solutions | Premium Signage & Branding Nyahururu",
  metaDescription: "Elevate your brand with Nyahururu's premier prints. Custom 3D & 2D signage, screenprinted hoodies, custom t-shirts, caps, window film installation, warning signs, and banners. Located at Pondo Park Building near New Galana Petrol station, Nyahururu. Contact 0723408672.",
  keywords: [
    "3D signage Nyahururu",
    "2D signage Kenya",
    "Destiny Creative Nyahururu",
    "Sign board makers in Nyahururu",
    "Branded t-shirts Nyahururu",
    "Hoodie screen printing Nyahururu",
    "Window films installation Nyahururu",
    "Pondo Park Building signage",
    "New Galana Petrol station branding",
    "Branding companies Nyahururu",
    "Cap printing Kenya",
    "Warning signs printing Nyahururu"
  ],
  structuredDataLocalBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Destiny Branding Solutions",
    "image": "/src/assets/images/destiny_hero_banner_png_1779539328980.png",
    "@id": "https://destinybrandingsolutions.co.ke/#localbusiness",
    "url": "https://destinybrandingsolutions.co.ke",
    "telephone": "+254723408672",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pondo Park Building, next to New Galana Petrol station",
      "addressLocality": "Nyahururu",
      "addressRegion": "Laikipia",
      "postalCode": "20300",
      "addressCountry": "KE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-0.04167",
      "longitude": "36.36667"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://facebook.com/destinybrandingsolutions",
      "https://instagram.com/destiny_creative_nyahururu"
    ]
  },
  performanceOptimization: [
    {
      metric: "Largest Contentful Paint (LCP)",
      technique: "Preload destiny_hero_banner in WebP, inline critical CSS, optimize images using next/image equivalents on modern edge builds."
    },
    {
      metric: "Cumulative Layout Shift (CLS)",
      technique: "Set strict size aspects on image previews, lazy load secondary structural grids, reserve aspect space for client logo imports."
    },
    {
      metric: "First Input Delay (FID) / Interaction to Next Paint (INP)",
      technique: "Lightweight modular hooks, lazy render estimation canvas, keep component bundles isolated without excessive dependencies."
    }
  ]
};

export const API_ROUTE_SCHEMAS = [
  {
    path: "/api/quote",
    method: "POST",
    description: "Accepts client layout configurations, dimensions, material selections, and dynamic estimated costs. Emits automatic notification queues.",
    security: "Rate-limited (Max 5 requests/min per IP), file size validations restricted to 5MB WebP/PNG formats.",
    samplePayload: `{
  "width": 48,
  "height": 24,
  "lettersCount": 14,
  "text": "DESTINY TECH",
  "materials": "stainless_steel",
  "lighting": "led_backlit",
  "backing": "clear_acrylic",
  "signType": "3d_channel",
  "clientName": "Kevin Kariuki",
  "clientEmail": "kevin@example.com",
  "clientPhone": "0723408672",
  "notes": " backlit glowing orange, metallic ring logo layout is attached"
}`,
    sampleResponse: `{
  "success": true,
  "quoteId": "DST-2026-6419",
  "message": "Quote request compiled and placed in Nyahururu showroom queue.",
  "estimatedPrimaryCost": 48500,
  "currency": "KES",
  "smsSent": true
}`
  },
  {
    path: "/api/contact",
    method: "POST",
    description: "Handles contact inquiries from standard site forms, dispatching immediate call alert notifications to team WhatsApp lines.",
    security: "reCAPTCHA protection, sanitization of input parameters to prevent HTML injection.",
    samplePayload: `{
  "name": "Rose Maina",
  "email": "rose@galanadistribution.co.ke",
  "phone": "0721691511",
  "subject": "Window Film Installation Price per SqM",
  "message": "Hi, we need corporate branding film applied on 6 main windows at Nyahururu business store."
}`,
    sampleResponse: `{
  "success": true,
  "referenceId": "MSG-9801",
  "message": "Express dispatch completed. Admin notified of interest in Window Film."
}`
  }
];

export const CONVERSION_FUNNEL_STEPS = [
  {
    stage: "1. Land & Contextualize (0-5s)",
    description: "Visitor arrives from Google search for '3D signage Nyahururu' or local references. High-contrast Infinix-inspired dark theme instantly signals clean design capability. The 3D rotating orange/gold Destiny ring captures optical attention."
  },
  {
    stage: "2. Visual Validation (5-15s)",
    description: "User scrolls downstream; high-definition closeups of spatial lighting showcase quality craftsmanship. Interactive specs explain materials (rustproofing, LEDs, clear backplates), proving expertise."
  },
  {
    stage: "3. Frictionless Estimation (15-45s)",
    description: "Instead of a generic inquiry form, the client clicks 'Estimate Signage Cost'. They play with materials, LED configurations, input their company text, and watch a dynamic 3D-styled preview update in real-time."
  },
  {
    stage: "4. Asset Upload & Secure Contact (45-90s)",
    description: "The user is prompted to drag and drop their branding logo. Sizing estimation adjusts. They input their email/phone and hit 'Submit Custom Quote'."
  },
  {
    stage: "5. Multi-Channel Conversion Queue (Post-Submit)",
    description: "The UI instantly logs a successful mock request, providing a transparent quotation summary with explicit CTA buttons to directly call the showroom engineers on 0723408672 or text on Whatsapp for immediate 1-on-1 dispatch."
  }
];
