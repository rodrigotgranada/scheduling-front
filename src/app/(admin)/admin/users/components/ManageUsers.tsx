// src/app/(admin)/admin/components/ManageUsers.tsx

import UserTable from "./UserTable";

const ManageUsers = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Usuários</h1>
      <UserTable />
    </div>
  );
};

export default ManageUsers;
