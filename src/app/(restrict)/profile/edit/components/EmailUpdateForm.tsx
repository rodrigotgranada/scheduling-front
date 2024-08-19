import { useState, useEffect } from 'react';
import { useUserData } from '@/hooks/useUserData';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Props {
  onSave: (formData: FormData) => void;
}

export default function EmailUpdateForm({ onSave }: Props) {
  const { userData } = useUserData();
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  useEffect(() => {
    if (userData) {
      setEmail(userData.email || '');
    }
  }, [userData]);

  const handleSubmit = async () => {
    if (!currentPassword) {
      toast.error('Por favor, insira sua senha atual para confirmar a mudança de email.');
      return;
    }

    try {
      // Verifica se o novo email já está em uso
      const emailCheckResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/check-email`, { email });
      if (emailCheckResponse.data.exists) {
        toast.error('Este email já está em uso.');
        return;
      }

      // Verifica se a senha atual está correta
      const passwordCheckResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/check-password`, {
        email: userData.email,
        password: currentPassword,
      });

      if (!passwordCheckResponse.data.valid) {
        toast.error('A senha atual está incorreta.');
        return;
      }

      // Se tudo estiver correto, salva o novo email
      const formData = new FormData();
      formData.append('email', email);

      onSave(formData);
    } catch (error) {
      toast.error('Erro ao validar email ou senha.');
      console.error('Erro ao validar email ou senha:', error);
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Email</h2>
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
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Salvar Email
      </button>
    </div>
  );
}
