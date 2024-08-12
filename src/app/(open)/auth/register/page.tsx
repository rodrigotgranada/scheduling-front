"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation';

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterFormInputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      alert("Registration successful");
      router.push('/login');
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">Register</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">First Name</label>
          <input
            {...register("firstName")}
            type="text"
            placeholder="Enter your first name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Last Name</label>
          <input
            {...register("lastName")}
            type="text"
            placeholder="Enter your last name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Enter your password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Register
        </button>
        <div className="mt-4 text-center">
          <button 
            type="button" 
            onClick={() => router.push('/login')}
            className="text-blue-500 hover:underline"
          >
            Já tem uma conta? Faça login
          </button>
        </div>
      </form>
    </div>
  );
}
