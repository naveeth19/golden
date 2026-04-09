import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[var(--gt-navy)] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/LOGO_GT.png"
                alt="Golden Travels Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span className="font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>Golden Travels</span>
            </div>
            <p className="text-sm text-white/60 mb-4">Premium Road Travel Since 1987</p>
            <div className="text-sm text-white/50 space-y-2">
              <p>No.1697/36, Dr Rajkumar Rd,<br />Rajajinagar, Bengaluru 560021</p>
              <p>
                <a href="tel:+919902933877" className="hover:text-[var(--gt-red)] transition-colors">
                  +91 99029 33877
                </a>
              </p>
              <p>
                <a href="mailto:goldentravels@rediffmail.com" className="hover:text-[var(--gt-red)] transition-colors">
                  goldentravels@rediffmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-white/40 mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/packages" className="hover:text-[var(--gt-red)] transition-colors">Airport Transfers</Link></li>
              <li><Link href="/packages" className="hover:text-[var(--gt-red)] transition-colors">Outstation Trips</Link></li>
              <li><Link href="/packages" className="hover:text-[var(--gt-red)] transition-colors">Pilgrimage Tours</Link></li>
              <li><Link href="/packages" className="hover:text-[var(--gt-red)] transition-colors">Enterprise Transport</Link></li>
              <li><Link href="/packages" className="hover:text-[var(--gt-red)] transition-colors">Event Management</Link></li>
            </ul>
          </div>

          {/* Fleet */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-white/40 mb-6">Fleet</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/fleet" className="hover:text-[var(--gt-red)] transition-colors">Sedans</Link></li>
              <li><Link href="/fleet" className="hover:text-[var(--gt-red)] transition-colors">MPVs</Link></li>
              <li><Link href="/fleet" className="hover:text-[var(--gt-red)] transition-colors">SUVs</Link></li>
              <li><Link href="/fleet" className="hover:text-[var(--gt-red)] transition-colors">Travellers</Link></li>
              <li><Link href="/fleet" className="hover:text-[var(--gt-red)] transition-colors">Mini Buses</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-white/40 mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-[var(--gt-red)] transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-[var(--gt-red)] transition-colors">Projects</Link></li>
              <li><Link href="/blog" className="hover:text-[var(--gt-red)] transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--gt-red)] transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Golden Travels. All rights reserved.
          </p>
          <div className="w-8 h-[2px] bg-[var(--gt-red)]" />
        </div>
      </div>
    </footer>
  );
}
