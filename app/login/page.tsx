"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--gt-cream)]">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 relative mb-4">
            <div className="absolute inset-0 border-2 border-[var(--gt-red)] rounded-full" />
            <div className="absolute inset-[4px] border border-[var(--gt-red)]/30 rounded-full" />
            <span
              className="text-[var(--gt-red)] text-2xl font-bold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              G
            </span>
          </div>
          <h1
            className="text-2xl font-bold text-[var(--gt-navy)]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Golden Travels
          </h1>
          <p className="text-xs text-[var(--gt-muted)] mt-1 uppercase tracking-wider">
            Admin Panel
          </p>
        </div>

        {/* Form */}
        <div className="bg-white border border-[var(--gt-border)] p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[var(--gt-border)] px-4 py-2.5 text-sm text-[var(--gt-navy)] focus:outline-none focus:border-[var(--gt-red)] transition-colors"
                placeholder="admin@goldentravels.co"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[var(--gt-border)] px-4 py-2.5 text-sm text-[var(--gt-navy)] focus:outline-none focus:border-[var(--gt-red)] transition-colors"
                placeholder="Enter your password"
              />
            </div>
            {error && (
              <p className="text-sm text-[var(--gt-red)]">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-3 hover:bg-[var(--gt-red-dark)] transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
