"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type ForgotPasswordInputs = {
  email: string;
};

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm<ForgotPasswordInputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/request-password-reset`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      toast.success("Código de redefinição enviado para o seu email.");
      const params = new URLSearchParams({ email: data.email });
      router.push(`/reset-password?${params.toString()}`);
    } else {
      toast.error("Falha ao enviar o código de redefinição.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">Esqueci a Senha</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Digite seu email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Enviar Código
        </button>
        <div className="mt-4 text-center">
          <button 
            type="button" 
            onClick={() => router.push('/login')}
            className="text-blue-500 hover:underline"
          >
            Voltar ao login
          </button>
        </div>
      </form>
    </div>
  );
}
