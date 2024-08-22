import { useState } from "react";
import { User } from "../../../hooks/useUsers";

interface Props {
  user: User;
  onSave: (formData: FormData) => void;
}

export default function UserPhoneUpdateForm({ user, onSave }: Props) {
  const [phone, setPhone] = useState(user.phone);

  const handleSubmit = () => {
    const formData = new FormData();

    if (phone) {
      formData.append("phone", phone);
    }

    onSave(formData);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Telefone"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Salvar Telefone
      </button>
    </div>
  );
}
