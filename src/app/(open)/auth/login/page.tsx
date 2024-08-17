"use client";

import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation';

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    // console.log("Submitting login form with data", data);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
  
    if (result?.error) {
      console.error("Login failed", result.error);
    } else {
      console.log("Login successful, redirecting to profile");
      router.push('/profile');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">Login</h2>
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
          Login
        </button>
      </form>
    </div>
  );
}
