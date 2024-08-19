import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {jwtDecode} from "jwt-decode";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

interface DecodedToken {
  sub: string;
  role: string;
}

interface Token extends JWT {
  id?: string;
  role?: string;
  token?: string;
}

interface User {
  id: string;
  role: string;
  token: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            credentials: "include",
          });

          const user = await res.json();
          if (res.ok && user && user.accessToken) {
            const decodedToken = jwtDecode<DecodedToken>(user.accessToken);
            return {
              id: decodedToken.sub,
              role: decodedToken.role,
              token: user.accessToken,
            } as User;
          }
          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: Token; user?: User }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: Token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.token = token.token as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/login",
    error: "/error-page",
  },
};

// Exportação nomeada para métodos HTTP
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
