import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";

export const {
    handlers: { GET, POST },
    auth, 
    signIn,
    signOut,
    } = NextAuth ({
        pages: {
            signIn: "/auth/login",
            error: "/auth/error",
        },
        events: {
            async linkAccount({user}) {
                await db.user.update({
                    where: {id: user.id},
                    data: { emailVerified: new Date()}
                })
            }
        },
        callbacks: {
        async signIn({user, account}) {

            console.log({
                user, account,
            });

            // Allow OAuth without email verification
            if (account?.provider !== "credentials") return true;

            // Prevent sign in without email verification
            const existingUser = await getUserById(user.id);

            if (!existingUser?.emailVerified) return false;

            // TODO: Add 2FA check


            return true
        },
        /* async signIn({ user }) {
            console.log("🔍 signIn - user:", user);

            return true;
        }, */
        async session({ token, session }) {
          /*   console.log({
                sessionToken: token,
            }) */
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});