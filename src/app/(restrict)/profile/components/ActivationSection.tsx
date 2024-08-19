import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useUserData } from '@/hooks/useUserData';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ActivationSection() {
  const { userData, activateAccount } = useUserData();
  const [activationCode, setActivationCode] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [counter, setCounter] = useState(180);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isButtonDisabled) {
      interval = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter <= 1) {
            clearInterval(interval);
            setIsButtonDisabled(false);
            return 180;
          }
          return prevCounter - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isButtonDisabled]);

  const handleActivationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
    setActivationCode(value);
  };

  const handleActivationSubmit = async () => {
    const response = await activateAccount(userData?.email, activationCode);
    if (response.success) {
      toast.success('Conta ativada com sucesso!');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error('Código de ativação inválido. Tente novamente.');
    }
  };

  const handleResendCode = async () => {
    if (!userData?.email) return;
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/regenerate-activation-code`, {
        email: userData.email,
      });
      toast.success('Novo código enviado. Verifique seu email.');
      setIsButtonDisabled(true);
    } catch (error) {
      toast.error('Erro ao enviar novo código.');
    }
  };

  if (!userData) {
    return (
      <div className="mt-4">
        <Skeleton height={40} width="100%" baseColor="#e0e0e0" highlightColor="#f0f0f0" />
        <Skeleton height={40} width="100%" baseColor="#e0e0e0" highlightColor="#f0f0f0" />
        <Skeleton height={40} width="100%" baseColor="#e0e0e0" highlightColor="#f0f0f0" />
      </div>
    );
  }

  return (
    userData?.isActive === 'pending' && (
      <div className="mt-4">
        <input
          type="text"
          value={activationCode}
          onChange={handleActivationCodeChange}
          placeholder="Digite o código de ativação"
          className="border p-2 rounded w-full text-gray-700"
          maxLength={6}
        />
        <button
          onClick={handleActivationSubmit}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Ativar Conta
        </button>
        <button
          onClick={handleResendCode}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full"
          disabled={isButtonDisabled}
        >
          {isButtonDisabled ? `Reenviar em ${counter}s` : 'Reenviar Código'}
        </button>
      </div>
    )
  );
}
