import HeaderClient from "./HeaderClient";

import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

export default async function Header() {
  const session = await getServerSession(authOptions);

  let marketTrends = [];

  try {
    const baseUrl =
      process.env.NEXTAUTH_URL ||
      "http://localhost:3000";

    const response = await fetch(
      `${baseUrl}/api/market-trends`,
      {
        cache: "no-store",
      }
    );

    if (response.ok) {
      const result = await response.json();
      marketTrends = result.data || [];
    }
  } catch (error) {
    console.error("Failed to fetch market trends:", error);
  }

  return (
    <header>
      <nav
        style={{
          backgroundColor: "#28a745",
          overflow: "hidden",
        }}
        className="navbar navbar-default validnavs dark py-1"
      >
        <div className="ticker-wrapper">
          <div className="ticker">

            {marketTrends.map((product) => {
              let trendIcon = "▲";
              let trendClass = "text-warning";

              if (product.trend === "RISING") {
                trendIcon = "▲";
                trendClass = "text-success";
              } else if (product.trend === "FALLING") {
                trendIcon = "▼";
                trendClass = "text-danger";
              }

              return (
                <span
                  className="ticker-item"
                  key={product.id}
                >
                  {product.name}: ₦
                  {product.price.toLocaleString("en-NG")}

                  {" "}

                  <span className={trendClass}>
                    {trendIcon} {product.trend}
                  </span>
                </span>
              );
            })}

          </div>
        </div>
      </nav>

      <nav className="navbar mobile-sidenav inc-shape navbar-default validnavs dark py-0">
        <HeaderClient session={session} />
      </nav>
    </header>
  );
}