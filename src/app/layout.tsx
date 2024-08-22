"use client";

import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar"; // Importar o componente Navbar
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar /> {/* Incluir a Navbar aqui */}
          <main className="container mx-auto p-4">{children}</main>
          <ToastContainer />
        </SessionProvider>
      </body>
    </html>
  );
}
