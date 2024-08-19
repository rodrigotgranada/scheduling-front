import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useUserData } from '@/hooks/useUserData'; // Importando o hook

interface Props {
  onSave: (formData: FormData) => void;
}

export default function SecurityForm({ onSave }: Props) {
  const { userData } = useUserData(); // Usando o hook para obter os dados do usuário
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (!currentPassword) {
      toast.error('Por favor, insira sua senha atual.');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem.');
      return;
    }
  
    try {
      // Verifica se a senha atual está correta
      const passwordCheckResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/check-password`, {
        email: userData.email,
        password: currentPassword,
      });
  
      if (!passwordCheckResponse.data.valid) {
        toast.error('A senha atual está incorreta.');
        return;
      }
  
      // Se a senha atual estiver correta, permite a alteração
      const formData = new FormData();
      formData.append('password', newPassword);
  
      onSave(formData);
    } catch (error) {
      toast.error('Erro ao validar a senha atual.');
      console.error('Erro ao validar a senha atual:', error);
    }
  };
  

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Segurança</h2>
      <input
        type="password"
        name="currentPassword"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        placeholder="Senha Atual"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="password"
        name="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Nova Senha"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirmar Senha"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Alterar Senha
      </button>
    </div>
  );
}
