import { useState, useEffect } from 'react';
import { useUserData } from '@/hooks/useUserData';

interface Props {
  onSave: (formData: FormData) => void;
}

export default function PersonalInfoForm({ onSave }: Props) {
  const { userData } = useUserData();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpf, setCpf] = useState('');

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
      setCpf(userData.cpf || '');
    }
  }, [userData]);

  const handleSubmit = () => {
    const formData = new FormData();

    // Somente adicionar os campos que não estão vazios
    if (firstName) {
      formData.append('firstName', firstName);
    }
    if (lastName) {
      formData.append('lastName', lastName);
    }
    if (cpf) {
      formData.append('cpf', cpf);
    }

    onSave(formData);
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Informações Pessoais</h2>
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
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Salvar Informações
      </button>
    </div>
  );
}
