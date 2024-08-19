"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from "react";
import { toast } from 'react-toastify';

type ResetPasswordInputs = {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const { register, handleSubmit } = useForm<ResetPasswordInputs>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const email = searchParams.get('email') || '';

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          code: data.code,
          newPassword: data.newPassword,
        }),
      });

      if (res.ok) {
        toast.success("Senha redefinida com sucesso. Você será redirecionado para o login.");
        router.push('/login');
      } else {
        toast.error("Falha ao redefinir a senha. Verifique o código e tente novamente.");
      }
    } catch (err) {
      toast.error("Erro na solicitação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/request-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("Novo código enviado para o seu email.");
      } else {
        toast.error("Falha ao reenviar o código.");
      }
    } catch (err) {
      toast.error("Erro ao reenviar o código.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center">Redefinir Senha</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue={email}
              {...register("email")}
              readOnly
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-200"
            />
          </div>
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Código de Redefinição
            </label>
            <input
              type="text"
              id="code"
              {...register("code")}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              Nova Senha
            </label>
            <input
              type="password"
              id="newPassword"
              {...register("newPassword")}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button 
            type="submit" 
            className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Redefinindo..." : "Redefinir Senha"}
          </button>
          <div className="mt-4 text-center">
            <button 
              type="button" 
              onClick={handleResendCode}
              className="text-blue-500 hover:underline"
            >
              Reenviar Código
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
