import { useState } from "react";
import { User } from "../../../hooks/useUsers";

interface Props {
  user: User;
  onSave: (formData: FormData) => void;
}

export default function UserDetailsEditForm({ user, onSave }: Props) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [cpf, setCpf] = useState(user.cpf);

  const handleSubmit = () => {
    const formData = new FormData();

    if (firstName) {
      formData.append("firstName", firstName);
    }
    if (lastName) {
      formData.append("lastName", lastName);
    }
    if (cpf) {
      formData.append("cpf", cpf);
    }

    onSave(formData);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Nome"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="text"
        name="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Sobrenome"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="text"
        name="cpf"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        placeholder="CPF"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Salvar Informações
      </button>
    </div>
  );
}
