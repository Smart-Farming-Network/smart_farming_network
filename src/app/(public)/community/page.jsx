import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import CommunityFeed from "@/components/community/CommunityFeed";
import styles from "@/components/styles/Community.module.css";

export const metadata = {
  title: "Farmers' Community | Smart Farming Network",
  description:
    "Connect with farmers across Nigeria — ask questions, share farming experiences, discuss challenges and learn from one another on the SFN Farmers' Community.",
  openGraph: {
    title: "SFN Farmers' Community",
    description:
      "A dedicated space for farmers to connect, ask questions, share experiences and solve farming challenges together.",
    url: "/community",
    type: "website",
  },
};

/** The feed is per-viewer and changes as farmers post, so never cache it. */
export const dynamic = "force-dynamic";

const ROLE_LABELS = {
  FARMER: "Farmer",
  INVESTOR: "Investor",
  ADMIN: "SFN Team",
  USER: "SFN Member",
};

export default async function CommunityPage() {
  const session = await getServerSession(authOptions);

  let currentUser = { signedIn: false, name: "Farmer", role: "SFN Member", location: "", verified: false, isAdmin: false };

  if (session?.user?.id) {
    // The verified tick must reflect an APPROVED verification, not merely the
    // FARMER role — verification is a paid SFN service and cannot be implied.
    const account = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        role: true,
        verificationStatus: true,
        profile: { select: { firstName: true, lastName: true } },
      },
    });

    const first = account?.profile?.firstName?.trim() || "";
    const last = account?.profile?.lastName?.trim() || "";
    const fullName = `${first} ${last}`.trim();

    currentUser = {
      signedIn: true,
      name: fullName || session.user.name?.trim() || session.user.email?.split("@")[0] || "Farmer",
      role: ROLE_LABELS[account?.role ?? session.user.role] || "SFN Member",
      location: "",
      verified: account?.verificationStatus === "APPROVED",
      isAdmin: (account?.role ?? session.user.role) === "ADMIN",
    };
  }

  return (
    <div className={styles.page}>
      <CommunityFeed currentUser={currentUser} />
    </div>
  );
}
