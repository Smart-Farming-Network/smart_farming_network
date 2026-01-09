import HeaderClient from "./HeaderClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

export default async function Header() {
  const session = await getServerSession(authOptions); // server-side auth

  return (
    <header>
      <nav
        style={{ backgroundColor: "#28a745", overflow: "hidden" }}
        className="navbar navbar-default validnavs dark py-1"
      >
        <div className="ticker-wrapper">
          <div className="ticker">
            <span className="ticker-item">
              🌽 Maize: ₦100,000 <span className="text-warning">▲ Stable</span>
            </span>
            <span className="ticker-item">
              🌾 Wheat: ₦85,500 <span className="text-danger">▼ Volatile</span>
            </span>
            <span className="ticker-item">
              🫘 Soybeans: ₦72,300 <span className="text-success">▲ Rising</span>
            </span>
            {/* keep adding items */}
          </div>
        </div>
      </nav>

      <nav className="navbar mobile-sidenav inc-shape navbar-default validnavs dark py-0">
        <HeaderClient session={session} /> {/* handles toggle internally */}
      </nav>
    </header>
  );
}
