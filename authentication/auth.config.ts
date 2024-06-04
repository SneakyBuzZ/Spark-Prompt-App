import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "@/lib/schemas";
import { getUserByEmail } from "../actions/getData";
import bcryptjs from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const existingUser = await getUserByEmail(email);
          if (!existingUser || !existingUser.password) return null;

          const matchedPassword = await bcryptjs.compare(
            password,
            existingUser.password
          );
          if (matchedPassword) return existingUser;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
