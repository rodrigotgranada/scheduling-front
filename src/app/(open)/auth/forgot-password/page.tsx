"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation';

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
      alert("Password reset link sent to your email");
    } else {
      alert("Failed to send password reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">Forgot Password</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Send Reset Link
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
