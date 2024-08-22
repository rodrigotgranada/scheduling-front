// src/app/(admin)/admin/users/page.tsx

import AdminLayout from "../layout";
import ManageUsers from "./components/ManageUsers";

export default function UsersPage() {
  return (
    // <AdminLayout>
    <>
      <h2 className="text-2xl font-bold mb-4">Gerenciar Usuários</h2>
      <ManageUsers />
    </>
    // </AdminLayout>
  );
}
