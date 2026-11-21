/**
 * Single source of truth for every public fact on the page.
 * Everything here comes from the approved brief (section 2). Do not add claims.
 */

export const IMG = "/images/dubai-nye";

export const brand = {
  name: "Golden Holidays",
  parent: "Golden Travels",
  since: "Trusted since 1987",
  city: "Bengaluru",
  phoneDisplay: "+91 99029 33877",
  phoneHref: "tel:+919902933877",
  whatsappHref:
    "https://wa.me/919902933877?text=" +
    encodeURIComponent(
      "Hi Golden Holidays, I'd like to know more about the New Year's Eve in Dubai package (28 Dec 2026 to 2 Jan 2027)."
    ),
  address: "Golden House, No.1697/36, Dr Rajkumar Rd, Prakash Nagar, Rajajinagar, Bengaluru 560021",
  website: "goldentravels.co",
  pageUrl: "https://www.goldentravels.co/dubai-new-year",
};

export const trip = {
  name: "New Year's Eve in Dubai",
  duration: "5 Nights / 6 Days",
  dates: "28 Dec 2026 – 2 Jan 2027",
  datesLong: "28 December 2026 to 2 January 2027",
  departs: "Departs Bengaluru",
  flights: "Return non-stop flights from Bengaluru",
  price: "₹1,10,000",
  priceNumber: 110000,
  priceSuffix: "per person + GST",
  deadlineLabel: "Bookings close 1 December 2026",
  deadlineISO: "2026-12-01T23:59:00+05:30",
  finePrint:
    "Visa, insurance and personal expenses are extra. GST and TCS as applicable. Full terms are shared with your quote.",
};

export const hotel = {
  name: "Excelsior Hotel Deira",
  location: "In Deira, the historic heart of Dubai by Dubai Creek",
  stay: "5 nights with daily breakfast",
  features: [
    "Private double room per couple",
    "Rooftop pool and sun deck with skyline views",
    "Sitting area and work desk",
    "Tea and coffee maker",
    "Marble bathroom with walk-in shower",
    "Private airport transfers to the hotel",
  ],
  photos: [
    { src: `${IMG}/hotel-pool.webp`, alt: "Rooftop pool and sun deck at Excelsior Hotel Deira at dusk, with the Dubai skyline beyond", w: 2134, h: 1446, label: "Rooftop pool" },
    { src: `${IMG}/hotel-room.webp`, alt: "Guest room at Excelsior Hotel Deira with a double bed, armchairs and work desk", w: 1486, h: 986, label: "Your room" },
    { src: `${IMG}/hotel-sitting.webp`, alt: "Sitting area with armchair, side table and writing desk with tea and coffee tray", w: 1754, h: 986, label: "Sitting area" },
    { src: `${IMG}/hotel-bath.webp`, alt: "Black marble bathroom with gilded mirror and glass walk-in shower", w: 2146, h: 1220, label: "Marble bathroom" },
  ],
};

export type Highlight = {
  n: string;
  title: string;
  line: string;
  img: string;
  alt: string;
  hero?: boolean;
};

export const highlights: Highlight[] = [
  {
    n: "01",
    title: "New Year's Eve fireworks cruise",
    line: "A premium Dubai Canal cruise on 31 December: five-star buffet dinner, live entertainment, the Burj Khalifa fireworks and a midnight toast.",
    img: `${IMG}/cruise.webp`,
    alt: "Glass-walled dinner cruise on a Dubai canal at night as golden fireworks burst over the skyline",
    hero: true,
  },
  {
    n: "02",
    title: "At The Top, Burj Khalifa",
    line: "Level 124 of the world's tallest building, plus time at The Dubai Mall.",
    img: `${IMG}/burj-top.webp`,
    alt: "A couple looking out over Downtown Dubai from a glass observation deck high above the city",
  },
  {
    n: "03",
    title: "Atlantis Aquaventure & Lost Chambers",
    line: "A full day of record-breaking slides and pools, then the Lost Chambers Aquarium.",
    img: `${IMG}/aquaventure.webp`,
    alt: "Waterslide towers, turquoise pools and a lazy river at a resort water park on a sunny day",
  },
  {
    n: "04",
    title: "Desert safari",
    line: "4x4 dune bashing, a sunset stop, a camel ride, henna and a BBQ dinner at camp.",
    img: `${IMG}/safari.webp`,
    alt: "A 4x4 carving through a red sand dune, throwing up a spray of sand",
  },
  {
    n: "05",
    title: "Miracle Garden & Global Village",
    line: "Begin 2027 among millions of flowers, then an evening of world pavilions and street food.",
    img: `${IMG}/miracle-garden.webp`,
    alt: "Heart-shaped flower tunnels and giant floral sculptures at a desert garden",
  },
  {
    n: "06",
    title: "Dubai Frame & city tour",
    line: "Jumeirah, Burj Al Arab, the Palm, Dubai Marina, Al Fahidi, Dubai Creek and the Gold and Spice Souks.",
    img: `${IMG}/dubai-frame.webp`,
    alt: "A giant golden picture-frame landmark framing the Dubai skyline at sunset",
  },
];

