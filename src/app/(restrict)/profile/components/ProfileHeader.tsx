import { useUserData } from '@/hooks/useUserData';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProfileHeader() {
  const { userData } = useUserData();

  if (!userData) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton circle={true} height={64} width={64} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
        <div>
          <Skeleton height={20} width={120} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
          <Skeleton height={16} width={180} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
          <Skeleton height={16} width={160} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {userData.foto ? (
        <img
          src={`${userData.foto}`}
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
  );
}
