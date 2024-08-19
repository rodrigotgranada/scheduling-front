import { useState, useEffect } from 'react';
import { useUserData } from '@/hooks/useUserData';

interface Props {
  onSave: (formData: FormData) => void;
}

export default function PhoneUpdateForm({ onSave }: Props) {
  const { userData } = useUserData();
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (userData) {
      setPhone(userData.phone || '');
    }
  }, [userData]);

  const handleSubmit = () => {
    const formData = new FormData();

    if (phone) {
      formData.append('phone', phone);
    }

    onSave(formData);
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Telefone</h2>
      <input
        type="text"
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Telefone"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Salvar Telefone
      </button>
    </div>
  );
}
