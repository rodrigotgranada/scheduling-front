import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export function useUserData() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user.token) return;
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/users/me`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
          withCredentials: true,
        });

        if (res.status === 200) {
          setUserData(res.data);
        } else {
          console.error('Unauthorized access');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [session]);

  const activateAccount = async (email: string, code: string) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/activate`, {
        email,
        code,
      });
      if (res.status === 200 || res.status === 201 && res.data.success) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error('Activation failed:', error);
      return { success: false };
    }
  };

  const saveUserData = async (formData: FormData) => {
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, formData, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success('Perfil atualizado com sucesso!');
        return { success: true };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {  // Verifica se é um erro do Axios
        if (error.response?.status === 409 && error.response?.data?.message) {
          toast.error(error.response.data.message); // Mensagem específica do backend
        } else {
          toast.error('Erro ao atualizar o perfil.');
        }
      } else {
        toast.error('Erro inesperado ao atualizar o perfil.');
      }
      return { success: false };
    }
  };

  return { userData, activateAccount, saveUserData };
}
