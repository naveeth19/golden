import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="pt-[70px]">{children}</main>
      <Footer />
    </>
  );
}
