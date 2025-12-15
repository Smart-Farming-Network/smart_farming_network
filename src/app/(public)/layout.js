import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PublicLayout({ children }) {
  return (
    <div id="public-layout">
      <Preloader />         {/* client-only */}
      <Header />      {/* server-side session fetch */}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
