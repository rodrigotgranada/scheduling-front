import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cpf: string;
  isActive: 'pending' | 'active' | 'blocked';
  foto: string;
};

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!session) {
        setError('Sessão não encontrada');
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          }
        });
        setUsers(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Erro ao buscar usuários');
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [session]);

  const saveUser = async (userId: string, formData: FormData) => {
    if (!session) {
        setError('Sessão não encontrada');
        return { success: false };
    }
    
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/admin/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${session?.user.token}`,
            },
            withCredentials: true,
        });

        if (response.status === 200) {
            const updatedUser = response.data; // Supondo que a resposta do backend retorne o usuário atualizado
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, ...updatedUser } : user
                )
            );
            return { success: true };
        }
    } catch (err) {
        console.error('Erro ao salvar usuário:', err);
        return { success: false };
    }
};


  return { users, isLoading, error, saveUser };
};
