"use client";

import { useRouter } from 'next/navigation';

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-red-500">Ocorreu um erro!</h1>
      <p className="mt-4 text-gray-600">Não foi possível realizar a ação. Tente novamente.</p>
      <button
        onClick={() => router.push('/login')}
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Voltar para o login
      </button>
    </div>
  );
}