export type Day = {
  day: number;
  date: string;
  title: string;
  img: string;
  alt: string;
  peak?: boolean;
  items: (string | { lead: string; sub: string[] })[];
};

export const itinerary: Day[] = [
  {
    day: 1,
    date: "Mon 28 Dec",
    title: "Welcome to Dubai",
    img: `${IMG}/skyline.webp`,
    alt: "Downtown Dubai and the Burj Khalifa at dusk",
    items: [
      "Morning non-stop flight from Bengaluru.",
      "Meet on arrival, then a private air-conditioned transfer to Excelsior Hotel Deira. Check in and freshen up.",
      {
        lead: "Dubai city tour:",
        sub: [
          "Jumeirah Beach, with photo stops at the Burj Al Arab and Atlantis, The Palm.",
          "Dubai Marina and a drive along Sheikh Zayed Road.",
          "Downtown Dubai, with views of the Burj Khalifa.",
          "Al Fahidi Historical District, Dubai Creek, and the Gold and Spice Souks.",
        ],
      },
      "Dubai Frame, entry included: old Dubai on one side, new Dubai on the other.",
      "Overnight in Dubai.",
    ],
  },
  {
    day: 2,
    date: "Tue 29 Dec",
    title: "Atlantis Aquaventure and the Lost Chambers",
    img: `${IMG}/lost-chambers.webp`,
    alt: "A family looking up at manta rays and fish in an underwater aquarium tunnel",
    items: [
      "Breakfast at the hotel.",
      "A full day at Atlantis Aquaventure Waterpark on the Palm: record-breaking slides, rides, pools and the lazy river.",
      "The Lost Chambers Aquarium: underwater tunnels and thousands of marine animals in Atlantis-themed halls.",
      "Transfer back to the hotel. Overnight in Dubai.",
    ],
  },
  {
    day: 3,
    date: "Wed 30 Dec",
    title: "Burj Khalifa and Desert Safari",
    img: `${IMG}/desert-camp.webp`,
    alt: "Lantern-lit desert camp with low cushions, camels resting on the dunes and a glowing grill",
    items: [
      "Breakfast at the hotel.",
      "Free time at The Dubai Mall, one of the world's largest shopping and entertainment destinations.",
      "At The Top, Burj Khalifa, Level 124: the city from the world's tallest building.",
      {
        lead: "Evening 4x4 desert safari:",
        sub: [
          "Dune bashing and a sunset photo stop in the red dunes.",
          "Camel ride, sandboarding (subject to conditions) and henna.",
          "Arabic coffee and dates, and traditional live shows.",
          "BBQ buffet dinner at the desert camp.",
        ],
      },
      "Return to the hotel. Overnight in Dubai.",
    ],
  },
  {
    day: 4,
    date: "Thu 31 Dec",
    title: "New Year's Eve fireworks cruise",
    img: `${IMG}/cruise.webp`,
    alt: "Dinner cruise on the canal beneath golden fireworks",
    peak: true,
    items: [
      "Breakfast, then a day at leisure: rest, shop or explore at your own pace.",
      "Evening boarding for the Premium New Year's Eve Dubai Canal Cruise. Boarding is 8 to 9 PM; cruising runs from 10 PM to 2 AM.",
      "The route passes the Dubai Water Canal and Business Bay bridges, the Downtown skyline, the Burj Khalifa, Business Bay, the JW Marriott Marquis and Dubai Festival City.",
      "At midnight, watch the Burj Khalifa and Festival City fireworks from the water.",
      {
        lead: "Included on board:",
        sub: [
          "Five-star international buffet dinner.",
          "Unlimited soft drinks.",
          "Live shows, a DJ, and a midnight toast with sparkling fruit drink.",
        ],
      },
      "Dress code is smart casual. Carry a light layer, as it gets breezy on deck.",
      "Return to the hotel. Overnight in Dubai.",
    ],
  },
  {
    day: 5,
    date: "Fri 1 Jan",
    title: "Miracle Garden and Global Village",
    img: `${IMG}/global-village.webp`,
    alt: "Illuminated world pavilions reflected in a lake at a festival park at night",
    items: [
      "A relaxed breakfast to begin 2027.",
      "Dubai Miracle Garden: millions of flowers shaped into arches, tunnels and giant sculptures.",
      "Global Village in the evening: pavilions from around the world, street food, shopping and live entertainment. Entry is included.",
      "Return to the hotel. Overnight in Dubai.",
    ],
  },
  {
    day: 6,
    date: "Sat 2 Jan",
    title: "Fly home",
    img: `${IMG}/skyline.webp`,
    alt: "Downtown Dubai skyline at dusk",
    items: [
      "Private transfer to the airport for your non-stop flight home to Bengaluru, with memories of a New Year like no other.",
    ],
  },
];

