export type FleetCategory = "Sedan" | "MPV" | "Traveller" | "Mini Bus" | "SUV";

export interface Fleet {
  id: string;
  name: string;
  slug: string;
  category: FleetCategory;
  capacity: number;
  images: string[];
  features: string[];
  description: string;
  is_active: boolean;
  created_at: string;
}

export type PackageType = "pilgrimage" | "outstation" | "airport" | "corporate";

export interface Package {
  id: string;
  title: string;
  slug: string;
  type: PackageType;
  duration_days: number;
  price_from: number;
  overview: string;
  inclusions: string[];
  exclusions: string[];
  images: string[];
  youtube_urls: string[];
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

export interface ItineraryDay {
  id: string;
  package_id: string;
  day_number: number;
  title: string;
  description: string;
  meals: string[];
  overnight_at: string;
  created_at: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string;
  meta_title: string;
  meta_desc: string;
  tags: string[];
  is_published: boolean;
  published_at: string;
  created_at: string;
}

export type EnquiryStatus = "new" | "contacted" | "confirmed" | "closed" | "cancelled";

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  package_id: string | null;
  vehicle_id: string | null;
  travel_date: string;
  pax_count: number;
  status: EnquiryStatus;
  notes: string;
  created_at: string;
}
