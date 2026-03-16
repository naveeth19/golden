import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Allow login page to render without auth
  // The login page is at /admin/login which is inside (admin)/admin/login/page.tsx
  // We check the request path via a workaround - if no user, we'll still render
  // but the individual pages (except login) should handle auth

  if (!user) {
    // We can't easily check the path in a layout, so we redirect only if 
    // the user tries to access admin pages. The login page handles its own rendering.
    // For simplicity, we'll render children and let the login page work,
    // while dashboard pages check auth themselves.
  }

  return (
    <div className="flex min-h-screen">
      {user && <AdminSidebar />}
      <main className={`flex-1 bg-white ${user ? "ml-[240px]" : ""}`}>
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
