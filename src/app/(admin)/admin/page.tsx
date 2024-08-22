// src/app/(admin)/admin/page.tsx

import { redirect } from "next/navigation";
import AdminDashboard from "./components/AdminDashboard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import AdminLayout from "./layout";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  console.log("TESTE", session);
  if (
    !session ||
    (session.user.role !== "admin" && session.user.role !== "owner")
  ) {
    redirect("/unauthorized"); // Redireciona para uma página de "não autorizado"
  }

  return <AdminDashboard />;
}
