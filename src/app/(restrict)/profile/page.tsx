"use client";

import { useUserData } from '@/hooks/useUserData';

export default function Profile() {
  const userData = useUserData();

  if (!userData) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-200" />
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-4">
          {userData.foto ? (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/${userData.foto}`}
              alt="Profile Picture"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <img
              src={`https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=random&size=64`}
              alt="Default Avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {userData.firstName} {userData.lastName}
            </h2>
            <p className="text-sm text-gray-600">{userData.email}</p>
            <p className="text-sm text-gray-600">{userData.phone}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">User Information</h3>
          <p className="text-sm text-gray-800">CPF: {userData.cpf}</p>
          <p className="text-sm text-gray-800">Role: {userData.role}</p>
          <p className="text-sm text-gray-800">Status: {userData.isActive}</p>
          <p className="text-sm text-gray-800">Member since: {new Date(userData.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
