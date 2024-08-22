import React from "react";

interface UserDetailsViewProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cpf: string;
    isActive: string;
    foto: string;
  };
  onEdit: () => void;
}

const UserDetailsView: React.FC<UserDetailsViewProps> = ({ user, onEdit }) => {
  return (
    <div>
      <img
        src={
          user.foto
            ? user.foto
            : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`
        }
        alt={`${user.firstName} ${user.lastName}`}
        className="w-24 h-24 rounded-full mt-4"
      />
      <p className="p-2 text-gray-700">
        Nome: {user.firstName} {user.lastName}
      </p>
      <p className="p-2 text-gray-700">Email: {user.email}</p>
      <p className="p-2 text-gray-700">Telefone: {user.phone}</p>
      <p className="p-2 text-gray-700">CPF: {user.cpf}</p>
      <p className="p-2 text-gray-700">Status: {user.isActive}</p>
      <button
        onClick={onEdit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Editar
      </button>
    </div>
  );
};

export default UserDetailsView;
