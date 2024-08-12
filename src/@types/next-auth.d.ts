import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
    token: string;
  }

  interface Session {
    accessToken: string;
    user: User;
  }
}
