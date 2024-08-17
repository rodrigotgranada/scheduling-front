import { useState } from 'react';
import axios from 'axios';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: any) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('cpf', data.cpf);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('password', data.password);

      if (data.foto) {
        formData.append('foto', data.foto);
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.message || "Registrado com sucesso";
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
