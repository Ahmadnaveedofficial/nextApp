import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#312e81_0%,#0f172a_35%,#020617_100%)]">
      <Navbar />

      {children}

      <Footer />
    </div>
  );
}
