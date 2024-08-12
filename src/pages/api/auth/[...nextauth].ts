
import { jwtDecode } from "jwt-decode";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


interface DecodedToken {
  sub: string;  // O ID do usuário
  role: string; // A role do usuário
}

interface User {
  id: string;
  role: string;
  token: string;
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
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
          console.log('url', url);
          console.log('credentials', credentials);
          const res = await fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });
        
          const user = await res.json();
          console.log("User returned from backend:", user);

          if (res.ok && user && user.accessToken) {
            // Decodifica o token JWT para extrair as informações do usuário
            const decodedToken = jwtDecode<DecodedToken>(user.accessToken);

            console.log('decodedToken', decodedToken)
            return {
              id: decodedToken.sub,  // O ID do usuário extraído do token
              role: decodedToken.role,  // A role do usuário extraída do token
              token: user.accessToken,  // O token original
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.token = user.token;  // Passa o token para o JWT
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.token = token.token as string;  // Inclui o token na sessão
      }
      return session;
    },
  },
  pages: {
    error: '/(open)/error-page', // Redireciona para a sua página de erro customizada
  },
  secret: process.env.NEXTAUTH_SECRET,
} as NextAuthOptions);

