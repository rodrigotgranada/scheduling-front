"use client";
import { useState, useEffect } from "react";
import { useUsers, User } from "../../hooks/useUsers";
import Image from "next/image";
import UserOffcanvas from "./UserOffcanvas"; // Importando o Offcanvas

const UserTable = () => {
  const { users, isLoading, error, saveUser } = useUsers(); // Incluindo saveUser do hook
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "asc" | "desc";
  }>({ key: "firstName", direction: "asc" });
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Estado para o usuário selecionado

  useEffect(() => {
    if (users.length > 0) {
      let filteredList = users.filter(
        (user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.cpf.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (sortConfig.key) {
        filteredList.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key])
            return sortConfig.direction === "asc" ? -1 : 1;
          if (a[sortConfig.key] > b[sortConfig.key])
            return sortConfig.direction === "asc" ? 1 : -1;
          return 0;
        });
      }

      setFilteredUsers(filteredList);
    }
  }, [searchTerm, sortConfig, users]);

  const handleSort = (key: keyof User) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleShowUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseOffcanvas = () => {
    setSelectedUser(null);
  };

  const handleSaveUser = (userId: string, formData: FormData) => {
    console.log("USERTABLE", userId, formData);
    saveUser(userId, formData);
  };

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded text-black"
      />
      <table className="min-w-full bg-gray-100 border rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th
              className="p-2 cursor-pointer text-gray-700"
              onClick={() => handleSort("firstName")}
            >
              Nome
            </th>
            <th
              className="p-2 cursor-pointer text-gray-700"
              onClick={() => handleSort("email")}
            >
              Email
            </th>
            <th
              className="p-2 cursor-pointer text-gray-700"
              onClick={() => handleSort("phone")}
            >
              Telefone
            </th>
            <th
              className="p-2 cursor-pointer text-gray-700"
              onClick={() => handleSort("isActive")}
            >
              Status
            </th>
            <th className="p-2 text-gray-700">Foto</th>
            <th className="p-2 text-gray-700">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, i) => (
            <tr key={i} className="text-center bg-white border-b">
              <td className="p-2 text-gray-700">
                {user.firstName} {user.lastName}
              </td>
              <td className="p-2 text-gray-700">{user.email}</td>
              <td className="p-2 text-gray-700">{user.phone}</td>
              <td className="p-2">
                {user.isActive === "pending" && (
                  <span className="text-yellow-500">!</span>
                )}
                {user.isActive === "active" && (
                  <span className="text-green-500">✔</span>
                )}
                {user.isActive === "blocked" && (
                  <span className="text-red-500">✖</span>
                )}
              </td>
              <td className="p-2">
                <Image
                  src={
                    user.foto && user.foto !== ""
                      ? `${user.foto}`
                      : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`
                  }
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-10 h-10 rounded-full object-cover"
                  width={40}
                  height={40}
                  style={{ width: "auto", height: "auto" }}
                  // onError={(e) => {
                  //   const element = e.target as HTMLImageElement;
                  //   if (
                  //     element.src !==
                  //     `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`
                  //   ) {
                  //     element.src = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`;
                  //   }
                  // }}
                />
              </td>
              <td className="p-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleShowUser(user)}
                >
                  Exibir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Adicionando o Offcanvas */}
      <UserOffcanvas
        user={selectedUser}
        onClose={handleCloseOffcanvas}
        onSave={handleSaveUser} // Passando a função onSave
      />
    </div>
  );
};

export default UserTable;
