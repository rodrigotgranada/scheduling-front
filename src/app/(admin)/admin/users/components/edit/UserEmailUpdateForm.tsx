import { useState } from "react";
import { User } from "../../../hooks/useUsers";
import { toast } from "react-toastify";

interface Props {
  user: User;
  onSave: (formData: FormData) => void;
}

export default function UserEmailUpdateForm({ user, onSave }: Props) {
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");

  const handleSubmit = async () => {
    if (!currentPassword) {
      toast.error("Por favor, insira a senha atual.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("currentPassword", currentPassword);

    onSave(formData);
  };

  return (
    <div className="mb-4">
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Novo Email"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="password"
        name="currentPassword"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        placeholder="Senha Atual"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Salvar Email
      </button>
    </div>
  );
}
