import { useState, useEffect } from 'react';
import { useUserData } from '@/hooks/useUserData';

interface Props {
  onSave: (formData: FormData) => void; // Ajustado para aceitar formData
}

export default function ContactInfoForm({ onSave }: Props) {
  const { userData } = useUserData();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (userData) {
      setEmail(userData.email || '');
      setPhone(userData.phone || '');
    }
  }, [userData]);

  const handleSubmit = () => {
    const formData = new FormData();

    if (email) {
      formData.append('email', email);
    }
    if (phone) {
      formData.append('phone', phone);
    }

    onSave(formData); // Passando o formData para onSave
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Contatos</h2>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="text"
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Telefone"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Salvar Contatos
      </button>
    </div>
  );
}
