import { useUserData } from '@/hooks/useUserData';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProfileDetails() {
  const { userData } = useUserData();

  if (!userData) {
    return (
      <div className="mt-4">
        <Skeleton height={16} width="100%" baseColor="#e0e0e0" highlightColor="#f0f0f0" />
        <Skeleton height={16} width="100%" baseColor="#e0e0e0" highlightColor="#f0f0f0" />
        <Skeleton height={16} width="100%" baseColor="#e0e0e0" highlightColor="#f0f0f0" />
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-800">Informações do Usuário</h3>
      <p className="text-sm text-gray-800">CPF: {userData.cpf}</p>
      <p className="text-sm text-gray-800">Função: {userData.role}</p>
      <p className="text-sm text-gray-800">Status: {userData.isActive}</p>
      <p className="text-sm text-gray-800">Membro desde: {new Date(userData.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
