"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Fleet, FleetCategory } from "@/lib/supabase/types";
import ImageUploader from "./ImageUploader";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const categories: FleetCategory[] = ["Sedan", "MPV", "Traveller", "Mini Bus", "SUV"];

export default function FleetForm({
  vehicle,
  onSaved,
  onCancel,
}: {
  vehicle: Fleet | null;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(vehicle?.name || "");
  const [slug, setSlug] = useState(vehicle?.slug || "");
  const [category, setCategory] = useState<FleetCategory>(vehicle?.category || "Sedan");
  const [capacity, setCapacity] = useState(vehicle?.capacity || 4);
  const [features, setFeatures] = useState<string[]>(vehicle?.features || []);
  const [featureInput, setFeatureInput] = useState("");
  const [description, setDescription] = useState(vehicle?.description || "");
  const [images, setImages] = useState<string[]>(vehicle?.images || []);
  const [isActive, setIsActive] = useState(vehicle?.is_active ?? true);
  const [priceLocal8hr, setPriceLocal8hr] = useState(vehicle?.price_local_8hr || 0);
  const [priceExtraKm, setPriceExtraKm] = useState(vehicle?.price_extra_km || 0);
  const [priceExtraHour, setPriceExtraHour] = useState(vehicle?.price_extra_hour || 0);
  const [priceOutstationKm, setPriceOutstationKm] = useState(vehicle?.price_outstation_km || 0);
  const [priceDriverBatta, setPriceDriverBatta] = useState(vehicle?.price_driver_batta || 0);
  const [priceAirport, setPriceAirport] = useState(vehicle?.price_airport || 0);
  const [loading, setLoading] = useState(false);

  function handleNameChange(val: string) {
    setName(val);
    if (!vehicle) setSlug(slugify(val));
  }

  function addFeature(e: React.KeyboardEvent) {
    if (e.key === "Enter" && featureInput.trim()) {
      e.preventDefault();
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  }

  function removeFeature(index: number) {
    setFeatures(features.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const payload = {
      name,
      slug,
      category,
      capacity,
      features,
      description,
      images,
      price_local_8hr: priceLocal8hr,
      price_extra_km: priceExtraKm,
      price_extra_hour: priceExtraHour,
      price_outstation_km: priceOutstationKm,
      price_driver_batta: priceDriverBatta,
      price_airport: priceAirport,
      is_active: isActive,
    };

    if (vehicle) {
      await supabase.from("fleet").update(payload).eq("id", vehicle.id);
    } else {
      await supabase.from("fleet").insert(payload);
    }

    setLoading(false);
    onSaved();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-bold text-[var(--gt-navy)]" style={{ fontFamily: "var(--font-playfair)" }}>
        {vehicle ? "Edit Vehicle" : "Add Vehicle"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Slug</label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as FleetCategory)}
            className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Capacity</label>
          <input
            type="number"
            required
            value={capacity}
            onChange={(e) => setCapacity(parseInt(e.target.value) || 0)}
            className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Features</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {features.map((f, i) => (
            <span
              key={i}
              onClick={() => removeFeature(i)}
              className="text-xs px-2 py-1 bg-[var(--gt-cream)] text-[var(--gt-navy)] cursor-pointer hover:bg-red-50 hover:text-[var(--gt-red)]"
            >
              {f} x
            </span>
          ))}
        </div>
        <input
          type="text"
          value={featureInput}
          onChange={(e) => setFeatureInput(e.target.value)}
          onKeyDown={addFeature}
          placeholder="Type feature and press Enter"
          className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Description</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)] resize-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Images</label>
        <ImageUploader
          images={images}
          onChange={setImages}
          folder="fleet"
        />
      </div>

      <div>
        <h4 className="text-sm font-bold text-[var(--gt-navy)] mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
          Pricing Slab
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">₹ Base rate</label>
            <input
              type="number"
              min={0}
              value={priceLocal8hr}
              onChange={(e) => setPriceLocal8hr(parseFloat(e.target.value) || 0)}
              className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]"
              placeholder="8 Hr / 80 Km Local Package"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">₹ per km</label>
            <input
              type="number"
              min={0}
              value={priceExtraKm}
              onChange={(e) => setPriceExtraKm(parseFloat(e.target.value) || 0)}
              className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]"
              placeholder="Extra km rate"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">₹ per hour</label>
            <input
              type="number"
              min={0}
              value={priceExtraHour}
              onChange={(e) => setPriceExtraHour(parseFloat(e.target.value) || 0)}
              className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]"
              placeholder="Extra hour rate"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">₹ per day (driver batta)</label>
            <input
              type="number"
              min={0}
              value={priceDriverBatta}
              onChange={(e) => setPriceDriverBatta(parseFloat(e.target.value) || 0)}
              className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]"
              placeholder="Driver batta per day"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">₹ per km</label>
            <input
              type="number"
              min={0}
              value={priceOutstationKm}
              onChange={(e) => setPriceOutstationKm(parseFloat(e.target.value) || 0)}
              className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]"
              placeholder="Outstation per km"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">₹ flat rate</label>
            <input
              type="number"
              min={0}
              value={priceAirport}
              onChange={(e) => setPriceAirport(parseFloat(e.target.value) || 0)}
              className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]"
              placeholder="Airport transfer flat rate"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className={`w-10 h-5 rounded-full relative transition-colors ${isActive ? "bg-[var(--gt-red)]" : "bg-gray-300"}`}
        >
          <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${isActive ? "left-5" : "left-0.5"}`} />
        </button>
        <span className="text-sm text-[var(--gt-navy)]">Active</span>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-2.5 hover:bg-[var(--gt-red-dark)] transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Vehicle"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-[var(--gt-border)] text-[var(--gt-navy)] text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-2.5 hover:bg-[var(--gt-cream)] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
