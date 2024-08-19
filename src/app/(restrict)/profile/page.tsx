"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Skeleton from 'react-loading-skeleton';

import { useUserData } from '@/hooks/useUserData';
import ProfileHeader from './components/ProfileHeader';
import ProfileDetails from './components/ProfileDetails';
import ActivationSection from './components/ActivationSection';

export default function Profile() {
  const { userData } = useUserData();
  const router = useRouter();

  useEffect(() => {
    if (!userData && userData !== null) {
      router.push('/login');
    }
  }, [userData, router]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  if (userData === null) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <Skeleton circle={true} height={64} width={64} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
          <Skeleton height={20} width={120} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
          <Skeleton height={16} width={180} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
          <Skeleton height={16} width={160} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
          <Skeleton height={16} width="100%" baseColor="#e0e0e0" highlightColor="#f0f0f0" />
          <Skeleton height={16} width="100%" baseColor="#e0e0e0" highlightColor="#f0f0f0" />
          <Skeleton height={16} width="100%" baseColor="#e0e0e0" highlightColor="#f0f0f0" />
          <Skeleton height={40} width="100%" baseColor="#e0e0e0" highlightColor="#f0f0f0" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <ProfileHeader />
        <ProfileDetails />
        <ActivationSection />
        <button 
          onClick={handleEditProfile} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Editar Perfil
        </button>
        <button 
          onClick={handleLogout} 
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