export const itineraryFootnote = "Sightseeing order may be adjusted for the best experience.";

export const included = [
  "Return non-stop flights from Bengaluru, with 30 kg check-in and 7 kg cabin baggage per person",
  "5 nights at Excelsior Hotel Deira, Dubai, in a private double room per couple, with daily breakfast",
  "Private air-conditioned airport transfers on arrival and departure",
  "Sightseeing transfers as per the itinerary",
  "New Year's Eve Premium Canal Cruise with buffet dinner, soft drinks and entertainment",
  "At The Top, Burj Khalifa, Level 124",
  "Atlantis Aquaventure Waterpark and the Lost Chambers Aquarium",
  "4x4 desert safari with BBQ dinner",
  "Dubai Frame, Dubai Miracle Garden and Global Village entry",
  "Dubai city tour",
];

export const bookingSteps = [
  { t: "WhatsApp or call to confirm", d: "A booking amount secures your place. The balance is due before 1 December 2026." },
  { t: "Share passport copies", d: "Valid 6 months beyond travel. We'll help you with the UAE visa." },
  { t: "Pack a light layer", d: "Everything else, from flights to the midnight toast, is arranged." },
];

export const faqs = [
  {
    q: "What does the ₹1,10,000 price include?",
    a: "The price is ₹1,10,000 per person + GST. It covers return non-stop flights from Bengaluru with 30 kg check-in and 7 kg cabin baggage, 5 nights at Excelsior Hotel Deira with daily breakfast, private airport transfers, sightseeing transfers as per the itinerary, the New Year's Eve Premium Canal Cruise with buffet dinner, and every attraction listed in the itinerary.",
  },
  {
    q: "How do I book?",
    a: "WhatsApp or call us on +91 99029 33877 to confirm. A booking amount secures your place, and the balance is due before 1 December 2026, when bookings close.",
  },
  {
    q: "Do you help with the UAE visa?",
    a: "Yes. Share passport copies, valid 6 months beyond travel, and we'll help you with the UAE visa. The visa fee itself is not included in the package price.",
  },
  {
    q: "What is TCS and will I pay it?",
    a: "TCS (tax collected at source) applies to overseas tour packages under Indian tax rules. It can be adjusted against your income tax. GST and TCS are charged as applicable.",
  },
  {
    q: "Who is this trip for?",
    a: "Couples and friends who want to ring in 2027 in Dubai without planning a thing. Each couple has a private double room, and every day is arranged, with a free day on 31 December to rest before the big night.",
  },
  {
    q: "How will we get to the New Year's Eve cruise?",
    a: "We'll get you there. Boarding is between 8 and 9 PM and the cruise runs from 10 PM to 2 AM. Dress code is smart casual; carry a light layer, as it gets breezy on deck.",
  },
];
