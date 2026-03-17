import Image from "next/image";

const clients = [
  {
    name: "Brigade Group",
    logo: "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Clients/Brigade_Group.jpg",
  },
  {
    name: "Holla Group",
    logo: "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Clients/Holla-New-Logo-2022-removebg-preview.png",
  },
  {
    name: "New Mangalore Port Trust",
    logo: "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Clients/NMPT.png",
  },
  {
    name: "TUV SUD",
    logo: "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Clients/tuv-removebg-preview.png",
  },
  {
    name: "Vizag Steel",
    logo: "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Clients/VIZAG-STEEL.jpg",
  },
];

export default function ClientLogos() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold">
            Our Clients
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-12">
          {clients.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 border border-[var(--gt-border)] flex items-center justify-center p-3 bg-white">
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={80}
                  height={80}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-xs text-[var(--gt-muted)] text-center max-w-[120px]">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
