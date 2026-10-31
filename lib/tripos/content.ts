/**
 * TripOS marketing page — single source of truth for copy and contact.
 *
 * TripOS is in development. Everything here must stay honest about that:
 * capabilities carry a status label, roadmap items use future tense, and
 * there are no metrics, logos, testimonials, prices or dates.
 */
import { WA_NUMBER, PHONE_DISPLAY, TEL_HREF } from "@/lib/tt/content";

export const TRIPOS_PATH = "/tripos";
export const PRIVACY_PATH = "/tripos/privacy";
export const DATA_DELETION_PATH = "/tripos/data-deletion";
export const GT_SITE = "https://www.goldentravels.co/";

// Verified contacts: phone/WhatsApp from lib/tt/content, email from the root
// layout's LocalBusiness JSON-LD. Do not add any other contact detail here.
export const CONTACT = {
  email: "naveeth@goldentravels.co",
  phoneDisplay: PHONE_DISPLAY,
  telHref: TEL_HREF,
  waHref: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "Hi Golden Travels, I'd like to know more about TripOS for my travel business."
  )}`,
  mailHref: `mailto:naveeth@goldentravels.co?subject=${encodeURIComponent("TripOS early access")}`,
};

// Legal pages. Operator and contact are the names the site already uses; the
// founders still have to confirm the legal entity name before Meta App Review.
export const LEGAL = {
  operator: "Golden Travels",
  location: "Bengaluru, Karnataka, India",
  email: CONTACT.email,
  mailHref: `mailto:${CONTACT.email}?subject=${encodeURIComponent("TripOS privacy request")}`,
  updated: "31 October 2026",
};

export const NAV_LINKS = [
  { href: "#product", label: "Product" },
  { href: "#workflows", label: "Workflows" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#about", label: "About" },
] as const;

export const PROBLEMS = [
  {
    icon: "inbox",
    title: "Enquiries everywhere",
    body: "Requests arrive over WhatsApp, calls, email and walk-ins, and are hard to track consistently.",
  },
  {
    icon: "doc",
    title: "Manual quotation work",
    body: "Quotes get rebuilt across documents, spreadsheets and chat threads every time something changes.",
  },
  {
    icon: "bell",
    title: "Follow-ups get missed",
    body: "When customer context is scattered, it is harder to see which conversation needs attention next.",
  },
  {
    icon: "eye",
    title: "Limited visibility",
    body: "Teams struggle to see enquiries, quotations and next steps together in one place.",
  },
] as const;

export const STEPS = [
  { n: "01", title: "Capture", body: "Bring customer conversations and enquiries into an organised workspace." },
  { n: "02", title: "Understand", body: "Keep customer details and conversation context together." },
  { n: "03", title: "Prepare", body: "Create and manage travel quotations through a dedicated quote workflow." },
  { n: "04", title: "Follow up", body: "See conversations, quote status and what needs attention next." },
] as const;

export type StatusTone = "core" | "dev" | "roadmap";

export const CAPABILITIES: {
  icon: string;
  title: string;
  body: string;
  status: string;
  tone: StatusTone;
}[] = [
  {
    icon: "user",
    title: "Customer workspace",
    body: "Keep customer details and relevant business context organised so your team can work with less duplication.",
    status: "Core workflow",
    tone: "core",
  },
  {
    icon: "chat",
    title: "Conversation inbox",
    body: "Work with customer conversations through an inbox designed to make enquiries easier to review and manage.",
    status: "WhatsApp workflow in development",
    tone: "dev",
  },
  {
    icon: "doc",
    title: "Quote management",
    body: "Prepare, review, and manage travel quotations in a dedicated workspace.",
    status: "Core workflow",
    tone: "core",
  },
  {
    icon: "history",
    title: "Quote history",
    body: "Preserve historical records and important changes so your team can maintain context.",
    status: "Built-in workflow capability",
    tone: "core",
  },
  {
    icon: "building",
    title: "Agency-specific workspace",
    body: "Keep work organised around the agency and its users.",
    status: "Platform foundation",
    tone: "core",
  },
  {
    icon: "route",
    title: "Connected travel operations",
    body: "Being designed to connect more of the journey, from enquiry and quotation through booking and operational follow-through.",
    status: "Roadmap",
    tone: "roadmap",
  },
];

export const AUDIENCES = [
  {
    title: "Travel agencies",
    body: "Organise customer enquiries, conversations, and quotations in one workspace.",
  },
  {
    title: "Tour operators",
    body: "Build a more connected process for managing trip enquiries and sales workflows.",
  },
  {
    title: "Independent travel consultants",
    body: "Spend less time switching between tools and more time helping customers plan their journeys.",
  },
] as const;

export const ROADMAP = [
  { title: "Connected booking workflows", body: "Planned: carry a confirmed quote forward into booking steps." },
  { title: "Itinerary planning", body: "Planned: build day-by-day itineraries alongside the quote." },
  { title: "Follow-up assistance", body: "Planned: surface conversations and quotes that are waiting on a reply." },
  { title: "Operational task management", body: "Planned: track the tasks that turn a booking into a delivered trip." },
  { title: "Payment tracking", body: "Planned: record what has been paid and what is outstanding per trip." },
  { title: "Business reporting", body: "Planned: see enquiry and quotation trends across the agency." },
  { title: "AI-assisted workflows", body: "Exploring: help drafting quotes and replies, with a person always reviewing." },
  { title: "Additional integrations", body: "Planned: connect more of the tools agencies already rely on." },
] as const;

export const BUSINESS_TYPES = [
  "Travel agency",
  "Tour operator",
  "Independent travel consultant",
  "Destination management company",
  "Corporate travel",
  "Other",
] as const;

export const CHALLENGES = [
  "Managing customer enquiries",
  "Preparing quotations",
  "Tracking follow-ups",
  "Organising conversations",
  "Coordinating bookings and operations",
  "Other",
] as const;

export const FAQS = [
  {
    q: "What is TripOS?",
    a: "TripOS is a travel agency management platform being developed to connect customer conversations, enquiries, quotations, and other travel business workflows in one workspace.",
  },
  {
    q: "Is TripOS available yet?",
    a: "TripOS is actively being developed. We're sharing the product direction and gathering feedback from travel businesses while the platform evolves.",
  },
  {
    q: "Who is TripOS for?",
    a: "TripOS is initially focused on travel agencies, tour operators, and independent travel consultants looking to organise their customer and sales workflows.",
  },
  {
    q: "Can I connect WhatsApp?",
    a: "WhatsApp integration is part of the TripOS development work. Availability depends on the current product setup and integration status.",
  },
  {
    q: "Can I request early access?",
    a: "Yes. Use the early-access form on this page to tell us about your business and what you would like the product to help you accomplish, or contact Golden Travels directly.",
  },
  {
    q: "How much does TripOS cost?",
    a: "Pricing and availability are still being determined. Contact us to discuss your requirements and follow the product's development.",
  },
] as const;
