import { jwtDecode } from "jwt-decode";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface DecodedToken {
  sub: string;  // O ID do usuário
  role: string; // A role do usuário
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
          const res = await fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            credentials: 'include', // Necessário para enviar cookies
          });

          const user = await res.json();

          if (res.ok && user && user.accessToken) {
            const decodedToken = jwtDecode<DecodedToken>(user.accessToken);
            return {
              id: decodedToken.sub,
              role: decodedToken.role,
              token: user.accessToken,
            };
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
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
    strategy: 'jwt', // Importante para trabalhar com JWT em cookies
    maxAge: 7 * 24 * 60 * 60, // Uma semana
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/login',
    error: '/error-page',  // Rota personalizada de erro
  },
});
