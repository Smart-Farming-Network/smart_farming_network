import HeaderClient from "./HeaderClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

export default async function Header() {
  const session = await getServerSession(authOptions); // server-side auth

  return (
    <header>
      <nav className="navbar mobile-sidenav inc-shape navbar-default validnavs dark py-0">
        <HeaderClient session={session} /> {/* handles toggle internally */}
      </nav>
    </header>
  );
}
