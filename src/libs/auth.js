import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/libs/prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
          include: { profile: true, permissions: { include: { permission: { select: { key: true } } } } },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        const extraPermissions = user.permissions.map(p => p.permission.key);

        return {
          id: user.id,
          email: user.email,
          name: user.profile ? `${user.profile.firstName ?? ""} ${user.profile.lastName ?? ""}`.trim() : user.email,
          role: user.role,
          permissions: extraPermissions,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.permissions = user.permissions || [];
      }

      console.log(user, token);
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.permissions = token.permissions || [];
      return session;
    },
  },
};
